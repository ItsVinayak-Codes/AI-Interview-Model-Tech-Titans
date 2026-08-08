import React from 'react';
import { Brain, Code, BarChart3, Compass, FileText, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ theme, activeTab, setActiveTab, setIsSettingsOpen, setIsLogoutModalOpen, isMobileOpen, onClose }) {
  const getTabClass = (tabId) => `w-full flex items-center gap-3 px-4 py-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-all ${
    activeTab === tabId ? theme === 'dark' ? 'bg-[#131C2E] text-[#00F0FF] border-l-2 border-[#00F0FF]' : 'bg-cyan-50 text-cyan-700 border-l-2 border-cyan-600'
    : theme === 'dark' ? 'text-slate-400 hover:bg-[#111827]' : 'text-slate-600 hover:bg-slate-100'
  }`;

  return (
    <aside className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] border-r flex flex-col justify-between shrink-0 z-40 transition-transform duration-300 ease-out lg:static lg:w-64 lg:max-w-none lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${theme === 'dark' ? 'border-[#1E293B] bg-[#0A0E1A]' : 'border-slate-200 bg-white'}`}>
      <div>
        <div className={`p-5 border-b flex items-center justify-between gap-3 ${theme === 'dark' ? 'border-[#1E293B]' : 'border-slate-200'}`}>
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
          {onClose && (
            <button onClick={onClose} className="lg:hidden h-9 w-9 rounded-md border border-slate-700 text-slate-300 hover:text-white hover:border-[#00F0FF] transition-colors">
              ×
            </button>
          )}
        </div>
        <nav className="p-3 space-y-1 mt-2">
          <button onClick={() => { setActiveTab('home'); onClose?.(); }} className={getTabClass('home')}><Compass className="w-4 h-4 text-[#00F0FF]" /><span>Dashboard</span></button>
          <button onClick={() => { setActiveTab('interview'); onClose?.(); }} className={getTabClass('interview')}><Code className="w-4 h-4 text-purple-400" /><span>Give Interview</span></button>
          <button onClick={() => { setActiveTab('feedback'); onClose?.(); }} className={getTabClass('feedback')}><BarChart3 className="w-4 h-4 text-emerald-400" /><span>Take Feedback</span></button>
          <button onClick={() => { setActiveTab('briefing'); onClose?.(); }} className={getTabClass('briefing')}><FileText className="w-4 h-4 text-cyan-400" /><span>Briefing</span></button>
        </nav>
      </div>
      
      <div className={`p-4 border-t space-y-3 ${theme === 'dark' ? 'border-[#1E293B]' : 'border-slate-200'}`}>
        
        {/* CONDITIONAL BUTTON LOGIC: ONLY shows on feedback page and routes to interview */}
        {activeTab === 'feedback' && (
          <button 
            onClick={() => { setActiveTab('interview'); onClose?.(); }} 
            className="w-full py-3 bg-[#00F0FF] hover:bg-[#38bdf8] text-[#070A13] font-black text-xs uppercase tracking-widest rounded transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            BACK TO SESSION
          </button>
        )}

        <div className="flex items-center justify-between text-slate-500 pt-2 px-1">
          <button onClick={() => setIsSettingsOpen(true)} className="flex items-center gap-1.5 text-xs hover:text-slate-300"><Settings className="w-3.5 h-3.5" /><span>Settings</span></button>
          <button onClick={() => setIsLogoutModalOpen(true)} className="flex items-center gap-1.5 text-xs hover:text-rose-400"><LogOut className="w-3.5 h-3.5" /><span>Logout</span></button>
        </div>
      </div>
    </aside>
  );
}