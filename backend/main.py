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
        # 1. Format the transcript into a readable dialogue for the AI
        formatted_transcript = ""
        for msg in history:
            role = "Interviewer" if msg["sender"] == "agent" else "Candidate"
            formatted_transcript += f"{role}: {msg['text']}\n\n"

        # 2. Use a highly specific grading prompt
        summary_prompt = f"""
        You are an expert Senior Technical Evaluator. Analyze the following interview transcript for {candidate_data.get('member', {}).get('name')}.
        
        Grading Criteria:
        - Analyze technical accuracy, depth of architectural reasoning, and problem-solving.
        - Penalize generic, shallow, or evasive answers (Score: 2.0 - 5.0).
        - Reward detailed, accurate, and context-aware technical answers (Score: 7.0 - 10.0).
        - If the candidate terminated early without answering questions, score them a 2.0.
        
        Transcript:
        {formatted_transcript}
        
        CRITICAL INSTRUCTION: You MUST output ONLY valid JSON. Do not include markdown formatting (like ```json), and do not include any introductory or concluding text. Your entire response must be parseable by Python's json.loads().
        
        Required JSON Schema:
        {{
            "verdict": "string (e.g., 'HIRE', 'NO HIRE', 'NEEDS REVIEW')",
            "overallScore": float (out of 10.0),
            "summary": "string (Detailed executive summary of their technical performance)",
            "strengths": ["string", "string"],
            "gaps": ["string", "string"],
            "next": ["string", "string"]
        }}
        """
        
        eval_response = llm.invoke([HumanMessage(content=summary_prompt)])
        
        # 3. Aggressively clean the AI's output to ensure JSON parsing succeeds
        raw_text = eval_response.content.strip()
        if raw_text.startswith("```json"):
            raw_text = raw_text[7:]
        if raw_text.startswith("```"):
            raw_text = raw_text[3:]
        if raw_text.endswith("```"):
            raw_text = raw_text[:-3]
        raw_text = raw_text.strip()
        
        try:
            feedback_data = json.loads(raw_text)
        except json.JSONDecodeError as e:
            # If it STILL fails, print the error to your terminal so you can see what Mistral actually said
            print(f"JSON Parsing Error: {e}")
            print(f"Mistral Output was: {raw_text}")
            
            feedback_data = {
                "verdict": "SYSTEM ERROR",
                "overallScore": 0.0,
                "summary": "The AI provided an evaluation, but it could not be formatted correctly. Please check server logs.",
                "strengths": ["Data unavailable"],
                "gaps": ["Data unavailable"],
                "next": ["Check FastAPI terminal for Mistral output."]
            }
            
        return {
            "reply": "Interview completed. Generating final metrics...",
            "done": True,
            "feedback": feedback_data
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)