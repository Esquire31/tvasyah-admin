/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, Calendar, Heart, Award, Sparkles } from 'lucide-react';

interface CustomerPatron {
  id: string;
  name: string;
  avatarUrl: string;
  email: string;
  phone: string;
  joinedDate: string;
  preferredCategory: 'Serums' | 'Elixirs' | 'Essences';
  totalSpent: number;
  ordersCount: number;
  membershipLevel: 'Saffron tier' | 'Amber tier' | 'Linen tier';
  notes: string;
}

const INITIAL_CUSTOMERS: CustomerPatron[] = [
  {
    id: 'patron-1',
    name: 'Eleanor Fitzwilliam',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAu9OZ3HIlmNpbKWj6BI2uNd_a-dePpSE6vErnnMEo6G4K4YeB63jTnILZqp-D3BpkRc6FPSPBjC1tXeSBIe9L2js7evQQPLQcwIfVxjgj_lnzISGENNySNm3drohJWZ9FlRmQoEwjW0xfNVRlTqogHApD7irkXZ3ktIS-XbGnONckLy3uImdZ3zz9vRptFe3du3TgGWnbrvnSxO4s9atx4rucIztlWoPcGrgxvy8QEI6C3ZRAMJR8',
    email: 'eleanor.finch@vibe.org',
    phone: '+44 7911 123456',
    joinedDate: 'Oct 12, 2023',
    preferredCategory: 'Serums',
    totalSpent: 1840.00,
    ordersCount: 8,
    membershipLevel: 'Saffron tier',
    notes: 'Favors natural amber tones. Requesting glass return programs.'
  },
  {
    id: 'patron-2',
    name: 'Julian Thorne',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4GJ8-7NKMRb1VQ1r6S6HLJM39O9IJJX-YkwhotPVCpm2Wq9zsuM_Eundhl1xAoC86YJkzNZ35iyDHNvKeXdjmS6KDMfD3GiAKyIH9rYvhzzpm11q-fx0oqbqjbpSiRy2OfztApfEJM_M4Mx6AFuAwntj9ptKYhKmsftpC0LeCkHF1vq-fvc8iDYqgO_juyaHqiAWGsk59lQBF5mojZTaHXIX3AVE61WkekkzS9ycjQybbgPB45-c',
    email: 'j.voss@botanist.co',
    phone: '+1 212 555 0199',
    joinedDate: 'Nov 01, 2023',
    preferredCategory: 'Elixirs',
    totalSpent: 920.50,
    ordersCount: 4,
    membershipLevel: 'Amber tier',
    notes: 'Subscribed to Amber Root essence cycles. Pre-ordered winter serums.'
  },
  {
    id: 'patron-3',
    name: 'Amara Okafor',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxyQPS2mCUwhe9M1WeEdXYAObqlE13z0A4cgrRrl27H2b6-cWhgLNJdMQ6KxmuUbr7jIOgtZTG-em96SP6JDaTXadiQL_L4JPn4kP4v9eIWmnjfgpy8ydfVkvaitpceKWF7Y6DkW07PPU2uV1jxApitJKKrrnMvv0-MjG20qIfTiL13nDuybyOP2G_DZ6fW_TWEajQCDISkQ29UfcMx6CG0muAlT177BBexYOPuBALxmSXV2FMDlY',
    email: 'amara@designstudio.io',
    phone: '+234 1 555 3829',
    joinedDate: 'Jan 24, 2024',
    preferredCategory: 'Essences',
    totalSpent: 3120.00,
    ordersCount: 12,
    membershipLevel: 'Saffron tier',
    notes: 'Interior scent curator. Favors massive volume decanters.'
  },
  {
    id: 'patron-4',
    name: 'Clara Sorensen',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256',
    email: 'clara.s@nordic.com',
    phone: '+45 36 555 241',
    joinedDate: 'Jul 08, 2026',
    preferredCategory: 'Essences',
    totalSpent: 120.00,
    ordersCount: 1,
    membershipLevel: 'Linen tier',
    notes: 'New registration. Reached out via Saffron Serum recommendation loops.'
  }
];

