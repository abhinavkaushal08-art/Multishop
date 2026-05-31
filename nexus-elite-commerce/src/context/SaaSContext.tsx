/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tenant, Product, Order, Vendor, Customer, AppState, OrderStatus } from '../types';
import { initialTenants, initialProducts, initialOrders, initialVendors, mockCurrentUser } from '../data/mockData';

interface SaaSContextType {
  state: AppState;
  setRole: (role: AppState['currentRole']) => void;
  setSelectedTenant: (tenantId: string) => void;
  addTenant: (tenant: Omit<Tenant, 'revenue' | 'ordersCount' | 'productsCount' | 'customersCount' | 'createdAt'>) => void;
  addProduct: (product: Omit<Product, 'id' | 'salesCount'>) => void;
  deleteProduct: (productId: string) => void;
  updateProduct: (product: Product) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addToCart: (product: Product) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkout: () => void;
  login: (email: string, type: 'super-admin' | 'vendor' | 'customer', tenantId?: string) => boolean;
  logout: () => void;
  signup: (name: string, email: string, address?: string, isVendor?: boolean, storeName?: string, storeCategory?: string) => void;
  stats: {
    totalRevenue: number;
    totalOrders: number;
    totalTenants: number;
    totalVendors: number;
    revenueGrowth: number;
    ordersGrowth: number;
    tenantsGrowth: number;
    vendorsGrowth: number;
  };
}

const SaaSContext = createContext<SaaSContextType | undefined>(undefined);

