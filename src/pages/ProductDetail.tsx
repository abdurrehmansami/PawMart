import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Minus, Plus, ChevronLeft, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { PRODUCTS } from '../data';
import { useCart } from '../contexts/CartContext';
import { ProductCard } from '../components/ProductCard';
import { motion } from 'motion/react';

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const product = PRODUCTS.find(p => p.id === id);
  const [imgSrc, setImgSrc] = useState(product?.image || '');

  React.useEffect(() => {
    if (product) setImgSrc(product.image);
  }, [product]);

  const handleImageError = () => {
    setImgSrc('https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=800&auto=format&fit=crop');
  };

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <Link to="/store" className="text-[#FF6B35] font-bold underline">Back to store</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Link to="/store" className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-[#FF6B35] mb-12 transition-colors group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-[10px]">Back to Collection</span>
        </Link>

        {/* Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-start">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <div className="rounded-[2.5rem] overflow-hidden bg-gray-50 aspect-square shadow-xl border border-gray-100">
               <img 
                 src={imgSrc} 
                 alt={product.name} 
                 onError={handleImageError}
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="grid grid-cols-4 gap-4">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className="aspect-square rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden cursor-pointer hover:border-[#FF6B35] transition-colors">
                    <img src={imgSrc} alt={product.name} className="w-full h-full object-cover opacity-50 hover:opacity-100 transition-opacity" />
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Details */}
          <div className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6B35] bg-orange-50 px-3 py-1 rounded-full">{product.category}</span>
                <div className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full ${
                  product.stockStatus === 'In Stock' ? 'text-green-600 bg-green-50' : 'text-amber-600 bg-amber-50'
                }`}>
                  {product.stockStatus}
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight italic">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                  ))}
                  <span className="ml-2 text-sm font-bold text-gray-900">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-400 font-bold uppercase tracking-widest">{product.reviews} Reviews</span>
              </div>
            </div>

            <div className="flex items-baseline space-x-4 border-y border-gray-100 py-8">
              <span className="text-5xl font-black text-gray-900 tracking-tighter">${product.price.toFixed(2)}</span>
              <span className="text-gray-400 line-through text-xl tracking-tighter">${(product.price * 1.2).toFixed(2)}</span>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              {product.description}
            </p>

            <div className="space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1 bg-gray-50 h-16 sm:w-40">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex-1 flex justify-center text-gray-500 hover:text-[#FF6B35]"
                    >
                      <Minus className="w-6 h-6" />
                    </button>
                    <span className="flex-1 text-center font-bold text-lg select-none">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex-1 flex justify-center text-gray-500 hover:text-[#FF6B35]"
                    >
                      <Plus className="w-6 h-6" />
                    </button>
                  </div>
                  <button 
                    onClick={() => addToCart(product, quantity)}
                    className="flex-1 bg-[#FF6B35] hover:bg-[#e85a24] text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-orange-100 flex items-center justify-center space-x-3 transition-all active:scale-[0.98]"
                  >
                    <ShoppingCart className="w-6 h-6" />
                    <span>Add to Cart</span>
                  </button>
                </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
               <div className="flex flex-col items-center p-4 rounded-2xl bg-gray-50 text-center space-y-2">
                  <Truck className="w-6 h-6 text-[#FF6B35]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Free Shipping</span>
               </div>
               <div className="flex flex-col items-center p-4 rounded-2xl bg-gray-50 text-center space-y-2">
                  <ShieldCheck className="w-6 h-6 text-[#FF6B35]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Secure Checkout</span>
               </div>
               <div className="flex flex-col items-center p-4 rounded-2xl bg-gray-50 text-center space-y-2">
                  <RefreshCcw className="w-6 h-6 text-[#FF6B35]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">30 Day Returns</span>
               </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 space-y-12">
            <div className="flex justify-between items-end">
               <div>
                  <h2 className="text-3xl font-black text-gray-900 border-l-4 border-[#FF6B35] pl-6 italic">Related Treasures</h2>
                  <p className="text-gray-500 pl-6 mt-2">More items from the {product.category} collection</p>
               </div>
               <Link to={`/store?category=${encodeURIComponent(product.category)}`} className="text-[#FF6B35] font-bold hover:underline">View all</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
