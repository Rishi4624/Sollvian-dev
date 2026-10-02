'use client';
import Link from 'next/link';
import { ArrowUpRight, X } from 'lucide-react';

interface NavLink { label: string; href: string; }
interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]" aria-modal="true" role="dialog" aria-label="Main navigation">
      <button className="absolute inset-0 h-full w-full cursor-default bg-[#203a30]/35 backdrop-blur-[2px]" onClick={onClose} aria-label="Close navigation menu" />
      <aside className="absolute right-0 top-0 flex h-full w-[min(23rem,88vw)] flex-col border-l border-[#203a30]/10 bg-[#f7f7f2] p-6 shadow-[-24px_0_70px_-40px_rgba(31,58,48,0.5)] animate-[slideIn_0.22s_ease]">
        <div className="flex items-center justify-between border-b border-[#203a30]/10 pb-5">
          <Link href="/home" onClick={onClose} className="flex items-center gap-3 no-underline">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#244337] font-serif text-lg text-white">S</span>
            <span className="text-[15px] font-bold text-[#203a30]">Sollvian</span>
          </Link>
          <button className="grid h-10 w-10 place-items-center rounded-full border border-[#203a30]/15 bg-white text-[#244337] transition-colors hover:bg-[#e9ece5]" onClick={onClose} aria-label="Close menu">
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mb-4 mt-8 text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b6744]">Navigate</p>
        <nav className="flex flex-col" aria-label="Mobile navigation">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-4 border-b border-[#203a30]/10 py-4 text-[15px] font-semibold text-[#344c3e] no-underline transition-colors hover:text-[#8b6744]"
              onClick={onClose}
            >
              <span className="w-7 shrink-0 font-serif text-[14px] text-[#9b8062]">0{i + 1}</span>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" onClick={onClose} className="mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#244337] text-[13px] font-bold text-white no-underline transition-colors hover:bg-[#315844]">
          Talk to our team <ArrowUpRight className="h-4 w-4" />
        </Link>
      </aside>
    </div>
  );
}
