'use client';

import Image from 'next/image';
import coverImg from '@/app/_lib/solvian_cover.jpeg';

interface HeroSectionProps {
  onDownload: () => void;
}

export default function HeroSection({ onDownload }: HeroSectionProps) {
  return (
    <section className="home" id="home">
      <div className="section-inner home-grid">
        {/* Text column */}
        <div>
          <p className="eyebrow">Smart solutions · Lasting impact</p>
          <h1>Turning ideas into intelligent solutions</h1>
          <p className="lede">
            Sollvian AI Tech builds the line from a first conversation to a
            system that still works a year later: proposal and ROI, installation
            tracking, solar structure design, CRM, and a true customer 360.
          </p>
          <div className="cta-row">
            <a className="btn btn-cyan" href="#product" id="hero-see-product">
              See the product
            </a>
            <button
              className="btn btn-ghost"
              id="hero-download"
              type="button"
              onClick={onDownload}
            >
              Download package
            </button>
          </div>
        </div>

        {/* Cover image */}
        <div className="cover">
          <Image
            src={coverImg}
            alt="Sollvian AI Tech hub: Proposal and ROI, Installation Tracking, Structure Design, CRM, and Customer 360"
            priority
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </div>
    </section>
  );
}
