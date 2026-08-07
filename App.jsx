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
  Bell,
  LogOut,
  SlidersHorizontal,
  TrendingUp,
  CheckSquare
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
      "summary": "Candidate demonstrated deep mastery of LLM orchestration and vector database optimization. They consistently structured solutions with high-performance heuristics in mind, treating edge cases not as afterthoughts, but as core constraints. Communication was direct, highly technical, and immediately actionable. The signal-to-noise ratio in their responses was exceptionally high.",
      "scores": { "technicalDepth": "9.5/10", "communication": "8.8/10", "problemSolving": "9.2/10" },
      "strengths": [
        { "name": "System Architecture", "val": 95 },
        { "name": "Algorithmic Optimization", "val": 90 },
        { "name": "Cross-functional Alignment", "val": 85 }
      ],
      "gaps": [
        { "title": "Frontend Tooling", "desc": "Less familiar with our specific React meta-frameworks. Will require short ramp-up time for full stack velocity." },
        { "title": "Legacy Migration", "desc": "Tends to favor rewrites over incremental refactoring. Needs coaching on safe, strangler-fig migration patterns." }
      ],
      "nextSteps": [
        "Extend formal offer within 24 hours.",
        "Align on start date and onboarding cohort.",
        "Prepare specific initial mission briefing focused on the retrieval pipeline rebuild."
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
      "scores": { "technicalDepth": "8.5/10", "communication": "8.2/10", "problemSolving": "8.7/10" },
      "strengths": [
        { "name": "Vector Pipeline Design", "val": 88 },
        { "name": "Database Schema Optimization", "val": 92 },
        { "name": "API Data Contracts", "val": 80 }
      ],
      "gaps": [
        { "title": "Observability Setup", "desc": "Skipped Prometheus and Grafana logging day. Needs grounding in production telemetry." }
      ],
      "nextSteps": [
        "Schedule follow-up design review on observability.",
        "Proceed to team fit round."
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
      "summary": "David has great determination and completed most cohort challenges despite multiple attempts on complex agent routing and vector database setups. Skipped Kubernetes deployment due to time constraints.",
      "scores": { "technicalDepth": "7.0/10", "communication": "7.5/10", "problemSolving": "7.2/10" },
      "strengths": [
        { "name": "Persistence & Debugging", "val": 85 },
        { "name": "Basic Prompt Engineering", "val": 75 },
        { "name": "FastAPI Integration", "val": 70 }
      ],
      "gaps": [
        { "title": "Container Orchestration", "desc": "Lacks experience with K8s manifests and Docker multi-stage builds." }
      ],
      "nextSteps": [
        "Assign mentor for infrastructure and K8s.",
        "Consider L3 entry role."
      ]
    }
  }
];

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

