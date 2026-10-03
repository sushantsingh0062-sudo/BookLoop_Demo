import React from 'react';
import { 
  User, 
  ShieldCheck, 
  Mail, 
  GraduationCap, 
  Award, 
  BookOpen, 
  Recycle, 
  IndianRupee,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PageProfile = () => {
  const { user, navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Profile Card Header */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 z-10 relative">
            
            <div className="w-24 h-24 rounded-3xl bg-teal-500/20 text-teal-400 font-extrabold text-3xl flex items-center justify-center overflow-hidden border-2 border-teal-500/40 shadow-xl shrink-0">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user.name[0]
              )}
            </div>

            <div className="text-center sm:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {user.name}
                </h1>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  VERIFIED STUDENT
                </span>
              </div>

              <p className="text-xs text-slate-300 font-medium flex items-center justify-center sm:justify-start gap-1.5">
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                {user.email}
              </p>

              <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
                {user.college || 'Apex Institute of Technology'} • {user.department || 'Computer Science'}
              </p>
            </div>

          </div>

          <BookOpen className="w-52 h-52 absolute -right-12 -bottom-12 text-white/5 pointer-events-none" />
        </div>

        {/* Mandatory Verification Status Banner */}
        <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-emerald-900">
                ✓ VERIFIED STUDENT STATUS ACTIVE
              </h3>
              <p className="text-xs text-emerald-800 font-medium">
                Only verified students can buy and sell books on BookLoop.
              </p>
            </div>
          </div>

          <span className="text-[11px] font-bold bg-white text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-300 shadow-sm shrink-0">
            ID: {user.studentId || 'AIT-2023-CS-042'}
          </span>
        </div>

        {/* Impact & Activity Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Books Sold</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900">{user.booksSold || 4}</span>
              <BookOpen className="w-5 h-5 text-teal-600" />
            </div>
            <span className="text-[11px] text-slate-500 font-medium">To junior batch students</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Books Purchased</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900">{user.booksBought || 3}</span>
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-[11px] text-slate-500 font-medium">From campus sellers</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Money Saved</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900">₹{user.totalSaved || 1650}</span>
              <IndianRupee className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Versus store retail price</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-soft space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Eco Footprint Saved</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-extrabold text-slate-900">{user.co2SavedKg || 18.5} kg</span>
              <Recycle className="w-5 h-5 text-teal-600" />
            </div>
            <span className="text-[11px] text-slate-500 font-medium">CO2 & paper recycled</span>
          </div>

        </div>

        {/* Circular Economy Case Study Callout */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <Recycle className="w-4 h-4 text-teal-600" />
              Case Study No. 49: Circular Economy — Education Marketplace
            </h3>
            <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-bold">
              Campus Platform
            </span>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            BookLoop helps students resell used textbooks after every semester, reducing educational expenses while creating a sustainable, eco-friendly local campus loop.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block mb-0.5">Average Book Resale Value</span>
              <span className="text-teal-700 font-extrabold text-sm">₹450</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 block mb-0.5">BookLoop Transaction Fee</span>
              <span className="text-teal-700 font-extrabold text-sm">₹30 per completed transaction</span>
            </div>
          </div>
        </div>

        {/* Quick Action Navigation */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => navigateTo('home')}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <span>Back to Discovery</span>
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </button>
        </div>

      </div>
    </div>
  );
};
