'use client';

import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#203a30]/10 bg-[#f7f7f2] text-[#717a70]">
      <div className="mx-auto w-[min(82rem,calc(100%-2.5rem))] py-14 md:py-16">

        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/home" className="mb-5 flex items-center gap-3 no-underline">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#244337] font-serif text-lg text-[#f5f2e9]">S</div>
              <div>
                <div className="text-[15px] font-bold leading-none text-[#203a30]">Sollvian</div>
                <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#8b6744]">AI Technologies</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed">
              Connected tools for the people building a brighter energy future.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="mb-5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#2c4437]">Platform</h4>
            <ul className="space-y-3">
              {['Proposal & ROI', 'Installation Tracking', 'Structure Design', 'CRM Integration', 'Customer 360°'].map(l => (
                <li key={l}><Link href="#product" className="text-[13px] transition-colors hover:text-[#8b6744]">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#2c4437]">Company</h4>
            <ul className="space-y-3">
              {[['About Us', '#team'], ['News', '#news'], ['Contact', '#contact'], ['Careers', '#']].map(([l, h]) => (
                <li key={l}><Link href={h} className="text-[13px] transition-colors hover:text-[#8b6744]">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 text-[12px] font-bold uppercase tracking-[0.12em] text-[#2c4437]">Contact</h4>
            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#8b6744]" />
                <span className="text-[13px]">hello@sollvian.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-[#8b6744]" />
                <span className="text-[13px]">Bhopal, M.P, India</span>
              </div>
            </div>
            <div className="flex gap-4 text-[12px]">
              <a href="#" className="transition-colors hover:text-[#8b6744]">Twitter</a>
              <a href="#" className="transition-colors hover:text-[#8b6744]">LinkedIn</a>
              <a href="#" className="transition-colors hover:text-[#8b6744]">GitHub</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-[#203a30]/10 pt-6 text-[12px] md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Sollvian AI Tech. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="transition-colors hover:text-[#8b6744]">Privacy Policy</Link>
            <Link href="/terms" className="transition-colors hover:text-[#8b6744]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
