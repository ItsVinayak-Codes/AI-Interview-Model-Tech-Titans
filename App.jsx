import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Mic, 
  MicOff, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Code, 
  Award, 
  BarChart3, 
  Users, 
  User,
  BookOpen, 
  Cpu, 
  Terminal, 
  ArrowRight, 
  Zap, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ShieldAlert, 
  Download, 
  Layers, 
  Check, 
  X, 
  ChevronRight, 
  FileText, 
  Activity, 
  Brain, 
  Radio,
  Sliders,
  Database,
  Server,
  Share2,
  Copy,
  Info,
  Filter,
  ArrowUpDown,
  Search,
  Settings,
  LogOut,
  SlidersHorizontal,
  TrendingUp,
  CheckSquare,
  ArrowDown,
  Sparkle,
  Target,
  Shield,
  UserCheck,
  Flame,
  ChevronDown,
  Compass
} from 'lucide-react';

const CURRICULUM_DATA = {
  "cohort": "AI Cohort · 31 days · 8 modules",
  "modules": [
    { "n": 1, "title": "Environment & Tooling", "days": [1, 3] },
    { "n": 2, "title": "Data Foundations", "days": [4, 6] },
    { "n": 3, "title": "Embeddings & Vector Search", "days": [7, 10] },
    { "n": 4, "title": "LLM Core, Prompting & Fine-Tuning", "days": [11, 15] },
    { "n": 5, "title": "Chatbot Application Build", "days": [16, 20] },
    { "n": 6, "title": "Agentic AI & MCP", "days": [21, 24] },
    { "n": 7, "title": "Evaluation, Security & Deployment", "days": [25, 28] },
    { "n": 8, "title": "Production & Capstone", "days": [29, 31] }
  ],
  "days": [
    { "day": 1, "title": "VS Code & Python Environment Setup", "type": "SETUP", "tools": ["VS Code", "Python", "Virtual Environment"], "objectives": ["Install VS Code and Python", "Create virtual environment", "Run & debug Python program"] },
    { "day": 2, "title": "Local LLM & AI Coding Assistant Setup", "type": "SETUP", "tools": ["Ollama", "Qwen2.5-Coder", "GitHub Copilot", "Cline"], "objectives": ["Install Ollama and download coding model", "Connect VS Code to local model"] },
    { "day": 3, "title": "First AI Project, React Frontend & GitHub", "type": "BUILD", "tools": ["Python", "Ollama", "FastAPI", "React", "Git"], "objectives": ["Build CLI chatbot", "FastAPI backend + React frontend"] },
    { "day": 4, "title": "Reading & Processing Structured Data", "type": "BUILD", "tools": ["Pandas", "SQLite", "SQLAlchemy"], "objectives": ["Process CSV data with Pandas", "Store in SQLite and query with SQL"] },
    { "day": 5, "title": "Reading & Processing Unstructured Data", "type": "BUILD", "tools": ["pdfplumber", "PyPDF", "Tesseract OCR", "BeautifulSoup"], "objectives": ["Extract text from PDFs & DOCX", "OCR scanned forms", "Scrape healthcare web content"] },
    { "day": 6, "title": "Building the Knowledge Base", "type": "BUILD", "tools": ["LangChain Text Splitters", "JSONL"], "objectives": ["Convert data into unified knowledge base", "Chunk documents and attach metadata"] },
    { "day": 7, "title": "Embeddings Explained", "type": "AI_CORE", "tools": ["Sentence Transformers", "OpenAI Embeddings", "Scikit-learn"], "objectives": ["Understand text to vector transformation", "Generate embeddings and visualize clusters with PCA"] },
    { "day": 8, "title": "Vector Databases Overview", "type": "BUILD", "tools": ["ChromaDB", "Pinecone"], "objectives": ["Understand vector DB role in RAG", "Compare local ChromaDB vs cloud Pinecone"] },
    { "day": 9, "title": "Building & Populating Vector DB", "type": "BUILD", "tools": ["ChromaDB", "Sentence Transformers"], "objectives": ["Load embeddings into ChromaDB", "Test semantic search & metadata filtering"] },
    { "day": 10, "title": "Retrieval & Matching Engine", "type": "SHIP_IT", "tools": ["SQLite", "ChromaDB", "Python"], "objectives": ["Build query router (SQL vs Vector vs Hybrid)", "Deduplicate and merge multi-source results"] },
    { "day": 11, "title": "RAG End-to-End & LLM API Basics", "type": "BUILD", "tools": ["OpenAI SDK", "Ollama", "Groq"], "objectives": ["Connect retrieval engine to LLM", "Create grounded prompts answering from context"] },
    { "day": 12, "title": "Prompt Engineering Fundamentals", "type": "LEARN", "tools": ["LLMs", "Prompt Templates"], "objectives": ["Zero-shot, few-shot & chain-of-thought", "Evaluate prompts for compliance and accuracy"] },
    { "day": 13, "title": "Advanced Prompting: Function Calling & Structured Outputs", "type": "BUILD", "tools": ["OpenAI Function Calling", "Pydantic"], "objectives": ["Define tool schemas and automatic execution", "Validate outputs using Pydantic models"] },
    { "day": 14, "title": "Fine-Tuning: Concepts & When to Use It", "type": "LEARN", "tools": ["JSONL", "OpenAI", "LoRA", "QLoRA"], "objectives": ["Understand fine-tuning vs RAG vs Prompting", "Prepare high quality fine-tuning datasets"] },
    { "day": 15, "title": "Fine-Tuning: Hands-On with LoRA & QLoRA", "type": "SHIP_IT", "tools": ["PEFT", "Transformers", "BitsAndBytes", "LoRA"], "objectives": ["Train model with LoRA/QLoRA", "Evaluate tone & consistency improvements over base model"] },
    { "day": 16, "title": "Chatbot Backend & API Integration", "type": "BUILD", "tools": ["FastAPI", "SQLite", "Python"], "objectives": ["Create /chat endpoint integrating RAG & tools", "Session conversation management"] },
    { "day": 17, "title": "Chatbot Frontend Development", "type": "BUILD", "tools": ["Streamlit", "Requests"], "objectives": ["Build interactive chat interface", "Connect frontend to FastAPI backend"] },
    { "day": 18, "title": "Full-Stack Integration & Streaming", "type": "BUILD", "tools": ["FastAPI", "StreamingResponse", "SSE", "Streamlit"], "objectives": ["Real-time streaming responses from LLM", "Token-by-token UI rendering"] },
    { "day": 19, "title": "Response Formatting & Rich Outputs", "type": "BUILD", "tools": ["Pydantic", "Markdown", "Streamlit"], "objectives": ["Add citations from retrieved context", "Render structured cards and markdown tables"] },
    { "day": 20, "title": "Conversation Memory & Context Management", "type": "SHIP_IT", "tools": ["SQLite", "FastAPI", "Token Management"], "objectives": ["Persist history across sessions", "Context summarization and token limit management"] },
    { "day": 21, "title": "Agentic Frameworks: LangChain & Tool Use", "type": "BUILD", "tools": ["LangChain", "ReAct", "Python"], "objectives": ["Build ReAct reasoning agent", "Analyze execution traces and tool selection"] },
    { "day": 22, "title": "Multi-Agent Orchestration", "type": "BUILD", "tools": ["CrewAI", "LangGraph", "Python"], "objectives": ["Build specialized domain agents", "Router agent delegating to specialists"] },
    { "day": 23, "title": "Model Context Protocol (MCP)", "type": "BUILD", "tools": ["MCP Python SDK", "Claude Desktop", "Cline"], "objectives": ["Understand MCP standard", "Expose chatbot tools via custom MCP server"] },
    { "day": 24, "title": "Agentic Chatbot Integration", "type": "SHIP_IT", "tools": ["LangChain", "MCP", "FastAPI"], "objectives": ["Integrate agents, MCP tools, retrieval & memory", "Implement retries and fallback handling"] },
    { "day": 25, "title": "Chatbot Evaluation & Testing", "type": "SHIP_IT", "tools": ["Evaluation Dataset", "Automated Testing"], "objectives": ["Benchmark accuracy, grounding, and retrieval", "Document baseline metrics"] },
    { "day": 26, "title": "Performance Optimization & Cost", "type": "OPTIMIZE", "tools": ["tiktoken", "FastAPI", "Caching"], "objectives": ["Measure token usage and latency", "Implement caching and prompt optimization"] },
    { "day": 27, "title": "Security, Privacy & Guardrails", "type": "BUILD", "tools": ["FastAPI", "Input Validation", "Guardrails"], "objectives": ["Protect against prompt injection & jailbreaks", "Sanitize sensitive healthcare data"] },
    { "day": 28, "title": "Docker & Kubernetes Deployment", "type": "SHIP_IT", "tools": ["Docker", "Kubernetes", "FastAPI"], "objectives": ["Containerize backend and frontend", "Deploy to Kubernetes with health checks"] },
    { "day": 29, "title": "Monitoring, Logging & Observability", "type": "BUILD", "tools": ["Prometheus", "Grafana", "Python Logging"], "objectives": ["Structured logging and metric tracking", "Build dashboards for latency and failures"] },
    { "day": 30, "title": "Production Readiness & Final Testing", "type": "SHIP_IT", "tools": ["FastAPI", "Docker", "Kubernetes"], "objectives": ["E2E stress testing", "Fix production bugs & prepare ops documentation"] },
    { "day": 31, "title": "Capstone Project & Final Demo", "type": "CAPSTONE", "tools": ["FastAPI", "React", "LangChain", "MCP", "K8s"], "objectives": ["Demonstrate enterprise healthcare AI chatbot", "Present end-to-end architecture"] }
  ]
};

