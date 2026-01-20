
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import VirtualAssistant from './components/VirtualAssistant';

// Mock Pages for demonstration
const Profile = () => <div className="p-20 text-center text-slate-500">User Profile Page (Coming Soon)</div>;
const Cart = () => <div className="p-20 text-center text-slate-500">Shopping Cart Page (Coming Soon)</div>;

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
      <VirtualAssistant />
    </Router>
  );
};

export default App;
