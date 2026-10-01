'use client';

import React, { useState } from 'react';
import { FileText, Activity, Layers, Users, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';

const PRODUCTS = [
  {
    num: '01', title: 'Proposal & ROI',
    summary: 'Tailored proposals with precise financial modeling.',
    description: 'We gather site data, buyer profiles, and irradiance models to generate proposals specific enough to build from. Every document is backed by real financial analysis, not templates.',
    icon: FileText, features: ['Site Assessment & Shading', 'Financial ROI Modeling', 'Bespoke Document Generation'], metric: '99.4% Forecast Accuracy',
  },
  {
    num: '02', title: 'Installation Tracking',
    summary: 'Real-time timelines for every active job site.',
    description: 'Crews, sites, and blockers all sit on one living timeline. A slip is visible the morning it happens — not the week the customer calls asking what went wrong.',
    icon: Activity, features: ['Live Milestone Timeline', 'Automated Blocker Alerts', 'Field Crew Dispatch'], metric: '35% Faster Completion',
  },
  {
    num: '03', title: 'Structure Design',
    summary: 'Engineering-grade structural plans, automatically.',
    description: 'Each site gets a structure built for its specific ground, load, and install plan. Wind, snow, and seismic stress tested against local codes before a single bolt is ordered.',
    icon: Layers, features: ['Structural Load Simulation', 'BOM Auto-Generation', 'Ground & Roof Compatibility'], metric: '100% Engineering Compliance',
  },
  {
    num: '04', title: 'CRM Integration',
    summary: "A pipeline that actually tells you what's happening.",
    description: 'Notes, next actions, and every promise live together. The account view is what a person would say if you asked how the work is going — not a wall of spreadsheet rows.',
    icon: Users, features: ['Unified Account Timeline', 'Next-Action Reminders', 'Pipeline Health Analytics'], metric: '4.8x Pipeline Visibility',
  },
  {
    num: '05', title: 'Customer 360°',
    summary: 'Every contract, ticket, and install in one view.',
    description: 'Contracts, tickets, installs, and usage fold into one complete picture so your support team never starts from a blank page.',
    icon: ShieldCheck, features: ['Lifecycle Panoramic View', 'Proactive O&M Triggers', 'Client Portal Integration'], metric: '99.8% Client Retention',
  },
];

export default function ProductSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="border-t border-[#203a30]/10 bg-[#fffefa] py-24 md:py-32" id="product">
      <div className="mx-auto w-[min(82rem,calc(100%-2.5rem))]">
        <div className="grid items-start gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b6744]">The platform</p>
            <h2 className="mb-6 font-serif text-[clamp(2.6rem,4vw,4rem)] leading-[1.02] text-[#203a30]">
              One system.<br />Every moving part.
            </h2>
            <p className="max-w-sm text-[15px] leading-[1.8] text-[#687269]">
              Purpose-built tools for solar teams, connected from the first customer conversation through installation and ongoing service.
            </p>
            <div className="mt-9 flex items-baseline gap-3 border-t border-[#203a30]/12 pt-5">
              <span className="font-serif text-5xl text-[#244337]">05</span>
              <span className="text-[12px] leading-relaxed text-[#6b756d]">integrated modules<br />one shared workspace</span>
            </div>
          </div>

          <div className="divide-y divide-[#203a30]/12 border-y border-[#203a30]/12">
            {PRODUCTS.map((p, idx) => {
              const isOpen = openIdx === idx;
              const Icon = p.icon;
              return (
                <div
                  key={p.num}
                  className={`group transition-colors duration-200 ${
                    isOpen
                      ? 'bg-[#f4f5ef]'
                      : 'bg-transparent hover:bg-[#f8f8f3]'
                  }`}
                >
                  {/* Accordion header */}
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center gap-4 py-5 text-left sm:gap-5 sm:py-6"
                  >
                    <div className={`grid h-11 w-11 place-items-center rounded-full shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#244337] text-white'
                        : 'bg-[#e9ece5] text-[#71806f] group-hover:bg-[#dfe6dc]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Module label */}
                      <div className={`mb-1 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors ${isOpen ? 'text-[#8b6744]' : 'text-[#8a9388]'}`}>
                        {p.num} / Module
                      </div>
                      {/* Title — white on dark → ✅ */}
                      <div className={`text-[16px] font-bold transition-colors sm:text-[18px] ${isOpen ? 'text-[#203a30]' : 'text-[#435348]'}`}>
                        {p.title}
                      </div>
                      {/* Summary on closed — white/35 on dark → ✅ */}
                      {!isOpen && (
                        <div className="mt-1 truncate text-[13px] text-[#7c857c]">{p.summary}</div>
                      )}
                    </div>

                    <div className={`grid h-8 w-8 place-items-center rounded-full border border-[#203a30]/15 shrink-0 transition-all duration-300 ${
                      isOpen ? 'rotate-90 border-[#244337]/30 bg-white' : ''
                    }`}>
                      <ChevronRight className={`w-4 h-4 transition-colors ${isOpen ? 'text-[#244337]' : 'text-[#859087]'}`} />
                    </div>
                  </button>

                  {/* Accordion body */}
                  {isOpen && (
                    <div className="border-t border-[#203a30]/10 px-5 pb-6 sm:px-16">
                      <div className="grid gap-7 pt-5 sm:grid-cols-2">
                        <div>
                          <p className="mb-5 text-[14px] leading-[1.8] text-[#687269]">
                            {p.description}
                          </p>
                          <div className="inline-flex items-center gap-2 border-l-2 border-[#8b6744] pl-3">
                            <span className="text-[12px] font-bold text-[#66523e]">{p.metric}</span>
                          </div>
                        </div>

                        <div className="border-l border-[#203a30]/10 pl-5">
                          <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a9388]">Key features</div>
                          <ul className="space-y-3">
                            {p.features.map((f) => (
                              <li key={f} className="flex items-center gap-2.5">
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#71866b]" />
                                <span className="text-[13px] font-medium text-[#48574b]">{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}