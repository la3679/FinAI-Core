import React from 'react';
import { LayoutDashboard, Zap, BrainCircuit, LogOut, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  setView: (view: any) => void;
  onLogout: () => void;
}

export function Layout({ children, currentView, setView, onLogout }: LayoutProps) {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'INSIGHTS HUB' },
    { id: 'insights', icon: BrainCircuit, label: 'BEHAVIORAL' },
    { id: 'simulation', icon: Zap, label: 'SIMULATION' },
  ];

  return (
    <div className="flex h-screen bg-bg-dark font-sans text-[#E0E0E6]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-bg-dark flex flex-col p-6 tech-grid">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-gradient-to-br from-brand-cyan to-brand-purple rounded flex items-center justify-center text-white">
            <TrendingUp size={18} />
          </div>
          <span className="font-bold text-xl tracking-tight text-white uppercase">AURA <span className="text-brand-cyan/70 font-light text-sm">FIN-AI</span></span>
        </div>

        <nav className="flex-1 space-y-1">
          <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-4 font-mono">System Core</div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded transition-all duration-200 group relative",
                currentView === item.id 
                  ? "bg-white/5 text-brand-cyan border border-brand-cyan/20" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} className={cn(currentView === item.id ? "text-brand-cyan" : "text-white/40 group-hover:text-white")} />
              <span className="text-xs font-mono tracking-widest">{item.label}</span>
              {currentView === item.id && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute right-0 w-0.5 h-4 bg-brand-cyan shadow-[0_0_8px_#00F0FF]"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-6">
          <div className="p-4 rounded bg-white/5 border border-white/5">
            <div className="text-[9px] text-brand-cyan uppercase mb-2 tracking-widest font-mono">ML Training Engine</div>
            <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "98.4%" }}
                className="h-full bg-brand-cyan shadow-[0_0_8px_#00F0FF]" 
              />
            </div>
            <div className="text-[9px] text-white/40 mt-2 font-mono uppercase">Accuracy: 98.42% // SECURE</div>
          </div>
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded text-white/40 hover:text-white hover:bg-white/5 transition-all text-xs font-mono tracking-widest"
          >
            <LogOut size={16} />
            <span>DISCONNECT</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-10 py-8 bg-bg-panel relative">
        {/* Subtle grid background for main content too */}
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
        
        <header className="flex items-center justify-between mb-10 relative z-10">
          <div>
            <h1 className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-white/40 mb-2">
              Current Vector: <span className="text-white">{currentView}</span>
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold tracking-tight text-white uppercase">
                {currentView === 'dashboard' ? 'Executive Overview' : currentView}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-8 bg-black/40 border border-white/5 p-4 rounded-xl backdrop-blur-md">
            <div className="text-right border-r border-white/10 pr-6">
              <p className="text-[10px] text-white/40 font-mono uppercase tracking-[0.2em] mb-1">Integrity Score</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-mono font-bold text-brand-cyan">84</span>
                <span className="text-xs text-white/20 font-mono">/100</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] text-white/40 font-mono uppercase tracking-[0.2em] mb-1">Operator</p>
                <p className="text-sm font-bold text-white uppercase tracking-tight">Active Session</p>
              </div>
              <div className="w-10 h-10 rounded border border-white/20 bg-white/5 flex items-center justify-center p-1 overflow-hidden">
                 <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user`} alt="avatar" />
              </div>
            </div>
          </div>
        </header>
        
        <motion.div
          key={currentView}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
