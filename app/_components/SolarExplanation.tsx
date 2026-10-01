'use client';

import React from 'react';
import SolarHouseModel from '@/app/_components/SolarHouseModel';
import { Sun, Zap, Leaf, PiggyBank, BatteryCharging } from 'lucide-react';

export default function SolarExplanation() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#f0ebe1]" id="how-solar-works">
      <div className="w-[min(80rem,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#a5a58d]/30 bg-white text-[#6b705c] text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
            <Sun className="w-4 h-4" />
            How It Works
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight text-[#2c3327] leading-[1.1] max-w-4xl mx-auto mb-6">
            Harnessing the power of the sun.
          </h2>
          <p className="text-[#4a533a] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Solar panels capture sunlight and convert it directly into usable electricity, giving you clean, renewable energy to power your home or business effortlessly.
          </p>
        </div>

        {/* 3D Model Showcase */}
        <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[500px] bg-white rounded-3xl shadow-xl border border-black/5 flex items-center justify-center overflow-hidden mb-16">
          <div className="absolute inset-0 bg-[#fdfdfc]" />
          <div className="relative w-full h-full transform hover:scale-[1.02] transition-transform duration-700">
             <SolarHouseModel />
          </div>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-[#f0ebe1] rounded-xl flex items-center justify-center mb-4">
              <PiggyBank className="w-6 h-6 text-[#6b705c]" />
            </div>
            <h4 className="text-lg font-bold text-[#2c3327] mb-2">Cost Savings</h4>
            <p className="text-[#4a533a] text-sm leading-relaxed">Drastically reduce or eliminate your monthly electricity bills by generating your own power.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-[#f0ebe1] rounded-xl flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 text-[#6b705c]" />
            </div>
            <h4 className="text-lg font-bold text-[#2c3327] mb-2">Environment Friendly</h4>
            <p className="text-[#4a533a] text-sm leading-relaxed">A 100% clean, renewable energy source that dramatically reduces greenhouse gas emissions.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-[#f0ebe1] rounded-xl flex items-center justify-center mb-4">
              <BatteryCharging className="w-6 h-6 text-[#6b705c]" />
            </div>
            <h4 className="text-lg font-bold text-[#2c3327] mb-2">Energy Independence</h4>
            <p className="text-[#4a533a] text-sm leading-relaxed">Protect yourself from rising utility rates and unpredictable grid outages permanently.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-[#f0ebe1] rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-[#6b705c]" />
            </div>
            <h4 className="text-lg font-bold text-[#2c3327] mb-2">Low Maintenance</h4>
            <p className="text-[#4a533a] text-sm leading-relaxed">Once installed, solar panels require minimal maintenance and typically last for 25 to 30 years.</p>
          </div>

        </div>

      </div>
    </section>
  );
}
