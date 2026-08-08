import os
import json
from dotenv import load_dotenv
from langchain_mistralai import ChatMistralAI
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

load_dotenv()

llm = ChatMistralAI(
    model="mistral-large-latest",
    mistral_api_key=os.getenv("MISTRAL_API_KEY"),
    temperature=0.7 
)

def load_curriculum():
    with open("data/curriculum.json", "r") as f:
        return json.load(f)

def get_agent_response(candidate_id, user_response, question_count, history, completed_days):
    curriculum_data = load_curriculum()
    
    # Map the candidate's completed day numbers to the exact curriculum objects
    day_details = []
    for day_obj in curriculum_data.get("days", []):
        if day_obj["day"] in completed_days:
            day_details.append({
                "day": day_obj["day"],
                "title": day_obj["title"],
                "tools": day_obj["tools"],
                "objectives": day_obj["objectives"]
            })
    
    # --- DYNAMIC PROMPT ENGINEERING ---
    system_instruction = f"""
    You are an expert AI Technical Interviewer evaluating a candidate for the 31-Day AI Cohort.
    
    The candidate has mastered the following curriculum milestones:
    {json.dumps(day_details, indent=2)}
    
    Current Progress: Question {question_count} of 8.
    
    INSTRUCTIONS:
    1. Ask technical, scenario-based interview questions drawing directly from the tools and objectives listed above.
    2. Assess the candidate's architectural reasoning and practical experience.
    3. If their answer is shallow, ask a probing follow-up targeting edge cases.
    4. If they demonstrate mastery, transition smoothly to a different completed day's topic.
    5. Keep the tone professional, concise, and rigorous. Do not use markdown bullet lists for questions; speak conversationally.
    """
    
    messages = [SystemMessage(content=system_instruction)]
    
    for msg in history:
        if msg["sender"] == "agent":
            messages.append(AIMessage(content=msg["text"]))
        elif msg["sender"] == "candidate":
            messages.append(HumanMessage(content=msg["text"]))
            
    ai_response = llm.invoke(messages)
    
    # Rotate through the completed days for tracking in the UI header
    current_day = completed_days[(question_count - 1) % len(completed_days)]
    
    return {
        "reply": ai_response.content,
        "nextQuestionCount": question_count + 1,
        "currentDay": f"Day {current_day}",
        "isComplete": question_count >= 8
    }