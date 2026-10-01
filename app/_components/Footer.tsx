'use client';

import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="w-[min(80rem,calc(100%-2rem))] mx-auto">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Intro */}
          <div className="lg:col-span-1">
            <Link className="flex items-center gap-3 no-underline mb-6 group" id="brand-footer" href="#home">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-serif font-bold text-xl group-hover:scale-105 transition-transform shadow-lg shadow-blue-600/20">
                S
              </div>
              <span className="flex flex-col leading-none">
                <span className="text-lg font-bold tracking-tight text-white">Sollvian</span>
                <span className="mt-1 text-[10px] font-bold tracking-[0.2em] uppercase text-blue-400">AI Tech</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 font-medium">
              Revolutionizing the solar industry with intelligent, automated workflows and real-time project tracking.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="#product" className="text-sm font-medium hover:text-blue-400 transition-colors">Proposal & ROI</Link></li>
              <li><Link href="#product" className="text-sm font-medium hover:text-blue-400 transition-colors">Installation Tracking</Link></li>
              <li><Link href="#product" className="text-sm font-medium hover:text-blue-400 transition-colors">Structure Design</Link></li>
              <li><Link href="#product" className="text-sm font-medium hover:text-blue-400 transition-colors">CRM Integration</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#team" className="text-sm font-medium hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="#news" className="text-sm font-medium hover:text-blue-400 transition-colors">News & Updates</Link></li>
              <li><Link href="#contact" className="text-sm font-medium hover:text-blue-400 transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-sm font-medium hover:text-blue-400 transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Get in Touch</h4>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-sm font-medium">hello@sollvian.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span className="text-sm font-medium">Bhopal, M.P, India</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm font-bold">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">Twitter</a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">LinkedIn</a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors">GitHub</a>
            </div>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Sollvian AI Tech. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
