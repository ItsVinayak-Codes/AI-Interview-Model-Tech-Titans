import React, { useEffect, useRef } from 'react';
import { FileText, Zap, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';

export default function EvaluationReportComponent({ theme, selectedCandidate, finalFeedback }) {
  const rootRef = useRef(null);

  useEffect(() => {
    // Scroll to top when the feedback tab mounts
    rootRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Check if we are waiting for the backend to return the data
  const isGenerating = !finalFeedback || finalFeedback.overallScore === undefined;

  // Parse exact backend schema (fallback to placeholders if loading)
  const summaryText = finalFeedback?.summary || "Compiling evaluation metrics...";
  const strengths = finalFeedback?.strengths?.length > 0 ? finalFeedback.strengths : ["Processing signals..."];
  const gaps = finalFeedback?.gaps?.length > 0 ? finalFeedback.gaps : ["Processing signals..."];
  const nextActions = finalFeedback?.next?.length > 0 ? finalFeedback.next : ["Processing signals..."];
  const aggregateScore = finalFeedback?.overallScore ?? "--";

  return (
    // Added 'relative' to the parent container to trap the absolute loading overlay
    <div ref={rootRef} className="relative flex-1 px-4 sm:px-8 py-6 overflow-y-auto z-10 min-h-[600px]">
      
      {/* LOADING OVERLAY - Centered with background blur */}
      {isGenerating && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#070A13]/40 backdrop-blur-md rounded-lg">
          <Loader2 className="w-16 h-16 text-[#00F0FF] animate-spin mb-6" />
          <h2 className="text-2xl font-black tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(0,240,255,0.8)] mb-2">
            Generating Scorecard
          </h2>
          <p className="text-xs text-[#00F0FF] font-mono uppercase tracking-widest animate-pulse">
            Analyzing interview transcript...
          </p>
        </div>
      )}

      {/* MAIN CONTENT - Dims slightly when loading overlay is active */}
      <div className={`space-y-6 transition-opacity duration-700 ${isGenerating ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
        
        {/* HEADER SECTION (Verdict section removed completely) */}
        <div className={`border-b pb-6 ${theme === 'dark' ? 'border-[#1E293B]' : 'border-slate-200'}`}>
          <div className="min-w-0">
            <h2 className={`text-2xl sm:text-3xl font-black tracking-widest uppercase mb-1 break-words ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              CANDIDATE PERFORMANCE EVALUATION
            </h2>
            <p className="text-xs text-slate-400 font-mono break-words">
              CANDIDATE: <span className="text-[#00F0FF] font-bold">{selectedCandidate.member.name}</span> ({selectedCandidate.member.id})
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className={`md:col-span-2 border rounded-lg p-5 sm:p-6 flex flex-col justify-between ${theme === 'dark' ? 'bg-[#0A0E1A] border-[#1E293B]' : 'bg-white border-slate-200'}`}>
            <div>
              <h3 className={`text-base font-bold flex items-center gap-2 mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                <FileText className="w-4 h-4 text-[#00F0FF]" /><span>Candidate Performance Summary</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-mono mb-6">{summaryText}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#1E293B] pt-4 font-mono">
              <div className="bg-[#060912] p-3 rounded border border-[#1E293B]">
                <div className="text-[10px] text-slate-400 uppercase">OVERALL SCORE</div>
                <div className="text-xl font-black text-[#00F0FF] mt-0.5">{aggregateScore}{!isGenerating && '/10'}</div>
              </div>
            </div>
          </div>

          <div className="bg-[#0A0E1A] border border-[#A855F7] rounded-lg p-5 sm:p-6 flex flex-col shadow-[0_0_20px_rgba(168,85,247,0.25)]">
            <h3 className="text-base font-bold text-[#A855F7] flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 fill-[#A855F7]" /><span>Actionable Next Steps</span>
            </h3>
            <ul className="space-y-3 text-xs text-slate-300 font-mono list-disc pl-4">
              {nextActions.map((step, idx) => (
                <li key={idx}><span>{step}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pb-8">
          <div className={`border rounded-lg p-5 sm:p-6 space-y-4 ${theme === 'dark' ? 'bg-[#0A0E1A] border-rose-900/50' : 'bg-rose-50 border-rose-200'}`}>
            <h3 className={`text-sm font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-rose-400' : 'text-rose-600'}`}>
              <AlertCircle className="w-4 h-4" /><span>Identified Signal Gaps</span>
            </h3>
            <ul className={`space-y-3 text-xs font-mono list-disc pl-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {gaps.map((gap, i) => (
                <li key={i}><span>{gap}</span></li>
              ))}
            </ul>
          </div>

          <div className={`border rounded-lg p-5 sm:p-6 space-y-4 ${theme === 'dark' ? 'bg-[#0A0E1A] border-emerald-900/50' : 'bg-emerald-50 border-emerald-200'}`}>
            <h3 className={`text-sm font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
              <TrendingUp className="w-4 h-4" /><span>Evaluated Signal Strengths</span>
            </h3>
            <ul className={`space-y-3 text-xs font-mono list-disc pl-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {strengths.map((st, i) => (
                <li key={i}><span>{st}</span></li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}