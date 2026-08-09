import React from 'react';
import { Volume2, VolumeX, ShieldAlert, Brain, User, Send, Award, Activity } from 'lucide-react';

export default function InterviewAppComponent({
  theme, selectedCandidate, history, isLoading, isDone, inputText, setInputText,
  voiceEnabled, setVoiceEnabled, handleSendMessage, handleStartInterview, handleEndInterview, setActiveTab, chatEndRef, coveredDays, finalFeedback
}) {
  const isInterviewStarted = history.length > 0 || isLoading;

  return (
    <div className="flex-1 flex flex-col lg:flex-row overflow-hidden z-10">
      <div className="flex-1 flex flex-col min-w-0 border-r border-[#1E293B] relative">
        
        {/* STICKY HEADER: Pinned to the top so 'End Interview' is always visible */}
        <div className={`sticky top-0 z-20 p-3 border-b flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs px-4 sm:px-6 backdrop-blur-md ${
          theme === 'dark' ? 'bg-[#0A0E1A]/90 border-[#1E293B]' : 'bg-white/90 border-slate-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <div><span className="text-slate-400 uppercase">Candidate: </span><span className="font-bold text-[#00F0FF] break-words">{selectedCandidate.member.name}</span></div>
            <div><span className="text-slate-400 uppercase">Questions: </span><span className="font-bold text-amber-400">{history.filter(h => h.role === 'model').length} / 8+</span></div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button onClick={() => setVoiceEnabled(!voiceEnabled)} className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono transition-all ${voiceEnabled ? 'bg-[#00F0FF] text-[#070A13] font-bold' : 'bg-[#0D1322] border border-[#1E293B] text-slate-400'}`}>
              {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />} <span>VOICE MODE</span>
            </button>
            
            <button 
              onClick={handleEndInterview} 
              disabled={!isInterviewStarted || isLoading || isDone}
              className="flex items-center gap-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white rounded text-xs font-bold transition-all shadow-[0_0_10px_rgba(225,29,72,0.4)]"
            >
              <ShieldAlert className="w-3.5 h-3.5" /> <span>END INTERVIEW</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
          {!isInterviewStarted ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 sm:p-8">
              <Brain className="w-12 h-12 text-[#00F0FF] animate-pulse mb-4" />
              <h3 className={`text-lg font-black uppercase tracking-wider mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>NEURAL TERMINAL READY</h3>
              <p className="text-xs text-slate-400 max-w-md mb-6">Deploying AI Lead Interviewer for candidate <span className="text-[#00F0FF]">{selectedCandidate.member.name}</span>.</p>
              <button onClick={() => handleStartInterview(selectedCandidate)} className="px-6 py-3 bg-[#00F0FF] text-[#070A13] font-black rounded uppercase tracking-widest text-xs transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                INITIALIZE LINK
              </button>
            </div>
          ) : (
            <>
              {history.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && <div className="w-8 h-8 rounded bg-[#111827] border border-[#00F0FF] flex items-center justify-center text-[#00F0FF] shrink-0 mt-1"><Brain className="w-4 h-4" /></div>}
                  <div className={`max-w-[88%] sm:max-w-[80%] rounded p-4 text-xs leading-relaxed ${msg.role === 'user' ? 'bg-[#131C2E] border border-purple-500/40 text-purple-200' : theme === 'dark' ? 'bg-[#0A0E1A] border border-[#1E293B] text-slate-200' : 'bg-slate-100 text-slate-800'}`}>
                    {msg.role === 'model' && (
                      <div className="flex items-center justify-between mb-2 pb-1 border-b border-[#1E293B] text-[10px] text-[#00F0FF] font-mono">
                        <span>INTERVIEWER TURN #{msg.questionNum || Math.floor(idx/2)+1}</span>
                        {msg.day && <span className="bg-[#111827] px-2 py-0.5 rounded border border-slate-800">Day {msg.day} Topic</span>}
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  {msg.role === 'user' && <div className="w-8 h-8 rounded bg-purple-950 border border-purple-500 flex items-center justify-center text-purple-300 shrink-0 mt-1"><User className="w-4 h-4" /></div>}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 items-center text-xs text-[#00F0FF] bg-[#0A0E1A] p-3 rounded border border-[#1E293B] w-fit">
                  <Brain className="w-4 h-4 animate-spin" /> <span>Processing candidate response signal...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </>
          )}
        </div>

        <form onSubmit={handleSendMessage} className={`p-3 sm:p-4 border-t ${theme === 'dark' ? 'border-[#1E293B] bg-[#0A0E1A]' : 'border-slate-200 bg-white'}`}>
          <div className="relative flex items-center">
            <input type="text" placeholder="ENTER_CANDIDATE_RESPONSE..." disabled={!isInterviewStarted || isLoading || isDone} value={inputText} onChange={(e) => setInputText(e.target.value)}
              className={`w-full border rounded py-3.5 pl-4 pr-12 text-xs font-mono focus:outline-none focus:border-[#00F0FF] ${theme === 'dark' ? 'bg-[#060912] border-[#1E293B] text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'}`} />
            <button type="submit" disabled={!inputText.trim() || isLoading || isDone} className="absolute right-2 p-2 bg-[#00F0FF] text-[#070A13] hover:bg-[#38bdf8] disabled:opacity-40 rounded transition-all">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      <div className={`w-full lg:w-80 border-l p-4 sm:p-6 space-y-5 sm:space-y-6 overflow-y-auto ${theme === 'dark' ? 'bg-[#0A0E1A]/60 border-[#1E293B]' : 'bg-slate-50 border-slate-200'}`}>
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2"><Activity className="w-4 h-4 text-[#00F0FF]" /><span>NEURAL TRACKER</span></h3>
        <div className={`border rounded p-4 space-y-3 ${theme === 'dark' ? 'bg-[#060912] border-[#1E293B]' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Days Assessed</span><span className="text-[#00F0FF] font-mono">{coveredDays.size} / 4+</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {Array.from(coveredDays).map(d => <span key={d} className="px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-mono rounded">Day {d}</span>)}
            {coveredDays.size === 0 && <span className="text-[10px] text-slate-500">No coverage logged yet</span>}
          </div>
        </div>
        {isDone && (
          <div className="bg-gradient-to-b from-purple-950/40 to-[#0A0E1A] border border-purple-500/50 rounded p-4 space-y-3">
            <div className="flex items-center gap-2 text-[#00F0FF] font-bold text-xs uppercase"><Award className="w-4 h-4" /><span>REPORT READY</span></div>
            <p className="text-xs text-slate-300 italic">"Session successfully concluded."</p>
            <button onClick={() => setActiveTab('feedback')} className="w-full py-2 bg-purple-600 text-white font-bold text-xs rounded uppercase tracking-wider">VIEW FULL EVALUATION</button>
          </div>
        )}
      </div>
    </div>
  );
}