'use client';
import { useState, useEffect } from 'react';
import {
  FileText,
  Activity,
  Layers,
  Users,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
} from 'lucide-react';
import Header from '@/app/_components/Header';

const PRODUCTS = [
  {
    num: '01',
    title: 'Proposal & ROI',
    summary: 'Customized proposals for unique business needs with the return made visible.',
    detail: 'We gather the site, the buyer and the numbers that have to survive after the signature. The document that goes out is specific enough to build from.',
    icon: FileText,
    accent: 'from-cyan-400 to-blue-500',
    subPoints: [
      { title: 'Site Assessment & Shading Analysis', desc: 'Precise irradiance modeling and shadow simulation for accurate yield prediction.' },
      { title: 'Financial Modeling & Payback Horizon', desc: 'Real-time ROI calculation factoring in local tariffs, subsidies and degradation curves.' },
      { title: 'Bespoke Proposal Generation', desc: 'One-click export of engineering-ready proposals customized for enterprise stakeholders.' }
    ],
    metric: '99.4% Forecast Accuracy'
  },
  {
    num: '02',
    title: 'Installation Tracking',
    summary: 'Real-time tracking for smooth and timely installations.',
    detail: 'Crews, sites and blockers sit on one timeline. A slip is visible the morning it happens, not the week the customer asks.',
    icon: Activity,
    accent: 'from-emerald-400 to-teal-500',
    subPoints: [
      { title: 'Live Milestone Timeline', desc: 'Track permitting, delivery, staging and commissioning across all active job sites.' },
      { title: 'Automated Blocker Alerts', desc: 'Instant notifications when material delays or labor bottlenecks threaten project velocity.' },
      { title: 'Field Crew Dispatch & Sync', desc: 'Mobile-first updates from site leads feeding directly into the central dashboard.' }
    ],
    metric: '35% Faster Completion'
  },
  {
    num: '03',
    title: 'Structure Design',
    summary: 'Scalable solar structure design for every site.',
    detail: 'Each site gets a structure that fits the ground, the load and the install plan — not a reused drawing from the last job.',
    icon: Layers,
    accent: 'from-amber-400 to-orange-500',
    subPoints: [
      { title: 'Structural Load Simulation', desc: 'Wind load and snow load stress testing configured for local geological standards.' },
      { title: 'Bill of Materials (BOM) Automation', desc: 'Instant generation of exact fastener counts, rail lengths and racking requirements.' },
      { title: 'Ground & Rooftop Compatibility', desc: 'Seamless switching between ballasted flat roof, pitched roof and ground-mount arrays.' }
    ],
    metric: '100% Engineering Compliance'
  },
  {
    num: '04',
    title: 'CRM',
    summary: 'Stronger relationships. Better engagement. Greater growth.',
    detail: 'Notes, next actions and the last promise live together. The account view is what a person would say if you asked how the work is going.',
    icon: Users,
    accent: 'from-indigo-400 to-purple-500',
    subPoints: [
      { title: 'Unified Account Timeline', desc: 'All communications, proposals, site notes and calls ordered in a single chronological stream.' },
      { title: 'Next-Action Reminders', desc: 'Never drop a follow-up with automated prompt triggers tied to project milestones.' },
      { title: 'Pipeline Health Analytics', desc: 'Visual forecasting for commercial solar deals from initial lead to signed PPA.' }
    ],
    metric: '4.8x Pipeline Visibility'
  },
  {
    num: '05',
    title: 'Customer 360°',
    summary: 'A complete view. Personalized experiences. Loyal customers.',
    detail: 'Contracts, tickets, installs and usage fold into one picture. Support does not start from a blank page.',
    icon: ShieldCheck,
    accent: 'from-cyan-400 to-emerald-400',
    subPoints: [
      { title: 'Lifecycle Panoramic View', desc: 'Instantly bridge historical billing, live inverter production telemetry and active service tickets.' },
      { title: 'Proactive O&M Triggers', desc: 'Automated dispatch for maintenance before generation drops below efficiency thresholds.' },
      { title: 'Client Portal Integration', desc: 'Self-serve executive dashboards giving commercial clients real-time ESG and savings reports.' }
    ],
    metric: '99.8% Client Retention'
  }
];

