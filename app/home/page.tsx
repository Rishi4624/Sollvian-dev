'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/_components/Header';
import NewsSection from '@/app/_components/NewsSection';
import HeroSection from '@/app/_components/HeroSection';
import ProductSection from '@/app/_components/ProductSection';
import ContactSection from '@/app/_components/ContactSection';
import Footer from '@/app/_components/Footer';
import EmailModal from '@/app/_components/EmailModal';
// import SolarExplanation from '../_components/SolarExplanation';
import TeamSection from '@/app/_components/TeamSection';
import SplashScreen from '@/app/_components/SplashScreen';


export default function Page() {
    const [modalOpen, setModalOpen] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    return (
        <>
            <div
                className="fixed inset-0 pointer-events-none z-[-1]"
                style={{
                    background: `linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)`
                }}
            />
            {isInitialLoading && <SplashScreen onFinish={() => setIsInitialLoading(false)} />}

            <Header />

            <main>
                <HeroSection onDownload={() => setModalOpen(true)} />
                {/* <SolarExplanation /> */}
                <ProductSection />
                <NewsSection />
                <TeamSection />
                <ContactSection />
            </main>

            <Footer />

            {modalOpen && <EmailModal onClose={() => setModalOpen(false)} />}
        </>
    );
}