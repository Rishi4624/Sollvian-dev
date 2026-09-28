import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Activity,
  Layers,
  Users,
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  BarChart3,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

const PRODUCTS = [
  {
    num: '01',
    title: 'Proposal & ROI',
    summary: 'Customized proposals for unique business needs, with the return made visible.',
    detail: 'We gather the site, the buyer, and the numbers that have to survive after the signature. The document that goes out is specific enough to build from.',
    icon: FileText,
    accent: 'from-cyan-400 to-blue-500',
    subPoints: [
      { title: 'Site Assessment & Shading Analysis', desc: 'Precise irradiance modeling and shadow simulation for accurate yield prediction.' },
      { title: 'Financial Modeling & Payback Horizon', desc: 'Real-time ROI calculation factoring in local tariffs, subsidies, and degradation curves.' },
      { title: 'Bespoke Proposal Generation', desc: 'One-click export of engineering-ready proposals customized for enterprise stakeholders.' }
    ],
    mockupType: 'roi',
    metric: '99.4% Forecast Accuracy'
  },
  {
    num: '02',
    title: 'Installation Tracking',
    summary: 'Real-time tracking for smooth and timely installations.',
    detail: 'Crews, sites, and blockers sit on one timeline. A slip is visible the morning it happens, not the week the customer asks.',
    icon: Activity,
    accent: 'from-emerald-400 to-teal-500',
    subPoints: [
      { title: 'Live Milestone Timeline', desc: 'Track permitting, delivery, staging, and commissioning across all active job sites.' },
      { title: 'Automated Blocker Alerts', desc: 'Instant notifications when material delays or labor bottlenecks threaten project velocity.' },
      { title: 'Field Crew Dispatch & Sync', desc: 'Mobile-first updates from site leads feeding directly into the central dashboard.' }
    ],
    mockupType: 'tracking',
    metric: '35% Faster Completion'
  },
  {
    num: '03',
    title: 'Structure Design',
    summary: 'Scalable solar structure design for every site.',
    detail: 'Each site gets a structure that fits the ground, the load, and the install plan — not a reused drawing from the last job.',
    icon: Layers,
    accent: 'from-amber-400 to-orange-500',
    subPoints: [
      { title: 'Structural Load Simulation', desc: 'Wind load and snow load stress testing configured for local geological standards.' },
      { title: 'Bill of Materials (BOM) Automation', desc: 'Instant generation of exact fastener counts, rail lengths, and racking requirements.' },
      { title: 'Ground & Rooftop Compatibility', desc: 'Seamless switching between ballasted flat roof, pitched roof, and ground-mount arrays.' }
    ],
    mockupType: 'structure',
    metric: '100% Engineering Compliance'
  },
  {
    num: '04',
    title: 'CRM',
    summary: 'Stronger relationships. Better engagement. Greater growth.',
    detail: 'Notes, next actions, and the last promise live together. The account view is what a person would say if you asked how the work is going.',
    icon: Users,
    accent: 'from-indigo-400 to-purple-500',
    subPoints: [
      { title: 'Unified Account Timeline', desc: 'All communications, proposals, site notes, and calls ordered in a single chronological stream.' },
      { title: 'Next-Action Reminders', desc: 'Never drop a follow-up with automated prompt triggers tied to project milestones.' },
      { title: 'Pipeline Health Analytics', desc: 'Visual forecasting for commercial solar deals from initial lead to signed PPA.' }
    ],
    mockupType: 'crm',
    metric: '4.8x Pipeline Visibility'
  },
  {
    num: '05',
    title: 'Customer 360°',
    summary: 'A complete view. Personalized experiences. Loyal customers.',
    detail: 'Contracts, tickets, installs, and usage fold into one picture. Support does not start from a blank page.',
    icon: ShieldCheck,
    accent: 'from-cyan-400 to-emerald-400',
    subPoints: [
      { title: 'Lifecycle Panoramic View', desc: 'Instantly bridge historical billing, live inverter production telemetry, and active service tickets.' },
      { title: 'Proactive O&M Triggers', desc: 'Automated dispatch for maintenance before generation drops below efficiency thresholds.' },
      { title: 'Client Portal Integration', desc: 'Self-serve executive dashboards giving commercial clients real-time ESG and savings reports.' }
    ],
    mockupType: 'customer360',
    metric: '99.8% Client Retention'
  }
];