export default function CustomersView() {
  const [customers, setCustomers] = useState<CustomerPatron[]>(INITIAL_CUSTOMERS);
  const [selectedPatron, setSelectedPatron] = useState<CustomerPatron>(INITIAL_CUSTOMERS[0]);

  return (
    <div className="animate-fade-in text-on-surface">
      <div className="flex flex-col lg:flex-row gap-12 text-left">
        {/* Left hand list */}
        <div className="lg:w-2/3 space-y-8">
          <div className="border-b border-outline/10 pb-4">
            <h4 className="font-headline text-3xl italic text-primary">Premium Patrons</h4>
            <p className="font-body text-xs text-on-surface-variant mt-1">
              CRM log cataloging our botanical collectors and volume subscribers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customers.map((patron) => {
              const isActive = selectedPatron.id === patron.id;
              return (
                <button
                  key={patron.id}
                  onClick={() => setSelectedPatron(patron)}
                  className={`
                    p-6 border text-left rounded-none transition-all duration-300 relative group
                    ${isActive 
                      ? 'border-primary bg-surface shadow-md' 
                      : 'border-outline/10 bg-white/40 hover:border-outline/50 hover:bg-white/80'
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-surface-container rounded-full overflow-hidden flex-shrink-0 shadow-sm">
                      <img src={patron.avatarUrl} alt={patron.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow space-y-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-body font-bold text-sm text-primary group-hover:text-secondary duration-300">
                          {patron.name}
                        </h5>
                        <span className={`text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 ${
                          patron.membershipLevel === 'Saffron tier' ? 'bg-secondary/10 text-secondary' :
                          patron.membershipLevel === 'Amber tier' ? 'bg-tertiary/15 text-primary' :
                          'bg-primary/5 text-primary'
                        }`}>
                          {patron.membershipLevel}
                        </span>
                      </div>
                      <p className="text-[10px] text-outline font-body tracking-wider">{patron.email}</p>
                      
                      <div className="flex items-center justify-between pt-4">
                        <span className="text-[9px] font-body uppercase tracking-wider opacity-60">
                          Purchases: {patron.ordersCount}
                        </span>
                        <span className="font-headline text-md italic font-bold text-primary">
                          ${patron.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right hand detail card */}
        <div className="lg:w-1/3">
          <section className="bg-surface-variant p-8 shadow-sm border border-outline/5 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-tertiary">
              <Award size={20} className="animate-pulse-slow" />
            </div>

            <div className="flex flex-col items-center text-center pb-6 border-b border-outline/10 mb-6">
              <div className="w-20 h-20 bg-surface-container rounded-full overflow-hidden shadow-lg border-2 border-surface mb-4">
                <img src={selectedPatron.avatarUrl} alt={selectedPatron.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-headline text-2xl italic font-bold text-primary">
                {selectedPatron.name}
              </h4>
              <span className="font-body uppercase tracking-[0.25em] text-[9px] text-secondary font-bold mt-1.5">
                {selectedPatron.membershipLevel} Collector
              </span>
            </div>

            <div className="space-y-4 font-body text-xs">
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-outline/60 flex-shrink-0" />
                <span className="text-primary font-medium">{selectedPatron.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-outline/60 flex-shrink-0" />
                <span className="text-primary font-medium">{selectedPatron.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={14} className="text-outline/60 flex-shrink-0" />
                <span>Enrolled Since: <strong className="text-primary">{selectedPatron.joinedDate}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <Heart size={14} className="text-outline/60 flex-shrink-0" />
                <span>Preferred Mixes: <strong className="text-primary uppercase tracking-wider bg-white/60 px-2 py-0.5 border border-outline/5 text-[9px]">{selectedPatron.preferredCategory}</strong></span>
              </div>

              <div className="pt-6 border-t border-outline/10">
                <p className="text-[9px] uppercase tracking-wider font-bold text-outline mb-2">Curator Notes</p>
                <div className="bg-white/40 p-4 border border-outline/5 italic text-primary/80 leading-relaxed text-[11px]">
                  "{selectedPatron.notes}"
                </div>
              </div>

              <div className="pt-6">
                <div className="bg-primary p-4 text-on-primary text-center">
                  <p className="text-[9px] uppercase tracking-widest opacity-60 font-bold mb-1">Cumulative Transactions</p>
                  <p className="font-headline text-3xl italic text-tertiary font-bold">
                    ${selectedPatron.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
