import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  BookOpen, 
  Lock, 
  Sparkles, 
  Info,
  ArrowRight,
  Receipt
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PageCheckout = () => {
  const { activeOrder, completePayment, navigateTo } = useApp();
  const [paymentOption, setPaymentOption] = useState('UPI'); // 'UPI' | 'Card' | 'Demo'

  const book = activeOrder.book || {
    title: "Database Management Systems",
    price: 350,
    edition: "3rd Edition",
    seller: "Rahul"
  };

  const bookPrice = activeOrder.bookPrice || 350;
  const fee = activeOrder.fee || 30;
  const total = bookPrice + fee;

  const handlePay = () => {
    completePayment(paymentOption);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Receipt className="w-3.5 h-3.5" /> Peer Escrow Checkout
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Confirm Purchase
              </h1>
              <p className="text-slate-400 text-xs mt-1">
                Verified campus transaction. Funds held safely until handover is completed.
              </p>
            </div>

            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center font-bold">
              <Lock className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Order Breakdown Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sm:p-8 space-y-6">
          
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-3">
              Item Summary
            </h2>
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-teal-400 flex items-center justify-center font-bold shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{book.title}</h3>
                  <p className="text-xs text-slate-500">Edition: {book.edition || '3rd Edition'} • Seller: {book.seller || 'Rahul'}</p>
                </div>
              </div>

              <span className="font-extrabold text-slate-900 text-base">₹{bookPrice}</span>
            </div>
          </div>

          {/* Pricing Breakdown Table */}
          <div className="space-y-3 pt-2">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">
              Payment Breakdown
            </h2>

            <div className="space-y-2 text-sm text-slate-600 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center">
                <span>Book Price:</span>
                <span className="font-bold text-slate-800">₹{bookPrice}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                  BookLoop transaction fee:
                  <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">Fixed</span>
                </span>
                <span className="font-bold text-slate-800">₹{fee}</span>
              </div>

              <div className="border-t border-slate-200 pt-3 flex justify-between items-center text-base">
                <span className="font-extrabold text-slate-900">TOTAL:</span>
                <span className="font-extrabold text-2xl text-slate-900">₹{total}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3 pt-2">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500">
              Select Payment Method (Demo)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              {/* Option 1: UPI */}
              <label 
                onClick={() => setPaymentOption('UPI')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  paymentOption === 'UPI'
                    ? 'border-teal-500 bg-teal-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentOption === 'UPI'} 
                  onChange={() => setPaymentOption('UPI')}
                  className="accent-teal-600" 
                />
                <QrCode className="w-5 h-5 text-teal-600 shrink-0" />
                <div>
                  <span className="font-bold text-xs text-slate-900 block">UPI</span>
                  <span className="text-[10px] text-slate-500">GooglePay / PhonePe / Paytm</span>
                </div>
              </label>

              {/* Option 2: Card */}
              <label 
                onClick={() => setPaymentOption('Card')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  paymentOption === 'Card'
                    ? 'border-teal-500 bg-teal-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentOption === 'Card'} 
                  onChange={() => setPaymentOption('Card')}
                  className="accent-teal-600" 
                />
                <CreditCard className="w-5 h-5 text-teal-600 shrink-0" />
                <div>
                  <span className="font-bold text-xs text-slate-900 block">Card</span>
                  <span className="text-[10px] text-slate-500">Debit / Credit Card</span>
                </div>
              </label>

              {/* Option 3: Demo Payment */}
              <label 
                onClick={() => setPaymentOption('Demo Payment')}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 ${
                  paymentOption === 'Demo Payment'
                    ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  checked={paymentOption === 'Demo Payment'} 
                  onChange={() => setPaymentOption('Demo Payment')}
                  className="accent-amber-600" 
                />
                <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <span className="font-bold text-xs text-slate-900 block">Demo Payment</span>
                  <span className="text-[10px] text-amber-700 font-semibold">Instant Simulated Pay</span>
                </div>
              </label>

            </div>
          </div>

          {/* Demo Note */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Case Study Prototype Note:</strong> This is only a demo payment simulation. No real funds are deducted.
            </span>
          </div>

          {/* Warm Accent Payment Button: [ PAY ₹380 ] */}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handlePay}
              className="w-full py-4 px-6 rounded-2xl font-extrabold text-base bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              <span>[ PAY ₹{total} ]</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
