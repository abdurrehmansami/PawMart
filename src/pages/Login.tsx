import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, ArrowRight, PawPrint, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isLogin) {
      const res = login(email, password);
      if (res.success) {
        navigate('/');
      } else {
        setError(res.message);
      }
    } else {
      const res = register(name, email, password);
      if (res.success) {
        setSuccess(res.message);
        setIsLogin(true);
        setName('');
        setPassword('');
      } else {
        setError(res.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
        {/* Visual Side */}
        <div className="hidden md:block bg-[#FF6B35] p-16 relative">
          <div className="absolute top-0 left-0 p-12 opacity-10">
             <PawPrint className="w-80 h-80 text-white -rotate-12" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between text-white">
            <Link to="/" className="flex items-center space-x-2 group w-fit">
              <div className="bg-white p-1.5 rounded-lg">
                <PawPrint className="text-[#FF6B35] w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white italic">PawMart</span>
            </Link>
            
            <div className="space-y-6">
               <h2 className="text-5xl font-black leading-tight italic">Join the world's happiest pet community.</h2>
               <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                     <div className="bg-white/20 p-1 rounded-full"><CheckCircle className="w-4 h-4 text-white" /></div>
                     <p className="font-bold">Exclusive members-only deals</p>
                  </div>
                  <div className="flex items-center space-x-3">
                     <div className="bg-white/20 p-1 rounded-full"><CheckCircle className="w-4 h-4 text-white" /></div>
                     <p className="font-bold">Faster checkout and order tracking</p>
                  </div>
                  <div className="flex items-center space-x-3">
                     <div className="bg-white/20 p-1 rounded-full"><CheckCircle className="w-4 h-4 text-white" /></div>
                     <p className="font-bold">Early access to new collections</p>
                  </div>
               </div>
            </div>

            <p className="text-sm font-bold text-orange-100">Trusted by 10,000+ pet parents worldwide.</p>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-10 sm:p-16 flex flex-col justify-center">
          <div className="mb-12">
            <h1 className="text-4xl font-black text-gray-900 mb-4 italic">
               {isLogin ? 'Welcome Back!' : 'Start Your Journey'}
            </h1>
            <p className="text-gray-500 font-medium">
               {isLogin ? 'Glad to see you again! Log in to access your tail-wagging deals.' : 'Create an account to get exclusive rewards for your pets.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-rose-50 text-rose-600 p-4 rounded-xl text-sm font-bold border border-rose-100 flex items-center space-x-2">
                   <span>⚠️</span>
                   <span>{error}</span>
                </motion.div>
              )}
              {success && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 text-green-600 p-4 rounded-xl text-sm font-bold border border-green-100 flex items-center space-x-2">
                   <span>✅</span>
                   <span>{success}</span>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Full Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-4 py-4 font-bold focus:ring-2 focus:ring-[#FF6B35] transition-all"
                      required={!isLogin}
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-4 py-4 font-bold focus:ring-2 focus:ring-[#FF6B35] transition-all"
                  required 
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Password</label>
                {isLogin && <button type="button" className="text-[10px] font-black uppercase text-gray-400 hover:text-[#FF6B35]">Forgot?</button>}
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border-none rounded-xl pl-12 pr-4 py-4 font-bold focus:ring-2 focus:ring-[#FF6B35] transition-all"
                  required 
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#FF6B35] text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center space-x-3 hover:bg-[#e85a24] transition-all shadow-xl shadow-orange-100 mt-8"
            >
              <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-gray-500 font-bold text-sm">
              {isLogin ? "New to PawMart?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-[#FF6B35] hover:underline"
              >
                {isLogin ? 'Create an account' : 'Sign in instead'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
