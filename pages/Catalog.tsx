
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Filter, Grid, List, Check, Star, Car, Package, ShoppingCart, AlertCircle, ImageOff } from 'lucide-react';
import { PRODUCTS, CATEGORIES, MAKES } from '../constants';
import { Product, FilterState } from '../types';
import { useCart } from '../context/CartContext';

const Catalog: React.FC = () => {
  const location = useLocation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState & { perf?: string; series?: string }>({});
  const [activeSort, setActiveSort] = useState('relevance');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFilters({
      make: params.get('make') || undefined,
      model: params.get('model') || undefined,
      year: params.get('year') ? parseInt(params.get('year')!) : undefined,
      category: params.get('category') || undefined,
      perf: params.get('perf') || undefined,
      series: params.get('series') || undefined,
    });
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.make && !p.compatibility.make.includes(filters.make)) return false;
      if (filters.model && !p.compatibility.model.some(m => m.toLowerCase().includes(filters.model!.toLowerCase()))) return false;
      
      // Basic year range filtering
      if (filters.year) {
        const [min, max] = p.compatibility.yearRange;
        if (filters.year < min || filters.year > max) return false;
      }

      return true;
    });
  }, [filters]);

  const toggleFilter = (key: keyof (FilterState & { perf?: string; series?: string }), value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? undefined : value
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-8 sticky top-24">
            <div className="flex items-center justify-between">
              <h3 className="font-black flex items-center gap-2 text-slate-900 uppercase tracking-tighter"><Filter className="w-5 h-5" /> Filters</h3>
              <button onClick={() => setFilters({})} className="text-xs text-red-600 font-bold hover:underline">Reset</button>
            </div>

            {/* Current Active Vehicle Info */}
            {(filters.make || filters.year) && (
              <div className="p-4 bg-slate-900 rounded-2xl text-white space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase">Searching for</div>
                <div className="font-bold flex items-center gap-2">
                  <Car className="w-4 h-4 text-red-500" />
                  {filters.year} {filters.make} {filters.series}
                </div>
              </div>
            )}

            {/* Vehicle Selection */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Make</h4>
              <select 
                className="w-full p-3 bg-slate-100 border-none rounded-2xl text-sm font-semibold focus:ring-2 focus:ring-red-500 transition-all outline-none"
                value={filters.make || ''}
                onChange={(e) => toggleFilter('make', e.target.value)}
              >
                <option value="">Any Manufacturer</option>
                {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            {/* Category Filter */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Categories</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={filters.category === cat}
                      onChange={() => toggleFilter('category', cat)}
                    />
                    <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${filters.category === cat ? 'bg-red-600 border-red-600 scale-110' : 'bg-slate-100 border-transparent group-hover:border-red-400'}`}>
                      {filters.category === cat && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <span className={`text-sm font-medium ${filters.category === cat ? 'text-slate-900' : 'text-slate-500 group-hover:text-slate-700'}`}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Price</h4>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="Min" className="w-full p-3 bg-slate-100 border-none rounded-2xl text-sm outline-none" />
                <input type="number" placeholder="Max" className="w-full p-3 bg-slate-100 border-none rounded-2xl text-sm outline-none" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Controls */}
          <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <span className="text-sm text-slate-500 font-medium">Found <span className="font-black text-slate-900 text-lg">{filteredProducts.length}</span> parts</span>
              <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-2xl transition-all ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-2xl transition-all ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Sort:</label>
              <select 
                className="bg-slate-100 border-none rounded-2xl p-3 text-sm w-full sm:w-48 font-bold outline-none focus:ring-2 focus:ring-red-500"
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-6"}>
              {filteredProducts.map(product => (
                viewMode === 'grid' ? <ProductCard key={product.id} product={product} /> : <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
               <AlertCircle className="w-16 h-16 text-slate-200 mx-auto mb-4" />
               <h3 className="text-xl font-bold text-slate-900">No parts found</h3>
               <p className="text-slate-500 max-w-xs mx-auto mt-2 font-medium">Try adjusting your filters or use our AI search for better results.</p>
               <button onClick={() => setFilters({})} className="mt-8 text-red-600 font-bold uppercase tracking-widest text-xs border-b-2 border-red-600 pb-1">Reset all filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
      <Link to={`/product/${product.id}`} className="relative aspect-[4/5] overflow-hidden bg-slate-50">
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
          <div className="bg-white/95 backdrop-blur rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-slate-100">
            {product.brand}
          </div>
        </div>
        <div className="absolute bottom-6 left-6 right-6 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
          <button className="w-full bg-slate-900/90 backdrop-blur text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
            View Details
          </button>
        </div>
      </Link>
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-black text-slate-900 group-hover:text-red-600 transition-colors leading-tight line-clamp-2 min-h-[3rem]">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-1 text-sm font-black text-slate-700">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {product.rating}
          </div>
        </div>
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
          <span className="text-3xl font-black text-slate-900 tracking-tight">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-2xl transition-all shadow-lg shadow-red-200"
          >
            <ShoppingCart className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductListItem: React.FC<{ product: Product }> = ({ product }) => {
  const [imgError, setImgError] = useState(false);
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-200 p-6 flex flex-col md:flex-row gap-8 hover:shadow-2xl transition-all">
      <Link to={`/product/${product.id}`} className="w-full md:w-56 h-56 flex-shrink-0 bg-slate-50 rounded-3xl overflow-hidden flex items-center justify-center">
        {imgError ? (
          <div className="flex flex-col items-center justify-center text-slate-300 gap-2">
            <ImageOff className="w-12 h-12" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Image Unavailable</span>
          </div>
        ) : (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform group-hover:scale-105" 
            onError={() => setImgError(true)}
          />
        )}
      </Link>
      <div className="flex-1 py-2 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">{product.brand}</span>
            <Link to={`/product/${product.id}`}>
              <h3 className="text-2xl font-black text-slate-900 group-hover:text-red-600 transition-colors mt-2">{product.name}</h3>
            </Link>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-xs text-slate-400 font-bold">PN: {product.partNumber} • {product.condition}</p>
              <div className="flex items-center gap-1 text-sm font-black text-slate-700">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> {product.rating}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-slate-900 tracking-tight">${product.price.toFixed(2)}</div>
            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mt-2 inline-block ${product.availability === 'In Stock' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
               {product.availability}
             </span>
          </div>
        </div>
        <p className="text-sm text-slate-500 mt-6 leading-relaxed font-medium line-clamp-2">{product.description}</p>
        <div className="mt-auto flex justify-between items-center pt-8">
          <div className="flex gap-3">
             <span className="text-[10px] font-black px-4 py-2 rounded-xl bg-slate-900 text-white uppercase tracking-widest">
               {product.difficulty} INSTALL
             </span>
          </div>
          <div className="flex gap-4">
            <Link to={`/product/${product.id}`} className="bg-slate-100 hover:bg-slate-200 text-slate-900 px-8 py-3 rounded-2xl font-black text-sm transition-all">
              DETAILS
            </Link>
            <button 
              onClick={() => addToCart(product)}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-2xl font-black text-sm transition-all shadow-lg shadow-red-200 flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" /> ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
