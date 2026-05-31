/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useSaaS } from '../context/SaaSContext';
import { PremiumNavbar } from './PremiumNavbar';
import {
  Layers, Lock, CreditCard, BarChart3, Radio, ArrowRight, Play, CheckCircle,
  Cpu, Shirt, BookOpen, Smartphone, Dumbbell, ChevronRight, Sparkles, AlertCircle,
  ShieldCheck, Star, Server, Twitter, Github, Linkedin, Plus, Minus, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import generatedImage1 from '../assets/images/regenerated_image_1780228743782.jpg';

export const LandingPage: React.FC = () => {
  const { state, setRole, setSelectedTenant } = useSaaS();
  const [demoOpen, setDemoOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: "How long does it take to launch a tenant store?", a: "Instantly. Once approved, vendors can self-configure their storefront via the unified dashboard and go live within minutes." },
    { q: "Is the platform SEO friendly for individual vendors?", a: "Yes. Each tenant receives a dedicated host-subdomain which ensures isolated indexing and domain-level SEO capabilities." },
    { q: "Who handles the payment processing?", a: "MultiShop handles transparent split-routing—vendors receive their cuts in near-real-time while the platform automatically deducts fractional SaaS fees." },
    { q: "What happens if a vendor needs more server resources?", a: "We run on auto-scaling serverless clusters. Traffic spikes on one storefront will never affect performance on others." }
  ];

  const testimonials = [
    { text: "MultiShop transformed how we onboard merchants. Scaling from 10 to 500 stores was entirely frictionless.", name: "Priya Sharma", role: "CTO, RetailHub", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
    { text: "The isolated tenant experience gives our brands the customization they need, without compromising security.", name: "Arjun Desai", role: "Head of Digital, Aarka", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80" },
    { text: "We migrated our entire legacy marketplace to MultiShop in under 2 weeks. The automated payout routing alone saved us hundreds of hours.", name: "Sarah Jenkins", role: "Operations Lead, MarketFlow", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" },
    { text: "MultiShop's tenant controls are unmatched. Each of our subsidiary brands feels like they own their platform, while we maintain global oversight.", name: "David Chen", role: "VP Engineering, Synapse", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" },
    { text: "Incredible resilience during our peak sale season. The auto-scaling handled a 10x traffic spike flawlessly.", name: "Anita Patel", role: "Director of IT, Vastram", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
    { text: "The cleanest API and easiest vendor dashboard we have ever used. Our merchants love the built-in analytics and inventory tools.", name: "Michael Rossi", role: "Founder, VendorStack", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
  ];

  const partners = [
    { id: 't-indusha', name: 'Indus Sound & Tech', icon: Cpu, color: 'text-amber-500 bg-amber-50' },
    { id: 't-vastra', name: 'Kora Luxury Handlooms', icon: Shirt, color: 'text-purple-300 bg-purple-50' },
    { id: 't-grantha', name: 'Grantha Rare Editions', icon: BookOpen, color: 'text-emerald-500 bg-emerald-50' },
    { id: 't-akasha', name: 'Akasha Living Spaces', icon: Smartphone, color: 'text-purple-500 bg-purple-50' },
    { id: 't-ayurwellness', name: 'Vedic Premium Wellness', icon: Dumbbell, color: 'text-rose-500 bg-rose-50' },
  ];

  const features = [
    {
      icon: Layers,
      title: 'Multi-Tenant Architecture',
      desc: 'Completely isolated tenant environments sharing a robust unified platform with secure host subdomains.',
      color: 'bg-purple-50 text-temp-temp-purple-200 border-purple-100',
    },
    {
      icon: Lock,
      title: 'Role-Based Access Control',
      desc: 'Symmetric role permissions separating platform Super Admins, merchant Store Vendors, and Customers.',
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      desc: 'Out-of-the-box Stripe payments with customized checkout, split receipts, and multi-tenant billing.',
      color: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      desc: 'Real-time multi-dimensional dashboards for telemetry, business intelligence, order flow, and revenue.',
      color: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      icon: Radio,
      title: 'Scalable & Reliable',
      desc: 'Serverless deployment clusters, 99.99% high-availability architectures engineered for limitless tenant expansion.',
      color: 'bg-rose-50 text-rose-600 border-rose-100',
    }
  ];

  const handlePartnerClick = (tenantId: string) => {
    setSelectedTenant(tenantId);
    setRole('storefront');
  };

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('Thank you! A multi-tenant specialist will contact you in 15 minutes.');
    setTimeout(() => {
      setSuccessMsg('');
      setDemoOpen(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-purple-500 selection:text-white font-sans animate-fade-in">
      {/* Premium Multi-Tenant SaaS Navbar with Live Auth */}
      <PremiumNavbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Dynamic decorative backdrop radial grid */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -z-10 h-72 w-72 rounded-full bg-purple-400/20 blur-3xl" />
        <div className="absolute top-1/2 right-10 -z-10 h-64 w-64 rounded-full bg-purple-300/10 blur-3xl animate-pulse-glow" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center lg:min-h-[500px]">
          {/* Hero messaging */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }}
            className="lg:col-span-6 flex flex-col justify-center space-y-7 text-center lg:text-left pr-0 lg:pr-8"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex py-1 px-3.5 bg-purple-50 border border-purple-100 text-temp-purple-500 hover:bg-purple-100 hover:border-purple-200 transition-colors rounded-full font-semibold text-xs tracking-wide uppercase mx-auto lg:mx-0 w-fit"
            >
              ✦ Multi-Tenant E-Commerce Platform
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-slate-950 leading-[1.1]"
            >
              One Platform.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-500">
                Multiple Businesses.
              </span><br />
              <span className="block italic text-slate-900 font-medium">Limitless Growth.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-lg text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              Empower vendors to launch, manage, and grow their online stores under a unified ecosystem. Secure. Scalable. Smart.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-1"
            >
              <button
                onClick={() => setRole('sign-in')}
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg shadow-purple-600/15 hover:shadow-purple-600/25 hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setDemoOpen(true)}
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold px-8 py-4 rounded-xl transition-all hover:border-slate-300 flex items-center justify-center gap-2"
              >
                <Play className="h-4 w-4 fill-current text-slate-600" />
                <span>Book a Demo</span>
              </button>
              <button
                onClick={() => setRole('super-admin')}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-semibold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>SOFTWARE</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Hero Visual representation of custom storefront */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-6 relative flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[460px] md:max-w-[480px]">
              {/* Outer floating shadow frames */}
              <div 
                className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-purple-500/10 rounded-3xl -rotate-2 scale-[1.02] -z-10" 
              />
              <div 
                className="absolute inset-0 bg-purple-600/5 rounded-3xl rotate-1 scale-[1.01] -z-10" 
              />

              {/* Multi-Tenant shop preview window mock */}
              <div 
                className="bg-white border border-slate-200/80 rounded-2xl shadow-xl overflow-hidden shadow-slate-900/5 select-none hover:shadow-2xl transition-all duration-500"
              >
                <div className="bg-slate-50 border-b border-slate-100 py-3 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono bg-slate-200/50 rounded px-4 py-0.5 select-all">
                    kora.multishop.in
                  </div>
                  <div className="text-slate-300">
                    <Layers className="h-3.5 w-3.5" />
                  </div>
                </div>

                {/* Simulated Store Grid */}
                <div className="p-5 space-y-5 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-semibold text-sm text-slate-900">Your Store</span>
                    <div className="flex gap-4 text-[11px] font-semibold text-slate-500">
                      <span className="text-purple-600 font-bold border-b border-purple-600">Home</span>
                      <span>Shop</span>
                      <span>Categories</span>
                      <span>About</span>
                    </div>
                  </div>

                  {/* Promo Banner */}
                  <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 py-5 px-6 rounded-xl text-white relative overflow-hidden">
                    <div className="relative z-10 space-y-1 max-w-[65%]">
                      <div className="text-[10px] text-purple-200 uppercase tracking-widest font-bold">Summer Sale</div>
                      <h4 className="font-display text-lg font-black leading-tight">Up to 50% Off</h4>
                      <button className="bg-white text-purple-600 hover:bg-slate-50 transition-colors font-bold text-[9px] px-3.5 py-1.5 rounded-lg">Shop Now</button>
                    </div>
                    {/* Abstract shopping carrier illustration */}
                    <div className="absolute right-3.5 bottom-2 w-28 h-20 opacity-90 drop-shadow-md">
                      <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80" alt="Backpack preview" className="object-contain h-full w-full" referrerPolicy="no-referrer" />
                    </div>
                  </div>

                  {/* Featured products row */}
                  <div>
                    <h5 className="font-semibold text-[11px] uppercase tracking-wider text-slate-400 mb-2.5">Featured Products</h5>
                    <div className="grid grid-cols-4 gap-2.5">
                      {[
                        { name: 'Indus Studio Headphones', price: '₹18,499', url: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=100&q=80' },
                        { name: 'Chrono Elite Watch', price: '₹24,900', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=80' },
                        { name: 'Kora Voyage Duffel', price: '₹6,500', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=100&q=80' },
                        { name: 'Rajputana Leather Juttis', price: '₹4,200', url: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=100&q=80' }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-slate-50 border border-slate-100 p-2 rounded-lg text-center flex flex-col justify-between aspect-square">
                          <img src={item.url} alt={item.name} className="h-10 w-fit mx-auto object-contain rounded" referrerPolicy="no-referrer" />
                          <div className="mt-1">
                            <p className="text-[8px] font-bold text-slate-800 line-clamp-1 leading-tight">{item.name}</p>
                            <p className="text-[7.5px] font-extrabold text-purple-600 mt-0.5">{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature / Capabilities Cards Section */}
      <section id="features" className="bg-white border-y border-slate-200/60 py-20 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto space-y-14">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight">
              Engineered or Scale & Enterprise Isolation
            </h2>
            <p className="text-slate-500 font-sans leading-relaxed">
              Unlock a complete set of features built to deliver custom storefronts on isolated tenant networks instantly.
            </p>
          </div>

          {/* Grid Layout of Features (5 Columns / Items) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 p-5 rounded-2xl flex flex-col justify-between hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-4">
                    <div className={`p-3 rounded-xl border w-fit ${feat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display font-bold text-base text-slate-900 leading-snug">{feat.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans">{feat.desc}</p>
                  </div>
                  <div 
                    onClick={() => {
                      const el = document.getElementById(`feature-details-${idx}`);
                      if (el) el.classList.toggle('hidden');
                    }}
                    className="pt-4 flex items-center gap-1 text-xs font-semibold text-purple-600 group cursor-pointer mt-auto"
                  >
                    <span>Explore details</span>
                    <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div id={`feature-details-${idx}`} className="hidden mt-4 p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-600 leading-relaxed shadow-inner">
                    Detailed configuration for {feat.title.toLowerCase()} can be managed via the cluster dashboard. Features are instantly propagated across all active tenant nodes.
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner/Tenant Quick Launcher Grid Section */}
      <section className="bg-slate-50 py-16 border-t border-slate-200 overflow-hidden">
        <div className="space-y-8 text-center max-w-7xl mx-auto px-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest leading-6">
            Trusted by Growing Businesses. Click to Live-Explore Tenant Storefronts:
          </p>
        </div>

        <div className="relative mt-8 flex w-[200vw] sm:w-[150vw] md:w-[200vw] lg:w-[150vw] xl:w-[120vw]">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            className="flex gap-6 px-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {[...partners, ...partners].map((partner, idx) => {
              const Icon = partner.icon;
              return (
                <div
                  key={`${partner.id}-${idx}`}
                  onClick={() => handlePartnerClick(partner.id)}
                  className="flex items-center gap-2.5 px-6 py-3.5 bg-white border border-slate-200 rounded-xl hover:border-purple-500 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer transition-all duration-200 text-slate-700 shrink-0 w-64"
                >
                  <div className={`p-2 rounded-lg ${partner.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-display font-bold text-sm tracking-tight truncate">{partner.name}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* "Built for Every Role" Section - Exactly replicating the bottom of Image 2 */}
      <section id="roles" className="bg-slate-50 py-20 px-6 md:px-12 border-t border-slate-200 relative">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3.5">
            <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
              Built for Every Role
            </h2>
            <p className="text-slate-600 font-sans text-sm leading-relaxed">
              Explore custom tailored dashboards customized perfectly to every participant in the multi-tenant SaaS ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Role 2: Vendor */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:border-emerald-200 hover:shadow-xl transition-all group shadow-sm">
              <div className="space-y-4">
                <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <Shirt className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-slate-900">Store Vendor</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
                    Manage isolated storefront stock, customize product catalog pricing, fulfill customers buying requests, and update specific visual layouts instantly.
                  </p>
                </div>
                {/* Visual miniature */}
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl aspect-[1.6] flex flex-col justify-between select-none">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-[7px] text-emerald-600 font-bold">Store Setup</span>
                    <span className="text-[6px] text-slate-500 uppercase">Urban Style</span>
                  </div>
                  <div className="flex justify-between items-center bg-white p-1 rounded border border-slate-100">
                    <div className="space-y-1">
                      <div className="h-1 w-12 bg-slate-200 rounded" />
                      <div className="h-1 w-16 bg-slate-200 rounded" />
                    </div>
                    <div className="h-2.5 w-6 bg-emerald-500 rounded" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-1.5 w-3 bg-slate-200 rounded" />
                    <div className="h-1.5 w-3 bg-slate-200 rounded" />
                    <div className="h-1.5 w-3 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => { setSelectedTenant('t-urbanstyle'); setRole('vendor'); }}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <span>Launch Vendor Portal</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('details-vendor');
                    if (el) el.classList.toggle('hidden');
                  }}
                  className="w-full py-2 px-4 bg-transparent hover:bg-slate-50 text-slate-500 hover:text-emerald-600 font-semibold text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>More Details</span>
                </button>
                <div id="details-vendor" className="hidden mt-2 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-100">
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>Product & Inventory Manager</li>
                    <li>Order Fulfillment Engine</li>
                    <li>Store Customization Options</li>
                    <li>Sales Reports & Insights</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Role 3: Customer */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:border-purple-200 hover:shadow-xl transition-all group shadow-sm">
              <div className="space-y-4">
                <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-slate-900">General Customer</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
                    Browse stunning unified and isolated vendor catalog pages, save multi-tenant card items into a integrated shopping basket, and review billing statements.
                  </p>
                </div>
                {/* Visual miniature */}
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl aspect-[1.6] flex flex-col justify-between select-none">
                  <div className="flex items-center justify-between">
                    <div className="h-1 w-14 bg-slate-200 rounded" />
                    <div className="h-2 w-2 rounded bg-slate-300" />
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="bg-white border border-slate-100 p-1 rounded flex flex-col justify-between h-9">
                      <div className="h-3 w-full bg-slate-200 rounded" />
                      <div className="h-1 w-6 bg-slate-300 rounded" />
                    </div>
                    <div className="bg-white border border-slate-100 p-1 rounded flex flex-col justify-between h-9">
                      <div className="h-3 w-full bg-slate-200 rounded" />
                      <div className="h-1 w-6 bg-slate-300 rounded" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => setRole('customer')}
                  className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <span>Launch Shopping Hub</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('details-customer');
                    if (el) el.classList.toggle('hidden');
                  }}
                  className="w-full py-2 px-4 bg-transparent hover:bg-slate-50 text-slate-500 hover:text-purple-600 font-semibold text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>More Details</span>
                </button>
                <div id="details-customer" className="hidden mt-2 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-100">
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>Universal Shared Cart</li>
                    <li>Unified Order History</li>
                    <li>Multi-Vendor Checkout</li>
                    <li>Saved Payment Methods</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Role 4: Tenant Storefront */}
            <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:border-rose-200 hover:shadow-xl transition-all group shadow-sm">
              <div className="space-y-4">
                <div className="h-10 w-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-slate-900">Tenant Storefront</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans mt-2">
                    A standalone branded subdomain layout. Adapts instantly to vendor visual templates with custom colors, header imagery, and localized inventories.
                  </p>
                </div>
                {/* Visual miniature */}
                <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl aspect-[1.6] flex flex-col justify-between select-none">
                  <div className="bg-purple-50 text-purple-600 text-[6px] p-1 rounded border border-purple-100 leading-relaxed font-bold">
                    Special Promo: Enjoy up to 50% summer reductions!
                  </div>
                  <div className="flex gap-1">
                    <span className="h-2 w-2 rounded-full bg-purple-500" />
                    <span className="h-2 w-2 rounded-full bg-pink-500" />
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="h-2 w-full bg-slate-200 rounded" />
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => { setSelectedTenant('t-techworld'); setRole('storefront'); }}
                  className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md"
                >
                  <span>Launch Public Store</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('details-tenant');
                    if (el) el.classList.toggle('hidden');
                  }}
                  className="w-full py-2 px-4 bg-transparent hover:bg-slate-50 text-slate-500 hover:text-rose-600 font-semibold text-[11px] rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>More Details</span>
                </button>
                <div id="details-tenant" className="hidden mt-2 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-100">
                  <ul className="space-y-1.5 list-disc list-inside">
                    <li>Dynamic Branded Subdomain</li>
                    <li>Vendor-Specific Categorization</li>
                    <li>Local Promotions & Discounts</li>
                    <li>Isolated Secure Checkout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20 px-6 md:px-12 border-t border-slate-200" id="how-it-works">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex py-1 px-3.5 bg-purple-50 border border-purple-100 rounded-full font-semibold text-xs tracking-wide uppercase text-purple-600 mb-2">
              Platform Workflow
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
              Launch and scale in three steps
            </h2>
            <p className="text-slate-500 font-sans leading-relaxed">
              We abstracted away the complex infrastructure so you can focus on building your merchant network.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-[16.66%] right-[16.66%] h-0.5 bg-slate-100 -translate-y-1/2 -z-10" />
            
            {[
              { 
                step: "01", title: "Provision Cluster", 
                desc: "Initialize a secure MultiShop cluster. Your database, isolated compute, and API gateways are automatically configured in seconds." 
              },
              { 
                step: "02", title: "Onboard Tenants", 
                desc: "Send invites to vendors. They receive their own dedicated portal to manage inventory, appearance, and real-time operations." 
              },
              { 
                step: "03", title: "Automate Payouts", 
                desc: "As shoppers purchase across multiple stores, our router instantly splits commissions according to your SaaS fee rule." 
              }
            ].map((s, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg shadow-slate-100/50 flex flex-col items-center text-center relative group hover:border-purple-200 transition-colors">
                <div className="h-14 w-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white font-display font-black text-xl shadow-md shadow-purple-600/20 mb-6 group-hover:scale-110 transition-transform">
                  {s.step}
                </div>
                <h4 className="font-bold text-slate-900 text-xl mb-3">{s.title}</h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Marquee Section */}
      <section className="bg-slate-50 py-20 border-t border-slate-200 overflow-hidden">
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-4 px-6">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
              Trusted by Platform Operators
            </h2>
            <p className="text-slate-500 font-sans leading-relaxed">
              Discover how enterprises are launching multi-vendor marketplaces with unparalleled speed.
            </p>
          </div>
          
          <div className="relative flex w-[200vw] sm:w-[150vw] md:w-[200vw] lg:w-[150vw] xl:w-[120vw]">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10" />
            
            <motion.div 
              className="flex gap-6 px-3"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {[...testimonials, ...testimonials].map((testi, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 flex flex-col justify-between w-80 md:w-96 shrink-0">
                  <div>
                    <div className="flex gap-1.5 text-amber-500 mb-6">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-5 w-5 fill-current" />)}
                    </div>
                    <p className="text-[15px] text-slate-700 font-medium leading-relaxed italic border-l-2 border-purple-500 pl-4 h-32 overflow-hidden">
                      "{testi.text}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-100">
                    <img src={testi.avatar} alt={testi.name} className="h-10 w-10 rounded-full object-cover border-2 border-slate-100 shadow-sm" referrerPolicy="no-referrer" />
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">{testi.name}</h5>
                      <p className="text-[11px] font-semibold text-slate-500">{testi.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-white py-24 px-6 md:px-12 border-t border-slate-200" id="about-us">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-purple-500/20 rounded-3xl blur-2xl transform rotate-3" />
              <img 
                src={generatedImage1}
                alt="MultiShop Analytics and Platform Ecosystem" 
                className="relative rounded-3xl shadow-xl w-full h-auto object-cover border border-slate-200/50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden md:block">
                <div className="flex gap-4 items-center">
                  <div className="h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                    <Globe className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="font-display font-black text-xl text-slate-900">5M+</h5>
                    <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="inline-flex py-1 px-3.5 bg-slate-100 border border-slate-200 rounded-full font-semibold text-xs tracking-wide uppercase text-slate-600">
                About MultiShop
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-slate-900 leading-[1.1]">
                Democratizing<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-500">
                  Global Commerce.
                </span>
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed font-sans">
                <p>
                  Founded in 2024, MultiShop was built to solve a critical constraint for enterprise operators: providing fully isolated, white-labeled storefront experiences to vendors without compromising centralized operational oversight and unified analytics.
                </p>
                <p>
                  We believe that the future of commerce is hyper-local and multi-tenant. By removing infrastructure bottlenecks, we empower growing marketplaces to seamlessly orchestrate thousands of independent retailers, each within their secure platform environment.
                </p>
              </div>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="space-y-1">
                  <h4 className="font-display font-black text-2xl text-slate-900">99.99%</h4>
                  <p className="text-xs font-semibold uppercase text-slate-400">Uptime SLA</p>
                </div>
                <div className="h-12 w-px bg-slate-200" />
                <div className="space-y-1">
                  <h4 className="font-display font-black text-2xl text-slate-900">120+</h4>
                  <p className="text-xs font-semibold uppercase text-slate-400">Active Clusters</p>
                </div>
                <div className="h-12 w-px bg-slate-200" />
                <div className="space-y-1">
                  <h4 className="font-display font-black text-2xl text-slate-900">24/7</h4>
                  <p className="text-xs font-semibold uppercase text-slate-400">Dev Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security and Trust Section */}
      <section className="bg-purple-600 border-y border-purple-700 py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-500/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] -z-10" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-white text-center lg:text-left">
            <div className="inline-flex py-1 px-3.5 bg-purple-500/20 border border-purple-400/30 rounded-full font-semibold text-xs tracking-wide uppercase">
              <ShieldCheck className="h-4 w-4 mr-2 inline-block" />
              Enterprise-Grade Security
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight text-white leading-tight">
              Isolated Workloads.<br />Uncompromised Safety.
            </h2>
            <p className="text-purple-100 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Each vendor network operates in strict isolation. We adhere to PCI-DSS payment compliance standards and SOC2 certified cloud clusters to guarantee absolute data privacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purple-300" />
                <span className="font-bold text-sm text-purple-50">Zero-Trust Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purple-300" />
                <span className="font-bold text-sm text-purple-50">SOC2 Type II Certified</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl space-y-6 max-w-md w-full mr-0">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <Server className="h-6 w-6 text-purple-300" />
                <div>
                  <h5 className="font-bold text-white text-sm">Tenant Isolation</h5>
                  <p className="text-[10px] text-purple-200">Containerized databases prevent leakages.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <Lock className="h-6 w-6 text-emerald-300" />
                <div>
                  <h5 className="font-bold text-white text-sm">End-to-End Encryption</h5>
                  <p className="text-[10px] text-purple-200">TLS 1.3 across all gateway API calls.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <CreditCard className="h-6 w-6 text-amber-300" />
                <div>
                  <h5 className="font-bold text-white text-sm">Payment Tokenization</h5>
                  <p className="text-[10px] text-purple-200">No raw card data touches our servers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-slate-50 py-24 px-6 md:px-12 border-b border-slate-200" id="pricing">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-slate-500 font-sans leading-relaxed">
              No hidden fees. Scale your marketplace with predictable costs and powerful infrastructure out of the box.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-100 flex flex-col hover:border-purple-300 hover:shadow-2xl transition-all">
              <div className="mb-6">
                <h3 className="font-bold text-slate-900 text-xl font-display">Starter Hub</h3>
                <p className="text-sm text-slate-500 mt-2">Perfect for emerging marketplace operators.</p>
              </div>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-black font-display text-slate-900">₹2,499</span>
                <span className="text-sm font-semibold text-slate-400">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><CheckCircle className="h-4 w-4 text-purple-500" /> Up to 50 active tenant stores</li>
                <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><CheckCircle className="h-4 w-4 text-purple-500" /> Flat 3% per-transaction fee</li>
                <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><CheckCircle className="h-4 w-4 text-purple-500" /> Standard API rate limits</li>
                <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><CheckCircle className="h-4 w-4 text-purple-500" /> Email support</li>
              </ul>
              <button onClick={() => setRole('super-admin')} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl transition-colors">Start Free Trial</button>
            </div>

            {/* Scale Plan (Featured) */}
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl flex flex-col relative transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg">
                Most Popular
              </div>
              <div className="mb-6">
                <h3 className="font-bold text-white text-xl font-display">Growth Cluster</h3>
                <p className="text-slate-400 text-sm mt-2">For rapidly scaling vendor networks.</p>
              </div>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-black font-display text-white">₹7,499</span>
                <span className="text-sm font-semibold text-slate-500">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><CheckCircle className="h-4 w-4 text-emerald-400" /> Up to 500 active tenant stores</li>
                <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><CheckCircle className="h-4 w-4 text-emerald-400" /> Reduced 1.5% per-transaction fee</li>
                <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><CheckCircle className="h-4 w-4 text-emerald-400" /> Priority API gateways</li>
                <li className="flex items-center gap-3 text-sm text-slate-300 font-medium"><CheckCircle className="h-4 w-4 text-emerald-400" /> Custom domain issuance</li>
              </ul>
              <button onClick={() => setRole('super-admin')} className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-purple-500/25">Deploy Cluster</button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-100 flex flex-col hover:border-purple-300 hover:shadow-2xl transition-all">
              <div className="mb-6">
                <h3 className="font-bold text-slate-900 text-xl font-display">Enterprise Fabric</h3>
                <p className="text-sm text-slate-500 mt-2">Ultimate isolation and control.</p>
              </div>
              <div className="mb-6 flex items-baseline gap-2">
                <span className="text-4xl font-black font-display text-slate-900">Custom</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><CheckCircle className="h-4 w-4 text-purple-500" /> Unlimited tenant stores</li>
                <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><CheckCircle className="h-4 w-4 text-purple-500" /> Negotiated fractional SLA fees</li>
                <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><CheckCircle className="h-4 w-4 text-purple-500" /> Dedicated VPC deployment</li>
                <li className="flex items-center gap-3 text-sm text-slate-600 font-medium"><CheckCircle className="h-4 w-4 text-purple-500" /> White-glove vendor onboarding</li>
              </ul>
              <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl transition-colors">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20 px-6 md:px-12 border-b border-slate-200">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-colors">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full bg-slate-50 hover:bg-slate-100 flex items-center justify-between p-5 text-left transition-colors"
                >
                  <span className="font-bold text-slate-900 text-sm">{faq.q}</span>
                  {openFaq === idx ? (
                     <Minus className="h-5 w-5 text-slate-400 shrink-0 ml-4" />
                  ) : (
                     <Plus className="h-5 w-5 text-slate-400 shrink-0 ml-4" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-5 pb-5 pt-2 text-sm text-slate-600 bg-white leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-20 pb-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/10">
                  <Layers className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-display font-black text-xl tracking-tight text-white block leading-tight">
                    MultiShop
                  </span>
                  <span className="text-[9px] font-bold text-slate-500 block tracking-widest uppercase -mt-0.5">
                    Tenant Ecosystem
                  </span>
                </div>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-400 max-w-sm">
                The most robust platform engineered for creating, managing, and scaling interconnected multi-vendor marketplaces. Built for extreme isolation and scale.
              </p>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all"><Twitter className="h-4 w-4" /></a>
                <a href="#" className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-slate-800 hover:text-white transition-all"><Github className="h-4 w-4" /></a>
                <a href="#" className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all"><Linkedin className="h-4 w-4" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold tracking-wide uppercase text-[11px] mb-5">Product</h4>
              <ul className="space-y-3.5 text-sm font-semibold">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Tenant Scaling</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold tracking-wide uppercase text-[11px] mb-5">Company</h4>
              <ul className="space-y-3.5 text-sm font-semibold">
                <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold tracking-wide uppercase text-[11px] mb-5">Legal</h4>
              <ul className="space-y-3.5 text-sm font-semibold">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Data Processing Addendum</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Cookie Guidelines</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-600">
            <p>© {new Date().getFullYear()} MultiShop Ecosystems. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <div className="flex items-center gap-1.5 bg-slate-900 py-1 px-2.5 rounded-full border border-slate-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-slate-300">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Signup Modal Sheet */}
      <AnimatePresence>
        {demoOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-md w-full p-6 md:p-8 relative space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-purple-50 p-2 rounded-xl text-purple-600">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <span className="font-display font-black text-slate-900 md:text-lg">Experience MultiShop</span>
                </div>
                <button
                  onClick={() => setDemoOpen(false)}
                  className="p-1 px-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition"
                >
                  ✕
                </button>
              </div>

              <div>
                <h3 className="font-display font-bold text-xl text-slate-950">Book a Technical Platform Demo</h3>
                <p className="text-xs text-slate-500 mt-1">Get custom infrastructure purpleprints, security audits and private pricing sheets.</p>
              </div>

              {successMsg ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm">Request Submitted</h5>
                    <p className="text-xs text-emerald-600 mt-0.5">{successMsg}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Your Name</label>
                    <input required type="text" placeholder="Johnathan Doe" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Business Email</label>
                    <input required type="email" placeholder="john@enterprise.com" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Company / Team Size</label>
                    <select className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-slate-50">
                      <option>1-10 employees</option>
                      <option>11-50 employees</option>
                      <option>51-200 employees</option>
                      <option>200+ employees</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl tracking-tight leading-6 shadow-md shadow-purple-600/10 hover:shadow-purple-600/20"
                  >
                    Send Platform Request
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
