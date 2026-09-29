'use client';

import Link from 'next/link';

import { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { label: 'Home', href: '/home' },
  { label: 'Workflow', href: '/workflow' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [active, setActive] = useState('home');

  useEffect(() => {
    if (pathname && pathname !== '/') {
      setActive(pathname.slice(1));
    }
  }, [pathname]);

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
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050d1b]/90 backdrop-blur-md">
        {/* ── Main row ── */}
        <div className="flex items-center justify-between gap-4 py-3 w-[min(72rem,calc(100%-2rem))] mx-auto">
          {/* Logo */}
          <Link className="inline-flex items-center gap-[0.65rem] no-underline" id="brand" href="#home">
            <img src="/favicon.ico" alt="Sollvian Logo" width="32" height="32" className="object-contain rounded-md" />
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-[-0.02em]">Sollvian</span>
              <span className="mt-[2px] text-[10px] font-semibold tracking-[0.16em] uppercase text-sky-300/80">AI Tech</span>
            </span>
          </Link>

          {/* ── Desktop dot-rail (hidden below 1024px) ── */}
          <nav className="hidden lg:flex flex-1 justify-center px-2" aria-label="Main navigation">
            <div className="w-full max-w-3xl relative">
              <ul className="flex justify-between relative m-0 p-0 list-none before:content-[''] before:absolute before:left-[8%] before:right-[8%] before:top-[9px] before:h-[1px] before:bg-gradient-to-r before:from-sky-400/20 before:via-cyan-300/70 before:to-blue-600/20">
                {NAV_ITEMS.map((item) => {
                  const id = item.href.slice(1);
                  const isActive = active === id;
                  return (
                    <li className="relative z-10 flex-1 flex flex-col items-center text-center" key={id}>
                      <Link
                        href={item.href}
                        className="flex flex-col items-center gap-2 px-1 border-0 bg-transparent text-inherit cursor-pointer no-underline group"
                        aria-current={isActive ? 'true' : undefined}
                      >
                        <span className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-all duration-200 ${isActive ? 'border-cyan-300 bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.55)]' : 'border-sky-300/50 bg-[#071226]'}`}>
                          <span className={`w-[6px] h-[6px] rounded-full bg-white transition-opacity duration-200 ${isActive ? 'opacity-90' : 'opacity-40'}`} />
                        </span>
                        <span className={`text-[11px] font-medium transition-colors duration-200 ${isActive ? 'text-cyan-200' : 'text-slate-400'}`}>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* ── Actions ── */}
          <div className="flex items-center gap-2">
            {/* Talk to us — shows at ≥640px */}
            <Link
              href="#contact"
              className="hidden sm:inline-flex items-center justify-center h-10 px-5 rounded-full border-0 text-sm font-medium cursor-pointer bg-cyan-400 text-[#041018] hover:bg-cyan-300 transition-colors no-underline"
              id="talk"
            >
              Talk to us
            </Link>
            {/* Hamburger — hidden at ≥1024px */}
            <button
              className="lg:hidden w-8 h-8 rounded-lg border border-white/15 bg-white/5 text-white flex items-center justify-center cursor-pointer p-0"
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
        <nav className="lg:hidden border-t border-white/5 pt-2 pb-3 px-3" aria-label="Mobile navigation">
          <div className="w-full max-w-3xl mx-auto relative">
            <ul className="flex justify-between relative m-0 p-0 list-none before:content-[''] before:absolute before:left-[8%] before:right-[8%] before:top-[9px] before:h-[1px] before:bg-gradient-to-r before:from-sky-400/20 before:via-cyan-300/70 before:to-blue-600/20">
              {NAV_ITEMS.map((item) => {
                const id = item.href.slice(1);
                const isActive = active === id;
                return (
                  <li className="relative z-10 flex-1 flex flex-col items-center text-center" key={id}>
                    <Link
                      href={item.href}
                      className="flex flex-col items-center gap-2 px-1 border-0 bg-transparent text-inherit cursor-pointer no-underline group"
                      aria-current={isActive ? 'true' : undefined}
                    >
                      <span className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-all duration-200 ${isActive ? 'border-cyan-300 bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.55)]' : 'border-sky-300/50 bg-[#071226]'}`}>
                        <span className={`w-[6px] h-[6px] rounded-full bg-white transition-opacity duration-200 ${isActive ? 'opacity-90' : 'opacity-40'}`} />
                      </span>
                      <span className={`text-[11px] font-medium transition-colors duration-200 ${isActive ? 'text-cyan-200' : 'text-slate-400'}`}>{item.label}</span>
                    </Link>
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