const CANDIDATES_DATA = [
  {
    "member": { "id": "CAND-8924A", "name": "Emily Chen", "jobRole": "Senior AI Engineer", "yearsExperience": 8, "level": "L6", "status": "READY" },
    "metrics": { "sysScore": 98, "codeQlt": "A+", "models": 12, "progress": 100 },
    "missions": [
      { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 1 },
      { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 1 },
      { "day": 10, "title": "Retrieval & Matching Engine", "passed": true, "attempts": 1 },
      { "day": 11, "title": "RAG End-to-End & LLM API Basics", "passed": true, "attempts": 1 },
      { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 1 },
      { "day": 13, "title": "Function Calling & Structured Outputs", "passed": true, "attempts": 1 },
      { "day": 21, "title": "LangChain Agents", "passed": true, "attempts": 1 },
      { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 1 },
      { "day": 23, "title": "Model Context Protocol (MCP)", "passed": true, "attempts": 1 },
      { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 1 }
    ],
    "signals": { "commitDays": 31, "missionsCompleted": 31, "missionsFirstTry": 30 },
    "evaluation": {
      "verdict": "HIRE - EXCEPTIONAL FIT",
      "summary": "Candidate demonstrated deep mastery of LLM orchestration and vector database optimization. They consistently structured solutions with high-performance heuristics in mind, treating edge cases not as afterthoughts, but as core constraints. Communication was direct, highly technical, and immediately actionable.",
      "scores": { "technicalDepth": "9.5/10", "communication": "8.8/10", "problemSolving": "9.2/10", "systemDesign": "9.4/10" },
      "radarSkills": [
        { "axis": "RAG & Vector Search", "val": 95 },
        { "axis": "Function Calling", "val": 90 },
        { "axis": "Multi-Agent Systems", "val": 88 },
        { "axis": "MCP & Architecture", "val": 96 },
        { "axis": "DevOps & K8s", "val": 85 }
      ],
      "strengths": [
        { "name": "System Architecture & Design", "val": 95 },
        { "name": "Algorithmic Vector Optimization", "val": 90 },
        { "name": "Multi-Agent Workflows", "val": 88 }
      ],
      "gaps": [
        { "title": "Frontend Meta-Frameworks", "desc": "Less familiar with specific React meta-frameworks. Short ramp-up recommended." },
        { "title": "Legacy System Migration", "desc": "Favors clean rewrites over refactoring. Safe strangler-fig pattern coaching advised." }
      ],
      "nextSteps": [
        "Extend formal offer within 24 hours.",
        "Align on start date and onboarding cohort.",
        "Prepare initial mission briefing focused on high-throughput vector pipeline."
      ]
    }
  },
  {
    "member": { "id": "CAND-001", "name": "Sarah Johnson", "jobRole": "Data Scientist", "yearsExperience": 5, "level": "L4", "status": "IN INTERVIEW" },
    "metrics": { "sysScore": 85, "codeQlt": "B", "models": 4, "progress": 50 },
    "missions": [
      { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 1 },
      { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 1 },
      { "day": 10, "title": "Retrieval & Matching Engine", "passed": true, "attempts": 2 },
      { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 4 },
      { "day": 16, "title": "Chatbot Backend & API Integration", "passed": true, "attempts": 1 },
      { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 2 },
      { "day": 23, "title": "Model Context Protocol (MCP)", "passed": true, "attempts": 2 },
      { "day": 28, "title": "Docker & Kubernetes Deployment", "passed": true, "attempts": 3 },
      { "day": 29, "title": "Monitoring, Logging & Observability", "skipped": true },
      { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 1 }
    ],
    "signals": { "commitDays": 28, "missionsCompleted": 30, "missionsFirstTry": 20 },
    "evaluation": {
      "verdict": "HIRE - STRONG BACKEND",
      "summary": "Sarah displays strong data engineering and analytical fundamentals. She navigated vector embeddings and ChromaDB effortlessly. Prompt engineering required a few iterations, but her core architecture is sound.",
      "scores": { "technicalDepth": "8.5/10", "communication": "8.2/10", "problemSolving": "8.7/10", "systemDesign": "8.0/10" },
      "radarSkills": [
        { "axis": "RAG & Vector Search", "val": 88 },
        { "axis": "Function Calling", "val": 80 },
        { "axis": "Multi-Agent Systems", "val": 75 },
        { "axis": "MCP & Architecture", "val": 82 },
        { "axis": "DevOps & K8s", "val": 70 }
      ],
      "strengths": [
        { "name": "Vector Pipeline Design", "val": 88 },
        { "name": "Database Schema Optimization", "val": 92 },
        { "name": "API Data Contracts", "val": 80 }
      ],
      "gaps": [
        { "title": "Observability Telemetry", "desc": "Skipped Prometheus and Grafana logging. Needs grounding in production observability." }
      ],
      "nextSteps": [
        "Schedule follow-up review on production telemetry.",
        "Proceed to team fit interview round."
      ]
    }
  },
  {
    "member": { "id": "CAND-003", "name": "David Kim", "jobRole": "ML Engineer", "yearsExperience": 3, "level": "L3", "status": "COMPLETED" },
    "metrics": { "sysScore": 72, "codeQlt": "C+", "models": 1, "progress": 100 },
    "missions": [
      { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 4 },
      { "day": 8, "title": "Vector Databases Overview", "passed": true, "attempts": 5 },
      { "day": 10, "title": "Retrieval & Matching Engine", "passed": true, "attempts": 5 },
      { "day": 12, "title": "Prompt Engineering Fundamentals", "passed": true, "attempts": 3 },
      { "day": 16, "title": "Chatbot Backend & API Integration", "passed": true, "attempts": 2 },
      { "day": 20, "title": "Conversation Memory & Context Management", "passed": true, "attempts": 3 },
      { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 4 },
      { "day": 23, "title": "Model Context Protocol (MCP)", "passed": true, "attempts": 5 },
      { "day": 28, "title": "Docker & Kubernetes Deployment", "skipped": true },
      { "day": 31, "title": "Capstone Project & Final Demo", "passed": true, "attempts": 2 }
    ],
    "signals": { "commitDays": 18, "missionsCompleted": 28, "missionsFirstTry": 6 },
    "evaluation": {
      "verdict": "CONSIDER FOR JUNIOR ROLE",
      "summary": "David has great determination and completed cohort challenges despite multiple attempts on complex agent routing and vector database setups. Skipped Kubernetes deployment due to time constraints.",
      "scores": { "technicalDepth": "7.0/10", "communication": "7.5/10", "problemSolving": "7.2/10", "systemDesign": "6.8/10" },
      "radarSkills": [
        { "axis": "RAG & Vector Search", "val": 68 },
        { "axis": "Function Calling", "val": 72 },
        { "axis": "Multi-Agent Systems", "val": 65 },
        { "axis": "MCP & Architecture", "val": 70 },
        { "axis": "DevOps & K8s", "val": 50 }
      ],
      "strengths": [
        { "name": "Persistence & Debugging", "val": 85 },
        { "name": "Basic Prompt Engineering", "val": 75 },
        { "name": "FastAPI Integration", "val": 70 }
      ],
      "gaps": [
        { "title": "Container Orchestration", "desc": "Lacks hands-on experience with Kubernetes manifests and multi-stage Docker builds." }
      ],
      "nextSteps": [
        "Assign dedicated mentor for infrastructure & K8s.",
        "Consider L3 entry-level role placement."
      ]
    }
  }
];

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

