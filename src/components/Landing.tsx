import React from 'react';
import { motion } from 'motion/react';
import { Wallet, TrendingUp, Cpu, ShieldCheck } from 'lucide-react';

export function Landing({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen bg-[#050507] text-white flex flex-col font-sans relative overflow-hidden tech-grid">
      <div className="absolute inset-0 bg-radial-gradient from-brand-cyan/10 via-transparent to-transparent opacity-30 pointer-events-none" />
      
      <nav className="flex items-center justify-between px-10 py-8 relative z-10 w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-cyan flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(0,240,255,0.5)]">
            <TrendingUp size={20} className="text-black" />
          </div>
          <span className="text-lg font-mono font-bold uppercase tracking-[0.2em]">FinAI_Core</span>
        </div>
        <button 
          onClick={onLogin}
          className="bg-white text-black px-6 py-2 rounded-sm font-bold uppercase tracking-widest text-[10px] hover:bg-brand-cyan transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
        >
          Initialize Account
        </button>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full mb-8">
             <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-pulse shadow-[0_0_5px_#00F0FF]" />
             <span className="text-brand-cyan text-[9px] font-mono uppercase tracking-[0.3em]">Neural Finance Engine v2.0</span>
          </div>
          <h1 className="text-7xl md:text-[10rem] font-bold leading-[0.8] tracking-tighter mb-10 italic">
            MONEY <br />
            <span className="text-white/20">VECTORIZED.</span>
          </h1>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-16 font-mono leading-relaxed tracking-tight">
            Predictive behavioral analysis for the modern financial landscape. Leverage machine learning to simulate outcomes and master your wealth velocity.
          </p>
          <div className="flex gap-6 items-center justify-center">
            <button 
              onClick={onLogin}
              className="bg-brand-cyan text-black text-xs font-bold px-10 py-5 rounded uppercase tracking-[0.3em] hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(0,240,255,0.2)]"
            >
              Start Session
            </button>
            <div className="h-px w-24 bg-white/10 hidden md:block" />
            <div className="text-white/20 font-mono text-[10px] hidden md:block uppercase tracking-widest italic">
               Waiting for user input...
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mt-32 border border-white/5 bg-white/5 p-px">
          {[
            { icon: Cpu, title: "ML_PREDICT", desc: "Transformer models forecasting spending anomalies with high precision variance." },
            { icon: Wallet, title: "BEHAVIOR_MAP", desc: "Cluster analysis of spending patterns to identify financial archetype vulnerabilities." },
            { icon: ShieldCheck, title: "ZERO_TRUST", desc: "Enterprise-grade database encryption with localized auth token persistence." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="p-8 bg-[#0A0A0C] flex flex-col items-start text-left min-h-[220px]"
            >
              <item.icon className="text-brand-cyan/40 mb-6" size={24} />
              <h3 className="text-xs font-mono font-bold mb-3 uppercase tracking-widest text-white">{item.title}</h3>
              <p className="text-white/30 text-xs font-mono leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="py-12 text-center text-white/10 text-[9px] font-mono uppercase tracking-[0.5em] border-t border-white/5 relative z-10">
        SYS.FINANCE // ENCRYPTED_PROTOCOL_V.4.1 // © 2026 FINAI_PLATFORM
      </footer>
    </div>
  );
}
