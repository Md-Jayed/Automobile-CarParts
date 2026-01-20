
import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { cart, isDrawerOpen, setDrawerOpen, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-500 ease-out">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="px-6 py-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-red-50 p-2 rounded-xl">
                  <ShoppingBag className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Your Cart</h2>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{totalItems} items</p>
                </div>
              </div>
              <button 
                onClick={() => setDrawerOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-slate-200" />
                  </div>
                  <p className="text-slate-500 font-medium">Your cart is currently empty</p>
                  <button 
                    onClick={() => { setDrawerOpen(false); navigate('/catalog'); }}
                    className="text-red-600 font-bold hover:underline"
                  >
                    Start shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-20 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-300 hover:text-red-600 transition-colors ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">PN: {item.partNumber}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md transition-all"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md transition-all"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-black text-slate-900 text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cart.length > 0 && (
              <div className="px-6 py-8 bg-slate-50 border-t border-slate-100 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Subtotal</span>
                  <span className="text-2xl font-black text-slate-900">${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-slate-400 text-center font-medium">Shipping & taxes calculated at checkout</p>
                <div className="space-y-3 pt-2">
                  <button 
                    onClick={() => { setDrawerOpen(false); navigate('/checkout'); }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl transition-all shadow-xl shadow-red-100 flex items-center justify-center gap-2 group"
                  >
                    Checkout Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <Link 
                    to="/cart" 
                    onClick={() => setDrawerOpen(false)}
                    className="w-full block text-center py-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
                  >
                    View Full Shopping Bag
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
