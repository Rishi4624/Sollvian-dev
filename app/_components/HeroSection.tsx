'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import VersionBadge from '@/app/_components/VersionBadge';
import LoadingIndicator from '@/app/_components/LoadingIndicator';
import { ArrowRight, Play } from 'lucide-react';

const demoVideo = '/videos/sollvian-demo.mov';

interface HeroSectionProps {
  onDownload: () => void;
}

export default function HeroSection({ onDownload }: HeroSectionProps) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => { });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative pt-40 pb-24 overflow-hidden" id="home">
      {/* Decorative Background Blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a5a58d]/15 rounded-full blur-[100px] pointer-events-none -z-10" />
      
      <div className="w-[min(80rem,calc(100%-2rem))] mx-auto flex flex-col items-center text-center">
        
        {/* Top badge */}
        <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#a5a58d]/30 bg-[#f0ebe1]/50 text-[#6b705c] text-xs font-bold tracking-widest uppercase mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#6b705c] animate-pulse"></span>
            Smart Solar Infrastructure
          </span>
        </div>

        {/* Huge Typography */}
        <h1 className="animate-fade-up opacity-0 text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold tracking-[-0.04em] text-[#2c3327] leading-[1.05] max-w-5xl mb-8" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          Intelligent solutions for <span className="text-[#a5a58d] relative inline-block">modern solar<svg className="absolute -bottom-2 left-0 w-full h-3 text-[#a5a58d]/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="4" fill="none"/></svg></span> teams.
        </h1>

        <p className="animate-fade-up opacity-0 text-lg md:text-xl text-[#4a533a] max-w-2xl mb-10 leading-relaxed" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          Transform the journey from the first customer conversation into a complete long-term solar management system. Proposal, tracking, and CRM in one hub.
        </p>

        {/* Buttons */}
        <div className="animate-fade-up opacity-0 flex flex-wrap items-center justify-center gap-4 mb-16" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
          <Link href="#product" className="inline-flex items-center gap-2 h-14 px-8 rounded-full text-base font-bold bg-[#2c3327] text-white hover:bg-[#4a533a] hover:scale-105 transition-all duration-300 shadow-xl shadow-black/10 group">
            Explore Platform <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button onClick={onDownload} className="inline-flex items-center gap-2 h-14 px-8 rounded-full text-base font-bold bg-white text-[#2c3327] border border-black/10 hover:border-black/20 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md">
            <Play className="w-4 h-4 fill-[#a5a58d] text-[#a5a58d]" /> Watch Demo
          </button>
        </div>

        {/* Cinematic Video Player */}
        <div className="animate-fade-up opacity-0 w-full max-w-6xl mx-auto rounded-3xl p-2 bg-white/40 backdrop-blur-md border border-white/50 shadow-2xl" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <div className="relative w-full rounded-2xl overflow-hidden bg-black aspect-video shadow-inner">
            {!isVideoReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#2c3327]">
                <LoadingIndicator />
              </div>
            )}
            <video
              ref={videoRef}
              className="block w-full h-full object-cover scale-105"
              src={demoVideo}
              controls={false}
              playsInline
              autoPlay
              muted
              loop
              onCanPlay={() => setIsVideoReady(true)}
              style={{ opacity: isVideoReady ? 1 : 0, transition: 'opacity 1s ease' }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}