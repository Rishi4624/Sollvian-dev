'use client';

import React from 'react';
import { Link, Mail, Globe, Users, ArrowRight } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: "Alex Sterling",
    role: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80",
    bio: "Visionary leader driving Sollvian's mission to revolutionize the solar industry with AI-driven workflows.",
    accent: "group-hover:border-cyan-400/40 group-hover:shadow-[0_8px_30px_rgba(34,211,238,0.12)]",
    textAccent: "text-cyan-400",
    bgAccent: "bg-cyan-400"
  },
  {
    name: "Jordan Lee",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
    bio: "Architect behind our high-performance infrastructure, ensuring our 3D models and calculations are flawless.",
    accent: "group-hover:border-emerald-400/40 group-hover:shadow-[0_8px_30px_rgba(52,211,153,0.12)]",
    textAccent: "text-emerald-400",
    bgAccent: "bg-emerald-400"
  },
  {
    name: "Samantha Reyes",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80",
    bio: "Bridging the gap between installer needs and engineering output to deliver a perfectly tailored platform.",
    accent: "group-hover:border-amber-400/40 group-hover:shadow-[0_8px_30px_rgba(251,191,36,0.12)]",
    textAccent: "text-amber-400",
    bgAccent: "bg-amber-400"
  },
  {
    name: "David Chen",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
    bio: "Full-stack expert obsessing over performance, smooth animations, and pixel-perfect user interfaces.",
    accent: "group-hover:border-purple-400/40 group-hover:shadow-[0_8px_30px_rgba(192,132,252,0.12)]",
    textAccent: "text-purple-400",
    bgAccent: "bg-purple-400"
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop&q=80",
    bio: "Scaling our customer success and daily operations to ensure our partners always have what they need.",
    accent: "group-hover:border-blue-400/40 group-hover:shadow-[0_8px_30px_rgba(96,165,250,0.12)]",
    textAccent: "text-blue-400",
    bgAccent: "bg-blue-400"
  }
];

export default function TeamSection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-transparent border-b border-white/5" id="team">
      <div className="w-full max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 max-w-[88rem] mx-auto">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-400/10 border border-indigo-400/30 text-indigo-300 text-xs font-bold tracking-[0.22em] uppercase mb-4">
              <Users className="w-3.5 h-3.5" />
              Our Team
            </div>
            <h2 className="text-[clamp(1.85rem,3.5vw,2.75rem)] tracking-[-0.03em] text-[#e8eef7] font-semibold leading-[1.15]">
              The minds behind Sollvian AI
            </h2>
            <p className="mt-4 text-slate-300 text-base md:text-lg leading-[1.7]">
              Meet the engineers, designers, and visionaries dedicated to making solar management intelligent, automated, and effortless.
            </p>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-400 font-medium tracking-wide">
            Scroll to explore <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Horizontal Scrolling Container */}
        <div className="flex overflow-x-auto gap-6 lg:gap-8 pb-12 pt-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {TEAM_MEMBERS.map((member, idx) => (
            <div 
              key={idx} 
              className={`group relative flex flex-col bg-[#0a1730]/90 backdrop-blur-md border border-white/10 rounded-[1.5rem] w-[300px] sm:w-[340px] shrink-0 snap-start transition-all duration-500 hover:-translate-y-2 ${member.accent}`}
            >
              {/* Subtle top gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 opacity-50 group-hover:opacity-100 transition-opacity rounded-t-[1.5rem] ${member.bgAccent}`} />

              <div className="p-8 flex flex-col flex-1">
                {/* Avatar */}
                <div className="mb-6 relative w-24 h-24 rounded-full p-1 border border-white/10 group-hover:border-white/30 transition-colors">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  />
                  <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#0a1730] ${member.bgAccent}`} />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-[#e8eef7] mb-1">{member.name}</h3>
                  <p className={`text-xs font-bold tracking-[0.1em] uppercase mb-5 ${member.textAccent}`}>
                    {member.role}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed flex-1">
                    {member.bio}
                  </p>
                </div>
                
                {/* Social Links */}
                <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/5">
                  <button className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                    <Link className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all">
                    <Globe className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
