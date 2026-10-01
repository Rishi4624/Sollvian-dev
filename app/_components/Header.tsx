'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/home' },
  { label: 'Workflow', href: '/workflow' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (pathname && pathname !== '/') {
      setActive(pathname.slice(1));
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-4xl`}>
        <div className={`flex items-center justify-between px-6 py-3 rounded-full backdrop-blur-xl border transition-all duration-300 ${scrolled ? 'bg-white/70 border-black/10 shadow-lg shadow-black/5' : 'bg-white/40 border-black/5 shadow-sm'}`}>
          {/* Logo */}
          <Link className="flex items-center gap-3 no-underline group" id="brand" href="#home">
            <div className="w-9 h-9 rounded-full bg-[#2c3327] flex items-center justify-center text-white font-serif font-bold text-lg group-hover:scale-105 transition-transform">
              S
            </div>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight text-[#2c3327]">Sollvian</span>
              <span className="mt-1 text-[9px] font-bold tracking-[0.2em] uppercase text-[#6b705c]">AI Tech</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const id = item.href.slice(1);
              const isActive = active === id;
              return (
                <Link
                  key={id}
                  href={item.href}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive ? 'bg-[#2c3327] text-white shadow-md' : 'text-[#4a533a] hover:bg-black/5'}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center justify-center h-10 px-6 rounded-full text-sm font-bold bg-[#2c3327] text-white hover:bg-[#4a533a] transition-all shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
            
            <button
              className="lg:hidden w-10 h-10 rounded-full border border-black/10 bg-white/50 text-[#2c3327] flex items-center justify-center hover:bg-white"
              onClick={() => setMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_ITEMS}
      />
    </>
  );
}
