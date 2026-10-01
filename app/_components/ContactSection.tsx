'use client';

import { useState, FormEvent } from 'react';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err' | 'sending' | 'server_err'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const note = (form.elements.namedItem('note') as HTMLTextAreaElement).value.trim();

    if (!name || !email || !note) {
      setStatus('err');
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: name, email, message: note }),
      });

      if (response.ok) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('server_err');
      }
    } catch (error) {
      setStatus('server_err');
    }
  }

  const inputClass = "w-full border-b-2 border-[#a5a58d]/30 bg-transparent text-[#2c3327] px-0 py-4 outline-none transition-all duration-300 focus:border-[#2c3327] placeholder:text-[#a5a58d] text-lg";

  return (
    <section className="relative overflow-hidden py-24 bg-[#fdfdfc]" id="contact">
      <div className="w-[min(80rem,calc(100%-2rem))] mx-auto grid gap-16 lg:grid-cols-2">
        
        {/* Info Column */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#a5a58d]/30 bg-[#f0ebe1] text-[#6b705c] text-xs font-bold tracking-widest uppercase mb-6 self-start">
            Let's Talk
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight text-[#2c3327] leading-[1.1] mb-6">
            Ready to upgrade your solar workflow?
          </h2>
          <p className="text-[#4a533a] text-lg leading-relaxed max-w-lg mb-12">
            Tell us about your team, your bottlenecks, and what you're looking to achieve. We usually respond within a few hours.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-[#2c3327]">
              <div className="w-12 h-12 rounded-full bg-[#f0ebe1] flex items-center justify-center">
                <Mail className="w-5 h-5 text-[#6b705c]" />
              </div>
              <span className="text-lg font-medium">hello@sollvian.com</span>
            </div>
            <div className="flex items-center gap-4 text-[#2c3327]">
              <div className="w-12 h-12 rounded-full bg-[#f0ebe1] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#6b705c]" />
              </div>
              <span className="text-lg font-medium">Bhopal, M.P, India</span>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-black/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f0ebe1] rounded-full blur-3xl -mr-32 -mt-32 opacity-50 pointer-events-none" />
          
          <h3 className="text-2xl font-bold text-[#2c3327] mb-8 relative z-10">Send us a message</h3>
          
          <form className="relative z-10 flex flex-col gap-6" noValidate onSubmit={handleSubmit}>
            <div>
              <input id="name" name="name" placeholder="Your Name" required className={inputClass} />
            </div>
            <div>
              <input id="email" name="email" type="email" placeholder="Business Email" required className={inputClass} />
            </div>
            <div>
              <textarea id="note" name="note" placeholder="Tell us about your needs..." required className={`${inputClass} min-h-[120px] resize-y`} />
            </div>

            {status === 'ok' && <p className="text-[#6b705c] font-medium p-4 bg-[#f0ebe1] rounded-xl">Thanks! We'll be in touch soon.</p>}
            {status === 'err' && <p className="text-red-500 font-medium">Please fill out all required fields.</p>}
            {status === 'server_err' && <p className="text-red-500 font-medium">Something went wrong. Please try again.</p>}

            <button
              className="mt-4 group inline-flex items-center justify-center gap-3 h-14 w-full rounded-full bg-[#2c3327] text-white font-bold text-lg hover:bg-[#4a533a] transition-all duration-300 disabled:opacity-50"
              type="submit"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'} 
              {!status && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
