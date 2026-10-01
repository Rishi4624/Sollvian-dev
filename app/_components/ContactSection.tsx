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

  const inputClass = "w-full border-b-2 border-slate-200 bg-transparent text-slate-900 px-0 py-4 outline-none transition-all duration-300 focus:border-blue-600 placeholder:text-slate-400 text-lg font-medium";

  return (
    <section className="relative overflow-hidden py-24 bg-slate-50" id="contact">
      <div className="w-[min(80rem,calc(100%-2rem))] mx-auto grid gap-16 lg:grid-cols-2">
        
        {/* Info Column */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-white text-blue-600 text-xs font-bold tracking-widest uppercase mb-6 self-start shadow-sm">
            Let's Talk
          </div>
          <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
            Ready to upgrade your solar workflow?
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-lg mb-12 font-medium">
            Tell us about your team, your bottlenecks, and what you're looking to achieve. We usually respond within a few hours.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-slate-900">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-lg font-bold">hello@sollvian.com</span>
            </div>
            <div className="flex items-center gap-4 text-slate-900">
              <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-lg font-bold">Bhopal, M.P, India</span>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -mr-32 -mt-32 opacity-70 pointer-events-none" />
          
          <h3 className="text-2xl font-extrabold text-slate-900 mb-8 relative z-10">Send us a message</h3>
          
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

            {status === 'ok' && <p className="text-emerald-700 font-bold p-4 bg-emerald-50 border border-emerald-200 rounded-xl">Thanks! We'll be in touch soon.</p>}
            {status === 'err' && <p className="text-red-600 font-bold p-4 bg-red-50 border border-red-200 rounded-xl">Please fill out all required fields.</p>}
            {status === 'server_err' && <p className="text-red-600 font-bold p-4 bg-red-50 border border-red-200 rounded-xl">Something went wrong. Please try again.</p>}

            <button
              className="mt-4 group inline-flex items-center justify-center gap-3 h-14 w-full rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-0.5"
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
