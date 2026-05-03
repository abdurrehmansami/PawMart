import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../data';
import { useCart } from '../contexts/CartContext';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.stockStatus === 'Low Stock' && (
          <span className="absolute top-3 left-3 bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            Low Stock
          </span>
        )}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white p-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
             <Eye className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-[#FF6B35] uppercase tracking-widest">{product.category}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-900 group-hover:text-[#FF6B35] transition-colors mb-2 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="bg-[#FF6B35] hover:bg-[#e85a24] text-white p-2.5 rounded-xl transition-colors shadow-lg shadow-orange-100 active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
