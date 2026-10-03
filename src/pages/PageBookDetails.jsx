import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  MapPin, 
  BookOpen, 
  CheckCircle2, 
  MessageSquare, 
  ShoppingCart, 
  IndianRupee, 
  Tag, 
  BookMarked,
  User,
  Star,
  Award,
  Calendar,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ContactSellerModal } from '../components/ContactSellerModal';

export const PageBookDetails = () => {
  const { selectedBook, navigateTo, startCheckout } = useApp();
  const [isContactOpen, setIsContactOpen] = useState(false);

  if (!selectedBook) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-slate-500 mb-4">No book selected.</p>
          <button onClick={() => navigateTo('home')} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all hover:-translate-x-0.5"
          >
            <ArrowLeft className="w-4 h-4 text-teal-600" />
            Back to Textbook Search
          </button>

          <span className="text-xs font-semibold text-slate-500 bg-slate-200/70 px-3 py-1 rounded-full">
            Book Listing #{selectedBook.id}
          </span>
        </div>

        {/* Main Book Detail Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Cover Banner / Visual Placeholder */}
            <div className={`lg:col-span-5 bg-gradient-to-br ${selectedBook.coverColor || 'from-slate-900 via-slate-800 to-navy-950'} p-8 text-white flex flex-col justify-between relative overflow-hidden min-h-[340px]`}>
              
              <div className="space-y-3 z-10">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-xs font-bold text-teal-300 border border-white/10">
                    {selectedBook.edition}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-extrabold shadow-md">
                    {selectedBook.condition} Condition
                  </span>
                </div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-teal-200 block pt-2">
                  {selectedBook.subject}
                </span>
              </div>

              <div className="z-10 my-auto py-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-snug">
                  {selectedBook.title}
                </h1>
                <p className="text-slate-300 text-sm mt-2 font-medium">
                  Author: <span className="text-white font-bold">{selectedBook.author}</span>
                </p>
              </div>

              {/* Cover Bottom Tags */}
              <div className="z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                <span>ISBN: {selectedBook.isbn || '978-0072465631'}</span>
                <span>Listed: {selectedBook.listedDate || 'Recently'}</span>
              </div>

              {/* Subtle Decorative Icon */}
              <BookOpen className="w-56 h-56 absolute -right-12 -bottom-12 text-white/10 pointer-events-none" />
            </div>

            {/* Right Details & Seller Action Pane */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              
              <div className="space-y-6">
                
                {/* Title & Price Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                      {selectedBook.title}
                    </h2>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-medium">
                      <span>Subject: <strong className="text-slate-800">{selectedBook.subject}</strong></span>
                      <span>•</span>
                      <span>Edition: <strong className="text-slate-800">{selectedBook.edition}</strong></span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-right shrink-0">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block">Price</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold text-slate-900">₹{selectedBook.price}</span>
                      {selectedBook.originalPrice && (
                        <span className="text-xs text-slate-400 line-through">₹{selectedBook.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Seller Info Card */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-navy-900 text-white space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-teal-500/20 text-teal-400 font-bold text-sm flex items-center justify-center overflow-hidden border border-teal-500/40">
                        {selectedBook.sellerAvatar ? (
                          <img src={selectedBook.sellerAvatar} alt={selectedBook.seller} className="w-full h-full object-cover" />
                        ) : (
                          selectedBook.seller[0]
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-white text-sm">{selectedBook.seller}</h4>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Verified Student
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">Enrolled Student • Campus Exchange Verified</p>
                      </div>
                    </div>

                    <div className="text-right hidden sm:block">
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{selectedBook.sellerRating || 4.9} / 5.0</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block">{selectedBook.sellerCompletedExchanges || 12} exchanges</span>
                    </div>
                  </div>
                </div>

                {/* Description Box */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Book Description & Notes
                  </h3>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 leading-relaxed">
                    "{selectedBook.description || 'Used for one semester. Pages are in good condition with minor notes.'}"
                  </div>
                </div>

                {/* Location & Handover Spot */}
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 text-teal-900">
                  <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-teal-700 tracking-wide block">
                      Convenient Campus Handover Point
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {selectedBook.location || 'Campus Library'}
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Buttons: [ BUY NOW ] and [ CONTACT SELLER ] */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => startCheckout(selectedBook)}
                  className="w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>BUY NOW (₹{selectedBook.price})</span>
                </button>

                <button
                  onClick={() => setIsContactOpen(true)}
                  className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-teal-400" />
                  <span>CONTACT SELLER</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Contact Seller Modal */}
      <ContactSellerModal
        book={selectedBook}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
};
