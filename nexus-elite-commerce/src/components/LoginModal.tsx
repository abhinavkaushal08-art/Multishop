/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSaaS } from '../context/SaaSContext';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock, Mail, User, Store, Shield, ArrowRight, CheckCircle2,
  AlertCircle, Sparkles, ShoppingBag, MapPin, Layers
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'login' | 'register';
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, initialTab = 'login' }) => {
  const { state, login, signup } = useSaaS();
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [roleType, setRoleType] = useState<'customer' | 'vendor' | 'super-admin'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  
  // Register fields
  const [isVendorRegister, setIsVendorRegister] = useState(false);
  const [storeName, setStoreName] = useState('');
  const [storeCategory, setStoreCategory] = useState('Fashion');

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleQuickLogin = (emailVal: string, type: 'customer' | 'vendor' | 'super-admin') => {
    setEmail(emailVal);
    setPassword('••••••••');
    setRoleType(type);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      let isOk = false;
      if (roleType === 'super-admin') {
        isOk = login(email || 'admin@multishop.com', 'super-admin');
      } else if (roleType === 'vendor') {
        const actualEmail = email || 'priya@vastra.com';
        isOk = login(actualEmail, 'vendor');
      } else {
        isOk = login(email || 'abhinavkaushal08@gmail.com', 'customer');
      }

      setLoading(false);
      if (isOk) {
        setSuccess('Successfully authenticated! Active session mapped.');
        setTimeout(() => {
          setSuccess(null);
          onClose();
        }, 1500);
      } else {
        setError(roleType === 'vendor' 
          ? 'No registered vendor matches this email. Try "priya@vastra.com"' 
          : 'Invalid credentials. For Super Admin, use "admin@multishop.com" or "admin"'
        );
      }
    }, 800);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (!name || !email) {
        setError('Please fill in all mandatory fields.');
        return;
      }

      if (isVendorRegister) {
        if (!storeName) {
          setError('Please provide a name for your workspace storefront.');
          return;
        }
        signup(name, email, '', true, storeName, storeCategory);
        setSuccess(`Corporate setup complete! Your storefront "${storeName}" is live.`);
      } else {
        signup(name, email, address, false);
        setSuccess(`Account registered! Logging in as ${name}.`);
      }

      setTimeout(() => {
        setSuccess(null);
        onClose();
      }, 2000);
    }, 1000);
  };

  const categories = ['Electronics', 'Fashion', 'Books & Stationery', 'Home & Living', 'Sports & Fitness', 'Retail'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
      />

      {/* Main card */}
      <motion.div
        initial={{ y: 20, scale: 0.95, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 20, scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative bg-white border border-slate-200 shadow-2xl rounded-3xl max-w-lg w-full overflow-hidden z-10 flex flex-col font-sans"
      >
        {/* Top Header Card */}
        <div className="bg-slate-900 text-white p-6 relative overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-temp-temp-purple-300 via-temp-temp-temp-temp-purple-200/80 to-transparent opacity-60" />
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 bg-purple-600 rounded-xl flex items-center justify-center text-white">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display font-black text-lg tracking-tight">MultiShop Cloud Access</h3>
                <p className="text-[11px] text-slate-300">Multi-Tenant E-Commerce Unified Authentication</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-7 w-7 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-slate-400 flex items-center justify-center text-xs transition"
            >
              ✕
            </button>
          </div>

          {/* Sub Tabs Selection */}
          <div className="flex gap-1.5 mt-8 relative z-10 bg-slate-800/80 p-1 rounded-xl w-fit border border-slate-700/50">
            <button
              onClick={() => { setTab('login'); setError(null); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                tab === 'login' ? 'bg-white text-slate-950 shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              Sign In Session
            </button>
            <button
              onClick={() => { setTab('register'); setError(null); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                tab === 'register' ? 'bg-white text-slate-950 shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              Provision Account
            </button>
          </div>
        </div>

        {/* Dynamic Panel Content */}
        <div className="p-6 md:p-8 overflow-y-auto max-h-[70vh] space-y-6">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs flex gap-2.5 items-start">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span className="font-semibold leading-relaxed">{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-xs flex gap-2.5 items-start">
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 animate-bounce" />
              <span className="font-bold leading-relaxed">{success}</span>
            </div>
          )}

          {tab === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {/* Role Type Tabs */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-black tracking-wider text-slate-400">SELECT LOGIN TYPE</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'customer', label: 'Buyer', icon: ShoppingBag, color: 'border-purple-200 text-purple-700 bg-purple-50' },
                    { id: 'vendor', label: 'Vendor', icon: Store, color: 'border-emerald-200 text-emerald-700 bg-emerald-50' },
                  ].map((role) => {
                    const Icon = role.icon;
                    const isChoice = roleType === role.id;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => { setRoleType(role.id as any); setError(null); }}
                        className={`py-2 px-3.5 rounded-xl border-2 text-xs font-bold transition flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                          isChoice 
                            ? role.color 
                            : 'border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        <span>{role.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Input fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-black tracking-wide mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder={
                        roleType === 'super-admin' ? 'admin@multishop.com' :
                        roleType === 'vendor' ? 'priya@vastra.com' : 'abhinavkaushal08@gmail.com'
                      }
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans outline-none focus:bg-white focus:border-slate-350"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-black tracking-wide mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-sans outline-none focus:bg-white focus:border-slate-350"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 hover:-translate-y-0.5 bg-slate-900 hover:bg-slate-800 font-bold font-display text-white text-xs rounded-xl flex items-center justify-center gap-2 tracking-tight transition"
              >
                {loading ? 'Authenticating...' : 'Authorize Cloud Connection'}
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Quick Assistant logins to test */}
              <div className="border-t border-slate-100 pt-4 mt-2">
                <div className="flex items-center gap-1 bg-purple-50 border border-purple-100/60 p-2.5 rounded-xl text-purple-800 text-[10px] mb-3 leading-relaxed">
                  <Sparkles className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                  <span>Sandbox mode! Click any quick profile account below to instantly switch simulated contexts.</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[9.5px]">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('abhinavkaushal08@gmail.com', 'customer')}
                    className="p-2 border border-slate-100 bg-slate-50 rounded-lg text-left hover:border-purple-300 hover:bg-purple-50 transition"
                  >
                    <span className="font-extrabold text-purple-700 block">👤 Abhinav Buyer</span>
                    <span className="text-[8.5px] text-slate-400">abhinavkaushal08@gmail.com</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('priya@vastra.com', 'vendor')}
                    className="p-2 border border-slate-100 bg-slate-50 rounded-lg text-left hover:border-emerald-300 hover:bg-emerald-50 transition"
                  >
                    <span className="font-extrabold text-emerald-700 block">💼 Priya Vendor</span>
                    <span className="text-[8.5px] text-slate-400">priya@vastra.com</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-4 font-sans">
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-black tracking-wide mb-1">Your Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-black tracking-wide mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Core switch for Vendor Setup storefront */}
              <div className="p-1 px-1.5 border border-slate-150 bg-slate-50 rounded-2xl flex items-center justify-between gap-3 text-xs">
                <span className="font-bold text-slate-800 text-[10.5px] pl-2">Create as business vendor storefront?</span>
                <button
                  type="button"
                  onClick={() => setIsVendorRegister(!isVendorRegister)}
                  className={`px-3 py-1.5 hover:shadow-xs rounded-xl text-[10.5px] font-black uppercase tracking-wide border transition ${
                    isVendorRegister 
                      ? 'bg-purple-600 text-white border-purple-650'
                      : 'bg-white text-slate-500 border-slate-200'
                  }`}
                >
                  {isVendorRegister ? 'Yes, launch Store' : 'No, regular Buyer'}
                </button>
              </div>

              {/* Toggled workspace configurations */}
              {isVendorRegister ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="space-y-4 border-l-2 border-purple-100 pl-4 py-1"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-black tracking-wide mb-1">Market Brand Name</label>
                      <div className="relative">
                        <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <input
                          type="text"
                          required={isVendorRegister}
                          placeholder="Cyber Gear"
                          value={storeName}
                          onChange={(e) => setStoreName(e.target.value)}
                          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-white focus:bg-white outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase font-black tracking-wide mb-1">Domain Slug (subdomain)</label>
                      <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden px-1 pr-2">
                        <span className="text-[10px] text-slate-400 bg-slate-100 py-1.5 px-2 rounded-lg font-mono font-bold select-none mr-2 shrink-0">
                          slug:
                        </span>
                        <input
                          type="text"
                          readOnly
                          value={storeName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'cybergear'}
                          className="w-full bg-transparent border-none text-xs text-purple-600 font-mono font-bold outline-none select-all truncate shrink-0 max-w-[120px]"
                        />
                        <span className="text-[9px] text-slate-400 font-mono font-semibold shrink-0">.multishop.in</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-black tracking-wide mb-1">Catalog Category Area</label>
                    <select
                      value={storeCategory}
                      onChange={(e) => setStoreCategory(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs outline-none bg-white"
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-black tracking-wide mb-1">Delivery Destination Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Sector 62, Noida, Uttar Pradesh - 201301"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:bg-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-purple-600 hover:bg-purple-750 hover:shadow-lg font-black font-display text-white text-xs uppercase tracking-wider rounded-xl transition"
              >
                {loading ? 'Processing Provision...' : isVendorRegister ? 'Deploy Storefront Cluster' : 'Initiate Customer Account'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
