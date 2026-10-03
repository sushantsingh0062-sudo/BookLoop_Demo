import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Star, 
  Home, 
  BookOpen, 
  ShieldCheck, 
  MapPin, 
  Recycle, 
  Award,
  Sparkles,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PageTransactionComplete = () => {
  const { activeOrder, finishTransaction, navigateTo } = useApp();
  const [rating, setRating] = useState(activeOrder.rating || 5);
  const [hoverRating, setHoverRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const book = activeOrder.book || {
    title: "Database Management Systems",
    price: 350,
  };

  const bookPrice = activeOrder.bookPrice || 350;
  const fee = activeOrder.fee || 30;
  const location = activeOrder.handoverLocation || "Campus Library";

  const handleRate = (star) => {
    setRating(star);
    setHasRated(true);
    finishTransaction(star);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-white flex items-center justify-center relative overflow-hidden">
      
      {/* Background glow blobbies */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-2xl w-full bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-10 space-y-8 text-center relative z-10 animate-fade-in">
        
        {/* Large Checkmark Icon with Glowing Ring */}
        <div className="relative inline-block mx-auto">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 mx-auto shadow-2xl shadow-emerald-500/30 animate-bounce">
            <CheckCircle2 className="w-14 h-14 font-extrabold stroke-[2.5]" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md">
            <Sparkles className="w-4 h-4 fill-slate-950" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Transaction Completed!
          </h1>
          <p className="text-emerald-400 font-semibold text-sm">
            ✓ Campus Exchange Verified & Logged
          </p>
        </div>

        {/* Details Card */}
        <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-5 space-y-3 text-left">
          
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <span className="text-xs text-slate-400 uppercase font-bold">Textbook</span>
            <span className="font-extrabold text-white text-sm">{book.title}</span>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>Book Price:</span>
            <span className="font-bold text-white">₹{bookPrice}</span>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>BookLoop Fee:</span>
            <span className="font-bold text-white">₹{fee}</span>
          </div>

          <div className="flex justify-between items-center text-xs text-slate-300">
            <span>Status:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold border border-emerald-500/30 uppercase text-[10px]">
              COMPLETED
            </span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs">
            <span className="text-slate-400">Handover Location:</span>
            <span className="font-bold text-teal-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {location}
            </span>
          </div>

        </div>

        {/* Interactive Star Rating Widget */}
        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
            {hasRated ? 'Thank you for rating your peer exchange!' : 'Rate this exchange with fellow student'}
          </span>

          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleRate(star)}
                className="p-1 transition-transform hover:scale-125 focus:outline-none"
              >
                <Star 
                  className={`w-7 h-7 ${
                    (hoverRating || rating) >= star
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-slate-600'
                  }`}
                />
              </button>
            ))}
          </div>

          {hasRated && (
            <span className="text-xs text-amber-300 font-bold block animate-fade-in">
              Rating logged: {rating} / 5 Stars ⭐
            </span>
          )}
        </div>

        {/* Environmental & Campus Impact Message */}
        <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/30 text-xs text-teal-200 space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-bold text-teal-300">
            <Recycle className="w-4 h-4 text-emerald-400" />
            <span>"Thank you for helping keep textbooks in use."</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Circular Economy Case Study No. 49 — Education Marketplace
          </p>
        </div>

        {/* Buttons: [ RATE TRANSACTION ] and [ BACK TO HOME ] */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          {!hasRated && (
            <button
              onClick={() => handleRate(5)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-2"
            >
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>[ RATE TRANSACTION ]</span>
            </button>
          )}

          <button
            onClick={() => navigateTo('home')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <Home className="w-4 h-4" />
            <span>[ BACK TO HOME ]</span>
          </button>
        </div>

      </div>
    </div>
  );
};
