import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Target, Shield, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to FinAI",
      desc: "An intelligent operating system for your money. Predictive, behavioral, and secure.",
      icon: <Zap className="text-orange-500" size={40} />
    },
    {
      title: "Bank-Grade Privacy",
      desc: "We use zero-knowledge architecture to ensure your data stays yours. Encrypted and protected.",
      icon: <Shield className="text-blue-500" size={40} />
    },
    {
      title: "Set Your North Star",
      desc: "What is your primary goal? Retirement, buying a home, or true financial freedom?",
      icon: <Target className="text-red-500" size={40} />
    }
  ];

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#050507] p-6 tech-grid">
      <motion.div 
        key={step}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0F0F12] p-12 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-lg w-full text-center border border-white/5 relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center mx-auto mb-10 border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
             {steps[step].icon}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter mb-4 uppercase italic text-white tracking-widest">{steps[step].title}</h2>
          <p className="text-white/40 text-sm leading-relaxed mb-12 font-mono tracking-tight">
            {steps[step].desc}
          </p>

          <div className="flex flex-col gap-4">
             {step < steps.length - 1 ? (
               <button 
                onClick={() => setStep(step + 1)}
                className="bg-brand-cyan text-black py-4 rounded font-bold uppercase tracking-[0.2em] hover:bg-white transition-all flex items-center justify-center gap-3 text-xs shadow-[0_0_20px_rgba(0,240,255,0.2)]"
               >
                  PROCEED <ChevronRight size={16} />
               </button>
             ) : (
               <button 
                onClick={onComplete}
                className="bg-brand-purple text-white py-4 rounded font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all text-xs shadow-[0_0_20px_rgba(188,0,255,0.2)]"
               >
                  CONNECT_FINANCE_NODE
               </button>
             )}
             
             <div className="flex justify-center gap-3 mt-8">
                {steps.map((_, i) => (
                  <div key={i} className={cn("w-1 h-3 rounded-full transition-all", i === step ? 'bg-brand-cyan shadow-[0_0_8px_#00F0FF]' : 'bg-white/5')} />
                ))}
             </div>
          </div>
        </div>
        <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />
      </motion.div>
    </div>
  );
}
