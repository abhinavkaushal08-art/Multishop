/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useSaaS } from '../context/SaaSContext';
import { Product } from '../types';
import {
  ShoppingBag, Globe, ShoppingCart, User, Trash2, ArrowRight,
  TrendingUp, CreditCard, CheckCircle2, Star, Sparkles, Plus, Minus, MapPin, Inbox, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CustomerPortal: React.FC = () => {
  const {
    state,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    checkout,
    setSelectedTenant,
    setRole
  } = useSaaS();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'completed'>('cart');
  const [shippingAddress, setShippingAddress] = useState(state.currentUser.address || '');
  const [promoCode, setPromoCode] = useState('');
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Animated payment card interactive states
  const [cardName, setCardName] = useState(state.currentUser.name || 'Alex Shopper');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('323');
  const [isCardBack, setIsCardBack] = useState(false);

  // Sync state if currentUser changes
  React.useEffect(() => {
    setCardName(state.currentUser.name);
    setShippingAddress(state.currentUser.address || '');
  }, [state.currentUser]);

  // Dynamic multi-tenant payment splits calculator
  const tenantPaymentSplits = useMemo(() => {
    const splits: { tenantName: string; subtotal: number; fee: number; payout: number; theme: string }[] = [];
    const splitsMap: Record<string, { tenantName: string; subtotal: number; theme: string }> = {};

    state.cart.forEach(item => {
      const p = item.product;
      const t = state.tenants.find(ten => ten.id === p.tenantId);
      if (!t) return;
      
      const itemPriceTotal = p.price * item.quantity;
      if (!splitsMap[p.tenantId]) {
        splitsMap[p.tenantId] = {
          tenantName: t.name,
          subtotal: 0,
          theme: t.themeColor || 'purple'
        };
      }
      splitsMap[p.tenantId].subtotal += itemPriceTotal;
    });

    Object.entries(splitsMap).forEach(([tenantId, data]) => {
      // Calculate prorated share of discount if code was applied
      const totalCartSubtotal = state.cart.reduce((s, it) => s + it.product.price * it.quantity, 0);
      const ratio = totalCartSubtotal > 0 ? (data.subtotal / totalCartSubtotal) : 0;
      const actualSubtotalAfterDiscount = data.subtotal - (ratio * (promoCode.toLowerCase() === 'multishop50' ? totalCartSubtotal * 0.5 : 0));
      
      const appFee = actualSubtotalAfterDiscount * 0.025; // 2.5% SaaS transaction commission fee
      const vendorPayout = actualSubtotalAfterDiscount - appFee;

      splits.push({
        tenantName: data.tenantName,
        subtotal: parseFloat(actualSubtotalAfterDiscount.toFixed(2)),
        fee: parseFloat(appFee.toFixed(2)),
        payout: parseFloat(vendorPayout.toFixed(2)),
        theme: data.theme
      });
    });

    return splits;
  }, [state.cart, state.tenants, promoCode]);

  // Filter cross-tenant products for general global recommendations
  const recommendedProducts = useMemo(() => {
    // Recommend top rated or highly sold products
    return state.products.slice(0, 4);
  }, [state.products]);

  // Calculate cart metrics
  const cartSubtotal = useMemo(() => {
    return state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [state.cart]);

  const discountAmount = useMemo(() => {
    return promoCode.toLowerCase() === 'multishop50' ? cartSubtotal * 0.5 : 0;
  }, [promoCode, cartSubtotal]);

  const cartTotal = useMemo(() => {
    return parseFloat((cartSubtotal - discountAmount + 250).toFixed(2));
  }, [cartSubtotal, discountAmount]);

  // Handle cross-buy checkout completion
  const handleFinalCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessAnimation(true);
    checkout(); // Mutate SaaS state
    setCheckoutStep('completed');
    setTimeout(() => {
      setSuccessAnimation(false);
    }, 4000);
  };

  const handleBrandDirectBrowse = (tenantId: string) => {
    setSelectedTenant(tenantId);
    setRole('storefront');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-6 md:p-8 animate-fade-in relative max-w-7xl mx-auto space-y-7">
      {/* Absolute Confetti/Checkout Animation Overlays */}
      <AnimatePresence>
        {successAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0f172a]/70 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6 text-white text-center"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white text-slate-900 border border-slate-200 p-8 rounded-2xl max-w-sm w-full space-y-5 shadow-2xl flex flex-col items-center"
            >
              <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100">
                <CheckCircle2 className="h-10 w-10 animate-bounce" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-display font-black text-xl text-slate-950">Micro-Payments complete!</h3>
                <p className="text-xs text-slate-500">Stripe securely authorized. Multi-tenant split deposits recorded into corresponding vendor ledgers.</p>
              </div>
              <div className="border border-slate-100 p-3 bg-slate-50 rounded-lg text-left text-[11px] font-mono text-slate-400 w-full space-y-0.5">
                <p>AUTHORIZATION: APPROVED</p>
                <p>TRANSACTION: ACQUIRED_OK</p>
                <p>FEE SPLIT: 2.50% MULTISHOP</p>
              </div>
              <button
                onClick={() => { setSuccessAnimation(false); setCheckoutStep('cart'); }}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
              >
                Close Receipt
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Account view custom grid card banner */}
      <div className="bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-950 relative overflow-hidden">
        <button 
          onClick={() => setRole('landing')}
          className="absolute top-4 left-6 md:left-8 text-[9px] uppercase font-black text-slate-400 hover:text-white tracking-wider flex items-center gap-1 cursor-pointer transition"
        >
          ← Back to Platform
        </button>

        <div className="flex gap-4 items-center mt-4">
          <img src={state.currentUser.avatar} alt="Avatar" className="h-12 w-12 rounded-2xl object-cover border border-slate-700 shadow-xl" referrerPolicy="no-referrer" />
          <div>
            <span className="text-[9px] uppercase tracking-wider text-purple-200 font-bold">Shopper Account</span>
            <h2 className="text-xl font-black font-display text-slate-100">Hello, {state.currentUser.name}</h2>
            <div className="flex items-center gap-1 text-[10.5px] text-slate-400 font-medium font-sans mt-0.5">
              <MapPin className="h-3 w-3 inline text-slate-500" />
              <span className="truncate max-w-[280px]">{shippingAddress}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-sans">
          <div className="bg-slate-800/80 border border-slate-700 px-4 py-3 rounded-2xl">
            <span className="text-slate-500 block text-[9px] font-bold uppercase tracking-wider mb-0.5">TOTAL CART ITEMS</span>
            <span className="font-extrabold text-white">{state.cart.reduce((sum, item) => sum + item.quantity, 0)} items</span>
          </div>
          <div className="bg-slate-800/80 border border-slate-700 px-4 py-3 rounded-2xl">
            <span className="text-slate-500 block text-[9px] font-bold uppercase tracking-wider mb-0.5">PURCHASES MADE</span>
            <span className="font-extrabold text-purple-400">{state.orders.length} orders</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left Column (Browse stores, recommneded items, previous purchases) */}
        <div className="lg:col-span-8 space-y-7">
          {/* Multi-Tenant shop explore grid */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-5">
            <div>
              <h3 className="font-display font-bold text-slate-900">Explore Active Multi-Tenant Sub-Brands</h3>
              <p className="text-slate-400 text-xs">These boutique stores operate independently on MultiShop subdomains. Click any to enter their catalog.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {state.tenants.map((t) => (
                <div
                  key={t.id}
                  onClick={() => handleBrandDirectBrowse(t.id)}
                  className="bg-slate-50/50 border border-slate-200 p-4 rounded-xl flex items-center justify-between hover:border-temp-purple-300 hover:shadow-xs cursor-pointer group transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-lg bg-purple-55 bg-purple-50 flex items-center justify-center text-temp-purple-400 font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs mt-0.5 leading-snug">{t.name}</h4>
                      <p className="text-[9.5px] text-slate-400 font-semibold">{t.category}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          {/* Cross-Tenant dynamic recommended products list */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-slate-900">Recommended For You</h3>
                <p className="text-slate-400 text-xs">Cross-merchant curated products that you can pool into a single combined checkout basket.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {recommendedProducts.map((p) => {
                const vendorBrand = state.tenants.find(t => t.id === p.tenantId);
                return (
                  <div key={p.id} className="border border-slate-200 p-3 rounded-xl flex flex-col justify-between hover:shadow-xs bg-white">
                    <div className="space-y-2">
                      <div className="aspect-square bg-slate-50 border border-slate-100 rounded-lg p-2 relative overflow-hidden flex items-center justify-center">
                        <img src={p.image} alt={p.name} className="h-full w-full object-contain" referrerPolicy="no-referrer" />
                        <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-900/80 text-white text-[8px] font-bold font-display uppercase tracking-wider backdrop-blur-xs">
                          {vendorBrand ? vendorBrand.name : 'Store'}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-[11px] leading-snug line-clamp-2">{p.name}</h4>
                      <div className="flex items-center gap-0.5 text-amber-500 font-semibold text-[9px]">
                        <Star className="h-3 w-3 fill-current text-amber-400" />
                        <span>{p.rating} / 5</span>
                      </div>
                    </div>

                    <div className="flex items-end justify-between pt-3 border-t border-slate-100 mt-3">
                      <div>
                        <span className="text-[8.5px] text-slate-400 block uppercase font-bold">List price</span>
                        <span className="text-xs font-black text-slate-950">₹{p.price.toLocaleString('en-IN')}</span>
                      </div>
                      <button
                        onClick={() => addToCart(p)}
                        className="p-1 px-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-[10.5px] transition flex items-center gap-1 scale-95"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shopper My Orders history */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-5">
            <div>
              <h3 className="font-display font-bold text-slate-900">My Historic Purchases</h3>
              <p className="text-slate-400 text-[#64748b] text-xs font-sans">Full trace summaries of payments billed via individual merchant storefront subdomains.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400">
                    <th className="pb-3 pl-2">Receipt Core ID</th>
                    <th className="pb-3">Market Brand Name</th>
                    <th className="pb-3">Purchased Items</th>
                    <th className="pb-3">Billed amount</th>
                    <th className="pb-3 pr-2 text-right">Delivery / Tracking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/60 leading-aligned">
                  {state.orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-slate-400 font-semibold font-sans">No shopper history found for this session. Use checkout to make buy.</td>
                    </tr>
                  ) : (
                    state.orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50">
                        <td className="py-3.5 pl-2 font-mono font-black text-purple-600">#{order.id}</td>
                        <td className="py-3.5 font-bold text-slate-900">{order.tenantName}</td>
                        <td className="py-3.5 font-semibold text-slate-500 max-w-[200px] truncate">
                          {order.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                        </td>
                        <td className="py-3.5 font-extrabold text-slate-950">₹{order.amount.toLocaleString('en-IN')}</td>
                        <td className="py-3.5 pr-2 text-right">
                          <span className={`text-[9px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full border ${
                            order.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                            order.status === 'Processing' ? 'bg-purple-50 text-temp-purple-500 border-purple-100' :
                            order.status === 'Shipped' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                            'bg-amber-50 text-amber-500 border-amber-100'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Unified Micro Checkout Point */}
        <div className="lg:col-span-4 bg-white border border-slate-200 p-6 rounded-2xl space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShoppingCart className="h-5 w-5 text-purple-600" />
            <h3 className="font-display font-bold text-slate-900">Unified Shopping Basket</h3>
          </div>

          {state.cart.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-400 space-y-2">
              <Inbox className="h-10 w-10 text-slate-300" />
              <p className="text-xs font-semibold">Your basket is currently empty.</p>
              <button
                onClick={() => handleBrandDirectBrowse('t-techworld')}
                className="text-[11px] font-black text-purple-600 hover:underline"
              >
                Go Browse Stores
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Cart List of Items */}
              <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
                {state.cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between gap-3 text-xs border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <img src={item.product.image} alt={item.product.name} className="h-10 w-10 object-contain rounded-lg border border-slate-200 bg-slate-50" referrerPolicy="no-referrer" />
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-900 truncate max-w-[130px] leading-tight">{item.product.name}</h4>
                        <span className="text-[9px] text-slate-400 font-bold block">₹{item.product.price.toLocaleString('en-IN')} each</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-slate-200 bg-slate-50 rounded-lg overflow-hidden shrink-0">
                        <button onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)} className="p-1 px-1.5 hover:bg-slate-100 text-slate-500 font-bold">
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="px-1 text-[11px] font-extrabold text-slate-700 font-mono">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)} className="p-1 px-1.5 hover:bg-slate-100 text-slate-500 font-bold">
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>

                      <button onClick={() => removeFromCart(item.product.id)} className="text-slate-400 hover:text-rose-500 transition p-1">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Step indicator */}
              <div className="border-t border-slate-100 pt-4 space-y-4">
                {checkoutStep === 'cart' && (
                  <div className="space-y-4">
                    {/* Promo promo */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo Code: MULTISHOP50"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs bg-slate-50 focus:outline-none focus:border-purple-500 placeholder:text-slate-400"
                      />
                      <button
                        onClick={() => {
                          if (promoCode.toLowerCase() === 'multishop50') {
                            alert('Code matched! Enjoy 50% discount on cart subtotal.');
                          } else {
                            alert('Try applying promotional code "MULTISHOP50" for test discount.');
                          }
                        }}
                        className="px-3.5 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Cost ledger */}
                    <div className="space-y-2 text-xs font-sans text-slate-500">
                      <div className="flex justify-between">
                        <span>Items Subtotal</span>
                        <span className="font-extrabold text-slate-900">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-600">
                          <span>Promo MULTISHOP50 (50%)</span>
                          <span className="font-extrabold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Shipping Delivery</span>
                        <span className="font-extrabold text-slate-900">₹250.00</span>
                      </div>
                      <div className="flex justify-between border-t border-slate-100 pt-2.5 text-sm font-black text-slate-950">
                        <span>Total cart price:</span>
                        <span className="text-purple-600">₹{cartTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCheckoutStep('shipping')}
                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold font-display flex items-center justify-center gap-1 shadow-md shadow-purple-600/10"
                    >
                      <span>Proceed to Shipping</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {checkoutStep === 'shipping' && (
                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-xs text-slate-900">Configure Delivery Site</h4>
                    <div className="space-y-3.5 text-xs">
                      <div>
                        <label className="block text-[9.5px] text-slate-400 font-bold uppercase mb-1">Your Destination Address</label>
                        <input
                          type="text"
                          required
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                          className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-50"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 text-xs">
                      <button onClick={() => setCheckoutStep('cart')} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">
                        Go Back
                      </button>
                      <button onClick={() => setCheckoutStep('payment')} className="flex-1 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700">
                        Proceed to Pay
                      </button>
                    </div>
                  </div>
                )}

                {checkoutStep === 'payment' && (
                  <form onSubmit={handleFinalCheckout} className="space-y-4 font-sans text-left">
                    {/* Interactive 3D Credit Card illustration */}
                    <div className="relative w-full aspect-[1.6] rounded-2xl bg-gradient-to-br from-temp-temp-purple-600 via-slate-900 to-temp-purple-700 text-white p-4.5 overflow-hidden shadow-lg border border-purple-500/10 select-none">
                      <div className="absolute top-1/4 -right-1/4 w-36 h-36 rounded-full bg-purple-500/10 blur-xl pointer-events-none" />
                      <div className="absolute -bottom-1/4 -left-1/4 w-36 h-36 rounded-full bg-purple-600/10 blur-xl pointer-events-none" />
                      
                      {!isCardBack ? (
                        /* Card Front view */
                        <div className="h-full flex flex-col justify-between relative z-10">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] uppercase tracking-widest font-black text-purple-400 font-mono">MULTISHOP SECURE PAY</span>
                            <div className="font-display font-black italic tracking-tighter text-sm">
                              {cardNumber.startsWith('5') ? 'MasterCard' : 'VISA'}
                            </div>
                          </div>

                          <div className="my-1 text-left flex items-center justify-between">
                            <div className="w-8 h-6 bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 rounded-md border border-amber-300/30 flex flex-col justify-between p-1 opacity-90">
                              <div className="h-[1px] bg-amber-800/10 w-full" />
                              <div className="h-[1px] bg-amber-800/10 w-full" />
                            </div>
                            <CreditCard className="h-5 w-5 text-purple-400/80" />
                          </div>

                          <div className="space-y-1.5">
                            <p className="font-mono text-center text-xs tracking-[0.2em] font-extrabold text-slate-100 select-all">
                              {cardNumber || '•••• •••• •••• ••••'}
                            </p>
                            
                            <div className="flex justify-between items-end text-[8.5px]">
                              <div className="min-w-0 max-w-[150px]">
                                <span className="text-slate-400 block uppercase font-bold tracking-wider text-[7px] font-mono">CARDHOLDER</span>
                                <span className="font-bold text-slate-200 font-sans block truncate uppercase leading-tight">{cardName || 'YOUR FULL NAME'}</span>
                              </div>
                              <div className="shrink-0 text-right">
                                <span className="text-slate-400 block uppercase font-bold tracking-wider text-[7px] font-mono">VALID THRU</span>
                                <span className="font-semibold text-slate-200 font-mono block leading-tight">{cardExpiry || 'MM/YY'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* Card Back view */
                        <div className="h-full flex flex-col justify-between relative z-10 py-1">
                          <div className="h-6.5 bg-slate-950 w-full -mx-4.5 mt-1 border-y border-slate-900" />
                          
                          <div className="space-y-2 mt-2">
                            <div className="flex items-center gap-2">
                              <div className="w-full h-6.5 bg-slate-200 rounded text-slate-700 font-mono text-[9px] flex items-center pr-2 justify-end select-none">
                                xxxx xxxx xxxx
                              </div>
                              <div className="w-12 h-6.5 bg-amber-100 text-amber-900 border border-amber-200 text-center font-mono text-[10px] font-bold flex items-center justify-center rounded">
                                {cardCvc || '•••'}
                              </div>
                            </div>
                            <p className="text-[7.5px] text-slate-500 leading-normal font-sans">
                              Dynamic session code authorizes simulated payments across boutique branches securely.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center px-1">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">SECURE CUSTOM CARD FIELDS</span>
                      <button 
                        type="button" 
                        onClick={() => setIsCardBack(!isCardBack)} 
                        className="text-[9px] hover:text-purple-600 hover:underline font-bold text-purple-500 flex items-center gap-1 cursor-pointer"
                      >
                        🔄 Flip Card
                      </button>
                    </div>

                    {/* Inputs fields */}
                    <div className="space-y-2.5 text-xs font-sans">
                      <div>
                        <label className="block text-[9.5px] text-slate-400 font-bold uppercase mb-0.5 font-mono">Card Holder Name</label>
                        <input
                          type="text"
                          required
                          value={cardName}
                          onFocus={() => setIsCardBack(false)}
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[9.5px] text-slate-400 font-bold uppercase mb-0.5 font-mono">Card Number</label>
                        <input
                          type="text"
                          required
                          maxLength={19}
                          value={cardNumber}
                          onFocus={() => setIsCardBack(false)}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
                            const chunks = val.match(/.{1,4}/g);
                            setCardNumber(chunks ? chunks.join(' ') : val);
                          }}
                          className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl outline-none font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[9.5px] text-slate-400 font-bold uppercase mb-0.5 font-mono">Expiry Date</label>
                          <input
                            type="text"
                            required
                            maxLength={5}
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onFocus={() => setIsCardBack(false)}
                            onChange={(e) => {
                              let val = e.target.value.replace(/[^0-9]/g, '');
                              if (val.length > 2) {
                                val = val.slice(0,2) + '/' + val.slice(2,4);
                              }
                              setCardExpiry(val);
                            }}
                            className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl outline-none font-mono text-center"
                          />
                        </div>

                        <div>
                          <label className="block text-[9.5px] text-slate-400 font-bold uppercase mb-0.5 font-mono">CVC Code</label>
                          <input
                            type="text"
                            required
                            maxLength={3}
                            placeholder="323"
                            value={cardCvc}
                            onFocus={() => setIsCardBack(true)}
                            onBlur={() => setIsCardBack(false)}
                            onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ''))}
                            className="w-full px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl outline-none font-mono text-center"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Shared Multi-Tenant Ledgers split calculation telemetry */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3 font-sans">
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                        <div className="flex items-center gap-1.5 text-[9.1px] uppercase font-black tracking-widest text-slate-500 font-mono">
                          <Sparkles className="h-3.5 w-3.5 text-purple-500 animate-pulse" />
                          <span>Tenant Split Deposits</span>
                        </div>
                        <span className="text-[8px] bg-purple-50 border border-purple-100/60 text-purple-600 px-1.5 py-0.5 rounded font-bold uppercase font-mono">SaaS Route OK</span>
                      </div>

                      <div className="space-y-2 text-[10px]">
                        {tenantPaymentSplits.map((split, i) => (
                          <div key={i} className="flex justify-between items-start leading-tight">
                            <div>
                              <p className="font-bold text-slate-800 flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                                <span>{split.tenantName} Payout</span>
                              </p>
                              <p className="text-[8.5px] text-slate-400 pl-2.5">SaaS fee split deduction (2.5%)</p>
                            </div>
                            <div className="text-right font-mono">
                              <p className="font-extrabold text-slate-900">₹{split.payout.toLocaleString('en-IN')}</p>
                              <p className="text-[8.5px] text-slate-400 font-semibold font-mono">₹{split.fee.toLocaleString('en-IN')} Platform fee</p>
                            </div>
                          </div>
                        ))}
 
                        <div className="flex justify-between items-center border-t border-slate-200/60 pt-2 text-[10px]">
                          <span className="text-slate-500">Logical Delivery Logistics:</span>
                          <span className="text-slate-800 font-bold font-mono">₹250.00</span>
                        </div>
                        
                        <div className="flex justify-between items-center font-display font-black text-xs border-t border-slate-200 pt-2 text-slate-950">
                          <span>Total authorization cost:</span>
                          <span className="text-purple-600 font-extrabold text-sm font-mono">₹{cartTotal.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 text-xs pt-1">
                      <button type="button" onClick={() => setCheckoutStep('shipping')} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50">
                        Back
                      </button>
                      <button type="submit" className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold font-display shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 transition flex items-center justify-center gap-1.5 cursor-pointer">
                        <span>Pay ₹{cartTotal.toLocaleString('en-IN')}</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </form>
                )}

                {checkoutStep === 'completed' && (
                  <div className="py-6 text-center space-y-4">
                    <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <div>
                      <h4 className="font-display font-black text-sm text-slate-900">Purchase Completed!</h4>
                      <p className="text-[11px] text-slate-400 mt-1">MultiShop receipts filed. Check your dashboard histories to track active shipment progressions.</p>
                    </div>
                    <button
                      onClick={() => setCheckoutStep('cart')}
                      className="text-xs font-black text-purple-600 hover:underline block mx-auto"
                    >
                      Browse other items
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
