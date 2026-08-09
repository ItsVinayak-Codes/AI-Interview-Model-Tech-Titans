import React from 'react';
import { ShieldCheck, Target, AlertTriangle, ArrowUpCircle, BrainCircuit } from 'lucide-react';

export default function EvaluationReportComponent({ theme, selectedCandidate, finalFeedback }) {
  // Check if we are still waiting for the backend to generate the full report
  const isGenerating = !finalFeedback || !finalFeedback.overallScore;

  return (
    <div className="flex-1 p-8 overflow-y-auto z-10 space-y-6">
      <div className={`border-b pb-6 ${theme === 'dark' ? 'border-[#1E293B]' : 'border-slate-200'}`}>
        <div className="flex items-center gap-2 text-[#A855F7] text-[9px] font-mono tracking-[0.2em] uppercase mb-2">
          <ShieldCheck className="w-4 h-4" /> Final Evaluation Protocol
        </div>
        <h2 className={`text-3xl font-black tracking-widest uppercase mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          CANDIDATE SCORECARD
        </h2>
        <p className="text-xs font-mono text-slate-400">
          CANDIDATE ID: <span className="text-[#00F0FF]">{selectedCandidate.member.id}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* SCORE DISPLAY */}
        <div className={`col-span-1 border rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all ${
          theme === 'dark' ? 'bg-[#0A0E1A] border-[#00F0FF]/30' : 'bg-white border-cyan-300 shadow-sm'
        }`}>
          <BrainCircuit className={`w-8 h-8 mb-4 ${isGenerating ? 'text-slate-500 animate-pulse' : 'text-[#00F0FF]'}`} />
          <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase mb-2">Overall Technical Rating</div>
          
          {/* DYNAMIC SCORE LOGIC: Shows --/10 while loading, then actual score */}
          <div className={`text-6xl font-black tracking-tighter ${
             isGenerating 
               ? 'text-slate-500 animate-pulse' 
               : theme === 'dark' ? 'text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]' : 'text-cyan-600'
          }`}>
            {isGenerating ? '--' : finalFeedback.overallScore}
            <span className={`text-2xl font-bold ml-1 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-300'}`}>/10</span>
          </div>
          
          <div className={`mt-4 px-3 py-1 text-[9px] font-bold tracking-widest uppercase border rounded ${
            isGenerating 
              ? 'bg-slate-800 text-slate-400 border-slate-700 animate-pulse'
              : 'bg-emerald-950/30 text-emerald-400 border-emerald-500/50'
          }`}>
            {isGenerating ? 'ANALYZING SIGNALS...' : finalFeedback.verdict || 'EVALUATION COMPLETE'}
          </div>
        </div>

        {/* SUMMARY SECTION */}
        <div className={`col-span-1 md:col-span-2 border rounded-xl p-6 ${
          theme === 'dark' ? 'bg-[#0A0E1A] border-[#1E293B]' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            <Target className="w-4 h-4 text-[#A855F7]" /> Executive Summary
          </h3>
          {isGenerating ? (
            <div className="space-y-2">
              <div className="h-3 w-full bg-slate-800 rounded animate-pulse"></div>
              <div className="h-3 w-5/6 bg-slate-800 rounded animate-pulse"></div>
              <div className="h-3 w-4/6 bg-slate-800 rounded animate-pulse"></div>
            </div>
          ) : (
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {finalFeedback.summary}
            </p>
          )}
        </div>
      </div>

      {/* STRENGTHS & GAPS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
        <div className={`border rounded-xl p-6 ${theme === 'dark' ? 'bg-[#0A0E1A] border-emerald-900/30' : 'bg-emerald-50/50 border-emerald-200'}`}>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-4 flex items-center gap-2">
            <ArrowUpCircle className="w-4 h-4" /> Validated Strengths
          </h3>
          <ul className="space-y-3">
            {isGenerating ? (
              <div className="h-10 w-full bg-slate-800 rounded animate-pulse"></div>
            ) : (
              finalFeedback.strengths?.map((strength, idx) => (
                <li key={idx} className={`text-xs p-3 rounded border ${theme === 'dark' ? 'bg-[#060912] border-emerald-900/50 text-slate-300' : 'bg-white border-emerald-100 text-slate-700'}`}>
                  {strength}
                </li>
              ))
            )}
          </ul>
        </div>

        <div className={`border rounded-xl p-6 ${theme === 'dark' ? 'bg-[#0A0E1A] border-rose-900/30' : 'bg-rose-50/50 border-rose-200'}`}>
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-rose-500 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Identified Gaps
          </h3>
          <ul className="space-y-3">
            {isGenerating ? (
               <div className="h-10 w-full bg-slate-800 rounded animate-pulse"></div>
            ) : (
              finalFeedback.gaps?.map((gap, idx) => (
                <li key={idx} className={`text-xs p-3 rounded border ${theme === 'dark' ? 'bg-[#060912] border-rose-900/50 text-slate-300' : 'bg-white border-rose-100 text-slate-700'}`}>
                  {gap}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}