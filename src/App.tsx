import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth } from './lib/firebase';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { SimulationEngine } from './components/SimulationEngine';
import { Insights } from './components/Insights';
import { Onboarding } from './components/Onboarding';
import { Landing } from './components/Landing';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'dashboard' | 'simulation' | 'insights'>('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        // Simple logic for demo: check if we've seen onboarding this session
        const hasSeen = sessionStorage.getItem('finai_onboarded');
        if (!hasSeen) setShowOnboarding(true);
      }
      setLoading(false);
    });
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('finai_onboarded');
    signOut(auth);
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#050507]">
        <div className="relative">
          <Loader2 className="animate-spin text-brand-cyan" size={40} />
          <div className="absolute inset-0 bg-brand-cyan/20 blur-[20px] rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Landing onLogin={login} />;
  }

  if (showOnboarding) {
    return (
      <Onboarding 
        onComplete={() => {
          sessionStorage.setItem('finai_onboarded', 'true');
          setShowOnboarding(false);
        }} 
      />
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading }}>
      <Layout currentView={view} setView={setView} onLogout={logout}>
        {view === 'dashboard' && <Dashboard />}
        {view === 'simulation' && <SimulationEngine />}
        {view === 'insights' && <Insights />}
      </Layout>
    </AuthContext.Provider>
  );
}
