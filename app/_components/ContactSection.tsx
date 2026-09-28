'use client';

import { useState, FormEvent } from 'react';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name  = (form.elements.namedItem('name')  as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const note  = (form.elements.namedItem('note')  as HTMLTextAreaElement).value.trim();

    if (!name || !email || !note) {
      setStatus('err');
      return;
    }

    /* Simulate submission — replace with real API call when ready */
    setStatus('ok');
    form.reset();
  }

  const inputClass = "w-full border border-white/12 bg-white/5 text-white rounded-[0.6rem] px-3 py-[0.6rem] outline-none transition-colors duration-150 focus:border-cyan-400 placeholder:text-slate-400/45";
  const labelClass = "block mb-[0.4rem] text-sm font-medium text-[#e8eef7]";
  const reqClass = "text-cyan-300";

  return (
    <section 
      className="relative overflow-hidden py-16 scroll-mt-28 lg:scroll-mt-24 bg-transparent" 
      id="contact"
    >
      <div className="relative z-10 w-[min(72rem,calc(100%-2rem))] mx-auto grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">

        {/* Info column */}
        <div>
          <p className="m-0 text-[12px] font-bold tracking-[0.22em] uppercase text-cyan-300/90">Contact</p>
          <h2 className="mt-3 max-w-4xl text-[clamp(1.75rem,4vw,2.25rem)] tracking-[-0.03em] text-[#e8eef7] leading-[1.2]">Tell us the constraint, not the stack.</h2>
          <p className="mt-4 max-w-[40rem] text-slate-300 leading-[1.7]">
            A first note is enough: who the customer is, what is slipping, and
            the date that matters. We reply within two working days.
          </p>
          <dl className="mt-8">
            <div>
              <dt className="text-slate-500 text-sm">What to send</dt>
              <dd className="mt-1">A sentence on the work. Attach nothing unless it helps.</dd>
            </div>
          </dl>
        </div>

        {/* Form column */}
        <form
          className="bg-[#0a1730] border border-white/10 rounded-2xl p-6 flex flex-col gap-0"
          id="contact-form"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className={labelClass}>
                Name <span className={reqClass}>*</span>
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Work email <span className={reqClass}>*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label htmlFor="company" className={labelClass}>Company</label>
              <input
                id="company"
                name="company"
                autoComplete="organization"
                placeholder="Optional"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="interest" className={labelClass}>What should we talk about?</label>
              <select id="interest" name="interest" className={inputClass}>
                <option className="bg-[#0a1730]">Proposal &amp; ROI</option>
                <option className="bg-[#0a1730]">Installation Tracking</option>
                <option className="bg-[#0a1730]">Structure Design</option>
                <option className="bg-[#0a1730]">CRM</option>
                <option className="bg-[#0a1730]">Customer 360°</option>
                <option className="bg-[#0a1730]">Something else</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 mb-4">
            <div>
              <label htmlFor="note" className={labelClass}>
                What are you trying to ship? <span className={reqClass}>*</span>
              </label>
              <textarea
                id="note"
                name="note"
                placeholder="A sentence on the customer, the constraint, and the date that matters."
                required
                className={`${inputClass} min-h-[7rem] resize-y`}
              />
            </div>
          </div>

          {status === 'ok' && (
            <p className="m-0 mb-4 px-3 py-2 rounded-[0.6rem] text-sm border border-emerald-400/30 bg-emerald-400/10 text-emerald-200" id="form-ok">
              Received. We will write back within two working days.
            </p>
          )}
          {status === 'err' && (
            <p className="m-0 mb-4 px-3 py-2 rounded-[0.6rem] text-sm border border-rose-400/30 bg-rose-400/10 text-rose-200" id="form-err">
              Please fill in all required fields.
            </p>
          )}

          <button
            className="inline-flex items-center justify-center h-10 px-5 rounded-full border-0 text-sm font-medium cursor-pointer bg-cyan-400 text-[#041018] hover:bg-cyan-300 transition-colors self-start"
            id="form-submit"
            type="submit"
          >
            Send the note
          </button>
        </form>
      </div>
    </section>
  );
}
