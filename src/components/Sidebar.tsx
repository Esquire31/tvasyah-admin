/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  LineChart, 
  Package, 
  Users, 
  Settings, 
  HelpCircle,
  Download,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onDownloadReports: () => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen,
  onDownloadReports
}: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'metrics', label: 'Metrics', icon: LineChart },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-primary text-on-primary shadow-2xl z-50 py-8 px-6 
        flex flex-col justify-between transition-transform duration-300 ease-in-out
        md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col space-y-12">
          {/* Header Brand */}
          <div className="flex justify-between items-center px-2">
            <div>
              <h1 className="font-headline text-3xl italic font-light tracking-wide text-on-primary">
                Linen &amp; Moss
              </h1>
              <p className="font-body uppercase tracking-[0.3em] text-[9px] opacity-60 mt-1">
                Admin Portal
              </p>
            </div>
            <button 
              className="md:hidden text-on-primary/70 hover:text-on-primary"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-4 py-3 px-4 transition-all duration-200 group rounded-none text-left
                    ${isActive 
                      ? 'text-tertiary font-bold border-r-2 border-tertiary bg-white/5' 
                      : 'text-on-primary/70 hover:text-on-primary hover:bg-white/5'
                    }
                  `}
                >
                  <IconComponent 
                    size={18} 
                    className={`transition-colors duration-200 ${isActive ? 'text-tertiary' : 'text-on-primary/50 group-hover:text-on-primary'}`} 
                  />
                  <span className="font-body uppercase tracking-[0.25em] text-[10px] font-medium">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer/Settings Section */}
        <div className="flex flex-col space-y-6">
          <button 
            onClick={onDownloadReports}
            className="w-full bg-tertiary text-primary py-3.5 px-4 font-body uppercase tracking-widest text-[10px] font-bold hover:bg-tertiary/90 transition-all shadow-lg active:scale-95 duration-200 flex items-center justify-center gap-2"
          >
            <Download size={12} />
            Download Reports
          </button>

          <div className="flex flex-col space-y-3 pt-4 border-t border-on-primary/10">
            <button
              onClick={() => {
                setActiveTab('settings');
                setIsOpen(false);
              }}
              className={`
                flex items-center space-x-3 px-4 py-2 transition-colors duration-200 text-left
                ${activeTab === 'settings' ? 'text-tertiary font-bold' : 'text-on-primary/70 hover:text-on-primary'}
              `}
            >
              <Settings size={14} className="text-on-primary/40" />
              <span className="font-body uppercase tracking-[0.25em] text-[9px]">Settings</span>
            </button>
            
            <button
              onClick={() => {
                setActiveTab('support');
                setIsOpen(false);
              }}
              className={`
                flex items-center space-x-3 px-4 py-2 transition-colors duration-200 text-left
                ${activeTab === 'support' ? 'text-tertiary font-bold' : 'text-on-primary/70 hover:text-on-primary'}
              `}
            >
              <HelpCircle size={14} className="text-on-primary/40" />
              <span className="font-body uppercase tracking-[0.25em] text-[9px]">Support</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
