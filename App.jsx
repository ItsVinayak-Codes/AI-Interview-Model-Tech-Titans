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
  Target,
  Shield,
  UserCheck,
  Flame,
  ChevronDown,
  Compass,
  ChevronUp,
  MessageSquare,
  ShieldCheck,
  Sun,
  Moon
} from 'lucide-react';

const CURRICULUM_DATA = {
  cohort: "AI Cohort · 31 days · 8 modules",
  modules: [
    { n: 1, title: "Environment & Tooling", days: [1, 3] },
    { n: 2, title: "Data Foundations", days: [4, 6] },
    { n: 3, title: "Embeddings & Vector Search", days: [7, 10] },
    { n: 4, title: "LLM Core, Prompting & Fine-Tuning", days: [11, 15] },
    { n: 5, title: "Chatbot Application Build", days: [16, 20] },
    { n: 6, title: "Agentic AI & MCP", days: [21, 24] },
    { n: 7, title: "Evaluation, Security & Deployment", days: [25, 28] },
    { n: 8, title: "Production & Capstone", days: [29, 31] }
  ],
  days: [
    { day: 1, title: "VS Code & Python Environment Setup", type: "SETUP", tools: ["VS Code", "Python", "Pylance", "Virtual Environment"], objectives: ["Install VS Code & Python", "Configure Pylance", "Setup .venv"] },
    { day: 3, title: "First AI Project, React Frontend & GitHub", type: "BUILD", tools: ["Ollama", "FastAPI", "React", "Vite", "Git"], objectives: ["Build CLI Chatbot", "FastAPI Backend", "React Frontend"] },
    { day: 7, title: "Embeddings Explained", type: "AI_CORE", tools: ["Sentence Transformers", "OpenAI", "Scikit-learn"], objectives: ["Vector Embeddings", "PCA Visualization", "Cluster Analysis"] },
    { day: 8, title: "Vector Databases Overview", type: "BUILD", tools: ["ChromaDB", "Pinecone"], objectives: ["Local ChromaDB", "Cloud Pinecone", "Database Selection"] },
    { day: 10, title: "Retrieval & Matching Engine", type: "SHIP_IT", tools: ["SQLite", "ChromaDB", "Python"], objectives: ["Build Query Router", "SQL vs Vector lookup", "Hybrid Retrieval"] },
    { day: 13, title: "Function Calling & Structured Outputs", type: "BUILD", tools: ["OpenAI Function Calling", "Pydantic", "Python"], objectives: ["Tool Schemas", "Pydantic Models", "Output Validation"] },
    { day: 22, title: "Multi-Agent Orchestration", type: "BUILD", tools: ["CrewAI", "LangGraph", "Python"], objectives: ["Specialized Domain Agents", "Router Agent", "Delegation"] },
    { day: 23, title: "Model Context Protocol (MCP)", type: "BUILD", tools: ["MCP Python SDK", "Claude Desktop", "Cline"], objectives: ["MCP Server Setup", "Standardized Tool Calls", "Live Interactions"] },
    { day: 28, title: "Docker & Kubernetes Deployment", type: "SHIP_IT", tools: ["Docker", "Kubernetes", "FastAPI"], objectives: ["Containerize Backend", "Deploy K8s Cluster", "Health Checks"] },
    { day: 31, title: "Capstone Project & Final Demo", type: "CAPSTONE", tools: ["FastAPI", "React", "LangChain", "MCP", "Docker"], objectives: ["Full AI System Demo", "Production Architecture", "Final Showcase"] }
  ]
};

const CANDIDATES_DATA = [
  {
    member: { id: "CAND-001", name: "Sarah Johnson", jobRole: "Senior Data Engineer", yearsExperience: 9, level: "L6", status: "READY" },
    metrics: { sysScore: 92, codeQlt: "A+", models: 12, progress: 100 },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 2 },
      { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 2 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 2 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 3 }
    ],
    signals: { commitDays: 28, missionsCompleted: 30, missionsFirstTry: 20 },
    evaluation: {
      verdict: "HIRE - EXCEPTIONAL FIT",
      summary: "Sarah demonstrated deep mastery of LLM orchestration, vector database optimization, and Kubernetes deployment. She consistently articulated trade-offs clearly with high technical rigor.",
      scores: { technicalDepth: "9.5/10", communication: "8.8/10", problemSolving: "9.2/10", systemDesign: "9.0/10" },
      radarSkills: [
        { axis: "RAG & Vector Search", val: 92 },
        { axis: "Function Calling", val: 88 },
        { axis: "Multi-Agent Systems", val: 82 },
        { axis: "MCP & Architecture", val: 90 },
        { axis: "DevOps & K8s", val: 85 }
      ],
      strengths: [
        { name: "Retrieval Architecture & Indexing", val: 95 },
        { name: "System Scalability & Performance", val: 90 },
        { name: "Cross-functional System Design", val: 85 }
      ],
      gaps: [
        { title: "Observability Telemetry", desc: "Requires further familiarity with Prometheus / Grafana instrumentation." }
      ],
      nextSteps: [
        "Extend formal offer within 24 hours.",
        "Align on start date and onboarding cohort."
      ]
    }
  },
  {
    member: { id: "CAND-002", name: "Alex Turner", jobRole: "Backend Software Engineer", yearsExperience: 5, level: "L4", status: "IN INTERVIEW" },
    metrics: { sysScore: 85, codeQlt: "B", models: 4, progress: 75 },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 3 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 4 },
      { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 4 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 3 }
    ],
    signals: { commitDays: 22, missionsCompleted: 29, missionsFirstTry: 10 },
    evaluation: {
      verdict: "HIRE - STRONG BACKEND",
      summary: "Alex exhibits strong fundamentals in Python, FastAPI, and Database query routing. Shows great potential for agentic systems integration.",
      scores: { technicalDepth: "8.2/10", communication: "8.0/10", problemSolving: "8.4/10", systemDesign: "7.8/10" },
      radarSkills: [
        { axis: "RAG & Vector Search", val: 80 },
        { axis: "Function Calling", val: 85 },
        { axis: "Multi-Agent Systems", val: 72 },
        { axis: "MCP & Architecture", val: 78 },
        { axis: "DevOps & K8s", val: 70 }
      ],
      strengths: [
        { name: "FastAPI & Endpoint Engineering", val: 88 },
        { name: "Query Routing & SQL Lookups", val: 84 }
      ],
      gaps: [
        { title: "Multi-Agent Loop Edge Cases", desc: "Slight hesitation when handling tool call retries and recursion caps." }
      ],
      nextSteps: [
        "Schedule follow-up system design conversation.",
        "Prepare offer package for L4 Backend role."
      ]
    }
  },
  {
    member: { id: "CAND-003", name: "Emily Chen", jobRole: "Senior AI Engineer", yearsExperience: 8, level: "L6", status: "READY" },
    metrics: { sysScore: 98, codeQlt: "A+", models: 12, progress: 100 },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 1 },
      { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 31, missionsCompleted: 31, missionsFirstTry: 30 },
    evaluation: {
      verdict: "HIRE - PRINCIPAL CANDIDATE",
      summary: "Exceptional mastery across every module. Completed all 31 days on first attempt. Flawless explanation of MCP servers and multi-agent routing.",
      scores: { technicalDepth: "9.8/10", communication: "9.5/10", problemSolving: "9.7/10", systemDesign: "9.6/10" },
      radarSkills: [
        { axis: "RAG & Vector Search", val: 98 },
        { axis: "Function Calling", val: 95 },
        { axis: "Multi-Agent Systems", val: 96 },
        { axis: "MCP & Architecture", val: 99 },
        { axis: "DevOps & K8s", val: 92 }
      ],
      strengths: [
        { name: "MCP Protocol & Tool Server Standards", val: 99 },
        { name: "Agentic Orchestration & LangGraph", val: 96 }
      ],
      gaps: [],
      nextSteps: [
        "Fast-track principal AI engineer offer.",
        "Assign as AI Cohort Technical Mentor."
      ]
    }
  }
];

