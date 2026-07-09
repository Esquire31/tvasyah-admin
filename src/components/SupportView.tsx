/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Send, CheckCircle } from 'lucide-react';

interface SupportViewProps {
  onSubmitTicket: (subject: string, message: string) => void;
}

export default function SupportView({ onSubmitTicket }: SupportViewProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const faqs = [
    {
      q: "How do I print botanical invoice sheets?",
      a: "Navigate to the 'Order Manifest' tab. Hover over any order row and click the 'Print Invoice' button. This launches a tailored, paper-textured print sheet optimized for packing slips or archival ledgers."
    },
    {
      q: "How do I adjust Saffron Serum stock levels?",
      a: "Go to the 'Inventory' tab. Identify the Saffron Bright Serum. Click on 'Restock' next to its stock status, or select multiple checkmarks and use the dynamic sticky bulk-action bar to mark them as restocked."
    },
    {
      q: "What defines the Organic Brutalism design system?",
      a: "Our aesthetic centers on high tactile contrast: Newsreader Headlines paired with technical monospace labels, an asymmetric bento grid, earthy forest/terracotta/linen tones, and a 'No-Line' rule that uses subtle background offsets instead of sharp borders."
    },
    {
      q: "How are regional order shares computed?",
      a: "We map physical orders to geographical coordinates. Our current hotspots center on New York, London, Paris, and Tokyo directories, which represent over 72% of total store subscriptions."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    
    onSubmitTicket(subject, message);
    setSubject('');
    setMessage('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="animate-fade-in text-on-surface text-left">
      <div className="mb-12 border-b border-outline/10 pb-4">
        <span className="font-body uppercase tracking-[0.4em] text-[10px] text-secondary font-bold">
          Knowledge Base &amp; Help
        </span>
        <h2 className="font-headline text-5xl italic mt-2">
          Knowledge &amp; <span className="text-primary/40">Support</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 font-body text-sm items-start">
        
        {/* Left Col: FAQs Accordion (8 cols) */}
        <section className="lg:col-span-7 bg-surface-variant p-8 md:p-12 shadow-sm">
          <h3 className="font-headline text-2xl italic text-primary mb-8 flex items-center gap-2">
            <HelpCircle size={18} className="text-secondary" />
            Frequently Queried Topics
          </h3>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="bg-white/50 border-b border-outline/5 transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-4.5 px-6 flex justify-between items-center text-left hover:bg-white/90 duration-200"
                  >
                    <span className="font-bold text-primary text-xs uppercase tracking-wider leading-relaxed">
                      {faq.q}
                    </span>
                    {isOpen ? <ChevronUp size={16} className="text-outline" /> : <ChevronDown size={16} className="text-outline" />}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs leading-relaxed text-on-surface-variant animate-fade-in text-left">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Col: Interactive Inquiry Ticket Intake Form (5 cols) */}
        <section className="lg:col-span-5 bg-surface p-8 border border-outline/15 shadow-sm text-left">
          <span className="font-body uppercase tracking-[0.3em] text-[9px] text-secondary font-bold block mb-1">
            Curator Intake
          </span>
          <h3 className="font-headline text-2xl italic text-primary mb-6">
            Dispatch Support Inquiry
          </h3>

          {success && (
            <div className="bg-primary text-on-primary p-4 mb-6 flex items-center gap-3 animate-fade-in">
              <CheckCircle size={16} className="text-tertiary" />
              <p className="text-xs font-medium">Inquiry logged! Check the live Activity Feed for status updates.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-bold text-outline">
                Inquiry Topic / Subject
              </label>
              <input 
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Saffron Batch Print Errors"
                className="bg-surface-variant border-b border-outline px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-outline/40"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-bold text-outline">
                Message &amp; Metadata
              </label>
              <textarea 
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Provide SKUs, Order IDs, or browser version details..."
                className="bg-surface-variant border-b border-outline px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-outline/40 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-on-primary py-3 px-4 uppercase tracking-widest text-[10px] font-bold hover:opacity-90 active:scale-95 duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <Send size={12} /> Dispatch Inquiry
            </button>
          </form>
        </section>

      </div>
    </div>
  );
}
