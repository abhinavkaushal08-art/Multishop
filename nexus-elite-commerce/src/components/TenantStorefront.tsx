/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useSaaS } from '../context/SaaSContext';
import {
  ShoppingBag, Search, ChevronRight, Star, ShoppingCart, Info,
  Sparkles, CheckCircle2, Cpu, Shirt, BookOpen, Smartphone, Dumbbell, Globe, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TenantStorefront: React.FC = () => {
  const { state, setSelectedTenant, addToCart, setRole } = useSaaS();
  const [searchQuery, setSearchQuery] = useState('');
  const [localFeedback, setLocalFeedback] = useState<string | null>(null);

  // Identify currently browsed tenant
  const tenant = useMemo(() => {
    return state.tenants.find(t => t.id === state.selectedTenantId) || state.tenants[0];
  }, [state.tenants, state.selectedTenantId]);

  // Synchronized catalog of products belonging to just this tenant
  const products = useMemo(() => {
    return state.products.filter(p => p.tenantId === tenant.id &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [state.products, tenant, searchQuery]);

  // Handle adding item inside store with beautiful snappy animation feedback
  const handleAddToCart = (product: any) => {
    addToCart(product);
    setLocalFeedback(`Added "${product.name}" cleanly to your shared basket!`);
    setTimeout(() => setLocalFeedback(null), 3000);
  };

  // Switch browsed store on storefront page directly!
  const handleBranchSwitch = (tenantId: string) => {
    setSelectedTenant(tenantId);
    setSearchQuery('');
  };

  // Retrieve matching theme class details
  const getThemeColorClass = (color: string) => {
    switch (color) {
      case 'purple': return 'bg-temp-purple-200 hover:bg-temp-temp-purple-300 text-white shadow-purple-600/10 focus:ring-purple-505';
      case 'purple': return 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/10 focus:ring-purple-500';
      case 'emerald': return 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/10 focus:ring-emerald-500';
      case 'rose': return 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/10 focus:ring-rose-500';
      case 'purple': return 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/10 focus:ring-purple-500';
      default: return 'bg-slate-900 hover:bg-slate-800 text-white';
    }
  };

  const getThemeAccentBorder = (color: string) => {
    switch (color) {
      case 'purple': return 'border-purple-500 bg-purple-50/40 text-purple-700';
      case 'purple': return 'border-purple-500 bg-purple-50/40 text-purple-700';
      case 'emerald': return 'border-emerald-500 bg-emerald-50/40 text-emerald-700';
      case 'rose': return 'border-rose-500 bg-rose-50/40 text-rose-700';
      case 'purple': return 'border-purple-500 bg-purple-50/40 text-purple-700';
      default: return 'border-slate-500 bg-slate-50 text-slate-700';
    }
  };

  const getThemeTextClass = (color: string) => {
    switch (color) {
      case 'purple': return 'text-purple-600';
      case 'purple': return 'text-purple-600';
      case 'emerald': return 'text-emerald-600';
      case 'rose': return 'text-rose-600';
      case 'purple': return 'text-purple-600';
      default: return 'text-slate-900';
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 animate-fade-in pb-16">
      {/* Dynamic item added feedback bar */}
      <AnimatePresence>
        {localFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-slate-950 text-white py-3.5 px-6 rounded-2xl shadow-xl border border-slate-800 text-xs font-black flex items-center gap-2.5 backdrop-blur-sm"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>{localFeedback}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Standalone simulation alert banner */}
      <div className="bg-slate-900 border-b border-slate-800 text-white py-2 px-6 flex items-center justify-between text-[11px] gap-2">
        <div className="flex items-center gap-2 max-w-[85%]">
          <Globe className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="truncate">
            Branded Subdomain: <strong className="text-purple-400 font-mono font-bold">{tenant.slug}.multishop.in</strong> which maps isolates dynamically.
          </span>
        </div>
        <button
          onClick={() => setRole('vendor')}
          className="text-[10px] font-black underline shrink-0 hover:text-purple-300 transition"
        >
          Edit this design in vendor portal
        </button>
      </div>

      {/* Simple Storehead Header */}
      <nav className="border-b border-slate-100 py-4 px-6 md:px-12 bg-white max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-display font-black text-slate-950 text-lg leading-none shrink-0">{tenant.name}</span>
          <span className="text-[10px] bg-slate-100 text-slate-500 border border-slate-200 uppercase font-black px-2 py-0.5 rounded-lg hidden sm:inline">
            {tenant.category}
          </span>
        </div>

        {/* Links inside Storefront */}
        <div className="flex items-center gap-6 text-xs text-slate-550 font-semibold">
          <span className={`cursor-pointer border-b-2 py-1 ${getThemeTextClass(tenant.themeColor)} border-current`}>Home</span>
          <span className="cursor-pointer hover:text-slate-900">Catalog</span>
          <span className="cursor-pointer hover:text-slate-900" onClick={() => setRole('customer')}>Shared Basket</span>
        </div>

        {/* Return to Platform Link */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setRole('landing')}
            className="text-[10px] uppercase font-black text-slate-500 hover:text-slate-900 tracking-wider hidden md:inline-block cursor-pointer flex items-center gap-1"
          >
            ← Back to Platform
          </button>
          <button
            onClick={() => setRole('customer')}
            className="p-2 bg-slate-50 border border-slate-100 hover:bg-slate-100 rounded-xl relative transition"
            title="Open basket page"
          >
            <ShoppingCart className="h-4 w-4 text-slate-700" />
            {state.cart.length > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center leading-none">
                {state.cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Big Storefront Banner (customized by vendor edits) */}
      <header className="max-w-7xl mx-auto px-6 md:px-8 mt-5">
        <div className="relative rounded-3xl overflow-hidden aspect-[2.6] min-h-[180px] bg-slate-900 text-white shadow-lg flex items-center">
          {/* Cover cover background photo */}
          <div className="absolute inset-0 z-0">
            <img src={tenant.bannerImage} alt="Banner" className="h-full w-full object-cover opacity-35" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[65%] p-6 md:p-10 space-y-4">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#818cf8] block">EXCLUSIVE PROMO SELECTION</span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight font-display leading-[1.15]">
              {tenant.bannerText}
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed font-sans max-w-sm hidden sm:block">
              Premium curated inventory, engineered specifically on the isolated {tenant.name} ecosystem.
            </p>
          </div>
        </div>
      </header>

      {/* Browse Catalog block */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 mt-10 space-y-7">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h3 className="font-display font-bold text-slate-900 tracking-tight">Explore the Store Items</h3>
            <p className="text-slate-400 text-xs">Browse boutique catalog lines. Each transaction maps cleanly into specific store balances.</p>
          </div>

          {/* Catalog search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search store catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-4 py-2 w-full sm:w-[200px] border border-slate-200 rounded-xl text-xs bg-slate-50/50 outline-none focus:bg-white focus:border-slate-350"
            />
          </div>
        </div>

        {/* Product layouts */}
        {products.length === 0 ? (
          <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center space-y-2.5">
            <ShoppingBag className="h-10 w-10 text-slate-300" />
            <p className="text-xs font-semibold">No products currently match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p.id} className="border border-slate-200 rounded-2xl bg-white p-4 flex flex-col justify-between hover:shadow-lg hover:-translate-y-0.5 transition duration-200">
                <div className="space-y-3.5">
                  <div className="aspect-square bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-center relative overflow-hidden">
                    <img src={p.image} alt={p.name} className="h-full w-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-slate-950 text-sm leading-snug line-clamp-2">{p.name}</h4>
                    <p className="text-[10.5px] text-slate-400 uppercase tracking-widest mt-0.5">{p.category}</p>
                    <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">{p.description}</p>
                  </div>
                </div>

                <div className="flex items-end justify-between pt-4 border-t border-slate-150 mt-4">
                  <div>
                    <span className="text-[8.5px] text-slate-400 block uppercase font-bold">List Price</span>
                    <span className="text-lg font-black text-slate-900 font-mono">₹{p.price.toLocaleString('en-IN')}</span>
                  </div>
                  <button
                    onClick={() => handleAddToCart(p)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition ${getThemeColorClass(tenant.themeColor)}`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Floating interactive store-switcher bar at bottom of storefront view */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-white shadow-2xl border border-slate-200 rounded-2xl p-3 flex items-center gap-3.5 text-xs max-w-[90%] font-semibold shadow-slate-900/10">
        <span className="text-slate-400 font-bold px-1 uppercase tracking-wider text-[10px] shrink-0">Switch Subdomain:</span>
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none max-w-[400px]">
          {state.tenants.map((t) => (
            <button
              key={t.id}
              onClick={() => handleBranchSwitch(t.id)}
              className={`px-3 py-1.5 rounded-xl text-[10.5px] font-bold border transition ${
                t.id === tenant.id
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
