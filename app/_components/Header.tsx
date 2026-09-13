'use client';

import { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';

const NAV_ITEMS = [
  { label: 'Home',    href: '#home'    },
  { label: 'Product', href: '#product' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive]     = useState('home');

  /* Track active section */
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.href.slice(1));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <header className="site-header">
        {/* ── Main row ── */}
        <div className="header-row">

          {/* Logo */}
          <a className="brand" id="brand" href="#home">
            <svg viewBox="0 0 40 40" width="32" height="32" aria-hidden="true">
              <defs>
                <linearGradient id="sa-mark" x1="4" y1="4" x2="36" y2="36">
                  <stop stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              <path
                d="M20 2.5 35.5 12v16L20 37.5 4.5 28V12L20 2.5Z"
                fill="none"
                stroke="url(#sa-mark)"
                strokeWidth="1.6"
              />
              <path
                d="M13.2 25.2c1.4 2.2 3.8 3.4 6.8 3.4 3.6 0 6.2-1.7 6.2-4.4
                   0-2.4-1.8-3.8-5.6-4.5l-2.2-.4c-1.7-.3-2.4-.8-2.4-1.6
                   0-.9.9-1.5 2.5-1.5 1.8 0 3.1.6 4.1 1.9l2.3-2.3
                   c-1.5-1.8-3.7-2.8-6.5-2.8-3.5 0-5.9 1.8-5.9 4.4
                   0 2.3 1.7 3.7 5.4 4.4l2.3.4c1.8.3 2.5.8 2.5 1.7
                   0 1-.9 1.6-2.7 1.6-2.1 0-3.6-.8-4.7-2.3l-2.1 2Z"
                fill="url(#sa-mark)"
              />
            </svg>
            <span className="brand-copy">
              <span className="brand-name">Sollvian</span>
              <span className="brand-sub">AI Tech</span>
            </span>
          </a>

          {/* ── Desktop dot-rail (hidden below 1024px) ── */}
          <nav className="header-rail" aria-label="Main navigation">
            <div className="rail">
              <ul className="rail-list">
                {NAV_ITEMS.map((item) => {
                  const id = item.href.slice(1);
                  const isActive = active === id;
                  return (
                    <li className="rail-item" key={id}>
                      <a
                        href={item.href}
                        className={`rail-btn${isActive ? ' is-active' : ''}`}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        <span className="dot" />
                        <span className="rail-label">{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* ── Actions ── */}
          <div className="header-actions">
            {/* Talk to us — shows at ≥640px */}
            <a
              href="#contact"
              className="btn btn-cyan desktop-only"
              id="talk"
            >
              Talk to us
            </a>
            {/* Hamburger — hidden at ≥1024px */}
            <button
              className="icon-btn"
              id="menu-open"
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* ── Mobile rail (below header row, hidden at ≥1024px) ── */}
        <nav className="mobile-rail" aria-label="Mobile navigation">
          <div className="rail">
            <ul className="rail-list">
              {NAV_ITEMS.map((item) => {
                const id = item.href.slice(1);
                const isActive = active === id;
                return (
                  <li className="rail-item" key={id}>
                    <a
                      href={item.href}
                      className={`rail-btn${isActive ? ' is-active' : ''}`}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      <span className="dot" />
                      <span className="rail-label">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_ITEMS}
      />
    </>
  );
}
