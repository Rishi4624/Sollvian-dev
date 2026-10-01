'use client';

import { useState } from 'react';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import {
  FileText, Activity, Layers, Users, ShieldCheck,
  ChevronLeft, ChevronRight, CheckCircle2, ArrowRight
} from 'lucide-react';

const MODULES = [
  {
    num: '01', title: 'Proposal & ROI',
    summary: 'Customized proposals for unique business needs with the return made visible.',
    detail: 'We gather the site, the buyer, and the numbers that have to survive after the signature. The document that goes out is specific enough to build from.',
    icon: FileText,
    features: [
      { title: 'Site Assessment & Shading Analysis', desc: 'Precise irradiance modeling and shadow simulation for accurate yield prediction.' },
      { title: 'Financial Modeling & Payback Horizon', desc: 'Real-time ROI calculation factoring in local tariffs, subsidies and degradation curves.' },
      { title: 'Bespoke Proposal Generation', desc: 'One-click export of engineering-ready proposals customized for enterprise stakeholders.' },
    ],
    metric: '99.4%', metricLabel: 'Forecast Accuracy',
    video: '/videos/proposal_video.mp4',
  },
  {
    num: '02', title: 'Installation Tracking',
    summary: 'Real-time tracking for smooth and timely installations.',
    detail: 'Crews, sites, and blockers sit on one timeline. A slip is visible the morning it happens, not the week the customer asks.',
    icon: Activity,
    features: [
      { title: 'Live Milestone Timeline', desc: 'Track permitting, delivery, staging and commissioning across all active job sites.' },
      { title: 'Automated Blocker Alerts', desc: 'Instant notifications when material delays or labor bottlenecks threaten project velocity.' },
      { title: 'Field Crew Dispatch & Sync', desc: 'Mobile-first updates from site leads feeding directly into the central dashboard.' },
    ],
    metric: '35%', metricLabel: 'Faster Completion',
    video: '/videos/installation_trecking.mp4',
  },
  {
    num: '03', title: 'Structure Design',
    summary: 'Scalable solar structure design engineered for every site.',
    detail: 'Each site gets a structure that fits the ground, the load and the install plan — not a reused drawing from the last job.',
    icon: Layers,
    features: [
      { title: 'Structural Load Simulation', desc: 'Wind load and snow load stress testing configured for local geological standards.' },
      { title: 'Bill of Materials Automation', desc: 'Instant generation of exact fastener counts, rail lengths and racking requirements.' },
      { title: 'Ground & Rooftop Compatibility', desc: 'Seamless switching between ballasted flat roof, pitched roof and ground-mount arrays.' },
    ],
    metric: '100%', metricLabel: 'Engineering Compliance',
    video: '/videos/structure_design.mp4',
  },
  {
    num: '04', title: 'CRM Integration',
    summary: 'Stronger relationships. Better engagement. Greater growth.',
    detail: 'Notes, next actions and the last promise live together. The account view is what a person would say if you asked how the work is going.',
    icon: Users,
    features: [
      { title: 'Unified Account Timeline', desc: 'All communications, proposals, site notes and calls ordered in a single chronological stream.' },
      { title: 'Next-Action Reminders', desc: 'Never drop a follow-up with automated prompt triggers tied to project milestones.' },
      { title: 'Pipeline Health Analytics', desc: 'Visual forecasting for commercial solar deals from initial lead to signed PPA.' },
    ],
    metric: '4.8x', metricLabel: 'Pipeline Visibility',
    video: '/videos/CRM_demo_3.mp4',
  },
  {
    num: '05', title: 'Customer 360°',
    summary: 'A complete view connecting contracts, tickets, and installs.',
    detail: 'Contracts, tickets, installs and usage fold into one picture. Support does not start from a blank page.',
    icon: ShieldCheck,
    features: [
      { title: 'Lifecycle Panoramic View', desc: 'Instantly bridge historical billing, live inverter production telemetry and active service tickets.' },
      { title: 'Proactive O&M Triggers', desc: 'Automated dispatch for maintenance before generation drops below efficiency thresholds.' },
      { title: 'Client Portal Integration', desc: 'Self-serve executive dashboards giving commercial clients real-time ESG and savings reports.' },
    ],
    metric: '99.8%', metricLabel: 'Client Retention',
    video: '/videos/customer_360_demo.mp4',
  },
];

