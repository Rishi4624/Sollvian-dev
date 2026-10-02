'use client';

import { useState } from 'react';
import Header from '@/app/_components/Header';
import NewsSection from '@/app/_components/NewsSection';
import HeroSection from '@/app/_components/HeroSection';
import ProductSection from '@/app/_components/ProductSection';
import ContactSection from '@/app/_components/ContactSection';
import Footer from '@/app/_components/Footer';
import EmailModal from '@/app/_components/EmailModal';
import TeamSection from '@/app/_components/TeamSection';
import SplashScreen from '@/app/_components/SplashScreen';

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#f7f7f2] text-[#203a30]">
      {isInitialLoading && <SplashScreen onFinish={() => setIsInitialLoading(false)} />}
      <Header />
      <main>
        <HeroSection onDownload={() => setModalOpen(true)} />
        <ProductSection />
        <NewsSection />
        {/* <TeamSection /> */}
        <ContactSection />
      </main>
      <Footer />
      {modalOpen && <EmailModal onClose={() => setModalOpen(false)} />}
    </div>
  );
}