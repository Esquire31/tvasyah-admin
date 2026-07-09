/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import InventoryView from './components/InventoryView';
import MetricsView from './components/MetricsView';
import OrdersView from './components/OrdersView';
import CustomersView from './components/CustomersView';
import SettingsView from './components/SettingsView';
import SupportView from './components/SupportView';
import InvoiceModal from './components/InvoiceModal';
import SpecimenModal from './components/SpecimenModal';
import PrintInvoiceModal from './components/PrintInvoiceModal';

import { Order, Specimen, Activity, NotificationItem, OrderStatus } from './types';
import { 
  INITIAL_SPECIMENS, 
  INITIAL_ORDERS, 
  INITIAL_ACTIVITIES, 
  INITIAL_NOTIFICATIONS 
} from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'live' | 'archived'>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Core Reactive Databases
  const [specimens, setSpecimens] = useState<Specimen[]>(INITIAL_SPECIMENS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals Overlay states
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isSpecimenModalOpen, setIsSpecimenModalOpen] = useState(false);
  const [printOrder, setPrintOrder] = useState<Order | null>(null);

  // Toast / Status overlay
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // State Mutators / Core Business Actions
  const handleOrderStatusChange = (id: string, status: OrderStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => order.id === id ? { ...order, status } : order)
    );

    // Dynamic Activity Logger
    const logActivity: Activity = {
      id: `act-${Date.now()}`,
      boldText: id,
      text: `status updated to ${status}`,
      timestamp: 'Just now',
      type: 'order'
    };
    setActivities(prev => [logActivity, ...prev]);

    // Notification Trigger
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Order Status Shift`,
      description: `Order ${id} was marked as ${status}.`,
      timestamp: 'Just now',
      unread: true,
      type: status === 'Delivered' ? 'success' : 'info'
    };
    setNotifications(prev => [notif, ...prev]);
    showToast(`Order ${id} is now ${status}`);
  };

  const handleCreateInvoice = (invoiceData: Omit<Order, 'id' | 'date' | 'time'>) => {
    const nextId = `#TV-${Math.floor(Math.random() * 900) + 9100}`;
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const formattedTime = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      ...invoiceData,
      id: nextId,
      date: formattedDate,
      time: formattedTime
    };

    setOrders(prev => [newOrder, ...prev]);

    // Log Activity
    const logActivity: Activity = {
      id: `act-${Date.now()}`,
      boldText: nextId,
      text: `created for ${invoiceData.customerName} ($${invoiceData.amount.toFixed(2)})`,
      timestamp: 'Just now',
      type: 'order'
    };
    setActivities(prev => [logActivity, ...prev]);

    // Send Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Invoice Issued',
      description: `New invoice ${nextId} dispatched to ${invoiceData.customerName}.`,
      timestamp: 'Just now',
      unread: true,
      type: 'success'
    };
    setNotifications(prev => [notif, ...prev]);
    showToast(`Invoice ${nextId} created successfully!`);
  };

  const handleAddSpecimen = (specimen: Specimen) => {
    // Check for SKU duplicates
    if (specimens.some(s => s.sku === specimen.sku)) {
      showToast(`SKU ${specimen.sku} already exists!`);
      return;
    }

    setSpecimens(prev => [specimen, ...prev]);

    // Log Activity
    const logActivity: Activity = {
      id: `act-${Date.now()}`,
      boldText: specimen.sku,
      text: `registered: ${specimen.name}`,
      timestamp: 'Just now',
      type: 'inventory'
    };
    setActivities(prev => [logActivity, ...prev]);

    // Send Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Specimen Cataloged',
      description: `${specimen.name} has been cataloged under SKU ${specimen.sku}.`,
      timestamp: 'Just now',
      unread: true,
      type: 'success'
    };
    setNotifications(prev => [notif, ...prev]);
    showToast(`${specimen.name} added to catalog`);
  };

  const handleRestockItem = (sku: string) => {
    let restockedName = '';
    setSpecimens(prevSpecimens => 
      prevSpecimens.map(s => {
        if (s.sku === sku) {
          restockedName = s.name;
          const updatedStock = s.stock + 50;
          return { 
            ...s, 
            stock: updatedStock,
            lowStockWarning: updatedStock < 15
          };
        }
        return s;
      })
    );

    // Log Activity
    const logActivity: Activity = {
      id: `act-${Date.now()}`,
      boldText: sku,
      text: `stock replenished (+50 units)`,
      timestamp: 'Just now',
      type: 'inventory'
    };
    setActivities(prev => [logActivity, ...prev]);

    // Send Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Stock Replenished',
      description: `${restockedName} (${sku}) stock boosted by 50 units.`,
      timestamp: 'Just now',
      unread: false,
      type: 'info'
    };
    setNotifications(prev => [notif, ...prev]);
    showToast(`${restockedName} stock replenished (+50)`);
  };

  const handleRestockAll = () => {
    let criticalCount = 0;
    setSpecimens(prevSpecimens => 
      prevSpecimens.map(s => {
        if (s.stock < 15) {
          criticalCount++;
          return { ...s, stock: s.stock + 100, lowStockWarning: false };
        }
        return s;
      })
    );

    if (criticalCount === 0) {
      showToast("All specimen stocks are healthy");
      return;
    }

    // Log Activity
    const logActivity: Activity = {
      id: `act-${Date.now()}`,
      boldText: 'Bulk Restock',
      text: `completed (+100 units across ${criticalCount} items)`,
      timestamp: 'Just now',
      type: 'inventory'
    };
    setActivities(prev => [logActivity, ...prev]);

    // Send Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Bulk Restock Completed',
      description: `Automatically topped off stock levels for ${criticalCount} low-count specimens.`,
      timestamp: 'Just now',
      unread: true,
      type: 'success'
    };
    setNotifications(prev => [notif, ...prev]);
    showToast(`Bulk restock completed for ${criticalCount} items!`);
  };

  const handleDeleteSpecimen = (sku: string) => {
    const target = specimens.find(s => s.sku === sku);
    if (!target) return;

    setSpecimens(prev => prev.filter(s => s.sku !== sku));

    // Log Activity
    const logActivity: Activity = {
      id: `act-${Date.now()}`,
      boldText: sku,
      text: `removed from active archive`,
      timestamp: 'Just now',
      type: 'inventory'
    };
    setActivities(prev => [logActivity, ...prev]);

    showToast(`Deactivated specimen ${target.name}`);
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, unread: false } : notif)
    );
  };

  const handleDownloadReports = () => {
    showToast("PDF reports generated. Ready to print.");
    window.print();
  };

  const handleExportCSV = () => {
    showToast("CSV raw matrix data exported: 381 transaction lines");
  };

  const handleSubmitTicket = (subject: string, message: string) => {
    const ticketId = `#S-${Math.floor(Math.random() * 800) + 100}`;
    
    // Log Activity
    const logActivity: Activity = {
      id: `act-${Date.now()}`,
      boldText: ticketId,
      text: `support ticket opened: "${subject}"`,
      timestamp: 'Just now',
      type: 'customer'
    };
    setActivities(prev => [logActivity, ...prev]);

    // Send Notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Inquiry Dispatch Success',
      description: `Support ticket ${ticketId} has been queued for curator feedback.`,
      timestamp: 'Just now',
      unread: true,
      type: 'info'
    };
    setNotifications(prev => [notif, ...prev]);
    showToast(`Support ticket ${ticketId} submitted!`);
  };

  const handleResetLedger = () => {
    setSpecimens(INITIAL_SPECIMENS);
    setOrders(INITIAL_ORDERS);
    setActivities(INITIAL_ACTIVITIES);
    setNotifications(INITIAL_NOTIFICATIONS);
    showToast("System ledgers restored to factory presets");
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardView 
            orders={orders}
            specimens={specimens}
            activities={activities}
            onOpenInvoiceModal={() => setIsInvoiceModalOpen(true)}
            onExportCSV={handleExportCSV}
            onViewAllOrders={() => setActiveTab('orders')}
            onOrderStatusChange={handleOrderStatusChange}
          />
        );
      case 'orders':
        return (
          <OrdersView 
            orders={orders}
            onOrderStatusChange={handleOrderStatusChange}
            onOpenInvoiceModal={() => setIsInvoiceModalOpen(true)}
            onPrintInvoice={(order) => setPrintOrder(order)}
            searchQuery={searchQuery}
          />
        );
      case 'metrics':
        return <MetricsView />;
      case 'inventory':
        return (
          <InventoryView 
            specimens={specimens}
            onOpenSpecimenModal={() => setIsSpecimenModalOpen(true)}
            onRestockItem={handleRestockItem}
            onRestockAll={handleRestockAll}
            onDeleteSpecimen={handleDeleteSpecimen}
            searchQuery={searchQuery}
          />
        );
      case 'customers':
        return <CustomersView />;
      case 'settings':
        return <SettingsView onResetLedger={handleResetLedger} />;
      case 'support':
        return <SupportView onSubmitTicket={handleSubmitTicket} />;
      default:
        return (
          <div className="py-20 text-center italic text-outline">
            View under archival mapping. Select another node.
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-surface flex text-on-surface select-none relative font-sans">
      {/* Dynamic Popups & Toasts */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary px-6 py-3 shadow-2xl animate-fade-in font-body text-xs uppercase tracking-widest font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" />
          {toastMessage}
        </div>
      )}

      {/* Main Navigation Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen}
        onDownloadReports={handleDownloadReports}
      />

      {/* Primary Layout Wrapper */}
      <div className="flex-grow flex flex-col md:pl-64 min-h-screen">
        {/* Top App Header */}
        <Header 
          activeTab={activeTab}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notifications={notifications}
          onMarkNotificationAsRead={handleMarkNotificationAsRead}
          activeSubTab={activeSubTab}
          setActiveSubTab={setActiveSubTab}
        />

        {/* Dynamic Render Surface */}
        <main className="flex-grow px-6 md:px-10 py-10 max-w-7xl mx-auto w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Modal Dialog Overlays */}
      <InvoiceModal 
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        specimens={specimens}
        onCreateInvoice={handleCreateInvoice}
      />

      <SpecimenModal 
        isOpen={isSpecimenModalOpen}
        onClose={() => setIsSpecimenModalOpen(false)}
        onAddSpecimen={handleAddSpecimen}
      />

      <PrintInvoiceModal 
        order={printOrder}
        onClose={() => setPrintOrder(null)}
      />
    </div>
  );
}
