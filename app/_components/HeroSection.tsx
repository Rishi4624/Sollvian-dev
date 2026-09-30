'use client';

import Link from 'next/link';

import { useEffect, useState, useRef } from 'react';
import VersionBadge from '@/app/_components/VersionBadge';
import LoadingIndicator from '@/app/_components/LoadingIndicator';

const demoVideo = '/videos/sollvian-demo.mov';

interface HeroSectionProps {
  onDownload: () => void;
}

export default function HeroSection({ onDownload }: HeroSectionProps) {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Attempt to play on mount and observe visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => { });

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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section
        className="relative overflow-hidden pt-14 pb-20 border-b border-white/5 bg-transparent scroll-mt-28 lg:scroll-mt-24"
        id="home"
      >

        <div className="relative z-10 w-[min(72rem,calc(100%-2rem))] mx-auto grid gap-12 items-center lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="m-0 text-[12px] font-bold tracking-[0.22em] uppercase text-cyan-300/90">Smart solutions · Lasting impact</p>
            <h1 className="mt-4 mb-0 max-w-2xl text-[clamp(2rem,5vw,3rem)] tracking-[-0.03em] leading-[1.15] text-[#e8eef7]">Turning ideas into intelligent solutions</h1>
            <p className="mt-5 mb-0 max-w-2xl text-slate-300 leading-[1.7]">
              Sollvian AI Tech transforms the journey from the first customer conversation into a complete, long-term solar management system—covering Proposal & ROI, Installation Tracking, Solar Structure Design, CRM, and a comprehensive Customer 360.

            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link className="inline-flex items-center justify-center h-10 px-5 rounded-full border-0 text-sm font-medium cursor-pointer bg-cyan-500 text-[#041018] hover:bg-cyan-600 transition-colors no-underline" href="#product" id="hero-see-product">
                See the product
              </Link>
              <button
                className="inline-flex items-center justify-center h-10 px-5 rounded-full text-sm font-medium cursor-pointer border border-white/15 bg-white/5 text-white hover:bg-white/10 transition-colors"
                id="hero-download"
                type="button"
                onClick={onDownload}
              >
                Download package
              </button>
            </div>

            <VersionBadge />
          </div>

          <div className="overflow-hidden rounded-[1.2rem] bg-[linear-gradient(180deg,rgba(2,8,23,0.9),rgba(2,6,23,1))] border border-cyan-400/25 shadow-[0_0_80px_rgba(14,116,144,0.18)] min-h-[200px] flex items-center justify-center p-[0.9rem]">
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-400/15 bg-[#020817] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] h-full">
              {!isVideoReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                  <LoadingIndicator />
                </div>
              )}
              <video
                ref={videoRef}
                className="block w-full h-auto aspect-video object-cover bg-[#020617]"
                src={demoVideo}
                controls
                playsInline
                autoPlay
                muted
                loop
                preload="auto"
                onCanPlay={() => setIsVideoReady(true)}
                style={{ opacity: isVideoReady ? 1 : 0 }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}