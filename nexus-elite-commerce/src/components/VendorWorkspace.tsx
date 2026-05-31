/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useSaaS } from '../context/SaaSContext';
import { Product, OrderStatus } from '../types';
import {
  Store, Shirt, Cpu, BookOpen, Smartphone, Dumbbell, DollarSign,
  ShoppingCart, Package, Users, Compass, Sliders, Save, Plus, ArrowUpRight, CheckCircle, Edit, Trash2, Globe
} from 'lucide-react';
import { motion } from 'motion/react';

export const VendorWorkspace: React.FC = () => {
  const { state, setSelectedTenant, addProduct, deleteProduct, updateProduct, updateOrderStatus, setRole } = useSaaS();

  // Find currently managed tenant
  const currentTenant = useMemo(() => {
    return state.tenants.find(t => t.id === state.selectedTenantId) || state.tenants[0];
  }, [state.tenants, state.selectedTenantId]);

  // Form states for adding product
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [newProd, setNewProd] = useState({ name: '', price: '', stock: '', description: '' });

  // Store Customizer Visualizer State
  const [config, setConfig] = useState({
    name: currentTenant.name,
    bannerText: currentTenant.bannerText,
    themeColor: currentTenant.themeColor,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sync state configuration if managed tenant changes
  React.useEffect(() => {
    if (currentTenant) {
      setConfig({
        name: currentTenant.name,
        bannerText: currentTenant.bannerText,
        themeColor: currentTenant.themeColor,
      });
    }
  }, [currentTenant]);

  // Get current tenant's products
  const tenantProducts = useMemo(() => {
    return state.products.filter(p => p.tenantId === currentTenant.id);
  }, [state.products, currentTenant]);

  // Get current tenant's orders
  const tenantOrders = useMemo(() => {
    return state.orders.filter(o => o.tenantId === currentTenant.id);
  }, [state.orders, currentTenant]);

  // Calculate stats solely for this tenant
  const tenantStats = useMemo(() => {
    const totalRev = tenantOrders
      .filter(o => o.status === 'Completed')
      .reduce((sum, o) => sum + o.amount, 0);

    return {
      revenue: currentTenant.revenue + totalRev, // combine platform base + custom edits
      orders: currentTenant.ordersCount + tenantOrders.length,
      customers: currentTenant.customersCount + Math.floor(tenantOrders.length * 0.8),
      products: tenantProducts.length,
    };
  }, [currentTenant, tenantOrders, tenantProducts]);

  // Handle adding product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;

    addProduct({
      tenantId: currentTenant.id,
      name: newProd.name,
      price: parseFloat(newProd.price),
      stock: parseInt(newProd.stock) || 30,
      description: newProd.description || 'Premium curated collection item.',
      category: currentTenant.category,
      rating: 4.8,
      reviews: 6,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80', // generic product
    });

    setProductFormOpen(false);
    setNewProd({ name: '', price: '', stock: '', description: '' });
    showToast(`"${newProd.name}" added successfully to your store catalog!`);
  };

  // Save Storefront branding edits
  const handleSaveStoreCustomizer = () => {
    // Find currentTenant and mutate context in-memory
    currentTenant.name = config.name;
    currentTenant.bannerText = config.bannerText;
    currentTenant.themeColor = config.themeColor;
    showToast('Subdomain brand and theme layout colors updated! Sync complete.');
  };

  // Helper theme background highlights
  const getThemeColorClass = (color: string) => {
    switch (color) {
      case 'purple': return 'bg-temp-purple-200 hover:bg-temp-temp-purple-300 text-white';
      case 'purple': return 'bg-purple-600 hover:bg-purple-700 text-white';
      case 'emerald': return 'bg-emerald-600 hover:bg-emerald-700 text-white';
      case 'rose': return 'bg-rose-600 hover:bg-rose-700 text-white';
      case 'purple': return 'bg-purple-600 hover:bg-purple-700 text-white';
      default: return 'bg-[#1e293b] text-white';
    }
  };

  const getThemeTextClass = (color: string) => {
    switch (color) {
      case 'purple': return 'text-purple-600 border-purple-100 bg-purple-50/50';
      case 'purple': return 'text-purple-600 border-purple-100 bg-purple-50/50';
      case 'emerald': return 'text-emerald-600 border-emerald-100 bg-emerald-50/50';
      case 'rose': return 'text-rose-600 border-rose-100 bg-rose-50/50';
      case 'purple': return 'text-purple-600 border-purple-100 bg-purple-50/50';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6 md:p-8 animate-fade-in relative max-w-7xl mx-auto space-y-7">
      {/* Absolute Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 border border-slate-800 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-emerald-400" />
          <span className="text-xs font-black">{toastMessage}</span>
        </div>
      )}

      {/* Top Selector row & Tenant info switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-slate-200 pb-5">
        <div>
          <button 
            onClick={() => setRole('landing')}
            className="text-[10px] uppercase font-black text-purple-500 hover:text-purple-600 tracking-wider flex items-center gap-1 cursor-pointer mb-2"
          >
            ← Back to Platform Landing
          </button>
          <span className="text-xs uppercase font-black text-slate-400 tracking-wider">Merchant workspace</span>
          <h2 className="text-2xl font-black font-display text-slate-900 flex items-center gap-2.5 mt-0.5">
            <Store className="h-6 w-6 text-purple-600" />
            <span>Store Dashboard: {currentTenant.name}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Manage unique catalog, observe live local store orders, and configure visual subdomains.</p>
        </div>

        {/* Store selector list */}
        <div className="flex items-center gap-3 bg-white p-2.5 border border-slate-200 rounded-2xl w-fit">
          <span className="text-xs text-slate-400 font-bold px-1.5 uppercase tracking-wide">Manage store:</span>
          <select
            value={state.selectedTenantId}
            onChange={(e) => setSelectedTenant(e.target.value)}
            className="text-xs font-black uppercase text-slate-900 bg-slate-50 border border-slate-200 rounded-lg p-1.5 px-3 focus:outline-none"
          >
            {state.tenants.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Store metrics specific to current tenant */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Store Revenue', value: `₹${tenantStats.revenue.toLocaleString('en-IN')}`, change: '+18.2%', icon: DollarSign, color: 'text-purple-600 bg-purple-50 border-purple-100' },
          { label: 'Store Orders Count', value: tenantStats.orders, change: '+9.4%', icon: ShoppingCart, color: 'text-purple-600 bg-purple-50 border-purple-100' },
          { label: 'Platform Products Count', value: tenantStats.products, change: '+4.5%', icon: Package, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
          { label: 'Total Store Customers', value: tenantStats.customers, change: '+12.1%', icon: Users, color: 'text-purple-600 bg-purple-50 border-purple-100' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between hover:shadow-sm">
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block">{stat.label}</span>
                <p className="text-xl font-black text-slate-900">{stat.value}</p>
                <span className="text-[9.5px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100/30">
                  {stat.change} up
                </span>
              </div>
              <div className={`p-3.5 rounded-xl border ${stat.color}`}>
                <Icon className="h-5.5 w-5.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main workspace layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Store products and orders management */}
        <div className="lg:col-span-8 space-y-7">
          {/* Products listings inside store */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-slate-900">Manage Store Catalog</h3>
                <p className="text-slate-400 text-xs">Add exclusive catalog goods, track stock quantities, or retire items.</p>
              </div>
              <button
                onClick={() => setProductFormOpen(!productFormOpen)}
                className={`text-xs font-black text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm transition ${getThemeColorClass(currentTenant.themeColor)}`}
              >
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Dropdown form to add product */}
            {productFormOpen && (
              <motion.form
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                onSubmit={handleAddProduct}
                className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-4 text-xs font-sans"
              >
                <h4 className="font-bold text-slate-900 text-xs">Add New Product to {currentTenant.name}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-slate-400 font-bold mb-1">Product Title</label>
                    <input
                      required
                      type="text"
                      placeholder="Urban Leather Messenger Bag"
                      value={newProd.name}
                      onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                      className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold mb-1">Price (₹)</label>
                      <input
                        required
                        type="number"
                        step="0.01"
                        placeholder="2500"
                        value={newProd.price}
                        onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 font-bold mb-1">Stock Vol.</label>
                      <input
                        type="number"
                        placeholder="40"
                        value={newProd.stock}
                        onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-lg outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 font-bold mb-1">Detailed Description Summary</label>
                  <textarea
                    placeholder="Premium leather, water-resistant zippers..."
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg outline-none h-16 resize-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button type="submit" className={`px-4 py-2 font-bold text-xs rounded-xl ${getThemeColorClass(currentTenant.themeColor)}`}>
                    Fulfill Catalog Addition
                  </button>
                  <button type="button" onClick={() => setProductFormOpen(false)} className="px-4 py-2 bg-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-300">
                    Cancel
                  </button>
                </div>
              </motion.form>
            )}

            {/* List of tenant products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tenantProducts.map((p) => (
                <div key={p.id} className="border border-slate-100 bg-slate-50/50 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-12 w-12 rounded-lg object-cover border border-slate-200 bg-white" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs lines-clamp-1">{p.name}</h4>
                      <p className="text-[10px] text-slate-400 font-extrabold mt-0.5">₹{p.price.toLocaleString('en-IN')} — <span className="text-slate-500 font-semibold">{p.stock} in stock</span></p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      deleteProduct(p.id);
                      showToast(`Removed "${p.name}" cleanly from catalog.`);
                    }}
                    className="p-1 px-2.5 text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg text-xs"
                    title="Remove stock product"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Orders list on store */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-5">
            <div>
              <h3 className="font-display font-bold text-slate-900">Live Client Store Orders</h3>
              <p className="text-slate-400 text-xs">Direct financial traces purchased against your dedicated catalog.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400">
                    <th className="pb-3 pl-2">ID</th>
                    <th className="pb-3">Client</th>
                    <th className="pb-3">Products Bought</th>
                    <th className="pb-3">Gross Value</th>
                    <th className="pb-3 pr-2 text-right">Process Fulfill.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/60 leading-aligned">
                  {tenantOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400 font-semibold">No order logs filed at current session.</td>
                    </tr>
                  ) : (
                    tenantOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50">
                        <td className="py-3 pl-2 font-mono font-bold text-purple-600">#{order.id}</td>
                        <td className="py-3 font-semibold text-slate-700">{order.customerName}</td>
                        <td className="py-3 font-semibold text-slate-500 truncate max-w-[200px]">
                          {order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                        </td>
                        <td className="py-3 font-extrabold text-slate-900">₹{order.amount.toLocaleString('en-IN')}</td>
                        <td className="py-3 pr-2 text-right">
                          <select
                            value={order.status}
                            onChange={(e) => {
                              updateOrderStatus(order.id, e.target.value as OrderStatus);
                              showToast(`Order status synced successfully!`);
                            }}
                            className={`text-[9.5px] font-black border border-transparent outline-none uppercase px-2 py-0.5 rounded-full cursor-pointer ${
                              order.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                              order.status === 'Processing' ? 'bg-purple-50 text-purple-700' :
                              order.status === 'Shipped' ? 'bg-purple-50 text-purple-700' :
                              'bg-amber-50 text-amber-700'
                            }`}
                          >
                            <option value="Completed">Completed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Pending">Pending</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Branded customizer panel */}
        <div className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-2xl space-y-6">
          <div className="flex items-center gap-2">
            <Sliders className="h-5 w-5 text-purple-600" />
            <h3 className="font-display font-bold text-slate-900">Custom Subdomain Customizer</h3>
          </div>
          <p className="text-slate-400 text-xs">Instantly style how your public customer-facing store template looks.</p>

          <div className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-1">Branded Storefront Name</label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-1">Featured Banner Slogan</label>
              <input
                type="text"
                value={config.bannerText}
                onChange={(e) => setConfig({ ...config, bannerText: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-400 font-bold mb-1">Theme Palette Accent</label>
              <select
                value={config.themeColor}
                onChange={(e) => setConfig({ ...config, themeColor: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg outline-none font-bold"
              >
                <option value="purple">Indigo Slate (Classic Professional)</option>
                <option value="purple">Electric Futurism Cobalt</option>
                <option value="emerald">Forest Moss Green</option>
                <option value="rose">Soft Coral Rose Quartz</option>
                <option value="purple">Deep Rich Royal Violet</option>
              </select>
            </div>

            {/* Template Preview mock card representation */}
            <div className="border border-slate-200 p-4 rounded-xl space-y-3 bg-slate-50 select-none">
              <span className="text-[10px] font-black text-slate-400 uppercase block">LIVE BRACELET PREVIEW</span>
              <div className={`p-4.5 rounded-xl text-white ${getThemeColorClass(config.themeColor)}`}>
                <div className="text-[9px] uppercase tracking-wider opacity-80">PROMOTIONAL ANNOUNCEMENT</div>
                <h4 className="font-bold text-sm tracking-tight leading-tight mt-1 line-clamp-2">{config.bannerText}</h4>
              </div>
            </div>

            <button
              onClick={handleSaveStoreCustomizer}
              className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              <span>Deploy Subdomain edits</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
