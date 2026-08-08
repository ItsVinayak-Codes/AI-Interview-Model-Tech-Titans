import React from 'react';
import { Brain, Sun, Moon, ChevronRight } from 'lucide-react';

export default function Navbar({ theme, setTheme, onLoginClick }) {
  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-xl transition-colors duration-300 ${
      theme === 'dark' ? 'border-[#1E293B] bg-[#070A13]/90' : 'border-slate-200 bg-white/90'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-0 min-h-16 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        
        {/* LOGO & BRANDING */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shadow-lg ${
              theme === 'dark' ? 'bg-[#0D1322] border-[#00F0FF]/60 shadow-[0_0_20px_rgba(0,240,255,0.18)]' : 'bg-cyan-50 border-cyan-500 shadow-sm'
            }`}>
              <Brain className="w-5 h-5 text-[#00F0FF]" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#070A13] animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`font-black tracking-[0.22em] text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                NEURAL INTERFACE
              </span>
              <span className="text-[8px] px-1.5 py-0.5 rounded border border-purple-500/40 bg-purple-500/10 text-purple-300 font-mono">
                v3.8
              </span>
            </div>
            <div className="text-[9px] text-emerald-400 font-mono tracking-wider">
              ABTALKS AI EVALUATION PLATFORM
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS (Theme Toggle & Login) */}
        <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-auto">
          <button
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono font-bold transition-all ${
              theme === 'dark' ? 'bg-[#0D1322] border-[#1E293B] text-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.2)]' : 'bg-slate-100 border-slate-300 text-slate-700 shadow-sm'
            }`}
          >
            {theme === 'dark' ? <><Sun className="w-4 h-4 text-amber-400 animate-pulse" /><span className="hidden sm:inline">LIGHT</span></> : <><Moon className="w-4 h-4 text-indigo-600" /><span className="hidden sm:inline">DARK</span></>}
          </button>
          
          <button
            onClick={onLoginClick}
            className="px-3 sm:px-4 py-2.5 bg-[#00F0FF] hover:bg-cyan-300 text-[#070A13] font-black text-[10px] uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all flex items-center gap-2"
          >
            <span className="hidden sm:inline">Candidate Login</span><span className="sm:hidden">Login</span> <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        
      </div>
    </header>
  );
}