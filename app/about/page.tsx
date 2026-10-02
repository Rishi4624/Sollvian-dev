import Image from 'next/image';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import { Target, Lightbulb, ShieldCheck, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        
        {/* Hero Section */}
        <section className="relative px-6 py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.15),transparent_50%)]" />
          <div className="max-w-[72rem] mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-[0.22em] uppercase mb-6">
              Our Mission
            </div>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-semibold tracking-tight text-[#e8eef7] leading-[1.1] mb-6">
              Empowering the transition to <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">intelligent solar energy.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              At Sollvian AI Tech, we build software that turns complex solar workflows into seamless, automated experiences—from initial proposals to lifetime asset management.
            </p>
          </div>
        </section>

        {/* Our Story / Vision Section */}
        <section className="px-6 py-20 relative border-t border-white/5">
          <div className="max-w-[72rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(34,211,238,0.1)] relative group">
                <Image
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop"
                  alt="Solar panels at sunset"
                  fill
                  sizes="(max-width: 1024px) 100vw, 36rem"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
              </div>
            </div>
            
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#e8eef7] tracking-tight">
                Built for builders, <br /> engineered for scale.
              </h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  The solar industry is growing faster than ever, but the software running it has lagged behind. Installers and providers often find themselves juggling disjointed CRMs, clunky design tools, and manual tracking spreadsheets. 
                </p>
                <p>
                  We started Sollvian AI Tech to fix that. We believe that if we want to accelerate global solar adoption, the people building the infrastructure need tools that are fast, intuitive, and remarkably intelligent.
                </p>
                <p>
                  Today, our platform unifies Proposals, Installation Tracking, Structural Design, and CRM into one powerful hub—giving you a 360° view of every customer and every project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="px-6 py-24 relative border-t border-white/5 bg-[#040b1a]">
          <div className="max-w-[72rem] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-[#e8eef7] tracking-tight mb-4">
                Our Core Values
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                The principles that guide how we build our products and support our customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Value 1 */}
              <div className="bg-[#0a1730] border border-white/5 rounded-2xl p-8 hover:border-cyan-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-cyan-400/10 text-cyan-400 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium text-[#e8eef7] mb-3">Precision & Accuracy</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Whether it&apos;s ROI modeling or structural load testing, we know our math has to survive the real world. We engineer our tools for flawless precision.
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-[#0a1730] border border-white/5 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-6">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium text-[#e8eef7] mb-3">Intelligent Automation</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Software shouldn&apos;t just record data; it should work for you. We leverage AI to automate blockers, dispatch crews, and predict yields effortlessly.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-[#0a1730] border border-white/5 rounded-2xl p-8 hover:border-amber-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium text-[#e8eef7] mb-3">Long-Term Trust</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  Solar is a decades-long commitment for your customers. We build our platform to provide you with the stability needed to honor that commitment.
                </p>
              </div>

              {/* Value 4 */}
              <div className="bg-[#0a1730] border border-white/5 rounded-2xl p-8 hover:border-purple-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-purple-400/10 text-purple-400 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-medium text-[#e8eef7] mb-3">Velocity</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  A slipped deadline costs money. We prioritize speed and visibility so that your operations never get bottlenecked by missing information.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
