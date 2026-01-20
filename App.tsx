
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import VirtualAssistant from './components/VirtualAssistant';
import { CartProvider, useCart } from './context/CartContext';
// Added missing Info and ShieldCheck imports to resolve compilation errors
import { ShoppingCart, Trash2, ArrowLeft, CreditCard, ChevronRight, CheckCircle2, Package, MapPin, Truck, Banknote, Info, ShieldCheck } from 'lucide-react';

// Functional Cart Page
const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-slate-50 rounded-[3rem] p-16 border border-dashed border-slate-200">
          <ShoppingCart className="w-16 h-16 text-slate-200 mx-auto mb-6" />
          <h2 className="text-3xl font-black text-slate-900 mb-2">Your cart is empty</h2>
          <p className="text-slate-500 mb-8">Looks like you haven't added any parts to your build yet.</p>
          <Link to="/catalog" className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all">
            Browse Catalog <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-slate-900 mb-12 uppercase tracking-tighter">Shopping Cart ({totalItems})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl border border-slate-200 p-6 flex gap-6 items-center">
              <div className="w-24 h-24 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-900">{item.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">Part #: {item.partNumber}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-600 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center bg-slate-100 rounded-xl p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center font-bold hover:bg-white rounded-lg"
                    >-</button>
                    <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center font-bold hover:bg-white rounded-lg"
                    >+</button>
                  </div>
                  <span className="font-black text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
          
          <Link to="/catalog" className="inline-flex items-center gap-2 text-slate-500 hover:text-red-600 font-bold transition-all pt-4">
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Link>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Order Summary</h3>
            <div className="space-y-4 text-sm font-medium">
              <div className="flex justify-between">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-900">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Shipping</span>
                <span className="text-green-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Tax</span>
                <span className="text-slate-900">${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                <span className="text-slate-900 font-black text-lg">Total</span>
                <span className="text-red-600 font-black text-2xl">${(totalPrice * 1.08).toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl mt-8 flex items-center justify-center gap-3 hover:bg-red-600 transition-all shadow-xl shadow-slate-200"
            >
              <CreditCard className="w-5 h-5" /> Checkout Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Functional Checkout Page
const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [isOrdered, setIsOrdered] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  if (isOrdered) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-[3rem] p-16 shadow-2xl border border-slate-100">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase">Order Confirmed!</h2>
          <p className="text-slate-500 mb-12 text-lg">
            Thank you for choosing AutoPart AI. Your order <span className="text-slate-900 font-bold">#AP-AI-8821</span> is being processed and will ship shortly.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-12 text-left bg-slate-50 p-6 rounded-3xl">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Payment Method</p>
              <p className="font-bold text-slate-900">{paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
              <p className="font-bold text-green-600">Preparing Shipment</p>
            </div>
          </div>
          <Link to="/" className="inline-flex items-center gap-2 bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-red-600 transition-all">
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-12">
        <Link to="/cart" className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Form */}
        <div className="lg:col-span-8">
          <form onSubmit={handlePlaceOrder} className="space-y-8">
            {/* Shipping Section */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black">1</div>
                <h2 className="text-xl font-black uppercase tracking-tight">Shipping Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
                  <input required type="text" className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Address</label>
                  <input required type="email" className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="john@example.com" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">Address</label>
                  <input required type="text" className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="123 Performance St." />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">City</label>
                  <input required type="text" className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="Detroit" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1">ZIP Code</label>
                  <input required type="text" className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="48201" />
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-10 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black">2</div>
                <h2 className="text-xl font-black uppercase tracking-tight">Payment Method</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center gap-4 p-6 rounded-[2rem] border-2 transition-all text-left ${paymentMethod === 'card' ? 'border-red-600 bg-red-50/30' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${paymentMethod === 'card' ? 'bg-red-600 text-white' : 'bg-white text-slate-400'}`}>
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Credit / Debit Card</h4>
                    <p className="text-xs text-slate-500">Secure online payment</p>
                  </div>
                </button>
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center gap-4 p-6 rounded-[2rem] border-2 transition-all text-left ${paymentMethod === 'cod' ? 'border-red-600 bg-red-50/30' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${paymentMethod === 'cod' ? 'bg-red-600 text-white' : 'bg-white text-slate-400'}`}>
                    <Banknote className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Cash on Delivery</h4>
                    <p className="text-xs text-slate-500">Pay when your parts arrive</p>
                  </div>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="mt-8 grid grid-cols-2 gap-6 animate-in slide-in-from-top-4 duration-300">
                  <div className="col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Card Number</label>
                    <input type="text" className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">Expiry Date</label>
                    <input type="text" className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase ml-1">CVV</label>
                    <input type="text" className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3.5 px-5 outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="123" />
                  </div>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="mt-8 p-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200 animate-in slide-in-from-top-4 duration-300">
                  <div className="flex gap-4 items-start">
                    <Info className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-500 leading-relaxed">
                      You will pay the total amount to the courier upon delivery. Please ensure someone is available at the shipping address to receive the parts.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-[2rem] text-lg uppercase tracking-wider transition-all shadow-2xl shadow-red-200 flex items-center justify-center gap-3 group"
            >
              Place Order <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-4">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white sticky top-24 shadow-2xl">
            <h3 className="text-xl font-black uppercase tracking-tight mb-8">Your Order</h3>
            <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-white/10 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.images[0]} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold line-clamp-1">{item.name}</h4>
                    <p className="text-[10px] text-white/50 mt-1">QTY: {item.quantity} • ${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-white/10 text-sm">
              <div className="flex justify-between">
                <span className="text-white/50">Subtotal</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Shipping</span>
                <span className="text-green-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/50">Tax (8%)</span>
                <span className="font-bold">${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <span className="font-black text-lg uppercase tracking-tighter">Total</span>
                <span className="text-3xl font-black text-red-500">${(totalPrice * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-xs text-white/40">
                <ShieldCheck className="w-4 h-4" />
                <span>SSL Encrypted Transaction</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-white/40">
                <Truck className="w-4 h-4" />
                <span>Guaranteed fitment for your vehicle</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Profile = () => <div className="p-20 text-center text-slate-500">User Profile Page (Coming Soon)</div>;

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
        <VirtualAssistant />
      </Router>
    </CartProvider>
  );
};

export default App;
