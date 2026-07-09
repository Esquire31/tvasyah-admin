/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  TrendingUp, 
  Bolt, 
  Users, 
  AlertTriangle, 
  Plus, 
  Download,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Order, Specimen, Activity } from '../types';
import { TOP_PERFORMERS } from '../data';

interface DashboardViewProps {
  orders: Order[];
  specimens: Specimen[];
  activities: Activity[];
  onOpenInvoiceModal: () => void;
  onExportCSV: () => void;
  onViewAllOrders: () => void;
  onOrderStatusChange: (id: string, status: any) => void;
}

export default function DashboardView({
  orders,
  specimens,
  activities,
  onOpenInvoiceModal,
  onExportCSV,
  onViewAllOrders,
  onOrderStatusChange
}: DashboardViewProps) {
  
  // Calculate dynamic KPIs
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled' && o.status !== 'Returned')
    .reduce((sum, o) => sum + o.amount, 0) + 40000; // base offset for high-fidelity values

  const lowStockCount = specimens.filter(s => s.stock < 15).length;
  
  return (
    <div className="animate-fade-in text-on-surface">
      {/* Page Header Banner */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="font-body uppercase tracking-[0.4em] text-[10px] text-secondary font-bold block mb-2">
            Botanical Archive System
          </span>
          <h2 className="font-headline text-5xl italic text-primary leading-tight">
            Morning, <span className="font-bold not-italic">Anvi.</span>
          </h2>
          <p className="font-body text-on-surface-variant mt-2 max-w-md">
            Here is your harvest for today. Store activity is up 12% across botanical serum categories.
          </p>
        </div>
        
        <div className="flex space-x-4">
          <button 
            onClick={onOpenInvoiceModal}
            className="px-6 py-3.5 bg-primary text-on-primary font-body uppercase tracking-widest text-[10px] font-bold hover:scale-105 duration-300 flex items-center gap-2 shadow-lg"
          >
            <Plus size={14} /> Create Invoice
          </button>
          
          <button 
            onClick={onExportCSV}
            className="px-6 py-3.5 border border-outline text-primary font-body uppercase tracking-widest text-[10px] font-bold hover:bg-surface-variant transition-colors flex items-center gap-2"
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {/* KPI 1 */}
        <div className="bg-surface border-l-4 border-primary p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group">
          <p className="font-body uppercase tracking-[0.3em] text-[10px] text-on-surface-variant mb-4">
            Total Revenue
          </p>
          <h3 className="font-headline text-4xl font-bold text-primary mb-1">
            ${totalRevenue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </h3>
          <div className="flex items-center text-xs font-body italic text-tertiary">
            <TrendingUp size={14} className="mr-1.5" />
            <span>+8.2% from last month</span>
          </div>
          <div className="absolute right-2 -bottom-2 opacity-5 text-primary group-hover:scale-110 transition-transform">
            <TrendingUp size={80} />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-surface p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group">
          <p className="font-body uppercase tracking-[0.3em] text-[10px] text-on-surface-variant mb-4">
            New Orders (Today)
          </p>
          <h3 className="font-headline text-4xl font-bold text-primary mb-1">
            {orders.length + 119} {/* base dynamic offset */}
          </h3>
          <div className="flex items-center text-xs font-body italic text-secondary">
            <Bolt size={14} className="mr-1.5" />
            <span>Peak at 11:00 AM</span>
          </div>
          <div className="absolute right-2 -bottom-2 opacity-5 text-secondary group-hover:scale-110 transition-transform">
            <Bolt size={80} />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-surface p-8 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group">
          <p className="font-body uppercase tracking-[0.3em] text-[10px] text-on-surface-variant mb-4">
            Active Users
          </p>
          <h3 className="font-headline text-4xl font-bold text-primary mb-1">
            892
          </h3>
          <div className="flex items-center text-xs font-body italic text-tertiary">
            <Users size={14} className="mr-1.5" />
            <span>Live now: 42</span>
          </div>
          <div className="absolute right-2 -bottom-2 opacity-5 text-tertiary group-hover:scale-110 transition-transform">
            <Users size={80} />
          </div>
        </div>

        {/* KPI 4 */}
        <div className={`p-8 shadow-2xl transition-all hover:scale-105 duration-300 relative overflow-hidden group ${lowStockCount > 0 ? 'bg-primary text-on-primary shadow-primary/20' : 'bg-surface-variant border border-outline/10 text-on-surface'}`}>
          <p className={`font-body uppercase tracking-[0.3em] text-[10px] mb-4 ${lowStockCount > 0 ? 'text-on-primary/60' : 'text-on-surface-variant'}`}>
            Low Stock Alerts
          </p>
          <h3 className="font-headline text-4xl font-bold mb-1">
            {lowStockCount.toString().padStart(2, '0')}
          </h3>
          <div className="flex items-center text-xs font-body italic text-tertiary">
            <AlertTriangle size={14} className="mr-1.5" />
            <span>
              {lowStockCount > 0 
                ? `${specimens.find(s => s.stock < 15)?.name || 'Saffron Serum'} critical` 
                : 'All stock levels healthy'}
            </span>
          </div>
          <div className="absolute right-2 -bottom-2 opacity-5 text-tertiary group-hover:scale-110 transition-transform">
            <AlertTriangle size={80} />
          </div>
        </div>
      </div>

      {/* Main Grid: Orders & Products Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Hand: Recent Orders Table */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex justify-between items-baseline border-b border-outline/10 pb-4">
            <h4 className="font-headline text-2xl italic text-primary">
              Recent Orders
            </h4>
            <button 
              onClick={onViewAllOrders}
              className="font-body uppercase tracking-widest text-[10px] text-on-surface-variant hover:text-secondary font-bold transition-colors flex items-center gap-1.5"
            >
              View all archives <ArrowRight size={12} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="font-body uppercase tracking-[0.3em] text-[10px] text-on-surface-variant border-b border-outline/5">
                  <th className="py-4 font-bold">Order ID</th>
                  <th className="py-4 font-bold">Customer</th>
                  <th className="py-4 font-bold">Status</th>
                  <th className="py-4 font-bold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="font-body text-sm text-on-surface">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="group hover:bg-surface-container-low transition-colors border-b border-outline/5">
                    <td className="py-5 font-medium">{order.id}</td>
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-surface-container flex-shrink-0">
                          <img 
                            src={order.avatarUrl} 
                            alt={order.customerName} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <span className="italic">{order.customerName}</span>
                      </div>
                    </td>
                    <td className="py-5">
                      <select
                        value={order.status}
                        onChange={(e) => onOrderStatusChange(order.id, e.target.value as any)}
                        className={`px-3 py-1 font-bold text-[9px] uppercase tracking-widest border-none outline-none focus:ring-0 cursor-pointer ${
                          order.status === 'Processing' ? 'bg-tertiary/15 text-tertiary' :
                          order.status === 'Shipped' ? 'bg-secondary/15 text-secondary' :
                          order.status === 'Delivered' ? 'bg-primary/15 text-primary' :
                          'bg-error/15 text-error'
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Returned">Returned</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="py-5 text-right font-headline text-lg">
                      ${order.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Hand Side Column: Performance & Store Activity */}
        <div className="space-y-12">
          
          {/* Top Performance Products */}
          <section className="bg-surface-variant p-8 shadow-sm">
            <h4 className="font-headline text-xl italic text-primary mb-8 border-b border-outline/10 pb-4 flex items-center justify-between">
              <span>Top Performance</span>
              <Sparkles size={14} className="text-tertiary" />
            </h4>
            
            <div className="space-y-6">
              {TOP_PERFORMERS.map((item) => (
                <div key={item.name} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-16 h-16 bg-surface overflow-hidden flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500 border border-outline/5 shadow-sm">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="font-headline text-md italic font-bold text-primary group-hover:text-secondary transition-colors">
                      {item.name}
                    </p>
                    <p className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant">
                      {item.sold}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-body font-bold text-primary text-sm">
                      {item.revenue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Dynamic Store Activity Feed */}
          <section className="space-y-6">
            <h4 className="font-headline text-xl italic text-primary border-b border-outline/10 pb-4">
              Store Activity
            </h4>
            
            <div className="relative pl-6 space-y-8 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[1px] before:bg-outline/20">
              {activities.slice(0, 4).map((activity) => (
                <div key={activity.id} className="relative animate-fade-in text-left">
                  <span className={`absolute -left-[27px] top-1 w-2 h-2 rounded-full ring-4 ring-surface ${
                    activity.type === 'order' ? 'bg-primary' :
                    activity.type === 'inventory' ? 'bg-secondary' :
                    activity.type === 'customer' ? 'bg-tertiary' :
                    'bg-outline'
                  }`} />
                  <p className="font-body text-xs text-on-surface italic leading-relaxed">
                    <span className="font-bold not-italic mr-1">{activity.boldText}</span> 
                    {activity.text}
                  </p>
                  <p className="text-[9px] uppercase tracking-widest text-on-surface-variant mt-1.5 font-bold">
                    {activity.timestamp}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
