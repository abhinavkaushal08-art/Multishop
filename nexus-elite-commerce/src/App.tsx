/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SaaSProvider, useSaaS } from './context/SaaSContext';
import { LandingPage } from './components/LandingPage';
import { SuperAdminPortal } from './components/SuperAdminPortal';
import { VendorWorkspace } from './components/VendorWorkspace';
import { CustomerPortal } from './components/CustomerPortal';
import { TenantStorefront } from './components/TenantStorefront';
import { SignIn2 } from './components/ui/clean-minimal-sign-in';

const AppContent: React.FC = () => {
  const { state } = useSaaS();

  // Switch workspace layout based on selected simulated role
  const renderRoleWorkspace = () => {
    switch (state.currentRole) {
      case 'landing':
        return <LandingPage />;
      case 'super-admin':
        return <SuperAdminPortal />;
      case 'vendor':
        return <VendorWorkspace />;
      case 'customer':
        return <CustomerPortal />;
      case 'storefront':
        return <TenantStorefront />;
      case 'sign-in':
        return <SignIn2 />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-slate-50 overflow-x-hidden">
      {/* 2. Focused Workspace view */}
      <div className="flex-1 w-full bg-slate-50">
        {renderRoleWorkspace()}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <SaaSProvider>
      <AppContent />
    </SaaSProvider>
  );
}
