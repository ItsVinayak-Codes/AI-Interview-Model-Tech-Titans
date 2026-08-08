import React, { useState, useEffect } from 'react';
import { UserCheck, ArrowRight } from 'lucide-react';

export default function CandidateForm({ theme, candidatesList, candidateForm, setCandidateForm, onSelectPreset, onSubmit, formRef }) {
  // State to trigger the entry animations when the component loads
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Slight delay to ensure the DOM is ready before triggering the CSS transition
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={formRef} className="relative max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      
      {/* INJECTED STYLES FOR CONTINUOUS TEXT ANIMATION */}
      <style>
        {`
          @keyframes bg-pan {
            0% { background-position: 0% center; }
            100% { background-position: -200% center; }
          }
          .animate-bg-pan {
            background-size: 200% auto;
            animation: bg-pan 4s linear infinite;
          }
        `}
      </style>

      {/* MAIN CONTAINER: Slides up and fades in on load */}
      <div className={`relative border rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 transform ${
        isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,240,255,0.15)] ${
        theme === 'dark' ? 'bg-[#0A0E1A] border-[#00F0FF]/40' : 'bg-white border-cyan-400'
      }`}>
        
        {/* HEADER SECTION: Staggered delay for its entry transition */}
        <div className={`p-5 sm:p-8 lg:p-10 border-b transition-all duration-1000 delay-300 transform ${
          isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        } ${theme === 'dark' ? 'border-[#1E293B]' : 'border-slate-200'}`}>
          
          {/* Continuous pulse on the sub-heading */}
          <div className="flex items-center gap-2 text-[#00F0FF] text-[9px] font-mono tracking-[0.2em] uppercase animate-pulse">
            <UserCheck className="w-4 h-4" /> Candidate Onboarding
          </div>
          
          {/* CONTINUOUS GRADIENT FLOW ON THE MAIN HEADING */}
          <h2 className={`mt-3 text-xl sm:text-2xl lg:text-3xl font-black leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            INITIALIZE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#A855F7] to-[#00F0FF] animate-bg-pan">EVALUATION PROFILE.</span>
          </h2>
        </div>

        {/* FORM SECTION: Staggered delay 500ms so it loads after the header */}
        <form onSubmit={onSubmit} className={`p-5 sm:p-8 lg:p-10 space-y-6 sm:space-y-7 transition-all duration-1000 delay-500 transform ${
          isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div>
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Preset Cohort Candidates</label>
            <div className="flex flex-wrap gap-2 mt-3">
              {candidatesList.map(c => (
                <button
                  key={c.member.id} type="button" onClick={() => onSelectPreset(c)}
                  className={`px-3 py-2 rounded-lg text-[9px] font-mono border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                    candidateForm.id === c.member.id ? 'bg-[#00F0FF] text-[#070A13] border-[#00F0FF] font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : theme === 'dark' ? 'bg-[#0D1322] border-[#1E293B] text-slate-400 hover:border-[#00F0FF]/50 hover:text-[#00F0FF]'
                    : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-cyan-500'
                  }`}
                >
                  {c.member.name}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
              <input required type="text" value={candidateForm.name} onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                placeholder="Enter candidate name" 
                className={`w-full border rounded-lg p-3 text-xs font-mono transition-all duration-300 focus:outline-none focus:border-[#00F0FF] focus:-translate-y-0.5 focus:shadow-[0_5px_15px_rgba(0,240,255,0.1)] ${theme === 'dark' ? 'bg-[#060912] border-[#1E293B] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'}`} />
            </div>
            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Candidate ID</label>
              <input required type="text" value={candidateForm.id} onChange={(e) => setCandidateForm({ ...candidateForm, id: e.target.value })}
                placeholder="e.g. CAND-1042" 
                className={`w-full border rounded-lg p-3 text-xs font-mono transition-all duration-300 focus:outline-none focus:border-[#00F0FF] focus:-translate-y-0.5 focus:shadow-[0_5px_15px_rgba(0,240,255,0.1)] ${theme === 'dark' ? 'bg-[#060912] border-[#1E293B] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'}`} />
            </div>
          </div>
          
          <button type="submit" className="group w-full py-4 bg-gradient-to-r from-[#00F0FF] to-[#A855F7] text-[#070A13] font-black text-[10px] uppercase tracking-[0.18em] rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.30)] hover:opacity-90 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2">
            <span>Initialize Candidate Dashboard</span> 
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </form>
      </div>
    </section>
  );
}