export default function ProductModules() {
  const [activeModule, setActiveModule] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [lineCoordinates, setLineCoordinates] = useState({ startY: 50, endY: 50 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const detailCardRef = useRef<HTMLDivElement | null>(null);

  // Dynamically calculate precise vertical center offsets for the SVG connector with full responsiveness
  useEffect(() => {
    const updateCoordinates = () => {
      if (!containerRef.current || !cardRefs.current[activeModule] || !detailCardRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const cardRect = cardRefs.current[activeModule].getBoundingClientRect();
      const detailRect = detailCardRef.current.getBoundingClientRect();

      const cardCenterY = (cardRect.top + cardRect.height / 2) - containerRect.top;
      const detailCenterY = (detailRect.top + detailRect.height / 2) - containerRect.top;

      setLineCoordinates({
        startY: Math.max(10, cardCenterY),
        endY: Math.max(10, detailCenterY)
      });
    };

    updateCoordinates();
    window.addEventListener('resize', updateCoordinates);
    return () => window.removeEventListener('resize', updateCoordinates);
  }, [activeModule]);

  const handleSelectModule = (index: number) => {
    if (index !== activeModule) {
      setActiveModule(index);
      setAnimationKey(prev => prev + 1);
    }
  };

  const current = PRODUCTS[activeModule];
  const IconComponent = current.icon;

  return (
    <section 
      className="py-16 md:py-24 bg-transparent text-slate-100 min-h-screen relative overflow-hidden font-sans border-b border-white/5" 
      id="product"
    >

      {/* Fluid width container guaranteeing 100% screen adherence without overflow */}
      <div className="w-full max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-[0.22em] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Sollvian AI Tech Hub
          </div>
          <h2 className="text-[clamp(1.85rem,3.5vw,2.75rem)] tracking-[-0.03em] text-[#e8eef7] font-semibold leading-[1.15]">
            Five systems. One operating picture.
          </h2>
          <p className="mt-4 text-slate-300 text-base md:text-lg leading-[1.7]">
            The same five nodes from the Sollvian AI Tech hub, written so a buyer can actually use them—from initial proposal to lifetime asset management.
          </p>
        </div>

        {/* Interactive Layout Grid */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative w-full">

          {/* LEFT COLUMN: Module Cards List (Width: 5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 w-full">
            <div className="text-xs font-semibold tracking-wider uppercase text-slate-400 px-1 mb-1">
              Select Operating Module (Hover or Click)
            </div>

            {PRODUCTS.map((p, idx) => {
              const isActive = activeModule === idx;
              const ItemIcon = p.icon;
              return (
                <article
                  key={p.num}
                  ref={el => { cardRefs.current[idx] = el; }}
                  onClick={() => handleSelectModule(idx)}
                  onMouseEnter={() => handleSelectModule(idx)}
                  className={`group relative cursor-pointer rounded-[1rem] p-4 sm:p-5 transition-all duration-300 border w-full ${isActive
                      ? 'bg-[#0d1d3d] border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.15)] lg:translate-x-1.5'
                      : 'bg-[#0a1730]/80 border-white/5 hover:bg-[#0d1d3d]/60 hover:border-white/15'
                    }`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r shadow-[0_0_10px_#22d3ee]" />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors shrink-0 ${isActive ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/30' : 'bg-white/5 text-slate-400 group-hover:text-slate-200'
                        }`}>
                        <ItemIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold tracking-[0.16em] text-cyan-400/90">{p.num}</span>
                        </div>
                        <h3 className="text-base font-medium text-[#e8eef7] mt-0.5 group-hover:text-cyan-200 transition-colors">
                          {p.title}
                        </h3>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform shrink-0 ${isActive ? 'bg-cyan-400/20 text-cyan-300 translate-x-0' : 'text-slate-600 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'
                      }`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-slate-300/80 line-clamp-2 pl-0 sm:pl-[3.25rem]">
                    {p.summary}
                  </p>
                </article>
              );
            })}
          </div>

          {/* CENTER: Exact Computed SVG Connecting Line Graphic (Hidden on mobile/tablet) */}
          <div className="hidden lg:block lg:col-span-1 relative h-full pointer-events-none">
            <svg className="absolute top-0 left-0 w-full h-full overflow-visible" style={{ minHeight: '650px' }}>
              <path
                d={`M 0 ${lineCoordinates.startY} C 40 ${lineCoordinates.startY}, 40 ${lineCoordinates.endY}, 80 ${lineCoordinates.endY}`}
                stroke="url(#cyanGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-300 ease-out"
              />
              <defs>
                <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* RIGHT COLUMN: Detailed Breakdown & Animated Content (Width: 6 cols on lg) */}
          <div
            ref={detailCardRef}
            className="lg:col-span-6 bg-[#0a1730] border border-cyan-500/20 rounded-[1.25rem] p-5 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.4)] relative overflow-hidden w-full"
          >

            { }
            <div key={animationKey} className="animate-slide-in-right w-full">

              {/* Top Badge & Metric */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${current.accent} p-0.5 shadow-lg shrink-0`}>
                    <div className="w-full h-full bg-[#0a1730] rounded-[10px] flex items-center justify-center text-cyan-300">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <div className="text-xs uppercase font-mono tracking-widest text-cyan-400">Module {current.num}</div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#e8eef7]">{current.title}</h3>
                  </div>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5">
                  <BarChart3 className="w-3.5 h-3.5" />
                  {current.metric}
                </div>
              </div>

              {/* Overview Detail Paragraph */}
              <div className="mt-6">
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {current.detail}
                </p>
                <div className="inline-flex items-center gap-2 mt-3 py-1 px-3 rounded-full border border-cyan-400/35 bg-cyan-400/8 text-[11px] text-[#e8eef7]">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Linked directly from Hub stream {current.num}
                </div>
              </div>

              {/* Sub-Points Detailed List */}
              <div className="mt-8 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Key Workflow Sub-Points</h4>
                {current.subPoints.map((sp, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3.5 p-3.5 rounded-lg bg-[#070e1b]/60 border border-white/5 hover:border-cyan-500/30 transition-colors animate-fade-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-cyan-400/10 text-cyan-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-[#e8eef7]">{sp.title}</h5>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{sp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Simulated Live Visual Workflows / Diagrams per module */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase font-mono tracking-wider text-slate-400">Live Workflow Simulation</span>
                  <span className="text-[11px] text-cyan-400 font-mono animate-pulse">● Active Stream</span>
                </div>

                <div className="h-44 w-full rounded-xl bg-[#060b14] border border-white/10 p-4 relative overflow-hidden flex flex-col justify-between">

                  {current.mockupType === 'roi' && (
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                        <span>SITE_ID: SOL-8842-TX</span>
                        <span className="text-cyan-400 font-bold">IRRADIANCE: 5.8 kWh/m²</span>
                      </div>
                      <div className="flex items-end gap-2 sm:gap-3 h-20 px-2">
                        {[40, 65, 85, 100, 115, 135, 160].map((val, idx) => (
                          <div key={idx} className="flex-1 bg-gradient-to-t from-cyan-500/20 to-cyan-400 rounded-t transition-all duration-500 hover:brightness-125" style={{ height: `${val}%` }}>
                            <div className="text-[9px] text-center text-cyan-200 -top-4 relative font-mono hidden sm:block">Yr {idx + 1}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                        <span>Payback Period: 4.2 Years</span>
                        <span className="text-emerald-400 font-bold">Est. 25-Yr Savings: $1.42M</span>
                      </div>
                    </div>
                  )}

                  {current.mockupType === 'tracking' && (
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                        <span>PROJECT STAGING: COMMENCED</span>
                        <span className="text-emerald-400 font-bold">88% ON SCHEDULE</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Permitting & Interconnection</span>
                          <span className="text-emerald-400">Completed</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-400 h-full w-full rounded-full" />
                        </div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Racking & Panel Mounting</span>
                          <span className="text-cyan-400">In Progress (74%)</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                          <div className="bg-cyan-400 h-full w-3/4 rounded-full animate-pulse" />
                        </div>
                      </div>
                    </div>
                  )}

                  {current.mockupType === 'structure' && (
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                        <span>WIND STRESS: 120 MPH RATED</span>
                        <span className="text-amber-400 font-bold">TILT: 24° OPTIMAL</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 my-auto">
                        <div className="bg-white/5 p-2 rounded border border-white/10 text-center">
                          <div className="text-[10px] text-slate-400 font-mono">BALLAST</div>
                          <div className="text-xs font-bold text-[#e8eef7] mt-1">480 lbs/unit</div>
                        </div>
                        <div className="bg-white/5 p-2 rounded border border-white/10 text-center">
                          <div className="text-[10px] text-slate-400 font-mono">RAIL SPACING</div>
                          <div className="text-xs font-bold text-[#e8eef7] mt-1">1.82 meters</div>
                        </div>
                        <div className="bg-white/5 p-2 rounded border border-white/10 text-center">
                          <div className="text-[10px] text-slate-400 font-mono">SAFETY FACTOR</div>
                          <div className="text-xs font-bold text-emerald-400 mt-1">1.65 x</div>
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400 text-center font-mono">
                        Custom engineered for site topography without template waste.
                      </div>
                    </div>
                  )}

                  {current.mockupType === 'crm' && (
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                        <span>ACCOUNT: AUSTIN SOLAR CORP</span>
                        <span className="text-indigo-400 font-bold">STAGE: CONTRACT SIGNED</span>
                      </div>
                      <div className="space-y-2 py-1">
                        <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 p-2 rounded">
                          <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                          <span className="truncate">Call logged with VP of Operations regarding grid tie-in.</span>
                          <span className="text-[10px] text-slate-500 ml-auto shrink-0">2h ago</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 p-2 rounded">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                          <span className="truncate">Proposal v3 approved and countersigned.</span>
                          <span className="text-[10px] text-slate-500 ml-auto shrink-0">1d ago</span>
                        </div>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Next Promise: Site inspection kickoff</span>
                        <span className="text-cyan-400">Tomorrow, 09:00 AM</span>
                      </div>
                    </div>
                  )}

                  {current.mockupType === 'customer360' && (
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                        <span>FLEET HEALTH: 99.8% UPTIME</span>
                        <span className="text-emerald-400 font-bold">GENERATION: 1.4 MW</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 p-2.5 rounded border border-white/10">
                          <div className="text-[10px] text-slate-400 font-mono">ACTIVE TICKETS</div>
                          <div className="text-base font-bold text-cyan-300 mt-0.5">0 Open / 12 Resolved</div>
                        </div>
                        <div className="bg-white/5 p-2.5 rounded border border-white/10">
                          <div className="text-[10px] text-slate-400 font-mono">MAINTENANCE STATUS</div>
                          <div className="text-base font-bold text-emerald-400 mt-0.5">All Inverters Optimal</div>
                        </div>
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Client Portal Access: Active</span>
                        <span className="text-cyan-400 flex items-center gap-1">View Live Telemetry <ArrowUpRight className="w-3 h-3" /></span>
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Tailwind Keyframe Animations */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-up {
          animation: fadeUp 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}