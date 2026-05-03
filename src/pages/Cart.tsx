import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Minus, Plus, ArrowRight, Tag, Info } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'motion/react';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const navigate = useNavigate();

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - (subtotal * discount) + shipping;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'PAWS10') {
      setDiscount(0.1);
      setPromoError('');
    } else {
      setPromoError('Invalid promotion code');
      setDiscount(0);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto space-y-8 bg-gray-50 p-12 rounded-[3rem]">
          <div className="bg-white p-8 rounded-full shadow-lg inline-block text-gray-200">
            <ShoppingBag className="w-16 h-16" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-900 mb-2 italic">Your cart is empty</h2>
            <p className="text-gray-500">Looks like you haven't added anything yet. Your pets are waiting!</p>
          </div>
          <Link
            to="/store"
            className="inline-flex items-center space-x-2 bg-[#FF6B35] text-white px-10 py-4 rounded-2xl font-black hover:bg-[#e85a24] shadow-xl shadow-orange-100 w-full justify-center transition-all"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-black text-gray-900 mb-2 italic">Shopping Cart</h1>
      <p className="text-gray-500 mb-12">Review your selected items ({cart.length})</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white rounded-[2rem] border border-gray-100 p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 text-center sm:text-left min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6B35]">{item.category}</span>
                  <Link to={`/product/${item.id}`} className="block">
                     <h3 className="text-lg font-bold text-gray-900 hover:text-[#FF6B35] transition-colors truncate">{item.name}</h3>
                  </Link>
                  <p className="text-gray-900 font-black mt-1">${item.price.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl p-0.5">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-black">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-rose-500 transition-colors bg-gray-50 rounded-xl hover:bg-rose-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <ShoppingBag className="w-32 h-32" />
            </div>
            
            <h2 className="text-2xl font-black italic mb-8 relative z-10">Order Summary</h2>
            
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between text-gray-400 font-bold uppercase tracking-widest text-xs">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400 font-bold uppercase tracking-widest text-xs">
                <span>Shipping</span>
                <span className="text-white">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-orange-400 font-bold uppercase tracking-widest text-xs">
                  <span>Discount (10%)</span>
                  <span>-${(subtotal * discount).toFixed(2)}</span>
                </div>
              )}
              
              <div className="border-t border-gray-800 my-6 pt-6 flex justify-between items-end">
                <div>
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Total Amount</span>
                  <p className="text-4xl font-black leading-none">${total.toFixed(2)}</p>
                </div>
                {shipping > 0 && (
                  <span className="text-[10px] text-orange-400 font-black animate-pulse">Add ${ (51 - subtotal).toFixed(2) } for free shipping!</span>
                )}
              </div>
            </div>

            <div className="mt-10 relative z-10">
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-[#FF6B35] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#e85a24] transition-all flex items-center justify-center space-x-3 shadow-xl shadow-orange-900/20 active:scale-[0.98]"
              >
                <span>Checkout Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Promo Code */}
          <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm">
            <div className="flex items-center space-x-2 text-gray-400 font-black uppercase tracking-widest text-[10px] mb-4">
               <Tag className="w-4 h-4 text-[#FF6B35]" />
               <span>Promo Code</span>
            </div>
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="PROMO10" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-[#FF6B35] transition-all"
              />
              <button 
                onClick={handleApplyPromo}
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 rounded-xl font-bold transition-all"
              >
                Apply
              </button>
            </div>
            {promoError && <p className="text-rose-500 text-xs font-bold mt-2 ml-1">{promoError}</p>}
            {discount > 0 && <p className="text-green-600 text-xs font-bold mt-2 ml-1">✓ Promo code applied successfully!</p>}
            
            <div className="mt-6 flex items-start space-x-3 bg-orange-50 p-4 rounded-xl">
               <Info className="w-5 h-5 text-[#FF6B35] shrink-0" />
               <p className="text-xs text-orange-700 leading-relaxed">
                  <strong>PRO TIP:</strong> Use code <span className="font-bold">PAWS10</span> at checkout to receive 10% off your entire order today!
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