async function callGeminiInterviewAgent(messages, candidate, history, apiKey = "") {
  const skippedMissions = candidate.missions.filter(m => m.skipped).map(m => `Day ${m.day}: ${m.title}`);
  const highAttemptMissions = candidate.missions.filter(m => m.attempts > 3).map(m => `Day ${m.day}: ${m.title} (${m.attempts} attempts)`);
  
  const systemInstruction = `
You are the NEURAL INTERFACE AI Lead Technical Interviewer evaluating candidate ${candidate.member.name} (${candidate.member.jobRole}).

CANDIDATE PROFILE:
- ID: ${candidate.member.id}
- Name: ${candidate.member.name}
- Job Role: ${candidate.member.jobRole} (${candidate.member.yearsExperience || 5} yrs experience)
- Skipped Missions: ${skippedMissions.length > 0 ? skippedMissions.join(', ') : 'None'}
- High Attempt Topics: ${highAttemptMissions.length > 0 ? highAttemptMissions.join(', ') : 'None'}
- Completed Missions: ${candidate.signals?.missionsCompleted || 30}/31

CRITICAL INTERVIEW & EVALUATION GUIDELINES:
1. Act like a rigorous, realistic Principal AI Architect. Ask ONE focused, high-signal technical question at a time.
2. Adapt dynamically based on actual candidate answers. If they give shallow answers, probe deeper or adjust their score in that domain.
3. Assess across at least 4 different curriculum days (e.g., Day 10 Query Router, Day 13 Tool Calling, Day 22 Multi-Agent, Day 23 MCP, Day 28 K8s).
4. Require 8 questions before wrapping up unless terminated.
5. WHEN FINISHED (done=true), CRITICALLY EVALUATE the candidate's answers in history:
   - Provide realistic numeric scores (0.0 to 10.0) based on actual technical correctness.
   - List specific candidate strengths and identified gaps observed in the transcript.
   - Supply radar skill points (scale 0-100) for 5 core axes:
     1) RAG & Vector Search
     2) Function Calling & Schemas
     3) Multi-Agent Orchestration
     4) MCP & System Architecture
     5) DevOps & Security
6. RESPOND IN VALID JSON FORMAT ONLY:
   {
     "reply": "Conversational question or concluding response",
     "done": boolean,
     "questionNumber": number,
     "dayCovered": number,
     "feedback": null or {
        "verdict": "HIRE - EXCEPTIONAL FIT" | "HIRE - STRONG BACKEND" | "CONSIDER FOR JUNIOR ROLE" | "DO NOT HIRE - SKILLS GAP",
        "summary": "Direct, realistic performance synthesis of candidate's actual answers",
        "scores": {
          "technicalDepth": "8.5/10",
          "communication": "8.0/10",
          "problemSolving": "8.7/10",
          "systemDesign": "8.2/10"
        },
        "radarSkills": [
          { "axis": "RAG & Vector Search", "val": 88 },
          { "axis": "Function Calling", "val": 82 },
          { "axis": "Multi-Agent Systems", "val": 75 },
          { "axis": "MCP & Architecture", "val": 90 },
          { "axis": "DevOps & K8s", "val": 70 }
        ],
        "strengths": [
          { "name": "Query Routing & Vector Search", "val": 88 },
          { "name": "Structured Output Validation", "val": 82 },
          { "name": "Architecture System Design", "val": 90 }
        ],
        "gaps": [
          { "title": "Missing Telemetry", "desc": "Lacks hands-on depth with Prometheus/Grafana monitoring." }
        ],
        "next": ["Array of realistic, actionable next steps"]
     }
   }
`;

  try {
    const contents = history.map(h => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: typeof h.content === 'string' ? h.content : JSON.stringify(h.content) }]
    }));

    if (messages) {
      contents.push({ role: 'user', parts: [{ text: messages }] });
    }

    const payload = {
      contents: contents,
      systemInstruction: { parts: [{ text: systemInstruction }] },
      generationConfig: { responseMimeType: "application/json" }
    };

    const url = apiKey ? `${GEMINI_API_URL}?key=${apiKey}` : GEMINI_API_URL;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (textResult) return JSON.parse(textResult);
  } catch (err) {
    console.warn("Using Neural Agent Fallback Simulation Engine:", err.message);
  }

  const turn = history.filter(h => h.role === 'model').length + 1;
  return generateSimulatedResponse(candidate, history, messages, turn);
}

function generateSimulatedResponse(candidate, history, userMsg, turn) {
  const name = candidate.member.name;
  const role = candidate.member.jobRole;

  const userTurns = history.filter(h => h.role === 'user');
  const totalLength = userTurns.reduce((acc, curr) => acc + (curr.content ? curr.content.length : 0), 0);
  const avgResponseLen = userTurns.length ? Math.round(totalLength / userTurns.length) : 0;
  
  const fullTranscript = userTurns.map(t => t.content || "").join(" ").toLowerCase();
  const mentionsVector = fullTranscript.includes("vector") || fullTranscript.includes("embedding") || fullTranscript.includes("rag");
  const mentionsPydantic = fullTranscript.includes("pydantic") || fullTranscript.includes("schema") || fullTranscript.includes("validation");
  const mentionsAgents = fullTranscript.includes("agent") || fullTranscript.includes("langgraph") || fullTranscript.includes("crewai") || fullTranscript.includes("react");
  const mentionsMcp = fullTranscript.includes("mcp") || fullTranscript.includes("protocol") || fullTranscript.includes("tool");
  const mentionsDevOps = fullTranscript.includes("docker") || fullTranscript.includes("k8s") || fullTranscript.includes("kubernetes") || fullTranscript.includes("container");

  let qualityFactor = 0.65;
  if (avgResponseLen > 80) qualityFactor += 0.15;
  if (avgResponseLen > 150) qualityFactor += 0.10;
  if (mentionsVector) qualityFactor += 0.02;
  if (mentionsPydantic) qualityFactor += 0.02;
  if (mentionsAgents) qualityFactor += 0.02;
  if (mentionsMcp) qualityFactor += 0.02;
  if (mentionsDevOps) qualityFactor += 0.02;
  qualityFactor = Math.min(0.98, qualityFactor);

  const scoreTech = (qualityFactor * 10).toFixed(1);
  const scoreComm = (Math.min(9.8, qualityFactor * 9.5 + (avgResponseLen > 100 ? 0.8 : 0.2))).toFixed(1);
  const scoreProb = (qualityFactor * 9.6).toFixed(1);
  const scoreSys = (qualityFactor * 9.2).toFixed(1);

  if (turn === 1) {
    return {
      reply: `Mission Control link established. Welcome, ${name}! As a ${role}, you've completed our 31-day AI Cohort. Let's evaluate your depth on Day 10 (Retrieval & Matching Engine). You built a query router between SQL, vector search, and hybrid retrieval. What specific heuristics did your router use to classify user intent, and how did you prevent false semantic matches in ChromaDB?`,
      done: false,
      questionNumber: 1,
      dayCovered: 10,
      feedback: null
    };
  } else if (turn === 2) {
    return {
      reply: `Good analysis on query intent routing! Now moving to Day 13 (Function Calling & Structured Outputs). In your LLM tool schemas, how did you handle malformed arguments from the LLM, and what strategy did you use with Pydantic for validation retries?`,
      done: false,
      questionNumber: 2,
      dayCovered: 13,
      feedback: null
    };
  } else if (turn === 3) {
    return {
      reply: `Noted on function validation. Moving to Agentic AI (Day 22): When orchestrating multi-agent workflows with CrewAI or LangGraph, how did you prevent infinite loops or tool execution cycles between specialist agents?`,
      done: false,
      questionNumber: 3,
      dayCovered: 22,
      feedback: null
    };
  } else if (turn === 4) {
    return {
      reply: `Understood. Now let's discuss Model Context Protocol (MCP) from Day 23. What specific architectural benefits does exposing tools via custom MCP servers provide compared to standard inline function calling?`,
      done: false,
      questionNumber: 4,
      dayCovered: 23,
      feedback: null
    };
  } else if (turn === 5) {
    return {
      reply: `Great breakdown of MCP boundaries. On Day 28 (Docker & Kubernetes Deployment), how did you optimize your multi-stage Dockerfile to keep the backend image lightweight while accommodating PyTorch and model dependencies?`,
      done: false,
      questionNumber: 5,
      dayCovered: 28,
      feedback: null
    };
  } else if (turn === 6) {
    return {
      reply: `Good container optimization. On Day 26 (Performance & Cost Optimization), how did you measure token consumption across your RAG pipeline, and how was semantic caching configured?`,
      done: false,
      questionNumber: 6,
      dayCovered: 26,
      feedback: null
    };
  } else if (turn === 7) {
    return {
      reply: `Smart caching approach. On Day 27 (Security & Guardrails), how did you safeguard your RAG context against prompt injection or indirect jailbreaks hidden inside uploaded unstructured documents?`,
      done: false,
      questionNumber: 7,
      dayCovered: 27,
      feedback: null
    };
  } else {
    let verdict = "HIRE - EXCEPTIONAL FIT";
    if (qualityFactor < 0.70) verdict = "CONSIDER FOR JUNIOR ROLE";
    else if (qualityFactor < 0.82) verdict = "HIRE - STRONG BACKEND";

    const ragVal = Math.round(qualityFactor * 92);
    const funcVal = Math.round(qualityFactor * 88);
    const agentVal = Math.round(qualityFactor * 85);
    const mcpVal = Math.round(qualityFactor * 94);
    const devopsVal = Math.round(qualityFactor * 80);

    return {
      reply: `Evaluation complete, ${name}! You have provided technical responses across ${userTurns.length} turns during this session. Closing technical interview loop. Your performance radar chart and structured evaluation scorecard are generated below.`,
      done: true,
      questionNumber: 8,
      dayCovered: 31,
      feedback: {
        verdict: verdict,
        summary: `${name} (${role}) completed an adaptive ${userTurns.length}-turn evaluation. Candidate demonstrated ${avgResponseLen > 100 ? 'thorough and articulate' : 'concise'} technical explanations across Vector Search, Function Schemas, Multi-Agent Routing, and MCP Tooling.`,
        scores: {
          technicalDepth: `${scoreTech}/10`,
          communication: `${scoreComm}/10`,
          problemSolving: `${scoreProb}/10`,
          systemDesign: `${scoreSys}/10`
        },
        radarSkills: [
          { axis: "RAG & Vector Search", val: ragVal },
          { axis: "Function Calling", val: funcVal },
          { axis: "Multi-Agent Systems", val: agentVal },
          { axis: "MCP & Architecture", val: mcpVal },
          { axis: "DevOps & K8s", val: devopsVal }
        ],
        strengths: [
          { name: "Query Router & Vector Search", val: ragVal },
          { name: "MCP Tooling & System Boundaries", val: mcpVal },
          { name: "Pydantic Schema Validation", val: funcVal }
        ],
        gaps: [
          { title: "Observability Telemetry", desc: "Limited depth mentioned around Prometheus/Grafana metric scrapers." },
          { title: "Edge Case Error Fallbacks", desc: "Recommended to implement strict timeout handling on multi-agent execution loops." }
        ],
        next: [
          "Extend formal offer aligned with evaluated technical score.",
          "Schedule technical onboarding session for enterprise RAG rebuild.",
          "Assign initial mission: High-throughput vector indexing pipeline optimization."
        ]
      }
    };
  }
}