export const SaaSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try loading from localStorage
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('multishop_saas_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure state contains currentRole and currentUser properly
        return {
          ...parsed,
          currentRole: parsed.currentRole || 'landing',
          selectedTenantId: parsed.selectedTenantId || 't-vastra',
          isAuthenticated: typeof parsed.isAuthenticated === 'boolean' ? parsed.isAuthenticated : false,
          currentUserType: parsed.currentUserType || null,
          currentVendorId: parsed.currentVendorId || null,
          customers: parsed.customers || [],
        };
      } catch (e) {
        console.error("Error parsing local state, using defaults", e);
      }
    }
    return {
      tenants: initialTenants,
      products: initialProducts,
      orders: initialOrders,
      vendors: initialVendors,
      customers: [
        { id: "cust-1", name: "Ananya Mehta", email: "ananya.m@example.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80", address: "Mumbai, India" },
        { id: "cust-2", name: "Rahul Verma", email: "rahul.v@example.com", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80", address: "Delhi, India" }
      ],
      currentRole: 'landing',
      selectedTenantId: 't-vastra',
      currentUser: mockCurrentUser,
      cart: [],
      isAuthenticated: false,
      currentUserType: null,
      currentVendorId: null,
    };
  });

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('multishop_saas_state', JSON.stringify(state));
  }, [state]);

  const setRole = (role: AppState['currentRole']) => {
    setState(prev => ({ ...prev, currentRole: role }));
  };

  const setSelectedTenant = (tenantId: string) => {
    setState(prev => ({ ...prev, selectedTenantId: tenantId }));
  };

  const addTenant = (newTenantData: Omit<Tenant, 'revenue' | 'ordersCount' | 'productsCount' | 'customersCount' | 'createdAt'>) => {
    const newTenant: Tenant = {
      ...newTenantData,
      revenue: 0,
      ordersCount: 0,
      productsCount: 3,
      customersCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };

    // Also populate with some default products for this tenant context
    const demoProducts: Product[] = [
      {
        id: `p-demo-1-${newTenant.id}`,
        tenantId: newTenant.id,
        name: 'Eco Sustainable Backpack',
        price: 49.99,
        rating: 4.8,
        reviews: 12,
        stock: 50,
        description: `Premium essential product curated meticulously for ${newTenant.name}. Beautiful organic materials.`,
        category: newTenant.category,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
        salesCount: 0,
      },
      {
        id: `p-demo-2-${newTenant.id}`,
        tenantId: newTenant.id,
        name: 'Vibrant Classic Mug',
        price: 19.99,
        rating: 4.5,
        reviews: 8,
        stock: 120,
        description: 'Double-walled thermo mug keeping liquids at pristine temperatures.',
        category: newTenant.category,
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=400&q=80',
        salesCount: 0,
      },
      {
        id: `p-demo-3-${newTenant.id}`,
        tenantId: newTenant.id,
        name: 'Chronometa Modernist Clock',
        price: 39.99,
        rating: 4.9,
        reviews: 15,
        stock: 12,
        description: 'Silent sweep movement analog clock with high-contrast architectural numbers.',
        category: newTenant.category,
        image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdcd1d?auto=format&fit=crop&w=400&q=80',
        salesCount: 0,
      }
    ];

    // Create a default vendor for this tenant
    const newVendor: Vendor = {
      id: `v-new-${newTenant.id}`,
      tenantId: newTenant.id,
      name: `Agent of ${newTenant.name}`,
      email: `concierge@${newTenant.slug}.com`,
      role: 'Owner',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    };

    setState(prev => ({
      ...prev,
      tenants: [...prev.tenants, newTenant],
      products: [...prev.products, ...demoProducts],
      vendors: [...prev.vendors, newVendor]
    }));
  };

  const addProduct = (productData: Omit<Product, 'id' | 'salesCount'>) => {
    const newProduct: Product = {
      ...productData,
      id: `p-custom-${Date.now()}`,
      salesCount: 0,
    };

    setState(prev => {
      // Increment product count on the tenant
      const updatedTenants = prev.tenants.map(t => {
        if (t.id === productData.tenantId) {
          return { ...t, productsCount: t.productsCount + 1 };
        }
        return t;
      });

      return {
        ...prev,
        products: [...prev.products, newProduct],
        tenants: updatedTenants,
      };
    });
  };

  const deleteProduct = (productId: string) => {
    setState(prev => {
      const product = prev.products.find(p => p.id === productId);
      if (!product) return prev;

      const updatedTenants = prev.tenants.map(t => {
        if (t.id === product.tenantId) {
          return { ...t, productsCount: Math.max(0, t.productsCount - 1) };
        }
        return t;
      });

      return {
        ...prev,
        products: prev.products.filter(p => p.id !== productId),
        tenants: updatedTenants,
        cart: prev.cart.filter(item => item.product.id !== productId),
      };
    });
  };

  const updateProduct = (updatedProduct: Product) => {
    setState(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === updatedProduct.id ? updatedProduct : p),
      cart: prev.cart.map(item => item.product.id === updatedProduct.id ? { ...item, product: updatedProduct } : item),
    }));
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setState(prev => {
      const originalOrder = prev.orders.find(o => o.id === orderId);
      if (!originalOrder) return prev;

      // When converting toCompleted from pending/processing for the first time
      let revenueDifference = 0;
      const isFinishing = status === 'Completed' && originalOrder.status !== 'Completed';
      const isReverting = status !== 'Completed' && originalOrder.status === 'Completed';

      if (isFinishing) {
        revenueDifference = originalOrder.amount;
      } else if (isReverting) {
        revenueDifference = -originalOrder.amount;
      }

      const updatedOrders = prev.orders.map(o => o.id === orderId ? { ...o, status } : o);

      const updatedTenants = prev.tenants.map(t => {
        if (t.id === originalOrder.tenantId) {
          const revenueChange = revenueDifference;
          const ordersCountChange = isFinishing ? 1 : (isReverting ? -1 : 0);
          return {
            ...t,
            revenue: Math.max(0, t.revenue + revenueChange),
            ordersCount: Math.max(0, t.ordersCount + ordersCountChange),
          };
        }
        return t;
      });

      return {
        ...prev,
        orders: updatedOrders,
        tenants: updatedTenants,
      };
    });
  };

  const addToCart = (product: Product) => {
    setState(prev => {
      const existing = prev.cart.find(item => item.product.id === product.id);
      if (existing) {
        return {
          ...prev,
          cart: prev.cart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...prev,
        cart: [...prev.cart, { product, quantity: 1 }],
      };
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setState(prev => ({
      ...prev,
      cart: prev.cart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }));
  };

  const removeFromCart = (productId: string) => {
    setState(prev => ({
      ...prev,
      cart: prev.cart.filter(item => item.product.id !== productId),
    }));
  };

  const clearCart = () => {
    setState(prev => ({ ...prev, cart: [] }));
  };

  const checkout = () => {
    if (state.cart.length === 0) return;

    // Group items by tenant for multiple split orders or a single multi-tenant order.
    // For simplicity, let's group the items into separate orders if they belong to different tenants,
    // or log as a single combined customer order list.
    const cartByTenant = state.cart.reduce((acc, item) => {
      const tId = item.product.tenantId;
      if (!acc[tId]) acc[tId] = [];
      acc[tId].push(item);
      return acc;
    }, {} as Record<string, { product: Product; quantity: number }[]>);

    const newOrders: Order[] = [];

    for (const tenantId in cartByTenant) {
      if (Object.prototype.hasOwnProperty.call(cartByTenant, tenantId)) {
        const items = cartByTenant[tenantId];
        const tenant = state.tenants.find(t => t.id === tenantId);
        const tenantName = tenant ? tenant.name : 'Unknown Store';
        const orderAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

        const orderItem: Order = {
          id: `ORD${Math.floor(1000 + Math.random() * 9000)}`,
          tenantId,
          tenantName,
          customerName: state.currentUser.name,
          customerEmail: state.currentUser.email,
          amount: parseFloat(orderAmount.toFixed(2)),
          status: 'Completed', // Super fast micro-purchase mock success!
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          items: items.map(item => ({
            productId: item.product.id,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
          })),
        };

        newOrders.push(orderItem);
      }
    }

    setState(prev => {
      // Calculate updated stats for vendors/tenants
      const updatedTenants = prev.tenants.map(t => {
        const correspondingOrder = newOrders.find(no => no.tenantId === t.id);
        if (correspondingOrder) {
          // Increment revenue, orders Count and simulated client density
          return {
            ...t,
            revenue: t.revenue + correspondingOrder.amount,
            ordersCount: t.ordersCount + 1,
            customersCount: t.customersCount + 1,
          };
        }
        return t;
      });

      // Update product stocks & sales counts
      const updatedProducts = prev.products.map(p => {
        const itemInCart = prev.cart.find(c => c.product.id === p.id);
        if (itemInCart) {
          return {
            ...p,
            stock: Math.max(0, p.stock - itemInCart.quantity),
            salesCount: p.salesCount + itemInCart.quantity,
          };
        }
        return p;
      });

      return {
        ...prev,
        orders: [...newOrders, ...prev.orders],
        tenants: updatedTenants,
        products: updatedProducts,
        cart: [],
      };
    });
  };

  const login = (email: string, type: 'super-admin' | 'vendor' | 'customer', tenantId?: string): boolean => {
    // 1. Super Admin Bypass
    if (type === 'super-admin') {
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        currentUserType: 'super-admin',
        currentVendorId: null,
        currentRole: 'super-admin',
        currentUser: {
          id: 'un-admin',
          name: 'Super Admin',
          email: email,
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
          address: 'Global Command Center'
        }
      }));
      return true;
    }

    // 2. Vendor Login
    if (type === 'vendor') {
      const vendor = state.vendors.find(v => v.email.toLowerCase() === email.toLowerCase());
      if (vendor) {
        setState(prev => ({
          ...prev,
          isAuthenticated: true,
          currentUserType: 'vendor',
          currentVendorId: vendor.id,
          selectedTenantId: vendor.tenantId,
          currentRole: 'vendor',
          currentUser: {
            id: `c-${vendor.id}`,
            name: vendor.name,
            email: vendor.email,
            avatar: vendor.avatar,
            address: 'Merchant Headquarters'
          }
        }));
        return true;
      }
      return false;
    }

    // 3. Customer Shopper
    if (type === 'customer') {
      const nameFromEmail = email.split('@')[0];
      const capitalizedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
      
      setState(prev => {
        const isExistingMock = email.toLowerCase() === 'abhinavkaushal08@gmail.com';
        const userProfile = isExistingMock ? mockCurrentUser : {
          id: `c-custom-${Date.now()}`,
          name: `${capitalizedName} Shopper`,
          email: email.toLowerCase(),
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          address: '123 E-Commerce Blvd, Digital City'
        };

        return {
          ...prev,
          isAuthenticated: true,
          currentUserType: 'customer',
          currentVendorId: null,
          currentRole: 'customer',
          currentUser: userProfile
        };
      });
      return true;
    }

    return false;
  };

  const logout = () => {
    setState(prev => ({
      ...prev,
      isAuthenticated: false,
      currentUserType: null,
      currentVendorId: null,
      currentRole: 'landing',
      currentUser: mockCurrentUser,
      cart: []
    }));
  };

  const signup = (name: string, email: string, address?: string, isVendor?: boolean, storeName?: string, storeCategory?: string) => {
    if (isVendor && storeName) {
      // Vendor/Store signup
      const slug = storeName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const tenantId = `t-${slug}-${Date.now().toString().slice(-4)}`;
      
      const newTenant: Tenant = {
        id: tenantId,
        name: storeName,
        slug,
        logo: 'Store',
        domain: `${slug}.multishop.com`,
        category: storeCategory || 'Retail',
        revenue: 0,
        ordersCount: 0,
        productsCount: 0,
        customersCount: 0,
        themeColor: 'indigo',
        accentColor: '#6366f1',
        bannerText: `Welcome to ${storeName}! Premium curated selections.`,
        bannerImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
        active: true,
        createdAt: new Date().toISOString().split('T')[0],
      };

      const newVendor: Vendor = {
        id: `v-${Date.now()}`,
        tenantId: tenantId,
        name: name,
        email: email.toLowerCase(),
        role: 'Owner',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
      };

      setState(prev => ({
        ...prev,
        tenants: [...prev.tenants, newTenant],
        vendors: [...prev.vendors, newVendor],
        isAuthenticated: true,
        currentUserType: 'vendor',
        currentVendorId: newVendor.id,
        selectedTenantId: tenantId,
        currentRole: 'vendor',
        currentUser: {
          id: `c-${newVendor.id}`,
          name: newVendor.name,
          email: newVendor.email,
          avatar: newVendor.avatar,
          address: 'Merchant Headquarters'
        }
      }));
    } else {
      // Customer registration
      const newCust: Customer = {
        id: `c-reg-${Date.now()}`,
        name,
        email: email.toLowerCase(),
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
        address: address || '123 E-Commerce Blvd, Digital City'
      };

      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        currentUserType: 'customer',
        currentVendorId: null,
        currentRole: 'customer',
        currentUser: newCust
      }));
    }
  };

  // Derive global super admin statistics
  const totalRevenue = parseFloat(state.tenants.reduce((sum, t) => sum + t.revenue, 0).toFixed(2));
  const totalOrders = state.tenants.reduce((sum, t) => sum + t.ordersCount, 0);
  const totalTenants = state.tenants.length;
  const totalVendors = state.vendors.length;

  const stats = {
    totalRevenue,
    totalOrders,
    totalTenants,
    totalVendors,
    revenueGrowth: 15.7,
    ordersGrowth: 10.1,
    tenantsGrowth: 12.5,
    vendorsGrowth: 8.3,
  };

  return (
    <SaaSContext.Provider value={{
      state,
      setRole,
      setSelectedTenant,
      addTenant,
      addProduct,
      deleteProduct,
      updateProduct,
      updateOrderStatus,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      checkout,
      login,
      logout,
      signup,
      stats,
    }}>
      {children}
    </SaaSContext.Provider>
  );
};

export const useSaaS = () => {
  const context = useContext(SaaSContext);
  if (!context) {
    throw new Error('useSaaS must be used within a SaaSProvider');
  }
  return context;
};
