import React from 'react';
import { Brain, Code, BarChart3, Compass, FileText, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ theme, activeTab, setActiveTab, setIsSettingsOpen, setIsLogoutModalOpen }) {
  const getTabClass = (tabId) => `w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-all ${
    activeTab === tabId ? theme === 'dark' ? 'bg-[#131C2E] text-[#00F0FF] border-l-2 border-[#00F0FF]' : 'bg-cyan-50 text-cyan-700 border-l-2 border-cyan-600'
    : theme === 'dark' ? 'text-slate-400 hover:bg-[#111827]' : 'text-slate-600 hover:bg-slate-100'
  }`;

  return (
    <aside className={`w-64 border-r flex flex-col justify-between shrink-0 z-20 transition-colors ${theme === 'dark' ? 'border-[#1E293B] bg-[#0A0E1A]' : 'border-slate-200 bg-white'}`}>
      <div>
        <div className={`p-5 border-b flex items-center gap-3 ${theme === 'dark' ? 'border-[#1E293B]' : 'border-slate-200'}`}>
          <div className="relative">
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-[0_0_12px_rgba(0,240,255,0.4)] ${theme === 'dark' ? 'bg-[#111827] border-[#00F0FF]' : 'bg-cyan-50 border-cyan-500'}`}>
              <Brain className="w-5 h-5 text-[#00F0FF]" />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#0A0E1A] animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-widest text-[#A855F7] uppercase drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">NEURAL INTERFACE</h1>
            <div className="text-[10px] text-emerald-400 font-mono tracking-wider flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> STATUS: OPERATIONAL
            </div>
          </div>
        </div>
        <nav className="p-3 space-y-1 mt-2">
          <button onClick={() => setActiveTab('home')} className={getTabClass('home')}><Compass className="w-4 h-4 text-[#00F0FF]" /><span>Dashboard</span></button>
          <button onClick={() => setActiveTab('interview')} className={getTabClass('interview')}><Code className="w-4 h-4 text-purple-400" /><span>Give Interview</span></button>
          <button onClick={() => setActiveTab('feedback')} className={getTabClass('feedback')}><BarChart3 className="w-4 h-4 text-emerald-400" /><span>Take Feedback</span></button>
          <button onClick={() => setActiveTab('briefing')} className={getTabClass('briefing')}><FileText className="w-4 h-4 text-cyan-400" /><span>Briefing</span></button>
        </nav>
      </div>
      <div className={`p-4 border-t space-y-3 ${theme === 'dark' ? 'border-[#1E293B]' : 'border-slate-200'}`}>
        <button onClick={() => setActiveTab('interview')} className="w-full py-3 bg-[#00F0FF] hover:bg-[#38bdf8] text-[#070A13] font-black text-xs uppercase tracking-widest rounded transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]">
          START NEW SESSION
        </button>
        <div className="flex items-center justify-between text-slate-500 pt-2 px-1">
          <button onClick={() => setIsSettingsOpen(true)} className="flex items-center gap-1.5 text-xs hover:text-slate-300"><Settings className="w-3.5 h-3.5" /><span>Settings</span></button>
          <button onClick={() => setIsLogoutModalOpen(true)} className="flex items-center gap-1.5 text-xs hover:text-rose-400"><LogOut className="w-3.5 h-3.5" /><span>Logout</span></button>
        </div>
      </div>
    </aside>
  );
}