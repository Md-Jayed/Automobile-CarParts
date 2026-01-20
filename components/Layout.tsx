
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Camera, Car, Settings } from 'lucide-react';
import { geminiService } from '../services/geminiService';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const interpretation = await geminiService.interpretSearch(searchQuery);
      // Construct query params based on interpretation
      const params = new URLSearchParams();
      if (interpretation.make) params.append('make', interpretation.make);
      if (interpretation.model) params.append('model', interpretation.model);
      if (interpretation.year) params.append('year', interpretation.year.toString());
      if (interpretation.category) params.append('category', interpretation.category);
      
      navigate(`/catalog?${params.toString()}`);
    } catch (error) {
      console.error("Search failed:", error);
      navigate(`/catalog?q=${encodeURIComponent(searchQuery)}`);
    } finally {
      setIsSearching(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-red-600 p-1.5 rounded-lg">
              <Car className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800 hidden sm:inline-block">AutoPart<span className="text-red-600">AI</span></span>
          </Link>

          <div className="flex-1 max-w-2xl hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search parts by name, VIN, or natural language (e.g., 'brake pads for 2018 Civic')..."
                className="w-full bg-slate-100 border-none rounded-full py-2.5 pl-5 pr-12 focus:ring-2 focus:ring-red-500 transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                disabled={isSearching}
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-600">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/garage" className="text-slate-600 hover:text-red-600 transition-colors hidden sm:flex flex-col items-center">
              <Car className="w-5 h-5" />
              <span className="text-[10px] font-medium">My Garage</span>
            </Link>
            <Link to="/profile" className="text-slate-600 hover:text-red-600 transition-colors hidden sm:flex flex-col items-center">
              <User className="w-5 h-5" />
              <span className="text-[10px] font-medium">Profile</span>
            </Link>
            <Link to="/cart" className="relative text-slate-600 hover:text-red-600 transition-colors flex flex-col items-center">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-[10px] font-medium">Cart</span>
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </Link>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4 animate-in slide-in-from-top duration-200">
           <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search parts..."
                className="w-full bg-slate-100 border-none rounded-lg py-3 px-4 focus:ring-2 focus:ring-red-500 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <nav className="grid grid-cols-2 gap-4">
              <Link to="/catalog" className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"><Search className="w-4 h-4 text-slate-400" /> Catalog</Link>
              <Link to="/garage" className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"><Car className="w-4 h-4 text-slate-400" /> Garage</Link>
              <Link to="/profile" className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"><User className="w-4 h-4 text-slate-400" /> Account</Link>
              <Link to="/support" className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"><Settings className="w-4 h-4 text-slate-400" /> Support</Link>
            </nav>
        </div>
      )}

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="text-red-500 w-6 h-6" />
              <span className="text-xl font-bold tracking-tight text-white">AutoPartAI</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your comprehensive e-commerce platform for automotive parts and accessories, powered by advanced AI.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalog" className="hover:text-red-500">All Parts</Link></li>
              <li><Link to="/catalog?category=Engine" className="hover:text-red-500">Engine Components</Link></li>
              <li><Link to="/catalog?category=Brakes" className="hover:text-red-500">Braking Systems</Link></li>
              <li><Link to="/catalog?category=Electrical" className="hover:text-red-500">Electrical & Lighting</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:text-red-500">Help Center</Link></li>
              <li><Link to="/shipping" className="hover:text-red-500">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-red-500">Returns & Warranty</Link></li>
              <li><Link to="/vin-decoder" className="hover:text-red-500">VIN Compatibility</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Join Our Newsletter</h4>
            <p className="text-sm mb-4">Get the latest DIY guides and exclusive part deals.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-slate-800 border-none rounded px-3 py-2 text-sm flex-1" />
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 AutoPart AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
