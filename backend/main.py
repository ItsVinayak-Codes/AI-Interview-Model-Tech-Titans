import os
import json
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from dotenv import load_dotenv
from langchain_mistralai import ChatMistralAI
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatMistralAI(
    model="mistral-large-latest",
    mistral_api_key=os.getenv("MISTRAL_API_KEY"),
    temperature=0.7
)

# In-memory session store to track chat history and candidate profile per sessionId
SESSION_STORE: Dict[str, Dict[str, Any]] = {}

def load_curriculum():
    with open("data/curriculum.json", "r") as f:
        return json.load(f)

class InterviewRequest(BaseModel):
    sessionId: str
    candidate: Optional[Dict[str, Any]] = None
    message: Optional[str] = None


@app.post("/api/interview")
async def handle_interview(payload: InterviewRequest):
    session_id = payload.sessionId
    
    # Load curriculum right at the start so it's always accessible
    curriculum_data = load_curriculum()
    
    # --- PHASE 1: INITIALIZATION (Tech Spec Exact Match) ---
    if payload.candidate:
        completed_days = []
        for m in payload.candidate.get("missions", []):
            if m.get("passed"):
                completed_days.append(m.get("day"))
                
        SESSION_STORE[session_id] = {
            "candidate": payload.candidate,
            "completed_days": completed_days,
            "history": []
        }
        
        initial_reply = "Welcome. Let's begin your interview."
        SESSION_STORE[session_id]["history"].append({"sender": "agent", "text": initial_reply})
        
        return {
            "reply": initial_reply,
            "done": False
        }
        
    # --- PHASE 2 & 3: CONVERSATION TURN OR COMPLETION ---
    if session_id not in SESSION_STORE:
        raise HTTPException(status_code=400, detail="Session not initialized. Send candidate payload first.")
        
    session = SESSION_STORE[session_id]
    candidate_data = session["candidate"]
    completed_days = session["completed_days"]
    history = session["history"]
    
    # Record user message
    user_msg = payload.message or ""
    history.append({"sender": "candidate", "text": user_msg})
    
    # Count total agent turns to determine progress (max 8 questions)
    question_turns = sum(1 for msg in history if msg["sender"] == "agent")
    
    # Check if interview is complete or terminated
    is_complete = question_turns >= 8 or "terminate" in user_msg.lower() or "choose to terminate" in user_msg.lower()
    
    if is_complete:
        summary_prompt = f"""
        Analyze this interview transcript for candidate {candidate_data.get('member', {}).get('name')}. 
        Evaluate the depth, correctness, and engagement of the candidate's answers. 
        If the candidate gave minimal responses, skipped questions, or terminated early, reflect that with a low overallScore (e.g., between 2.0 and 4.0) and highlight severe gaps in the gaps array.
        
        You must output valid JSON containing *only* these exact top-level keys:
        - "overallScore": a float between 1.0 and 10.0.
        - "summary": a string summarizing performance (mention if it was incomplete or poor).
        - "strengths": an array of strings (or note minimal engagement if none).
        - "gaps": an array of strings (actionable bottlenecks/drawbacks).
        - "next": an array of strings.
        
        Transcript: {json.dumps(history)}
        """
        eval_response = llm.invoke([HumanMessage(content=summary_prompt)])
        
        raw_text = eval_response.content.replace("```json", "").replace("```", "").strip()
        try:
            feedback_data = json.loads(raw_text)
        except:
            feedback_data = {
                "overallScore": 3.0,
                "summary": "The interview was terminated early or lacked sufficient technical responses.",
                "strengths": ["None demonstrated due to lack of engagement."],
                "gaps": ["Failed to provide substantive answers to technical inquiries.", "Session abandoned prematurely."],
                "next": ["Restart the evaluation portal and complete all technical modules."]
            }
            
        return {
            "reply": "Interview completed.",
            "done": True,
            "feedback": feedback_data
        }
        
    # Generate next technical question using LangChain & Mistral with Progressive Pacing
    curriculum_details = [d for d in curriculum_data.get("days", []) if d["day"] in completed_days]
    
    # Dynamic question style mapping based on turn count
    if question_turns <= 2:
        phase_instruction = "Phase 1: Ask short, direct, and foundational technical questions to warm up the candidate."
    elif question_turns <= 5:
        phase_instruction = "Phase 2: Ask deep, scenario-based architecture or troubleshooting questions to test real-world problem solving."
    else:
        phase_instruction = "Phase 3: Ask mid-level conceptual wrap-up questions to test final system design and integration trade-offs."

    system_instruction = f"""
    You are an expert technical interviewer for an AI Cohort. 
    The candidate's completed curriculum milestones: {json.dumps(curriculum_details)}
    
    Current Interview Pacing: {phase_instruction}
    
    Keep responses conversational, focused, and ask only one question at a time. Do not repeat previous questions.
    """
    
    messages = [SystemMessage(content=system_instruction)]
    for msg in history:
        if msg["sender"] == "agent":
            messages.append(AIMessage(content=msg["text"]))
        else:
            messages.append(HumanMessage(content=msg["text"]))
            
    ai_response = llm.invoke(messages)
    agent_reply = ai_response.content
    
    history.append({"sender": "agent", "text": agent_reply})
    
    return {
        "reply": agent_reply,
        "done": False
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)