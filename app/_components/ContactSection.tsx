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

  return (
    <section className="contact" id="contact">
      <div className="section-inner contact-grid">

        {/* Info column */}
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Tell us the constraint, not the stack.</h2>
          <p className="section-copy">
            A first note is enough: who the customer is, what is slipping, and
            the date that matters. We reply within two working days.
          </p>
          <dl className="meta">
            <div>
              <dt>What to send</dt>
              <dd>A sentence on the work. Attach nothing unless it helps.</dd>
            </div>
          </dl>
        </div>

        {/* Form column */}
        <form
          className="contact-box"
          id="contact-form"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="form-row form-row-2">
            <div>
              <label htmlFor="name">
                Name <span className="req">*</span>
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email">
                Work email <span className="req">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
              />
            </div>
          </div>

          <div className="form-row form-row-2">
            <div>
              <label htmlFor="company">Company</label>
              <input
                id="company"
                name="company"
                autoComplete="organization"
                placeholder="Optional"
              />
            </div>
            <div>
              <label htmlFor="interest">What should we talk about?</label>
              <select id="interest" name="interest">
                <option>Proposal &amp; ROI</option>
                <option>Installation Tracking</option>
                <option>Structure Design</option>
                <option>CRM</option>
                <option>Customer 360°</option>
                <option>Something else</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div>
              <label htmlFor="note">
                What are you trying to ship? <span className="req">*</span>
              </label>
              <textarea
                id="note"
                name="note"
                placeholder="A sentence on the customer, the constraint, and the date that matters."
                required
              />
            </div>
          </div>

          {status === 'ok' && (
            <p className="status ok" id="form-ok">
              Received. We will write back within two working days.
            </p>
          )}
          {status === 'err' && (
            <p className="status err" id="form-err">
              Please fill in all required fields.
            </p>
          )}

          <button
            className="btn btn-cyan"
            id="form-submit"
            type="submit"
            style={{ alignSelf: 'flex-start' }}
          >
            Send the note
          </button>
        </form>
      </div>
    </section>
  );
}
