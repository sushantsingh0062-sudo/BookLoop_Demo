import React from 'react';
import { 
  List, 
  Trash2, 
  Edit, 
  ShieldCheck, 
  Check, 
  X, 
  BookOpen, 
  Plus, 
  UserCheck, 
  Clock, 
  IndianRupee,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PageMyListings = () => {
  const { 
    myListings, 
    removeListing, 
    purchaseRequests, 
    updatePurchaseRequestStatus, 
    navigateTo,
    showToast
  } = useApp();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-soft">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <List className="w-6 h-6 text-teal-600" />
              My Listings & Exchange Requests
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage your listed textbooks and respond to peer purchase requests.
            </p>
          </div>

          <button
            onClick={() => navigateTo('sell')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>List Another Book</span>
          </button>
        </div>

        {/* SECTION 1: PURCHASE REQUESTS RECEIVED */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-teal-600" />
              PURCHASE REQUESTS ({purchaseRequests.length})
            </h2>
            <span className="text-xs text-teal-700 font-semibold bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Campus Handover Queue
            </span>
          </div>

          {purchaseRequests.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 text-xs">
              No pending purchase requests right now.
            </div>
          ) : (
            <div className="space-y-4">
              {purchaseRequests.map((req) => (
                <div 
                  key={req.id} 
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-slate-900 text-teal-400 font-bold flex items-center justify-center overflow-hidden border border-teal-500/30 shrink-0">
                      {req.buyerAvatar ? (
                        <img src={req.buyerAvatar} alt={req.buyer} className="w-full h-full object-cover" />
                      ) : (
                        req.buyer[0]
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-slate-900 text-sm">Buyer: {req.buyer}</span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified Student
                        </span>
                      </div>

                      <p className="text-xs text-slate-600">
                        Requested Textbook: <strong className="text-slate-900">{req.bookTitle}</strong> (₹{req.bookPrice})
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-teal-600" /> {req.timestamp}
                        </span>
                        <span>•</span>
                        <span>Location: {req.meetingPreference}</span>
                      </div>
                    </div>
                  </div>

                  {/* Request Status & Action Buttons */}
                  <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                    {req.status === 'Accepted' ? (
                      <span className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-300 font-extrabold text-xs rounded-xl flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        REQUEST ACCEPTED
                      </span>
                    ) : req.status === 'Rejected' ? (
                      <span className="px-4 py-2 bg-rose-50 text-rose-700 border border-rose-300 font-extrabold text-xs rounded-xl flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        REQUEST REJECTED
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => updatePurchaseRequestStatus(req.id, 'Accepted')}
                          className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          <span>[ ACCEPT ]</span>
                        </button>
                        <button
                          onClick={() => updatePurchaseRequestStatus(req.id, 'Rejected')}
                          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-100 hover:text-rose-700 text-slate-700 font-extrabold text-xs flex items-center gap-1.5 border border-slate-200 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>[ REJECT ]</span>
                        </button>
                      </>
                    )}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2: MY ACTIVE LISTINGS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-600" />
              MY LISTED TEXTBOOKS ({myListings.length})
            </h2>
          </div>

          {myListings.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
              <p className="text-sm font-semibold text-slate-700">You haven't listed any textbooks yet.</p>
              <button
                onClick={() => navigateTo('sell')}
                className="px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-colors"
              >
                List Your First Textbook
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myListings.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-2xl border border-slate-200 shadow-soft p-5 flex flex-col justify-between space-y-4 hover:shadow-hover transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-700 text-xs font-bold border border-teal-200">
                        {item.edition}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-extrabold border border-emerald-200 uppercase">
                        Status: {item.status || 'ACTIVE'}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Author: <span className="font-semibold text-slate-800">{item.author}</span>
                      </p>
                    </div>

                    <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Condition</span>
                        <span className="text-xs font-bold text-slate-800">{item.condition}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-bold uppercase block">Price</span>
                        <span className="text-xl font-extrabold text-slate-900">₹{item.price}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons: EDIT and REMOVE */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => showToast(`Edit mode opened for "${item.title}"`, 'info')}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>[ EDIT ]</span>
                    </button>
                    <button
                      onClick={() => removeListing(item.id)}
                      className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 border border-rose-200 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>[ REMOVE ]</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
