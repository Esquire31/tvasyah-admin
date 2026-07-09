/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Globe, 
  Clock, 
  Percent, 
  Compass, 
  ArrowUpRight,
  MapPin,
  Flame,
  Users
} from 'lucide-react';
import { REGIONAL_HEATMAPS } from '../data';

export default function MetricsView() {
  const [activeSegment, setActiveSegment] = useState<'revenue' | 'orders' | 'aov'>('revenue');
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  // Bestselling Collections Data
  const bestsellers = [
    {
      id: '01',
      name: 'Saffron Bright Serum',
      category: 'Skincare • Botanical Extract',
      price: '$12,400',
      sold: '155 Units',
      percent: '85%'
    },
    {
      id: '02',
      name: 'Raw Silk Cleanser',
      category: 'Skincare • Textural Ritual',
      price: '$9,150',
      sold: '122 Units',
      percent: '65%'
    },
    {
      id: '03',
      name: 'Amber Moss Votive',
      category: 'Lifestyle • Olfactory',
      price: '$7,820',
      sold: '230 Units',
      percent: '55%'
    },
    {
      id: '04',
      name: 'Linen Sleep Mist',
      category: 'Wellness • Ritual',
      price: '$5,100',
      sold: '102 Units',
      percent: '35%'
    }
  ];

  return (
    <div className="animate-fade-in text-on-surface">
      {/* Page Editorial Header */}
      <header className="mb-16 text-left">
        <span className="font-body uppercase tracking-[0.4em] text-[10px] text-secondary font-bold">
          Analytics Dashboard
        </span>
        <h1 className="font-headline text-5xl md:text-6xl italic mt-4 text-primary leading-tight font-light">
          Store Performance <br />&amp; Growth Metrics
        </h1>
      </header>

      {/* KPI Summary Cards (Bento Style with aspect-ratio matches) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        
        {/* Card 1: Revenue */}
        <button 
          onClick={() => setActiveSegment('revenue')}
          className={`
            w-full p-10 flex flex-col justify-between aspect-[4/3] group transition-all duration-500 overflow-hidden relative text-left rounded-none
            ${activeSegment === 'revenue' 
              ? 'bg-primary text-on-primary shadow-2xl' 
              : 'bg-surface-variant hover:bg-primary/5 text-primary shadow-sm'
            }
          `}
        >
          <div className="z-10">
            <span className={`font-body uppercase tracking-widest text-[10px] ${activeSegment === 'revenue' ? 'text-on-primary/60' : 'text-on-surface-variant'}`}>
              Total Revenue
            </span>
            <h3 className={`font-headline text-5xl md:text-6xl mt-4 font-bold ${activeSegment === 'revenue' ? 'text-on-primary' : 'text-primary'}`}>
              $42,850
            </h3>
          </div>
          
          <div className="z-10 flex justify-between items-end">
            <div className={`flex items-center gap-2 ${activeSegment === 'revenue' ? 'text-tertiary' : 'text-primary'}`}>
              <TrendingUp size={16} />
              <span className="text-xs font-bold font-body">+12.4% vs last mo.</span>
            </div>
            <DollarSign size={28} className="opacity-15 group-hover:scale-110 duration-300" />
          </div>
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-secondary/5 rounded-full blur-3xl group-hover:bg-tertiary/10 duration-500" />
        </button>

        {/* Card 2: Orders */}
        <button 
          onClick={() => setActiveSegment('orders')}
          className={`
            w-full p-10 flex flex-col justify-between aspect-[4/3] group transition-all duration-500 overflow-hidden relative text-left rounded-none
            ${activeSegment === 'orders' 
              ? 'bg-primary text-on-primary shadow-2xl' 
              : 'bg-surface-variant hover:bg-primary/5 text-primary shadow-sm'
            }
          `}
        >
          <div className="z-10">
            <span className={`font-body uppercase tracking-widest text-[10px] ${activeSegment === 'orders' ? 'text-on-primary/60' : 'text-on-surface-variant'}`}>
              Total Orders
            </span>
            <h3 className={`font-headline text-5xl md:text-6xl mt-4 font-bold ${activeSegment === 'orders' ? 'text-on-primary' : 'text-primary'}`}>
              381
            </h3>
          </div>

          <div className="z-10 flex justify-between items-end">
            <div className="flex items-center gap-2 text-secondary">
              <ShoppingBag size={16} />
              <span className="text-xs font-bold font-body">24 New today</span>
            </div>
            <div className="w-12 h-[2px] bg-outline/20" />
          </div>
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(#1B2F23 0.5px, transparent 0.5px)', 
              backgroundSize: '10px 10px' 
            }} 
          />
        </button>

        {/* Card 3: Avg Order Value */}
        <button 
          onClick={() => setActiveSegment('aov')}
          className={`
            w-full p-10 flex flex-col justify-between aspect-[4/3] group transition-all duration-500 overflow-hidden relative text-left rounded-none
            ${activeSegment === 'aov' 
              ? 'bg-primary text-on-primary shadow-2xl' 
              : 'bg-surface-variant hover:bg-primary/5 text-primary shadow-sm'
            }
          `}
        >
          <div className="z-10">
            <span className={`font-body uppercase tracking-widest text-[10px] ${activeSegment === 'aov' ? 'text-on-primary/60' : 'text-on-surface-variant'}`}>
              Avg Order Value
            </span>
            <h3 className={`font-headline text-5xl md:text-6xl mt-4 font-bold ${activeSegment === 'aov' ? 'text-on-primary' : 'text-primary'}`}>
              $112.50
            </h3>
          </div>

          <div className="z-10 flex justify-between items-end">
            <p className={`font-body italic text-sm ${activeSegment === 'aov' ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
              Premium Segment Stable
            </p>
            <Compass size={28} className="opacity-15 group-hover:scale-110 duration-300" />
          </div>
        </button>
      </section>

      {/* Dynamic Detailed Trend Graph (Handcrafted High-Craft SVG line graph) */}
      <section className="bg-white/40 backdrop-blur-sm p-8 md:p-12 border border-outline/5 mb-16 text-left">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 mb-8">
          <div>
            <h4 className="font-headline text-2xl italic text-primary">
              {activeSegment === 'revenue' ? 'Revenue Analytics Archive' : 
               activeSegment === 'orders' ? 'Transaction Velocity' : 
               'AOV Segment Breakdown'}
            </h4>
            <p className="font-body text-xs text-on-surface-variant mt-1">
              {activeSegment === 'revenue' ? 'Weekly sales performance representing physical and digital outlets.' : 
               activeSegment === 'orders' ? 'Volume index mapping catalog dispatch frequencies.' : 
               'Average cart sizing metrics across top buyer directories.'}
            </p>
          </div>
          <span className="font-body text-[10px] uppercase tracking-widest font-bold text-secondary flex items-center gap-1.5 bg-secondary/5 px-2.5 py-1">
            <Flame size={12} /> Live Synced
          </span>
        </div>

        {/* Custom SVG Responsive Line/Area graph */}
        <div className="h-64 w-full relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 1000 240" preserveAspectRatio="none">
            {/* Background grid lines */}
            <line x1="0" y1="40" x2="1000" y2="40" stroke="#1B2F23" strokeOpacity="0.04" strokeDasharray="4" />
            <line x1="0" y1="100" x2="1000" y2="100" stroke="#1B2F23" strokeOpacity="0.04" strokeDasharray="4" />
            <line x1="0" y1="160" x2="1000" y2="160" stroke="#1B2F23" strokeOpacity="0.04" strokeDasharray="4" />
            <line x1="0" y1="220" x2="1000" y2="220" stroke="#1B2F23" strokeOpacity="0.08" />

            {/* Custom high-fidelity paths based on active tab selection */}
            {activeSegment === 'revenue' && (
              <>
                {/* Area path */}
                <path 
                  d="M0,220 C100,200 150,120 250,140 C350,160 450,50 600,80 C750,110 850,20 1000,40 L1000,220 L0,220 Z" 
                  fill="url(#area-gradient-revenue)" 
                />
                {/* Line path */}
                <path 
                  d="M0,220 C100,200 150,120 250,140 C350,160 450,50 600,80 C750,110 850,20 1000,40" 
                  fill="none" 
                  stroke="#1B2F23" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                />
                {/* Interactive node plots */}
                <circle cx="250" cy="140" r="5" fill="#C7A17A" stroke="#1B2F23" strokeWidth="2" />
                <circle cx="600" cy="80" r="5" fill="#C7A17A" stroke="#1B2F23" strokeWidth="2" />
                <circle cx="1000" cy="40" r="5" fill="#C7A17A" stroke="#1B2F23" strokeWidth="2" />
              </>
            )}

            {activeSegment === 'orders' && (
              <>
                <path 
                  d="M0,220 C100,180 200,210 300,130 C400,50 550,160 700,90 C850,20 900,10 1000,30 L1000,220 L0,220 Z" 
                  fill="url(#area-gradient-orders)" 
                />
                <path 
                  d="M0,220 C100,180 200,210 300,130 C400,50 550,160 700,90 C850,20 900,10 1000,30" 
                  fill="none" 
                  stroke="#A0522D" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                />
                <circle cx="300" cy="130" r="5" fill="#1B2F23" stroke="#A0522D" strokeWidth="2" />
                <circle cx="700" cy="90" r="5" fill="#1B2F23" stroke="#A0522D" strokeWidth="2" />
                <circle cx="1000" cy="30" r="5" fill="#1B2F23" stroke="#A0522D" strokeWidth="2" />
              </>
            )}

            {activeSegment === 'aov' && (
              <>
                <path 
                  d="M0,150 C150,140 250,160 400,130 C550,100 650,90 800,110 C900,120 950,115 1000,120 L1000,220 L0,220 Z" 
                  fill="url(#area-gradient-aov)" 
                />
                <path 
                  d="M0,150 C150,140 250,160 400,130 C550,100 650,90 800,110 C900,120 950,115 1000,120" 
                  fill="none" 
                  stroke="#C7A17A" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                />
                <circle cx="400" cy="130" r="5" fill="#1B2F23" stroke="#C7A17A" strokeWidth="2" />
                <circle cx="800" cy="110" r="5" fill="#1B2F23" stroke="#C7A17A" strokeWidth="2" />
              </>
            )}

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="area-gradient-revenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1B2F23" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#1B2F23" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="area-gradient-orders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A0522D" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#A0522D" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="area-gradient-aov" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C7A17A" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#C7A17A" stopOpacity="0.0" />
              </linearGradient>
            </defs>
          </svg>

          {/* X axis labels */}
          <div className="absolute bottom-0 inset-x-0 flex justify-between px-2 text-[9px] uppercase tracking-widest font-bold text-outline/50 pt-2 border-t border-outline/10">
            <span>May 01</span>
            <span>May 15</span>
            <span>Jun 01</span>
            <span>Jun 15</span>
            <span>Jul 01</span>
            <span>Current</span>
          </div>
        </div>
      </section>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Top Products/Collections (8 cols) */}
        <section className="lg:col-span-8 bg-white/50 backdrop-blur-sm p-8 md:p-12 border border-outline/5 text-left">
          <div className="flex justify-between items-baseline mb-12">
            <h4 className="font-headline text-3xl italic text-primary">Bestselling Collections</h4>
            <span className="font-body uppercase tracking-widest text-[10px] border-b border-secondary text-secondary pb-1 font-bold">
              Archival Standards
            </span>
          </div>
          
          <div className="space-y-10">
            {bestsellers.map((prod, idx) => (
              <div 
                key={prod.id}
                onMouseEnter={() => setHoveredProduct(idx)}
                onMouseLeave={() => setHoveredProduct(null)}
                className="group cursor-pointer"
              >
                <div className="flex justify-between items-end mb-4">
                  <div className="flex items-center gap-6">
                    <span className="font-headline text-2xl text-primary/30 italic group-hover:text-secondary transition-colors duration-300">
                      {prod.id}
                    </span>
                    <div>
                      <h5 className="font-body font-bold text-sm text-primary uppercase tracking-wider">
                        {prod.name}
                      </h5>
                      <p className="text-[10px] font-body text-primary/50 uppercase tracking-[0.2em] mt-1">
                        {prod.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-headline text-xl text-primary font-bold">{prod.price}</span>
                    <span className="text-[10px] font-body text-primary/50 uppercase tracking-widest font-bold">{prod.sold}</span>
                  </div>
                </div>
                
                {/* Progress bar represent market diffusion */}
                <div className="h-[2px] w-full bg-surface-container relative overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full bg-primary transition-all duration-1000 ease-out" 
                    style={{ 
                      width: hoveredProduct === idx ? '100%' : prod.percent,
                      opacity: hoveredProduct === idx ? 1 : 0.8
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Market Geography (4 cols) */}
        <section className="lg:col-span-4 bg-surface-container-low p-10 flex flex-col min-h-[580px] border border-outline/5 text-left justify-between">
          <div>
            <span className="font-body uppercase tracking-[0.3em] text-[10px] text-primary/50 font-bold block mb-2">
              Market Diffusion
            </span>
            <h4 className="font-headline text-3xl italic text-primary">Order Geography</h4>
          </div>

          {/* Map Vector Placement with ambient heatspots */}
          <div className="relative flex-grow bg-surface/50 my-8 overflow-hidden min-h-[220px] border border-outline/5 shadow-inner">
            <div 
              className="absolute inset-0 opacity-20 grayscale mix-blend-multiply bg-center bg-cover bg-no-repeat"
              style={{ 
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDjNA5DZF_SOpnUnx1bJn_Ec8V3BtMkI8TcNnK1FRcBNHHOr_vkQNxVts1ASa2BRha1-zBzRzMBhj6lbYcO481dYOdIXJbYZJRwj9q-uCx8d0fOuWoXu8PwqCZSVlBBMyz4-MNKii0lWQLXNwx8zmqMEZVfW88D_BuMLebrxUH-_ArexLRwWLX9pL9Osfo7Bg7h_nAbuVbk3NlL-wLgjyWK1N1DhZx3G9wQtp-32YuQ2CBlGebFXk4')" 
              }}
            />
            
            {/* Pulsing indicator dots over key cities */}
            <div className="absolute top-[35%] left-[25%] group cursor-pointer" title="New York: 28%">
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-secondary opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary border border-white" />
            </div>
            <div className="absolute top-[30%] left-[50%] group cursor-pointer" title="London: 19%">
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary border border-white" />
            </div>
            <div className="absolute top-[42%] left-[82%] group cursor-pointer" title="Tokyo: 11%">
              <span className="absolute inline-flex h-3 w-3 rounded-full bg-tertiary opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-tertiary border border-white" />
            </div>

            <div className="relative z-10 p-6 h-full flex flex-col justify-end">
              <div className="space-y-4">
                {REGIONAL_HEATMAPS.map((reg) => (
                  <div key={reg.city} className="flex justify-between items-center border-b border-primary/5 pb-2.5">
                    <span className="font-body font-bold text-[10px] uppercase tracking-widest text-primary flex items-center gap-1.5">
                      <MapPin size={10} className="text-secondary" />
                      {reg.city}
                    </span>
                    <span className="font-headline text-lg italic text-primary">{reg.share}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-primary text-on-primary shadow-xl">
            <p className="font-body text-[10px] uppercase tracking-widest opacity-60 mb-2 font-bold">
              Growth Opportunity
            </p>
            <p className="font-headline text-xl italic leading-relaxed">
              International shipping interest is up 40% in European markets.
            </p>
          </div>
        </section>
      </div>

      {/* Secondary Insights / Bottom Stats Section */}
      <section className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-primary/5 pt-16 text-left">
        <div className="space-y-4">
          <div className="w-8 h-8 rounded-full bg-secondary/5 flex items-center justify-center text-secondary">
            <Percent size={14} />
          </div>
          <h6 className="font-body font-bold text-[10px] uppercase tracking-[0.3em] text-outline">
            Returning Customer Rate
          </h6>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-4xl text-primary font-bold">42.8%</span>
            <span className="text-[10px] text-tertiary font-body uppercase font-bold">+2.1%</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="w-8 h-8 rounded-full bg-secondary/5 flex items-center justify-center text-secondary">
            <Clock size={14} />
          </div>
          <h6 className="font-body font-bold text-[10px] uppercase tracking-[0.3em] text-outline">
            Avg. Fulfillment Time
          </h6>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-4xl text-primary font-bold">
              1.4 <span className="text-xl font-light">Days</span>
            </span>
            <span className="text-[10px] text-tertiary font-body uppercase font-bold">-0.2</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="w-8 h-8 rounded-full bg-secondary/5 flex items-center justify-center text-secondary">
            <TrendingUp size={14} />
          </div>
          <h6 className="font-body font-bold text-[10px] uppercase tracking-[0.3em] text-outline">
            Conversion Rate
          </h6>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-4xl text-primary font-bold">3.12%</span>
            <span className="text-[10px] text-tertiary font-body uppercase font-bold">+0.4%</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="w-8 h-8 rounded-full bg-secondary/5 flex items-center justify-center text-secondary">
            <Users size={14} />
          </div>
          <h6 className="font-body font-bold text-[10px] uppercase tracking-[0.3em] text-outline">
            Referral Influence
          </h6>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-4xl text-primary font-bold">18%</span>
            <span className="text-[10px] text-tertiary font-body uppercase font-bold">High</span>
          </div>
        </div>
      </section>
    </div>
  );
}
