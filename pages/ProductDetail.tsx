
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShieldCheck, Truck, Package, ShoppingCart, ChevronLeft, Check, AlertCircle, Info, Hammer } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'compatibility' | 'reviews'>('specs');

  useEffect(() => {
    const found = PRODUCTS.find(p => p.id === id);
    if (found) setProduct(found);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-500">
        <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
        <p>Product not found</p>
        <Link to="/catalog" className="text-red-600 font-bold mt-4 underline">Back to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/catalog" className="inline-flex items-center gap-2 text-slate-500 hover:text-red-600 transition-colors mb-8 font-semibold">
        <ChevronLeft className="w-5 h-5" /> Back to results
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-[3rem] overflow-hidden bg-slate-100 border border-slate-200">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 cursor-pointer hover:border-red-500 transition-all">
                <img src={img} alt={`${product.name} ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{product.brand}</span>
              {product.isOEM && <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">OEM Certified</span>}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                {Array.from({length: 5}).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                ))}
                <span className="text-sm font-bold text-slate-700 ml-1">{product.rating} ({product.reviewsCount} reviews)</span>
              </div>
              <div className="h-4 w-px bg-slate-200"></div>
              <div className="text-sm text-slate-400 font-medium">Part #: {product.partNumber}</div>
            </div>
          </div>

          <div className="text-4xl font-black text-slate-900">${product.price.toFixed(2)}</div>

          <p className="text-slate-600 leading-relaxed text-lg font-light">
            {product.description}
          </p>

          <div className="p-6 bg-slate-50 rounded-3xl space-y-4 border border-slate-100">
             <div className="flex items-center justify-between text-sm">
               <span className="text-slate-500">Installation Difficulty</span>
               <span className="flex items-center gap-2 font-bold text-slate-900">
                 <Hammer className="w-4 h-4 text-red-600" /> {product.difficulty}
               </span>
             </div>
             <div className="flex items-center justify-between text-sm">
               <span className="text-slate-500">Condition</span>
               <span className="font-bold text-slate-900">{product.condition}</span>
             </div>
             <div className="flex items-center justify-between text-sm">
               <span className="text-slate-500">Availability</span>
               <span className={`font-bold ${product.availability === 'In Stock' ? 'text-green-600' : 'text-orange-600'}`}>{product.availability}</span>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center bg-slate-100 rounded-2xl p-2 h-14 w-full sm:w-auto">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all text-xl font-bold"
              >-</button>
              <input 
                type="number" 
                className="w-16 bg-transparent text-center font-bold text-lg outline-none border-none" 
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all text-xl font-bold"
              >+</button>
            </div>
            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold h-14 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-red-200">
              <ShoppingCart className="w-6 h-6" /> Add to Shopping Cart
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Truck className="w-5 h-5 text-slate-400" />
              <span>Ships in 24-48 hours</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <ShieldCheck className="w-5 h-5 text-slate-400" />
              <span>2-Year Limited Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-24 space-y-8">
        <div className="flex border-b border-slate-200 gap-8 overflow-x-auto">
          {[
            { id: 'specs', label: 'Specifications', icon: Info },
            { id: 'compatibility', label: 'Fitment Compatibility', icon: Check },
            { id: 'reviews', label: 'Customer Reviews', icon: Star }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-4 text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-all relative ${activeTab === tab.id ? 'text-red-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600 rounded-full"></div>}
            </button>
          ))}
        </div>

        <div className="min-h-[300px] animate-in fade-in duration-500">
          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-4 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">{key}</span>
                  <span className="text-slate-900 font-bold">{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'compatibility' && (
            <div className="space-y-8">
              <div className="p-6 bg-green-50 rounded-3xl border border-green-100 flex items-start gap-4">
                <Check className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-green-900">Guaranteed Fitment</h4>
                  <p className="text-green-700 text-sm mt-1 leading-relaxed">
                    This part is verified to fit your vehicle if it matches the makes and models listed below. 
                    Not sure? Use our AI Assistant to verify with your VIN.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <h5 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-xs">Supported Makes</h5>
                  <div className="flex flex-wrap gap-2">
                    {product.compatibility.make.map(m => <span key={m} className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-bold">{m}</span>)}
                  </div>
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-xs">Models</h5>
                  <div className="flex flex-wrap gap-2">
                    {product.compatibility.model.map(m => <span key={m} className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-bold">{m}</span>)}
                  </div>
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-xs">Year Range</h5>
                  <span className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold">
                    {product.compatibility.yearRange[0]} — {product.compatibility.yearRange[1]}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="text-center py-20 bg-slate-50 rounded-[3rem]">
               <Star className="w-12 h-12 text-slate-200 mx-auto mb-4" />
               <p className="text-slate-500 font-medium">Customer reviews are loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
