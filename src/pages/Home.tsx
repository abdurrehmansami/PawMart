import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Heart, Sparkles, PawPrint } from 'lucide-react';
import { PRODUCTS } from '../data';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';

const CATEGORIES = [
  { name: 'Dog Food', icon: '🦴', color: 'bg-blue-50', text: 'text-blue-600' },
  { name: 'Cat Toys', icon: '🧶', color: 'bg-purple-50', text: 'text-purple-600' },
  { name: 'Grooming', icon: '✂️', color: 'bg-green-50', text: 'text-green-600' },
  { name: 'Accessories', icon: '👔', color: 'bg-amber-50', text: 'text-amber-600' },
  { name: 'Health & Wellness', icon: '💊', color: 'bg-rose-50', text: 'text-rose-600' },
];

export const Home = () => {
  const featuredProducts = PRODUCTS.filter(p => p.isFeatured).slice(0, 8);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-50 pt-16 lg:pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center space-x-2 bg-orange-100/50 px-3 py-1 rounded-full border border-orange-200">
                <Sparkles className="w-4 h-4 text-[#FF6B35]" />
                <span className="text-xs font-bold text-[#FF6B35] uppercase tracking-wider">Launch Celebration</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.1]">
                Everything your pet <span className="text-[#FF6B35]">dreams of</span> and more.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Premium food, engaging toys, and essential wellness products delivered right to your doorstep. Use code <span className="font-bold text-gray-900 underline">PAWS10</span> for 10% off.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/store"
                  className="bg-[#FF6B35] hover:bg-[#e85a24] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-200 transition-all flex items-center justify-center space-x-2 group"
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center px-6 py-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                         <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                      </div>
                    ))}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-bold text-gray-900">10k+ Happy Pets</p>
                    <div className="flex items-center">
                      <span className="text-amber-400">★★★★★</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2">
                <img
                  src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=1200&auto=format&fit=crop"
                  alt="Happy Golden Retriever"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl flex items-center space-x-4 border border-gray-50">
                 <div className="bg-green-100 p-3 rounded-2xl text-green-600">
                    <Truck className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-sm font-bold text-gray-900">Same-Day Delivery</p>
                    <p className="text-xs text-gray-500">Free on orders over $50</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 space-y-4 md:space-y-0">
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 italic">Shop by Category</h2>
            <p className="text-gray-500">Pick the best items for your furry friend</p>
          </div>
          <Link to="/store" className="text-[#FF6B35] font-bold flex items-center space-x-1 hover:underline">
            <span>View all categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/store?category=${encodeURIComponent(cat.name)}`}
                className={`flex flex-col items-center justify-center p-8 rounded-[2rem] ${cat.color} hover:shadow-lg transition-all duration-300 group aspect-square`}
              >
                <span className="text-5xl mb-4 group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className={`font-bold text-sm text-center ${cat.text}`}>{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-orange-50 p-4 rounded-2xl shrink-0"><Truck className="w-6 h-6 text-[#FF6B35]" /></div>
              <div><h4 className="font-bold text-gray-900">Fast Delivery</h4><p className="text-sm text-gray-500">Ships within 24 hours</p></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-orange-50 p-4 rounded-2xl shrink-0"><ShieldCheck className="w-6 h-6 text-[#FF6B35]" /></div>
              <div><h4 className="font-bold text-gray-900">Secure Payment</h4><p className="text-sm text-gray-500">100% encryption</p></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-orange-50 p-4 rounded-2xl shrink-0"><Heart className="w-6 h-6 text-[#FF6B35]" /></div>
              <div><h4 className="font-bold text-gray-900">Pet Approved</h4><p className="text-sm text-gray-500">Tested by professionals</p></div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-orange-50 p-4 rounded-2xl shrink-0"><ShieldCheck className="w-6 h-6 text-[#FF6B35]" /></div>
              <div><h4 className="font-bold text-gray-900">Returns Policy</h4><p className="text-sm text-gray-500">30 days easy returns</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-gray-900">Bestselling Favorites</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Discover what other pet parents are loving right now. Our most popular picks for your happy pets.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16 text-center">
            <Link
              to="/store"
              className="inline-flex items-center space-x-2 bg-gray-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-gray-100"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FF6B35] rounded-[3rem] overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <PawPrint className="w-64 h-64 text-white rotate-12" />
          </div>
          <div className="p-12 lg:p-20 relative z-10 flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
             <div className="text-white space-y-4 max-w-lg">
                <span className="text-sm font-black uppercase tracking-[0.2em]">Limited Time Offer</span>
                <h2 className="text-5xl font-black leading-tight">Join the pack and get 20% off</h2>
                <p className="text-orange-100 text-lg">Sign up for our newsletter today and receive a special discount on your first order over $40.</p>
             </div>
             <div className="bg-white/10 p-2 rounded-2xl backdrop-blur-md flex flex-col sm:flex-row w-full lg:w-auto space-y-2 sm:space-y-0 sm:space-x-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-white px-8 py-4 rounded-xl focus:outline-none w-full sm:w-80 font-bold"
                />
                <button className="bg-gray-900 text-white px-8 py-4 rounded-xl font-black hover:bg-black transition-all shrink-0">
                  Subscribe Now
                </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};
