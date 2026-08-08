import React from 'react';
import { Code, BarChart3, ArrowRight, ChevronRight } from 'lucide-react';
import curriculumRawData from '../data/curriculum.json';

export function DashboardHome({ theme, selectedCandidate, setViewMode, setActiveTab, onStartInterview }) {
  return (
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
        <button onClick={() => setViewMode('welcome')} className={`px-3 py-1.5 border rounded text-xs transition-all ${theme === 'dark' ? 'bg-[#0D1322] border-[#1E293B] text-slate-300 hover:border-[#00F0FF]' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
          ← SWITCH CANDIDATE
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`border-2 rounded-xl p-6 transition-all flex flex-col justify-between space-y-6 ${theme === 'dark' ? 'bg-[#0A0E1A] border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.2)]' : 'bg-white border-cyan-500 shadow-md'}`}>
          <div>
            <div className="w-12 h-12 rounded bg-cyan-950/30 border border-[#00F0FF] flex items-center justify-center text-[#00F0FF] mb-4"><Code className="w-6 h-6" /></div>
            <h3 className={`text-xl font-bold uppercase tracking-wider mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>1. GIVE TECHNICAL INTERVIEW</h3>
            <p className="text-xs text-slate-400 font-mono leading-relaxed">Start your multi-turn technical evaluation session. The AI lead interviewer will ask questions based on your 31-day AI Cohort journey.</p>
          </div>
          <button onClick={() => onStartInterview(selectedCandidate)} className="w-full py-3.5 bg-[#00F0FF] hover:bg-[#38bdf8] text-[#070A13] font-black text-xs uppercase tracking-widest rounded shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2">
            <span>LAUNCH INTERVIEW TERMINAL</span><ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className={`border-2 rounded-xl p-6 transition-all flex flex-col justify-between space-y-6 ${theme === 'dark' ? 'bg-[#0A0E1A] border-[#A855F7] shadow-[0_0_20px_rgba(168,85,247,0.2)]' : 'bg-white border-purple-500 shadow-md'}`}>
          <div>
            <div className="w-12 h-12 rounded bg-purple-950/30 border border-[#A855F7] flex items-center justify-center text-[#A855F7] mb-4"><BarChart3 className="w-6 h-6" /></div>
            <h3 className={`text-xl font-bold uppercase tracking-wider mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>2. TAKE & VIEW FEEDBACK</h3>
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
    <div className="flex-1 p-8 overflow-y-auto z-10 space-y-6">
      <div>
        <h2 className={`text-3xl font-black tracking-widest uppercase mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>MISSION BRIEFING</h2>
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