import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USER, MOCK_BOOKS, INITIAL_MY_LISTINGS, INITIAL_PURCHASE_REQUESTS } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Authentication & User state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bookloop_user');
    return saved ? JSON.parse(saved) : MOCK_USER;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('bookloop_is_logged_in');
    return saved !== null ? JSON.parse(saved) : true; // Default logged in for easy demo presentation!
  });

  // Navigation state
  const [currentPage, setCurrentPage] = useState('home'); // 'login' | 'home' | 'book-details' | 'sell' | 'my-listings' | 'checkout' | 'handover' | 'complete' | 'profile'

  // Books list & state
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('bookloop_books');
    return saved ? JSON.parse(saved) : MOCK_BOOKS;
  });

  const [selectedBook, setSelectedBook] = useState(() => {
    const saved = localStorage.getItem('bookloop_selected_book');
    return saved ? JSON.parse(saved) : MOCK_BOOKS[0]; // Default to Database Management Systems
  });

  // Seller Listings state
  const [myListings, setMyListings] = useState(() => {
    const saved = localStorage.getItem('bookloop_my_listings');
    return saved ? JSON.parse(saved) : INITIAL_MY_LISTINGS;
  });

  // Purchase requests on seller listings
  const [purchaseRequests, setPurchaseRequests] = useState(() => {
    const saved = localStorage.getItem('bookloop_purchase_requests');
    return saved ? JSON.parse(saved) : INITIAL_PURCHASE_REQUESTS;
  });

  // Active Transaction / Checkout Order state
  const [activeOrder, setActiveOrder] = useState(() => {
    const saved = localStorage.getItem('bookloop_active_order');
    return saved ? JSON.parse(saved) : {
      book: MOCK_BOOKS[0],
      bookPrice: 350,
      fee: 30,
      total: 380,
      paymentMethod: 'UPI',
      isPaid: false,
      handoverLocation: 'Campus Library',
      handoverDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      handoverTime: '02:00 PM',
      isHandoverScheduled: false,
      isCompleted: false,
      rating: 5,
    };
  });

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [selectedEdition, setSelectedEdition] = useState('All');
  const [maxPrice, setMaxPrice] = useState(1000);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('bookloop_user', JSON.stringify(user));
    localStorage.setItem('bookloop_is_logged_in', JSON.stringify(isLoggedIn));
    localStorage.setItem('bookloop_books', JSON.stringify(books));
    localStorage.setItem('bookloop_selected_book', JSON.stringify(selectedBook));
    localStorage.setItem('bookloop_my_listings', JSON.stringify(myListings));
    localStorage.setItem('bookloop_purchase_requests', JSON.stringify(purchaseRequests));
    localStorage.setItem('bookloop_active_order', JSON.stringify(activeOrder));
  }, [user, isLoggedIn, books, selectedBook, myListings, purchaseRequests, activeOrder]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Helper Actions
  const navigateTo = (page, bookData = null) => {
    if (bookData) {
      setSelectedBook(bookData);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginUser = (email, password) => {
    // Validates demo user credentials or allows demo bypass
    if (email === 'student@college.edu' && password === '123456') {
      setIsLoggedIn(true);
      setUser(MOCK_USER);
      showToast('Logged in successfully as Verified Student!');
      setCurrentPage('home');
      return true;
    } else if (email && password) {
      // Allow any demo user login for flexibility during viva
      setIsLoggedIn(true);
      setUser({
        ...MOCK_USER,
        email: email,
        name: email.split('@')[0].toUpperCase(),
      });
      showToast('Login successful!');
      setCurrentPage('home');
      return true;
    }
    return false;
  };

  const logoutUser = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
    showToast('Logged out of BookLoop', 'info');
  };

  const startCheckout = (book) => {
    setSelectedBook(book);
    setActiveOrder(prev => ({
      ...prev,
      book: book,
      bookPrice: book.price,
      fee: 30,
      total: book.price + 30,
      isPaid: false,
      isHandoverScheduled: false,
      isCompleted: false,
    }));
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completePayment = (paymentMethod = 'UPI') => {
    setActiveOrder(prev => ({
      ...prev,
      paymentMethod,
      isPaid: true,
      paidAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));
    showToast('Payment successful! Schedule your campus handover.');
    setCurrentPage('handover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmHandover = (location, date, time) => {
    setActiveOrder(prev => ({
      ...prev,
      handoverLocation: location,
      handoverDate: date,
      handoverTime: time,
      isHandoverScheduled: true,
    }));
    showToast('✓ Handover Scheduled successfully!');
    setCurrentPage('complete');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const finishTransaction = (rating = 5) => {
    setActiveOrder(prev => ({
      ...prev,
      isCompleted: true,
      rating: rating
    }));
    showToast('Transaction rated successfully! Thank you for reusing textbooks.');
  };

  const addListing = (newBook) => {
    const createdBook = {
      id: `book-${Date.now()}`,
      ...newBook,
      price: Number(newBook.price),
      seller: user.name.split(' ')[0],
      sellerEmail: user.email,
      sellerAvatar: user.avatar,
      sellerRating: 5.0,
      sellerCompletedExchanges: 1,
      isVerified: true,
      listedDate: 'Just now',
      coverColor: 'from-teal-600 to-navy-900',
    };

    setBooks(prev => [createdBook, ...prev]);

    const createdMyListing = {
      id: `my-${Date.now()}`,
      title: newBook.title,
      author: newBook.author,
      edition: newBook.edition,
      condition: newBook.condition,
      price: Number(newBook.price),
      subject: newBook.subject,
      status: 'ACTIVE',
      listedDate: 'Just now',
      coverColor: 'from-teal-600 to-navy-900',
      location: newBook.location || 'Campus Library'
    };

    setMyListings(prev => [createdMyListing, ...prev]);
    showToast('Your book has been listed successfully!');
    setCurrentPage('my-listings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const removeListing = (id) => {
    setMyListings(prev => prev.filter(item => item.id !== id));
    showToast('Listing removed successfully.', 'info');
  };

  const updatePurchaseRequestStatus = (id, newStatus) => {
    setPurchaseRequests(prev => prev.map(req => {
      if (req.id === id) {
        return { ...req, status: newStatus };
      }
      return req;
    }));
    showToast(`Purchase request ${newStatus.toLowerCase()}!`);
  };

  return (
    <AppContext.Provider value={{
      user,
      isLoggedIn,
      currentPage,
      books,
      selectedBook,
      myListings,
      purchaseRequests,
      activeOrder,
      searchQuery,
      selectedSubject,
      selectedCondition,
      selectedEdition,
      maxPrice,
      toast,
      setSearchQuery,
      setSelectedSubject,
      setSelectedCondition,
      setSelectedEdition,
      setMaxPrice,
      navigateTo,
      loginUser,
      logoutUser,
      startCheckout,
      completePayment,
      confirmHandover,
      finishTransaction,
      addListing,
      removeListing,
      updatePurchaseRequestStatus,
      showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
