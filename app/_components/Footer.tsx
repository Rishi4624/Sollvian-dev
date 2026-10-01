import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-[#2c3327] pt-16 pb-8 text-[#e3e1d9]">
      <div className="w-[min(72rem,calc(100%-2rem))] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Product */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#fdfdfc] font-bold text-lg mb-2">Product</h3>
            <Link href="/lead-management" className="hover:text-[#a5a58d] transition-colors">Proposal & ROI</Link>
            <Link href="/sales-design" className="hover:text-[#a5a58d] transition-colors">Installation Tracking</Link>
            <Link href="/design-studio" className="hover:text-[#a5a58d] transition-colors">Solar Structure Design</Link>
            <Link href="/design-studio" className="hover:text-[#a5a58d] transition-colors">CRM</Link>
            <Link href="/design-studio" className="hover:text-[#a5a58d] transition-colors">Customer 360</Link>
          </div>

          {/* Solutions */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#fdfdfc] font-bold text-lg mb-2">Solutions</h3>
            <Link href="/solar-installers" className="hover:text-[#a5a58d] transition-colors">Solar Installers</Link>
            <Link href="/sales-professionals" className="hover:text-[#a5a58d] transition-colors">Sales Professionals</Link>
            <Link href="/channel-managers-oems" className="hover:text-[#a5a58d] transition-colors">Channel Managers & OEMs</Link>
            <Link href="/industry-residential" className="hover:text-[#a5a58d] transition-colors">Industry Residential</Link>
            <Link href="/industry-commercial" className="hover:text-[#a5a58d] transition-colors">Industry Commercial</Link>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#fdfdfc] font-bold text-lg mb-2">Resources</h3>
            <Link href="/blog" className="hover:text-[#a5a58d] transition-colors">Blog</Link>
            <Link href="/events" className="hover:text-[#a5a58d] transition-colors">Events</Link>
            <Link href="/case-studies" className="hover:text-[#a5a58d] transition-colors">Case Studies</Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[#fdfdfc] font-bold text-lg mb-2">Company</h3>
            <Link href="/about" className="hover:text-[#a5a58d] transition-colors">About</Link>
            <Link href="/privacy-policy" className="hover:text-[#a5a58d] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#a5a58d] transition-colors">Terms</Link>
            <Link href="/support-feedback" className="hover:text-[#a5a58d] transition-colors">Support Feedback</Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 pt-8 border-t border-white/10">
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/favicon.ico" alt="Sollvian Logo" width="40" height="40" className="object-contain rounded-md" />
              <span className="flex flex-col leading-none">
                <span className="text-[20px] font-semibold tracking-[-0.02em] text-[#fdfdfc]">Sollvian</span>
                <span className="mt-[2px] text-[12px] font-semibold tracking-[0.16em] uppercase text-[#a5a58d]">AI Tech</span>
              </span>
            </div>

            {/* Addresses */}
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-xl leading-none" role="img" aria-label="India Flag">🇮🇳</span>
                <span>Sollvian AI tech Pvt ltd<br />Plot no 142, 4th floor , MP Nagar zone 2 462011, Bhopal M.P</span>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-start lg:items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10">
            <span className="text-[#fdfdfc] font-medium">Have something in mind?</span>
            <Link href="#contact" className="inline-flex items-center justify-center h-12 px-8 rounded-full font-bold cursor-pointer bg-[#a5a58d] text-[#2c3327] hover:bg-[#6b705c] hover:text-white transition-colors no-underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
