import React from 'react';
import { UserCheck, ArrowRight } from 'lucide-react';

export default function CandidateForm({ theme, candidatesList, candidateForm, setCandidateForm, onSelectPreset, onSubmit, formRef }) {
  return (
    <section ref={formRef} className="relative max-w-5xl mx-auto px-6 py-24">
      <div className={`relative border rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#0A0E1A] border-[#00F0FF]/40' : 'bg-white border-cyan-400'
      }`}>
        <div className={`p-8 lg:p-10 border-b ${theme === 'dark' ? 'border-[#1E293B]' : 'border-slate-200'}`}>
          <div className="flex items-center gap-2 text-[#00F0FF] text-[9px] font-mono tracking-[0.2em] uppercase">
            <UserCheck className="w-4 h-4" /> Candidate Onboarding
          </div>
          <h2 className={`mt-3 text-2xl lg:text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            INITIALIZE YOUR <span className="text-[#00F0FF]">EVALUATION PROFILE.</span>
          </h2>
        </div>

        <form onSubmit={onSubmit} className="p-8 lg:p-10 space-y-7">
          <div>
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Preset Cohort Candidates</label>
            <div className="flex flex-wrap gap-2 mt-3">
              {candidatesList.map(c => (
                <button
                  key={c.member.id} type="button" onClick={() => onSelectPreset(c)}
                  className={`px-3 py-2 rounded-lg text-[9px] font-mono border transition-all ${
                    candidateForm.id === c.member.id ? 'bg-[#00F0FF] text-[#070A13] border-[#00F0FF] font-bold'
                    : theme === 'dark' ? 'bg-[#0D1322] border-[#1E293B] text-slate-400 hover:border-[#00F0FF]/50 hover:text-[#00F0FF]'
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
              <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
              <input required type="text" value={candidateForm.name} onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                placeholder="Enter candidate name" className={`w-full border rounded-lg p-3.5 text-xs font-mono focus:outline-none focus:border-[#00F0FF] ${theme === 'dark' ? 'bg-[#060912] border-[#1E293B] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'}`} />
            </div>
            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-2">Candidate ID</label>
              <input required type="text" value={candidateForm.id} onChange={(e) => setCandidateForm({ ...candidateForm, id: e.target.value })}
                placeholder="e.g. CAND-1042" className={`w-full border rounded-lg p-3.5 text-xs font-mono focus:outline-none focus:border-[#00F0FF] ${theme === 'dark' ? 'bg-[#060912] border-[#1E293B] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'}`} />
            </div>
          </div>
          <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#00F0FF] to-[#A855F7] text-[#070A13] font-black text-[10px] uppercase tracking-[0.18em] rounded-lg shadow-[0_0_30px_rgba(0,240,255,0.30)] hover:opacity-90 transition-all flex items-center justify-center gap-2">
            <span>Initialize Candidate Dashboard</span> <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}