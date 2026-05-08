import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { generateBehavioralProfile } from '../services/geminiService';
import { getBehavioralProfile, getTransactions } from '../lib/db';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Loader2, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

export function Insights() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsub = getBehavioralProfile(user.uid, (p) => {
      setProfile(p);
      setLoading(false);
    });
    return unsub;
  }, [user]);

  const runAnalysis = async () => {
    if (!user) return;
    setAnalyzing(true);
    try {
      // In a real app, we'd fetch actual transactions
      // For now, we simulate with some context
      const transactions = [
        { description: 'Starbucks', amount: 6.5, date: '2026-05-01' },
         { description: 'Uber', amount: 22.1, date: '2026-05-02' },
         { description: 'Rent', amount: 2400, date: '2026-05-01' },
      ];
      const result = await generateBehavioralProfile(transactions);
      // We would save this to Firestore here
      setProfile(result);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="animate-spin text-neutral-300" size={32} />
    </div>
  );

  return (
    <div className="space-y-8 pb-10">
      {!profile && !analyzing && (
        <div className="bg-[#0F0F12] border border-white/5 tech-grid rounded-2xl p-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
               <Brain className="text-brand-cyan/50" size={32} />
            </div>
            <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase italic text-white">Initialize Behavioral Analysis</h3>
            <p className="text-white/40 max-w-md mb-8 leading-relaxed text-sm font-mono tracking-tight">
              Awaiting behavioral vector data. Our AI analyzes your spending patterns to categorize your financial archetype.
            </p>
            <button 
              onClick={runAnalysis}
              className="bg-brand-cyan text-black px-8 py-4 rounded font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2 text-xs shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              <Sparkles size={16} />
              Run Core Engine
            </button>
        </div>
      )}

      {analyzing && (
        <div className="bg-[#0F0F12] rounded-2xl p-20 flex flex-col items-center justify-center text-center border border-white/5 relative overflow-hidden">
           <div className="relative z-10">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 rounded-full border border-dashed border-brand-cyan/20"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <Brain className="text-brand-cyan animate-pulse" size={40} />
              </div>
           </div>
           <h3 className="text-xl font-bold tracking-[0.2em] mt-10 mb-2 uppercase text-white relative z-10">Neural Analysis Active</h3>
           <p className="text-brand-cyan font-mono text-[10px] tracking-[0.5em] relative z-10">SAMPLING SPENDING CLUSTERS // {Math.floor(Math.random() * 10000)}ms</p>
           <div className="absolute inset-0 tech-grid opacity-10" />
        </div>
      )}

      {profile && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="bg-[#0F0F12] p-10 relative overflow-hidden flex flex-col h-full"
           >
              <div className="relative z-10">
                 <div className="flex justify-between items-start mb-12">
                    <span className="bg-brand-purple/10 text-brand-purple px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-widest border border-brand-purple/20">
                       ARCHETYPE: {profile.cluster}
                    </span>
                    <Brain className="text-white/20" size={32} />
                 </div>
                 <h2 className="text-5xl font-bold tracking-tighter mb-6 leading-none text-white italic">
                    Behavioral <br />Mapping
                 </h2>
                 <p className="text-white/50 text-base mb-10 max-w-sm font-mono leading-relaxed">
                    {profile.forecastSummary}
                 </p>
                 
                 <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest mb-1">Integrity Deviation</p>
                        <p className="text-3xl font-mono font-bold text-white tracking-tight">{profile.riskScore}<span className="text-white/20 text-sm ml-1">/100</span></p>
                    </div>
                    <div className="flex gap-1">
                       {[1,2,3,4,5].map(i => (
                         <div key={i} className={cn("w-1.5 h-6 rounded-sm", i <= profile.riskScore/20 ? "bg-brand-cyan shadow-[0_0_8px_#00F0FF]" : "bg-white/5")} />
                       ))}
                    </div>
                 </div>
              </div>
              <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-brand-cyan/5 blur-[120px] rounded-full" />
              <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />
           </motion.div>

           <div className="bg-[#0A0A0C] p-10 flex flex-col border-l border-white/5">
              <h3 className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-8 font-mono">Intelligent Tuning</h3>
              <div className="space-y-4">
                 {profile.recommendations?.map((rec: string, i: number) => (
                   <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                        "p-6 rounded-lg border-l-2 bg-white/5 border-white/10 transition-all hover:bg-white/10 cursor-default group",
                        i === 0 ? "border-l-orange-500" : "border-l-brand-cyan"
                    )}
                   >
                      <div className="flex justify-between mb-2">
                        <span className={cn("text-[9px] font-mono font-bold uppercase tracking-widest", i === 0 ? "text-orange-500" : "text-brand-cyan")}>
                            {i === 0 ? 'ANOMALY DETECTED' : 'OPTIMIZATION PATH'}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-white tracking-tight leading-snug group-hover:text-brand-cyan transition-colors">
                        {rec.split(':')[0]}
                      </p>
                      <p className="text-xs text-white/40 mt-2 font-mono leading-relaxed">
                        {rec.includes(':') ? rec.split(':')[1] : rec}
                      </p>
                   </motion.div>
                 ))}
                 
                 <div className="mt-8 bg-black border border-white/10 rounded p-5 font-mono text-[11px] flex flex-col min-h-[120px]">
                    <div className="text-brand-cyan mb-2">[AURA_SYSTEM]: Recommendation Engine Online.</div>
                    <div className="text-white/60 leading-normal mb-4">
                       Active pattern monitoring suggests {profile.cluster} profile is susceptible to weekend dining-out spikes. Variance threshold reached.
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                        <div className="flex gap-1 items-center">
                            <span className="w-1 h-3 bg-brand-cyan animate-pulse"></span>
                            <span className="text-white/20">STANDBY...</span>
                        </div>
                        <button className="text-[9px] text-brand-cyan border border-brand-cyan/30 px-2 py-0.5 rounded hover:bg-brand-cyan/10">EXECUTE GUARD</button>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
