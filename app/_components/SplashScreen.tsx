'use client';
import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [stage, setStage] = useState<'opening' | 'playing' | 'closing'>('opening');

  useEffect(() => {
    // The opening animation takes 1.2s. 
    // We allow the video to play, and switch state to 'playing' just to be clean.
    const timer = setTimeout(() => {
      setStage('playing');
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    setStage('closing');
    // Wait for the closing animation to finish (1.2s) before unmounting
    setTimeout(() => {
      onFinish();
    }, 1200);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#050d1b]/70 backdrop-blur-xl transition-opacity duration-1000 ${stage === 'closing' ? 'opacity-0' : 'opacity-100'}`}>
      <div
        className={`relative w-64 h-64 sm:w-80 sm:h-80 shadow-2xl ${stage === 'opening' ? 'animate-circle-open' :
          stage === 'closing' ? 'animate-circle-close' : ''
          }`}
        style={stage === 'playing' ? { clipPath: 'circle(150% at 50% 50%)' } : {}}
      >
        <video
          src="/videos/Animated_logo.mp4"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="w-full h-full object-contain bg-black rounded-[2rem]"
        />
      </div>
    </div>
  );
}