function SkillRadarChart({ skills = [] }) {
  if (!skills || skills.length === 0) return null;

  const size = 260;
  const center = size / 2;
  const radius = 90;
  const angleStep = (Math.PI * 2) / skills.length;

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getCoordinates = (value, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = radius * (value / 100);
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const polygonPoints = skills
    .map((s, i) => {
      const { x, y } = getCoordinates(s.val, i);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <svg width={size} height={size} className="overflow-visible">
        {gridLevels.map((lvl, levelIdx) => {
          const levelPoints = skills
            .map((_, i) => {
              const angle = i * angleStep - Math.PI / 2;
              const r = radius * lvl;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            })
            .join(' ');

          return (
            <polygon
              key={levelIdx}
              points={levelPoints}
              fill="none"
              stroke="#1E293B"
              strokeWidth="1"
              strokeDasharray={levelIdx === gridLevels.length - 1 ? 'none' : '2,2'}
            />
          );
        })}

        {skills.map((s, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const xEnd = center + radius * Math.cos(angle);
          const yEnd = center + radius * Math.sin(angle);
          
          const xLabel = center + (radius + 22) * Math.cos(angle);
          const yLabel = center + (radius + 18) * Math.sin(angle);

          return (
            <g key={i}>
              <line x1={center} y1={center} x2={xEnd} y2={yEnd} stroke="#1E293B" strokeWidth="1" />
              <text
                x={xLabel}
                y={yLabel}
                fill="#94A3B8"
                fontSize="9"
                fontFamily="monospace"
                textAnchor="middle"
                dominantBaseline="middle"
                className="select-none font-bold"
              >
                {s.axis}
              </text>
            </g>
          );
        })}

        <polygon
          points={polygonPoints}
          fill="rgba(0, 240, 255, 0.25)"
          stroke="#00F0FF"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]"
        />

        {skills.map((s, i) => {
          const { x, y } = getCoordinates(s.val, i);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#00F0FF"
              stroke="#070A13"
              strokeWidth="1.5"
              className="hover:scale-125 transition-transform"
            />
          );
        })}
      </svg>
    </div>
  );
}

