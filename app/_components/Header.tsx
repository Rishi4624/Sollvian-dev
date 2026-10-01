'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';
import { usePathname } from 'next/navigation';
import { Menu, ArrowUpRight } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/home' },
  { label: 'Workflow', href: '/workflow' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname && pathname !== '/' ? pathname.replace(/^\/+/, '') : 'home';
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-[#f7f7f2]/95 backdrop-blur-xl border-b border-[#213b32]/10 shadow-[0_8px_30px_-24px_rgba(31,58,48,0.55)]'
          : 'bg-[#f7f7f2]/90 backdrop-blur-md'
        }`}
      >
        <div className="w-[min(82rem,calc(100%-2.5rem))] mx-auto flex items-center justify-between h-[76px]">
          <Link href="/home" className="flex items-center gap-3 no-underline shrink-0" aria-label="Sollvian home">
            <span className="grid place-items-center w-10 h-10 rounded-full bg-[#244337] text-[#f5f2e9] font-serif text-xl">S</span>
            <span className="flex flex-col">
              <span className="text-[#203a30] font-bold text-[16px] leading-tight">Sollvian</span>
              <span className="text-[#8b6744] text-[9px] font-bold tracking-[0.18em] uppercase">AI Technologies</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => {
                const id = item.href.slice(1);
                const isActive = currentPath === id || (currentPath === 'home' && id === 'home');

                return (
                  <Link
                    key={id}
                    href={item.href}
                    className={`px-4 py-2 text-[13px] font-semibold transition-colors rounded-full ${isActive
                      ? 'text-[#244337] bg-[#e5e9df]'
                      : 'text-[#626c62] hover:text-[#203a30] hover:bg-[#e9ebe4]'
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-full text-[13px] font-bold bg-[#244337] text-white hover:bg-[#315844] transition-colors"
            >
              Talk to our team <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <button
              className="lg:hidden w-10 h-10 rounded-full border border-[#203a30]/15 bg-white text-[#244337] flex items-center justify-center hover:bg-[#e9ebe4] transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_ITEMS} />
    </>
  );
}
