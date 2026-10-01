'use client';

import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import NewsSection from '@/app/_components/NewsSection';
import { Newspaper } from 'lucide-react';

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-[#f7f7f2]">
      <Header />

      {/* Page Hero */}
      <div className="pt-[76px] border-b border-[#203a30]/8">
        <div className="w-[min(82rem,calc(100%-2.5rem))] mx-auto py-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-6 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b6744]">
              <span className="h-px w-6 bg-[#8b6744]" /> Industry Updates
            </div>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-[#203a30] leading-[1.02] tracking-[-0.045em]">
              Solar energy,<br />
              <span className="italic font-serif text-[#8b6744]">this week.</span>
            </h1>
          </div>
          <p className="text-[#606b62] text-base max-w-sm leading-[1.8] md:text-right">
            Curated from across the global solar energy space — refreshed daily so your team stays informed.
          </p>
        </div>
      </div>

      <main className="pt-4 pb-24">
        <NewsSection />
      </main>

      <Footer />
    </div>
  );
}
