'use client';

import { useState, FormEvent } from 'react';

export default function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'ok' | 'err' | 'sending' | 'server_err'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const company = (form.elements.namedItem('company') as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim();
    const interest = (form.elements.namedItem('interest') as HTMLSelectElement).value.trim();
    const address = (form.elements.namedItem('address') as HTMLInputElement).value.trim();
    const note = (form.elements.namedItem('note') as HTMLTextAreaElement).value.trim();

    if (!name || !email || !note || !interest) {
      setStatus('err');
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: name,
          email,
          companyName: company,
          contactNumber: phone,
          topic: interest,
          address,
          message: note,
        }),
      });

      if (response.ok) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('server_err');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('server_err');
    }
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
          <div className="grid gap-4 mb-4">
            <div>
              <label htmlFor="name" className={labelClass}>
                Full Name <span className={reqClass}>*</span>
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
          </div>

          <div className="grid gap-4 mb-4">
            <div>
              <label htmlFor="email" className={labelClass}>
                Business Email <span className={reqClass}>*</span>
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

          <div className="grid gap-4 mb-4">
            <div>
              <label htmlFor="company" className={labelClass}>Company Name</label>
              <input
                id="company"
                name="company"
                autoComplete="organization"
                placeholder="Optional"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className={labelClass}>Contact Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
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
              <label htmlFor="address" className={labelClass}>Address</label>
              <input
                id="address"
                name="address"
                autoComplete="street-address"
                placeholder="Optional"
                className={inputClass}
              />
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
              Thanks! Your message has been sent successfully. We'll get back to you soon.
            </p>
          )}
          {status === 'err' && (
            <p className="m-0 mb-4 px-3 py-2 rounded-[0.6rem] text-sm border border-rose-400/30 bg-rose-400/10 text-rose-200" id="form-err">
              Please fill in all required fields.
            </p>
          )}
          {status === 'server_err' && (
            <p className="m-0 mb-4 px-3 py-2 rounded-[0.6rem] text-sm border border-rose-400/30 bg-rose-400/10 text-rose-200" id="form-server-err">
              Something went wrong while sending your message. Please try again.
            </p>
          )}

          <button
            className="inline-flex items-center justify-center h-10 px-5 rounded-full border-0 text-sm font-medium cursor-pointer bg-cyan-400 text-[#041018] hover:bg-cyan-300 transition-colors self-start disabled:opacity-50 disabled:cursor-not-allowed"
            id="form-submit"
            type="submit"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send the note'}
          </button>
        </form>
      </div>
    </section>
  );
}
