// 'use client';

// import React from 'react';
// import SolarHouseModel from '@/app/_components/SolarHouseModel';
// import { Sun, Zap, Leaf, PiggyBank, BatteryCharging } from 'lucide-react';

// export default function SolarExplanation() {
//   return (
//     <section className="py-24 relative overflow-hidden bg-white border-t border-slate-100" id="how-solar-works">
//       <div className="w-[min(80rem,calc(100%-2rem))] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

//         <div className="mb-16">
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
//             <Sun className="w-4 h-4" />
//             How It Works
//           </div>
//           <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight text-slate-900 leading-[1.1] max-w-4xl mx-auto mb-6">
//             Harnessing the power of the sun.
//           </h2>
//           <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
//             Solar panels capture sunlight and convert it directly into usable electricity, giving you clean, renewable energy to power your home or business effortlessly.
//           </p>
//         </div>

//         {/* 3D Model Showcase */}
//         <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[500px] bg-slate-50 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-200 flex items-center justify-center overflow-hidden mb-16">
//           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-slate-50 to-slate-50" />
//           <div className="relative w-full h-full transform hover:scale-[1.02] transition-transform duration-700">
//              <SolarHouseModel />
//           </div>
//         </div>

//         {/* Advantages Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          
//           <div className="bg-white p-8 rounded-[2rem] shadow-sm shadow-slate-200/50 border border-slate-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
//             <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
//               <PiggyBank className="w-7 h-7 text-blue-600" />
//             </div>
//             <h4 className="text-xl font-bold text-slate-900 mb-3">Cost Savings</h4>
//             <p className="text-slate-600 text-sm leading-relaxed font-medium">Drastically reduce or eliminate your monthly electricity bills by generating your own power.</p>
//           </div>

//           <div className="bg-white p-8 rounded-[2rem] shadow-sm shadow-slate-200/50 border border-slate-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
//             <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
//               <Leaf className="w-7 h-7 text-blue-600" />
//             </div>
//             <h4 className="text-xl font-bold text-slate-900 mb-3">Environment Friendly</h4>
//             <p className="text-slate-600 text-sm leading-relaxed font-medium">A 100% clean, renewable energy source that dramatically reduces greenhouse gas emissions.</p>
//           </div>

//           <div className="bg-white p-8 rounded-[2rem] shadow-sm shadow-slate-200/50 border border-slate-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
//             <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
//               <BatteryCharging className="w-7 h-7 text-blue-600" />
//             </div>
//             <h4 className="text-xl font-bold text-slate-900 mb-3">Energy Independence</h4>
//             <p className="text-slate-600 text-sm leading-relaxed font-medium">Protect yourself from rising utility rates and unpredictable grid outages permanently.</p>
//           </div>

//           <div className="bg-white p-8 rounded-[2rem] shadow-sm shadow-slate-200/50 border border-slate-200 hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 transition-all duration-300">
//             <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
//               <Zap className="w-7 h-7 text-blue-600" />
//             </div>
//             <h4 className="text-xl font-bold text-slate-900 mb-3">Low Maintenance</h4>
//             <p className="text-slate-600 text-sm leading-relaxed font-medium">Once installed, solar panels require minimal maintenance and typically last for 25 to 30 years.</p>
//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }
