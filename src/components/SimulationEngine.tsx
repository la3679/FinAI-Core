import React, { useState } from 'react';
import { simulateFinancialOutcome } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Play, Loader2, TrendingUp, Info, ChevronRight, Sparkles } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function SimulationEngine() {
  const [scenario, setScenario] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const presets = [
    "Reduce eating out by 50% and invest the savings",
    "Switch to a cheaper phone plan and cancel 2 subscriptions",
    "Increase monthly investment by $500",
    "Pay off higher interest debt with an extra $200/mo"
  ];

  const handleSimulate = async (scen?: string) => {
    const finalScenario = scen || scenario;
    if (!finalScenario) return;
    
    setLoading(true);
    try {
      const mockStatus = {
        currentBalance: 15910,
        monthlyIncome: 6500,
        monthlyExpenses: 3550,
        monthlySavings: 2950
      };
      const simResult = await simulateFinancialOutcome(finalScenario, mockStatus);
      setResult(simResult);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-[#0F0F12] p-10 rounded-2xl border border-white/5 overflow-hidden relative tech-grid shadow-2xl">
         <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
               <div className="w-10 h-10 bg-brand-cyan rounded-lg flex items-center justify-center text-black">
                  <Zap size={20} fill="currentColor" />
               </div>
               <h2 className="text-3xl font-bold tracking-tight text-white italic uppercase tracking-tighter">Behavioral Simulation Engine</h2>
            </div>
            
            <div className="max-w-2xl">
               <p className="text-white/40 text-[11px] font-mono uppercase tracking-[0.2em] mb-10 leading-relaxed max-w-lg">
                  Vector-based hypothesis modeling. Inject scenario parameters to calculate long-term net worth variances via transformer-based predictive engine.
               </p>

               <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-cyan/50 font-mono text-xs tracking-widest">[INPUT]:</div>
                    <input 
                      disabled={loading}
                      value={scenario}
                      onChange={(e) => setScenario(e.target.value)}
                      placeholder="e.g., Reduce dinner-out spending by 40%..."
                      className="w-full bg-[#0A0A0C] border border-white/10 rounded-lg px-6 py-5 pl-24 pr-40 focus:border-brand-cyan focus:bg-black transition-all outline-none font-mono text-xs text-white"
                    />
                    <button 
                      disabled={loading || !scenario}
                      onClick={() => handleSimulate()}
                      className="absolute right-2 top-2 bottom-2 bg-white text-black px-6 rounded font-bold uppercase tracking-widest hover:bg-brand-cyan transition-all disabled:opacity-50 flex items-center gap-2 text-[10px]"
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} fill="currentColor" />}
                      RUN PREDICTION
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                     {presets.map((p, i) => (
                       <button 
                         key={i}
                         onClick={() => { setScenario(p); handleSimulate(p); }}
                         className="text-[9px] font-mono uppercase tracking-widest bg-white/5 text-white/40 px-3 py-1.5 rounded hover:bg-white/10 hover:text-white transition-all border border-white/5"
                       >
                          {p}
                       </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>

      <AnimatePresence>
        {result && !loading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
             <div className="lg:col-span-2 bg-[#0F0F12] p-8 rounded-2xl border border-white/5 relative overflow-hidden tech-grid">
                <div className="flex items-center justify-between mb-8 relative z-10">
                   <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white/50 italic">Projected Temporal Convergence</h3>
                   <div className="bg-brand-green/10 text-brand-green px-3 py-1 rounded text-[9px] font-mono font-bold uppercase tracking-widest border border-brand-green/20">
                      OPTIMAL VECTOR
                   </div>
                </div>
                
                <div className="h-[400px] w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={result.projections} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorSim" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00FF41" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#00FF41" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono' }} dy={10} tickFormatter={(val) => `Y${val}`} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0A0A0C', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}
                        itemStyle={{ color: '#00FF41', fontFamily: 'JetBrains Mono', fontSize: '11px' }}
                        labelStyle={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'JetBrains Mono', fontSize: '9px', marginBottom: '4px' }}
                        formatter={(value: any) => [formatCurrency(value), 'NET_WORTH']}
                      />
                      <Area type="monotone" dataKey="balance" stroke="#00FF41" strokeWidth={2} fillOpacity={1} fill="url(#colorSim)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-8 flex gap-12 items-center border-t border-white/5 pt-8 relative z-10">
                   <div>
                      <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest mb-1">Projected Outcome (Y5)</p>
                      <p className="text-3xl font-mono font-bold text-white tracking-tighter">{formatCurrency(result.projections[4].balance)}</p>
                   </div>
                   <div className="w-px h-12 bg-white/5" />
                   <div>
                      <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest mb-1">Velocity Enhancement</p>
                      <p className="text-3xl font-mono font-bold text-brand-green tracking-tighter">+{result.projections[4].savingsRate}%</p>
                   </div>
                </div>
             </div>

             <div className="space-y-6">
                <div className="bg-black border border-brand-cyan/20 p-8 rounded-2xl relative overflow-hidden flex flex-col h-full shadow-[0_0_20px_rgba(0,240,255,0.05)]">
                   <div className="flex items-center gap-3 mb-6 relative z-10">
                      <Sparkles className="text-brand-cyan" size={20} />
                      <h3 className="text-[10px] font-mono font-bold text-brand-cyan uppercase tracking-[0.2em]">AURA Intelligence</h3>
                   </div>
                   <p className="text-white/80 text-sm leading-relaxed mb-10 relative z-10 font-mono tracking-tight italic">
                      "{result.summary}"
                   </p>
                   <button className="mt-auto px-6 py-3 bg-brand-cyan text-black text-[10px] font-bold rounded uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 relative z-10">
                      PROVISION CHANGES <ChevronRight size={14} />
                   </button>
                   <div className="absolute inset-0 tech-grid opacity-20" />
                   <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-brand-cyan/20 blur-[60px] rounded-full" />
                </div>

                <div className="bg-[#0F0F12] border border-white/5 p-8 rounded-2xl">
                   <h3 className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-white/30 mb-6">Yearly Impact Logs</h3>
                   <div className="space-y-4">
                      {result.projections.map((p: any, i: number) => (
                        <div key={i} className="flex gap-4 items-start pb-4 border-b border-white/5 last:border-0 last:pb-0">
                           <div className="text-[10px] font-mono font-bold text-brand-cyan/50 shrink-0 mt-1">
                              [Y{p.year}]
                           </div>
                           <p className="text-[11px] text-white/50 leading-snug font-mono tracking-tight">
                              {p.impact}
                           </p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
