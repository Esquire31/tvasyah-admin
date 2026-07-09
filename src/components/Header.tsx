/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, Search, Bell, Check, User, X } from 'lucide-react';
import { NotificationItem } from '../types';

interface HeaderProps {
  activeTab: string;
  onMenuToggle: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notifications: NotificationItem[];
  onMarkNotificationAsRead: (id: string) => void;
  activeSubTab: 'overview' | 'live' | 'archived';
  setActiveSubTab: (subTab: 'overview' | 'live' | 'archived') => void;
}

export default function Header({
  activeTab,
  onMenuToggle,
  searchQuery,
  setSearchQuery,
  notifications,
  onMarkNotificationAsRead,
  activeSubTab,
  setActiveSubTab
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'orders': return 'Order Manifest';
      case 'metrics': return 'Store Performance & Growth';
      case 'inventory': return 'Inventory Management';
      case 'customers': return 'Customers & Patrons';
      case 'settings': return 'System Settings';
      case 'support': return 'Knowledge & Support';
      default: return 'Botanical Archive';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline/10 flex justify-between items-center w-full px-6 md:px-10 py-4">
      {/* Left section: Hamburger & Title / Nav */}
      <div className="flex items-center space-x-6">
        <button 
          onClick={onMenuToggle}
          className="md:hidden text-primary hover:opacity-80 transition-opacity p-1.5 hover:bg-surface-variant/50 rounded-full"
        >
          <Menu size={22} />
        </button>
        
        <div className="flex items-center space-x-8">
          <h2 className="font-headline text-2xl italic font-semibold text-primary tracking-tight">
            {getPageTitle()}
          </h2>
          
          {/* Editorial Sub tabs for desktop */}
          <nav className="hidden lg:flex items-center space-x-8 pt-1">
            <button 
              onClick={() => setActiveSubTab('overview')}
              className={`
                font-body uppercase tracking-widest text-[10px] pb-1 transition-all duration-200
                ${activeSubTab === 'overview' 
                  ? 'text-primary font-bold border-b border-primary' 
                  : 'text-on-surface-variant hover:text-secondary'
                }
              `}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveSubTab('live')}
              className={`
                font-body uppercase tracking-widest text-[10px] pb-1 transition-all duration-200
                ${activeSubTab === 'live' 
                  ? 'text-primary font-bold border-b border-primary' 
                  : 'text-on-surface-variant hover:text-secondary'
                }
              `}
            >
              Live View
            </button>
            <button 
              onClick={() => setActiveSubTab('archived')}
              className={`
                font-body uppercase tracking-widest text-[10px] pb-1 transition-all duration-200
                ${activeSubTab === 'archived' 
                  ? 'text-primary font-bold border-b border-primary' 
                  : 'text-on-surface-variant hover:text-secondary'
                }
              `}
            >
              Archived
            </button>
          </nav>
        </div>
      </div>

      {/* Right section: Search, notifications, user profile */}
      <div className="flex items-center space-x-6">
        {/* Editorial styled Search bar */}
        <div className="relative hidden md:flex items-center bg-surface-variant px-4 py-2 border-b border-outline max-w-xs transition-all duration-300 focus-within:border-primary">
          <Search size={14} className="text-outline/70 mr-2.5" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none focus:ring-0 text-[11px] font-body italic placeholder:text-outline/40 text-primary w-40 lg:w-48" 
            placeholder="Search archive or records..."
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-outline hover:text-primary transition-colors">
              <X size={12} />
            </button>
          )}
        </div>

        {/* Action icons & Notifications */}
        <div className="flex items-center space-x-4 relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-on-surface-variant hover:text-primary transition-colors p-1.5 hover:bg-surface-variant/50 rounded-full relative"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary ring-2 ring-surface animate-bounce" />
            )}
          </button>

          {/* Interactive Notifications Panel */}
          {showNotifications && (
            <div className="absolute right-0 top-10 w-80 bg-surface-variant border border-outline/15 shadow-2xl z-50 p-4 animate-fade-in text-on-surface">
              <div className="flex justify-between items-center pb-3 border-b border-outline/10 mb-3">
                <span className="font-body uppercase tracking-widest text-[10px] font-bold">
                  Notifications ({unreadCount})
                </span>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="text-outline hover:text-primary transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto scrollbar">
                {notifications.length === 0 ? (
                  <p className="font-body italic text-xs text-outline/60 text-center py-4">No notifications present</p>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-3 transition-colors duration-200 text-left border-l-2 ${
                        notif.type === 'warning' ? 'border-secondary bg-secondary/5' : 
                        notif.type === 'success' ? 'border-tertiary bg-tertiary/5' : 
                        'border-primary bg-primary/5'
                      } ${notif.unread ? 'bg-surface-container-low' : ''}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-body text-xs font-bold leading-tight">
                          {notif.title}
                        </h4>
                        {notif.unread && (
                          <button 
                            onClick={() => onMarkNotificationAsRead(notif.id)}
                            className="text-outline hover:text-primary hover:bg-white/40 p-0.5 rounded transition-all"
                            title="Mark as read"
                          >
                            <Check size={12} />
                          </button>
                        )}
                      </div>
                      <p className="font-body text-[10px] opacity-70 leading-relaxed mb-1">
                        {notif.description}
                      </p>
                      <span className="font-body text-[8px] uppercase tracking-widest opacity-50">
                        {notif.timestamp}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* User profile section */}
          <div className="flex items-center space-x-3 pl-4 border-l border-outline/15">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline/10 bg-surface-container">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0GmY9Og81QJnSWg8jBD8g_ERL-pO5U7FKfYB9NdeAdsU1I90R7WDNX4kD6JEqa53ZQFCoJA59s2qW9oOuRFAflgOwsOcDL8-L_IpekCGIgTgNSRpj_TyVicHdbWrYCrnnbQS7MhD3W63hTV6oRBQy1QoKs-flXMWMosEdaRrQCYEPXJqitfxqNwdFlpUDwVbNqf6_YOS-xxrTnYUhog2LJ81CsbhhS_SzdBH1u_8QWZBzbWRu2kg" 
                alt="Curator Portrait" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if hotlink blocks
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="hidden sm:block text-left leading-none">
              <p className="text-[10px] font-bold uppercase tracking-tighter text-primary">Admin</p>
              <p className="text-[9px] text-on-surface-variant uppercase tracking-widest italic">Anvi</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
