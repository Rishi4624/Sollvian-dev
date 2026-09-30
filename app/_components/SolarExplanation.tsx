
'use client';

import React from 'react';
import SolarHouseModel from '@/app/_components/SolarHouseModel';
import { Sun, Zap, Leaf, PiggyBank, BatteryCharging } from 'lucide-react';

export default function SolarExplanation() {
    return (
        <section className="py-20 md:py-32 relative overflow-hidden bg-transparent" id="how-solar-works">
            <div className="w-full max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Column: 3D Model */}
                    <div className="w-full h-full flex items-center justify-center relative order-1 lg:order-1">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-amber-500/10 rounded-3xl blur-2xl" />
                        <div className="relative w-full max-w-md mx-auto transform hover:scale-[1.02] transition-transform duration-500 ring-1 ring-white/10 rounded-2xl shadow-2xl">
                            <SolarHouseModel />
                        </div>
                    </div>

                    {/* Right Column: Text and Explanation */}
                    <div className="flex flex-col gap-6 order-2 lg:order-2">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-[0.22em] uppercase mb-4">
                                <Sun className="w-3.5 h-3.5" />
                                How It Works
                            </div>
                            <h2 className="text-[clamp(1.85rem,3.5vw,2.75rem)] tracking-[-0.03em] text-[#e8eef7] font-semibold leading-[1.15]">
                                Harnessing the Power of the Sun
                            </h2>
                            <p className="mt-4 text-slate-300 text-base md:text-lg leading-[1.7]">
                                Solar panels work by capturing sunlight and converting it directly into usable electricity.
                                When sunlight hits the photovoltaic (PV) cells in a solar panel, it knocks electrons loose from their atoms.
                                This movement of electrons generates a direct current (DC) of electricity. An inverter then converts
                                this DC electricity into alternating current (AC), which is the type of electricity used to power your
                                home and household appliances safely and efficiently.
                            </p>
                        </div>

                        <div className="mt-4">
                            <h3 className="text-xl font-semibold text-[#e8eef7] mb-4">Key Advantages of Solar Energy</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex gap-3 items-start p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/30 transition-colors">
                                    <PiggyBank className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-medium text-[#e8eef7]">Significant Cost Savings</h4>
                                        <p className="text-xs text-slate-400 mt-1">Drastically reduce or eliminate your monthly electricity bills by generating your own power.</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start p-4 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-400/30 transition-colors">
                                    <Leaf className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-medium text-[#e8eef7]">Environmentally Friendly</h4>
                                        <p className="text-xs text-slate-400 mt-1">Solar power is a 100% clean, renewable energy source that reduces greenhouse gas emissions.</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-400/30 transition-colors">
                                    <BatteryCharging className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-medium text-[#e8eef7]">Energy Independence</h4>
                                        <p className="text-xs text-slate-400 mt-1">Protect yourself from rising utility rates and unpredictable grid outages.</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-start p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400/30 transition-colors">
                                    <Zap className="w-6 h-6 text-purple-400 shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-medium text-[#e8eef7]">Low Maintenance</h4>
                                        <p className="text-xs text-slate-400 mt-1">Once installed, solar panels require very little maintenance and typically last for 25 to 30 years.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
