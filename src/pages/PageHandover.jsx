import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  BookOpen, 
  Sparkles, 
  ArrowRight,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PageHandover = () => {
  const { activeOrder, confirmHandover, navigateTo } = useApp();
  
  const book = activeOrder.book || {
    title: "Database Management Systems",
    seller: "Rahul"
  };

  const defaultDate = new Date(Date.now() + 86400000).toISOString().split('T')[0]; // Tomorrow
  const [location, setLocation] = useState('Campus Library (Main Entrance)');
  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState('02:00 PM');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsConfirmed(true);
    confirmHandover(location, date, time);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Payment Successful
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Campus Handover
              </h1>
              <p className="text-slate-400 text-xs mt-1">
                Select your preferred meeting location and time on campus.
              </p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold border border-teal-500/30">
              <MapPin className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Form or Confirmation Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sm:p-8 space-y-6">
          
          {/* Exchange Overview */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <span className="text-xs text-slate-500 font-bold uppercase">Textbook</span>
              <span className="font-extrabold text-slate-900 text-sm">{book.title}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold">Buyer</span>
                <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                  Current Student <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Seller</span>
                <span className="font-bold text-slate-900 flex items-center gap-1 mt-0.5">
                  {book.seller || 'Rahul'} <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </span>
              </div>
            </div>
          </div>

          {/* Form fields */}
          <form onSubmit={handleConfirm} className="space-y-5">
            
            {/* Location Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Campus Meeting Location *
              </label>
              <div className="relative">
                <Building2 className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-600" />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-slate-900 transition-all"
                  required
                >
                  <option value="Campus Library (Main Entrance)">Campus Library (Main Entrance)</option>
                  <option value="Student Activity Center (SAC Plaza)">Student Activity Center (SAC Plaza)</option>
                  <option value="Central Canteen & Coffee Shop">Central Canteen & Coffee Shop</option>
                  <option value="Science Block Courtyard">Science Block Courtyard</option>
                  <option value="Engineering Quadrangle Garden">Engineering Quadrangle Garden</option>
                </select>
              </div>
            </div>

            {/* Date and Time Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Select Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Date *
                </label>
                <div className="relative">
                  <Calendar className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-600" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-slate-900 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Select Time */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Time *
                </label>
                <div className="relative">
                  <Clock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-teal-600" />
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-slate-900 transition-all"
                    required
                  >
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Confirmation Banner if already clicked */}
            {isConfirmed && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-2 animate-fade-in">
                <div className="flex items-center gap-2 font-extrabold text-sm text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>✓ Handover Scheduled</span>
                </div>
                <div className="text-xs space-y-1 pl-7 text-emerald-900">
                  <p>Location: <strong>{location}</strong></p>
                  <p>Date & Time: <strong>{date} at {time}</strong></p>
                </div>
              </div>
            )}

            {/* Action Note */}
            <div className="p-3.5 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-200">
              💡 <strong>Handover Instructions:</strong> Meet at the selected campus location to exchange the textbook. Inspect the pages, verify edition details, and confirm completion.
            </div>

            {/* Confirm Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl font-extrabold text-sm bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <span>[ CONFIRM HANDOVER ]</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
