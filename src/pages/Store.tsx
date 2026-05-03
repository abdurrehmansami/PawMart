import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, SlidersHorizontal, Search, X } from 'lucide-react';
import { PRODUCTS, Product } from '../data';
import { ProductCard } from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES = ['All', 'Dog Food', 'Cat Toys', 'Grooming', 'Accessories', 'Health & Wellness'];
const RATINGS = [5, 4, 3, 2];

export const Store = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(100);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price <= priceRange;
      const matchesRating = product.rating >= minRating;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesPrice && matchesRating && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // popular
    });
  }, [selectedCategory, priceRange, minRating, sortBy, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setPriceRange(100);
    setMinRating(0);
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0 text-center md:text-left">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">Our Collection</h1>
          <p className="text-gray-500">Showing {filteredProducts.length} premium products</p>
        </div>
        
        <div className="flex items-center space-x-4 self-center">
           <div className="md:hidden">
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center space-x-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold shadow-sm"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filters</span>
              </button>
           </div>
           
           <div className="relative group">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 px-6 py-2.5 pr-10 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#FF6B35] cursor-pointer"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
           </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Filters - Desktop */}
        <aside className="hidden lg:block w-64 space-y-10 shrink-0">
          <div className="relative">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center">
              <Search className="w-4 h-4 mr-2" /> Search
            </h3>
            <input 
              type="text" 
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#FF6B35] transition-all"
            />
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Category</h3>
            <div className="space-y-3">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`block w-full text-left px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    selectedCategory === cat ? 'bg-[#FF6B35] text-white' : 'hover:bg-orange-50 text-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">Price Range</h3>
              <span className="text-sm font-bold text-[#FF6B35]">${priceRange}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
            />
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Min Rating</h3>
            <div className="flex space-x-2">
              {RATINGS.map(rating => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating === minRating ? 0 : rating)}
                  className={`p-2 rounded-xl transition-all border ${
                    minRating >= rating ? 'bg-[#FF6B35] border-[#FF6B35] text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-bold text-xs">{rating}+</span>
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={resetFilters}
            className="w-full text-xs font-black uppercase tracking-widest text-gray-400 hover:text-[#FF6B35] transition-colors pt-4 text-center border-t border-gray-100"
          >
            Clear all filters
          </button>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-[3rem] py-20 text-center space-y-6">
              <div className="flex justify-center">
                 <div className="bg-white p-6 rounded-full shadow-lg">
                    <Search className="w-12 h-12 text-gray-300" />
                 </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">No products found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
              </div>
              <button 
                onClick={resetFilters}
                className="bg-[#FF6B35] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#e85a24]"
              >
                See All Products
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden flex items-end"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white w-full rounded-t-[3rem] p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                 <h2 className="text-2xl font-black italic">Filters</h2>
                 <button onClick={() => setShowMobileFilters(false)} className="p-2 bg-gray-100 rounded-full">
                    <X className="w-6 h-6" />
                 </button>
              </div>

              <div className="space-y-10">
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#FF6B35] mb-4">Search</h3>
                  <input 
                    type="text" 
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#FF6B35]"
                  />
                </div>

                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#FF6B35] mb-4">Category</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                          selectedCategory === cat ? 'bg-[#FF6B35] border-[#FF6B35] text-white shadow-lg' : 'bg-white border-gray-100 text-gray-600'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#FF6B35]">Max Price: ${priceRange}</h3>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#FF6B35]"
                  />
                </div>

                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black shadow-xl"
                >
                  Show {filteredProducts.length} Items
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
