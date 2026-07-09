/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Specimen, Order } from '../types';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  specimens: Specimen[];
  onCreateInvoice: (invoice: Omit<Order, 'id' | 'date' | 'time'>) => void;
}

export default function InvoiceModal({
  isOpen,
  onClose,
  specimens,
  onCreateInvoice
}: InvoiceModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [selectedSku, setSelectedSku] = useState(specimens[0]?.sku || '');
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState<'Processing' | 'Shipped' | 'Delivered'>('Processing');
  const [paymentStatus, setPaymentStatus] = useState<'Paid' | 'Pending'>('Paid');
  const [totalAmount, setTotalAmount] = useState(0);

  const selectedSpecimen = specimens.find(s => s.sku === selectedSku);

  useEffect(() => {
    if (selectedSpecimen) {
      setTotalAmount(selectedSpecimen.price * quantity);
    }
  }, [selectedSku, quantity, selectedSpecimen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !selectedSpecimen) return;

    onCreateInvoice({
      customerName,
      avatarUrl: selectedSpecimen.imageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
      product: `${selectedSpecimen.name} (${quantity}x)`,
      amount: totalAmount,
      status,
      paymentStatus,
    });
    
    // Reset and close
    setCustomerName('');
    setQuantity(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-outline/15 shadow-2xl max-w-lg w-full relative p-8 animate-fade-in text-on-surface">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-outline hover:text-primary transition-colors"
        >
          <X size={18} />
        </button>

        <div className="mb-6">
          <span className="font-body uppercase tracking-[0.3em] text-[10px] text-secondary font-bold block mb-1">
            Botanical Ledger
          </span>
          <h3 className="font-headline text-3xl italic">
            Create Invoice
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 font-body">
          {/* Customer Name */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider font-bold text-outline">
              Recipient Customer
            </label>
            <input 
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Eleanor Fitzwilliam"
              className="bg-surface-variant border-b border-outline px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none placeholder:text-outline/40"
            />
          </div>

          {/* Select Specimen */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider font-bold text-outline">
              Botanical Extract / Specimen
            </label>
            <select
              value={selectedSku}
              onChange={(e) => setSelectedSku(e.target.value)}
              className="bg-surface-variant border-b border-outline px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
            >
              {specimens.map(spec => (
                <option key={spec.sku} value={spec.sku}>
                  {spec.name} (${spec.price.toFixed(2)})
                </option>
              ))}
            </select>
          </div>

          {/* Quantity & Pricing details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-bold text-outline">
                Volume / Quantity
              </label>
              <input 
                type="number"
                min="1"
                max="99"
                required
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="bg-surface-variant border-b border-outline px-4 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-bold text-outline">
                Fulfillment Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="bg-surface-variant border-b border-outline px-4 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>

          {/* Payment Status & Total */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-outline/10 items-end">
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-bold text-outline">
                Payment Status
              </label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2 text-xs cursor-pointer">
                  <input 
                    type="radio" 
                    checked={paymentStatus === 'Paid'} 
                    onChange={() => setPaymentStatus('Paid')}
                    className="text-primary focus:ring-primary" 
                  />
                  <span>Paid</span>
                </label>
                <label className="flex items-center space-x-2 text-xs cursor-pointer">
                  <input 
                    type="radio" 
                    checked={paymentStatus === 'Pending'} 
                    onChange={() => setPaymentStatus('Pending')}
                    className="text-primary focus:ring-primary" 
                  />
                  <span>Pending</span>
                </label>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[9px] uppercase tracking-widest text-outline">Total Invoice Amount</p>
              <p className="font-headline text-3xl italic text-primary mt-1 font-bold">
                ${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-outline text-primary hover:bg-surface-variant font-body uppercase tracking-widest text-[9px] font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary text-on-primary hover:bg-primary/90 font-body uppercase tracking-widest text-[9px] font-bold flex items-center gap-2 shadow-lg hover:scale-105 duration-200"
            >
              <Check size={12} />
              Issue Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
