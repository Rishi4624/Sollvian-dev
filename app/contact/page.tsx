'use client';

import { useState, FormEvent } from 'react';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import { ArrowRight, Mail, MapPin, Phone, Sparkles, CheckCircle2 } from 'lucide-react';

const TOPICS = [
  'Proposal & ROI',
  'Installation Tracking',
  'Structure Design',
  'CRM Integration',
  'Customer 360°',
  'General Enquiry',
];

const WHY_ITEMS = [
  { title: 'Same-day response', desc: 'We reply within a few hours on business days.' },
  { title: 'No sales pressure', desc: 'Talk to a product expert, not a quota-driven rep.' },
  { title: 'Tailored demo', desc: 'We prepare the walkthrough around your team\'s workflow.' },
];

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err' | 'sending' | 'server_err'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const company = (form.elements.namedItem('company') as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim();
    const interest = (form.elements.namedItem('interest') as HTMLSelectElement).value;
    const note = (form.elements.namedItem('note') as HTMLTextAreaElement).value.trim();

    if (!name || !email || !note) { setStatus('err'); return; }
    setStatus('sending');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: name, email, companyName: company, contactNumber: phone, topic: interest, message: note }),
      });
      if (res.ok) { setStatus('ok'); form.reset(); } else setStatus('server_err');
    } catch { setStatus('server_err'); }
  }

  const inputClass = `w-full rounded-xl px-4 py-3.5 text-[14px] font-medium outline-none
    bg-[#f0ede6] border border-[#203a30]/12 text-[#203a30] placeholder:text-[#7b8b7e]
    focus:border-[#244337]/40 focus:bg-white transition-all duration-200`;

  const labelClass = 'block mb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#5a6b5e]';

  return (
    <div className="min-h-screen bg-[#f7f7f2]">
      <Header />

      {/* Page Hero */}
      <div className="pt-[76px] bg-[#f7f7f2] border-b border-[#203a30]/8">
        <div className="w-[min(82rem,calc(100%-2.5rem))] mx-auto py-20">
          <div className="inline-flex items-center gap-2 mb-6 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b6744]">
            <span className="h-px w-6 bg-[#8b6744]" /> Contact
          </div>
          <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-[#203a30] leading-[1.02] tracking-[-0.045em] mb-5">
            Let's talk about<br />
            <span className="italic font-serif text-[#8b6744]">your operation.</span>
          </h1>
          <p className="text-[#606b62] text-lg max-w-xl leading-[1.8]">
            Tell us about your team and what's slowing you down. We'll prepare a demo around your exact workflow.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="w-[min(82rem,calc(100%-2.5rem))] mx-auto py-20 grid lg:grid-cols-[1fr_1.1fr] gap-16">

        {/* Left: Info */}
        <div>
          {/* Why contact items */}
          <div className="mb-12 space-y-5">
            {WHY_ITEMS.map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#203a30]/8 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#244337] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#203a30] text-[15px] mb-1">{item.title}</div>
                  <div className="text-[#606b62] text-sm leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact details */}
          <div className="space-y-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#7b8b7e] mb-5">Get in touch directly</div>
            <a href="mailto:hello@sollvian.com" className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#203a30]/8 hover:border-[#244337]/30 hover:shadow-sm transition-all group no-underline">
              <div className="w-10 h-10 rounded-xl bg-[#e8ece3] flex items-center justify-center group-hover:bg-[#d4dbd0] transition-colors">
                <Mail className="w-5 h-5 text-[#244337]" />
              </div>
              <span className="text-[#203a30] font-semibold text-[14px]">hello@sollvian.com</span>
            </a>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-[#203a30]/8">
              <div className="w-10 h-10 rounded-xl bg-[#e8ece3] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[#244337]" />
              </div>
              <span className="text-[#203a30] font-semibold text-[14px]">Bhopal, M.P, India</span>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white border border-[#203a30]/10 rounded-3xl p-8 md:p-10 shadow-[0_20px_60px_-20px_rgba(31,58,48,0.12)]">
          <h2 className="text-2xl font-black text-[#203a30] mb-8 tracking-tight">Send us a message</h2>

          <form className="flex flex-col gap-5" noValidate onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className={labelClass}>Full Name <span className="text-[#8b6744]">*</span></label>
                <input id="name" name="name" placeholder="Your name" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Business Email <span className="text-[#8b6744]">*</span></label>
                <input id="email" name="email" type="email" placeholder="you@company.com" required className={inputClass} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="company" className={labelClass}>Company</label>
                <input id="company" name="company" placeholder="Optional" className={inputClass} />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>Phone</label>
                <input id="phone" name="phone" type="tel" placeholder="Optional" className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="interest" className={labelClass}>What should we talk about?</label>
              <select id="interest" name="interest" className={inputClass}>
                {TOPICS.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="note" className={labelClass}>Tell us your situation <span className="text-[#8b6744]">*</span></label>
              <textarea id="note" name="note" placeholder="A sentence on your team, the constraint, and the date that matters." required className={`${inputClass} min-h-[130px] resize-y`} />
            </div>

            {status === 'ok' && <p className="text-[#244337] font-semibold p-4 bg-[#e8ece3] border border-[#244337]/20 rounded-xl text-sm">Thanks! We'll be in touch soon. ✓</p>}
            {status === 'err' && <p className="text-red-700 font-semibold p-4 bg-red-50 border border-red-200 rounded-xl text-sm">Please fill in all required fields.</p>}
            {status === 'server_err' && <p className="text-red-700 font-semibold p-4 bg-red-50 border border-red-200 rounded-xl text-sm">Something went wrong — please try again.</p>}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="group inline-flex items-center justify-center gap-2.5 h-13 py-3.5 rounded-xl font-black text-[14px]
                bg-[#244337] text-white hover:bg-[#315844] transition-all
                shadow-[0_8px_30px_-8px_rgba(36,67,55,0.4)] hover:shadow-[0_12px_35px_-8px_rgba(36,67,55,0.5)]
                hover:-translate-y-0.5 disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : 'Send message'}
              {status !== 'sending' && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}