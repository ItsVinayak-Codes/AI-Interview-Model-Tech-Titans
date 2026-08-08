# 🧠 Neural Interface Evaluation Platform

> **An AI-powered technical interviewer and candidate evaluation engine built for the ABTALKS AI Cohort.**

| Component | Technologies & Tools |
| :--- | :--- |
| **Frontend** | `React` · `Vite` · `Tailwind CSS` |
| **Backend** | `FastAPI` · `Python 3.10+` · `Uvicorn` |
| **AI Engine** | `LangChain` · `Mistral AI` |
| **Deployment** | `Vercel` *(Frontend)* + `Render` *(Backend)* |
| **License** | `MIT` |

---

## 📌 Overview

The **Neural Interface Evaluation Platform** is a full-stack, AI-driven assessment tool that simulates a multi-turn, adaptive technical interview. Powered by **Mistral AI** via **LangChain**, the platform evaluates candidates against a 31-day AI Cohort curriculum, testing architectural reasoning, technical depth, and problem-solving capabilities in real-time.

At the end of each session, the engine generates a structured evaluation scorecard detailing overall performance scores, hiring verdicts, key technical strengths, signal gaps, and actionable next steps.

---

## ✨ Key Features

* **🤖 Adaptive AI Lead Interviewer:** Evaluates candidates through progressive question escalation (Warmup → Deep-dive → System Architecture).
* **🎯 Curriculum-Aligned (31-Day Roadmap):** Dynamically tracks and probes candidate knowledge across specific curriculum modules.
* **📊 Real-Time Evaluation Scorecards:** Automatically parses interview transcripts to produce structured hiring verdicts, overall scores, strengths, and signal gaps.
* **🎙️ Integrated Voice Synthesis (TTS):** Real-time text-to-speech feedback using the browser's Web Speech API with automatic overlap cancellation.
* **🚨 Early Termination Failsafe:** Allows candidates or evaluators to end sessions on demand while still generating a comprehensive evaluation report.
* **🎨 Cyberpunk / "Neural" UI Aesthetics:** Feature-rich interface featuring smooth text gradient flows, entry animations, responsive layouts, and Dark/Light theme toggles.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React 18 (Vite)
* **Styling:** Tailwind CSS (v4), Custom Keyframe Animations
* **Icons:** Lucide React
* **Speech Synthesis:** Native Web Speech API (`SpeechSynthesisUtterance`)

### Backend
* **Framework:** FastAPI (Python 3.10+)
* **Server:** Uvicorn
* **AI Framework:** LangChain (`langchain-mistralai`, `langchain-core`)
* **LLM Model:** Mistral AI (`ChatMistralAI`)
* **Data Validation:** Pydantic

### Infrastructure & Deployment
* **Frontend Hosting:** Vercel
* **Backend Hosting:** Render
* **Version Control:** Git & GitHub

---

## 🏗️ System Architecture

┌────────────────────────────────────────────────────────┐
│               React / Vite Frontend                    │
│   (Candidate Form | Interview Terminal | Scorecard)    │
└───────────────────────────┬────────────────────────────┘
│
HTTP / REST  │  Payload: { sessionId, message }
JSON Payload │  Response: { reply, dayCovered, done, feedback }
▼
┌────────────────────────────────────────────────────────┐
│                   FastAPI Backend                      │
│        (Session Memory Store & API Routing)            │
└───────────────────────────┬────────────────────────────┘
│
LangChain    │  System + Conversation Messages
Invocation   ▼
┌────────────────────────────────────────────────────────┐
│                   Mistral AI Engine                    │
│          (Generates Question / Summary Scorecard)      │
└────────────────────────────────────────────────────────┘

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js** (v18+ recommended)
* **Python** (v3.10+ recommended)
* **Mistral AI API Key** ([Get one here](https://console.mistral.ai/))

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create a .env file and add your Mistral API Key
echo "MISTRAL_API_KEY=your_actual_mistral_api_key_here" > .env

# Start the FastAPI development server
uvicorn main:app --reload --port 5000
The backend API will now be running locally at http://localhost:5000. You can view the interactive API docs at http://localhost:5000/docs.2. Frontend SetupBash# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# (Optional) Create a .env.local file for local development
echo "VITE_API_URL=http://localhost:5000" > .env.local

# Start the Vite development server
npm run dev
Open your browser and navigate to http://localhost:5173.⚙️ Environment VariablesLocationVariable NameRequiredDescriptionBackendMISTRAL_API_KEYYesYour API Key from Mistral AI Console.FrontendVITE_API_URLYes (Prod)The base URL of your live FastAPI backend (defaults to http://localhost:5000 locally).📡 API ReferencePrimary EndpointPOST /api/interviewRequest Payload (Start / Message / End)JSON{
  "sessionId": "sess-a1b2c3d",
  "message": "I choose to terminate this interview early.",
  "candidate": {
    "member": {
      "id": "CAND-1042",
      "name": "Aman Sharma",
      "jobRole": "AI Engineer"
    }
  }
}
Response PayloadJSON{
  "reply": "Thank you for participating. Generating your final scorecard now...",
  "dayCovered": 4,
  "done": true,
  "feedback": {
    "verdict": "READY FOR REVIEW",
    "overallScore": 8.5,
    "summary": "Candidate demonstrated strong understanding of LangChain agents and prompt structure.",
    "strengths": [
      "Clear explanation of RAG pipelines",
      "Proper handling of memory in LLM chains"
    ],
    "gaps": [
      "Could elaborate more on fine-tuning tradeoffs"
    ],
    "next": [
      "Review advanced agent orchestration patterns"
    ]
  }
}
🌐 Cloud DeploymentBackend Deployment (Render)Create a new Web Service on Render.Connect your GitHub repository and set the Root Directory to backend.Set Build Command: pip install -r requirements.txtSet Start Command: uvicorn main:app --host 0.0.0.0 --port 10000Add MISTRAL_API_KEY in the Environment Variables section.Frontend Deployment (Vercel)Import your GitHub repository on Vercel.Set the Root Directory to frontend.Add an Environment Variable:Key: VITE_API_URLValue: https://your-backend-service.onrender.comClick Deploy.📂 Project StructurePlaintext├── backend/
│   ├── main.py              # FastAPI application entry point & routes
│   ├── agent.py             # LangChain & ChatMistralAI agent logic
│   ├── requirements.txt     # Python package dependencies
│   └── .env                 # Environment variables (git-ignored)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CandidateForm.jsx         # Onboarding component
│   │   │   ├── DashboardTabs.jsx         # Instructions & Briefing
│   │   │   ├── EvaluationReport.jsx      # Final Scorecard component
│   │   │   ├── InterviewApp.jsx          # Chat terminal & UI controls
│   │   │   ├── Navbar.jsx                # Header & theme toggle
│   │   │   └── Sidebar.jsx               # Dashboard navigation sidebar
│   │   ├── data/
│   │   │   ├── candidates.json           # Preset candidates
│   │   │   └── curriculum.json           # 31-day AI Cohort curriculum
│   │   ├── App.jsx                       # Main React orchestrator & API fetcher
│   │   └── main.jsx                      # Vite React root
│   ├── package.json                      # Frontend dependencies & scripts
│   └── vite.config.js                    # Vite build configuration
│
├── prompts.md                # Comprehensive log of AI prompts used during development
└── README.md                 # Project documentation
📝 LicenseDistributed under the MIT License. See LICENSE for more information.