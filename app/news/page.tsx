'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import NewsSection from '@/app/_components/NewsSection';

export default function NewsPage() {
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <div
                className="fixed inset-0 pointer-events-none z-[-1] transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle 600px at ${mousePos.x}px ${mousePos.y}px, rgba(34, 211, 238, 0.4), transparent 80%), linear-gradient(180deg, #020617 0%, #000000 100%)`
                }}
            />
            
            <Header />

            <main className="min-h-screen pt-12">
                <NewsSection />
            </main>

            <Footer />
        </>
    );
}
