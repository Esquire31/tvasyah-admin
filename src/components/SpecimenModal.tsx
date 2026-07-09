/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { Specimen } from '../types';

interface SpecimenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSpecimen: (specimen: Specimen) => void;
}

export default function SpecimenModal({
  isOpen,
  onClose,
  onAddSpecimen
}: SpecimenModalProps) {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [volume, setVolume] = useState('50ml');
  const [category, setCategory] = useState<'Serums' | 'Elixirs' | 'Essences'>('Serums');
  const [stock, setStock] = useState(10);
  const [price, setPrice] = useState(45);
  
  // High-fidelity hotlink options for beauty
  const defaultImages = [
    { name: 'Moss Oak', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSyQuF5bShPuK3gbHHsm3zbxWzOMI6PZW6Y9YlUm_NLbNDmzopPw1f14HOixSnd0AO0fwkCyPBY698GaKSJbtfrd6kCxdKoujwt8AT2N1F-JtwEs7m1BVMw28KQhnTrMsCMpSkUcJ7L4lPtmo2qlh-axquSCa0thw3vApzRfpSSTBNqsu8jhcJLYTcDZNM3WGSIPpBXfUc1mzuW1EF7bONM3eNfPALpxoAKopaYSSwbq8OwXhjXjA' },
    { name: 'Amber Root', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZzt8N0AdyPUP4rIkDJi7_K3VH6efe0jwfJs47uHbxFoQ4YfvQWXRxPcB_Q8vY5vdC9VYe4ui5eib_bPSNBj4iJahAM7bJMJsvBb2_WfPK3IugyFRuZUjZ8pb5jgoAC2awZ6Lx69zLP8a2ffoHodCFL1bVbz_auWhoebJ_CkpQSI9lKb5o6mPXfQYxxTCzq6Eqz3K6MaU4Bh53JJ7LYwJKISoe36RX7e_wLmtvp05S5eQnBeDYuok' },
    { name: 'Dewy Fern', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvnLZ5CXfjyyUxmR3vEMEUuY2pUdUo-Y-GL_iANPsziYO6qqliwDeY4XDDrH7bC8sW4Ly40dhowF4jEOquYgJijzwnKdSq374996xmBAyAvFao4x03TAtxbO4WVOaQVSiQWFi_Cmd09YnM5ZTQBUMwMyzQ6ZPvf5CcQYremGuGspFkU8fvMiihHQnMdngwWJX89cLebKKcFElV3cd-nmbBPk51h10RgEd_wyOtKtL_g8vlhHDdhB0' }
  ];
  
  const [selectedImage, setSelectedImage] = useState(defaultImages[0].url);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !sku.trim()) return;

    onAddSpecimen({
      name,
      sku: sku.toUpperCase(),
      volume,
      category,
      stock,
      price,
      imageUrl: selectedImage,
      lowStockWarning: stock < 15
    });

    // Reset and close
    setName('');
    setSku('');
    setVolume('50ml');
    setStock(10);
    setPrice(45);
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
            Botanical Catalog
          </span>
          <h3 className="font-headline text-3xl italic">
            Add Specimen
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 font-body">
          {/* Specimen Name */}
          <div className="flex flex-col space-y-2">
            <label className="text-[10px] uppercase tracking-wider font-bold text-outline">
              Specimen Name
            </label>
            <input 
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Saffron Bright Serum"
              className="bg-surface-variant border-b border-outline px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-outline/40"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* SKU */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-bold text-outline">
                SKU Reference
              </label>
              <input 
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="TV-SB-123"
                className="bg-surface-variant border-b border-outline px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-outline/40"
              />
            </div>

            {/* Volume */}
            <div className="flex flex-col space-y-2">
              <label className="text-[10px] uppercase tracking-wider font-bold text-outline">
                Volume / Capacity
              </label>
              <input 
                type="text"
                required
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                placeholder="50ml"
                className="bg-surface-variant border-b border-outline px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Category */}
            <div className="flex flex-col space-y-2 col-span-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-outline">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="bg-surface-variant border-b border-outline px-2 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value="Serums">Serums</option>
                <option value="Elixirs">Elixirs</option>
                <option value="Essences">Essences</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col space-y-2 col-span-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-outline">
                Price (USD)
              </label>
              <input 
                type="number"
                min="1"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="bg-surface-variant border-b border-outline px-4 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Stock */}
            <div className="flex flex-col space-y-2 col-span-1">
              <label className="text-[10px] uppercase tracking-wider font-bold text-outline">
                Initial Stock
              </label>
              <input 
                type="number"
                min="0"
                required
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="bg-surface-variant border-b border-outline px-4 py-2 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Image Selection */}
          <div className="flex flex-col space-y-2 pt-2 border-t border-outline/10">
            <label className="text-[10px] uppercase tracking-wider font-bold text-outline">
              Botanical Photography Vibe
            </label>
            <div className="grid grid-cols-3 gap-3">
              {defaultImages.map((img) => (
                <button
                  key={img.name}
                  type="button"
                  onClick={() => setSelectedImage(img.url)}
                  className={`border p-2 flex flex-col items-center gap-1 hover:border-primary transition-all duration-200 ${selectedImage === img.url ? 'border-primary bg-primary/5' : 'border-outline/15'}`}
                >
                  <div className="w-10 h-10 bg-surface-container overflow-hidden rounded-sm">
                    <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[9px] uppercase tracking-tight">{img.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-4">
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
              Add to Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
