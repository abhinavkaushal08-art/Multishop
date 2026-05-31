/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useSaaS } from '../context/SaaSContext';
import { Tenant, Product, Order, OrderStatus } from '../types';
import {
  Shield, Layers, Users, FolderOpen, ShoppingCart, UserCheck, DollarSign,
  TrendingUp, Search, Bell, Plus, ExternalLink, Settings, ShieldCheck, Mail, Globe, Sparkles, CheckCircle2, ChevronRight, X, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SuperAdminPortal: React.FC = () => {
  const {
    state,
    stats,
    addTenant,
    addProduct,
    updateOrderStatus,
    deleteProduct,
    setSelectedTenant,
    setRole
  } = useSaaS();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'tenants' | 'vendors' | 'products' | 'orders' | 'customers' | 'payments' | 'settings'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);
  const [hasNotifications, setHasNotifications] = useState(true);

  // Modals state
  const [tenantModalOpen, setTenantModalOpen] = useState(false);
  const [vendorModalOpen, setVendorModalOpen] = useState(false);
  const [productModalOpen, setProductModalOpen] = useState(false);

  // Form states
  const [newTenant, setNewTenant] = useState({ name: '', slug: '', category: 'Fashion', themeColor: 'purple', domain: '' });
  const [newVendor, setNewVendor] = useState({ name: '', email: '', tenantId: state.tenants[0]?.id || '', role: 'Owner' as const });
  const [newProd, setNewProd] = useState({ name: '', price: '', stock: '', description: '', tenantId: state.tenants[0]?.id || '', category: 'Fashion' });

  // Notifications helper
  const triggerNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  // Simulated metrics adding a realistic SaaS offset to mock values
  const totalTenantsVal = useMemo(() => 120 + state.tenants.length, [state.tenants]);
  const totalVendorsVal = useMemo(() => 337 + state.vendors.length, [state.vendors]);
  const totalOrdersVal = useMemo(() => 1240 + state.orders.length, [state.orders]);
  const totalRevenueVal = useMemo(() => {
    const customCompletedAmount = state.orders
      .filter(o => o.status === 'Completed')
      .reduce((sum, o) => sum + o.amount, 0);
    return 48920 + customCompletedAmount;
  }, [state.orders]);

  // Handle tenant creation
  const handleTenantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTenant.name || !newTenant.slug) return;

    addTenant({
      id: `t-${newTenant.slug}`,
      name: newTenant.name,
      slug: newTenant.slug,
      logo: 'Layers',
      domain: newTenant.domain || `${newTenant.slug}.multishop.in`,
      category: newTenant.category,
      themeColor: newTenant.themeColor,
      accentColor: '#6366f1',
      bannerText: `Welcome to ${newTenant.name}! New Store Arrivals.`,
      bannerImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      active: true,
    });

    triggerNotification(`Successfully provisioned tenant infrastructure for ${newTenant.name}!`);
    setTenantModalOpen(false);
    setNewTenant({ name: '', slug: '', category: 'Fashion', themeColor: 'purple', domain: '' });
  };

  // Handle vendor creation
  const handleVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerNotification(`SaaS invitation emailed successfully to ${newVendor.email}!`);
    setVendorModalOpen(false);
  };

  // Handle product creation
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;

    addProduct({
      tenantId: newProd.tenantId || state.tenants[0]?.id,
      name: newProd.name,
      price: parseFloat(newProd.price),
      stock: parseInt(newProd.stock) || 10,
      description: newProd.description,
      category: newProd.category,
      rating: 4.5,
      reviews: 1,
      image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=400&q=80',
    });

    triggerNotification(`Added "${newProd.name}" cleanly to store catalog.`);
    setProductModalOpen(false);
    setNewProd({ name: '', price: '', stock: '', description: '', tenantId: state.tenants[0]?.id || '', category: 'Fashion' });
  };

  // Filter lists based on query
  const filteredOrders = useMemo(() => {
    return state.orders.filter(o =>
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [state.orders, searchQuery]);

  const filteredTenants = useMemo(() => {
    return state.tenants.filter(t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [state.tenants, searchQuery]);

  const filteredProducts = useMemo(() => {
    return state.products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [state.products, searchQuery]);

  // Navigate to tenant public storefront from admin
  const handleInspectTenant = (tenantId: string) => {
    setSelectedTenant(tenantId);
    setRole('storefront');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row antialiased font-sans">
      {/* Dynamic Pop notification toast */}
      <AnimatePresence>
        {notificationMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="fixed top-20 right-6 z-50 bg-slate-900 text-white py-3 px-5 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3.5"
          >
            <div className="bg-emerald-500/10 p-1.5 rounded-lg text-emerald-400">
              <CheckCircle2 className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold font-display text-slate-100">Telemetry Sync</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{notificationMsg}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Left Sidebar Navigation (Deep Slate Dark / Glass) */}
      <aside className="w-full lg:w-[270px] bg-[#0c1524] text-slate-400 p-6 flex flex-col justify-between shrink-0 border-r border-[#1a2536]">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex flex-col gap-4">
            <button 
              onClick={() => setRole('landing')}
              className="text-[10px] uppercase font-black text-slate-500 hover:text-white tracking-wider flex items-center gap-1 cursor-pointer transition-colors w-fit"
            >
              ← Back to Platform
            </button>
            <div className="flex items-center gap-3 px-1">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-temp-purple-200 to-temp-purple-300 flex items-center justify-center text-white shadow-lg shadow-purple-500/10">
                <Layers className="h-4.5 w-4.5" />
              </div>
              <div>
                <span className="font-display font-black text-white text-lg tracking-tight">Deccan MultiShop</span>
                <p className="text-[9px] text-purple-400 font-bold uppercase tracking-widest mt-0.5">Software Portal</p>
              </div>
            </div>
          </div>

          {/* Navigation Link list */}
          <nav className="space-y-1">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Shield },
              { id: 'tenants', label: 'Tenants', icon: Globe },
              { id: 'vendors', label: 'Vendors', icon: Users },
              { id: 'customers', label: 'Customers', icon: UserCheck },
              { id: 'products', label: 'Products', icon: FolderOpen },
              { id: 'orders', label: 'Orders', icon: ShoppingCart },
              { id: 'payments', label: 'Payments', icon: DollarSign },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id as any); setSearchQuery(''); }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-150 group font-semibold text-xs tracking-wide ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/15'
                      : 'text-slate-400 hover:bg-[#152238] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logged in user card */}
        <div className="border-t border-[#1a2536] pt-4 mt-8 flex items-center gap-3">
          <img
            src={state.currentUser?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"}
            alt="User Profile"
            className="h-10 w-10 rounded-xl object-cover border border-slate-700"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0 flex-1">
            <h5 className="text-white text-xs font-bold uppercase tracking-wider truncate">
              {state.currentUser?.name || "Admin"}
            </h5>
            <p className="text-[10px] text-slate-500 truncate mt-0.5">
              {state.currentUser?.email || "admin@example.com"}
            </p>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full space-y-7">
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
          <div>
            <h2 className="text-2xl font-black tracking-tight font-display text-slate-900 capitalize">
              {activeTab === 'dashboard' ? 'Overview Statistics' : `${activeTab} Management`}
            </h2>
            <p className="text-xs text-slate-400 font-sans mt-1">
              {activeTab === 'dashboard'
                ? 'Relational databases health, telemetry signals, and aggregated revenue pipelines.'
                : `Inspect and modify active ${activeTab} parameters instantly.`}
            </p>
          </div>

          {/* Search bar and tools */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full sm:w-[240px] bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
              />
            </div>
            <button 
              onClick={() => {
                setHasNotifications(false);
                if (hasNotifications) triggerNotification("You have no new notifications");
              }}
              className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-900 transition-colors relative"
            >
              <Bell className="h-4 w-4 animate-swing" />
              {hasNotifications && <div className="absolute top-1 right-1 h-1.5 w-1.5 bg-rose-500 rounded-full" />}
            </button>
          </div>
        </div>

        {/* Tab switcher renderer */}
        {activeTab === 'dashboard' && (
          <div className="space-y-7">
            {/* 4 Analytics metrics widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Tenants', value: totalTenantsVal, growth: `+${stats.tenantsGrowth}%`, icon: Globe, color: 'text-purple-600 bg-purple-50 border-purple-100' },
                { label: 'Total Vendors', value: totalVendorsVal, growth: `+${stats.vendorsGrowth}%`, icon: Users, color: 'text-purple-600 bg-purple-50 border-purple-100' },
                { label: 'Total Revenue', value: `₹${totalRevenueVal.toLocaleString('en-IN')}`, growth: `+${stats.revenueGrowth}%`, icon: DollarSign, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
                { label: 'Total Orders', value: totalOrdersVal.toLocaleString(), growth: `+${stats.ordersGrowth}%`, icon: ShoppingCart, color: 'text-purple-600 bg-purple-50 border-purple-100' },
              ].map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <span className="text-xs text-slate-400 uppercase tracking-wider font-bold font-sans">{metric.label}</span>
                      <p className="text-2xl font-black tracking-tight text-slate-900">{metric.value}</p>
                      <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-black">
                        <TrendingUp className="h-3 w-3" />
                        <span>{metric.growth}</span>
                        <span className="text-slate-400 font-semibold font-sans normal-case">this year</span>
                      </div>
                    </div>
                    <div className={`p-4 rounded-xl border ${metric.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Middle Section: Revenue Area graph and Donut breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Spline area graph representation using Custom high-fidelity responsive SVG */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl lg:col-span-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-slate-900">Revenue Overview</h3>
                    <p className="text-slate-400 text-xs">Simulated multi-tenant billing logs across active accounts.</p>
                  </div>
                  <select className="border border-slate-200 rounded-lg text-xs p-1.5 px-3 font-semibold bg-slate-50">
                    <option>This Year</option>
                    <option>Last Year</option>
                  </select>
                </div>

                {/* SVG Area graph */}
                <div className="relative aspect-[2.1] w-full min-h-[220px]">
                  <svg className="w-full h-full" viewBox="0 0 700 250" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="0" y1="50" x2="700" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="120" x2="700" y2="120" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="190" x2="700" y2="190" stroke="#f1f5f9" strokeWidth="1" />

                    {/* Chart path spline area */}
                    <path
                      d="M 50 190 Q 150 150, 250 100 T 450 140 T 650 60 L 650 200 L 50 200 Z"
                      fill="url(#areaGrad)"
                    />
                    {/* Line spline path */}
                    <path
                      d="M 50 190 Q 150 150, 250 100 T 450 140 T 650 60"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Dynamic dots indicating months */}
                    <circle cx="50" cy="190" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx="150" cy="155" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx="250" cy="100" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx="350" cy="130" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx="450" cy="140" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx="550" cy="95" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx="650" cy="60" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
                  </svg>
                  {/* Axis indicators */}
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono pt-2">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                  </div>
                </div>
              </div>

              {/* Pie/Donut selector representation using dynamic circular stroke percentages */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl lg:col-span-4 space-y-6 flex flex-col justify-between self-stretch">
                <div>
                  <h3 className="font-display font-bold text-slate-900">Top Categories</h3>
                  <p className="text-slate-400 text-xs text-left">Sector division across gross billing.</p>
                </div>

                <div className="flex items-center justify-center relative p-2 py-4">
                  <svg h-32 w-32 viewBox="0 0 50 50" className="w-[150px] h-[150px] transform -rotate-90">
                    {/* Circle rings */}
                    <circle cx="25" cy="25" r="16" fill="transparent" stroke="#f1f5f9" strokeWidth="6" />
                    {/* Electronics: 40% (stroke-dasharray: 40 and total perimeter 100.5) */}
                    <circle cx="25" cy="25" r="16" fill="transparent" stroke="#3b82f6" strokeWidth="6" strokeDasharray="40 100.5" strokeDashoffset="0" />
                    {/* Fashion: 30% */}
                    <circle cx="25" cy="25" r="16" fill="transparent" stroke="#4f46e5" strokeWidth="6" strokeDasharray="30 100.5" strokeDashoffset="-40" />
                    {/* Home & Living: 20% */}
                    <circle cx="25" cy="25" r="16" fill="transparent" stroke="#8b5cf6" strokeWidth="6" strokeDasharray="20 100.5" strokeDashoffset="-70" />
                    {/* Others: 10% */}
                    <circle cx="25" cy="25" r="16" fill="transparent" stroke="#10b981" strokeWidth="6" strokeDasharray="10.5 100.5" strokeDashoffset="-90" />
                  </svg>
                  {/* Center percentage indicator */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display font-black text-2xl text-slate-950">93%</span>
                    <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-widest">Active</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-purple-500 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-700">Elec.</span>
                      <p className="text-[10px] text-slate-400 font-bold">40% share</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-purple-600 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-700">Fashion</span>
                      <p className="text-[10px] text-slate-400 font-bold">30% share</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-purple-500 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-700">Lifestyle</span>
                      <p className="text-[10px] text-slate-400 font-bold">20% share</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-700">Others</span>
                      <p className="text-[10px] text-slate-400 font-bold">10% share</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Recent Orders (Interactive table with actionable statuses) and Quick Actions layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Order management table */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl lg:col-span-8 space-y-5 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-slate-900">Recent Orders Flow</h3>
                    <p className="text-slate-400 text-xs">Click any action status to process payment or delivery instantly.</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-wider text-slate-400">
                        <th className="pb-3 pr-2">ID</th>
                        <th className="pb-3 pr-2">Tenant Store</th>
                        <th className="pb-3 pr-2">Customer Name</th>
                        <th className="pb-3 pr-2">Total amount</th>
                        <th className="pb-3 pr-2">Tracking Status</th>
                        <th className="pb-3">Date Ordered</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/60 text-xs">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">No order traces matched.</td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-slate-50/50">
                            <td className="py-3.5 pr-2 font-mono font-bold text-purple-600">#{order.id}</td>
                            <td className="py-3.5 pr-2 font-semibold text-slate-950">{order.tenantName}</td>
                            <td className="py-3.5 pr-2 font-medium text-slate-600">{order.customerName}</td>
                            <td className="py-3.5 pr-2 font-extrabold text-slate-900">₹{order.amount.toLocaleString('en-IN')}</td>
                            <td className="py-3.5 pr-2">
                              {/* Status dropdown to mutate order state */}
                              <select
                                value={order.status}
                                onChange={(e) => {
                                  updateOrderStatus(order.id, e.target.value as OrderStatus);
                                  triggerNotification(`Updated Order #${order.id} status to ${e.target.value}!`);
                                }}
                                className={`text-[10px] font-black tracking-wide uppercase px-2.5 py-1 rounded-full outline-none border border-transparent transition-colors cursor-pointer ${
                                  order.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                  order.status === 'Processing' ? 'bg-purple-50 text-temp-purple-500 border-purple-100' :
                                  order.status === 'Shipped' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                  'bg-amber-50 text-amber-700 border-amber-100'
                                }`}
                              >
                                <option value="Completed">Completed</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Pending">Pending</option>
                              </select>
                            </td>
                            <td className="py-3.5 text-slate-400 text-[10px] font-bold">{order.date}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Platform Quick Actions */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl lg:col-span-4 space-y-6">
                <div>
                  <h3 className="font-display font-bold text-slate-900">Platform Quick Actions</h3>
                  <p className="text-slate-400 text-xs">Deploy assets/provision networks.</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setTenantModalOpen(true)}
                    className="w-full py-3.5 px-4 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-100/50 hover:border-purple-200 rounded-xl text-xs font-bold transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white p-1.5 rounded-lg">
                        <Plus className="h-3.5 w-3.5" />
                      </div>
                      <span>Add New Tenant</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => setVendorModalOpen(true)}
                    className="w-full py-3.5 px-4 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-100/50 hover:border-purple-200 rounded-xl text-xs font-bold transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white p-1.5 rounded-lg">
                        <Plus className="h-3.5 w-3.5" />
                      </div>
                      <span>Add New Vendor</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => setProductModalOpen(true)}
                    className="w-full py-3.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-100/50 hover:border-emerald-200 rounded-xl text-xs font-bold transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-600 text-white p-1.5 rounded-lg">
                        <Plus className="h-3.5 w-3.5" />
                      </div>
                      <span>Add New Product</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => triggerNotification('Exporting system telemetry configuration reports to CSV...')}
                    className="w-full py-3.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-600 text-white p-1.5 rounded-lg">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </div>
                      <span>View System Reports</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Alternate Tab: Tenants listing */}
        {activeTab === 'tenants' && (
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-slate-900">Tenant Storefront Registry</h3>
                <p className="text-xs text-slate-400">Total active registered multi-tenant micro-stores on the platform.</p>
              </div>
              <button
                onClick={() => setTenantModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow md shadow-purple-500/10"
              >
                <Plus className="h-4 w-4" />
                <span>New Tenant</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTenants.map((t) => (
                <div key={t.id} className="border border-slate-200 p-5 rounded-2xl flex flex-col justify-between hover:shadow-md transition">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm">
                          {t.name[0]}
                        </div>
                        <div>
                          <h4 className="font-display font-medium text-slate-900 leading-tight">{t.name}</h4>
                          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200 font-bold">{t.category}</span>
                        </div>
                      </div>
                      <span className={`h-2.5 w-2.5 rounded-full ${t.active ? 'bg-emerald-500' : 'bg-slate-300'}`} title={t.active ? 'Active' : 'Muted'} />
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-3.5 text-xs text-slate-500">
                      <div>
                        <span>Revenue Earned</span>
                        <p className="text-slate-900 font-extrabold text-sm mt-0.5">₹{t.revenue.toLocaleString('en-IN')}</p>
                      </div>
                      <div>
                        <span>Orders Tracked</span>
                        <p className="text-slate-900 font-extrabold text-sm mt-0.5">{t.ordersCount}</p>
                      </div>
                    </div>

                    <div className="text-[10.5px] font-mono text-slate-400 flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      <span>{t.domain}</span>
                    </div>
                  </div>

                  <div className="pt-5 flex gap-2">
                    <button
                      onClick={() => handleInspectTenant(t.id)}
                      className="flex-1 py-1.5 px-3 bg-slate-55 bg-purple-50 hover:bg-purple-100 transition text-purple-700 border border-purple-200/50 font-bold text-xs rounded-xl flex items-center justify-center gap-1"
                    >
                      <span>Storefront View</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => { setSelectedTenant(t.id); setRole('vendor'); }}
                      className="py-1.5 px-3 hover:bg-slate-50 text-slate-600 font-bold text-xs rounded-xl transition border border-slate-200"
                    >
                      Manage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Alternate Tab: Vendors listing */}
        {activeTab === 'vendors' && (
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-slate-900">Active Vendor Staff Directory</h3>
                <p className="text-xs text-slate-400">Total registered managers operating customized tenant stores.</p>
              </div>
              <button
                onClick={() => setVendorModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-purple-500/10"
              >
                <Plus className="h-4 w-4" />
                <span>Invite Vendor</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400">
                    <th className="pb-3 rounded-l-xl pl-4">Merchant Manager</th>
                    <th className="pb-3">Responsible Storefront</th>
                    <th className="pb-3">Communication Email</th>
                    <th className="pb-3">Access Tier</th>
                    <th className="pb-3 pr-4 text-right">Administrative Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/60 leading-aligned">
                  {state.vendors.map((vendor) => {
                    const ten = state.tenants.find(t => t.id === vendor.tenantId);
                    return (
                      <tr key={vendor.id} className="hover:bg-slate-50/50">
                        <td className="py-4 pl-4 flex items-center gap-3">
                          <img src={vendor.avatar} alt={vendor.name} className="h-9 w-9 rounded-full object-cover border border-slate-200" referrerPolicy="no-referrer" />
                          <span className="font-bold text-slate-900">{vendor.name}</span>
                        </td>
                        <td className="py-4 font-semibold text-slate-700">{ten ? ten.name : 'Platform Common'}</td>
                        <td className="py-4 text-purple-600 font-medium font-sans flex items-center gap-1">
                          <Mail className="h-3 w-3 text-slate-400" />
                          <span>{vendor.email}</span>
                        </td>
                        <td className="py-4">
                          <span className="bg-purple-50 border border-purple-100 text-purple-700 font-black text-[9px] uppercase tracking-wide px-2.5 py-1 rounded-full">
                            {vendor.role}
                          </span>
                        </td>
                        <td className="py-4 pr-4 text-right">
                          <button
                            onClick={() => { setSelectedTenant(vendor.tenantId); setRole('vendor'); }}
                            className="text-xs px-3 py-1 bg-slate-50 hover:bg-slate-100 transition font-bold rounded-lg border border-slate-200"
                          >
                            Impersonate
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Alternate Tab: Customers listing */}
        {activeTab === 'customers' && (
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-slate-900">Platform User Directory</h3>
                <p className="text-xs text-slate-400">Total registered consumers across all tenant stores.</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400">
                    <th className="pb-3 rounded-l-xl pl-4">Customer Name</th>
                    <th className="pb-3">Email Address</th>
                    <th className="pb-3">Location</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/60 leading-aligned">
                  {state.customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-slate-50/50">
                      <td className="py-4 pl-4 flex items-center gap-3">
                        <img src={customer.avatar} alt={customer.name} className="h-9 w-9 rounded-full object-cover border border-slate-200" referrerPolicy="no-referrer" />
                        <span className="font-bold text-slate-900">{customer.name}</span>
                      </td>
                      <td className="py-4 text-purple-600 font-medium font-sans flex items-center gap-1">
                        <Mail className="h-3 w-3 text-slate-400" />
                        <span>{customer.email}</span>
                      </td>
                      <td className="py-4 text-slate-600 font-medium font-sans">{customer.address || "N/A"}</td>
                      <td className="py-4">
                        <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 font-black text-[9px] uppercase tracking-wide px-2.5 py-1 rounded-full">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                  {state.customers.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500 font-medium">
                        No customers registered yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Alternate Tab: All Products listing */}
        {activeTab === 'products' && (
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-slate-900">Unified Global Catalog</h3>
                <p className="text-xs text-slate-400">Master inventory records listing of all items listed across all isolation sub-tenants.</p>
              </div>
              <button
                onClick={() => setProductModalOpen(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-purple-500/10"
              >
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {filteredProducts.map((p) => {
                const shop = state.tenants.find(t => t.id === p.tenantId);
                return (
                  <div key={p.id} className="border border-slate-200 bg-white p-4.5 rounded-2xl hover:shadow-md transition flex flex-col justify-between">
                    <div>
                      {/* Product Card Visual */}
                      <div className="relative aspect-video rounded-xl bg-slate-50 border border-slate-100 mb-4 overflow-hidden">
                        <img src={p.image} alt={p.name} className="h-full w-full object-contain p-2" referrerPolicy="no-referrer" />
                        <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-md">
                          {shop ? shop.name : 'Common'}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-slate-900 leading-snug line-clamp-1">{p.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-wider">{p.category}</p>
                      <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">{p.description}</p>
                    </div>

                    <div className="border-t border-slate-100 pt-4 mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase block">Price tag</span>
                        <span className="text-base font-black text-slate-900">₹{p.price.toLocaleString('en-IN')}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase block text-right">In Stock</span>
                        <span className="text-xs font-bold text-slate-700">{p.stock} units</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100/60 flex gap-2">
                      <button
                        onClick={() => { setSelectedTenant(p.tenantId); setRole('vendor'); }}
                        className="flex-1 py-1.5 px-3 hover:bg-slate-50 text-slate-600 font-bold text-xs rounded-xl transition border border-slate-200 text-center"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteProduct(p.id);
                          triggerNotification(`Deleted "${p.name}" successfully!`);
                        }}
                        className="text-rose-600 border border-rose-100 text-xs px-3 py-1.5 rounded-xl hover:bg-rose-50 transition"
                        title="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Alternate Tab: Orders full manager list */}
        {activeTab === 'orders' && (
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-5">
            <div>
              <h3 className="font-display font-bold text-slate-900">Total Platform Orders Flow</h3>
              <p className="text-xs text-slate-400 font-sans">Full tracking dashboard of financial logs received cross-tenant.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400">
                    <th className="pb-3 pl-4">Order Record ID</th>
                    <th className="pb-3">Source Storefront</th>
                    <th className="pb-3">Purchaser info</th>
                    <th className="pb-3">Total Cost</th>
                    <th className="pb-3">Fulfillment Status</th>
                    <th className="pb-3 pr-4 text-right font-bold">Transaction Stamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/60">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50">
                      <td className="py-4 pl-4 font-mono font-bold text-purple-600">#{order.id}</td>
                      <td className="py-4 font-semibold text-slate-900">{order.tenantName}</td>
                      <td className="py-4">
                        <div className="leading-tight">
                          <p className="font-bold text-slate-900">{order.customerName}</p>
                          <span className="text-[10px] text-[#2563eb] font-semibold">{order.customerEmail}</span>
                        </div>
                      </td>
                      <td className="py-4 font-extrabold text-slate-950">₹{order.amount.toLocaleString('en-IN')}</td>
                      <td className="py-4">
                        <select
                          value={order.status}
                          onChange={(e) => {
                            updateOrderStatus(order.id, e.target.value as OrderStatus);
                            triggerNotification(`Order status updated to ${e.target.value}.`);
                          }}
                          className={`text-[9.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-transparent outline-none cursor-pointer ${
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
                      <td className="py-4 pr-4 text-right text-slate-400 text-[10px] font-bold">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payments View */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display font-bold text-slate-900">Payments & Remittances</h3>
                  <p className="text-xs text-slate-400">Manage transaction histories, commission splits, and vendor payouts.</p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-purple-500/10">
                  Process Payouts
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 border border-slate-200 rounded-xl bg-slate-50">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Unsettled Balance</span>
                  <p className="text-2xl font-black text-slate-900 mt-2">₹1,24,500</p>
                </div>
                <div className="p-4 border border-emerald-100 rounded-xl bg-emerald-50">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Total Disbursed</span>
                  <p className="text-2xl font-black text-emerald-900 mt-2">₹8,45,000</p>
                </div>
                <div className="p-4 border border-purple-100 rounded-xl bg-purple-50">
                  <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Platform Commission</span>
                  <p className="text-2xl font-black text-purple-900 mt-2">₹1,45,900</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 pb-2 text-[10px] font-black uppercase text-slate-400">
                      <th className="pb-3 pl-4">Transaction ID</th>
                      <th className="pb-3">Vendor</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/60 leading-aligned font-medium">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-4 pl-4 font-mono">TXN-00123</td>
                      <td className="py-4">UrbanStyle Outlet</td>
                      <td className="py-4 text-slate-500">Oct 24, 2023</td>
                      <td className="py-4 text-slate-900 font-bold">₹24,500</td>
                      <td className="py-4"><span className="bg-amber-50 text-amber-600 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Pending</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-4 pl-4 font-mono">TXN-00122</td>
                      <td className="py-4">TechWorld Global</td>
                      <td className="py-4 text-slate-500">Oct 22, 2023</td>
                      <td className="py-4 text-slate-900 font-bold">₹1,45,000</td>
                      <td className="py-4"><span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Settled</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-4 pl-4 font-mono">TXN-00121</td>
                      <td className="py-4">Organic Foods</td>
                      <td className="py-4 text-slate-500">Oct 20, 2023</td>
                      <td className="py-4 text-slate-900 font-bold">₹8,900</td>
                      <td className="py-4"><span className="bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Settled</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Settings view */}
        {activeTab === 'settings' && (
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-6">
            <div>
              <h3 className="font-display font-bold text-slate-900">SaaS Global Variables</h3>
              <p className="text-xs text-slate-400">Configure global configurations for multi-tenancy router, subscription plans, and platform fee splits.</p>
            </div>

            <div className="max-w-xl space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wide text-slate-400 mb-1.5">Root SaaS Domain</label>
                  <input type="text" readOnly value="multishop.in" className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wide text-slate-400 mb-1.5">Routing strategy</label>
                  <input type="text" readOnly value="Tenant Subdomains (*.multishop.in)" className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold outline-none" />
                </div>
              </div>

              <div className="border border-slate-200 p-4 rounded-xl space-y-2.5">
                <span className="text-xs font-bold text-slate-900">Standard Platform Fee Percentage</span>
                <p className="text-[11px] text-slate-400">The automatic fee deducted on every customer transaction routed through tenant checkout points.</p>
                <div className="flex items-center gap-3 w-fit">
                  <input type="text" readOnly value="2.5%" className="w-20 px-3.5 py-2 border border-slate-200 text-center font-mono font-bold text-xs rounded-xl bg-slate-50" />
                  <span className="text-xs text-slate-400">per transaction (Standard Merchant tier)</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-3 text-xs">
                <button
                  onClick={() => triggerNotification('Saving premium enterprise multi-tenant credentials to secure backend keychain...')}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-md shadow-purple-500/10"
                >
                  Save Global variables
                </button>
                <button className="text-slate-500 px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition">
                  Discard changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. MODALS FOR FORM INTERACTIONS */}
      <AnimatePresence>
        {/* ADD TENANT MODAL */}
        {tenantModalOpen && (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-sm w-full p-6 relative space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display font-black text-slate-900 text-base flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  <span>Provision New Tenant Domain</span>
                </h3>
                <button onClick={() => setTenantModalOpen(false)} className="text-slate-400 hover:text-slate-800 transition">✕</button>
              </div>

              <form onSubmit={handleTenantSubmit} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Tenant Store Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Modernist Home"
                    value={newTenant.name}
                    onChange={(e) => setNewTenant({ ...newTenant, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '') })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-semibold bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Subdomain Slug</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. modernist"
                      value={newTenant.slug}
                      onChange={(e) => setNewTenant({ ...newTenant, slug: e.target.value.toLowerCase().replace(/\s+/g, '') })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-semibold bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Theme Color Preset</label>
                    <select
                      value={newTenant.themeColor}
                      onChange={(e) => setNewTenant({ ...newTenant, themeColor: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-semibold bg-slate-50"
                    >
                      <option value="purple">Indigo Slate</option>
                      <option value="purple">Futurism Blue</option>
                      <option value="emerald">Forest Moss</option>
                      <option value="rose">Rose Quartz</option>
                      <option value="purple">Deep Violet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Niche Category</label>
                  <select
                    value={newTenant.category}
                    onChange={(e) => setNewTenant({ ...newTenant, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-semibold bg-slate-50"
                  >
                    <option value="Fashion">Fashion & Apparel</option>
                    <option value="Electronics">Electronics & Tech</option>
                    <option value="Books & Stationery">Books & Stationery</option>
                    <option value="Home & Living">Home, Decor & Living</option>
                    <option value="Sports & Fitness">Sports & Active Fitness</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md shadow-purple-600/10 transition mt-2.5"
                >
                  Spin-Up Database & Domain
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* ADD VENDOR MODAL */}
        {vendorModalOpen && (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-sm w-full p-6 relative space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display font-black text-slate-900 text-base flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <span>Invite Merchant Operator</span>
                </h3>
                <button onClick={() => setVendorModalOpen(false)} className="text-slate-400 hover:text-slate-800 transition">✕</button>
              </div>

              <form onSubmit={handleVendorSubmit} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Operator Full Name</label>
                  <input required type="text" placeholder="Sarah Jenkins" className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-semibold bg-slate-50" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Operator Email</label>
                  <input required type="email" placeholder="sarah@decorhome.com" className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-semibold bg-slate-50" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Assign Tenant Entity</label>
                    <select className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-semibold bg-slate-50">
                      {state.tenants.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Manager Access Role</label>
                    <select className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 font-semibold bg-slate-50">
                      <option>Owner (Primary admin)</option>
                      <option>Manager (Assigned staff)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md shadow-purple-600/10 transition mt-2.5"
                >
                  Email Invites & Key-Access Token
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {/* ADD PRODUCT MODAL */}
        {productModalOpen && (
          <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-sm w-full p-6 relative space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display font-black text-slate-900 text-base flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-emerald-600" />
                  <span>Introduce New Catalog Item</span>
                </h3>
                <button onClick={() => setProductModalOpen(false)} className="text-slate-400 hover:text-slate-800 transition">✕</button>
              </div>

              <form onSubmit={handleProductSubmit} className="space-y-4 text-xs font-sans">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Target Tenant Store</label>
                  <select
                    value={newProd.tenantId}
                    onChange={(e) => {
                      const t = state.tenants.find(ten => ten.id === e.target.value);
                      setNewProd({ ...newProd, tenantId: e.target.value, category: t ? t.category : 'Fashion' });
                    }}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl font-semibold bg-slate-50"
                  >
                    {state.tenants.map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.category})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Classic Canvas Satchel"
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-semibold bg-slate-50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">List Price (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      placeholder="18499.00"
                      value={newProd.price}
                      onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-semibold bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Initial Stock (units)</label>
                    <input
                      type="number"
                      placeholder="50"
                      value={newProd.stock}
                      onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                      className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-semibold bg-slate-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Item Description Summary</label>
                  <textarea
                    placeholder="High materials, double-stitched joints for extra longevity."
                    value={newProd.description}
                    onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-semibold bg-slate-50 h-20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/10 transition mt-2.5"
                >
                  Fulfill Inventory Integration
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
