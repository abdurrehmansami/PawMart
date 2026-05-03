import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { CheckCircle, ArrowLeft, ArrowRight, CreditCard, Truck, User, Info, PartyPopper } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Checkout = () => {
  const [step, setStep] = useState(1);
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderComplete, setOrderComplete] = useState(false);

  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    cardExp: '',
    cardCvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="max-w-2xl mx-auto bg-white rounded-[3rem] shadow-2xl p-12 text-center space-y-8 relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 text-orange-50 rotate-12">
             <PartyPopper className="w-64 h-64" />
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="bg-green-100 p-6 rounded-full inline-block mb-6">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
            <h2 className="text-5xl font-black text-gray-900 leading-tight italic">Order Confirmed!</h2>
            <p className="text-xl text-gray-500 mt-4 max-w-md mx-auto">
              Thank you for shopping at <span className="text-[#FF6B35] font-bold underline italic">PawMart</span>. Your furry friends are going to love their new goodies!
            </p>
            <div className="bg-gray-50 p-6 rounded-3xl mt-12 w-full text-left space-y-3">
               <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Order Number</span>
                  <span className="font-mono font-bold text-[#FF6B35]">#PM-{Math.floor(Math.random() * 89999) + 10000}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Estimated Delivery</span>
                  <span className="font-bold text-gray-900">May 15 - 18, 2026</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Total Charged</span>
                  <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
               </div>
            </div>
            <Link 
              to="/store"
              className="mt-12 bg-gray-900 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-xl block w-full sm:w-auto"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
           <h1 className="text-4xl font-black text-gray-900 mb-6 italic">Secure Checkout</h1>
           <div className="flex items-center justify-center space-x-2">
              {[1, 2, 3].map((s) => (
                <React.Fragment key={s}>
                  <div className={`flex flex-col items-center ${step === s ? 'text-[#FF6B35]' : step > s ? 'text-green-600' : 'text-gray-300'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black border-2 transition-all ${
                      step === s ? 'bg-[#FF6B35] border-[#FF6B35] text-white shadow-lg shadow-orange-100' : 
                      step > s ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-gray-200'
                    }`}>
                      {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                    </div>
                    <span className="text-[10px] uppercase font-bold mt-2 tracking-widest">
                       {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
                    </span>
                  </div>
                  {s < 3 && <div className={`w-16 h-0.5 mt-[-18px] hidden sm:block ${step > s ? 'bg-green-600' : 'bg-gray-100'}`}></div>}
                </React.Fragment>
              ))}
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Main Form */}
          <div className="lg:col-span-3">
             <form onSubmit={handleSubmit} className="space-y-8 bg-white border border-gray-100 p-8 sm:p-12 rounded-[3rem] shadow-sm">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                        <Truck className="w-6 h-6 mr-3 text-[#FF6B35]" /> Shipping Details
                      </h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Full Name</label>
                            <input id="name" type="text" value={formData.name} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-[#FF6B35]" required />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email Address</label>
                            <input id="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-[#FF6B35]" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-gray-400">Shipping Address</label>
                          <input id="address" type="text" value={formData.address} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-[#FF6B35]" required />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">City</label>
                            <input id="city" type="text" value={formData.city} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-[#FF6B35]" required />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Zip Code</label>
                            <input id="zip" type="text" value={formData.zip} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-[#FF6B35]" required />
                          </div>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={handleNext}
                        className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center space-x-3 hover:bg-black transition-all shadow-xl"
                      >
                        <span>Continue to Payment</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                        <CreditCard className="w-6 h-6 mr-3 text-[#FF6B35]" /> Payment Information
                      </h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-gray-400">Name on Card</label>
                          <input id="cardName" type="text" value={formData.cardName} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-[#FF6B35]" required />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-gray-400">Card Number</label>
                          <div className="relative">
                             <input id="cardNumber" type="text" placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl pl-4 pr-12 py-3 font-bold focus:ring-2 focus:ring-[#FF6B35]" required />
                             <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-300" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">Exp Date</label>
                            <input id="cardExp" type="text" placeholder="MM/YY" value={formData.cardExp} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-[#FF6B35]" required />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400">CVV</label>
                            <input id="cardCvv" type="password" placeholder="***" value={formData.cardCvv} onChange={handleInputChange} className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 font-bold focus:ring-2 focus:ring-[#FF6B35]" required />
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-4">
                        <button 
                          type="button" 
                          onClick={handleBack}
                          className="px-6 rounded-2xl border-2 border-gray-100 font-bold hover:bg-gray-50 transition-all"
                        >
                          <ArrowLeft className="w-6 h-6" />
                        </button>
                        <button 
                          type="button" 
                          onClick={handleNext}
                          className="flex-1 bg-gray-900 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center space-x-3 hover:bg-black transition-all shadow-xl"
                        >
                          <span>Review Your Order</span>
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                        <Info className="w-6 h-6 mr-3 text-[#FF6B35]" /> Order Review
                      </h2>
                      
                      <div className="space-y-6">
                        <div className="bg-gray-50 rounded-2xl p-6 relative overflow-hidden">
                           <div className="flex items-center justify-between mb-4">
                              <h3 className="text-sm font-black uppercase tracking-widest text-[#FF6B35] flex items-center">
                                 <User className="w-3.5 h-3.5 mr-2" /> Recipient
                              </h3>
                              <button onClick={() => setStep(1)} className="text-[10px] font-black uppercase text-gray-400 hover:text-gray-900 underline">Change</button>
                           </div>
                           <p className="font-bold text-gray-900">{formData.name}</p>
                           <p className="text-sm text-gray-500">{formData.email}</p>
                           <p className="text-sm text-gray-500 mt-2">{formData.address}, {formData.city} {formData.zip}</p>
                        </div>

                         <div className="bg-gray-50 rounded-2xl p-6">
                           <div className="flex items-center justify-between mb-4">
                              <h3 className="text-sm font-black uppercase tracking-widest text-[#FF6B35] flex items-center">
                                 <CreditCard className="w-3.5 h-3.5 mr-2" /> Payment
                              </h3>
                              <button onClick={() => setStep(2)} className="text-[10px] font-black uppercase text-gray-400 hover:text-gray-900 underline">Change</button>
                           </div>
                           <p className="font-bold text-gray-900">Card ending in {formData.cardNumber.slice(-4) || '****'}</p>
                           <p className="text-sm text-gray-500">{formData.cardName}</p>
                        </div>
                      </div>

                      <div className="flex space-x-4 pt-4 border-t border-gray-100">
                        <button 
                          type="button" 
                          onClick={handleBack}
                          className="px-6 rounded-2xl border-2 border-gray-100 font-bold hover:bg-gray-50 transition-all"
                        >
                          <ArrowLeft className="w-6 h-6" />
                        </button>
                        <button 
                          type="submit" 
                          className="flex-1 bg-[#FF6B35] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center space-x-3 hover:bg-[#e85a24] transition-all shadow-xl shadow-orange-100"
                        >
                          <span>Confirm Order (${total.toFixed(2)})</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </form>
          </div>

          {/* Side Summary */}
          <div className="lg:col-span-2 space-y-6">
             <div className="bg-gray-900 text-white rounded-[3rem] p-8 shadow-xl">
                <h3 className="text-lg font-black uppercase tracking-widest text-orange-400 mb-6 italic">Bag Summary</h3>
                <div className="space-y-4 max-h-64 overflow-y-auto pr-2 scrollbar-hide mb-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                       <div className="w-12 h-12 bg-white rounded-xl overflow-hidden shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate">{item.name}</p>
                          <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                       </div>
                       <span className="text-sm font-black">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 pt-6 border-t border-gray-800">
                  <div className="flex justify-between text-sm text-gray-400">
                     <span>Subtotal</span>
                     <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                     <span>Shipping</span>
                     <span className="text-white">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 text-xl font-black italic">
                     <span>Total</span>
                     <span className="text-[#FF6B35]">${total.toFixed(2)}</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
