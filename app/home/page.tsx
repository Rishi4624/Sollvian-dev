'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/_components/Header';
import NewsMarquee from '@/app/_components/NewsMarquee';
import HeroSection from '@/app/_components/HeroSection';
import ProductSection from '@/app/_components/ProductSection';
import ContactSection from '@/app/_components/ContactSection';
import Footer from '@/app/_components/Footer';
import EmailModal from '@/app/_components/EmailModal';
import SplashScreen from '@/app/_components/SplashScreen';


export default function Page() {
    const [modalOpen, setModalOpen] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    });

    return (
        <>
            <div
                className="fixed inset-0 pointer-events-none z-[-1] transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(34, 211, 238, 0.4), transparent 80%), linear-gradient(180deg, #020617 0%, #000000 100%)`
                }}
            />
            {isInitialLoading && <SplashScreen onFinish={() => setIsInitialLoading(false)} />}

            <Header />
            <NewsMarquee />

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