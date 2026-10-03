import React, { useState } from 'react';
import { 
  PlusCircle, 
  Upload, 
  IndianRupee, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Info, 
  MapPin,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PageSellBook = () => {
  const { addListing, navigateTo } = useApp();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [edition, setEdition] = useState('3rd Edition');
  const [subject, setSubject] = useState('Computer Science');
  const [condition, setCondition] = useState('Very Good');
  const [price, setPrice] = useState('350');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Campus Library');
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !price) return;

    addListing({
      title,
      author,
      edition,
      subject,
      condition,
      price: Number(price),
      description: description || 'Used textbook in good condition.',
      location,
      originalPrice: Number(price) + 300,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="space-y-2 z-10 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Peer Resale Portal
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Sell Your Textbook
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Pass your textbooks to junior students on campus. Earn cash quickly and help reduce educational costs.
            </p>
          </div>

          {/* Average Resale Value Callout Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-teal-500/15 border border-teal-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 font-bold flex items-center justify-center shrink-0">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-teal-300 font-bold block">Resale Valuation Benchmark</span>
                <p className="text-sm font-semibold">Average resale value in this case: <strong className="text-teal-400 font-extrabold text-base">₹450</strong></p>
              </div>
            </div>

            <div className="text-xs bg-slate-950/60 px-3 py-1.5 rounded-lg border border-white/10 text-slate-300 flex items-center gap-1.5 shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Campus Handover</span>
            </div>
          </div>

          <BookOpen className="w-44 h-44 absolute -right-8 -bottom-8 text-white/5 pointer-events-none" />
        </div>

        {/* Sell Book Form Card */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/90 shadow-soft p-6 sm:p-8 space-y-6">
          
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Textbook Details</h2>
            <p className="text-xs text-slate-500">Provide clear information so fellow students can easily find your book.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Book Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Book Name *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Database Management Systems"
                className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl py-3 px-4 text-sm text-slate-900 font-medium placeholder-slate-400 transition-all"
                required
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Author *
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Raghu Ramakrishnan"
                className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl py-3 px-4 text-sm text-slate-900 font-medium placeholder-slate-400 transition-all"
                required
              />
            </div>

            {/* Edition */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Edition *
              </label>
              <select
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl py-3 px-4 text-sm text-slate-900 font-medium transition-all"
              >
                <option value="1st Edition">1st Edition</option>
                <option value="2nd Edition">2nd Edition</option>
                <option value="3rd Edition">3rd Edition</option>
                <option value="4th Edition">4th Edition</option>
                <option value="5th Edition">5th Edition</option>
                <option value="6th Edition">6th Edition</option>
                <option value="Latest Edition">Latest Edition</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Subject / Department *
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl py-3 px-4 text-sm text-slate-900 font-medium transition-all"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics & Electrical">Electronics & Electrical</option>
                <option value="Mechanical & Civil">Mechanical & Civil</option>
                <option value="Management & Humanities">Management & Humanities</option>
                <option value="Mathematics & Science">Mathematics & Science</option>
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Condition *
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl py-3 px-4 text-sm text-slate-900 font-medium transition-all"
              >
                <option value="Excellent">Excellent (Like New)</option>
                <option value="Very Good">Very Good (Clean, minor wear)</option>
                <option value="Good">Good (Pencil notes/highlights)</option>
                <option value="Fair">Fair (Well used, complete pages)</option>
              </select>
            </div>

            {/* Price (₹) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Resale Price (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-extrabold text-slate-500 text-sm">₹</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="350"
                  min="50"
                  max="5000"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl py-3 pl-8 pr-4 text-sm font-extrabold text-slate-900 transition-all"
                  required
                />
              </div>
            </div>

            {/* Preferred Handover Location */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Campus Handover Location *
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl py-3 px-4 text-sm text-slate-900 font-medium transition-all"
              >
                <option value="Campus Library">Campus Library (Main Entrance)</option>
                <option value="Student Activity Center">Student Activity Center (SAC)</option>
                <option value="Central Canteen">Central Canteen & Plaza</option>
                <option value="Science Block Courtyard">Science Block Courtyard</option>
              </select>
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Description & Notes
              </label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mention any highlights, included notes, or condition details (e.g. Used for one semester. Pages are in good condition with minor notes.)"
                className="w-full bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 rounded-xl py-3 px-4 text-sm text-slate-900 font-medium placeholder-slate-400 transition-all"
              />
            </div>

            {/* Upload Photos */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Upload Textbook Photos
              </label>
              
              <div className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl p-6 text-center bg-slate-50 transition-colors relative cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />
                
                {imagePreview ? (
                  <div className="relative inline-block max-h-40 overflow-hidden rounded-xl border border-slate-300">
                    <img src={imagePreview} alt="Preview" className="max-h-40 object-cover rounded-xl" />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setImagePreview(null); }}
                      className="absolute top-2 right-2 p-1 bg-slate-900/80 text-white rounded-full hover:bg-rose-600 transition-colors z-20"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block">Click or Drag textbook photos here</span>
                      <span className="text-[11px] text-slate-400">Supports PNG, JPG (Front cover, spine, sample page)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Will be immediately listed as <strong className="text-emerald-600 uppercase font-bold">ACTIVE</strong></span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="px-4 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3.5 rounded-xl font-extrabold text-xs bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02] w-full sm:w-auto"
              >
                <PlusCircle className="w-4 h-4" />
                <span>[ LIST BOOK ]</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