function SkillRadarChart({ skills }) {
  const size = 260;
  const center = size / 2;
  const radius = 85;
  const numAxes = skills?.length || 5;

  const points = (skills || []).map((s, i) => {
    const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
    const r = ((s.val || 50) / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="flex flex-col items-center justify-center relative py-2">
      <svg width={size} height={size} className="overflow-visible">
        {gridLevels.map((lvl, idx) => (
          <polygon
            key={idx}
            points={(skills || []).map((_, i) => {
              const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
              const r = lvl * radius;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            }).join(' ')}
            fill="none"
            stroke="#1E293B"
            strokeWidth="1"
            strokeDasharray={idx < 3 ? "2,2" : "none"}
          />
        ))}

        {(skills || []).map((_, i) => {
          const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#1E293B" strokeWidth="1" />
          );
        })}

        <polygon points={points} fill="rgba(0, 240, 255, 0.25)" stroke="#00F0FF" strokeWidth="2" />

        {(skills || []).map((s, i) => {
          const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
          const r = ((s.val || 50) / 100) * radius;
          const x = center + r * Math.cos(angle);
          const y = center + r * Math.sin(angle);

          const lx = center + (radius + 28) * Math.cos(angle);
          const ly = center + (radius + 16) * Math.sin(angle);

          return (
            <g key={i}>
              <circle cx={x} cy={y} r="4" fill="#00F0FF" />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                fill="#94A3B8"
                fontSize="8"
                fontFamily="monospace"
              >
                {s.axis} ({s.val}%)
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

async function callGeminiInterviewAgent(userMessage, candidate, history, apiKeyOverride) {
  const isInitial = !userMessage;
  const questionCount = history.filter(h => h.role === 'model').length;

  if (questionCount >= 8 && !isInitial) {
    return {
      reply: `Thank you, ${candidate?.member?.name || 'Candidate'}. That completes our technical evaluation session across the 31-day ABTalks AI Cohort! I have compiled your technical scorecard, skill radar matrix, strengths, and actionable hiring next steps.`,
      done: true,
      questionNumber: questionCount + 1,
      dayCovered: 31,
      feedback: candidate?.evaluation || {
        verdict: "HIRE - HIGH POTENTIAL",
        summary: `${candidate?.member?.name || 'Candidate'} demonstrated solid understanding across RAG retrieval pipelines, Pydantic tool schemas, multi-agent orchestration, and Kubernetes deployment.`,
        scores: { technicalDepth: "9.0/10", communication: "8.5/10", problemSolving: "8.8/10", systemDesign: "8.5/10" },
        radarSkills: [
          { axis: "RAG & Vector Search", val: 90 },
          { axis: "Function Calling", val: 85 },
          { axis: "Multi-Agent Systems", val: 80 },
          { axis: "MCP & Architecture", val: 88 },
          { axis: "DevOps & K8s", val: 78 }
        ],
        strengths: [
          { name: "Retrieval Architecture", val: 90 },
          { name: "Agent Tool Selection", val: 85 },
          { name: "System Scalability", val: 82 }
        ],
        gaps: [
          { title: "Observability Telemetry", desc: "Requires further familiarity with Prometheus / Grafana instrumentation." }
        ],
        nextSteps: [
          "Extend formal offer within 24 hours.",
          "Align on start date and onboarding cohort."
        ]
      }
    };
  }

  const questionBank = [
    {
      q: `Hello ${candidate?.member?.name || 'Candidate'}! Welcome to your technical interview for the ${candidate?.member?.jobRole || 'AI Engineer'} role. Let's start with Day 7 & 8: How did you select chunk sizes, overlap, and vector database indexing (e.g. ChromaDB vs Pinecone) for your healthcare knowledge base?`,
      day: 8
    },
    {
      q: "On Day 10, you built a Query Router to split queries between SQL and vector search. How did your router determine when to execute structured SQL lookups vs semantic vector retrieval, and how did you deduplicate results?",
      day: 10
    },
    {
      q: "Moving to Day 13 & Function Calling: How did you construct Pydantic schemas for LLM tool execution? How did you validate structured outputs and handle malformed tool arguments?",
      day: 13
    },
    {
      q: "On Day 22, you implemented Multi-Agent Orchestration. How did your supervisor agent delegate tasks across domain specialists, and how did you prevent infinite tool call loops?",
      day: 22
    },
    {
      q: "Let's discuss Day 23 & Model Context Protocol (MCP): How does an MCP server standardize tool capabilities compared to custom LangChain wrappers, and how did you expose tools to Claude / Cline clients?",
      day: 23
    },
    {
      q: "Regarding Day 27 (Security, Privacy & Guardrails): How did you protect your RAG pipeline against indirect prompt injections and jailbreak attacks when ingesting untrusted documents?",
      day: 27
    },
    {
      q: "On Day 28 (Docker & Kubernetes Deployment): How did you containerize your FastAPI backend and configure health checks, liveness probes, and resource limits in your Kubernetes manifests?",
      day: 28
    },
    {
      q: "Finally, reflecting on Day 31 Capstone: If scaling this production AI system to handle 100k requests/minute, what latency bottlenecks would you optimize first (e.g., embedding caching, streaming response SSE)?",
      day: 31
    }
  ];

  const nextIndex = Math.min(questionCount, questionBank.length - 1);
  const qObj = questionBank[nextIndex];

  return {
    reply: qObj.q,
    done: false,
    questionNumber: nextIndex + 1,
    dayCovered: qObj.day
  };
}

export default function App() {
  const [theme, setTheme] = useState('dark');
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
          { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
          { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 1 },
          { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 1 },
          { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
          { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 1 },
          { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 2 }
        ],
        signals: { commitDays: 30, missionsCompleted: 30, missionsFirstTry: 26 },
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

  const handleCandidateSubmit = handleOnboardingSubmit;

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
    <div className={`min-h-screen font-mono select-none transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#070A13] text-slate-200' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* =========================================================
          PREMIUM WELCOME / LANDING PAGE
         ========================================================= */}
      {viewMode === 'welcome' && (
        <div className={`min-h-screen overflow-x-hidden transition-colors duration-300 ${
          theme === 'dark' ? 'bg-[#070A13] text-slate-200' : 'bg-slate-50 text-slate-800'
        }`}>

          {/* Background Grid / Ambient Glow */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div
              className={`absolute inset-0 ${theme === 'dark' ? 'opacity-[0.12]' : 'opacity-[0.06]'}`}
              style={{
                backgroundImage: theme === 'dark'
                  ? 'linear-gradient(rgba(0,240,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.12) 1px, transparent 1px)'
                  : 'linear-gradient(rgba(2,132,199,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(2,132,199,0.12) 1px, transparent 1px)',
                backgroundSize: '45px 45px'
              }}
            />

            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[140px]" />
            <div className="absolute top-[700px] left-[-250px] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[130px]" />
            <div className="absolute top-[1500px] right-[-250px] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px]" />
          </div>

          {/* NAVBAR */}
          <header className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300 ${
            theme === 'dark' ? 'border-[#1E293B] bg-[#070A13]/90' : 'border-slate-200 bg-white/90'
          }`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">

              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-lg ${
                    theme === 'dark' ? 'bg-[#0D1322] border-[#00F0FF]/60 shadow-[0_0_20px_rgba(0,240,255,0.18)]' : 'bg-cyan-50 border-cyan-500 shadow-sm'
                  }`}>
                    <Brain className="w-5 h-5 text-[#00F0FF]" />
                  </div>

                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#070A13] animate-pulse" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-black tracking-[0.22em] text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      NEURAL INTERFACE
                    </span>
                    <span className="text-[8px] px-1.5 py-0.5 rounded border border-purple-500/40 bg-purple-500/10 text-purple-300 font-mono">
                      v3.8
                    </span>
                  </div>

                  <div className="text-[9px] text-emerald-400 font-mono tracking-wider">
                    ABTALKS AI EVALUATION PLATFORM
                  </div>
                </div>
              </div>

              <div className={`hidden lg:flex items-center gap-8 text-[10px] font-mono uppercase tracking-widest ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                <button
                  onClick={() => document.getElementById('platform')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#00F0FF] transition-colors"
                >
                  Platform
                </button>

                <button
                  onClick={() => document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#00F0FF] transition-colors"
                >
                  Methodology
                </button>

                <button
                  onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-[#00F0FF] transition-colors"
                >
                  Curriculum
                </button>
              </div>

              <div className="flex items-center gap-4">
                {/* Theme Toggle Button */}
                <button
                  onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono font-bold transition-all ${
                    theme === 'dark'
                      ? 'bg-[#0D1322] border-[#1E293B] text-amber-400 hover:border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.2)]'
                      : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 shadow-sm'
                  }`}
                  title="Toggle Light / Dark Theme"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span className="hidden sm:inline">LIGHT</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-indigo-600" />
                      <span className="hidden sm:inline">DARK</span>
                    </>
                  )}
                </button>

                <button
                  onClick={scrollToForm}
                  className="px-4 py-2.5 bg-[#00F0FF] hover:bg-cyan-300 text-[#070A13] font-black text-[10px] uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all flex items-center gap-2"
                >
                  Candidate Login
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </header>

          {/* HERO */}
          <main className="relative z-10">
            <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 lg:pt-28">
              <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">

                {/* LEFT */}
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/5 text-[#00F0FF] font-mono text-[9px] uppercase tracking-[0.18em] mb-7">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AI EVALUATION ENGINE ONLINE
                  </div>

                  <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95] ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    GO BEYOND
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#A855F7] drop-shadow-[0_0_30px_rgba(0,240,255,0.25)]">
                      THE RESUME.
                    </span>
                    <span className={`block mt-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                      MEASURE ENGINEERING.
                    </span>
                  </h1>

                  <p className={`mt-7 max-w-2xl text-sm lg:text-base leading-7 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Neural Interface is an AI-powered technical evaluation platform
                    designed to assess how candidates actually think, build,
                    debug, architect, and communicate—not just what they list
                    on a resume.
                  </p>

                  <p className="mt-4 max-w-2xl text-xs text-slate-500 font-mono leading-6">
                    Adaptive questioning · Multi-turn reasoning · Technical
                    signal extraction · Structured scorecards · Actionable feedback
                  </p>

                  <div className="flex flex-wrap gap-3 mt-8">
                    <button
                      onClick={scrollToForm}
                      className="px-7 py-4 bg-[#00F0FF] hover:bg-cyan-300 text-[#070A13] font-black text-[10px] uppercase tracking-[0.16em] rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.35)] transition-all flex items-center gap-2 group"
                    >
                      Start Technical Evaluation
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' })}
                      className={`px-7 py-4 border font-bold text-[10px] uppercase tracking-[0.16em] rounded-lg transition-all ${
                        theme === 'dark'
                          ? 'bg-[#0D1322] hover:bg-[#111827] border-[#1E293B] hover:border-[#00F0FF]/50 text-slate-300'
                          : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                      }`}
                    >
                      Explore Methodology
                    </button>
                  </div>

                  {/* STATUS */}
                  <div className="flex flex-wrap gap-5 mt-9 text-[9px] font-mono uppercase tracking-widest">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Session Engine Ready
                    </div>

                    <div className="flex items-center gap-2 text-cyan-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Evaluation Grounded
                    </div>

                    <div className="flex items-center gap-2 text-purple-400">
                      <Radio className="w-3.5 h-3.5 animate-pulse" />
                      AI Agent Online
                    </div>
                  </div>
                </div>

                {/* RIGHT — AI TERMINAL CARD */}
                <div className="relative">
                  <div className="absolute -inset-5 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl" />

                  <div className={`relative border rounded-2xl overflow-hidden shadow-2xl ${
                    theme === 'dark' ? 'bg-[#0A0E1A] border-[#1E293B]' : 'bg-white border-slate-200'
                  }`}>
                    {/* Terminal Header */}
                    <div className={`px-5 py-4 border-b flex items-center justify-between ${
                      theme === 'dark' ? 'bg-[#0D1322] border-[#1E293B]' : 'bg-slate-100 border-slate-200'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-[#00F0FF]" />
                        <span className={`text-[10px] font-mono font-bold tracking-widest ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                        }`}>
                          EVALUATION_ENGINE
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-[9px] font-mono text-emerald-400">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        LIVE
                      </div>
                    </div>

                    {/* Terminal Content */}
                    <div className="p-6 space-y-5 font-mono">
                      <div>
                        <div className="text-[9px] text-slate-500 mb-2">SYSTEM / INITIALIZE</div>
                        <div className="text-xs text-cyan-500">&gt; loading_candidate_profile...</div>
                        <div className="text-xs text-emerald-400 mt-1">✓ profile_context_loaded</div>
                      </div>

                      <div className={`h-px ${theme === 'dark' ? 'bg-[#1E293B]' : 'bg-slate-200'}`} />

                      <div>
                        <div className="text-[9px] text-slate-500 mb-2">ADAPTIVE INTERVIEW</div>
                        <div className={`text-sm font-semibold leading-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          "How would you design a retrieval architecture that remains reliable as your knowledge base scales?"
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className={`border rounded-lg p-3 ${
                          theme === 'dark' ? 'bg-[#060912] border-[#1E293B]' : 'bg-slate-50 border-slate-200'
                        }`}>
                          <div className="text-[8px] text-slate-500 uppercase tracking-widest">Context</div>
                          <div className="text-xs text-cyan-500 font-bold mt-1">Candidate-aware</div>
                        </div>

                        <div className={`border rounded-lg p-3 ${
                          theme === 'dark' ? 'bg-[#060912] border-[#1E293B]' : 'bg-slate-50 border-slate-200'
                        }`}>
                          <div className="text-[8px] text-slate-500 uppercase tracking-widest">Evaluation</div>
                          <div className="text-xs text-purple-400 font-bold mt-1">Multi-signal</div>
                        </div>
                      </div>

                      <div className={`border rounded-lg p-4 ${
                        theme === 'dark' ? 'bg-[#060912] border-[#1E293B]' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="flex justify-between text-[8px] text-slate-500 uppercase tracking-widest mb-3">
                          <span>Technical Signal Matrix</span>
                          <span className="text-emerald-400">ACTIVE</span>
                        </div>

                        <div className="space-y-2">
                          {[
                            ['Architecture', '92%'],
                            ['Problem Solving', '87%'],
                            ['Communication', '84%'],
                            ['AI Systems', '91%']
                          ].map(([label, value]) => (
                            <div key={label}>
                              <div className="flex justify-between text-[9px] font-mono mb-1">
                                <span className="text-slate-500">{label}</span>
                                <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>{value}</span>
                              </div>
                              <div className="h-1.5 bg-slate-300 dark:bg-[#111827] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#00F0FF] to-[#A855F7]"
                                  style={{ width: value }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-[8px] text-slate-500">
                        neural-interface://agent/evaluation/ready
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* PLATFORM STATS */}
            <section id="platform" className={`border-y ${
              theme === 'dark' ? 'border-[#1E293B] bg-[#080C16]/80' : 'border-slate-200 bg-white'
            }`}>
              <div className="max-w-7xl mx-auto px-6 lg:px-10 py-7">
                <div className={`grid grid-cols-2 lg:grid-cols-4 divide-x ${
                  theme === 'dark' ? 'divide-[#1E293B]' : 'divide-slate-200'
                }`}>
                  {[
                    ['31', 'Days', 'Structured AI Curriculum'],
                    ['8', 'Modules', 'Engineering Domains'],
                    ['100+', 'Signals', 'Technical Indicators'],
                    ['01', 'Agent', 'Continuous Interviewer']
                  ].map(([number, label, description]) => (
                    <div key={label} className="px-5 text-center">
                      <div className={`text-3xl font-black font-mono ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        {number}
                        <span className="text-[#00F0FF] text-sm ml-1">{label}</span>
                      </div>
                      <div className="mt-1 text-[8px] text-slate-500 uppercase tracking-[0.18em]">
                        {description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* WHY THIS PLATFORM */}
            <section id="methodology" className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
              <div className="max-w-3xl mb-14">
                <div className="text-[9px] text-[#00F0FF] font-mono tracking-[0.25em] uppercase mb-3">
                  / 01 — Evaluation Philosophy
                </div>
                <h2 className={`text-3xl lg:text-5xl font-black tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  FROM STATIC QUESTIONS
                  <span className="text-[#00F0FF]"> TO TECHNICAL EVIDENCE.</span>
                </h2>
                <p className="mt-5 text-sm text-slate-500 leading-7">
                  Traditional interviews often measure how well someone can
                  recall information. Neural Interface focuses on how candidates
                  reason through real engineering problems.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    icon: Brain,
                    number: '01',
                    title: 'Adaptive Interviewing',
                    text: 'Questions evolve according to the candidate profile, previous answers, and technical depth demonstrated during the session.'
                  },
                  {
                    icon: Activity,
                    number: '02',
                    title: 'Signal Extraction',
                    text: 'The evaluation focuses on architecture, reasoning, communication, implementation choices, trade-offs, and system thinking.'
                  },
                  {
                    icon: BarChart3,
                    number: '03',
                    title: 'Actionable Scorecard',
                    text: 'Candidates receive structured strengths, gaps, technical scores, and concrete next steps after the evaluation.'
                  }
                ].map(({ icon: Icon, number, title, text }) => (
                  <div
                    key={number}
                    className={`group border rounded-xl p-6 transition-all ${
                      theme === 'dark'
                        ? 'bg-[#0A0E1A] border-[#1E293B] hover:border-[#00F0FF]/50'
                        : 'bg-white border-slate-200 hover:border-cyan-500 shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className={`w-11 h-11 rounded-lg border flex items-center justify-center ${
                        theme === 'dark' ? 'bg-[#0D1322] border-[#1E293B]' : 'bg-cyan-50 border-cyan-200'
                      }`}>
                        <Icon className="w-5 h-5 text-[#00F0FF]" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{number}</span>
                    </div>
                    <h3 className={`text-lg font-black uppercase tracking-wide ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      {title}
                    </h3>
                    <p className="mt-3 text-xs text-slate-500 leading-6">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CURRICULUM & ONBOARDING CTA */}
            <section ref={formRef} className="relative max-w-5xl mx-auto px-6 py-24">
              <div className="relative border rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300 ${
                theme === 'dark' ? 'bg-[#0A0E1A] border-[#00F0FF]/40' : 'bg-white border-cyan-400'
              }">
                <div className={`p-8 lg:p-10 border-b ${theme === 'dark' ? 'border-[#1E293B]' : 'border-slate-200'}`}>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-2 text-[#00F0FF] text-[9px] font-mono tracking-[0.2em] uppercase">
                        <UserCheck className="w-4 h-4" />
                        Candidate Onboarding
                      </div>
                      <h2 className={`mt-3 text-2xl lg:text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        INITIALIZE YOUR <span className="text-[#00F0FF]">EVALUATION PROFILE.</span>
                      </h2>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleCandidateSubmit} className="p-8 lg:p-10 space-y-7">
                  <div>
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                      Preset Cohort Candidates
                    </label>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {candidatesList.map(c => (
                        <button
                          key={c.member.id}
                          type="button"
                          onClick={() => handleSelectPresetCandidate(c)}
                          className={`px-3 py-2 rounded-lg text-[9px] font-mono border transition-all ${
                            candidateForm.id === c.member.id
                              ? 'bg-[#00F0FF] text-[#070A13] border-[#00F0FF] font-bold'
                              : theme === 'dark'
                                ? 'bg-[#0D1322] border-[#1E293B] text-slate-400 hover:border-[#00F0FF]/50 hover:text-[#00F0FF]'
                                : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-cyan-500'
                          }`}
                        >
                          {c.member.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        value={candidateForm.name}
                        onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                        placeholder="Enter candidate name"
                        className={`w-full border rounded-lg p-3.5 text-xs font-mono focus:outline-none focus:border-[#00F0FF] ${
                          theme === 'dark' ? 'bg-[#060912] border-[#1E293B] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                        Candidate ID
                      </label>
                      <input
                        required
                        type="text"
                        value={candidateForm.id}
                        onChange={(e) => setCandidateForm({ ...candidateForm, id: e.target.value })}
                        placeholder="e.g. CAND-1042"
                        className={`w-full border rounded-lg p-3.5 text-xs font-mono focus:outline-none focus:border-[#00F0FF] ${
                          theme === 'dark' ? 'bg-[#060912] border-[#1E293B] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                        }`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#00F0FF] to-[#A855F7] text-[#070A13] font-black text-[10px] uppercase tracking-[0.18em] rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.30)] hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Initialize Candidate Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </section>
          </main>
        </div>
      )}

      {/* =========================================================
          DASHBOARD VIEW MODE
         ========================================================= */}
      {viewMode === 'dashboard' && (
        <div className="flex h-screen w-full overflow-hidden">
          {/* SIDEBAR */}
          <aside className={`w-64 border-r flex flex-col justify-between shrink-0 z-20 transition-colors ${
            theme === 'dark' ? 'border-[#1E293B] bg-[#0A0E1A]' : 'border-slate-200 bg-white'
          }`}>
            <div>
              <div className={`p-5 border-b flex items-center gap-3 ${theme === 'dark' ? 'border-[#1E293B]' : 'border-slate-200'}`}>
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.4)] ${
                    theme === 'dark' ? 'bg-[#111827] border-[#00F0FF]' : 'bg-cyan-50 border-cyan-500'
                  }`}>
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
                      ? theme === 'dark'
                        ? 'bg-[#131C2E] text-[#00F0FF] border-l-2 border-[#00F0FF]'
                        : 'bg-cyan-50 text-cyan-700 border-l-2 border-cyan-600'
                      : theme === 'dark' ? 'text-slate-400 hover:bg-[#111827]' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Compass className="w-4 h-4 text-[#00F0FF]" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => setActiveTab('interview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-all ${
                    activeTab === 'interview'
                      ? theme === 'dark'
                        ? 'bg-[#131C2E] text-[#00F0FF] border-l-2 border-[#00F0FF]'
                        : 'bg-cyan-50 text-cyan-700 border-l-2 border-cyan-600'
                      : theme === 'dark' ? 'text-slate-400 hover:bg-[#111827]' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Code className="w-4 h-4 text-purple-400" />
                  <span>Give Interview</span>
                </button>

                <button
                  onClick={() => setActiveTab('feedback')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-all ${
                    activeTab === 'feedback'
                      ? theme === 'dark'
                        ? 'bg-[#131C2E] text-[#00F0FF] border-l-2 border-[#00F0FF]'
                        : 'bg-cyan-50 text-cyan-700 border-l-2 border-cyan-600'
                      : theme === 'dark' ? 'text-slate-400 hover:bg-[#111827]' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span>Take Feedback</span>
                </button>

                <button
                  onClick={() => setActiveTab('briefing')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-all ${
                    activeTab === 'briefing'
                      ? theme === 'dark'
                        ? 'bg-[#131C2E] text-[#00F0FF] border-l-2 border-[#00F0FF]'
                        : 'bg-cyan-50 text-cyan-700 border-l-2 border-cyan-600'
                      : theme === 'dark' ? 'text-slate-400 hover:bg-[#111827]' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Briefing</span>
                </button>
              </nav>
            </div>

            <div className={`p-4 border-t space-y-3 ${theme === 'dark' ? 'border-[#1E293B]' : 'border-slate-200'}`}>
              <button
                onClick={() => handleStartInterview(selectedCandidate)}
                className="w-full py-3 bg-[#00F0FF] hover:bg-[#38bdf8] text-[#070A13] font-black text-xs uppercase tracking-widest rounded transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2"
              >
                <span>START NEW SESSION</span>
              </button>

              <div className="flex items-center justify-between text-slate-500 pt-2 px-1">
                <button onClick={() => setIsSettingsOpen(true)} className="flex items-center gap-1.5 text-xs hover:text-slate-300">
                  <Settings className="w-3.5 h-3.5" />
                  <span>Settings</span>
                </button>
                <button onClick={() => setIsLogoutModalOpen(true)} className="flex items-center gap-1.5 text-xs hover:text-rose-400">
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN DASHBOARD CONTENT */}
          <main className={`flex-1 flex flex-col min-w-0 relative overflow-hidden transition-colors ${
            theme === 'dark' ? 'bg-[#070A13]' : 'bg-slate-50 text-slate-800'
          }`}>
            {/* HEADER WITH LIGHT/DARK THEME TOGGLE */}
            <header className={`h-16 border-b backdrop-blur px-8 flex items-center justify-between z-10 transition-colors ${
              theme === 'dark' ? 'border-[#1E293B] bg-[#0A0E1A]/80' : 'border-slate-200 bg-white/80'
            }`}>
              <div className="flex items-center gap-4">
                <h2 className={`text-xl font-black uppercase tracking-wider flex items-center gap-2 ${
                  theme === 'dark' ? 'text-[#00F0FF]' : 'text-cyan-700'
                }`}>
                  <span>MISSION CONTROL</span>
                  <span className={`text-xs font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>[{selectedCandidate.member.name}]</span>
                </h2>
              </div>

              {/* Theme Change Toggle Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-mono font-bold transition-all ${
                    theme === 'dark'
                      ? 'bg-[#0D1322] border-[#1E293B] text-amber-400 hover:border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.2)]'
                      : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200 shadow-sm'
                  }`}
                  title="Toggle Light / Dark Theme"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span>LIGHT THEME</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-indigo-600" />
                      <span>DARK THEME</span>
                    </>
                  )}
                </button>
              </div>
            </header>

            {/* TAB: HOME */}
            {activeTab === 'home' && (
              <div className="flex-1 p-8 overflow-y-auto z-10 space-y-6">
                <div className={`flex justify-between items-start border-b pb-6 ${theme === 'dark' ? 'border-[#1E293B]' : 'border-slate-200'}`}>
                  <div>
                    <h2 className={`text-3xl font-black tracking-widest uppercase mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      WELCOME BACK, {selectedCandidate.member.name.toUpperCase()}
                    </h2>
                    <p className="text-xs font-mono text-slate-400">
                      CANDIDATE ID: <span className="text-[#00F0FF]">{selectedCandidate.member.id}</span> | ROLE: <span className="text-slate-300">{selectedCandidate.member.jobRole}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => setViewMode('welcome')}
                    className={`px-3 py-1.5 border rounded text-xs transition-all ${
                      theme === 'dark' ? 'bg-[#0D1322] border-[#1E293B] text-slate-300 hover:border-[#00F0FF]' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    ← SWITCH CANDIDATE
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`border-2 rounded-xl p-6 transition-all flex flex-col justify-between space-y-6 ${
                    theme === 'dark' ? 'bg-[#0A0E1A] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.2)]' : 'bg-white border-cyan-500 shadow-md'
                  }`}>
                    <div>
                      <div className="w-12 h-12 rounded bg-cyan-950/30 border border-[#00F0FF] flex items-center justify-center text-[#00F0FF] mb-4">
                        <Code className="w-6 h-6" />
                      </div>
                      <h3 className={`text-xl font-bold uppercase tracking-wider mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        1. GIVE TECHNICAL INTERVIEW
                      </h3>
                      <p className="text-xs text-slate-400 font-mono leading-relaxed">
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

                  <div className={`border-2 rounded-xl p-6 transition-all flex flex-col justify-between space-y-6 ${
                    theme === 'dark' ? 'bg-[#0A0E1A] border-[#A855F7] shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'bg-white border-purple-500 shadow-md'
                  }`}>
                    <div>
                      <div className="w-12 h-12 rounded bg-purple-950/30 border border-[#A855F7] flex items-center justify-center text-[#A855F7] mb-4">
                        <BarChart3 className="w-6 h-6" />
                      </div>
                      <h3 className={`text-xl font-bold uppercase tracking-wider mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        2. TAKE & VIEW FEEDBACK
                      </h3>
                      <p className="text-xs text-slate-400 font-mono leading-relaxed">
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
              </div>
            )}

            {/* TAB: BRIEFING */}
            {activeTab === 'briefing' && (
              <div className="flex-1 p-8 overflow-y-auto z-10 space-y-6">
                <div>
                  <h2 className={`text-3xl font-black tracking-widest uppercase mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    MISSION BRIEFING
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">ABTALKS AI COHORT · 31 DAYS · 8 MODULES</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CURRICULUM_DATA.days.map((d) => (
                    <div key={d.day} className={`p-4 rounded border text-xs space-y-2 ${
                      theme === 'dark' ? 'bg-[#0A0E1A] border-[#1E293B]' : 'bg-white border-slate-200'
                    }`}>
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-[#00F0FF] font-bold">DAY {d.day}: {d.title}</span>
                        <span className="px-2 py-0.5 bg-[#111827] text-[10px] text-slate-300 rounded">{d.type}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {d.tools.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-slate-800 text-[10px] text-indigo-300 rounded font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: INTERVIEW */}
            {activeTab === 'interview' && (
              <div className="flex-1 flex overflow-hidden z-10">
                <div className="flex-1 flex flex-col min-w-0 border-r border-[#1E293B]">
                  <div className={`p-3 border-b flex items-center justify-between text-xs px-6 ${
                    theme === 'dark' ? 'bg-[#0A0E1A] border-[#1E293B]' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-slate-400 uppercase">Candidate: </span>
                        <span className="font-bold text-[#00F0FF]">{selectedCandidate.member.name}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 uppercase">Questions: </span>
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
                        className="flex items-center gap-1.5 px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs font-bold transition-all"
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
                        <h3 className={`text-lg font-black uppercase tracking-wider mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          NEURAL TERMINAL READY
                        </h3>
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
                              <div className="w-8 h-8 rounded bg-[#111827] border border-[#00F0FF] flex items-center justify-center text-[#00F0FF] shrink-0 mt-1">
                                <Brain className="w-4 h-4" />
                              </div>
                            )}

                            <div className={`max-w-[80%] rounded p-4 text-xs leading-relaxed ${
                              msg.role === 'user'
                                ? 'bg-[#131C2E] border border-purple-500/40 text-purple-200'
                                : theme === 'dark' ? 'bg-[#0A0E1A] border border-[#1E293B] text-slate-200' : 'bg-slate-100 text-slate-800'
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

                  <form onSubmit={handleSendMessage} className={`p-4 border-t ${theme === 'dark' ? 'border-[#1E293B] bg-[#0A0E1A]' : 'border-slate-200 bg-white'}`}>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        placeholder="ENTER_CANDIDATE_RESPONSE..."
                        disabled={!isInterviewStarted || isLoading || isDone}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        className={`w-full border rounded py-3.5 pl-4 pr-12 text-xs font-mono focus:outline-none focus:border-[#00F0FF] ${
                          theme === 'dark' ? 'bg-[#060912] border-[#1E293B] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                        }`}
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

                <div className={`w-80 border-l p-6 space-y-6 overflow-y-auto ${theme === 'dark' ? 'bg-[#0A0E1A]/60 border-[#1E293B]' : 'bg-slate-50 border-slate-200'}`}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#00F0FF]" />
                    <span>NEURAL TRACKER</span>
                  </h3>

                  <div className={`border rounded p-4 space-y-3 ${theme === 'dark' ? 'bg-[#060912] border-[#1E293B]' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Days Assessed</span>
                      <span className="text-[#00F0FF] font-mono">{coveredDays.size} / 4+</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {Array.from(coveredDays).map(d => (
                        <span key={d} className="px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-mono rounded">
                          Day {d}
                        </span>
                      ))}
                      {coveredDays.size === 0 && <span className="text-[10px] text-slate-500">No coverage logged yet</span>}
                    </div>
                  </div>

                  {finalFeedback && (
                    <div className="bg-gradient-to-b from-purple-950/40 to-[#0A0E1A] border border-purple-500/50 rounded p-4 space-y-3">
                      <div className="flex items-center gap-2 text-[#00F0FF] font-bold text-xs uppercase">
                        <Award className="w-4 h-4" />
                        <span>REPORT READY</span>
                      </div>
                      <p className="text-xs text-slate-300 italic">"{typeof finalFeedback.summary === 'string' ? finalFeedback.summary : JSON.stringify(finalFeedback.summary)}"</p>
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

            {/* TAB: FEEDBACK */}
            {activeTab === 'feedback' && (
              <div className="flex-1 p-8 overflow-y-auto z-10 space-y-6">
                <div className={`flex justify-between items-start border-b pb-6 ${theme === 'dark' ? 'border-[#1E293B]' : 'border-slate-200'}`}>
                  <div>
                    <h2 className={`text-3xl font-black tracking-widest uppercase mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      CANDIDATE PERFORMANCE EVALUATION
                    </h2>
                    <p className="text-xs text-slate-400 font-mono">
                      CANDIDATE: <span className="text-[#00F0FF] font-bold">{selectedCandidate.member.name}</span> ({selectedCandidate.member.id})
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">FINAL HIRING VERDICT</span>
                    <div className="px-4 py-2 bg-[#060912] border border-[#00F0FF] text-[#00F0FF] font-bold text-xs uppercase rounded flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                      <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                      <span>{String((finalFeedback && finalFeedback.verdict) || selectedCandidate.evaluation?.verdict || "HIRE - EXCEPTIONAL FIT")}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={`md:col-span-2 border rounded-lg p-6 flex flex-col justify-between ${
                    theme === 'dark' ? 'bg-[#0A0E1A] border-[#1E293B]' : 'bg-white border-slate-200'
                  }`}>
                    <div>
                      <h3 className={`text-base font-bold flex items-center gap-2 mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        <FileText className="w-4 h-4 text-[#00F0FF]" />
                        <span>Candidate Performance Summary</span>
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-mono mb-6">
                        {String((finalFeedback && finalFeedback.summary) || selectedCandidate.evaluation?.summary || "")}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#1E293B] pt-4">
                      <div className="bg-[#060912] p-3 rounded border border-[#1E293B]">
                        <div className="text-[10px] text-slate-400 uppercase font-mono">TECHNICAL DEPTH</div>
                        <div className="text-xl font-black text-[#00F0FF] font-mono mt-0.5">
                          {String((finalFeedback && finalFeedback.scores?.technicalDepth) || selectedCandidate.evaluation?.scores?.technicalDepth || "9.2/10")}
                        </div>
                      </div>
                      <div className="bg-[#060912] p-3 rounded border border-[#1E293B]">
                        <div className="text-[10px] text-slate-400 uppercase font-mono">COMMUNICATION</div>
                        <div className="text-xl font-black text-[#00F0FF] font-mono mt-0.5">
                          {String((finalFeedback && finalFeedback.scores?.communication) || selectedCandidate.evaluation?.scores?.communication || "8.8/10")}
                        </div>
                      </div>
                      <div className="bg-[#060912] p-3 rounded border border-[#1E293B]">
                        <div className="text-[10px] text-slate-400 uppercase font-mono">PROBLEM SOLVING</div>
                        <div className="text-xl font-black text-[#00F0FF] font-mono mt-0.5">
                          {String((finalFeedback && finalFeedback.scores?.problemSolving) || selectedCandidate.evaluation?.scores?.problemSolving || "9.0/10")}
                        </div>
                      </div>
                      <div className="bg-[#060912] p-3 rounded border border-[#1E293B]">
                        <div className="text-[10px] text-slate-400 uppercase font-mono">SYSTEM DESIGN</div>
                        <div className="text-xl font-black text-[#00F0FF] font-mono mt-0.5">
                          {String((finalFeedback && finalFeedback.scores?.systemDesign) || "8.5/10")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0A0E1A] border border-[#A855F7] rounded-lg p-6 flex flex-col justify-between shadow-[0_0_20px_rgba(168,85,247,0.25)]">
                    <div>
                      <h3 className="text-base font-bold text-[#A855F7] flex items-center gap-2 mb-4">
                        <Zap className="w-4 h-4 fill-[#A855F7]" />
                        <span>Actionable Next Steps</span>
                      </h3>

                      <ul className="space-y-3 text-xs text-slate-300 font-mono mb-6">
                        {((finalFeedback && (finalFeedback.next || finalFeedback.nextSteps)) || selectedCandidate.evaluation?.nextSteps || []).map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-[#00F0FF] shrink-0 mt-0.5">▸</span>
                            <span>{typeof step === 'string' ? step : JSON.stringify(step)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-[#A855F7] to-[#00F0FF] text-[#070A13] font-black text-xs uppercase tracking-widest rounded shadow-lg">
                      EXECUTE OFFER ACTION
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`border rounded-lg p-6 flex flex-col items-center justify-between ${
                    theme === 'dark' ? 'bg-[#0A0E1A] border-[#1E293B]' : 'bg-white border-slate-200'
                  }`}>
                    <div className="w-full flex justify-between items-center mb-2">
                      <h3 className={`text-sm font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
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
                  </div>

                  <div className={`border rounded-lg p-6 space-y-6 ${
                    theme === 'dark' ? 'bg-[#0A0E1A] border-[#1E293B]' : 'bg-white border-slate-200'
                  }`}>
                    <h3 className={`text-sm font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      <span>Evaluated Signal Strengths</span>
                    </h3>

                    <div className="space-y-4">
                      {((finalFeedback && finalFeedback.strengths) || selectedCandidate.evaluation?.strengths || []).map((st, i) => {
                        const val = typeof st === 'object' && st !== null && 'val' in st ? st.val : 85;
                        const label = typeof st === 'object' && st !== null ? (st.name || st.title || JSON.stringify(st)) : String(st);

                        return (
                          <div key={i}>
                            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
                              <span>{label}</span>
                              <span className="text-[#00F0FF] font-bold">{val}%</span>
                            </div>
                            <div className="h-2 w-full bg-[#060912] rounded p-0.5 border border-slate-800">
                              <div 
                                className="h-full bg-gradient-to-r from-[#00F0FF] to-emerald-400 rounded transition-all duration-500" 
                                style={{ width: `${val}%` }} 
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* MODAL: SETTINGS */}
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

      {/* MODAL: LOGOUT */}
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
                className="flex-1 py-2.5 bg-[#0D1322] border border-[#1E293B] text-[#00F0FF] font-bold text-xs uppercase tracking-wider rounded hover:border-slate-500"
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