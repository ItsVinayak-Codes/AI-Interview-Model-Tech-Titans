import React from 'react';
import { Code, BarChart3, ArrowRight, ChevronRight, FileText, ShieldAlert } from 'lucide-react';
import curriculumRawData from '../data/curriculum.json';

export function DashboardHome({ theme, selectedCandidate, setViewMode, setActiveTab, onStartInterview }) {
  return (
    <div className="flex-1 px-4 sm:px-8 py-6 overflow-y-auto z-10 space-y-6">
      
      {/* 1. ORIGINAL HEADER SECTION (UNCHANGED) */}
      <div className={`flex flex-col gap-4 md:flex-row md:justify-between md:items-start border-b pb-6 ${theme === 'dark' ? 'border-[#1E293B]' : 'border-slate-200'}`}>
        <div className="min-w-0">
          <h2 className={`text-2xl sm:text-3xl font-black tracking-widest uppercase mb-1 break-words ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            WELCOME BACK, {selectedCandidate.member.name.toUpperCase()}
          </h2>
          <p className="text-xs font-mono text-slate-400 break-words">
            CANDIDATE ID: <span className="text-[#00F0FF]">{selectedCandidate.member.id}</span> | ROLE: <span className="text-slate-300">{selectedCandidate.member.jobRole}</span>
          </p>
        </div>
        <button onClick={() => setViewMode('welcome')} className={`w-full md:w-auto px-3 py-2 border rounded text-xs transition-all ${theme === 'dark' ? 'bg-[#0D1322] border-[#1E293B] text-slate-300 hover:border-[#00F0FF]' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
          ← SWITCH CANDIDATE
        </button>
      </div>

      {/* 2. NEW INSTRUCTIONS SECTION */}
      <div className={`border rounded-lg p-6 space-y-5 ${theme === 'dark' ? 'bg-[#0A0E1A] border-[#1E293B]' : 'bg-white border-slate-200'}`}>
        <div className={`flex flex-col sm:flex-row sm:items-center gap-3 border-b pb-4 ${theme === 'dark' ? 'border-[#1E293B]' : 'border-slate-200'}`}>
          <div className="w-10 h-10 rounded bg-[#111827] border border-[#00F0FF] flex items-center justify-center text-[#00F0FF]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base sm:text-lg font-bold tracking-widest uppercase ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              EVALUATION PROTOCOL & INSTRUCTIONS
            </h3>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">READ BEFORE INITIALIZING TERMINAL LINK</p>
          </div>
        </div>
        
        <div className={`space-y-4 text-xs font-mono ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          <p className="leading-relaxed">
            The Neural Interface will deploy an AI Lead Interviewer configured specifically to your completed curriculum milestones. 
            Your technical depth, architectural reasoning, and problem-solving skills will be evaluated in real-time.
          </p>
          
          <ul className="space-y-3 pt-2">
            <li className="flex items-start gap-3">
              <span className="text-[#00F0FF] font-black shrink-0">01</span>
              <span><strong>Progressive Pacing:</strong> The agent will start with foundational questions and gradually escalate to complex, scenario-based problems.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00F0FF] font-black shrink-0">02</span>
              <span><strong>Detailed Responses:</strong> Provide specific, technical answers. The agent is trained to probe for edge cases if your response is too shallow.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#00F0FF] font-black shrink-0">03</span>
              <span><strong>Session Length:</strong> A standard evaluation requires a minimum of 8 interactions to generate a high-confidence signal.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-rose-500 shrink-0"><ShieldAlert className="w-4 h-4" /></span>
              <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}><strong>Manual Override:</strong> You may click the red "END INTERVIEW" button inside the terminal at any time to conclude the session early and generate your final evaluation report.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. ORIGINAL GRID SECTION (UNCHANGED) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className={`border-2 rounded-xl p-5 sm:p-6 transition-all flex flex-col justify-between space-y-5 sm:space-y-6 ${theme === 'dark' ? 'bg-[#0A0E1A] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.2)]' : 'bg-white border-cyan-500 shadow-md'}`}>
          <div>
            <div className="w-12 h-12 rounded bg-cyan-950/30 border border-[#00F0FF] flex items-center justify-center text-[#00F0FF] mb-4"><Code className="w-6 h-6" /></div>
            <h3 className={`text-lg sm:text-xl font-bold uppercase tracking-wider mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>1. GIVE TECHNICAL INTERVIEW</h3>
            <p className="text-xs text-slate-400 font-mono leading-relaxed">Start your multi-turn technical evaluation session. The AI lead interviewer will ask questions based on your 31-day AI Cohort journey.</p>
          </div>
          <button onClick={() => onStartInterview(selectedCandidate)} className="w-full py-3.5 bg-[#00F0FF] hover:bg-[#38bdf8] text-[#070A13] font-black text-xs uppercase tracking-widest rounded shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2">
            <span>LAUNCH INTERVIEW TERMINAL</span><ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className={`border-2 rounded-xl p-5 sm:p-6 transition-all flex flex-col justify-between space-y-5 sm:space-y-6 ${theme === 'dark' ? 'bg-[#0A0E1A] border-[#A855F7] shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'bg-white border-purple-500 shadow-md'}`}>
          <div>
            <div className="w-12 h-12 rounded bg-purple-950/30 border border-[#A855F7] flex items-center justify-center text-[#A855F7] mb-4"><BarChart3 className="w-6 h-6" /></div>
            <h3 className={`text-lg sm:text-xl font-bold uppercase tracking-wider mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>2. TAKE & VIEW FEEDBACK</h3>
            <p className="text-xs text-slate-400 font-mono leading-relaxed">Review your post-interview evaluation report, hiring verdicts, technical scores, signal strengths, gaps, and recommended next steps.</p>
          </div>
          <button onClick={() => setActiveTab('feedback')} className="w-full py-3.5 bg-gradient-to-r from-[#A855F7] to-[#00F0FF] text-white font-black text-xs uppercase tracking-widest rounded shadow-[0_0_15px_rgba(168,85,247,0.4)] flex items-center justify-center gap-2">
            <span>VIEW EVALUATION REPORT</span><ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function BriefingTab({ theme }) {
  return (
    <div className="flex-1 px-4 sm:px-8 py-6 overflow-y-auto z-10 space-y-6">
      <div>
        <h2 className={`text-2xl sm:text-3xl font-black tracking-widest uppercase mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>MISSION BRIEFING</h2>
        <p className="text-xs text-slate-400 font-mono">ABTALKS AI COHORT · 31 DAYS · 8 MODULES</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {curriculumRawData.days?.map((d) => (
          <div key={d.day} className={`p-4 rounded border text-xs space-y-2 ${theme === 'dark' ? 'bg-[#0A0E1A] border-[#1E293B]' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-[#00F0FF] font-bold">DAY {d.day}: {d.title}</span>
              <span className="px-2 py-0.5 bg-[#111827] text-[10px] text-slate-300 rounded">{d.type || "MODULE"}</span>
            </div>
            <div className="flex flex-wrap gap-1 pt-1">
              {(d.tools || []).map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-slate-800 text-[10px] text-indigo-300 rounded font-mono">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}