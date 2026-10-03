import React, { useMemo } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  IndianRupee, 
  ArrowRight, 
  Sparkles, 
  BookMarked,
  Layers,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PageHome = () => {
  const { 
    books, 
    searchQuery, 
    setSearchQuery, 
    selectedSubject, 
    setSelectedSubject, 
    selectedCondition, 
    setSelectedCondition, 
    selectedEdition, 
    setSelectedEdition,
    maxPrice,
    setMaxPrice,
    navigateTo 
  } = useApp();

  const subjects = ['All', 'Computer Science', 'Electronics & Electrical', 'Management & Humanities', 'Mathematics & Science'];
  const conditions = ['All', 'Excellent', 'Very Good', 'Good', 'Fair'];
  const editions = ['All', '3rd Edition', '4th Edition', '5th Edition', '6th Edition'];

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchQuery = 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.subject.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchSubject = selectedSubject === 'All' || book.subject === selectedSubject;
      const matchCondition = selectedCondition === 'All' || book.condition === selectedCondition;
      const matchEdition = selectedEdition === 'All' || book.edition === selectedEdition;
      const matchPrice = book.price <= maxPrice;

      return matchQuery && matchSubject && matchCondition && matchEdition && matchPrice;
    });
  }, [books, searchQuery, selectedSubject, selectedCondition, selectedEdition, maxPrice]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSubject('All');
    setSelectedCondition('All');
    setSelectedEdition('All');
    setMaxPrice(1000);
  };

  return (
    <div className="min-h-screen pb-16 bg-slate-50 text-slate-900">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-navy-950 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Peer-to-Peer Campus Marketplace
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Find affordable textbooks on your <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">campus.</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Direct student-to-student exchange. Zero shipping fees, verified student profiles, and convenient campus library handovers.
          </p>

          {/* Interactive Search Bar */}
          <div className="max-w-3xl mx-auto pt-2">
            <div className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/80 focus-within:border-teal-400 transition-all">
              <Search className="w-6 h-6 absolute left-4 text-teal-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by book name, subject or author (e.g. DBMS, Networks, Tanenbaum)"
                className="w-full py-4 pl-13 pr-28 text-white placeholder-slate-400 bg-transparent text-sm sm:text-base focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mr-2 text-xs font-semibold px-2 py-1 text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
              <button 
                className="mr-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-xs sm:text-sm hover:from-teal-400 hover:to-emerald-400 transition-all shadow-md shadow-teal-500/20"
              >
                Search
              </button>
            </div>
          </div>

          {/* Case Study Resale Banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 pt-4 text-xs font-medium text-slate-300">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <span className="text-teal-400 font-bold">Resale Insight:</span> Average resale value ₹450
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <span className="text-emerald-400 font-bold">Platform Fee:</span> Fixed ₹30 per handover
            </span>
          </div>

        </div>
      </section>

      {/* Main Content & Filter Drawer/Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        
        {/* Controls Bar */}
        <div className="bg-white rounded-2xl p-5 shadow-soft border border-slate-200/80 space-y-4">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-teal-600" />
              <h3 className="font-bold text-slate-900 text-sm">Filter Textbooks</h3>
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-semibold">
                {filteredBooks.length} Available
              </span>
            </div>

            {(selectedSubject !== 'All' || selectedCondition !== 'All' || selectedEdition !== 'All' || searchQuery || maxPrice < 1000) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            )}
          </div>

          {/* Filter Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Subject Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-xl py-2.5 px-3 focus:outline-none focus:border-teal-500"
              >
                {subjects.map((sub, i) => (
                  <option key={i} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            {/* Condition Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Condition</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-xl py-2.5 px-3 focus:outline-none focus:border-teal-500"
              >
                {conditions.map((cond, i) => (
                  <option key={i} value={cond}>{cond}</option>
                ))}
              </select>
            </div>

            {/* Edition Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Edition</label>
              <select
                value={selectedEdition}
                onChange={(e) => setSelectedEdition(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium rounded-xl py-2.5 px-3 focus:outline-none focus:border-teal-500"
              >
                {editions.map((ed, i) => (
                  <option key={i} value={ed}>{ed}</option>
                ))}
              </select>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-600">Max Price</label>
                <span className="text-xs font-bold text-teal-700">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="200"
                max="1000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-teal-600 bg-slate-200 rounded-lg h-2 cursor-pointer mt-2"
              />
            </div>

          </div>

        </div>

        {/* Listings Cards Grid */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Campus Textbook Listings
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              Showing verified student uploads
            </span>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm max-w-md mx-auto my-8 space-y-4">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <BookMarked className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-800 text-base">No matching textbooks found</h3>
              <p className="text-xs text-slate-500">
                Try clearing your search query or adjusting subject and price filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold rounded-xl hover:bg-teal-100 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-soft hover:shadow-hover transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
                >
                  {/* Book Card Visual Banner */}
                  <div>
                    <div className={`h-36 bg-gradient-to-br ${book.coverColor || 'from-slate-800 to-navy-900'} p-4 text-white relative flex flex-col justify-between overflow-hidden`}>
                      
                      <div className="flex items-center justify-between z-10">
                        <span className="px-2.5 py-1 rounded-full bg-slate-900/60 backdrop-blur-md text-[11px] font-bold text-teal-300 border border-white/10">
                          {book.edition}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-slate-950 text-[11px] font-extrabold shadow-sm">
                          {book.condition}
                        </span>
                      </div>

                      <div className="z-10 mt-auto">
                        <span className="text-[10px] uppercase font-bold text-teal-200/90 tracking-wider">
                          {book.subject}
                        </span>
                        <h3 className="font-extrabold text-base leading-snug line-clamp-2 text-white group-hover:text-teal-200 transition-colors">
                          {book.title}
                        </h3>
                      </div>

                      {/* Decorative Book Motif */}
                      <BookOpen className="w-24 h-24 absolute -right-6 -bottom-6 text-white/10 pointer-events-none" />
                    </div>

                    {/* Book Metadata Content */}
                    <div className="p-5 space-y-3">
                      <div>
                        <p className="text-xs text-slate-500 font-medium line-clamp-1">
                          Author: <span className="text-slate-800 font-semibold">{book.author}</span>
                        </p>
                      </div>

                      {/* Price & Original Price */}
                      <div className="flex items-baseline justify-between pt-1">
                        <div>
                          <span className="text-xs text-slate-400 font-medium">Price</span>
                          <div className="flex items-center gap-1">
                            <span className="text-2xl font-extrabold text-slate-900">₹{book.price}</span>
                            {book.originalPrice && (
                              <span className="text-xs text-slate-400 line-through">₹{book.originalPrice}</span>
                            )}
                          </div>
                        </div>

                        {/* Location Pill */}
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-medium block">Handover</span>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700">
                            <MapPin className="w-3 h-3 text-teal-600" />
                            {book.location?.split(' ')[0] || 'Library'}
                          </span>
                        </div>
                      </div>

                      {/* Seller Info Badge */}
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 mt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-teal-700 text-white font-bold text-xs flex items-center justify-center overflow-hidden border border-teal-500/30">
                            {book.sellerAvatar ? (
                              <img src={book.sellerAvatar} alt={book.seller} className="w-full h-full object-cover" />
                            ) : (
                              book.seller[0]
                            )}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-900 block leading-tight">
                              Seller: {book.seller}
                            </span>
                            <span className="text-[10px] text-slate-500">Student</span>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* View Details Action Button */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => navigateTo('book-details', book)}
                      className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white transition-all flex items-center justify-center gap-2 shadow-sm group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-navy-900"
                    >
                      <span>VIEW DETAILS</span>
                      <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
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
