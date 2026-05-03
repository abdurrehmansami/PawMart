import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, PawPrint } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/store?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-[#FF6B35] p-1.5 rounded-lg group-hover:rotate-12 transition-transform duration-300">
              <PawPrint className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#FF6B35]">PawMart</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-[#FF6B35] font-medium transition-colors">Home</Link>
            <Link to="/store" className="text-gray-600 hover:text-[#FF6B35] font-medium transition-colors">Shop</Link>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent w-64 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-5">
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
                  <button onClick={logout} className="text-sm text-gray-500 hover:text-[#FF6B35]">Logout</button>
                </div>
              ) : (
                <Link to="/login" className="flex items-center space-x-1 text-gray-600 hover:text-[#FF6B35] transition-colors">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
              )}
            </div>
            <Link to="/cart" className="relative p-2 text-gray-600 hover:text-[#FF6B35] transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#FF6B35] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 text-gray-600">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#FF6B35] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-[#FF6B35] focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <form onSubmit={handleSearch} className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </form>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#FF6B35]">Home</Link>
              <Link to="/store" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#FF6B35]">Shop</Link>
              <div className="border-t border-gray-100 pt-4">
                {user ? (
                  <div className="px-3 py-2 space-y-2">
                    <p className="text-sm font-medium text-gray-900">Signed in as {user.name}</p>
                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-[#FF6B35] font-medium">Logout</button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#FF6B35]">Login</Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
