'use client';

import React, { useState } from 'react';
import { FileText, Activity, Layers, Users, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

const PRODUCTS = [
  {
    num: '01',
    title: 'Proposal & ROI',
    summary: 'Tailored proposals built around needs, with clear ROI.',
    description: 'We gather the site, the buyer, and the numbers that have to survive after the signature. The document that goes out is specific enough to build from. It includes precise irradiance modeling and shadow simulation for accurate yield prediction.',
    icon: FileText,
    features: ['Site Assessment & Shading', 'Financial Modeling', 'Bespoke Generation'],
    metric: '99.4% Forecast Accuracy'
  },
  {
    num: '02',
    title: 'Installation Tracking',
    summary: 'Real-time tracking for smooth and timely installations.',
    description: 'Crews, sites and blockers sit on one timeline. A slip is visible the morning it happens, not the week the customer asks. Track permitting, delivery, staging and commissioning across all active job sites live.',
    icon: Activity,
    features: ['Live Milestone Timeline', 'Automated Blocker Alerts', 'Field Crew Dispatch'],
    metric: '35% Faster Completion'
  },
  {
    num: '03',
    title: 'Structure Design',
    summary: 'Scalable solar structure design engineered for every site.',
    description: 'Each site gets a structure that fits the ground, the load and the install plan — not a reused drawing from the last job. Features wind load and snow load stress testing configured for local geological standards.',
    icon: Layers,
    features: ['Structural Load Simulation', 'BOM Automation', 'Ground & Roof Compatibility'],
    metric: '100% Engineering Compliance'
  },
  {
    num: '04',
    title: 'CRM Integration',
    summary: 'Stronger relationships and pipeline visibility.',
    description: 'Notes, next actions and the last promise live together. The account view is what a person would say if you asked how the work is going. Never drop a follow-up with automated prompt triggers.',
    icon: Users,
    features: ['Unified Account Timeline', 'Next-Action Reminders', 'Pipeline Health Analytics'],
    metric: '4.8x Pipeline Visibility'
  },
  {
    num: '05',
    title: 'Customer 360°',
    summary: 'A complete view connecting contracts, tickets, and installs.',
    description: 'Contracts, tickets, installs and usage fold into one picture. Support does not start from a blank page. Instantly bridge historical billing, live inverter production telemetry and active service tickets.',
    icon: ShieldCheck,
    features: ['Lifecycle Panoramic View', 'Proactive O&M Triggers', 'Client Portal Integration'],
    metric: '99.8% Client Retention'
  }
];

export default function ProductSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  const handleSelect = (index: number) => {
    if (index !== activeIdx) {
      setActiveIdx(index);
      setAnimationKey(prev => prev + 1);
    }
  };

  const activeProduct = PRODUCTS[activeIdx];
  const ActiveIcon = activeProduct.icon;

  return (
    <section className="py-24 bg-white text-slate-900 relative overflow-hidden font-sans border-t border-slate-100" id="product">
      <div className="w-[min(80rem,calc(100%-2rem))] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            Platform Capabilities
          </div>
          <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
            The complete toolkit.
          </h2>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
            Designed specifically for solar professionals. Ditch the fragmented spreadsheets and manage your entire lifecycle seamlessly from one intelligent hub.
          </p>
        </div>

        {/* Sidebar & Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Sidebar Navigation */}
          <div className="lg:col-span-4 flex flex-col gap-3 lg:sticky lg:top-32">
            {PRODUCTS.map((p, idx) => {
              const isActive = activeIdx === idx;
              const Icon = p.icon;
              return (
                <button
                  key={p.num}
                  onClick={() => handleSelect(idx)}
                  className={`group flex items-center gap-4 p-4 rounded-2xl w-full text-left transition-all duration-300 border ${
                    isActive 
                      ? 'bg-slate-900 border-slate-900 text-white shadow-xl translate-x-2' 
                      : 'bg-white border-slate-200 hover:border-blue-300 text-slate-600 hover:bg-blue-50/50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-sm ${
                    isActive ? 'bg-white/15 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold tracking-widest uppercase mb-1 ${isActive ? 'text-blue-400' : 'text-slate-400'}`}>
                      Module {p.num}
                    </div>
                    <div className={`font-bold text-lg ${isActive ? 'text-white' : 'text-slate-900'}`}>
                      {p.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Content Display */}
          <div className="lg:col-span-8 bg-slate-50/50 border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden min-h-[500px] flex items-center">
            {/* Decorative background blur */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] opacity-60 -mr-20 -mt-20 pointer-events-none" />
            
            <div key={animationKey} className="relative z-10 w-full animate-fade-up">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-10 border-b border-slate-200">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-blue-600">
                    <ActiveIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-slate-900 mb-2">{activeProduct.title}</h3>
                    <p className="text-blue-600 font-bold tracking-wide uppercase text-sm">
                      {activeProduct.metric}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">Overview</h4>
                  <p className="text-slate-600 leading-relaxed text-lg mb-8">
                    {activeProduct.description}
                  </p>
                  <button className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-800 transition-colors group">
                    View full documentation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Key Features</h4>
                  <ul className="space-y-4">
                    {activeProduct.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                        <span className="text-slate-700 font-semibold">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}