import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Mail, 
  ArrowRight, 
  KeyRound, 
  GraduationCap, 
  Recycle,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PageLogin = () => {
  const { loginUser, showToast } = useApp();
  const [email, setEmail] = useState('student@college.edu');
  const [password, setPassword] = useState('123456');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [collegeName, setCollegeName] = useState('Apex Institute of Technology');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both student email and password.', 'error');
      return;
    }
    const success = loginUser(email, password);
    if (!success) {
      showToast('Please enter credentials to proceed.', 'error');
    }
  };

  const fillDemoCredentials = () => {
    setEmail('student@college.edu');
    setPassword('123456');
    loginUser('student@college.edu', '123456');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-950 text-white relative overflow-hidden">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-teal-600/20 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden glass-card z-10">
        
        {/* Left Side — Branding & Value Proposition */}
        <div className="lg:col-span-6 p-8 sm:p-12 bg-gradient-to-br from-slate-900 via-slate-900 to-navy-950 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative">
          
          <div className="space-y-6">
            {/* Case Study Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Case Study No. 49: Circular Economy
            </div>

            {/* Brand Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/30">
                  <BookOpen className="w-7 h-7 text-slate-950 font-bold" />
                </div>
                <div>
                  <h1 className="font-extrabold text-3xl tracking-tight text-white">
                    BOOK<span className="text-teal-400">LOOP</span>
                  </h1>
                  <p className="text-xs uppercase tracking-widest text-teal-300 font-semibold">
                    Campus Textbook Exchange
                  </p>
                </div>
              </div>
            </div>

            {/* Main Headline & Description */}
            <div className="pt-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                "Give every textbook <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  another semester.
                </span>"
              </h2>
              <p className="mt-4 text-slate-300 text-base leading-relaxed">
                A simple, verified way for students to buy, sell and exchange the books they need directly on campus.
              </p>
            </div>

            {/* Verification & Trust Badges Checklist */}
            <div className="space-y-3 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>✓ Verified Students Only (Edu Domain)</span>
              </div>

              <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                <div className="w-7 h-7 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 border border-teal-500/30 shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span>✓ Safe Campus Handover Locations</span>
              </div>

              <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/30 shrink-0">
                  <Recycle className="w-4 h-4" />
                </div>
                <span>✓ Affordable Textbooks (Up to 60% Off)</span>
              </div>
            </div>
          </div>

          {/* Footer Callout */}
          <div className="mt-8 pt-6 border-t border-slate-800/60 text-xs text-slate-400 flex items-center justify-between">
            <span>Verified Peer-to-Peer Campus Marketplace</span>
            <span className="font-semibold text-teal-400">Zero Shipping Costs</span>
          </div>

        </div>

        {/* Right Side — Login & Student Verification Form */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center bg-slate-900">
          
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white">
              {isRegisterMode ? 'Create Student Account' : 'Student Login'}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {isRegisterMode 
                ? 'Join your campus circular textbook exchange' 
                : 'Enter your institutional email to access textbook listings'}
            </p>
          </div>

          {/* Quick Demo Fill Banner */}
          <div className="mb-6 p-4 rounded-xl bg-slate-800/90 border border-teal-500/30 flex items-center justify-between">
            <div className="text-xs">
              <span className="font-bold text-teal-400 block">Demo Credentials:</span>
              <span className="text-slate-300 font-mono">Email: student@college.edu</span>
              <span className="text-slate-400 block font-mono">Pass: 123456</span>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="px-3 py-1.5 text-xs font-bold rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 transition-colors shrink-0"
            >
              One-Click Demo Login
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isRegisterMode && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  College / Institution
                </label>
                <div className="relative">
                  <GraduationCap className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="Apex Institute of Technology"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 transition-all"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Student Email (.edu)
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@college.edu"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-slate-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 space-y-3">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <span>{isRegisterMode ? 'CREATE ACCOUNT' : 'LOGIN'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="w-full py-3 px-4 rounded-xl font-semibold text-xs text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 transition-all"
              >
                {isRegisterMode ? 'Already have an account? Login' : 'New student? [ CREATE ACCOUNT ]'}
              </button>
            </div>
          </form>

          {/* Student Privacy Note */}
          <div className="mt-6 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Campus verification automatically checks student email domain.</span>
          </div>

        </div>

      </div>

    </div>
  );
};
