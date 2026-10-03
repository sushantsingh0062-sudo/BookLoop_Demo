import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Toast } from './components/Toast';
import { PageLogin } from './pages/PageLogin';
import { PageHome } from './pages/PageHome';
import { PageBookDetails } from './pages/PageBookDetails';
import { PageSellBook } from './pages/PageSellBook';
import { PageMyListings } from './pages/PageMyListings';
import { PageCheckout } from './pages/PageCheckout';
import { PageHandover } from './pages/PageHandover';
import { PageTransactionComplete } from './pages/PageTransactionComplete';
import { PageProfile } from './pages/PageProfile';
import { BookOpen, ShieldCheck, Heart } from 'lucide-react';

const AppContent = () => {
  const { currentPage, isLoggedIn } = useApp();

  const renderPage = () => {
    if (!isLoggedIn || currentPage === 'login') {
      return <PageLogin />;
    }

    switch (currentPage) {
      case 'home':
        return <PageHome />;
      case 'book-details':
        return <PageBookDetails />;
      case 'sell':
        return <PageSellBook />;
      case 'my-listings':
        return <PageMyListings />;
      case 'checkout':
        return <PageCheckout />;
      case 'handover':
        return <PageHandover />;
      case 'complete':
        return <PageTransactionComplete />;
      case 'profile':
        return <PageProfile />;
      default:
        return <PageHome />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 font-sans selection:bg-teal-500 selection:text-white">
      <div>
        <Navbar />
        <main className="animate-fade-in">
          {renderPage()}
        </main>
      </div>

      {/* Global Campus Footer */}
      {isLoggedIn && currentPage !== 'login' && (
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8 text-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="font-extrabold text-sm text-white">BOOK<span className="text-teal-400">LOOP</span></span>
                <span className="block text-[10px] text-slate-500">"Give every textbook another semester."</span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Case Study No. 49: Circular Economy
              </span>
              <span>•</span>
              <span>Campus Education Marketplace</span>
            </div>

            <p className="text-[11px] text-slate-500">
              © {new Date().getFullYear()} BookLoop Platform • Verified Student Exchange
            </p>

          </div>
        </footer>
      )}

      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
