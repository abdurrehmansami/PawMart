import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-[#FF6B35] p-2 rounded-lg">
                <PawPrint className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">PawMart</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Providing only the best for our furry friends since 2024. Your pet's happiness is our top priority.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#FF6B35] transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#FF6B35] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#FF6B35] transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-[#FF6B35] transition-colors">Home</Link></li>
              <li><Link to="/store" className="hover:text-[#FF6B35] transition-colors">Shop All</Link></li>
              <li><Link to="/cart" className="hover:text-[#FF6B35] transition-colors">View Cart</Link></li>
              <li><Link to="/login" className="hover:text-[#FF6B35] transition-colors">My Account</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/store?category=Dog Food" className="hover:text-[#FF6B35] transition-colors">Dog Food</Link></li>
              <li><Link to="/store?category=Cat Toys" className="hover:text-[#FF6B35] transition-colors">Cat Toys</Link></li>
              <li><Link to="/store?category=Accessories" className="hover:text-[#FF6B35] transition-colors">Accessories</Link></li>
              <li><Link to="/store?category=Grooming" className="hover:text-[#FF6B35] transition-colors">Grooming</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-[#FF6B35] shrink-0" />
                <span>123 Pet Lane, Animal Valley, PC 54321</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="w-5 h-5 text-[#FF6B35] shrink-0" />
                <span>+1 (800) PAW-MART</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="w-5 h-5 text-[#FF6B35] shrink-0" />
                <span>support@pawmart.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-gray-500">© 2024 PawMart Inc. All rights reserved.</p>
          <div className="flex space-x-6 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
