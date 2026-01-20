
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Camera, ChevronRight, Star, ShieldCheck, Zap, Truck, Package, ShoppingCart, SlidersHorizontal, ArrowRight, ImageOff } from 'lucide-react';
import { CATEGORIES, PRODUCTS, MAKES, SERIES } from '../constants';
import { geminiService } from '../services/geminiService';
import { useCart } from '../context/CartContext';

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [advFilters, setAdvFilters] = useState({
    manufacturer: '',
    series: '',
    model: '',
    year: '',
    performance: 'Standard'
  });
  
  const navigate = useNavigate();

  const handleSmartSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const interpretation = await geminiService.interpretSearch(query);
      const params = new URLSearchParams();
      if (interpretation.make) params.append('make', interpretation.make);
      if (interpretation.model) params.append('model', interpretation.model);
      if (interpretation.year) params.append('year', interpretation.year.toString());
      navigate(`/catalog?${params.toString()}`);
    } catch (err) {
      navigate(`/catalog?q=${encodeURIComponent(query)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAdvSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (advFilters.manufacturer) params.append('make', advFilters.manufacturer);
    if (advFilters.series) params.append('series', advFilters.series);
    if (advFilters.model) params.append('model', advFilters.model);
    if (advFilters.year) params.append('year', advFilters.year);
    if (advFilters.performance !== 'Standard') params.append('perf', advFilters.performance);
    navigate(`/catalog?${params.toString()}`);
  };

  const handleVisualSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(',')[1];
      try {
        const identification = await geminiService.identifyPartFromImage(base64);
        navigate(`/catalog?q=${encodeURIComponent(identification)}`);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[700px] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-50 grayscale"
            alt="Hero Background"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-3xl text-white space-y-8 mb-12">
            <div className="inline-flex items-center gap-2 bg-red-600 px-4 py-1.5 rounded-full text-white text-xs font-bold tracking-widest uppercase">
              <Zap className="w-4 h-4" /> AI-Driven Compatibility
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-tight tracking-tighter">
              DRIVE <br/><span className="text-red-600 italic">SMARTER.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-xl font-light leading-relaxed">
              The world's first AI-integrated parts marketplace. Search with voice, 
              images, or natural language to find exactly what fits.
            </p>
          </div>

          {/* Advanced Filter Box */}
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 border border-slate-200 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="flex items-center gap-2 mb-6 text-slate-900">
              <SlidersHorizontal className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-lg">Advance Part Finder</h3>
            </div>
            
            <form onSubmit={handleAdvSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Manufacturer</label>
                <select 
                  className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-red-500 transition-all outline-none"
                  value={advFilters.manufacturer}
                  onChange={(e) => setAdvFilters({...advFilters, manufacturer: e.target.value, series: '', model: ''})}
                >
                  <option value="">Select Make</option>
                  {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Series</label>
                <select 
                  className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-red-500 transition-all outline-none disabled:opacity-50"
                  value={advFilters.series}
                  onChange={(e) => setAdvFilters({...advFilters, series: e.target.value})}
                  disabled={!advFilters.manufacturer}
                >
                  <option value="">Select Series</option>
                  {advFilters.manufacturer && SERIES[advFilters.manufacturer]?.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Model / Trim</label>
                <input 
                  type="text"
                  placeholder="e.g. V6 Sport"
                  className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-red-500 transition-all outline-none"
                  value={advFilters.model}
                  onChange={(e) => setAdvFilters({...advFilters, model: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Year</label>
                <select 
                  className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-red-500 transition-all outline-none"
                  value={advFilters.year}
                  onChange={(e) => setAdvFilters({...advFilters, year: e.target.value})}
                >
                  <option value="">Select Year</option>
                  {Array.from({length: 30}, (_, i) => 2026 - i).map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Performance</label>
                <select 
                  className="w-full bg-slate-50 border-slate-200 rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-red-500 transition-all outline-none"
                  value={advFilters.performance}
                  onChange={(e) => setAdvFilters({...advFilters, performance: e.target.value})}
                >
                  <option value="Standard">Standard (OEM)</option>
                  <option value="Sport">Sport / Street</option>
                  <option value="Track">Track / Racing</option>
                  <option value="Offroad">Off-road / 4x4</option>
                </select>
              </div>

              <div className="flex items-end">
                <button 
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-red-200"
                >
                  Find Parts <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-slate-500 text-sm">
                <span className="font-semibold text-slate-900">Search by Image?</span>
                <label className="flex items-center gap-2 cursor-pointer hover:text-red-600 transition-colors">
                  <Camera className="w-5 h-5" />
                  <span>Upload Part Photo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleVisualSearch} />
                </label>
              </div>
              <div className="flex-1 max-w-md w-full">
                <form onSubmit={handleSmartSearch} className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    type="text"
                    placeholder="Ask AI: 'exhaust for a track supra'..."
                    className="w-full bg-slate-100 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-red-500 outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  {loading && <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "Verified Fitment", desc: "Expert-checked compatibility" },
            { icon: Truck, title: "Fast Shipping", desc: "Next-day delivery available" },
            { icon: Package, title: "Hassle-Free Returns", desc: "30-day money-back guarantee" },
            { icon: Star, title: "OEM & Performance", desc: "Highest quality standards" }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-center p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
              <div className="bg-slate-50 p-3 rounded-2xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-2">HOT DEALS</h2>
            <p className="text-slate-500">Curated performance parts for your build</p>
          </div>
          <Link to="/catalog" className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-red-600 transition-all">
            Browse All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PRODUCTS.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories Banner */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Explore by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat} 
                to={`/catalog?category=${cat}`}
                className="group bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 hover:bg-white/10 hover:border-red-500 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center bg-white/5 mb-4 group-hover:scale-110 transition-transform">
                  <Package className="w-6 h-6 text-slate-400 group-hover:text-red-500" />
                </div>
                <span className="block font-bold text-[10px] text-white uppercase tracking-widest">{cat}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ProductCard: React.FC<{ product: any }> = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-slate-50">
        {imgError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
            <ImageOff className="w-12 h-12" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Image Unavailable</span>
          </div>
        ) : (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute top-6 left-6 flex flex-col gap-2">
          <div className="bg-white/90 backdrop-blur rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
            {product.brand}
          </div>
          {product.isOEM && (
            <div className="bg-red-600 text-white rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm">
              OEM
            </div>
          )}
        </div>
      </Link>
      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-red-600 transition-colors leading-tight min-h-[3rem]">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 text-sm font-bold text-slate-700">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {product.rating}
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <Package className="w-3 h-3" />
          <span>PN: {product.partNumber}</span>
        </div>
        <div className="flex items-center justify-between pt-4">
          <span className="text-3xl font-black text-slate-900">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-slate-900 hover:bg-red-600 text-white p-4 rounded-2xl transition-all hover:rotate-12"
          >
            <ShoppingCart className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
