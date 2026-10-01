'use client';

import React from 'react';
import { Link, Mail, Globe } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: "Alex Sterling",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80",
    bio: "Visionary leader driving Sollvian's mission to revolutionize the solar industry with AI-driven workflows.",
  },
  {
    name: "Jordan Lee",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80",
    bio: "Architect behind our high-performance infrastructure, ensuring our 3D models and calculations are flawless.",
  },
  {
    name: "Samantha Reyes",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80",
    bio: "Bridging the gap between installer needs and engineering output to deliver a perfectly tailored platform.",
  },
  {
    name: "David Chen",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=80",
    bio: "Full-stack expert obsessing over performance, smooth animations, and pixel-perfect user interfaces.",
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&h=400&fit=crop&q=80",
    bio: "Scaling our customer success and daily operations to ensure our partners always have what they need.",
  }
];

export default function TeamSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-white border-t border-slate-100" id="team">
      <div className="w-[min(80rem,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            Our Team
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
            The minds behind Sollvian.
          </h2>
          <p className="mt-4 text-slate-600 text-lg md:text-xl leading-relaxed font-medium">
            Meet the engineers, designers, and visionaries dedicated to making solar management intelligent, automated, and effortless.
          </p>
        </div>

        {/* Clean Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <div 
              key={idx} 
              className="group bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-300 transition-all duration-300 hover:-translate-y-2 flex flex-col"
            >
              {/* Header: Avatar + Info */}
              <div className="flex items-center gap-5 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-50 shadow-inner group-hover:border-blue-100 transition-colors">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                  <p className="text-sm font-bold tracking-wide uppercase text-blue-600 mt-1">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Bio */}
              <p className="text-slate-600 text-base leading-relaxed flex-1 mb-8 font-medium">
                {member.bio}
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-3 pt-6 border-t border-slate-100 mt-auto">
                <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  <Link className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  <Mail className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  <Globe className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
