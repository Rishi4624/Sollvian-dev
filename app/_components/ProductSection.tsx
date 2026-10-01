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
      setAnimationKey(prev => prev + 1); // Trigger re-animation
    }
  };

  const activeProduct = PRODUCTS[activeIdx];
  const ActiveIcon = activeProduct.icon;

  return (
    <section className="py-24 bg-[#fdfdfc] text-[#2c3327] relative overflow-hidden font-sans" id="product">
      <div className="w-[min(80rem,calc(100%-2rem))] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 max-w-3xl animate-fade-up">
          <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold tracking-tight text-[#2c3327] leading-tight mb-6">
            The complete toolkit.
          </h2>
          <p className="text-[#4a533a] text-lg md:text-xl leading-relaxed">
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
                      ? 'bg-[#2c3327] border-[#2c3327] text-white shadow-lg translate-x-2' 
                      : 'bg-white border-black/5 hover:border-black/15 text-[#4a533a] hover:bg-gray-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isActive ? 'bg-white/10 text-white' : 'bg-[#f0ebe1] text-[#6b705c] group-hover:bg-[#e3e1d9]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`text-xs font-bold tracking-widest uppercase mb-1 ${isActive ? 'text-[#a5a58d]' : 'text-[#a5a58d]'}`}>
                      Module {p.num}
                    </div>
                    <div className={`font-bold text-lg ${isActive ? 'text-white' : 'text-[#2c3327]'}`}>
                      {p.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Content Display */}
          <div className="lg:col-span-8 bg-white border border-black/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[500px] flex items-center">
            {/* Decorative background blur */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#f0ebe1] rounded-full blur-[100px] opacity-60 -mr-20 -mt-20 pointer-events-none" />
            
            <div key={animationKey} className="relative z-10 w-full animate-fade-up">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-10 border-b border-black/5">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-[#f0ebe1] flex items-center justify-center text-[#6b705c]">
                    <ActiveIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-[#2c3327] mb-2">{activeProduct.title}</h3>
                    <p className="text-[#a5a58d] font-semibold tracking-wide uppercase text-sm">
                      {activeProduct.metric}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-xl font-bold text-[#2c3327] mb-4">Overview</h4>
                  <p className="text-[#4a533a] leading-relaxed text-lg mb-8">
                    {activeProduct.description}
                  </p>
                  <button className="inline-flex items-center gap-2 font-bold text-[#6b705c] hover:text-[#2c3327] transition-colors group">
                    View full documentation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className="bg-[#fcfcfb] rounded-2xl p-6 border border-black/5">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[#a5a58d] mb-6">Key Features</h4>
                  <ul className="space-y-4">
                    {activeProduct.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#6b705c] shrink-0" />
                        <span className="text-[#2c3327] font-medium">{feature}</span>
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