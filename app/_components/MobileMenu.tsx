'use client';
import Link from 'next/link';

interface NavLink { label: string; href: string; }
interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 block" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/45" onClick={onClose} />

      {/* Slide panel */}
      <aside className="absolute top-0 right-0 h-full w-[min(20rem,84vw)] bg-[#071226] border-l border-white/10 p-5 animate-[slideIn_0.22s_ease]">
        <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white text-xl cursor-pointer hover:bg-white/10 transition-colors" onClick={onClose} aria-label="Close menu">
          ×
        </button>

        <p className="m-0 text-[12px] font-bold tracking-[0.22em] uppercase text-cyan-300/90">On this page</p>
        <p className="text-slate-400 text-sm mt-0 mb-4">
          One horizontal line. Three stops.
        </p>

        <div className="flex flex-col gap-1 mt-4">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 p-3 border-0 rounded-[0.6rem] bg-transparent text-inherit text-left cursor-pointer no-underline w-full hover:bg-white/5 transition-colors"
              onClick={onClose}
            >
              <span className="w-7 h-7 rounded-full border border-cyan-400/40 grid place-items-center text-xs text-cyan-200 shrink-0">0{i + 1}</span>
              {link.label}
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
}
