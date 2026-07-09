/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AlertTriangle, Plus, Filter, Edit, Trash2, CheckCircle, RefreshCcw } from 'lucide-react';
import { Specimen } from '../types';

interface InventoryViewProps {
  specimens: Specimen[];
  onOpenSpecimenModal: () => void;
  onRestockItem: (sku: string) => void;
  onRestockAll: () => void;
  onDeleteSpecimen: (sku: string) => void;
  searchQuery: string;
}

export default function InventoryView({
  specimens,
  onOpenSpecimenModal,
  onRestockItem,
  onRestockAll,
  onDeleteSpecimen,
  searchQuery
}: InventoryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedSkus, setSelectedSkus] = useState<string[]>([]);

  // Filtering logic
  const filteredSpecimens = specimens.filter(spec => {
    const matchesCategory = selectedCategory === 'All Categories' || spec.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      spec.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      spec.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate stats
  const totalSkus = specimens.length;
  const lowStockItems = specimens.filter(s => s.stock < 15).length;
  const totalValue = specimens.reduce((sum, s) => sum + (s.stock * s.price), 0);

  // Bulk actions handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedSkus(filteredSpecimens.map(s => s.sku));
    } else {
      setSelectedSkus([]);
    }
  };

  const handleSelectRow = (sku: string, checked: boolean) => {
    if (checked) {
      setSelectedSkus(prev => [...prev, sku]);
    } else {
      setSelectedSkus(prev => prev.filter(id => id !== sku));
    }
  };

  const handleBulkRestock = () => {
    selectedSkus.forEach(sku => onRestockItem(sku));
    setSelectedSkus([]);
  };

  const handleBulkDelete = () => {
    selectedSkus.forEach(sku => onDeleteSpecimen(sku));
    setSelectedSkus([]);
  };

  return (
    <div className="animate-fade-in text-on-surface">
      
      {/* Low Stock Banner Alert */}
      {lowStockItems > 0 && (
        <section className="bg-secondary text-on-primary p-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl">
          <div className="flex items-center gap-4">
            <AlertTriangle size={32} className="animate-pulse" />
            <div className="text-left">
              <p className="font-body uppercase tracking-[0.3em] text-[10px] opacity-80 font-bold">
                Urgent Attention Required
              </p>
              <h3 className="font-headline text-xl italic leading-none mt-1">
                {lowStockItems} Essential Elixirs are reaching critical stock levels.
              </h3>
            </div>
          </div>
          <button 
            onClick={onRestockAll}
            className="px-6 py-2.5 bg-on-primary text-secondary font-body uppercase tracking-widest text-[10px] font-bold hover:bg-surface-container transition-all active:scale-95 duration-200 flex items-center gap-2 shadow-md"
          >
            <RefreshCcw size={12} /> Restock All Low Items
          </button>
        </section>
      )}

      {/* Bento Inventory Overview Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-surface-variant p-8 border-l-4 border-primary h-44 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <span className="font-body uppercase tracking-[0.3em] text-[10px] text-on-surface-variant font-bold">
            Total Curated SKUs
          </span>
          <div className="flex items-baseline gap-2 text-left">
            <span className="font-headline text-5xl font-light text-primary">{totalSkus}</span>
            <span className="text-xs text-primary/60 font-body italic">+12 this month</span>
          </div>
        </div>

        <div className="bg-surface p-8 border-l-4 border-secondary h-44 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
          <span className="font-body uppercase tracking-[0.3em] text-[10px] text-secondary font-bold">
            Critical Low Stock
          </span>
          <div className="flex items-baseline gap-2 text-left">
            <span className="font-headline text-5xl font-light text-secondary">
              {lowStockItems.toString().padStart(2, '0')}
            </span>
            <span className="text-xs text-secondary/60 font-body italic">Immediate action suggested</span>
          </div>
        </div>

        <div className="bg-primary text-on-primary p-8 h-44 flex flex-col justify-between shadow-xl">
          <span className="font-body uppercase tracking-[0.3em] text-[10px] opacity-60 font-bold">
            Estimated Catalog Value
          </span>
          <div className="flex items-baseline gap-2 text-left">
            <span className="font-headline text-5xl font-light text-on-primary">
              ${(totalValue / 1000).toFixed(1)}k
            </span>
            <span className="text-xs opacity-60 font-body italic">↑ 4.2% Growth Valuation</span>
          </div>
        </div>
      </section>

      {/* Main Table Title, Filters, Add specimens button */}
      <section className="space-y-8">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-6 border-b border-outline/10 pb-6">
          <div className="text-left">
            <h3 className="font-headline text-3xl italic">The Botanical Archive</h3>
            <p className="text-on-surface-variant text-sm mt-2 max-w-md">
              Manage the lifecycle of our harvested essences, from raw elixirs to finished serums.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Category Dropdown Filter */}
            <div className="relative flex-1 sm:w-64">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-outline/50" size={14} />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-surface-variant border-none pl-10 pr-8 py-3 text-[10px] uppercase tracking-widest focus:ring-1 focus:ring-primary appearance-none cursor-pointer text-primary font-bold"
              >
                <option value="All Categories">All Categories</option>
                <option value="Serums">Serums</option>
                <option value="Elixirs">Elixirs</option>
                <option value="Essences">Essences</option>
              </select>
            </div>
            
            <button 
              onClick={onOpenSpecimenModal}
              className="bg-primary text-on-primary px-8 py-3.5 font-body uppercase tracking-widest text-[10px] font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg active:scale-95 duration-200"
            >
              <Plus size={14} /> Add Specimen
            </button>
          </div>
        </div>

        {/* Sticky Bulk Actions Bar */}
        {selectedSkus.length > 0 && (
          <div className="bg-surface-variant border border-outline/15 p-4 flex justify-between items-center animate-fade-in text-on-surface">
            <div className="flex items-center gap-4 px-4">
              <span className="text-[10px] uppercase tracking-widest font-bold text-primary">
                {selectedSkus.length} Item{selectedSkus.length > 1 ? 's' : ''} Selected
              </span>
              <div className="h-4 w-[1px] bg-outline/20 mx-2"></div>
              <button 
                onClick={handleBulkRestock}
                className="text-[10px] uppercase tracking-widest font-bold text-secondary hover:opacity-80 transition-all"
              >
                Restock Selected
              </button>
              <button 
                onClick={handleBulkDelete}
                className="text-[10px] uppercase tracking-widest font-bold text-error hover:opacity-80 ml-4 transition-all"
              >
                Delete Selected
              </button>
            </div>
            <button 
              onClick={() => setSelectedSkus([])}
              className="text-[10px] uppercase tracking-widest opacity-50 font-bold hover:opacity-100"
            >
              Clear
            </button>
          </div>
        )}

        {/* Specimens List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70 px-4">
                <th className="pb-2 font-medium pl-4">
                  <input 
                    type="checkbox"
                    checked={filteredSpecimens.length > 0 && selectedSkus.length === filteredSpecimens.length}
                    onChange={handleSelectAll}
                    className="rounded-none border-outline/30 focus:ring-primary text-primary bg-transparent"
                  />
                </th>
                <th className="pb-2 font-medium">Product Specimen</th>
                <th className="pb-2 font-medium">SKU Reference</th>
                <th className="pb-2 font-medium">Category</th>
                <th className="pb-2 font-medium">Stock Vitality</th>
                <th className="pb-2 font-medium">Price (USD)</th>
                <th className="pb-2 font-medium text-right pr-4">Actions</th>
              </tr>
            </thead>
            
            <tbody className="font-body">
              {filteredSpecimens.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center italic text-xs text-outline/60 bg-white/30">
                    No botanical specimens found matching current queries.
                  </td>
                </tr>
              ) : (
                filteredSpecimens.map((spec) => {
                  const isChecked = selectedSkus.includes(spec.sku);
                  const isCritical = spec.stock < 15;
                  
                  // Calculate stock percentage
                  const percent = Math.min((spec.stock / 250) * 100, 100);

                  return (
                    <tr 
                      key={spec.sku} 
                      className={`bg-white/50 hover:bg-surface-container-low transition-colors group ${isChecked ? 'bg-primary/5' : ''}`}
                    >
                      {/* Checkbox column */}
                      <td className="py-6 pl-4 border-y border-l border-outline/5">
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => handleSelectRow(spec.sku, e.target.checked)}
                          className="rounded-none border-outline/30 focus:ring-primary text-primary bg-transparent"
                        />
                      </td>

                      {/* Specimen details */}
                      <td className="py-6 border-y border-outline/5">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 bg-surface-container overflow-hidden flex-shrink-0 border border-outline/5 shadow-sm">
                            <img 
                              src={spec.imageUrl} 
                              alt={spec.name} 
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover grayscale group-hover:grayscale-0 duration-500" 
                            />
                          </div>
                          <div className="text-left">
                            <p className="font-headline text-lg italic leading-tight text-primary">
                              {spec.name}
                            </p>
                            <p className={`text-[10px] uppercase tracking-widest opacity-50 mt-1 ${isCritical ? 'text-secondary font-bold opacity-100' : ''}`}>
                              {isCritical ? 'Low Stock Warning' : `Volume: ${spec.volume}`}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* SKU Reference */}
                      <td className="py-6 border-y border-outline/5">
                        <span className="font-mono text-xs text-on-surface-variant font-medium">
                          {spec.sku}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="py-6 border-y border-outline/5">
                        <span className="text-[10px] uppercase tracking-widest border border-outline/10 px-2.5 py-1">
                          {spec.category}
                        </span>
                      </td>

                      {/* Stock vitality bar */}
                      <td className="py-6 border-y border-outline/5">
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-1 bg-surface-container overflow-hidden rounded-full">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${isCritical ? 'bg-secondary' : 'bg-primary'}`}
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                          <span className={`text-xs font-bold ${isCritical ? 'text-secondary' : 'text-primary'}`}>
                            {spec.stock} Units
                          </span>
                        </div>
                      </td>

                      {/* Price (USD) */}
                      <td className="py-6 border-y border-outline/5">
                        <span className="font-headline text-lg italic font-bold">
                          ${spec.price.toFixed(2)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-6 border-y border-r border-outline/5 text-right pr-4">
                        <div className="flex items-center justify-end gap-3">
                          {isCritical ? (
                            <button 
                              onClick={() => onRestockItem(spec.sku)}
                              className="bg-secondary text-on-primary px-3 py-1 text-[9px] uppercase tracking-widest font-bold hover:opacity-90 active:scale-95 duration-100"
                            >
                              Restock
                            </button>
                          ) : (
                            <button 
                              onClick={() => onRestockItem(spec.sku)}
                              className="text-primary hover:text-secondary opacity-0 group-hover:opacity-100 transition-opacity p-1"
                              title="Restock units"
                            >
                              <RefreshCcw size={12} />
                            </button>
                          )}
                          <button 
                            onClick={() => onDeleteSpecimen(spec.sku)}
                            className="text-outline/40 hover:text-error transition-colors p-1"
                            title="Deactivate item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination details */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-outline/10 gap-4 text-left">
          <span className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant font-bold">
            Showing 1-{filteredSpecimens.length} of {specimens.length} specimens
          </span>
          <div className="flex gap-2">
            <button className="h-10 w-10 border border-outline/20 flex items-center justify-center hover:bg-surface-container transition-colors font-bold text-xs">
              ‹
            </button>
            <button className="h-10 w-10 bg-primary text-on-primary flex items-center justify-center font-bold text-[10px]">
              1
            </button>
            <button className="h-10 w-10 border border-outline/20 flex items-center justify-center hover:bg-surface-container transition-colors text-[10px] font-bold">
              2
            </button>
            <button className="h-10 w-10 border border-outline/20 flex items-center justify-center hover:bg-surface-container transition-colors font-bold text-xs">
              ›
            </button>
          </div>
        </div>

      </section>

    </div>
  );
}
