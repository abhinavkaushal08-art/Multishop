/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSaaS } from '../context/SaaSContext';
import { LoginModal } from './LoginModal';
import {
  Layers, LogOut, User, Store, Shield, ShoppingBag, Globe, LayoutDashboard, RefreshCw,
  ChevronDown, Grid, KeyRound, Sparkles, PlusCircle, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PremiumNavbar: React.FC = () => {
  const { state, setRole, logout } = useSaaS();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'login' | 'register'>('login');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dashboardDropdownOpen, setDashboardDropdownOpen] = useState(false);

  const mockRoles = [
    { id: 'landing', label: 'Platform Landing', icon: Globe },
    { id: 'vendor', label: 'Store Vendor', icon: Store },
    { id: 'customer', label: 'Customer', icon: User },
    { id: 'storefront', label: 'Storefront', icon: ShoppingBag },
  ] as const;

  const activeRole = mockRoles.find(r => r.id === state.currentRole) || mockRoles[0];

  const handleOpenAuth = (tab: 'login' | 'register') => {
    if (tab === 'login') {
      setRole('sign-in');
    } else {
      setModalTab(tab);
      setModalOpen(true);
    }
  };

  const handleRoleAction = (role: typeof state.currentRole) => {
    setRole(role);
    setDropdownOpen(false);
  };

  const handleLogoutAction = () => {
    logout();
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-6 z-50">
            {/* Brand Logo & Tag */}
            <div 
              onClick={() => handleRoleAction('landing')} 
              className="flex items-center gap-2.5 cursor-pointer group"
              id="premium-logo"
            >
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-700 flex items-center justify-center text-white shadow-lg shadow-purple-600/10 group-hover:scale-105 transition-all">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <span className="font-display font-black text-xl tracking-tight text-slate-900 block leading-tight">
                  MultiShop
                </span>
                <span className="text-[9px] font-bold text-slate-400 block tracking-widest uppercase -mt-0.5">
                  multi-tenant cluster
                </span>
              </div>
            </div>
          </div>

          {/* Center Links (SaaS Core Info) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
            <a href="#features" className="hover:text-purple-600 transition-colors">Platform Capabilities</a>
            <a href="#roles" className="hover:text-purple-600 transition-colors bg-slate-50 py-1 px-2.5 rounded-lg border border-slate-100 flex items-center gap-1.5 hover:bg-slate-100">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span>Interactive Roles</span>
            </a>
            <span 
              onClick={() => handleOpenAuth('register')} 
              className="hover:text-purple-600 transition-colors cursor-pointer flex items-center gap-1 font-bold text-purple-600"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Deploy a Brand Store</span>
            </span>

            <div className="hidden md:block h-6 w-px bg-slate-200" />
            
            {/* Dashboard Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setDashboardDropdownOpen(!dashboardDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <LayoutDashboard className="h-4 w-4 text-purple-600" />
                <span className="text-xs font-bold text-slate-700">Dashboard</span>
                <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${dashboardDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {dashboardDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setDashboardDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-xl p-1.5 z-40"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 mb-1">
                        <p className="text-[9px] uppercase font-black tracking-widest text-slate-400">Select View</p>
                      </div>
                      {mockRoles.map((role) => {
                        const Icon = role.icon;
                        const isActive = state.currentRole === role.id;
                        return (
                          <button
                            key={role.id}
                            onClick={() => {
                              handleRoleAction(role.id);
                              setDashboardDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                              isActive 
                                ? 'bg-purple-50 text-temp-purple-500 font-bold' 
                                : 'text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            <Icon className={`h-4 w-4 ${isActive ? 'text-purple-600' : 'text-slate-400'}`} />
                            <span className="text-xs">{role.label}</span>
                          </button>
                        );
                      })}
                      <div className="border-t border-slate-100 mt-1 pt-1">
                        <button
                          onClick={() => {
                            localStorage.removeItem('multishop_saas_state');
                            window.location.reload();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors text-slate-500 hover:bg-rose-50 hover:text-rose-600 font-semibold"
                        >
                          <RefreshCw className="h-4 w-4" />
                          <span className="text-xs">Reset System</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Area: Dynamic Auth Controller */}
          <div className="flex items-center gap-3">
            {!state.isAuthenticated ? (
              /* Display standard actions if not logged in */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenAuth('login')}
                  className="text-slate-700 hover:text-purple-600 font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-slate-50 transition"
                  id="btn-nav-signin"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleOpenAuth('register')}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4.5 py-2.5 rounded-xl transition shadow-md shadow-purple-600/10 hover:shadow-purple-600/20 hover:-translate-y-0.5 flex items-center gap-1.5"
                  id="btn-nav-deploy"
                >
                  <span>Build Store</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              /* Gorgeous, context-aware profiles for active login sessions */
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl transition text-left cursor-pointer outline-none"
                  id="btn-nav-user-profile"
                >
                  <img
                    src={state.currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}
                    alt={state.currentUser.name}
                    className="h-8 w-8 rounded-lg object-cover bg-white border border-slate-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="hidden sm:block">
                    <p className="text-[10px] font-bold text-slate-800 line-clamp-1">{state.currentUser.name}</p>
                    {/* Role specific Badge */}
                    <span className={`inline-block text-[8px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded-md ${
                      state.currentUserType === 'vendor' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                      'bg-purple-50 text-purple-600 border border-purple-100'
                    }`}>
                      {state.currentUserType === 'vendor' ? 'Store Vendor' : 'Shopper'}
                    </span>
                  </div>
                  <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile drop-down overlay content */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      {/* Backdrop to dismiss dropdown click outside */}
                      <div className="fixed inset-0 z-30" onClick={() => setDropdownOpen(false)} />
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl rounded-2xl p-2 z-40 font-sans"
                      >
                        <div className="px-3.5 py-3 border-b border-slate-100 text-left">
                          <p className="text-[9px] uppercase font-black tracking-widest text-slate-400">SESSION IDENTIFIER</p>
                          <p className="text-xs font-bold text-slate-800 leading-tight mt-1 truncate">{state.currentUser.email}</p>
                        </div>

                        {/* Navigation based on Authenticated Workspace */}
                        <div className="p-1 space-y-0.5">
                          <button
                            onClick={() => handleRoleAction('landing')}
                            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex items-center gap-2.5"
                          >
                            <Grid className="h-4 w-4 text-slate-400" />
                            <span>Platform Homepage</span>
                          </button>

                          {state.currentUserType === 'vendor' && (
                            <button
                              onClick={() => handleRoleAction('vendor')}
                              className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-emerald-700 hover:bg-emerald-50/50 flex items-center gap-2.5 font-bold"
                            >
                              <Store className="h-4 w-4 text-emerald-500" />
                              <span>Manager Workspace</span>
                            </button>
                          )}

                          <button
                            onClick={() => handleRoleAction('customer')}
                            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-purple-700 hover:bg-purple-50/50 flex items-center gap-2.5 font-bold"
                          >
                            <ShoppingBag className="h-4 w-4 text-purple-500" />
                            <span>Go to Shopping Hub</span>
                          </button>
                        </div>

                        <div className="p-1 border-t border-slate-100">
                          <button
                            onClick={handleLogoutAction}
                            className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2.5"
                          >
                            <LogOut className="h-4 w-4 text-rose-500" />
                            <span>Disconnect Session</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>
      </nav>

      {/* Persistent Authentication & Register modal */}
      <LoginModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        initialTab={modalTab} 
      />
    </>
  );
};
