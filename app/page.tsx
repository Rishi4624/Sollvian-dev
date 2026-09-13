'use client';

import { useState } from 'react';
import Header          from '@/app/_components/Header';
import HeroSection     from '@/app/_components/HeroSection';
import ProductSection  from '@/app/_components/ProductSection';
import ContactSection  from '@/app/_components/ContactSection';
import Footer          from '@/app/_components/Footer';
import EmailModal      from '@/app/_components/EmailModal';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header />

      <main>
        <HeroSection onDownload={() => setModalOpen(true)} />
        <ProductSection />
        <ContactSection />
      </main>

      <Footer />

      {modalOpen && <EmailModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
