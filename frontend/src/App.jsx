import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, LogOut, Settings, X, Menu, Terminal, CheckCircle2, ShieldCheck, Radio, Brain, Activity, BarChart3 } from 'lucide-react';

import rawCandidatesData from './data/candidates.json';
import './App.css';

import Navbar from './components/Navbar';
import CandidateForm from './components/CandidateForm';
import Sidebar from './components/Sidebar';
import { DashboardHome, BriefingTab } from './components/DashboardTabs';
import InterviewAppComponent from './components/InterviewApp';
import EvaluationReportComponent from './components/EvaluationReport';

// Using your exact backend requirements mapped from candidates.json
const CANDIDATES_DATA = rawCandidatesData.candidates.map(c => ({
  member: c.member,
  rawProfile: c
}));

export default function App() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const [theme, setTheme] = useState('dark');
  const [viewMode, setViewMode] = useState('welcome');
  const [activeTab, setActiveTab] = useState('home');
  const [candidatesList] = useState(CANDIDATES_DATA);
  const [selectedCandidate, setSelectedCandidate] = useState(CANDIDATES_DATA[0]);

  const [candidateForm, setCandidateForm] = useState({ name: '', id: '', jobRole: 'AI Engineer', yearsExperience: 5 });

  const [history, setHistory] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [finalFeedback, setFinalFeedback] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [coveredDays, setCoveredDays] = useState(new Set()); // Tracker state for sidebar

  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [sessionId] = useState(() => 'sess-' + Math.random().toString(36).substring(2, 9));
  const formRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isLoading]);

  const speakText = (text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#`_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05; utterance.pitch = 0.9;
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.includes('en-US') || v.lang.includes('en-GB'));
    if (englishVoice) utterance.voice = englishVoice;
    window.speechSynthesis.speak(utterance);
  };

  const stopAISpeech = () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); };

  // EXACT FASTAPI BACKEND CALLS 
  const handleStartInterview = async (candidateObj) => {
    stopAISpeech();
    setIsSidebarOpen(false);
    setHistory([]); setIsDone(false); setFinalFeedback(null); setCoveredDays(new Set()); setIsLoading(true);
    setActiveTab('interview'); setViewMode('dashboard');

    try {
      const response = await fetch(`${API_BASE_URL}/api/interview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionId, candidate: candidateObj.rawProfile || candidateObj })
      });

      if (!response.ok) throw new Error(`Backend Error: ${response.status}`);
      const data = await response.json();

      setIsLoading(false);
      setHistory([{ role: 'model', content: data.reply, questionNum: 1, day: data.dayCovered || 1 }]);
      if (data.dayCovered) setCoveredDays(prev => new Set(prev).add(data.dayCovered));
      speakText(data.reply);
    } catch (err) {
      console.error('Initialization failed:', err);
      setIsLoading(false);
      setHistory([{ role: 'model', content: 'SYSTEM ERROR: Unable to connect to FastAPI backend at localhost:5000.' }]);
    }
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading || isDone) return;
    stopAISpeech(); 
    const userMsg = inputText.trim(); setInputText("");
    
    const updatedHistory = [...history, { role: 'user', content: userMsg }];
    setHistory(updatedHistory); setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/interview`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionId, message: userMsg })
      });

      if (!response.ok) throw new Error(`Backend Error: ${response.status}`);
      const data = await response.json();

      setIsLoading(false);
      setHistory(prev => [...prev, { role: 'model', content: data.reply, day: data.dayCovered, questionNum: prev.filter(h => h.role === 'model').length + 1 }]);
      if (data.dayCovered) setCoveredDays(prev => new Set(prev).add(data.dayCovered));
      speakText(data.reply);

      if (data.done) {
        setIsDone(true);
        setFinalFeedback(data.feedback);
      }
    } catch (err) {
      console.error('Communication error:', err); setIsLoading(false);
    }
  };

  const handleOnboardingSubmit = (e) => {
    e?.preventDefault();
    const finalName = candidateForm.name.trim() || 'Aman Sharma';
    const finalId = candidateForm.id.trim() || 'CAND-' + Math.floor(1000 + Math.random() * 9000);
    const existing = candidatesList.find(c => c.member.id.toLowerCase() === finalId.toLowerCase());
    const candidateObj = existing || {
      member: { id: finalId, name: finalName, jobRole: candidateForm.jobRole, yearsExperience: 5 },
      rawProfile: rawCandidatesData.candidates[0]
    };
    setSelectedCandidate(candidateObj);
    setViewMode('dashboard');
    setActiveTab('home'); // Go to Dashboard Home instead of auto-starting
    setIsSidebarOpen(false);
  };

  const handleEndInterview = async () => {
    console.log('handleEndInterview invoked', { isLoading, isDone });
    if (isLoading || isDone) return;

    stopAISpeech();

    const terminationMsg = "I choose to terminate this interview early.";

    // append user's termination message and immediately mark session done
    setHistory(prev => [...prev, { role: 'user', content: terminationMsg }]);
    setIsLoading(true);

    // Immediate UX: mark as done, show toast and navigate to feedback so user lands on report
    setIsDone(true);
    setToastMessage('Interview ended — generating final evaluation...');
    setActiveTab('feedback');
    setIsSidebarOpen(false);
    // clear toast shortly after
    setTimeout(() => setToastMessage(null), 3800);

    try {
      const response = await fetch(`${API_BASE_URL}/api/interview`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sessionId, message: terminationMsg })
      });

      if (!response.ok) throw new Error(`Backend Error: ${response.status}`);
      const data = await response.json();

      setIsLoading(false);

      const aiClosureMessage = "The user has ended the interview. Processing your technical signals and generating your final evaluation result now...";

      setHistory(prev => [...prev, { role: 'model', content: aiClosureMessage, day: data.dayCovered }]);
      speakText(aiClosureMessage);

      // Update final feedback when backend returns it (may be async)
      setFinalFeedback(data.feedback || { summary: 'Final evaluation in progress.', overallScore: 0 });
    } catch (err) {
      console.error('Communication error:', err);
      setIsLoading(false);
      // Provide a graceful fallback feedback so the report page can render
      setFinalFeedback({ summary: 'Interview ended by user. Final evaluation unavailable due to server error.' });
    }
  };
  return (
    <div className={`min-h-screen overflow-x-hidden font-mono select-none transition-colors duration-300 ${theme === 'dark' ? 'bg-[#070A13] text-slate-200' : 'bg-slate-50 text-slate-800'}`}>
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50">
          <div className="px-4 py-2 bg-[#0A0E1A] border border-[#00F0FF] text-[#00F0FF] rounded shadow-lg text-sm font-mono">{toastMessage}</div>
        </div>
      )}
      
      {/* WELCOME PORTAL */}
      {viewMode === 'welcome' && (
        <div className={`min-h-screen overflow-x-hidden ${theme === 'dark' ? 'bg-[#070A13]' : 'bg-slate-50'}`}>
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-[0.12]' : 'opacity-[0.06]'}`} style={{ backgroundImage: theme === 'dark' ? 'linear-gradient(rgba(0,240,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.12) 1px, transparent 1px)' : 'linear-gradient(rgba(2,132,199,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(2,132,199,0.12) 1px, transparent 1px)', backgroundSize: '45px 45px' }} />
            <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[140px]" />
            <div className="absolute top-[700px] left-[-250px] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[130px]" />
          </div>

          <Navbar theme={theme} setTheme={setTheme} onLoginClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })} />
          
          <main className="relative z-10">
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-16 lg:pt-28">
              <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
                <div className="reveal-up">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/5 text-[#00F0FF] font-mono text-[9px] uppercase tracking-[0.18em] mb-7 badge-glow" style={{ animationDelay: '0.05s' }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> FASTAPI EVALUATION ENGINE ONLINE
                  </div>
                  <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.95] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <span className="hero-line block" style={{ animationDelay: '0.12s' }}>GO BEYOND</span>
                    <span className="hero-line block text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#38BDF8] to-[#A855F7] drop-shadow-[0_0_30px_rgba(0,240,255,0.25)]" style={{ animationDelay: '0.22s' }}>THE RESUME.</span>
                    <span className={`hero-line block mt-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`} style={{ animationDelay: '0.32s' }}>MEASURE ENGINEERING.</span>
                  </h1>
                  <p className="reveal-up mt-7 max-w-2xl text-sm lg:text-base leading-7 text-slate-400" style={{ animationDelay: '0.4s' }}>Neural Interface is an AI-powered technical evaluation platform designed to assess how candidates actually think, build, debug, and architect.</p>
                  
                  <div className="flex flex-wrap gap-5 mt-9 text-[9px] font-mono uppercase tracking-widest">
                    <div className="reveal-up flex items-center gap-2 text-emerald-400" style={{ animationDelay: '0.48s' }}><CheckCircle2 className="w-3.5 h-3.5" /> Session Engine Ready</div>
                    <div className="reveal-up flex items-center gap-2 text-cyan-400" style={{ animationDelay: '0.56s' }}><ShieldCheck className="w-3.5 h-3.5" /> Evaluation Grounded</div>
                    <div className="reveal-up flex items-center gap-2 text-purple-400" style={{ animationDelay: '0.64s' }}><Radio className="w-3.5 h-3.5 animate-pulse" /> AI Agent Online</div>
                  </div>
                </div>

                {/* TERMINAL PREVIEW */}
                <div className="relative reveal-up" style={{ animationDelay: '0.18s' }}>
                  <div className="absolute -inset-5 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl" />
                  <div className={`relative border rounded-2xl overflow-hidden shadow-2xl terminal-card ${theme === 'dark' ? 'bg-[#0A0E1A] border-[#1E293B]' : 'bg-white border-slate-200'}`}>
                    <div className={`px-5 py-4 border-b flex items-center justify-between ${theme === 'dark' ? 'bg-[#0D1322] border-[#1E293B]' : 'bg-slate-100 border-slate-200'}`}>
                      <div className="flex items-center gap-2"><Terminal className="w-4 h-4 text-[#00F0FF]" /><span className="text-[10px] font-mono font-bold tracking-widest text-slate-300">EVALUATION_ENGINE</span></div>
                      <div className="flex items-center gap-2 text-[9px] font-mono text-emerald-400"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />LIVE</div>
                    </div>
                    <div className="p-6 space-y-5 font-mono">
                      <div>
                        <div className="text-[9px] text-slate-500 mb-2">SYSTEM / INITIALIZE</div>
                        <div className="text-xs text-cyan-500">&gt; loading_candidate_profile...</div>
                        <div className="text-xs text-emerald-400 mt-1">✓ profile_context_loaded</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* METHODOLOGY SECTION */}
            <section id="methodology" className="max-w-7xl mx-auto px-6 lg:px-10 py-16 reveal-up" style={{ animationDelay: '0.12s' }}>
              <div className="grid md:grid-cols-3 gap-5">
                {[
                  { icon: Brain, number: '01', title: 'Adaptive Interviewing', text: 'Questions evolve according to the candidate profile and technical depth.' },
                  { icon: Activity, number: '02', title: 'Signal Extraction', text: 'Focuses on architecture, reasoning, implementation choices, and system thinking.' },
                  { icon: BarChart3, number: '03', title: 'Actionable Scorecard', text: 'Receive structured strengths, gaps, technical scores, and concrete next steps.' }
                ].map(({ icon: Icon, number, title, text }) => (
                  <div key={number} className={`group border rounded-xl p-6 transition-all card-rise ${theme === 'dark' ? 'bg-[#0A0E1A] border-[#1E293B] hover:border-[#00F0FF]/50' : 'bg-white border-slate-200 hover:border-cyan-500'}`} style={{ animationDelay: `${0.14 + (Number(number) - 1) * 0.08}s` }}>
                    <div className="flex justify-between items-start mb-8">
                      <div className={`w-11 h-11 rounded-lg border flex items-center justify-center ${theme === 'dark' ? 'bg-[#0D1322] border-[#1E293B]' : 'bg-cyan-50 border-cyan-200'}`}><Icon className="w-5 h-5 text-[#00F0FF]" /></div>
                      <span className="text-[10px] font-mono text-slate-500">{number}</span>
                    </div>
                    <h3 className={`text-lg font-black uppercase tracking-wide ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
                    <p className="mt-3 text-xs text-slate-500 leading-6">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="reveal-up" style={{ animationDelay: '0.18s' }}>
              <CandidateForm theme={theme} candidatesList={candidatesList} candidateForm={candidateForm} setCandidateForm={setCandidateForm} onSelectPreset={(c) => setCandidateForm({ name: c.member.name, id: c.member.id, jobRole: c.member.jobRole })} onSubmit={handleOnboardingSubmit} formRef={formRef} />
            </div>
          </main>
        </div>
      )}

      {/* DASHBOARD */}
      {viewMode === 'dashboard' && (
        <div className="flex h-screen w-full overflow-hidden">
          {isSidebarOpen && (
            <div className="fixed inset-0 z-30 bg-[#070A13]/70 backdrop-blur-sm lg:hidden" onClick={() => setIsSidebarOpen(false)} />
          )}

          <Sidebar
            theme={theme}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            setIsSettingsOpen={setIsSettingsOpen}
            setIsLogoutModalOpen={setIsLogoutModalOpen}
            isMobileOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          
          <main className={`flex-1 flex flex-col min-w-0 relative overflow-hidden ${theme === 'dark' ? 'bg-[#070A13]' : 'bg-slate-50'}`}>
            <header className={`border-b px-4 sm:px-8 py-3 flex flex-col gap-3 sm:h-16 sm:flex-row sm:items-center sm:justify-between z-10 ${theme === 'dark' ? 'border-[#1E293B] bg-[#0A0E1A]/80' : 'border-slate-200 bg-white/80'}`}>
              <div className="flex items-center justify-between gap-3 w-full sm:w-auto">
                <button onClick={() => setIsSidebarOpen(true)} className={`lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border ${theme === 'dark' ? 'bg-[#0D1322] border-[#1E293B] text-[#00F0FF]' : 'bg-slate-100 border-slate-300 text-cyan-700'}`}>
                  <Menu className="w-5 h-5" />
                </button>
                <h2 className={`text-sm sm:text-xl font-black uppercase leading-tight ${theme === 'dark' ? 'text-[#00F0FF]' : 'text-cyan-700'}`}>
                  MISSION CONTROL <span className="block sm:inline text-[10px] sm:text-xs font-mono text-slate-500">[{selectedCandidate.member.name}]</span>
                </h2>
              </div>
              <button onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')} className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border text-xs font-mono font-bold transition-all self-start sm:self-auto ${theme === 'dark' ? 'bg-[#0D1322] border-[#1E293B] text-amber-400' : 'bg-slate-100 border-slate-300 text-slate-700'}`}>
                {theme === 'dark' ? <><Sun className="w-4 h-4 text-amber-400" /><span>LIGHT THEME</span></> : <><Moon className="w-4 h-4 text-indigo-600" /><span>DARK THEME</span></>}
              </button>
            </header>

            {activeTab === 'home' && <DashboardHome theme={theme} selectedCandidate={selectedCandidate} setViewMode={setViewMode} setActiveTab={setActiveTab} onStartInterview={handleStartInterview} />}
            {activeTab === 'briefing' && <BriefingTab theme={theme} />}
            {activeTab === 'interview' && <InterviewAppComponent theme={theme} selectedCandidate={selectedCandidate} history={history} isLoading={isLoading} isDone={isDone} inputText={inputText} setInputText={setInputText} voiceEnabled={voiceEnabled} setVoiceEnabled={setVoiceEnabled} handleSendMessage={handleSendMessage} handleStartInterview={handleStartInterview} handleEndInterview={handleEndInterview} setActiveTab={setActiveTab} chatEndRef={chatEndRef} coveredDays={coveredDays} finalFeedback={finalFeedback} />}
            {activeTab === 'feedback' && <EvaluationReportComponent theme={theme} selectedCandidate={selectedCandidate} finalFeedback={finalFeedback} />}
          </main>
        </div>
      )}

      {/* MODALS */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-[#070A13]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0A0E1A] border border-[#00F0FF] rounded-lg w-full max-w-lg p-6 shadow-[0_0_30px_rgba(0,240,255,0.2)] space-y-6">
            <div className="flex justify-between items-center border-b border-[#1E293B] pb-4">
              <div className="flex items-center gap-2"><Settings className="w-5 h-5 text-[#00F0FF]" /><h3 className="font-bold text-lg text-white uppercase tracking-wider">SYSTEM SETTINGS</h3></div>
              <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-white p-1"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-slate-400 text-xs">Settings panel functionality reserved for future API overrides.</p>
            <div className="flex justify-end"><button onClick={() => setIsSettingsOpen(false)} className="px-5 py-2.5 bg-[#00F0FF] text-[#070A13] font-black text-xs uppercase tracking-widest rounded shadow-[0_0_15px_rgba(0,240,255,0.4)]">SAVE & CLOSE</button></div>
          </div>
        </div>
      )}

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#070A13]/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0A0E1A] border border-rose-500 rounded-lg w-full max-w-md p-6 shadow-[0_0_30px_rgba(244,63,94,0.3)] space-y-5 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-950 border border-rose-500 flex items-center justify-center mx-auto text-rose-400"><LogOut className="w-6 h-6" /></div>
            <div>
              <h3 className="font-black text-lg text-white uppercase tracking-widest mb-1">TERMINATE SESSION?</h3>
              <p className="text-xs text-slate-400 font-mono">Terminating session will return you to the Neural Interface welcome portal.</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setIsLogoutModalOpen(false)} className="flex-1 py-2.5 bg-[#0D1322] border border-[#1E293B] text-[#00F0FF] font-bold text-xs uppercase tracking-wider rounded">CANCEL</button>
              <button onClick={() => { setIsLogoutModalOpen(false); setViewMode('welcome'); }} className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-wider rounded shadow-[0_0_15px_rgba(244,63,94,0.4)]">LOGOUT NOW</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
