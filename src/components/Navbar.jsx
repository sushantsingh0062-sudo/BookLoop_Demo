import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  PlusCircle, 
  List, 
  UserCheck, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck, 
  Home, 
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar = () => {
  const { currentPage, navigateTo, isLoggedIn, user, logoutUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If on login page, render simplified branded navbar
  if (currentPage === 'login' || !isLoggedIn) {
    return (
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('login')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-md shadow-teal-500/20">
              <BookOpen className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                BOOK<span className="text-teal-400">LOOP</span>
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-teal-300/80 font-medium">
                Campus Textbook Exchange
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" /> Case Study No. 49
            </span>
          </div>
        </div>
      </header>
    );
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'home', label: 'Buy Books', icon: ShoppingBag, filterTrigger: true },
    { id: 'sell', label: 'Sell Book', icon: PlusCircle, isHighlight: true },
    { id: 'my-listings', label: 'My Listings', icon: List },
    { id: 'profile', label: 'Profile', icon: UserCheck },
  ];

  const handleNavClick = (item) => {
    setMobileMenuOpen(false);
    navigateTo(item.id);
  };

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigateTo('home')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              BOOK<span className="text-teal-400">LOOP</span>
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-teal-300/80 font-medium">
              Campus Textbook Exchange
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id && (item.label !== 'Buy Books' || currentPage === 'home');
            
            if (item.isHighlight) {
              return (
                <button
                  key={idx}
                  onClick={() => handleNavClick(item)}
                  className="ml-2 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 hover:from-teal-400 hover:to-emerald-400 shadow-md shadow-teal-500/20 transition-all hover:scale-105"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            }

            return (
              <button
                key={idx}
                onClick={() => handleNavClick(item)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-800 text-teal-400 border border-slate-700'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right side: Verified Badge & Logout */}
        <div className="hidden lg:flex items-center gap-3">
          <div 
            onClick={() => navigateTo('profile')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold cursor-pointer hover:bg-emerald-500/20 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified Student</span>
          </div>

          <button
            onClick={logoutUser}
            title="Logout"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-2 animate-fade-in">
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 rounded-lg text-emerald-400 text-xs font-semibold mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Student: {user?.name || 'student@college.edu'}</span>
          </div>

          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={idx}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  isActive ? 'bg-teal-500/20 text-teal-400' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 text-teal-400" />
                {item.label}
              </button>
            );
          })}

          <button
            onClick={logoutUser}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors mt-2"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>
      )}
    </header>
  );
};
