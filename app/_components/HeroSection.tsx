'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import LoadingIndicator from '@/app/_components/LoadingIndicator';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';

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
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => { });
        else video.pause();
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative flex min-h-[calc(100svh-76px)] items-center overflow-hidden bg-[#f7f7f2] pt-[76px]" id="home">
      <div className="absolute inset-y-0 right-0 hidden w-[44%] bg-[#e8ece3] lg:block" />
      <div className="absolute right-[6%] top-28 hidden h-[360px] w-[360px] rounded-full border border-[#244337]/[0.08] lg:block" />

      <div className="relative z-10 mx-auto grid w-[min(82rem,calc(100%-2.5rem))] items-center gap-14 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:py-20">
        <div className="animate-fade-up">
          <div className="mb-7 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b6744]">
            <span className="h-px w-8 bg-[#ad8057]" />
            Solar operations, made clear
          </div>

          <h1 className="mb-7 max-w-[660px] font-serif text-[clamp(3.3rem,6vw,5.8rem)] leading-[0.99] text-[#203a30]">
            Better workdays <span className="italic text-[#8b6744]">start</span> with better systems.
          </h1>

          <p className="mb-8 max-w-[540px] text-[16px] leading-[1.8] text-[#606b62] md:text-[17px]">
            Sollvian Suite is an all-in-one solar business management platform built by Sollvian AI Tech Pvt Ltd. It is designed for solar installation companies to manage their entire business workflow from creating a customer proposal, tracking installation, designing mounting structures, all the way to post-installation CRM support.
          </p>

          <ul className="mb-9 grid gap-3 sm:grid-cols-2">
            {['Automated proposals', 'Live project tracking', 'Integrated CRM', 'Customer 360°'].map((feature) => (
              <li key={feature} className="flex items-center gap-2.5 text-[13px] font-medium text-[#3b5145]">
                <CheckCircle className="h-4 w-4 shrink-0 text-[#71866b]" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/workflow"
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-[#244337] px-6 text-[13px] font-bold text-[#ffffff] transition-colors hover:bg-[#315844]"
              style={{ color: '#fff' }}
            >
              Explore the platform
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              onClick={onDownload}
              className="inline-flex h-12 items-center gap-2.5 rounded-full border border-[#244337]/20 px-5 text-[13px] font-semibold text-[#244337] transition-colors hover:bg-white"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Watch the demo
            </button>
          </div>

          <div className="mt-12 flex items-center gap-4 border-t border-[#203a30]/10 pt-5">
            <span className="font-serif text-3xl text-[#244337]">01</span>
            <p className="max-w-[210px] text-[11px] leading-relaxed text-[#6b756d]">A single source of truth for your entire solar operation.</p>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[680px] -translate-y-40 animate-fade-up lg:pl-5">
          <div className="absolute -left-3 top-12 z-10 hidden w-[142px] border border-[#244337]/10 bg-[#f7f7f2] p-4 shadow-[0_12px_40px_-28px_rgba(31,58,48,0.5)] sm:block">
            <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-[#8b6744]">Built for solar</span>
            <span className="mt-2 block font-serif text-[17px] leading-tight text-[#244337]">From lead to live site</span>
          </div>
          <div className="overflow-hidden border border-[#203a30]/10 bg-white p-2 shadow-[0_28px_70px_-42px_rgba(31,58,48,0.55)] sm:p-3">
            <div className="flex h-10 items-center gap-2 border-b border-[#203a30]/10 px-2 sm:px-3">
              <span className="h-2 w-2 rounded-full bg-[#b96f54]" />
              <span className="h-2 w-2 rounded-full bg-[#d3b16e]" />
              <span className="h-2 w-2 rounded-full bg-[#829b78]" />
              <span className="ml-2 flex-1 truncate rounded-sm bg-[#f3f4ef] px-3 py-1 text-center font-mono text-[9px] text-[#879087]">sollvian.com / workspace</span>
            </div>
            <div className="relative aspect-video overflow-hidden bg-[#e8ece3]">
              {!isVideoReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#e8ece3]">
                  <LoadingIndicator />
                </div>
              )}
              <video
                ref={videoRef}
                className="h-full w-full object-contain"
                src={demoVideo}
                playsInline autoPlay controls loop preload="metadata"
                onCanPlay={() => setIsVideoReady(true)}
                style={{ opacity: isVideoReady ? 1 : 0, transition: 'opacity 1.2s ease' }}
              />
            </div>
          </div>
          <p className="mt-4 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-[#7b857b]">One platform. Complete solar operations.</p>
        </div>
      </div>
    </section>
  );
}
