import React, { useEffect, useRef } from 'react';
import { FileText, Zap, Brain, TrendingUp, CheckCircle2 } from 'lucide-react';

function SkillRadarChart({ skills }) {
  const size = 260; const center = size / 2; const radius = 85; const numAxes = skills?.length || 5;
  const points = (skills || []).map((s, i) => {
    const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
    return `${center + ((s.val || 50) / 100) * radius * Math.cos(angle)},${center + ((s.val || 50) / 100) * radius * Math.sin(angle)}`;
  }).join(' ');

  return (
    <div className="flex flex-col items-center justify-center relative py-2">
      <svg width={size} height={size} className="overflow-visible">
        {[0.25, 0.5, 0.75, 1.0].map((lvl, idx) => (
          <polygon key={idx} points={(skills || []).map((_, i) => `${center + lvl * radius * Math.cos((Math.PI * 2 * i) / numAxes - Math.PI / 2)},${center + lvl * radius * Math.sin((Math.PI * 2 * i) / numAxes - Math.PI / 2)}`).join(' ')} fill="none" stroke="#1E293B" strokeWidth="1" strokeDasharray={idx < 3 ? "2,2" : "none"} />
        ))}
        {(skills || []).map((_, i) => <line key={i} x1={center} y1={center} x2={center + radius * Math.cos((Math.PI * 2 * i) / numAxes - Math.PI / 2)} y2={center + radius * Math.sin((Math.PI * 2 * i) / numAxes - Math.PI / 2)} stroke="#1E293B" strokeWidth="1" />)}
        <polygon points={points} fill="rgba(0, 240, 255, 0.25)" stroke="#00F0FF" strokeWidth="2" />
        {(skills || []).map((s, i) => {
          const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2;
          return (
            <g key={i}>
              <circle cx={center + ((s.val || 50) / 100) * radius * Math.cos(angle)} cy={center + ((s.val || 50) / 100) * radius * Math.sin(angle)} r="4" fill="#00F0FF" />
              <text x={center + (radius + 28) * Math.cos(angle)} y={center + (radius + 16) * Math.sin(angle)} textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="monospace">{s.axis} ({s.val}%)</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function EvaluationReportComponent({ theme, selectedCandidate, finalFeedback }) {
  const rootRef = useRef(null);

  useEffect(() => {
    // when the feedback tab mounts, scroll it into view for the user
    rootRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  const verdictText = finalFeedback?.verdict || "HIRE - READY FOR REVIEW";
  const summaryText = finalFeedback?.summary || "The candidate completed the AI Cohort evaluation session.";
  const strengths = finalFeedback?.strengths?.length > 0 ? finalFeedback.strengths : [{name: "General Competency", val: 85}];
  const nextActions = finalFeedback?.next?.length > 0 ? finalFeedback.next : ["Review evaluation scorecard post-completion."];
  const aggregateScore = finalFeedback?.overallScore ?? 8.5;

  return (
    <div ref={rootRef} className="flex-1 p-8 overflow-y-auto z-10 space-y-6">
      <div className={`flex justify-between items-start border-b pb-6 ${theme === 'dark' ? 'border-[#1E293B]' : 'border-slate-200'}`}>
        <div>
          <h2 className={`text-3xl font-black tracking-widest uppercase mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>CANDIDATE PERFORMANCE EVALUATION</h2>
          <p className="text-xs text-slate-400 font-mono">CANDIDATE: <span className="text-[#00F0FF] font-bold">{selectedCandidate.member.name}</span> ({selectedCandidate.member.id})</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">FINAL HIRING VERDICT</span>
          <div className="px-4 py-2 bg-[#060912] border border-[#00F0FF] text-[#00F0FF] font-bold text-xs uppercase rounded flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" /><span>{verdictText}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`md:col-span-2 border rounded-lg p-6 flex flex-col justify-between ${theme === 'dark' ? 'bg-[#0A0E1A] border-[#1E293B]' : 'bg-white border-slate-200'}`}>
          <div>
            <h3 className={`text-base font-bold flex items-center gap-2 mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}><FileText className="w-4 h-4 text-[#00F0FF]" /><span>Candidate Performance Summary</span></h3>
            <p className="text-xs text-slate-400 leading-relaxed font-mono mb-6">{summaryText}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#1E293B] pt-4 font-mono">
            <div className="bg-[#060912] p-3 rounded border border-[#1E293B]"><div className="text-[10px] text-slate-400 uppercase">OVERALL SCORE</div><div className="text-xl font-black text-[#00F0FF] mt-0.5">{aggregateScore}/10</div></div>
          </div>
        </div>

        <div className="bg-[#0A0E1A] border border-[#A855F7] rounded-lg p-6 flex flex-col justify-between shadow-[0_0_20px_rgba(168,85,247,0.25)]">
          <div>
            <h3 className="text-base font-bold text-[#A855F7] flex items-center gap-2 mb-4"><Zap className="w-4 h-4 fill-[#A855F7]" /><span>Actionable Next Steps</span></h3>
            <ul className="space-y-3 text-xs text-slate-300 font-mono mb-6 list-disc pl-4">
              {nextActions.map((step, idx) => <li key={idx}><span>{typeof step === 'string' ? step : JSON.stringify(step)}</span></li>)}
            </ul>
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-[#A855F7] to-[#00F0FF] text-[#070A13] font-black text-xs uppercase tracking-widest rounded shadow-lg">EXECUTE OFFER ACTION</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`border rounded-lg p-6 flex flex-col items-center justify-between ${theme === 'dark' ? 'bg-[#0A0E1A] border-[#1E293B]' : 'bg-white border-slate-200'}`}>
          <div className="w-full flex justify-between items-center mb-2">
            <h3 className={`text-sm font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}><Brain className="w-4 h-4 text-[#00F0FF]" /><span>Technical Competency Radar Chart</span></h3>
            <span className="text-[10px] text-[#00F0FF] font-mono bg-[#0D1322] px-2 py-0.5 rounded border border-[#00F0FF]/30">5-AXIS MATRIX</span>
          </div>
          <SkillRadarChart skills={(finalFeedback && finalFeedback.radarSkills) || [{ axis: "RAG", val: 88 }, { axis: "Agents", val: 85 }, { axis: "Architecture", val: 92 }, { axis: "Prompting", val: 80 }, { axis: "DevOps", val: 80 }]} />
        </div>

        <div className={`border rounded-lg p-6 space-y-6 ${theme === 'dark' ? 'bg-[#0A0E1A] border-[#1E293B]' : 'bg-white border-slate-200'}`}>
          <h3 className={`text-sm font-bold flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}><TrendingUp className="w-4 h-4 text-emerald-400" /><span>Evaluated Signal Strengths</span></h3>
          <div className="space-y-4">
            {strengths.map((st, i) => {
              const val = typeof st === 'object' && st !== null && 'val' in st ? st.val : 85;
              const label = typeof st === 'object' && st !== null ? (st.name || st.title || JSON.stringify(st)) : String(st);
              return (
                <div key={i}>
                  <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5"><span>{label}</span><span className="text-[#00F0FF] font-bold">{val}%</span></div>
                  <div className="h-2 w-full bg-[#060912] rounded p-0.5 border border-slate-800">
                    <div className="h-full bg-gradient-to-r from-[#00F0FF] to-emerald-400 rounded transition-all duration-500" style={{ width: `${val}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}