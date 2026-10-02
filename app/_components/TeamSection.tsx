'use client';

import Image from 'next/image';
import React from 'react';
import { Mail, Globe, Link } from 'lucide-react';

const TEAM_MEMBERS = [
  { name: 'Alex Sterling', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80', bio: "Visionary leader driving Sollvian's mission to revolutionize the solar industry with AI-driven workflows." },
  { name: 'Jordan Lee', role: 'CTO', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80', bio: 'Architect behind our high-performance infrastructure and 3D calculation engine.' },
  { name: 'Samantha Reyes', role: 'Product Manager', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80', bio: 'Bridges installer needs and engineering output for a perfectly tailored platform.' },
  { name: 'David Chen', role: 'Lead Developer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80', bio: 'Full-stack expert obsessing over performance and pixel-perfect interfaces.' },
  { name: 'Elena Rodriguez', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop&q=80', bio: 'Scaling customer success to ensure our partners always have what they need.' },
];

export default function TeamSection() {
  return (
    <section className="border-t border-[#203a30]/10 bg-[#fffefa] py-24 md:py-32" id="team">
      <div className="mx-auto w-[min(82rem,calc(100%-2.5rem))]">

        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b6744]">The people</p>
            <h2 className="font-serif text-[clamp(2.6rem,4.5vw,4rem)] leading-[1.02] text-[#203a30]">
              Good work takes<br />a good team.
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-7 text-[#657066]">
            Engineers, designers, and operators working to make solar management more intelligent and effortless.
          </p>
        </div>

        {/* Grid of cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((m, i) => (
            <div
              key={i}
              className="group relative flex flex-col overflow-hidden border border-[#203a30]/10 bg-[#f7f7f2] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#829578]/50 hover:shadow-[0_18px_45px_-32px_rgba(31,58,48,0.55)] sm:p-7"
            >
              <div className="flex items-center gap-4 mb-5 relative z-10">
                <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-full border border-[#203a30]/10 bg-[#e6e9e1]">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="60px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold leading-tight text-[#2c4437]">{m.name}</h3>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8b6744]">{m.role}</p>
                </div>
              </div>

              <p className="relative z-10 mb-6 flex-1 text-[13px] leading-[1.8] text-[#6d786f]">{m.bio}</p>

              <div className="relative z-10 flex gap-2 border-t border-[#203a30]/10 pt-4">
                {[Link, Mail, Globe].map((Icon, j) => (
                  <button
                    key={j}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#203a30]/10 bg-white text-[#71806f] transition-colors hover:border-[#8b6744]/30 hover:text-[#8b6744]"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