export default function App() {
  const [viewMode, setViewMode] = useState('welcome');
  const [activeTab, setActiveTab] = useState('home');
  const [candidatesList, setCandidatesList] = useState(CANDIDATES_DATA);
  const [selectedCandidate, setSelectedCandidate] = useState(CANDIDATES_DATA[0]);

  const [candidateForm, setCandidateForm] = useState({
    name: '',
    id: '',
    jobRole: 'Senior AI Engineer',
    yearsExperience: 5
  });

  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [history, setHistory] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [finalFeedback, setFinalFeedback] = useState(null);
  const [coveredDays, setCoveredDays] = useState(new Set());

  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState("gemini-3-flash-preview");

  const [apiReqBody, setApiReqBody] = useState("");
  const [apiResBody, setApiResBody] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);

  const formRef = useRef(null);
  const chatEndRef = useRef(null);
  const sessionId = "SESSION-" + Math.floor(100000 + Math.random() * 900000);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isLoading]);

  const speakText = (text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleStartInterview = async (candidate) => {
    setIsInterviewStarted(true);
    setHistory([]);
    setIsDone(false);
    setFinalFeedback(null);
    setCoveredDays(new Set());
    setIsLoading(true);

    const initialResult = await callGeminiInterviewAgent(null, candidate, [], apiKey);
    
    setIsLoading(false);
    if (initialResult) {
      setHistory([{
        role: 'model',
        content: initialResult.reply,
        questionNum: initialResult.questionNumber || 1,
        day: initialResult.dayCovered || 10
      }]);
      if (initialResult.dayCovered) {
        setCoveredDays(prev => new Set(prev).add(initialResult.dayCovered));
      }
      speakText(initialResult.reply);
    }
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading || isDone) return;

    const userMsg = inputText.trim();
    setInputText("");
    
    const updatedHistory = [...history, { role: 'user', content: userMsg }];
    setHistory(updatedHistory);
    setIsLoading(true);

    const result = await callGeminiInterviewAgent(userMsg, selectedCandidate, updatedHistory, apiKey);
    
    setIsLoading(false);
    if (result) {
      setHistory(prev => [
        ...prev,
        {
          role: 'model',
          content: result.reply,
          questionNum: result.questionNumber,
          day: result.dayCovered
        }
      ]);

      if (result.dayCovered) {
        setCoveredDays(prev => new Set(prev).add(result.dayCovered));
      }

      speakText(result.reply);

      if (result.done) {
        setIsDone(true);
        setFinalFeedback(result.feedback);
      }
    }
  };

  const handleOnboardingSubmit = (e) => {
    e?.preventDefault();
    const finalName = candidateForm.name.trim() || 'Alex Mercer';
    const finalId = candidateForm.id.trim() || 'CAND-' + Math.floor(1000 + Math.random() * 9000);
    const finalRole = candidateForm.jobRole || 'Senior AI Engineer';

    const existing = candidatesList.find(c => c.member.id.toLowerCase() === finalId.toLowerCase() || c.member.name.toLowerCase() === finalName.toLowerCase());

    let candidateObj;
    if (existing) {
      candidateObj = existing;
    } else {
      candidateObj = {
        member: {
          id: finalId,
          name: finalName,
          jobRole: finalRole,
          yearsExperience: Number(candidateForm.yearsExperience) || 5,
          level: "L5",
          status: "READY"
        },
        metrics: { sysScore: 91, codeQlt: "A", models: 8, progress: 100 },
        missions: [
          { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 1 },
          { "day": 10, "title": "Retrieval & Matching Engine", "passed": true, "attempts": 1 },
          { "day": 13, "title": "Function Calling & Structured Outputs", "passed": true, "attempts": 1 },
          { "day": 22, "title": "Multi-Agent Orchestration", "passed": true, "attempts": 1 },
          { "day": 23, "title": "Model Context Protocol (MCP)", "passed": true, "attempts": 1 },
          { "day": 28, "title": "Docker & Kubernetes Deployment", "passed": true, "attempts": 2 }
        ],
        signals: { "commitDays": 30, "missionsCompleted": 30, "missionsFirstTry": 26 },
        evaluation: {
          verdict: "HIRE - HIGH POTENTIAL",
          summary: `${finalName} registered into the Neural Interview pipeline. Completed core cohort milestones across RAG, Vector Search, and Multi-Agent Orchestration.`,
          scores: { technicalDepth: "9.0/10", communication: "8.5/10", problemSolving: "8.8/10", systemDesign: "8.5/10" },
          radarSkills: [
            { axis: "RAG & Vector Search", val: 90 },
            { axis: "Function Calling", val: 85 },
            { axis: "Multi-Agent Systems", val: 80 },
            { axis: "MCP & Architecture", val: 88 },
            { axis: "DevOps & K8s", val: 75 }
          ],
          strengths: [
            { name: "Retrieval Architecture", val: 92 },
            { name: "Agent Tool Selection", val: 88 },
            { name: "System Scalability", val: 85 }
          ],
          gaps: [
            { title: "Observability Telemetry", desc: "Requires further familiarity with Prometheus / Grafana instrumentation." }
          ],
          nextSteps: [
            "Initiate interactive technical evaluation interview.",
            "Review generated assessment feedback report upon completion."
          ]
        }
      };
      setCandidatesList(prev => [candidateObj, ...prev]);
    }

    setSelectedCandidate(candidateObj);
    setViewMode('dashboard');
    setActiveTab('home');
  };

  const handleSelectPresetCandidate = (c) => {
    setCandidateForm({
      name: c.member.name,
      id: c.member.id,
      jobRole: c.member.jobRole,
      yearsExperience: c.member.yearsExperience
    });
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen bg-[#070A13] text-slate-200 font-mono overflow-hidden select-none">
      
      {/* Welcome Mode View */}
      {viewMode === 'welcome' && (
        <div className="flex-1 flex flex-col overflow-y-auto bg-[#070A13] relative">
          
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <header className="h-20 border-b border-[#1E293B] bg-[#0A0E1A]/90 backdrop-blur px-8 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#111827] border border-[#00F0FF] flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.4)]">
                <Brain className="w-5 h-5 text-[#00F0FF]" />
              </div>
              <div>
                <h1 className="font-bold text-sm tracking-widest text-[#A855F7] uppercase drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                  NEURAL INTERFACE
                </h1>
                <div className="text-[10px] text-emerald-400 font-mono tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ABTALKS AI COHORT EVALUATION PLATFORM
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={scrollToForm}
                className="px-4 py-2 bg-[#00F0FF] text-[#070A13] font-black text-xs uppercase tracking-widest rounded shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>CANDIDATE LOGIN</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </header>

          <section className="py-16 px-8 max-w-6xl mx-auto w-full text-center relative z-10 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0D1322] border border-[#00F0FF]/40 rounded-full text-xs text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              <Sparkles className="w-4 h-4 text-[#00F0FF] animate-spin" />
              <span className="tracking-wider uppercase font-bold">Goal-Aligned Technical Interview Agent</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white tracking-widest uppercase leading-tight">
              EVALUATE REAL-WORLD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#A855F7] drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                AI ENGINEERING MASTERY
              </span>
            </h1>

            <p className="text-slate-400 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              Moving beyond static questionnaires. The <span className="text-[#00F0FF]">Neural Interface Interview Agent</span> conducts personalized, multi-turn technical evaluations tailored to each candidate's journey across the 31-day ABTalks AI Cohort.
            </p>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={scrollToForm}
                className="px-8 py-4 bg-[#00F0FF] text-[#070A13] font-black text-xs uppercase tracking-widest rounded shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>ENTER EVALUATION PORTAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-12 px-8 max-w-6xl mx-auto w-full relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-2">
                PLATFORM CAPABILITIES & FEATURES
              </h2>
              <p className="text-xs text-slate-400">POWERING ENTERPRISE-GRADE TECHNICAL INTERVIEWING</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0A0E1A] border border-[#1E293B] p-6 rounded-lg hover:border-[#00F0FF] transition-all space-y-4 shadow-lg group">
                <div className="w-12 h-12 rounded bg-[#111827] border border-[#00F0FF] flex items-center justify-center text-[#00F0FF] group-hover:scale-110 transition-transform">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">Adaptive AI Lead Interviewer</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Generates probing, context-aware follow-up questions in real-time. Dynamically targets skipped curriculum topics and high-attempt struggle areas.
                </p>
              </div>

              <div className="bg-[#0A0E1A] border border-[#1E293B] p-6 rounded-lg hover:border-[#A855F7] transition-all space-y-4 shadow-lg group">
                <div className="w-12 h-12 rounded bg-[#111827] border border-[#A855F7] flex items-center justify-center text-[#A855F7] group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">31-Day Telemetry Matrix</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Full coverage tracking across Vector Search, Query Routers, Function Calling, Fine-Tuning, MCP Servers, and Docker/K8s containerization.
                </p>
              </div>

              <div className="bg-[#0A0E1A] border border-[#1E293B] p-6 rounded-lg hover:border-emerald-400 transition-all space-y-4 shadow-lg group">
                <div className="w-12 h-12 rounded bg-[#111827] border border-emerald-400 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wider">Structured Scorecard & Feedback</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Produces instant hiring verdicts, technical depth scores, signal strength radar charts, identified gaps, and actionable next steps.
                </p>
              </div>
            </div>
          </section>

          {/* Onboarding Form */}
          <section ref={formRef} className="py-16 px-8 max-w-4xl mx-auto w-full relative z-10">
            <div className="bg-[#0A0E1A] border-2 border-[#00F0FF] rounded-xl p-8 shadow-[0_0_30px_rgba(0,240,255,0.25)] space-y-6">
              
              <div className="border-b border-[#1E293B] pb-4 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-black text-white tracking-widest uppercase flex items-center gap-3">
                    <UserCheck className="w-6 h-6 text-[#00F0FF]" />
                    <span>CANDIDATE ONBOARDING FORM</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">Enter your details to generate your personalized dashboard & interview terminal.</p>
                </div>
                <span className="px-3 py-1 bg-[#111827] text-emerald-400 border border-emerald-800 text-xs font-mono rounded">
                  PORTAL OPEN
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 uppercase tracking-wider font-bold">OR SELECT PRESET COHORT CANDIDATE:</label>
                <div className="flex flex-wrap gap-2">
                  {candidatesList.map(c => (
                    <button
                      key={c.member.id}
                      type="button"
                      onClick={() => handleSelectPresetCandidate(c)}
                      className="px-3 py-1.5 bg-[#0D1322] border border-[#1E293B] hover:border-[#00F0FF] rounded text-xs text-slate-300 hover:text-[#00F0FF] transition-all flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>{c.member.name} ({c.member.jobRole})</span>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleOnboardingSubmit} className="space-y-5 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">CANDIDATE FULL NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Johnson"
                      value={candidateForm.name}
                      onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                      className="w-full bg-[#060912] border border-[#1E293B] focus:border-[#00F0FF] rounded p-3 text-xs text-cyan-300 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">CANDIDATE ID *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CAND-8924A"
                      value={candidateForm.id}
                      onChange={(e) => setCandidateForm({ ...candidateForm, id: e.target.value })}
                      className="w-full bg-[#060912] border border-[#1E293B] focus:border-[#00F0FF] rounded p-3 text-xs text-cyan-300 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">TARGET JOB ROLE *</label>
                    <select
                      value={candidateForm.jobRole}
                      onChange={(e) => setCandidateForm({ ...candidateForm, jobRole: e.target.value })}
                      className="w-full bg-[#060912] border border-[#1E293B] focus:border-[#00F0FF] rounded p-3 text-xs text-slate-200 focus:outline-none font-mono"
                    >
                      <option value="Senior AI Engineer">Senior AI Engineer</option>
                      <option value="Data Scientist">Data Scientist</option>
                      <option value="ML Engineer">ML Engineer</option>
                      <option value="Backend AI Developer">Backend AI Developer</option>
                      <option value="DevOps & Infrastructure Engineer">DevOps & Infrastructure Engineer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">YEARS OF EXPERIENCE</label>
                    <input
                      type="number"
                      min={0}
                      max={30}
                      value={candidateForm.yearsExperience}
                      onChange={(e) => setCandidateForm({ ...candidateForm, yearsExperience: e.target.value })}
                      className="w-full bg-[#060912] border border-[#1E293B] focus:border-[#00F0FF] rounded p-3 text-xs text-slate-200 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#00F0FF] to-[#A855F7] text-[#070A13] font-black text-xs uppercase tracking-widest rounded shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:opacity-95 transition-all flex items-center justify-center gap-2"
                >
                  <span>INITIALIZE CANDIDATE DASHBOARD</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

            </div>
          </section>

          <footer className="py-6 border-t border-[#1E293B] text-center text-xs text-slate-500 font-mono">
            ABTALKS AI COHORT HACKATHON · NEURAL INTERFACE EVALUATION AGENT
          </footer>

        </div>
      )}

      {viewMode === 'dashboard' && (
        <>
          {/* Sidebar */}
          <aside className="w-64 border-r border-[#1E293B] bg-[#0A0E1A] flex flex-col justify-between shrink-0 z-20">
            <div>
              <div className="p-5 border-b border-[#1E293B] flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#111827] border border-[#00F0FF] flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.4)]">
                    <Brain className="w-5 h-5 text-[#00F0FF]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#0A0E1A] animate-pulse" />
                </div>
                <div>
                  <h1 className="font-bold text-sm tracking-widest text-[#A855F7] uppercase drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
                    NEURAL INTERFACE
                  </h1>
                  <div className="text-[10px] text-emerald-400 font-mono tracking-wider flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    STATUS: OPERATIONAL
                  </div>
                </div>
              </div>

              <nav className="p-3 space-y-1 mt-2">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-all ${
                    activeTab === 'home'
                      ? 'bg-[#131C2E] text-[#00F0FF] border-l-2 border-[#00F0FF] shadow-[inset_0_0_12px_rgba(0,240,255,0.15)]'
                      : 'text-slate-400 hover:bg-[#111827] hover:text-slate-200'
                  }`}
                >
                  <Compass className="w-4 h-4 text-[#00F0FF]" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => setActiveTab('interview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-all ${
                    activeTab === 'interview'
                      ? 'bg-[#131C2E] text-[#00F0FF] border-l-2 border-[#00F0FF] shadow-[inset_0_0_12px_rgba(0,240,255,0.15)]'
                      : 'text-slate-400 hover:bg-[#111827] hover:text-slate-200'
                  }`}
                >
                  <Code className="w-4 h-4 text-purple-400" />
                  <span>Give Interview</span>
                </button>

                <button
                  onClick={() => setActiveTab('feedback')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-all ${
                    activeTab === 'feedback'
                      ? 'bg-[#131C2E] text-[#00F0FF] border-l-2 border-[#00F0FF] shadow-[inset_0_0_12px_rgba(0,240,255,0.15)]'
                      : 'text-slate-400 hover:bg-[#111827] hover:text-slate-200'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span>Take Feedback</span>
                </button>

                <button
                  onClick={() => setActiveTab('roster')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-all ${
                    activeTab === 'roster'
                      ? 'bg-[#131C2E] text-[#00F0FF] border-l-2 border-[#00F0FF] shadow-[inset_0_0_12px_rgba(0,240,255,0.15)]'
                      : 'text-slate-400 hover:bg-[#111827] hover:text-slate-200'
                  }`}
                >
                  <Users className="w-4 h-4 text-[#00F0FF]" />
                  <span>Roster</span>
                </button>

                <button
                  onClick={() => setActiveTab('briefing')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-all ${
                    activeTab === 'briefing'
                      ? 'bg-[#131C2E] text-[#00F0FF] border-l-2 border-[#00F0FF] shadow-[inset_0_0_12px_rgba(0,240,255,0.15)]'
                      : 'text-slate-400 hover:bg-[#111827] hover:text-slate-200'
                  }`}
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Briefing</span>
                </button>

                <button
                  onClick={() => setActiveTab('api')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-all ${
                    activeTab === 'api'
                      ? 'bg-[#131C2E] text-[#00F0FF] border-l-2 border-[#00F0FF] shadow-[inset_0_0_12px_rgba(0,240,255,0.15)]'
                      : 'text-slate-400 hover:bg-[#111827] hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>API Spec</span>
                </button>
              </nav>
            </div>

            <div className="p-4 border-t border-[#1E293B] space-y-3">
              <button
                onClick={() => handleStartInterview(selectedCandidate)}
                className="w-full py-3 bg-[#00F0FF] hover:bg-[#38bdf8] text-[#070A13] font-black text-xs uppercase tracking-widest rounded transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2"
              >
                <span>START NEW SESSION</span>
              </button>

              <div className="flex items-center justify-between text-slate-500 pt-2 px-1">
                <button 
                  onClick={() => setIsSettingsOpen(true)}
                  className="flex items-center gap-1.5 text-xs hover:text-slate-300 transition-colors"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Settings</span>
                </button>
                <button 
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="flex items-center gap-1.5 text-xs hover:text-rose-400 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Pane */}
          <main className="flex-1 flex flex-col min-w-0 bg-[#070A13] relative overflow-hidden">
            
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <header className="h-16 border-b border-[#1E293B] bg-[#0A0E1A]/80 backdrop-blur px-8 flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-black text-[#00F0FF] uppercase tracking-wider drop-shadow-[0_0_10px_rgba(0,240,255,0.5)] flex items-center gap-2">
                  <span>MISSION CONTROL</span>
                  <span className="text-xs text-slate-400 font-mono">[{selectedCandidate.member.name}]</span>
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="QUERY_ROSTER..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#0D1322] border border-[#1E293B] rounded py-1.5 pl-3 pr-8 text-xs font-mono text-cyan-300 placeholder:text-slate-600 focus:outline-none focus:border-[#00F0FF] w-64"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute right-2.5" />
                </div>

                <div className="flex items-center gap-2 border-l border-[#1E293B] pl-4 text-slate-400">
                  <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-1.5 hover:text-[#00F0FF] hover:bg-[#111827] rounded transition-colors"
                    title="System Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="p-1.5 hover:text-rose-400 hover:bg-[#111827] rounded transition-colors"
                    title="Terminate Session / Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                  <div className="w-7 h-7 rounded-full bg-[#1E293B] border border-[#00F0FF] flex items-center justify-center text-xs text-[#00F0FF] font-bold ml-1">
                    AI
                  </div>
                </div>
              </div>
            </header>

            {/* Dashboard Overview Home Tab */}
            {activeTab === 'home' && (
              <div className="flex-1 p-8 overflow-y-auto z-10 space-y-6">
                <div className="flex justify-between items-start border-b border-[#1E293B] pb-6">
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-1">
                      WELCOME BACK, {selectedCandidate.member.name.toUpperCase()}
                    </h2>
                    <p className="text-xs text-slate-400 font-mono tracking-wider">
                      CANDIDATE ID: <span className="text-[#00F0FF]">{selectedCandidate.member.id}</span> | ROLE: <span className="text-slate-200">{selectedCandidate.member.jobRole}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => setViewMode('welcome')}
                    className="px-3 py-1.5 bg-[#0D1322] border border-[#1E293B] hover:border-[#00F0FF] text-xs text-slate-400 hover:text-white rounded transition-all"
                  >
                    ← SWITCH CANDIDATE
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="bg-[#0A0E1A] border-2 border-[#00F0FF] rounded-xl p-6 shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:scale-[1.01] transition-all flex flex-col justify-between space-y-6 group">
                    <div>
                      <div className="w-12 h-12 rounded bg-[#111827] border border-[#00F0FF] flex items-center justify-center text-[#00F0FF] mb-4 group-hover:rotate-12 transition-transform">
                        <Code className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">1. GIVE TECHNICAL INTERVIEW</h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-mono">
                        Start your multi-turn technical evaluation session. The AI lead interviewer will ask questions based on your 31-day AI Cohort journey.
                      </p>
                    </div>

                    <button
                      onClick={() => handleStartInterview(selectedCandidate)}
                      className="w-full py-3.5 bg-[#00F0FF] hover:bg-[#38bdf8] text-[#070A13] font-black text-xs uppercase tracking-widest rounded shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2"
                    >
                      <span>LAUNCH INTERVIEW TERMINAL</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="bg-[#0A0E1A] border-2 border-[#A855F7] rounded-xl p-6 shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:scale-[1.01] transition-all flex flex-col justify-between space-y-6 group">
                    <div>
                      <div className="w-12 h-12 rounded bg-[#111827] border border-[#A855F7] flex items-center justify-center text-[#A855F7] mb-4 group-hover:rotate-12 transition-transform">
                        <BarChart3 className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2">2. TAKE & VIEW FEEDBACK</h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-mono">
                        Review your post-interview evaluation report, hiring verdicts, technical scores, signal strengths, gaps, and recommended next steps.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('feedback')}
                      className="w-full py-3.5 bg-gradient-to-r from-[#A855F7] to-[#00F0FF] text-white font-black text-xs uppercase tracking-widest rounded shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2"
                    >
                      <span>VIEW EVALUATION REPORT</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                <div className="bg-[#0A0E1A] border border-[#1E293B] rounded-lg p-6 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#00F0FF]" />
                    <span>COHORT TELEMETRY OVERVIEW</span>
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-[#060912] border border-[#1E293B] p-4 rounded text-center">
                      <div className="text-2xl font-black text-[#00F0FF] font-mono">{selectedCandidate.metrics?.sysScore || 90}</div>
                      <div className="text-[10px] text-slate-500 uppercase">SYSTEM SCORE</div>
                    </div>
                    <div className="bg-[#060912] border border-[#1E293B] p-4 rounded text-center">
                      <div className="text-2xl font-black text-purple-400 font-mono">{selectedCandidate.metrics?.codeQlt || 'A'}</div>
                      <div className="text-[10px] text-slate-500 uppercase">CODE QUALITY</div>
                    </div>
                    <div className="bg-[#060912] border border-[#1E293B] p-4 rounded text-center">
                      <div className="text-2xl font-black text-emerald-400 font-mono">{selectedCandidate.signals?.commitDays || 28} / 31</div>
                      <div className="text-[10px] text-slate-500 uppercase">COMMIT DAYS</div>
                    </div>
                    <div className="bg-[#060912] border border-[#1E293B] p-4 rounded text-center">
                      <div className="text-2xl font-black text-amber-400 font-mono">{selectedCandidate.signals?.missionsCompleted || 30} / 31</div>
                      <div className="text-[10px] text-slate-500 uppercase">MISSIONS PASSED</div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'roster' && (
              <div className="flex-1 p-8 overflow-y-auto z-10">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-1">
                      ACTIVE ROSTER
                    </h2>
                    <p className="text-xs text-slate-400 font-mono tracking-wider">
                      COHORT CANDIDATES: {candidatesList.length}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-[#0D1322] border border-[#1E293B] text-slate-300 rounded text-xs font-mono hover:border-[#00F0FF] flex items-center gap-2">
                      <Filter className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>FILTER</span>
                    </button>
                    <button className="px-3 py-1.5 bg-[#0D1322] border border-[#1E293B] text-slate-300 rounded text-xs font-mono hover:border-[#00F0FF] flex items-center gap-2">
                      <ArrowUpDown className="w-3.5 h-3.5 text-[#00F0FF]" />
                      <span>SORT</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {candidatesList.filter(c => c.member.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.member.jobRole.toLowerCase().includes(searchQuery.toLowerCase())).map((candidate) => {
                    const isSelected = selectedCandidate.member.id === candidate.member.id;
                    
                    return (
                      <div
                        key={candidate.member.id}
                        className={`bg-[#0A0E1A]/90 border rounded-lg p-5 flex flex-col justify-between transition-all relative ${
                          isSelected
                            ? 'border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                            : 'border-[#1E293B] hover:border-slate-700'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex gap-3">
                              <div className="w-12 h-12 rounded bg-[#111827] border border-[#1E293B] flex items-center justify-center text-indigo-400 font-bold overflow-hidden">
                                <User className="w-6 h-6 text-slate-400" />
                              </div>
                              <div>
                                <h3 className="font-bold text-base text-white tracking-wide">{candidate.member.name}</h3>
                                <p className="text-xs text-slate-400">{candidate.member.jobRole}</p>
                                <p className="text-[10px] text-slate-500 font-mono mt-0.5">EXP: {candidate.member.yearsExperience} YRS | {candidate.member.level || 'L5'}</p>
                              </div>
                            </div>

                            <span className={`px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded border ${
                              candidate.member.status === 'READY'
                                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                                : candidate.member.status === 'IN INTERVIEW'
                                ? 'bg-amber-950/80 text-amber-400 border-amber-800'
                                : 'bg-slate-900 text-slate-500 border-slate-800'
                            }`}>
                              {candidate.member.status}
                            </span>
                          </div>

                          <div className="mb-5">
                            <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-1">
                              <span>MISSION PROGRESS</span>
                              <span>{candidate.metrics?.progress || 100}%</span>
                            </div>
                            <div className="h-2 w-full bg-[#0D1322] border border-[#1E293B] rounded-sm p-0.5 flex gap-1">
                              <div 
                                className="h-full bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.8)] rounded-sm transition-all" 
                                style={{ width: `${candidate.metrics?.progress || 100}%` }} 
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 bg-[#060912] border border-[#1E293B] p-3 rounded mb-5 text-center">
                            <div>
                              <div className="text-lg font-black text-white font-mono">{candidate.metrics?.sysScore || 90}</div>
                              <div className="text-[9px] text-slate-500 uppercase tracking-tighter">SYS_SCORE</div>
                            </div>
                            <div>
                              <div className="text-lg font-black text-[#00F0FF] font-mono">{candidate.metrics?.codeQlt || 'A'}</div>
                              <div className="text-[9px] text-slate-500 uppercase tracking-tighter">CODE_QLT</div>
                            </div>
                            <div>
                              <div className="text-lg font-black text-rose-400 font-mono">{candidate.metrics?.models || 8}</div>
                              <div className="text-[9px] text-slate-500 uppercase tracking-tighter">MODELS</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <button
                            onClick={() => {
                              setSelectedCandidate(candidate);
                              handleStartInterview(candidate);
                            }}
                            className="w-full py-2 bg-[#0D1322] hover:bg-[#00F0FF] hover:text-[#070A13] border border-[#00F0FF] text-[#00F0FF] font-bold text-xs uppercase tracking-widest rounded transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                          >
                            SELECT & INTERVIEW
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'briefing' && (
              <div className="flex-1 p-8 overflow-y-auto z-10 space-y-6">
                <div>
                  <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-1">
                    MISSION BRIEFING
                  </h2>
                  <p className="text-xs text-slate-400 font-mono tracking-wider">
                    ABTALKS AI COHORT · 31 DAYS · 8 MODULES
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CURRICULUM_DATA.days.map((d) => (
                    <div key={d.day} className="bg-[#0A0E1A] border border-[#1E293B] p-4 rounded text-xs space-y-2">
                      <div className="flex justify-between items-center border-b border-[#1E293B] pb-2">
                        <span className="text-[#00F0FF] font-bold">DAY {d.day}: {d.title}</span>
                        <span className="px-2 py-0.5 bg-[#111827] text-[10px] text-slate-400 rounded">{d.type}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {d.tools.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-[#060912] border border-slate-800 text-[10px] text-indigo-300 rounded font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                      <ul className="list-disc list-inside text-slate-400 text-[11px] space-y-1">
                        {d.objectives.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'interview' && (
              <div className="flex-1 flex overflow-hidden z-10">
                <div className="flex-1 flex flex-col min-w-0 border-r border-[#1E293B]">
                  
                  <div className="p-3 bg-[#0A0E1A] border-b border-[#1E293B] flex items-center justify-between text-xs px-6">
                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-slate-500 uppercase">Candidate: </span>
                        <span className="font-bold text-[#00F0FF]">{selectedCandidate.member.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 uppercase">Questions: </span>
                        <span className="font-bold text-amber-400">{history.filter(h => h.role === 'model').length} / 8+</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setVoiceEnabled(!voiceEnabled)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono transition-all ${
                          voiceEnabled ? 'bg-[#00F0FF] text-[#070A13] font-bold' : 'bg-[#0D1322] border border-[#1E293B] text-slate-400'
                        }`}
                      >
                        {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                        <span>VOICE MODE</span>
                      </button>

                      <button
                        onClick={() => handleStartInterview(selectedCandidate)}
                        className="flex items-center gap-1.5 px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs font-bold transition-all shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>RESET TERMINAL</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {!isInterviewStarted ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-8">
                        <Brain className="w-12 h-12 text-[#00F0FF] animate-pulse mb-4" />
                        <h3 className="text-lg font-black text-white uppercase tracking-wider mb-2">NEURAL TERMINAL READY</h3>
                        <p className="text-xs text-slate-400 max-w-md mb-6">
                          Deploying AI Lead Interviewer for candidate <span className="text-[#00F0FF]">{selectedCandidate.member.name}</span>.
                        </p>
                        <button
                          onClick={() => handleStartInterview(selectedCandidate)}
                          className="px-6 py-3 bg-[#00F0FF] text-[#070A13] font-black rounded uppercase tracking-widest text-xs transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                        >
                          INITIALIZE LINK
                        </button>
                      </div>
                    ) : (
                      <>
                        {history.map((msg, idx) => (
                          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && (
                              <div className="w-8 h-8 rounded bg-[#111827] border border-[#00F0FF] flex items-center justify-center text-[#00F0FF] shrink-0 mt-1 shadow-[0_0_8px_rgba(0,240,255,0.3)]">
                                <Brain className="w-4 h-4" />
                              </div>
                            )}

                            <div className={`max-w-[80%] rounded p-4 text-xs leading-relaxed ${
                              msg.role === 'user'
                                ? 'bg-[#131C2E] border border-purple-500/40 text-purple-200'
                                : 'bg-[#0A0E1A] border border-[#1E293B] text-slate-200'
                            }`}>
                              {msg.role === 'model' && (
                                <div className="flex items-center justify-between mb-2 pb-1 border-b border-[#1E293B] text-[10px] text-[#00F0FF] font-mono">
                                  <span>INTERVIEWER TURN #{msg.questionNum || Math.floor(idx/2)+1}</span>
                                  {msg.day && <span className="bg-[#111827] px-2 py-0.5 rounded border border-slate-800">Day {msg.day} Topic</span>}
                                </div>
                              )}
                              <p className="whitespace-pre-wrap">{msg.content}</p>
                            </div>

                            {msg.role === 'user' && (
                              <div className="w-8 h-8 rounded bg-purple-950 border border-purple-500 flex items-center justify-center text-purple-300 shrink-0 mt-1">
                                <User className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        ))}

                        {isLoading && (
                          <div className="flex gap-2 items-center text-xs text-[#00F0FF] bg-[#0A0E1A] p-3 rounded border border-[#1E293B] w-fit">
                            <Brain className="w-4 h-4 animate-spin" />
                            <span>Processing candidate response signal...</span>
                          </div>
                        )}

                        <div ref={chatEndRef} />
                      </>
                    )}
                  </div>

                  <form onSubmit={handleSendMessage} className="p-4 border-t border-[#1E293B] bg-[#0A0E1A]">
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        placeholder="ENTER_CANDIDATE_RESPONSE..."
                        disabled={!isInterviewStarted || isLoading || isDone}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className="w-full bg-[#060912] border border-[#1E293B] rounded py-3.5 pl-4 pr-12 text-xs text-slate-200 font-mono focus:outline-none focus:border-[#00F0FF]"
                      />
                      <button
                        type="submit"
                        disabled={!inputText.trim() || isLoading || isDone}
                        className="absolute right-2 p-2 bg-[#00F0FF] text-[#070A13] hover:bg-[#38bdf8] disabled:opacity-40 rounded transition-all"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>

                <div className="w-80 bg-[#0A0E1A]/60 border-l border-[#1E293B] p-6 space-y-6 overflow-y-auto">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#00F0FF]" />
                    <span>NEURAL TRACKER</span>
                  </h3>

                  <div className="bg-[#060912] border border-[#1E293B] rounded p-4 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300">Days Assessed</span>
                      <span className="text-[#00F0FF] font-mono">{coveredDays.size} / 4+</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {Array.from(coveredDays).map(d => (
                        <span key={d} className="px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-mono rounded">
                          Day {d}
                        </span>
                      ))}
                      {coveredDays.size === 0 && <span className="text-[10px] text-slate-600">No coverage logged yet</span>}
                    </div>
                  </div>

                  {finalFeedback && (
                    <div className="bg-gradient-to-b from-purple-950/40 to-[#0A0E1A] border border-purple-500/50 rounded p-4 space-y-3">
                      <div className="flex items-center gap-2 text-[#00F0FF] font-bold text-xs uppercase">
                        <Award className="w-4 h-4" />
                        <span>REPORT READY</span>
                      </div>
                      <p className="text-xs text-slate-300 italic">"{finalFeedback.summary}"</p>
                      <button
                        onClick={() => setActiveTab('feedback')}
                        className="w-full py-2 bg-purple-600 text-white font-bold text-xs rounded uppercase tracking-wider"
                      >
                        VIEW FULL EVALUATION
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div className="flex-1 p-8 overflow-y-auto z-10 space-y-6">
                
                <div className="flex justify-between items-start border-b border-[#1E293B] pb-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black text-white tracking-widest uppercase mb-1">
                      CANDIDATE PERFORMANCE EVALUATION
                    </h2>
                    <p className="text-xs text-slate-400 font-mono tracking-wider">
                      CANDIDATE: <span className="text-[#00F0FF] font-bold">{selectedCandidate.member.name}</span> ({selectedCandidate.member.id}) | ROLE: <span className="text-slate-200">{selectedCandidate.member.jobRole.toUpperCase()}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">FINAL HIRING VERDICT</span>
                    <div className="px-4 py-2 bg-[#060912] border border-[#00F0FF] text-[#00F0FF] font-bold text-xs uppercase rounded flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                      <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                      <span>{(finalFeedback && finalFeedback.verdict) || selectedCandidate.evaluation?.verdict || "HIRE - EXCEPTIONAL FIT"}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div className="md:col-span-2 bg-[#0A0E1A] border border-[#1E293B] rounded-lg p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#00F0FF]" />
                          <span>Candidate Performance Summary</span>
                        </h3>
                        <span className="px-2 py-0.5 bg-[#111827] text-slate-400 text-[10px] font-mono border border-slate-800 rounded">
                          EVALUATION SYNTHESIS
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-mono mb-6">
                        {(finalFeedback && finalFeedback.summary) || selectedCandidate.evaluation?.summary}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#1E293B] pt-4">
                      <div className="bg-[#060912] p-3 rounded border border-[#1E293B]">
                        <div className="text-[10px] text-slate-500 uppercase tracking-tighter font-mono">TECHNICAL DEPTH</div>
                        <div className="text-xl font-black text-[#00F0FF] font-mono mt-0.5">
                          {(finalFeedback && finalFeedback.scores?.technicalDepth) || selectedCandidate.evaluation?.scores?.technicalDepth || "9.2/10"}
                        </div>
                      </div>
                      <div className="bg-[#060912] p-3 rounded border border-[#1E293B]">
                        <div className="text-[10px] text-slate-500 uppercase tracking-tighter font-mono">COMMUNICATION</div>
                        <div className="text-xl font-black text-[#00F0FF] font-mono mt-0.5">
                          {(finalFeedback && finalFeedback.scores?.communication) || selectedCandidate.evaluation?.scores?.communication || "8.8/10"}
                        </div>
                      </div>
                      <div className="bg-[#060912] p-3 rounded border border-[#1E293B]">
                        <div className="text-[10px] text-slate-500 uppercase tracking-tighter font-mono">PROBLEM SOLVING</div>
                        <div className="text-xl font-black text-[#00F0FF] font-mono mt-0.5">
                          {(finalFeedback && finalFeedback.scores?.problemSolving) || selectedCandidate.evaluation?.scores?.problemSolving || "9.0/10"}
                        </div>
                      </div>
                      <div className="bg-[#060912] p-3 rounded border border-[#1E293B]">
                        <div className="text-[10px] text-slate-500 uppercase tracking-tighter font-mono">SYSTEM DESIGN</div>
                        <div className="text-xl font-black text-[#00F0FF] font-mono mt-0.5">
                          {(finalFeedback && finalFeedback.scores?.systemDesign) || "8.5/10"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0A0E1A] border border-[#A855F7] rounded-lg p-6 shadow-[0_0_20px_rgba(168,85,247,0.25)] flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-[#A855F7] flex items-center gap-2 mb-4">
                        <Zap className="w-4 h-4 fill-[#A855F7]" />
                        <span>Actionable Next Steps</span>
                      </h3>

                      <ul className="space-y-3 text-xs text-slate-300 font-mono mb-6">
                        {((finalFeedback && finalFeedback.next) || selectedCandidate.evaluation?.nextSteps || []).map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#00F0FF] shrink-0 mt-0.5">▸</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-[#A855F7] to-[#00F0FF] text-[#070A13] font-black text-xs uppercase tracking-widest rounded shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2">
                      <span>EXECUTE OFFER ACTION</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  <div className="bg-[#0A0E1A] border border-[#1E293B] rounded-lg p-6 flex flex-col items-center justify-between">
                    <div className="w-full flex justify-between items-center mb-2">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Brain className="w-4 h-4 text-[#00F0FF]" />
                        <span>Technical Competency Radar Chart</span>
                      </h3>
                      <span className="text-[10px] text-[#00F0FF] font-mono bg-[#0D1322] px-2 py-0.5 rounded border border-[#00F0FF]/30">
                        5-AXIS MATRIX
                      </span>
                    </div>

                    <SkillRadarChart 
                      skills={(finalFeedback && finalFeedback.radarSkills) || [
                        { axis: "RAG & Vector Search", val: 88 },
                        { axis: "Function Calling", val: 85 },
                        { axis: "Multi-Agent Systems", val: 78 },
                        { axis: "MCP & Architecture", val: 92 },
                        { axis: "DevOps & K8s", val: 80 }
                      ]} 
                    />

                    <div className="w-full grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 pt-2 border-t border-[#1E293B] mt-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
                        <span>RAG & Retrieval: High Depth</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                        <span>MCP Standardization: Solid</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0A0E1A] border border-[#1E293B] rounded-lg p-6 space-y-6">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>Evaluated Signal Strengths</span>
                    </h3>

                    <div className="space-y-4">
                      {((finalFeedback && finalFeedback.strengths) || selectedCandidate.evaluation?.strengths || []).map((st, i) => {
                        const val = typeof st === 'object' ? st.val : 85;
                        const label = typeof st === 'object' ? st.name : st;

                        return (
                          <div key={i}>
                            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                              <span>{label}</span>
                              <span className="text-[#00F0FF] font-bold">{val}%</span>
                            </div>
                            <div className="h-2 w-full bg-[#060912] rounded p-0.5 border border-slate-800">
                              <div 
                                className="h-full bg-gradient-to-r from-[#00F0FF] to-emerald-400 shadow-[0_0_8px_rgba(0,240,255,0.8)] rounded transition-all duration-500" 
                                style={{ width: `${val}%` }} 
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-[#1E293B]">
                      <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-400" />
                        <span>Identified Gaps & Refinements</span>
                      </h4>

                      <div className="space-y-3">
                        {((finalFeedback && finalFeedback.gaps) || selectedCandidate.evaluation?.gaps || []).map((gap, i) => {
                          const title = typeof gap === 'object' ? gap.title : `Gap #${i+1}`;
                          const desc = typeof gap === 'object' ? gap.desc : gap;

                          return (
                            <div key={i} className="bg-[#060912] border-l-2 border-amber-500 border-y border-r border-slate-800 p-3 rounded text-xs">
                              <h5 className="font-bold text-slate-200 mb-0.5">{title}</h5>
                              <p className="text-[11px] text-slate-400 leading-relaxed font-mono">{desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}

            {activeTab === 'api' && (
              <div className="flex-1 p-8 overflow-y-auto z-10 space-y-6">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-widest uppercase mb-1">
                    HTTP ENDPOINT SPECIFICATION
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">
                    <code>POST /api/interview</code> - TECHNICAL CONTRACT VERIFICATION
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#0A0E1A] border border-[#1E293B] p-5 rounded space-y-4">
                    <span className="font-bold text-slate-300 uppercase text-xs">Payload Request</span>

                    <textarea
                      rows={12}
                      value={apiReqBody || JSON.stringify({ sessionId, candidate: selectedCandidate }, null, 2)}
                      onChange={(e) => setApiReqBody(e.target.value)}
                      className="w-full bg-[#060912] border border-[#1E293B] rounded p-3 text-xs font-mono text-cyan-300 focus:outline-none focus:border-[#00F0FF]"
                    />

                    <button
                      onClick={async () => {
                        setApiLoading(true);
                        try {
                          const parsed = JSON.parse(apiReqBody || '{}');
                          const res = await callGeminiInterviewAgent(parsed.message || null, parsed.candidate || selectedCandidate, [], apiKey);
                          setApiResBody(res);
                        } catch (err) {
                          setApiResBody({ error: err.message });
                        } finally {
                          setApiLoading(false);
                        }
                      }}
                      disabled={apiLoading}
                      className="w-full py-3 bg-[#00F0FF] text-[#070A13] font-black text-xs uppercase tracking-widest rounded shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    >
                      EXECUTE POST /API/INTERVIEW
                    </button>
                  </div>

                  <div className="bg-[#0A0E1A] border border-[#1E293B] p-5 rounded space-y-4">
                    <span className="font-bold text-slate-300 text-xs uppercase">Contract Response</span>
                    <div className="bg-[#060912] border border-[#1E293B] rounded p-4 text-xs font-mono h-64 overflow-y-auto">
                      {apiResBody ? (
                        <pre className="text-emerald-400">{JSON.stringify(apiResBody, null, 2)}</pre>
                      ) : (
                        <span className="text-slate-600">Execute payload to test JSON schema...</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </main>
        </>
      )}

      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-[#070A13]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0A0E1A] border border-[#00F0FF] rounded-lg w-full max-w-lg p-6 shadow-[0_0_30px_rgba(0,240,255,0.2)] space-y-6">
            <div className="flex justify-between items-center border-b border-[#1E293B] pb-4">
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#00F0FF]" />
                <h3 className="font-bold text-lg text-white uppercase tracking-wider">SYSTEM SETTINGS</h3>
              </div>
              <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1.5 uppercase">
                  GEMINI API KEY (OPTIONAL OVERRIDE)
                </label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-[#060912] border border-[#1E293B] rounded p-2.5 text-cyan-300 font-mono focus:outline-none focus:border-[#00F0FF]"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1.5 uppercase">
                  AI MODEL CORE
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-[#060912] border border-[#1E293B] rounded p-2.5 text-slate-200 font-mono focus:outline-none focus:border-[#00F0FF]"
                >
                  <option value="gemini-3-flash-preview">Gemini 3 Flash (Fast & Adaptive)</option>
                  <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep Technical Logic)</option>
                </select>
              </div>

              <div className="flex justify-between items-center bg-[#060912] p-3 border border-[#1E293B] rounded">
                <div>
                  <span className="font-bold text-white block">Voice Synthesizer</span>
                  <span className="text-[10px] text-slate-500">Read interviewer responses aloud</span>
                </div>
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                    voiceEnabled ? 'bg-[#00F0FF] text-[#070A13]' : 'bg-[#111827] text-slate-400 border border-slate-700'
                  }`}
                >
                  {voiceEnabled ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-5 py-2.5 bg-[#00F0FF] text-[#070A13] font-black text-xs uppercase tracking-widest rounded shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              >
                SAVE & CLOSE
              </button>
            </div>
          </div>
        </div>
      )}

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#070A13]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0A0E1A] border border-rose-500 rounded-lg w-full max-w-md p-6 shadow-[0_0_30px_rgba(244,63,94,0.3)] space-y-5 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-950 border border-rose-500 flex items-center justify-center mx-auto text-rose-400">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-lg text-white uppercase tracking-widest mb-1">TERMINATE SESSION?</h3>
              <p className="text-xs text-slate-400 font-mono">
                Terminating session will return you to the Neural Interface welcome portal.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 py-2.5 bg-[#0D1322] border border-[#1E293B] text-slate-300 font-bold text-xs uppercase tracking-wider rounded hover:border-slate-500"
              >
                CANCEL
              </button>
              <button
                onClick={() => {
                  setIsLogoutModalOpen(false);
                  setViewMode('welcome');
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider rounded shadow-[0_0_15px_rgba(244,63,94,0.4)]"
              >
                LOGOUT NOW
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}