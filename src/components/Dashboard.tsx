import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';
import { getAccounts, getTransactions } from '../lib/db';
import { formatCurrency, cn } from '../lib/utils';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { ArrowUpRight, ArrowDownLeft, Plus, CreditCard, Landmark, PiggyBank, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export function Dashboard() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const unsubAccounts = getAccounts(user.uid, setAccounts);
    const unsubTransactions = getTransactions(user.uid, setTransactions);
    return () => {
      unsubAccounts();
      unsubTransactions();
    };
  }, [user]);

  // Mock data if none exists
  const displayedAccounts = accounts.length > 0 ? accounts : [
    { name: 'Checking', type: 'checking', balance: 4250.20, institution: 'Chase' },
    { name: 'Savings', type: 'savings', balance: 12400.00, institution: 'Marcus' },
    { name: 'Amex Gold', type: 'credit_card', balance: -840.12, institution: 'American Express' }
  ];

  const totalBalance = displayedAccounts.reduce((acc, curr) => acc + curr.balance, 0);

  const chartData = [
    { month: 'Jan', balance: 14500 },
    { month: 'Feb', balance: 15200 },
    { month: 'Mar', balance: 14800 },
    { month: 'Apr', balance: 15910.08 },
  ];

  const categories = [
    { name: 'Housing', value: 2400, color: '#101010' },
    { name: 'Food', value: 650, color: '#F97316' },
    { name: 'Transport', value: 320, color: '#737373' },
    { name: 'Services', value: 180, color: '#D4D4D4' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-[#15151A] border border-white/10 p-8 rounded-2xl relative overflow-hidden group">
          <div className="relative z-10">
             <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.2em] mb-3">Net Worth Forecast (30d)</p>
             <h2 className="text-4xl font-mono font-medium tracking-tighter text-white">{formatCurrency(totalBalance)}</h2>
             <div className="flex items-center gap-1 mt-6 text-brand-green text-xs font-mono">
                <span>+4.2% predicted growth</span>
             </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <TrendingUp size={48} className="text-brand-cyan" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-cyan shadow-[0_0_10px_#00F0FF]" />
        </motion.div>

        <div className="bg-[#0F0F12] border border-white/5 p-8 rounded-2xl relative overflow-hidden">
           <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.2em] mb-3">Disposable Surplus</p>
           <h2 className="text-4xl font-mono font-medium tracking-tighter text-white">{formatCurrency(3420.00)}</h2>
           <div className="flex items-center gap-1 mt-6 text-white/40 text-xs font-mono italic">
              <span>Optimization recommended</span>
           </div>
           <div className="absolute top-0 right-0 p-4 opacity-5">
             <PiggyBank size={48} />
           </div>
        </div>

        <div className="bg-[#0F0F12] border border-white/5 p-8 rounded-2xl relative overflow-hidden">
           <p className="text-orange-400/50 text-[10px] font-mono uppercase tracking-[0.2em] mb-3">Overspend Risk Score</p>
           <div className="flex items-baseline gap-2">
              <h2 className="text-4xl font-mono font-medium tracking-tighter text-white">73</h2>
              <span className="text-white/20 font-mono">/100</span>
           </div>
           <div className="flex items-center gap-1 mt-6 text-orange-400 text-xs font-mono italic">
              <span>Probability spike on weekends</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[#0F0F12] p-8 rounded-2xl border border-white/5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-8 relative z-10">
             <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-white/60">Temporal Fusion Forecasting</h3>
             <div className="flex gap-2">
                {['1M', '6M', '1Y'].map(t => (
                  <button key={t} className={cn("px-2 py-1 rounded text-[10px] font-mono transition-all", t === '6M' ? "bg-brand-cyan/20 border border-brand-cyan/30 text-brand-cyan" : "bg-white/5 text-white/40 hover:bg-white/10")}>
                    {t}
                  </button>
                ))}
             </div>
          </div>
          <div className="h-[300px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.3)', fontFamily: 'JetBrains Mono' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0C', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#00F0FF', fontFamily: 'JetBrains Mono', fontSize: '12px' }}
                  labelStyle={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'JetBrains Mono', fontSize: '10px', marginBottom: '4px' }}
                  formatter={(value: any) => [formatCurrency(value), 'VECTOR']}
                />
                <Area type="monotone" dataKey="balance" stroke="#00F0FF" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />
        </div>

        {/* Transactions List */}
        <div className="bg-[#0F0F12] p-8 rounded-2xl border border-white/5 border-l-2 border-l-brand-purple/40">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/60">Data Ledger</h3>
              <div className="px-2 py-1 bg-brand-purple/10 border border-brand-purple/20 rounded text-[9px] text-brand-purple font-mono uppercase tracking-widest">Live Sync</div>
           </div>
           <div className="space-y-4">
              {[
                { name: 'Apple Store', date: '05.07.26', amount: -129.00, cat: 'Shopping' },
                { name: 'Whole Foods', date: '05.06.26', amount: -84.20, cat: 'Food' },
                { name: 'Wealthfront', date: '04.24.26', amount: 500.00, cat: 'Investment' },
                { name: 'Netflix', date: '04.22.26', amount: -19.99, cat: 'Services' },
                { name: 'Landlord', date: '04.01.26', amount: -2400.00, cat: 'Housing' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between group border-b border-white/5 pb-3 last:border-0 hover:bg-white/5 transition-all p-2 rounded">
                   <div className="flex items-center gap-3">
                      <div className={cn("text-[10px] font-mono", tx.amount < 0 ? "text-white/30" : "text-brand-green/50")}>
                         {tx.amount < 0 ? '[-] ' : '[+] '}
                      </div>
                      <div>
                         <p className="text-xs font-medium text-white uppercase tracking-tight">{tx.name}</p>
                         <div className="flex items-center gap-2 mt-1">
                            <p className="text-[9px] font-mono text-white/30">{tx.date}</p>
                            <p className="text-[9px] font-mono text-brand-cyan/40 px-1 border border-brand-cyan/10 rounded uppercase">{tx.cat}</p>
                         </div>
                      </div>
                   </div>
                   <p className={cn("text-xs font-mono font-bold", tx.amount < 0 ? "text-white/80" : "text-brand-green")}>
                      {tx.amount.toFixed(2)}
                   </p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