export default function WorkflowPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const handleNext = () => {
    if (isExiting) return;
    setDirection('next');
    setIsExiting(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % PRODUCTS.length);
      setIsExiting(false);
    }, 500);
  };

  const handlePrev = () => {
    if (isExiting) return;
    setDirection('prev');
    setIsExiting(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
      setIsExiting(false);
    }, 500);
  };

  const current = PRODUCTS[activeIndex];
  const Icon = current.icon;


  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  });

  return (
    <div className="h-[100dvh] w-full overflow-hidden flex flex-col"
      style={{
        background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(34, 211, 238, 0.4), transparent 80%), linear-gradient(180deg, #020617 0%, #000000 100%)`
      }}
    >
      <Header />
      <div className="flex-1 bg-transparent text-slate-100 flex items-center justify-center relative">

        {/* Fixed Prev Button */}
        <button
          onClick={handlePrev}
          className="fixed left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-4 md:p-6 bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 rounded-full transition-all flex items-center justify-center group shadow-[0_0_20px_rgba(34,211,238,0.2)] backdrop-blur-md cursor-pointer"
          aria-label="Previous Module"
        >
          <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-cyan-300 group-hover:-translate-x-1.5 transition-transform" />
        </button>

        {/* Fixed Next Button */}
        <button
          onClick={handleNext}
          className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-4 md:p-6 bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 rounded-full transition-all flex items-center justify-center group shadow-[0_0_20px_rgba(34,211,238,0.2)] backdrop-blur-md cursor-pointer"
          aria-label="Next Module"
        >
          <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-cyan-300 group-hover:translate-x-1.5 transition-transform" />
        </button>

        <div className="w-[min(72rem,calc(100%-4rem))] mx-auto relative px-16 md:px-24">

          <div
            className={`transition-all duration-500 ease-in-out ${isExiting ? `opacity-0 scale-95 ${direction === 'next' ? '-translate-x-12' : 'translate-x-12'}` : 'opacity-100 translate-x-0 scale-100'}`}
          >
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">

              {/* Text Info Side */}
              <div>
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                  <div className={`p-1.5 rounded-full bg-gradient-to-r ${current.accent}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-bold tracking-widest uppercase text-slate-300">
                    Module {current.num}
                  </span>
                </div>

                <h1 className="text-[clamp(2rem,4vw,3.5rem)] font-semibold tracking-tight text-white mb-4 leading-[1.1]">
                  {current.title}
                </h1>

                <p className="text-lg md:text-xl text-cyan-100/90 mb-4 font-medium leading-[1.4]">
                  {current.summary}
                </p>

                <p className="text-slate-400 text-base leading-[1.6] mb-6">
                  {current.detail}
                </p>

                <div className="space-y-3">
                  {current.subPoints.map((point, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-[1rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-base mb-1">{point.title}</h3>
                        <p className="text-slate-400 text-sm leading-[1.6]">{point.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Graphic / Metric side */}
              <div className="relative mt-12 lg:mt-0">
                {/* Glowing backdrop */}
                <div className={`w-full aspect-square rounded-full bg-gradient-to-br ${current.accent} opacity-15 blur-[100px] absolute inset-0 m-auto`}></div>

                {/* Main Graphic Card */}
                <div className="relative bg-[#020617]/60 backdrop-blur-2xl border border-white/10 p-8 rounded-[2rem] shadow-2xl flex flex-col items-center justify-center text-center h-[40vh] min-h-[300px] hover:border-cyan-400/30 transition-colors duration-500 overflow-hidden">
                  {current.num === '01' ? (
                    <video
                      src="/videos/proposal_video.mp4"
                      autoPlay
                      loop

                      playsInline
                      className="absolute inset-0 w-full h-full object-contain rounded-[2rem]"
                    />
                  ) : current.num === '02' ? (
                    <video
                      src="/videos/installation_trecking.mp4"
                      autoPlay
                      loop

                      playsInline
                      className="absolute inset-0 w-full h-full object-contain rounded-[2rem]"
                    />
                  ) : current.num === '03' ? (
                    <video
                      src="/videos/structure_design.mp4"
                      autoPlay
                      loop

                      playsInline
                      className="absolute inset-0 w-full h-full object-contain rounded-[2rem]"
                    />
                  ) : current.num === '04' ? (
                    <video
                      src="/videos/CRM_demo_3.mp4"
                      autoPlay
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-contain rounded-[2rem]"
                    />
                  ) : current.num === '05' ? (
                    <video
                      src="/videos/customer_360_demo.mp4"
                      autoPlay
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-contain rounded-[2rem]"
                    />
                  ) : (
                    <>
                      <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${current.accent} p-0.5 mb-10`}>
                        <div className="w-full h-full bg-[#020617] rounded-[1.4rem] flex items-center justify-center">
                          <Icon className="w-14 h-14 text-white" />
                        </div>
                      </div>

                      <div className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                        {current.metric}
                      </div>

                      <div className="text-cyan-400 uppercase tracking-[0.2em] text-xs font-bold bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/20">
                        Key Metric
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}