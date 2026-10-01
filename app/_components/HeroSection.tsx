
'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import LoadingIndicator from '@/app/_components/LoadingIndicator';
import { ArrowRight, Play, Sparkles } from 'lucide-react';

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
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#F8FAFC] pt-36 pb-28"
    >
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Main atmospheric glow */}
        <div className="absolute left-1/2 top-[-180px] h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-orange-400/[0.08] blur-[130px]" />

        {/* Blue secondary glow */}
        <div className="absolute right-[-180px] top-[25%] h-[500px] w-[500px] rounded-full bg-blue-500/[0.07] blur-[120px]" />

        {/* Left cyan glow */}
        <div className="absolute left-[-200px] top-[55%] h-[450px] w-[450px] rounded-full bg-cyan-400/[0.05] blur-[110px]" />

        {/* Professional grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0F172A 1px, transparent 1px),
              linear-gradient(to bottom, #0F172A 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
          }}
        />

        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
      </div>

      <div className="mx-auto flex w-[min(80rem,calc(100%-2rem))] flex-col items-center text-center">

        {/* ================= BADGE ================= */}
        <div
          className="animate-fade-up opacity-0"
          style={{
            animationDelay: '0.1s',
            animationFillMode: 'forwards',
          }}
        >
          <span className="mb-9 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700 shadow-sm backdrop-blur-xl">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-50">
              <Sparkles
                className="h-3 w-3 text-orange-500"
                strokeWidth={2.5}
              />
            </span>

            Smart Solar Infrastructure
          </span>
        </div>

        {/* ================= HEADLINE ================= */}
        <h1
          className="animate-fade-up mb-7 max-w-5xl text-[clamp(2.7rem,6.5vw,5.4rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-[#0F172A] opacity-0"
          style={{
            animationDelay: '0.2s',
            animationFillMode: 'forwards',
          }}
        >
          Powering smarter{' '}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#F59E0B] bg-clip-text text-transparent">
              solar
            </span>

            {/* Accent underline */}
            <span className="absolute -bottom-1 left-0 h-[5px] w-full rounded-full bg-gradient-to-r from-orange-500/50 to-amber-400/20 blur-[1px]" />
          </span>{' '}
          businesses.
        </h1>

        {/* ================= SUBHEADLINE ================= */}
        <p
          className="animate-fade-up mb-11 max-w-2xl text-base font-medium leading-7 tracking-[-0.01em] text-slate-600 md:text-lg"
          style={{
            animationDelay: '0.3s',
            animationFillMode: 'forwards',
          }}
        >
          From the first customer conversation to long-term operations,
          manage your solar business with one intelligent platform for
          proposals, installations, structure design, CRM, and customer
          insights.
        </p>

        {/* ================= CTA ================= */}
        <div
          className="animate-fade-up mb-20 flex flex-wrap items-center justify-center gap-3 opacity-0"
          style={{
            animationDelay: '0.4s',
            animationFillMode: 'forwards',
          }}
        >
          {/* Primary CTA */}
          <Link
            href="#product"
            className="group inline-flex h-[54px] items-center gap-2.5 rounded-xl bg-[#0F172A] px-7 text-[14px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1E293B] hover:shadow-[0_14px_35px_-10px_rgba(15,23,42,0.55)]"
          >
            Explore Platform

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          {/* Secondary CTA */}
          <button
            onClick={onDownload}
            className="group inline-flex h-[54px] items-center gap-3 rounded-xl border border-slate-200 bg-white px-7 text-[14px] font-semibold text-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-orange-500 transition-colors group-hover:bg-orange-100">
              <Play className="h-3.5 w-3.5 fill-current" />
            </span>

            Watch Demo
          </button>
        </div>

        {/* ================= VIDEO ================= */}
        <div
          className="animate-fade-up w-full max-w-6xl opacity-0"
          style={{
            animationDelay: '0.5s',
            animationFillMode: 'forwards',
          }}
        >
          {/* Outer frame */}
          <div className="relative rounded-[28px] border border-slate-200/80 bg-white p-2 shadow-[0_35px_80px_-25px_rgba(15,23,42,0.28)]">

            {/* Top browser-style bar */}
            <div className="flex h-9 items-center justify-between px-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              </div>

              <div className="hidden items-center gap-2 rounded-md bg-slate-50 px-3 py-1 text-[10px] font-medium text-slate-400 sm:flex">
                Sollvian AI Tech
              </div>

              <div className="w-12" />
            </div>

            {/* Video container */}
            <div className="relative aspect-video w-full overflow-hidden rounded-[20px] bg-[#020617]">

              {/* Cinematic overlay */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-white/[0.03]" />

              {/* Loading */}
              {!isVideoReady && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#020617]">
                  <LoadingIndicator />
                </div>
              )}

              <video
                ref={videoRef}
                className="block h-full w-full object-cover"
                src={demoVideo}
                controls={false}
                playsInline
                autoPlay
                muted
                loop
                preload="metadata"
                onCanPlay={() => setIsVideoReady(true)}
                style={{
                  opacity: isVideoReady ? 1 : 0,
                  transition:
                    'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            </div>
          </div>

          {/* Ground shadow */}
          <div className="mx-auto mt-7 h-8 w-[65%] max-w-3xl rounded-full bg-slate-900/[0.06] blur-2xl" />

          {/* Small supporting text */}
          <div className="mt-5 flex items-center justify-center gap-2 text-[11px] font-medium tracking-wide text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            One platform. Complete solar operations.
          </div>
        </div>
      </div>
    </section>
  );
}

