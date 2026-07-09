/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Printer, CheckCircle } from 'lucide-react';
import { Order } from '../types';

interface PrintInvoiceModalProps {
  order: Order | null;
  onClose: () => void;
}

export default function PrintInvoiceModal({ order, onClose }: PrintInvoiceModalProps) {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const tax = order.amount * 0.0825;
  const subtotal = order.amount - tax;

  return (
    <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] text-primary border border-outline/25 shadow-2xl max-w-2xl w-full relative p-8 md:p-12 animate-fade-in font-body linen-texture">
        {/* Close and Print Control Buttons */}
        <div className="absolute top-6 right-6 flex items-center space-x-4 no-print">
          <button 
            onClick={handlePrint}
            className="p-2 bg-primary text-on-primary hover:bg-primary/90 rounded-none shadow-sm transition-all flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold"
          >
            <Printer size={12} /> Print Receipt
          </button>
          <button 
            onClick={onClose}
            className="text-outline hover:text-primary transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Invoice Header */}
        <div className="border-b-2 border-primary/20 pb-8 mb-8 text-left mt-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="font-headline text-4xl italic font-light tracking-wide text-primary">
                Linen &amp; Moss
              </h1>
              <p className="font-body uppercase tracking-[0.3em] text-[9px] opacity-60 mt-1">
                Botanical Archive &amp; Apothecary
              </p>
            </div>
            <div className="text-right">
              <span className="font-body uppercase tracking-widest text-[10px] font-bold text-secondary bg-secondary/5 px-2.5 py-1">
                Receipt Ledger
              </span>
              <p className="font-mono text-sm mt-3 font-semibold text-primary">{order.id}</p>
            </div>
          </div>
        </div>

        {/* Curation details */}
        <div className="grid grid-cols-2 gap-8 text-left mb-10 text-xs">
          <div>
            <p className="font-bold text-primary/40 uppercase tracking-widest text-[9px] mb-2">Billed To:</p>
            <p className="font-headline text-lg italic text-primary leading-tight font-bold">{order.customerName}</p>
            <p className="text-on-surface-variant mt-1.5 font-bold opacity-60">Verified Store Patron</p>
            <p className="text-on-surface-variant opacity-60">London, United Kingdom</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-primary/40 uppercase tracking-widest text-[9px] mb-2">Transaction Info:</p>
            <p className="font-semibold text-primary">Date: <span className="font-normal">{order.date}</span></p>
            <p className="font-semibold text-primary mt-1">Time: <span className="font-normal">{order.time}</span></p>
            <p className="font-semibold text-primary mt-1">Fulfillment: <span className="font-bold uppercase tracking-wider text-[10px] text-secondary">{order.status}</span></p>
          </div>
        </div>

        {/* Item list */}
        <div className="border-b border-primary/10 pb-8 mb-8">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-primary/10 text-[9px] uppercase tracking-widest text-primary/50 font-bold">
                <th className="pb-3">Description of Extract</th>
                <th className="pb-3 text-center">Qty</th>
                <th className="pb-3 text-right">Price</th>
                <th className="pb-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-xs">
                <td className="py-4">
                  <span className="font-headline text-md italic font-bold">{order.product}</span>
                  <p className="text-[10px] text-outline/60 mt-1 italic">Certified botanical sample. Store-grade hydration essence.</p>
                </td>
                <td className="py-4 text-center font-mono">1</td>
                <td className="py-4 text-right">${subtotal.toFixed(2)}</td>
                <td className="py-4 text-right font-semibold">${subtotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary totals */}
        <div className="flex justify-between items-start text-xs">
          <div className="max-w-xs text-left italic opacity-60 text-[10px] leading-relaxed">
            * Thank you for your support of our Slow Botanicals Archive. Each extraction process represents local botanical harvests across certified woodlands.
          </div>
          <div className="w-64 space-y-2 text-right">
            <div className="flex justify-between text-primary/60">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-primary/60 pb-2 border-b border-primary/5">
              <span>VAT / Sales Tax (8.25%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-headline text-2xl italic font-bold text-primary pt-1">
              <span>Total:</span>
              <span>${order.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer info stamp */}
        <div className="border-t border-primary/10 pt-8 mt-12 flex justify-between items-center text-[9px] uppercase tracking-widest text-primary/40 font-bold">
          <span>Printed on Recycled Linen fiber</span>
          <span className="flex items-center gap-1">
            <CheckCircle size={10} className="text-primary/60" /> Verified Apothecary Ledger
          </span>
        </div>

      </div>
    </div>
  );
}
