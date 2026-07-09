/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Printer, 
  ArrowUpDown, 
  Check, 
  MoreVertical, 
  Eye, 
  X,
  Plus
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface OrdersViewProps {
  orders: Order[];
  onOrderStatusChange: (id: string, status: OrderStatus) => void;
  onOpenInvoiceModal: () => void;
  onPrintInvoice: (order: Order) => void;
  searchQuery: string;
}

export default function OrdersView({
  orders,
  onOrderStatusChange,
  onOpenInvoiceModal,
  onPrintInvoice,
  searchQuery
}: OrdersViewProps) {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All Statuses');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and sort logic
  const filteredOrders = orders.filter(order => {
    const matchesStatus = selectedStatusFilter === 'All Statuses' || order.status === selectedStatusFilter;
    const matchesSearch = searchQuery === '' ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const amountA = a.amount;
    const amountB = b.amount;
    return sortOrder === 'asc' ? amountA - amountB : amountB - amountA;
  });

  // Calculate dynamic stats
  const activeOrdersCount = orders.filter(o => o.status === 'Processing' || o.status === 'Pending').length;
  const totalShippedToday = orders.filter(o => o.status === 'Shipped').length;
  const fulfillmentRate = "98%";

  return (
    <div className="animate-fade-in text-on-surface">
      {/* Top Section / Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0 text-left">
        <div>
          <span className="font-body uppercase tracking-[0.4em] text-[10px] text-secondary font-bold">
            Botanical Archive
          </span>
          <h2 className="font-headline text-5xl italic mt-2">
            Order <span className="text-primary/40">Manifest</span>
          </h2>
        </div>
        
        <div className="flex space-x-4 items-center">
          {/* Status Select Filter */}
          <div className="relative inline-block text-left bg-surface-variant px-4 py-3">
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="appearance-none bg-transparent border-none pr-8 pl-1 text-[10px] tracking-[0.2em] font-body uppercase font-bold cursor-pointer focus:ring-0 focus:outline-none text-primary"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Returned">Returned</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Sort pricing action */}
          <button 
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="flex items-center space-x-2 bg-surface-variant px-6 py-3.5 text-[10px] tracking-[0.2em] font-body uppercase font-bold hover:bg-surface-container transition-colors"
          >
            <ArrowUpDown size={12} />
            <span>Sort By Price ({sortOrder.toUpperCase()})</span>
          </button>

          <button 
            onClick={onOpenInvoiceModal}
            className="bg-primary text-on-primary px-5 py-3.5 font-body uppercase tracking-widest text-[10px] font-bold hover:opacity-95 transition-all shadow-md active:scale-95 duration-200"
          >
            Add Invoice
          </button>
        </div>
      </div>

      {/* Main Table Card Container */}
      <div className="bg-surface-variant shadow-sm overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-primary/5 bg-surface/30">
                <th className="px-8 py-6 font-body uppercase tracking-[0.3em] text-[9px] text-primary/50 font-bold">ID</th>
                <th className="px-8 py-6 font-body uppercase tracking-[0.3em] text-[9px] text-primary/50 font-bold">Customer</th>
                <th className="px-8 py-6 font-body uppercase tracking-[0.3em] text-[9px] text-primary/50 font-bold">Date &amp; Time</th>
                <th className="px-8 py-6 font-body uppercase tracking-[0.3em] text-[9px] text-primary/50 font-bold">Total</th>
                <th className="px-8 py-6 font-body uppercase tracking-[0.3em] text-[9px] text-primary/50 font-bold">Payment</th>
                <th className="px-8 py-6 font-body uppercase tracking-[0.3em] text-[9px] text-primary/50 font-bold">Fulfillment Status</th>
                <th className="px-8 py-6 font-body uppercase tracking-[0.3em] text-[9px] text-primary/50 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {sortedOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-8 py-12 text-center italic text-xs text-outline/60">
                    No orders cataloged under the manifest database matching filters.
                  </td>
                </tr>
              ) : (
                sortedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/40 transition-colors group">
                    <td className="px-8 py-8">
                      <span className="font-body text-xs font-bold text-primary">{order.id}</span>
                    </td>
                    
                    <td className="px-8 py-8">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container flex-shrink-0">
                          <img 
                            src={order.avatarUrl} 
                            alt={order.customerName} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="text-left">
                          <p className="font-body text-sm font-semibold text-primary">{order.customerName}</p>
                          <p className="font-body text-[10px] opacity-50 font-bold italic">{order.product}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-8 py-8 text-left">
                      <p className="font-body text-xs text-primary">{order.date}</p>
                      <p className="font-body text-[10px] opacity-40 uppercase tracking-widest mt-0.5">{order.time}</p>
                    </td>

                    <td className="px-8 py-8">
                      <span className="font-body text-sm font-bold text-primary">${order.amount.toFixed(2)}</span>
                    </td>

                    <td className="px-8 py-8 text-left">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[9px] font-body font-bold uppercase tracking-widest ${
                        order.paymentStatus === 'Paid' 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-secondary/15 text-secondary'
                      }`}>
                        <span className={`w-1 h-1 rounded-full mr-1.5 ${order.paymentStatus === 'Paid' ? 'bg-primary' : 'bg-secondary'}`} />
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td className="px-8 py-8">
                      <select
                        value={order.status}
                        onChange={(e) => onOrderStatusChange(order.id, e.target.value as any)}
                        className={`bg-transparent border-none p-0 text-[10px] tracking-widest font-body uppercase focus:ring-0 cursor-pointer font-bold ${
                          order.status === 'Processing' ? 'text-secondary' :
                          order.status === 'Shipped' ? 'text-primary' :
                          order.status === 'Delivered' ? 'text-primary/70' :
                          'text-error/70'
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Returned">Returned</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="px-8 py-8 text-right">
                      <button 
                        onClick={() => onPrintInvoice(order)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1.5 ml-auto text-primary/60 hover:text-primary font-bold hover:bg-white/60 px-3 py-1.5 border border-outline/10 shadow-sm"
                      >
                        <Printer size={12} />
                        <span className="text-[9px] uppercase tracking-widest font-bold">Print Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination Controls */}
        <div className="px-8 py-6 flex flex-col sm:flex-row justify-between items-center bg-surface-container border-t border-primary/5 gap-4 text-left">
          <p className="font-body text-[10px] uppercase tracking-widest text-primary/60 font-bold mb-4 sm:mb-0">
            Showing 1-{sortedOrders.length} of {orders.length} entries
          </p>
          <div className="flex space-x-2">
            <button className="w-8 h-8 flex items-center justify-center border border-primary/15 hover:bg-primary hover:text-on-primary transition-all rounded-none">
              <ChevronLeft size={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-primary text-on-primary text-[10px] font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center border border-primary/15 hover:bg-primary hover:text-on-primary transition-all text-[10px] font-bold">2</button>
            <button className="w-8 h-8 flex items-center justify-center border border-primary/15 hover:bg-primary hover:text-on-primary transition-all text-[10px] font-bold">3</button>
            <button className="w-8 h-8 flex items-center justify-center border border-primary/15 hover:bg-primary hover:text-on-primary transition-all rounded-none">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Asymmetric Secondary layout area - Insights & Batches */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Archive Insights */}
        <div className="lg:col-span-2 bg-surface-variant p-8 relative overflow-hidden group text-left shadow-sm border border-outline/5">
          <div className="relative z-10">
            <h4 className="font-headline text-3xl italic mb-6">
              Archive <span className="text-secondary">Insights</span>
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="font-body uppercase tracking-[0.3em] text-[9px] text-primary/40 mb-2 font-bold">Daily Revenue</p>
                <p className="font-headline text-2xl font-bold text-primary">$4,281</p>
                <p className="text-[9px] text-primary/60 mt-1 italic font-bold">+12% from yesterday</p>
              </div>
              
              <div>
                <p className="font-body uppercase tracking-[0.3em] text-[9px] text-primary/40 mb-2 font-bold">Pending Orders</p>
                <p className="font-headline text-2xl font-bold text-primary">{activeOrdersCount}</p>
                <p className="text-[9px] text-primary/60 mt-1 italic font-bold">Priority catalog queue</p>
              </div>

              <div>
                <p className="font-body uppercase tracking-[0.3em] text-[9px] text-primary/40 mb-2 font-bold">Shipped Today</p>
                <p className="font-headline text-2xl font-bold text-primary">+{totalShippedToday}</p>
                <p className="text-[9px] text-primary/60 mt-1 italic font-bold">Last 24 hours</p>
              </div>

              <div>
                <p className="font-body uppercase tracking-[0.3em] text-[9px] text-primary/40 mb-2 font-bold">Fulfillment Rate</p>
                <p className="font-headline text-2xl font-bold text-primary">{fulfillmentRate}</p>
                <p className="text-[9px] text-primary/60 mt-1 italic font-bold">Highly efficient</p>
              </div>
            </div>
          </div>
          
          <div className="absolute -right-12 -bottom-12 w-48 h-48 border border-primary/5 rounded-full group-hover:scale-110 transition-transform duration-700" />
        </div>

        {/* Right Side: System Notification Card */}
        <div className="bg-primary p-8 text-on-primary flex flex-col justify-between shadow-2xl shadow-primary/10 text-left">
          <div>
            <span className="font-body uppercase tracking-[0.4em] text-[9px] opacity-60 font-bold">
              System Notification
            </span>
            <h4 className="font-headline text-2xl italic mt-2 text-on-primary">New Archival Batch</h4>
            <p className="font-body text-xs opacity-70 mt-4 leading-relaxed">
              Batch #42-Saffron has been registered. 124 units are now ready for automated fulfillment.
            </p>
          </div>
          <button className="mt-8 border border-on-primary/30 hover:border-on-primary py-3 text-[10px] font-body uppercase tracking-widest font-bold hover:bg-on-primary hover:text-primary transition-all active:scale-95 duration-200">
            View Fulfillment Log
          </button>
        </div>

      </div>
    </div>
  );
}