async function callGeminiInterviewAgent(messages, candidate, history, apiKey = "") {
  const skippedMissions = candidate.missions.filter(m => m.skipped).map(m => `Day ${m.day}: ${m.title}`);
  const highAttemptMissions = candidate.missions.filter(m => m.attempts > 3).map(m => `Day ${m.day}: ${m.title} (${m.attempts} attempts)`);
  
  const systemInstruction = `
You are the NEURAL INTERFACE AI Lead Interviewer conducting a realistic, adaptive technical evaluation for candidate ${candidate.member.name} (${candidate.member.jobRole}).

CANDIDATE PROFILE:
- ID: ${candidate.member.id}
- Name: ${candidate.member.name}
- Job Role: ${candidate.member.jobRole} (${candidate.member.yearsExperience} yrs experience)
- Skipped Missions: ${skippedMissions.length > 0 ? skippedMissions.join(', ') : 'None'}
- High Attempt Topics (Struggled): ${highAttemptMissions.length > 0 ? highAttemptMissions.join(', ') : 'None'}
- Completed Missions: ${candidate.signals.missionsCompleted}/31

CRITICAL INTERVIEW GUIDELINES:
1. Act like a senior AI engineering lead at Mission Control. Ask ONE focused, technical question at a time.
2. Adapt dynamically based on candidate responses.
3. Assess at least 4 different curriculum days (e.g., Day 7 Embeddings, Day 10 Query Router, Day 13 Tool Calling, Day 22 Multi-Agent, Day 23 MCP, Day 28 K8s).
4. Probe specifically on weak areas (skipped missions or 4+ attempt topics).
5. Require at least 8 questions before wrapping up.
6. RESPOND IN VALID JSON FORMAT ONLY:
   {
     "reply": "Conversational question or response",
     "done": boolean,
     "questionNumber": number,
     "dayCovered": number,
     "feedback": null or {
        "summary": "Overall assessment string",
        "strengths": ["Array of strengths"],
        "gaps": ["Array of technical gaps"],
        "next": ["Array of recommended next steps"]
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
  
  if (turn === 1) {
    return {
      reply: `Mission Control link established. Welcome, ${name}! As a ${role}, you've completed our 31-day AI Cohort. Let's begin on Day 10 (Retrieval & Matching Engine). You built a query router that decided between SQL, vector search, or hybrid retrieval. Can you explain the exact heuristics your router used to classify user intent?`,
      done: false,
      questionNumber: 1,
      dayCovered: 10,
      feedback: null
    };
  } else if (turn === 2) {
    return {
      reply: `Excellent analysis on query routing! Let's pivot to Day 13 (Function Calling & Structured Outputs). In your tool schemas, how did you handle Pydantic validation errors when the model generated malformed parameters?`,
      done: false,
      questionNumber: 2,
      dayCovered: 13,
      feedback: null
    };
  } else if (turn === 3) {
    return {
      reply: `Good resilience strategy. Moving to Agentic AI (Day 22): When orchestrating multi-agent workflows with CrewAI or LangGraph, how did you prevent infinite loops or redundant tool calls between specialist agents?`,
      done: false,
      questionNumber: 3,
      dayCovered: 22,
      feedback: null
    };
  } else if (turn === 4) {
    return {
      reply: `That makes sense. Now let's discuss Model Context Protocol (MCP) from Day 23. What unique advantages does standardizing tool exposure via custom MCP servers provide over traditional inline function definitions in enterprise architectures?`,
      done: false,
      questionNumber: 4,
      dayCovered: 23,
      feedback: null
    };
  } else if (turn === 5) {
    return {
      reply: `Solid breakdown of MCP security boundaries! On Day 28 (Docker & Kubernetes Deployment), you worked on containerizing the application. How did you structure your multi-stage Docker build to keep the image lightweight while accommodating heavy libraries like PyTorch?`,
      done: false,
      questionNumber: 5,
      dayCovered: 28,
      feedback: null
    };
  } else if (turn === 6) {
    return {
      reply: `Great DevOps awareness. On Day 26 (Performance & Cost Optimization), how did you measure token usage across the pipeline and implement caching for repeated queries?`,
      done: false,
      questionNumber: 6,
      dayCovered: 26,
      feedback: null
    };
  } else if (turn === 7) {
    return {
      reply: `Smart use of semantic caching! On Day 27 (Security & Guardrails), how did you protect your healthcare RAG pipeline against indirect prompt injection hidden inside uploaded unstructured documents?`,
      done: false,
      questionNumber: 7,
      dayCovered: 27,
      feedback: null
    };
  } else {
    return {
      reply: `Evaluation complete, ${name}! You've demonstrated impressive depth across vector search, tool calling, MCP servers, and deployment. Closing interview session. Feedback report rendered below.`,
      done: true,
      questionNumber: 8,
      dayCovered: 31,
      feedback: {
        summary: candidate.evaluation?.summary || `${name} (${role}) exhibited strong technical mastery over core RAG pipelines, function calling, MCP tool standardization, and production containerization.`,
        strengths: candidate.evaluation?.strengths.map(s => `${s.name} (${s.val}%)`) || [
          "Clear architectural understanding of Query Routing (Hybrid Vector + SQL)",
          "Robust error handling for Pydantic function calling & structured outputs",
          "Solid knowledge of Model Context Protocol (MCP) server integration"
        ],
        gaps: candidate.evaluation?.gaps.map(g => `${g.title}: ${g.desc}`) || [
          "Review production observability and Prometheus/Grafana metric setup (Day 29)",
          "Further practice on automated evaluation metrics (RAGAS framework)"
        ],
        next: candidate.evaluation?.nextSteps || [
          "Extend formal offer within 24 hours.",
          "Align on start date and onboarding cohort.",
          "Prepare specific initial mission briefing focused on the retrieval pipeline rebuild."
        ]
      }
    };
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('roster'); // 'roster' | 'briefing' | 'interview' | 'feedback' | 'api'
  const [selectedCandidate, setSelectedCandidate] = useState(CANDIDATES_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sessionId, setSessionId] = useState('SESS-' + Math.random().toString(36).substring(2, 7).toUpperCase());
  const [apiKey, setApiKey] = useState('');
  
  // Settings & Authentication state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-3-flash-preview');
  const [interviewStrictness, setInterviewStrictness] = useState('Senior Lead');

  // Interview state
  const [history, setHistory] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [finalFeedback, setFinalFeedback] = useState(null);
  const [coveredDays, setCoveredDays] = useState(new Set());
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  
  // API Studio state
  const [apiEndpoint, setApiEndpoint] = useState('/api/interview');
  const [apiReqBody, setApiReqBody] = useState('');
  const [apiResBody, setApiResBody] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isLoading]);

  const speakText = (text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleStartInterview = async (candidateObj = selectedCandidate) => {
    setSelectedCandidate(candidateObj);
    setActiveTab('interview');
    setIsLoading(true);
    setIsInterviewStarted(true);
    setHistory([]);
    setFinalFeedback(null);
    setIsDone(false);
    setCoveredDays(new Set());

    const result = await callGeminiInterviewAgent(null, candidateObj, [], apiKey);
    
    setIsLoading(false);
    if (result) {
      setHistory([{ role: 'model', content: result.reply, questionNum: result.questionNumber, day: result.dayCovered }]);
      if (result.dayCovered) {
        setCoveredDays(prev => new Set([...prev, result.dayCovered]));
      }
      speakText(result.reply);
    }
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading || isDone) return;

    const userMsg = inputText.trim();
    setInputText('');
    const newHistory = [...history, { role: 'user', content: userMsg }];
    setHistory(newHistory);
    setIsLoading(true);

    const result = await callGeminiInterviewAgent(userMsg, selectedCandidate, newHistory, apiKey);
    
    setIsLoading(false);
    if (result) {
      const updatedHistory = [...newHistory, { 
        role: 'model', 
        content: result.reply, 
        questionNum: result.questionNumber, 
        day: result.dayCovered 
      }];
      setHistory(updatedHistory);
      
      if (result.dayCovered) {
        setCoveredDays(prev => new Set([...prev, result.dayCovered]));
      }

      speakText(result.reply);

      if (result.done) {
        setIsDone(true);
        setFinalFeedback(result.feedback);
      }
    }
  };

  const updateApiSampleRequest = (type) => {
    if (type === 'start') {
      setApiReqBody(JSON.stringify({ sessionId, candidate: selectedCandidate }, null, 2));
    } else {
      setApiReqBody(JSON.stringify({
        sessionId,
        message: "In my Day 10 implementation, I routed queries using keyword matching and vector similarity thresholds to choose between SQLite and ChromaDB."
      }, null, 2));
    }
  };

  useEffect(() => {
    updateApiSampleRequest('start');
  }, [selectedCandidate, sessionId]);

  const handleExecuteApiRequest = async () => {
    setApiLoading(true);
    setApiResBody(null);
    try {
      const parsedReq = JSON.parse(apiReqBody);
      let res;
      if (parsedReq.candidate) {
        res = await callGeminiInterviewAgent(null, parsedReq.candidate, [], apiKey);
      } else {
        res = await callGeminiInterviewAgent(parsedReq.message, selectedCandidate, history, apiKey);
      }
      setApiResBody(res);
    } catch (err) {
      setApiResBody({ error: "Invalid JSON Request Format or API Execution Failure", details: err.message });
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#070A13] text-slate-200 font-mono overflow-hidden select-none">
      
      {/* --- LEFT SIDEBAR (NEURAL INTERFACE) --- */}
      <aside className="w-64 border-r border-[#1E293B] bg-[#0A0E1A] flex flex-col justify-between shrink-0 z-20">
        <div>
          {/* Brand Logo Header */}
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

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 mt-2">
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
              onClick={() => setActiveTab('interview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === 'interview'
                  ? 'bg-[#131C2E] text-[#00F0FF] border-l-2 border-[#00F0FF] shadow-[inset_0_0_12px_rgba(0,240,255,0.15)]'
                  : 'text-slate-400 hover:bg-[#111827] hover:text-slate-200'
              }`}
            >
              <Code className="w-4 h-4 text-purple-400" />
              <span>Interview</span>
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
              <span>Feedback</span>
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

        {/* Sidebar Footer Actions */}
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

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#070A13] relative overflow-hidden">
        
        {/* Background Grid Accent Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        {/* TOP HEADER BAR (MISSION CONTROL) */}
        <header className="h-16 border-b border-[#1E293B] bg-[#0A0E1A]/80 backdrop-blur px-8 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black text-[#00F0FF] uppercase tracking-wider drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">
              MISSION CONTROL
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Query Roster Input */}
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

        {/* TAB 1: ACTIVE ROSTER */}
        {activeTab === 'roster' && (
          <div className="flex-1 p-8 overflow-y-auto z-10">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-1">
                  ACTIVE ROSTER
                </h2>
                <p className="text-xs text-slate-400 font-mono tracking-wider">
                  DATA_SOURCE: <span className="text-cyan-400">{`{{DATA:DOCUMENT:DOCUMENT_3}}`}</span> | ENTITIES: {CANDIDATES_DATA.length}
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

            {/* Candidate Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CANDIDATES_DATA.filter(c => c.member.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.member.jobRole.toLowerCase().includes(searchQuery.toLowerCase())).map((candidate) => {
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
                    {/* Card Header */}
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-3">
                          <div className="w-12 h-12 rounded bg-[#111827] border border-[#1E293B] flex items-center justify-center text-indigo-400 font-bold overflow-hidden">
                            <User className="w-6 h-6 text-slate-400" />
                          </div>
                          <div>
                            <h3 className="font-bold text-base text-white tracking-wide">{candidate.member.name}</h3>
                            <p className="text-xs text-slate-400">{candidate.member.jobRole}</p>
                            <p className="text-[10px] text-slate-500 font-mono mt-0.5">EXP: {candidate.member.yearsExperience} YRS | {candidate.member.level}</p>
                          </div>
                        </div>

                        {/* Status Badge */}
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

                      {/* Mission Progress Bar */}
                      <div className="mb-5">
                        <div className="flex justify-between text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-1">
                          <span>MISSION PROGRESS</span>
                          <span>{candidate.metrics.progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-[#0D1322] border border-[#1E293B] rounded-sm p-0.5 flex gap-1">
                          <div 
                            className="h-full bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.8)] rounded-sm transition-all" 
                            style={{ width: `${candidate.metrics.progress}%` }} 
                          />
                        </div>
                      </div>

                      {/* Key Metrics Grid */}
                      <div className="grid grid-cols-3 gap-2 bg-[#060912] border border-[#1E293B] p-3 rounded mb-5 text-center">
                        <div>
                          <div className="text-lg font-black text-white font-mono">{candidate.metrics.sysScore}</div>
                          <div className="text-[9px] text-slate-500 uppercase tracking-tighter">SYS_SCORE</div>
                        </div>
                        <div>
                          <div className="text-lg font-black text-[#00F0FF] font-mono">{candidate.metrics.codeQlt}</div>
                          <div className="text-[9px] text-slate-500 uppercase tracking-tighter">CODE_QLT</div>
                        </div>
                        <div>
                          <div className="text-lg font-black text-rose-400 font-mono">{candidate.metrics.models}</div>
                          <div className="text-[9px] text-slate-500 uppercase tracking-tighter">
                            {candidate.metrics.models > 10 ? 'MODELS' : 'ATTEMPTS'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Primary Button */}
                    <div>
                      {candidate.member.status === 'READY' ? (
                        <button
                          onClick={() => handleStartInterview(candidate)}
                          className="w-full py-2 bg-[#0D1322] hover:bg-[#00F0FF] hover:text-[#070A13] border border-[#00F0FF] text-[#00F0FF] font-bold text-xs uppercase tracking-widest rounded transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                        >
                          DEPLOY TO INTERVIEW
                        </button>
                      ) : candidate.member.status === 'IN INTERVIEW' ? (
                        <button
                          onClick={() => {
                            setSelectedCandidate(candidate);
                            setActiveTab('interview');
                          }}
                          className="w-full py-2 bg-[#0D1322] hover:bg-amber-500 hover:text-[#070A13] border border-amber-500 text-amber-400 font-bold text-xs uppercase tracking-widest rounded transition-all flex items-center justify-center gap-1.5"
                        >
                          <Radio className="w-3.5 h-3.5 animate-pulse" />
                          <span>MONITOR FEED</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedCandidate(candidate);
                            setActiveTab('feedback');
                          }}
                          className="w-full py-2 bg-[#0D1322] hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold text-xs uppercase tracking-widest rounded transition-all"
                        >
                          VIEW REPORT
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: BRIEFING (CURRICULUM) */}
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

        {/* TAB 3: INTERVIEW TERMINAL */}
        {activeTab === 'interview' && (
          <div className="flex-1 flex overflow-hidden z-10">
            {/* Main Terminal Chat */}
            <div className="flex-1 flex flex-col min-w-0 border-r border-[#1E293B]">
              
              {/* Context Bar */}
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

              {/* Chat Feed */}
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

              {/* Chat Input */}
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

            {/* Sidebar Context Tracker */}
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

        {/* TAB 4: FEEDBACK (CANDIDATE EVALUATION MATCHING REFERENCE IMAGE) */}
        {activeTab === 'feedback' && (
          <div className="flex-1 p-8 overflow-y-auto z-10 space-y-6">
            
            {/* Header section matching image_01dc39.jpg */}
            <div className="flex justify-between items-start border-b border-[#1E293B] pb-6">
              <div>
                <h2 className="text-4xl font-black text-white tracking-widest uppercase mb-1">
                  Candidate Evaluation
                </h2>
                <p className="text-xs text-slate-400 font-mono tracking-wider">
                  ID: <span className="text-slate-200">{selectedCandidate.member.id}</span> | ROLE: <span className="text-slate-200">{selectedCandidate.member.jobRole.toUpperCase()}</span>
                </p>
              </div>

              {/* Final Verdict Box */}
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">FINAL VERDICT</span>
                <div className="px-4 py-2 bg-[#060912] border border-[#00F0FF] text-[#00F0FF] font-bold text-xs uppercase rounded flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                  <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                  <span>{selectedCandidate.evaluation?.verdict || "HIRE - EXCEPTIONAL FIT"}</span>
                </div>
              </div>
            </div>

            {/* Top Grid: Summary Box + Next Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Summary Card (2 cols) */}
              <div className="md:col-span-2 bg-[#0A0E1A] border border-[#1E293B] rounded-lg p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#00F0FF]" />
                      <span>Summary</span>
                    </h3>
                    <span className="px-2 py-0.5 bg-[#111827] text-slate-400 text-[10px] font-mono border border-slate-800 rounded">
                      OVERVIEW
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-mono mb-6">
                    {selectedCandidate.evaluation?.summary}
                  </p>
                </div>

                {/* Technical Score Badges */}
                <div className="grid grid-cols-3 gap-4 border-t border-[#1E293B] pt-4">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-tighter">TECHNICAL DEPTH</div>
                    <div className="text-xl font-black text-[#00F0FF] font-mono mt-0.5">
                      {selectedCandidate.evaluation?.scores?.technicalDepth || "9.5/10"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-tighter">COMMUNICATION</div>
                    <div className="text-xl font-black text-[#00F0FF] font-mono mt-0.5">
                      {selectedCandidate.evaluation?.scores?.communication || "8.8/10"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-tighter">PROBLEM SOLVING</div>
                    <div className="text-xl font-black text-[#00F0FF] font-mono mt-0.5">
                      {selectedCandidate.evaluation?.scores?.problemSolving || "9.2/10"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Glowing Purple "Next Steps" Box */}
              <div className="bg-[#0A0E1A] border border-[#A855F7] rounded-lg p-6 shadow-[0_0_20px_rgba(168,85,247,0.25)] flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#A855F7] flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 fill-[#A855F7]" />
                    <span>Next Steps</span>
                  </h3>

                  <ul className="space-y-3 text-xs text-slate-300 font-mono mb-6">
                    {selectedCandidate.evaluation?.nextSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#00F0FF] shrink-0 mt-0.5">▸</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-[#A855F7] to-[#00F0FF] text-white font-black text-xs uppercase tracking-widest rounded shadow-lg hover:opacity-90 transition-all">
                  EXECUTE OFFER
                </button>
              </div>

            </div>

            {/* Bottom Grid: Signal Strengths + Identified Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Signal Strengths */}
              <div className="bg-[#0A0E1A] border border-[#1E293B] rounded-lg p-6">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-6">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>Signal Strengths</span>
                </h3>

                <div className="space-y-5">
                  {selectedCandidate.evaluation?.strengths.map((st, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                        <span>{st.name}</span>
                        <span className="text-[#00F0FF] font-bold">{st.val}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#060912] rounded p-0.5 border border-slate-800">
                        <div 
                          className="h-full bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.8)] rounded" 
                          style={{ width: `${st.val}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Identified Gaps */}
              <div className="bg-[#0A0E1A] border border-[#1E293B] rounded-lg p-6">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-6">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Identified Gaps</span>
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {selectedCandidate.evaluation?.gaps.map((gap, i) => (
                    <div key={i} className="bg-[#060912] border-l-2 border-amber-500 border-y border-r border-slate-800 p-4 rounded text-xs">
                      <h4 className="font-bold text-slate-200 mb-1">{gap.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed font-mono">{gap.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 5: API SPECIFICATION TESTER */}
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

            <div className="grid grid-cols-2 gap-6">
              {/* Request */}
              <div className="bg-[#0A0E1A] border border-[#1E293B] p-5 rounded space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-300 uppercase">Payload Request</span>
                  <div className="flex gap-2">
                    <button onClick={() => updateApiSampleRequest('start')} className="px-2 py-1 bg-[#111827] text-slate-400 text-[10px] rounded border border-slate-800">
                      Sample 1: Start
                    </button>
                    <button onClick={() => updateApiSampleRequest('turn')} className="px-2 py-1 bg-[#111827] text-slate-400 text-[10px] rounded border border-slate-800">
                      Sample 2: Turn
                    </button>
                  </div>
                </div>

                <textarea
                  rows={12}
                  value={apiReqBody}
                  onChange={(e) => setApiReqBody(e.target.value)}
                  className="w-full bg-[#060912] border border-[#1E293B] rounded p-3 text-xs font-mono text-cyan-300 focus:outline-none focus:border-[#00F0FF]"
                />

                <button
                  onClick={handleExecuteApiRequest}
                  disabled={apiLoading}
                  className="w-full py-3 bg-[#00F0FF] text-[#070A13] font-black text-xs uppercase tracking-widest rounded shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                >
                  EXECUTE POST /API/INTERVIEW
                </button>
              </div>

              {/* Response */}
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

        {/* --- SETTINGS MODAL --- */}
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
                {/* Gemini API Key */}
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
                  <p className="text-[10px] text-slate-500 mt-1">Leaves empty to use built-in Neural Simulation Engine.</p>
                </div>

                {/* Model Selection */}
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
                    <option value="local-simulation">Local Simulation Engine (Offline Ready)</option>
                  </select>
                </div>

                {/* Evaluator Persona / Strictness */}
                <div>
                  <label className="block text-slate-300 font-bold mb-1.5 uppercase">
                    INTERVIEW STRICTNESS PERSONA
                  </label>
                  <select
                    value={interviewStrictness}
                    onChange={(e) => setInterviewStrictness(e.target.value)}
                    className="w-full bg-[#060912] border border-[#1E293B] rounded p-2.5 text-slate-200 font-mono focus:outline-none focus:border-[#00F0FF]"
                  >
                    <option value="Senior Lead">Senior Lead Engineer (Balanced & Probing)</option>
                    <option value="Principal Architect">Principal Architect (Rigorous Deep Dives)</option>
                    <option value="Mentor Guide">Technical Mentor (Supportive & Instructional)</option>
                  </select>
                </div>

                {/* Audio Output */}
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

        {/* --- LOGOUT CONFIRMATION MODAL --- */}
        {isLogoutModalOpen && (
          <div className="fixed inset-0 z-50 bg-[#070A13]/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0A0E1A] border border-rose-500 rounded-lg w-full max-w-md p-6 shadow-[0_0_30px_rgba(244,63,94,0.3)] space-y-5 text-center">
              <div className="w-12 h-12 rounded-full bg-rose-950 border border-rose-500 flex items-center justify-center mx-auto text-rose-400">
                <LogOut className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-lg text-white uppercase tracking-widest mb-1">TERMINATE SESSION?</h3>
                <p className="text-xs text-slate-400 font-mono">
                  You are about to log out of Neural Interface Mission Control. Active evaluation telemetry will be locked.
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
                    setIsLoggedOut(true);
                  }}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider rounded shadow-[0_0_15px_rgba(244,63,94,0.4)]"
                >
                  LOGOUT NOW
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- LOGGED OUT / RE-AUTHENTICATION OVERLAY --- */}
        {isLoggedOut && (
          <div className="fixed inset-0 z-50 bg-[#070A13] flex flex-col items-center justify-center p-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#111827] border-2 border-[#00F0FF] flex items-center justify-center text-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.5)] animate-pulse">
              <Brain className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-2">
                SESSION LOCKED / LOGGED OUT
              </h2>
              <p className="text-xs text-slate-400 font-mono max-w-sm">
                NEURAL INTERFACE EVALUATION CONSOLE IS SECURED. RE-AUTHENTICATE TO RESUME COHORT INTERVIEW CONTROL.
              </p>
            </div>

            <button
              onClick={() => setIsLoggedOut(false)}
              className="px-8 py-3.5 bg-[#00F0FF] text-[#070A13] font-black text-xs uppercase tracking-widest rounded shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>AUTHENTICATE & LOG IN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </main>
    </div>
  );
}