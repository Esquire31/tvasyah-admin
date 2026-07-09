/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, Save, Database, Shield, Radio, Key } from 'lucide-react';

interface SettingsViewProps {
  onResetLedger: () => void;
}

export default function SettingsView({ onResetLedger }: SettingsViewProps) {
  const [autoRestock, setAutoRestock] = useState(true);
  const [notifSound, setNotifSound] = useState(false);
  const [auditLogs, setAuditLogs] = useState(true);
  const [currency, setCurrency] = useState('USD');

  return (
    <div className="animate-fade-in text-on-surface text-left">
      <div className="mb-12 border-b border-outline/10 pb-4">
        <span className="font-body uppercase tracking-[0.4em] text-[10px] text-secondary font-bold">
          System Panel
        </span>
        <h2 className="font-headline text-5xl italic mt-2">
          System <span className="text-primary/40">Settings</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 font-body text-sm">
        
        {/* Left Col: Automation Toggles */}
        <div className="lg:col-span-2 space-y-8">
          
          <section className="bg-surface-variant p-8 shadow-sm">
            <h3 className="font-headline text-2xl italic text-primary mb-6 flex items-center gap-2">
              <Radio size={18} className="text-secondary" />
              Fulfillment &amp; Restock Loops
            </h3>
            
            <div className="space-y-6">
              {/* Toggle 1 */}
              <div className="flex justify-between items-center py-2 border-b border-outline/5">
                <div>
                  <p className="font-bold text-primary uppercase tracking-wider text-xs">Automated Restock Triggers</p>
                  <p className="text-[11px] text-on-surface-variant mt-1">Initiates an automatic replenishment invoice when specimens fall below 15 units.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setAutoRestock(!autoRestock)}
                  className="text-primary hover:opacity-80 transition-opacity p-1"
                >
                  {autoRestock ? <ToggleRight size={38} className="text-primary" /> : <ToggleLeft size={38} className="text-outline/40" />}
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex justify-between items-center py-2 border-b border-outline/5">
                <div>
                  <p className="font-bold text-primary uppercase tracking-wider text-xs">Security Audit Logs</p>
                  <p className="text-[11px] text-on-surface-variant mt-1">Log all curation actions and invoice adjustments to the secure terminal database.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setAuditLogs(!auditLogs)}
                  className="text-primary hover:opacity-80 transition-opacity p-1"
                >
                  {auditLogs ? <ToggleRight size={38} className="text-primary" /> : <ToggleLeft size={38} className="text-outline/40" />}
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="font-bold text-primary uppercase tracking-wider text-xs">Audible Curation Warnings</p>
                  <p className="text-[11px] text-on-surface-variant mt-1">Triggers low acoustic loops when stock falls to zero.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setNotifSound(!notifSound)}
                  className="text-primary hover:opacity-80 transition-opacity p-1"
                >
                  {notifSound ? <ToggleRight size={38} className="text-primary" /> : <ToggleLeft size={38} className="text-outline/40" />}
                </button>
              </div>
            </div>
          </section>

          {/* Database reset section */}
          <section className="bg-surface border border-outline/10 p-8 shadow-sm">
            <h3 className="font-headline text-2xl italic text-primary mb-2 flex items-center gap-2">
              <Database size={18} className="text-secondary" />
              Archival Backup &amp; Ledgers
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
              Performing a backup copies all live orders, invoices, and speciment catalog trees into a downloadable archive JSON state.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                type="button"
                className="px-6 py-3 bg-primary text-on-primary uppercase tracking-widest text-[10px] font-bold hover:opacity-90 active:scale-95 duration-200"
              >
                Download State JSON
              </button>
              <button 
                type="button"
                onClick={() => {
                  if (confirm("Restore all default specimens, invoices, and feeds? Any custom creations will be overwritten.")) {
                    onResetLedger();
                  }
                }}
                className="px-6 py-3 border border-secondary text-secondary hover:bg-secondary/5 uppercase tracking-widest text-[10px] font-bold active:scale-95 duration-200"
              >
                Factory Ledger Reset
              </button>
            </div>
          </section>
        </div>

        {/* Right Col: Theme & Info Cards */}
        <div className="space-y-8">
          {/* Key Secrets Display */}
          <section className="bg-primary text-on-primary p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-on-primary/10 rounded-full">
                <Shield size={16} className="text-tertiary" />
              </div>
              <h4 className="font-headline text-xl italic text-on-primary">Archival Keys</h4>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold mb-1">Curation Engine ID</p>
                <code className="text-xs font-mono bg-on-primary/5 px-2 py-1 select-all break-all block">
                  962fa351-9791-488d-b24b-b468939b6612
                </code>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-60 font-bold mb-1">Theme Identifier</p>
                <code className="text-xs font-mono bg-on-primary/5 px-2 py-1 block">
                  organic-brutalism-botanical-archive
                </code>
              </div>

              <div className="pt-4 border-t border-on-primary/10 flex items-center justify-between text-xs">
                <span>Secure SSL Cipher</span>
                <span className="font-bold text-tertiary uppercase tracking-widest text-[9px]">Activated</span>
              </div>
            </div>
          </section>

          {/* About curation model */}
          <section className="bg-surface p-8 border border-outline/15 shadow-sm text-left">
            <h4 className="font-headline text-lg italic text-primary mb-4">Linen &amp; Moss Philosophy</h4>
            <p className="text-[11px] text-on-surface-variant leading-relaxed mb-4">
              We respect beautiful tactile materials, slow handcrafted harvests, and asymmetric grid alignments.
            </p>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              Our codebases use pure React with zero heavy abstractions to match this standard. Thank you for curating with us.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
