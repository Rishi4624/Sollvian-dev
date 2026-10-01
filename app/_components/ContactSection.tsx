'use client';

import { useState, FormEvent } from 'react';
import { ArrowRight, Mail, MapPin, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err' | 'sending' | 'server_err'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const note = (form.elements.namedItem('note') as HTMLTextAreaElement).value.trim();
    if (!name || !email || !note) { setStatus('err'); return; }
    setStatus('sending');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: name, email, message: note }),
      });
      if (res.ok) { setStatus('ok'); form.reset(); }
      else setStatus('server_err');
    } catch { setStatus('server_err'); }
  }

  const inputClass = `w-full rounded-xl px-5 py-4 text-[15px] font-medium outline-none
    bg-white/[0.07] border border-white/[0.16] text-white placeholder:text-white/45
    focus:border-[#d7b58e]/70 focus:bg-white/[0.1] transition-all duration-200`;

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#244337] py-24 md:py-32" id="contact">
      <div className="absolute right-[-8rem] top-[-9rem] h-[30rem] w-[30rem] rounded-full border border-white/[0.07]" />
      <div className="absolute right-[-2rem] top-[-3rem] h-[18rem] w-[18rem] rounded-full border border-white/[0.07]" />

      <div className="relative z-10 mx-auto grid w-[min(82rem,calc(100%-2.5rem))] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">

        <div className="flex flex-col justify-center">
          <p className="mb-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-[#dfc19f]">
            <Sparkles className="h-3.5 w-3.5" /> Let&apos;s talk
          </p>
          <h2 className="mb-6 max-w-xl font-serif text-[clamp(2.8rem,5vw,4.8rem)] leading-[1.02] text-[#f7f7f2]">
            Make the next project your best one.
          </h2>
          <p className="mb-10 max-w-md text-[15px] leading-[1.8] text-white/70">
            Tell us about your team, your bottlenecks, and what you&apos;re trying to achieve. We&apos;ll respond the same day.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4 group cursor-default">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.07] transition-colors group-hover:bg-white/[0.13]">
                <Mail className="h-4 w-4 text-[#dfc19f]" />
              </div>
              <span className="text-[14px] font-semibold text-white/85">hello@sollvian.com</span>
            </div>
            <div className="flex items-center gap-4 group cursor-default">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.07] transition-colors group-hover:bg-white/[0.13]">
                <MapPin className="h-4 w-4 text-[#dfc19f]" />
              </div>
              <span className="text-[14px] font-semibold text-white/85">Bhopal, M.P, India</span>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden border border-white/15 bg-[#2d5141] p-6 sm:p-9">
          <h3 className="relative z-10 mb-7 font-serif text-[28px] text-[#f7f7f2]">Send a message</h3>

          <form className="relative z-10 flex flex-col gap-4" noValidate onSubmit={handleSubmit}>
            <input id="name" name="name" placeholder="Your Name" required className={inputClass} />
            <input id="email" name="email" type="email" placeholder="Business Email" required className={inputClass} />
            <textarea id="note" name="note" placeholder="Tell us about your needs..." required className={`${inputClass} min-h-[130px] resize-y`} />

            {/* Status messages — always on dark bg so text must be light */}
            {status === 'ok' && (
              <p className="rounded-xl border border-[#d7b58e]/30 bg-[#d7b58e]/10 p-4 text-sm font-semibold text-[#f0d4b4]">
                Thanks! We&apos;ll be in touch very soon. ✓
              </p>
            )}
            {status === 'err' && (
              <p className="text-red-300 font-semibold p-4 bg-red-500/10 border border-red-500/25 rounded-xl text-sm">
                Please fill in all required fields.
              </p>
            )}
            {status === 'server_err' && (
              <p className="text-red-300 font-semibold p-4 bg-red-500/10 border border-red-500/25 rounded-xl text-sm">
                Something went wrong — please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="group mt-2 inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-[#e1c19d] px-6 text-[14px] font-bold text-[#203a30] transition-colors hover:bg-[#edd2b0] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
              {status !== 'sending' && <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
