/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type OrderStatus = 'Completed' | 'Processing' | 'Shipped' | 'Pending';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logo: string;
  domain: string;
  category: string;
  revenue: number;
  ordersCount: number;
  productsCount: number;
  customersCount: number;
  themeColor: string; // Tailwind color class or hex (e.g. 'indigo', 'emerald', etc.)
  accentColor: string;
  bannerText: string;
  bannerImage: string;
  active: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  tenantId: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  stock: number;
  description: string;
  category: string;
  image: string;
  salesCount: number;
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  tenantId: string;
  tenantName: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: OrderStatus;
  date: string;
  items: OrderItem[];
}

export interface Vendor {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  role: 'Owner' | 'Manager';
  avatar: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  address?: string;
}

export interface AppState {
  tenants: Tenant[];
  products: Product[];
  orders: Order[];
  vendors: Vendor[];
  customers: Customer[];
  currentRole: 'landing' | 'super-admin' | 'vendor' | 'customer' | 'storefront' | 'sign-in';
  selectedTenantId: string; // For store-specific views (vendor / storefront)
  currentUser: Customer;
  cart: { product: Product; quantity: number }[];
  isAuthenticated: boolean;
  currentUserType: 'super-admin' | 'vendor' | 'customer' | null;
  currentVendorId: string | null;
}