export default function WorkflowPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState<'next' | 'prev'>('next');

  function go(next: number) {
    if (animating) return;
    setDir(next > activeIdx ? 'next' : 'prev');
    setAnimating(true);
    setTimeout(() => { setActiveIdx(next); setAnimating(false); }, 350);
  }

  const mod = MODULES[activeIdx];
  const Icon = mod.icon;

  return (
    <div className="min-h-screen bg-[#f7f7f2]">
      <Header />

      {/* Page Hero */}
      <div className="pt-[76px] border-b border-[#203a30]/8 bg-[#f7f7f2]">
        <div className="w-[min(82rem,calc(100%-2.5rem))] mx-auto py-20">
          <div className="inline-flex items-center gap-2 mb-6 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b6744]">
            <span className="h-px w-6 bg-[#8b6744]" /> Platform Workflow
          </div>
          <h1 className="mb-5 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[0.99] tracking-[-0.04em] text-[#203a30]">
            Five modules.<br />
            <span className="italic text-[#8b6744]">One connected platform.</span>
          </h1>
          <p className="max-w-xl text-[16px] leading-[1.8] text-[#606b62] md:text-[17px]">
            Walk through each module to see how Sollvian covers every stage of your solar operation.
          </p>
        </div>
      </div>

      {/* Module Navigation Pills */}
      <div className="sticky top-[76px] z-40 bg-[#f7f7f2]/95 backdrop-blur-md border-b border-[#203a30]/8">
        <div className="w-[min(82rem,calc(100%-2.5rem))] mx-auto py-3 flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {MODULES.map((m, i) => {
            const MIcon = m.icon;
            return (
              <button
                key={m.num}
                onClick={() => go(i)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full shrink-0 transition-all text-[13px] font-bold ${
                  activeIdx === i
                    ? 'bg-[#244337] text-white shadow-md'
                    : 'bg-white border border-[#203a30]/10 text-[#5a6b5e] hover:border-[#244337]/30 hover:text-[#244337]'
                }`}
              >
                <MIcon className="w-4 h-4" />
                {m.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Module Content */}
      <main className="w-[min(82rem,calc(100%-2.5rem))] mx-auto py-16">
        <div className={`transition-all duration-350 ${animating ? `opacity-0 ${dir === 'next' ? '-translate-x-4' : 'translate-x-4'}` : 'opacity-100 translate-x-0'}`}>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-20 items-start">

            {/* Left — Text */}
            <div>
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#203a30]/10 bg-[#e8ece3]">
                  <Icon className="h-7 w-7 text-[#244337]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b6744]">Module {mod.num}</div>
                  <h2 className="font-serif text-[clamp(2rem,3vw,2.8rem)] leading-[1.06] tracking-[-0.03em] text-[#203a30]">{mod.title}</h2>
                </div>
              </div>

              <p className="mb-4 text-[16px] font-semibold leading-[1.7] text-[#8b6744]">{mod.summary}</p>
              <p className="mb-10 text-[15px] leading-[1.8] text-[#606b62]">{mod.detail}</p>

              <div className="space-y-3 mb-10">
                {mod.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#203a30]/8 hover:border-[#244337]/25 hover:shadow-sm transition-all">
                    <CheckCircle2 className="w-5 h-5 text-[#244337] shrink-0 mt-0.5" />
                    <div>
                      <div className="mb-1 text-[14px] font-bold text-[#203a30]">{f.title}</div>
                      <div className="text-sm leading-relaxed text-[#606b62]">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Metric badge */}
              <div className="inline-flex items-center gap-4 p-5 rounded-2xl bg-[#244337] text-white">
                <div>
                  <div className="font-serif text-4xl leading-none text-white">{mod.metric}</div>
                  <div className="text-sm font-semibold text-white/70">{mod.metricLabel}</div>
                </div>
              </div>
            </div>

            {/* Right — Video */}
            <div className="sticky top-[140px]">
              <div className="rounded-3xl overflow-hidden border border-[#203a30]/10 bg-white shadow-[0_20px_60px_-20px_rgba(31,58,48,0.2)]">
                {/* Fake browser bar */}
                <div className="flex items-center gap-2 px-4 h-10 bg-[#f0ede6] border-b border-[#203a30]/8">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c97d5e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c9b05e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#829b78]" />
                  <span className="ml-2 text-[10px] font-mono text-[#7b8b7e] flex-1 text-center truncate">
                    sollvian.io/{mod.title.toLowerCase().replace(/\s+/g, '-')}
                  </span>
                </div>
                <div className="aspect-[4/3] bg-[#e8ece3] relative overflow-hidden">
                  <video
                    key={mod.video}
                    src={mod.video}
                    autoPlay loop muted playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Prev/Next navigation */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => go((activeIdx - 1 + MODULES.length) % MODULES.length)}
                  className="flex items-center gap-2 rounded-full border border-[#203a30]/15 bg-white px-5 py-2.5 text-[13px] font-bold text-[#5a6b5e] transition-all hover:border-[#244337]/30 hover:text-[#244337]"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span className="text-[#7b8b7e] text-sm font-medium">{activeIdx + 1} / {MODULES.length}</span>
                <button
                  onClick={() => go((activeIdx + 1) % MODULES.length)}
                  className="flex items-center gap-2 rounded-full bg-[#244337] px-5 py-2.5 text-[13px] font-bold text-white shadow-md transition-all hover:bg-[#315844]"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}