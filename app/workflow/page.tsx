'use client';

import Image from 'next/image';
import { useState, type ReactNode } from 'react';
import Header from '@/app/_components/Header';
import Footer from '@/app/_components/Footer';
import {
  FileText, Activity, Layers, Users, ShieldCheck,
  ChevronLeft, ChevronRight, CheckCircle2
} from 'lucide-react';

const MODULES = [
  {
    num: '01', title: 'Proposal & ROI',
    summary: 'Customized proposals for unique business needs with the return made visible.',
    detail: 'We gather the site, the buyer, and the numbers that have to survive after the signature. The document that goes out is specific enough to build from.',
    icon: FileText,
    features: [
      { title: 'Accurate solar estimates', desc: 'Use NASA climate data for the customer\'s location and the selected equipment.' },
      { title: 'Automatic cost and savings calculations', desc: 'Calculate GST payback time 25-year savings and inverter sizing.' },
      { title: 'Proposal history', desc: 'Find earlier proposals and make revisions without replacing the original.' },
      { title: 'Four follow-up documents', desc: 'Create customer documents from a saved proposal without entering the same details again.' },
      { title: 'Works offline', desc: 'Use saved climate data and calculate locally when there is no internet connection.' },
    ],
    video: '/videos/proposal_video.mp4',
  },
  {
    num: '02', title: 'Installation Tracking',
    summary: 'Real-time tracking for smooth and timely installations.',
    detail: 'Crews, sites, and blockers sit on one timeline. A slip is visible the morning it happens, not the week the customer asks.',
    icon: Activity,
    features: [
      { title: 'Live Milestone Timeline', desc: 'Track permitting delivery staging and commissioning across all active job sites.' },
      { title: 'Automated Blocker Alerts', desc: 'Instant notifications when material delays or labor bottlenecks threaten project velocity.' },
      { title: 'Field Crew Dispatch & Sync', desc: 'Mobile-first updates from site leads feeding directly into the central dashboard.' },
    ],
    video: '/videos/installation_trecking.mp4',
  },
  {
    num: '03', title: 'Structure Design',
    summary: 'Engineered mounting designs matched to each customer, roof and local wind zone.',
    detail: 'Link a proposal to a calculated panel layout, verify roof loading and wind safety, then save and export a structure report before fabrication begins.',
    icon: Layers,
    features: [
      { title: 'Proposal-linked design', desc: 'Pre-fill customer and panel details from the selected proposal.' },
      { title: 'Wind and roof checks', desc: 'Compare wind force and structure capacity, and calculate roof point load.' },
      { title: '3D drawing and PDF report', desc: 'Review the frame from multiple views and export a customer-linked engineering report.' },
    ],
    video: '/videos/structure_design.mp4',
  },
  {
    num: '04', title: 'CRM Integration',
    summary: 'Manage customer records, service, complaints, maintenance and billing in one place.',
    detail: 'Keep a searchable customer directory and a lasting history of service visits, complaint resolution, AMC schedules, invoices, payments and team activity.',
    icon: Users,
    features: [
      { title: 'Customer records', desc: 'Add, update, search, import and export customer information.' },
      { title: 'Service and complaints', desc: 'Assign technicians and preserve visit notes, costs and resolution status.' },
      { title: 'AMC and GST billing', desc: 'Schedule maintenance visits, generate invoices and track payments.' },
    ],
    video: '/videos/CRM_demo_3.mp4',
  },
  {
    num: '05', title: 'Customer 360°',
    summary: 'A single customer workspace for installation, equipment and service context.',
    detail: 'Open a CRM customer to see their plant capacity, status, panel and inverter details, installation type and the actions most often needed by the service team.',
    icon: ShieldCheck,
    features: [
      { title: 'At-a-glance metrics', desc: 'See plant capacity, customer status, panel brand and structure type together.' },
      { title: 'Equipment linked to proposals', desc: 'Match panel and inverter information from proposal records.' },
      { title: 'Quick customer actions', desc: 'Update status, raise a complaint or open service management from the profile.' },
    ],
    video: '/videos/customer_360_demo.mp4',
  },
];

const PROPOSAL_INPUT_GROUPS = [
  {
    title: 'Customer details',
    rows: [
      ['Name', 'Customer name shown on the proposal.'],
      ['Address', 'Used for location and solar estimate.'],
      ['Map location', 'Optional exact site coordinates.'],
      ['Phone', 'Contact number for follow-up.'],
      ['Email', 'Optional customer email for CRM.'],
    ],
  },
  {
    title: 'Solar system and equipment',
    rows: [
      ['Installation type', 'Choose rooftop, ground-mount or carport.'],
      ['Installation image', 'Upload a layout view of the site.'],
      ['Panel brand and quantity', 'Select the panel model and number of panels.'],
      ['Inverter brand and quantity', 'Choose the inverter and matching quantity.'],
      ['Unit cost', 'Enter the price per kW in INR.'],
      ['Structure type', 'Select the mounting structure.'],
    ],
  },
  {
    title: 'Monthly use and billing',
    rows: [
      ['Monthly bill data', 'Optional monthly billing values.'],
      ['Average monthly use', 'Average power usage in kWh per month.'],
      ['Electricity tariff', 'Grid rate used for savings estimates.'],
      ['Subsidy', 'Apply subsidy amount if eligible.'],
    ],
  },
];

const PROPOSAL_CALCULATIONS = [
  ['System capacity', 'Panel count multiplied by panel wattage converted to kilowatts.'],
  ['Solar generation', 'Estimated electricity produced per day and per month.'],
  ['System cost', 'System capacity in kilowatts multiplied by the unit cost in INR/kW then multiplied by 1,000.'],
  ['GST', 'The 2026 calculation applies 5% GST to 70% of the goods cost and 18% GST to 30% of the services cost.'],
  ['Total cost', 'System cost plus GST.'],
  ['Net amount to pay', 'Total cost after deducting the entered subsidy.'],
  ['Bills before and after solar', 'Estimated current monthly bill and estimated monthly bill after installation.'],
  ['Payback time', 'The estimated number of years for the system to pay for itself calculated year by year using 1% annual generation degradation.'],
  ['25-year savings', 'Estimated lifetime power-bill savings over 25 years using 0.55% annual panel degradation after year one.'],
  ['DC overloading', 'A check of panel capacity against inverter capacity to help show whether the system is sized appropriately.'],
  ['Equipment loss', 'Estimated efficiency loss from temperature and inverter sizing.'],
  ['Monthly comparison', 'For each month use generation, grid electricity used, solar used, solar exported, bill before and after and percentage saved.'],
];

const PROPOSAL_HISTORY_ACTIONS = [
  { title: 'Open a proposal', desc: 'Select a saved proposal to open its full PDF. You can also double click its history row.' },
  { title: 'Cancel a proposal', desc: 'Enter a reason to mark it cancelled. The history row turns light red and shows its status and reason the PDF is not deleted.' },
  { title: 'Revise a proposal', desc: 'Load its details back into the form and submit an updated version. New versions get suffixes such as -RP1 and -RP2 and the earlier versions remain in history.' },
  { title: 'Delete a proposal', desc: 'After confirmation permanently delete its database record. The PDF file remains on the computer.' },
];

const PROPOSAL_DOCUMENTS = [
  {
    title: 'Work Completion Certificate',
    desc: 'A Word document for the completed installation. It includes customer and site details, proposal reference, system capacity, panel and inverter brands, completion date, a work checklist, payment summary when available, and signature spaces for the customer and company.',
  },
  {
    title: 'Vendor Agreement',
    desc: 'A Word agreement with 15 legal clauses for the customer and company to sign before installation. It covers the work and materials, payment schedule, warranties, performance promises, subsidy support, net metering, defect liability, force majeure and dispute resolution under the Arbitration Act 1996. It includes signature and witness spaces.',
  },
  {
    title: 'Net Metering Agreement',
    desc: 'A Word document for the grid connection process. It includes customer details, proposal reference, system capacity, grid import and export terms, electricity provider terms and signature spaces.',
  },
  {
    title: 'Commissioning Report',
    desc: 'A Word handover document for the tested, switched-on system. It includes project details, panels, inverter, mounting, cabling and earthing electrical checks for DC voltage, AC output, earthing resistance, insulation and polarity (marked Pass) an eight point checklist initial generation status (Operational) engineer notes and customer acceptance signatures.',
  },
];

const COMPANY_PROFILE_FIELDS = [
  ['Company name and logo', 'Used on proposal covers specification pages and single page proposals.'],
  ['Address, phone, email and website', 'Used in proposal contact details and footers.'],
  ['GSTIN and customer ID prefix', 'The GSTIN appears in the proposal company details the prefix helps create customer IDs when proposals are moved to CRM.'],
  ['Terms and warranty details', 'Added to the relevant pages of the proposal PDF.'],
  ['Cover image and major-client logos', 'Optional images for the proposal cover and system summary.'],
  ['Output folder', 'The folder where generated PDF files are saved.'],
];

function GuideSection({ number, title, intro, image, children }: {
  number: string;
  title: string;
  intro?: string;
  image?: { src: string; alt: string };
  children: ReactNode;
}) {
  return (
    <section id={`proposal-${number}`} className="scroll-mt-36 border-t border-[#203a30]/12 py-10 md:py-12">
      <div className="mb-7 grid gap-3 md:grid-cols-[9rem_1fr] md:gap-8">
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b6744]">{number}</div>
        <div>
          <h3 className="font-serif text-[1.8rem] leading-tight text-[#203a30]">{title}</h3>
          {intro && <p className="mt-3 max-w-3xl text-[14px] leading-[1.8] text-[#606b62]">{intro}</p>}
        </div>
      </div>

      {image ? (
        <div className="mb-8 grid gap-6 md:grid-cols-[1.4fr_1.1fr] md:items-start md:gap-8 md:pl-[calc(9rem+2rem)]">
          {Number(number) % 2 === 0 ? (
            <>
              <div className="overflow-hidden rounded-[1.5rem] border border-[#203a30]/8 bg-[#f0ede6] shadow-[0_16px_40px_-20px_rgba(31,58,48,0.25)]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="h-64 w-full object-cover md:h-80"
                />
              </div>
              <div>{children}</div>
            </>
          ) : (
            <>
              <div>{children}</div>
              <div className="overflow-hidden rounded-[1.5rem] border border-[#203a30]/8 bg-[#f0ede6] shadow-[0_16px_40px_-20px_rgba(31,58,48,0.25)]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="h-64 w-full object-cover md:h-80"
                />
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="md:ml-[calc(9rem+2rem)]">{children}</div>
      )}
    </section>
  );
}

function ProposalGuide() {
  return (
    <section className="mt-20 border-t-2 border-[#244337] pt-12" aria-labelledby="proposal-guide-title">
      <div className="max-w-3xl pb-10">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b6744]">Proposal &amp; ROI / Complete guide</p>
        <h2 id="proposal-guide-title" className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.02] text-[#203a30]">From customer details to project handover</h2>
        <p className="mt-5 text-[15px] leading-[1.8] text-[#606b62]">
          The Proposal Module is a desktop app in the Sollvian Suite. Enter customer and site details, review the costs and expected generation then create documents for the customer. The calculations and branded PDF can be prepared in under two minutes, without manually moving information between spreadsheets and word processors.
        </p>
      </div>

      <nav aria-label="Proposal guide sections" className="mb-2 grid gap-x-6 gap-y-3 border-y border-[#203a30]/12 py-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['Overview', 'proposal-overview'],
          ['Details to enter', 'proposal-details'],
          ['Calculations', 'proposal-calculations'],
          ['Create the proposal', 'proposal-create'],
          ['PDF formats', 'proposal-pdf'],
          ['History and revisions', 'proposal-history'],
          ['Company profile', 'proposal-company'],
          ['After the sale', 'proposal-handover'],
        ].map(([label, id]) => (
          <a key={id} href={`#${id}`} className="text-[13px] font-semibold text-[#435348] underline decoration-[#8b6744]/40 underline-offset-4 hover:text-[#244337]">
            {label}
          </a>
        ))}
      </nav>

      <GuideSection
        number="01"
        title="What the module does"
        intro="The proposal tool takes you from the first customer detail to a branded PDF that can be reviewed, printed, emailed or signed. It also keeps saved proposals available for follow-up."
        image={{
          src: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
          alt: 'Solar panels and a proposal workflow overview',
        }}
      >
        <div id="proposal-overview" className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <h4 className="mb-4 text-[13px] font-bold uppercase tracking-[0.12em] text-[#435348]">Three parts of the screen</h4>
            <dl className="divide-y divide-[#203a30]/10">
              {[
                ['Left panel', 'Company tools and actions for creating documents after a sale.'],
                ['Center panel', 'Proposal history with saved proposals for customers.'],
                ['Right panel', 'The form for entering customer system and billing details.'],
              ].map(([label, desc]) => <div key={label} className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4"><dt className="text-[13px] font-semibold text-[#203a30]">{label}</dt><dd className="text-[13px] leading-[1.7] text-[#606b62]">{desc}</dd></div>)}
            </dl>
          </div>
          <div>
            <h4 className="mb-4 text-[13px] font-bold uppercase tracking-[0.12em] text-[#435348]">Residential or commercial</h4>
            <p className="text-[14px] leading-[1.8] text-[#606b62]">
              Choose the customer type at the top of the form. The proposal title and icon change to match a home or a business both choices use the same calculation method only the labels and context change.
            </p>
            <p className="mt-4 text-[14px] leading-[1.8] text-[#606b62]">
              The customer address helps identify the city for solar estimates. You can also select exact coordinates on a map when a more precise site location is available.
            </p>
          </div>
        </div>
      </GuideSection>

      <GuideSection
        number="02"
        title="Details to enter"
        intro="Enter the information you have. Monthly bill details are optional the tool can estimate them when they are not available."
        image={{
          src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
          alt: 'Customer information form and solar project details',
        }}
      >
        <div id="proposal-details" className="grid gap-5 xl:grid-cols-2">
          {PROPOSAL_INPUT_GROUPS.map((group) => (
            <div key={group.title} className="p-0">
              <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">{group.title}</h4>
              <dl className="divide-y divide-[#203a30]/10">
                {group.rows.map(([label, desc]) => <div key={label} className="grid gap-1 py-2.5 sm:grid-cols-[8.5rem_1fr] sm:gap-4"><dt className="text-[12px] font-semibold text-[#435348]">{label}</dt><dd className="text-[12px] leading-[1.6] text-[#606b62]">{desc}</dd></div>)}
              </dl>
            </div>
          ))}
        </div>
        <div className="mt-8 border-l-2 border-[#8b6744] bg-[#f0ede6] px-5 py-4">
          <h4 className="mb-2 text-[13px] font-bold text-[#203a30]">Why the equipment details matter</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">
            Panel and inverter details come from the equipment catalogue (components.xlsx). Panel specifications include voltage current temperature coefficient and NOCT. Inverter details include efficiency and MPPT range. These real specifications are used in the solar calculations instead of generic guesses.
          </p>
        </div>
      </GuideSection>

      <GuideSection
        number="03"
        title="What the module calculates"
        intro="After you submit the form the calculation engine prepares the system cost and savings figures for the proposal."
        image={{
          src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
          alt: 'Solar calculations and energy savings dashboard',
        }}
      >
        <div id="proposal-calculations" className="overflow-x-auto">
          <table className="w-full min-w-[38rem] border-collapse text-left">
            <thead><tr className="border-b border-[#203a30]/20"><th scope="col" className="py-3 pr-6 text-[11px] font-bold uppercase tracking-[0.12em] text-[#8b6744]">Result</th><th scope="col" className="py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#8b6744]">What it means</th></tr></thead>
            <tbody>{PROPOSAL_CALCULATIONS.map(([label, desc]) => <tr key={label} className="border-b border-[#203a30]/10 align-top"><th scope="row" className="py-3 pr-6 text-[13px] font-semibold text-[#203a30]">{label}</th><td className="py-3 text-[13px] leading-[1.7] text-[#606b62]">{desc}</td></tr>)}</tbody>
          </table>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Local sunlight data</h4>
            <p className="text-[13px] leading-[1.8] text-[#606b62]">
              The module uses NASA POWER API sunlight data for the customer city and coordinates. For example the guide compares Jodhpur at 6.0 KWH/m2/day with Kolkata at 4.5 KWH/m2/day. If there is no connection it can use saved climate data, including irradiance and temperature values for more than 50 Indian cities. Climate data is cached locally for 30 days after the first data fetch, calculations run on the computer without a server or subscription.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Monthly estimates when bills are missing</h4>
            <p className="text-[13px] leading-[1.8] text-[#606b62]">
              If monthly use is not entered, the default estimate is based on panel count × panel wattage × 4.5 sunlight hours × 30 days × 80% efficiency. Monthly adjustments account for seasonal changes, such as a May factor of 1.10 and a December factor of 0.75.
            </p>
          </div>
        </div>
      </GuideSection>

      <GuideSection
        number="04"
        title="Create and review a proposal"
        intro="Choose Submit & Review to check the form calculate the results and prepare the customer PDF."
        image={{
          src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
          alt: 'Reviewing and finalizing a solar proposal document',
        }}
      >
        <div id="proposal-create" className="grid gap-8 lg:grid-cols-2">
          <div>
            <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Before it creates the proposal</h4>
            <p className="mb-3 text-[13px] leading-[1.8] text-[#606b62]">The form checks that required details are present and in the right format:</p>
            <ul className="list-disc space-y-2 pl-5 text-[13px] leading-[1.7] text-[#606b62]">
              <li>Customer name a selected panel brand, a selected inverter brand and a unit cost greater than zero.</li>
              <li>At least one panel and a numeric monthly use value.</li>
              <li>Phone number contains only digits with an optional & sign.</li>
              <li>Email address is valid when one is provided.</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">What happens next</h4>
            <ol className="space-y-3">
              {[
                ['1', 'Calculations run and the proposal gets a unique reference.'],
                ['2', 'Two charts are created generation versus use and a monthly breakdown.'],
                ['3', 'The full PDF is assembled with system cost monthly installation warranty and company details.'],
                ['4', 'You choose whether to save the proposal in the history database.'],
                ['5', 'The PDF opens for review printing or emailing.'],
              ].map(([number, text]) => <li key={number} className="flex gap-3 text-[13px] leading-[1.7] text-[#606b62]"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#e8ece3] text-[11px] font-bold text-[#244337]">{number}</span><span>{text}</span></li>)}
            </ol>
          </div>
        </div>
        <div className="mt-8 grid gap-8 border-t border-[#203a30]/10 pt-6 lg:grid-cols-2">
          <div>
            <h4 className="mb-2 text-[14px] font-bold text-[#203a30]">Proposal reference</h4>
            <p className="text-[13px] leading-[1.8] text-[#606b62]">The reference combines the first three letters of the customer name the date system size and a sequence number. For example <span className="font-mono text-[#203a30]">DIV-20261002-5kW-001</span>. The sequence increases when the same customer gets more than one proposal on the same day.</p>
          </div>
          <div>
            <h4 className="mb-2 text-[14px] font-bold text-[#203a30]">Save or continue without saving</h4>
            <p className="text-[13px] leading-[1.8] text-[#606b62]">If you save the proposal is stored in SQLite and appears in the history list. If you do not save the PDF is still created and opened but it will not appear in proposal history.</p>
          </div>
        </div>
      </GuideSection>

      <GuideSection
        number="05"
        title="Choose a PDF format"
        intro="Use the full proposal for a detailed presentation or the single-page version for a quick quote."
        image={{
          src: 'https://images.unsplash.com/photo-1586281380349-6327a109a2e8?auto=format&fit=crop&w=1200&q=80',
          alt: 'Proposal PDF formats and printed solar documents',
        }}
      >
        <div id="proposal-pdf" className="grid gap-10 lg:grid-cols-2">
          <div>
            <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Full proposal: six pages</h4>
            <ol className="divide-y divide-[#203a30]/10">
              {[
                ['1. Cover', 'Company branding, contact details, customer, date, reference and optional cover image.'],
                ['2. System specifications', 'Panel details such as brand, wattage, quantity, voltage and current inverter details such as brand, efficiency and MPPT range system capacity, DC overloading, structure, costs, GST, subsidy, net amount and company information. Major-client logos can also appear when enabled.'],
                ['3. Monthly summary', 'Monthly use and generation, grid use, solar used and exported, bill comparison and charts.'],
                ['4. Installation and warranty', 'Installation picture or diagram and the warranty terms from the company profile.'],
                ['5. System summary', 'System capacity, total cost, payback time, lifetime savings and optional major-client logos.'],
                ['6. Terms', 'Terms and conditions from the company profile, or the built-in defaults.'],
              ].map(([title, desc]) => <li key={title} className="py-3"><div className="text-[13px] font-semibold text-[#203a30]">{title}</div><p className="mt-1 text-[13px] leading-[1.7] text-[#606b62]">{desc}</p></li>)}
            </ol>
          </div>
          <div>
            <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Single-page proposal</h4>
            <p className="text-[13px] leading-[1.8] text-[#606b62]">A compact option for a quick quote, early discussion or sharing by WhatsApp. It has a green company-branded header and includes the company logo, customer and site details, date and reference, system specifications, cost, GST, subsidy, net amount, payback time, savings and generation.</p>
            <p className="mt-4 text-[13px] leading-[1.8] text-[#606b62]">You can also select a saved proposal in the history list and create its single-page version again.</p>
          </div>
        </div>
      </GuideSection>

      <GuideSection
        number="06"
        title="Find and update saved proposals"
        intro="The history list keeps saved proposals available when a customer asks a question or needs an updated quote."
        image={{
          src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
          alt: 'Saving and updating historical solar proposal records',
        }}
      >
        <div id="proposal-history" className="grid gap-10 lg:grid-cols-2">
          <dl className="divide-y divide-[#203a30]/10">
            {PROPOSAL_HISTORY_ACTIONS.map((action) => <div key={action.title} className="py-4"><dt className="text-[14px] font-bold text-[#203a30]">{action.title}</dt><dd className="mt-1 text-[13px] leading-[1.8] text-[#606b62]">{action.desc}</dd></div>)}
          </dl>
          <div className="border-l-2 border-[#8b6744] bg-[#f0ede6] px-5 py-4">
            <h4 className="mb-2 text-[14px] font-bold text-[#203a30]">Keep versions clear</h4>
            <p className="text-[13px] leading-[1.8] text-[#606b62]">Revisions are added as new records instead of overwriting the earlier proposal. A customer can ask to change the system size, price or equipment, and the original remains available for comparison. Deleting a history record is permanent, though its PDF file stays on the computer.</p>
          </div>
        </div>
      </GuideSection>

      <GuideSection
        number="07"
        title="Set up the company profile once"
        intro="Save company details once and reuse them across proposal documents. This keeps branding and contact information consistent."
        image={{
          src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
          alt: 'Company profile and branding for solar proposal templates',
        }}
      >
        <div id="proposal-company" className="grid gap-x-10 lg:grid-cols-2">
          {COMPANY_PROFILE_FIELDS.map(([title, desc]) => <div key={title} className="border-b border-[#203a30]/10 py-4"><h4 className="text-[13px] font-bold text-[#203a30]">{title}</h4><p className="mt-1 text-[13px] leading-[1.7] text-[#606b62]">{desc}</p></div>)}
        </div>
        <p className="mt-5 text-[13px] leading-[1.8] text-[#606b62]">The same company profile is also used by CRM for customer IDs and by Tracker for delivery challan PDFs.</p>
      </GuideSection>

      <GuideSection
        number="08"
        title="Prepare documents after the sale"
        intro="Create four Word documents from the selected proposal. Customer and system details carry over, so you do not have to enter them again."
        image={{
          src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
          alt: 'Final project handover and paperwork for a solar installation',
        }}
      >
        <div id="proposal-handover" className="grid gap-x-10 lg:grid-cols-2">
          {PROPOSAL_DOCUMENTS.map((document) => <article key={document.title} className="border-b border-[#203a30]/10 py-5"><h4 className="text-[14px] font-bold text-[#203a30]">{document.title}</h4><p className="mt-2 text-[13px] leading-[1.8] text-[#606b62]">{document.desc}</p></article>)}
        </div>
      </GuideSection>

      <GuideSection
        number="09"
        title="Continue the customer journey"
        intro="The proposal connects the first quote to installation, paperwork and customer records."
        image={{
          src: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
          alt: 'Solar project journey from proposal to installation and ongoing customer care',
        }}
      >
        <ol className="grid gap-0 md:grid-cols-2 xl:grid-cols-3">
          {[
            ['1. Create a proposal', 'Enter customer and equipment details, review the estimate and create the PDF.'],
            ['2. Customer accepts', 'Use Start Installation to open Tracker for the selected proposal.'],
            ['3. Track the work', 'Tracker records deliveries, payments and installation milestones.'],
            ['4. Complete the installation', 'Prepare the Work Completion Certificate for the customer to review and sign.'],
            ['5. Commission the system', 'Prepare the Commissioning Report when the system has been tested and started.'],
            ['6. Add the customer to CRM', 'Convert the proposal into a customer record. An ID may look like SSE-5KW-BHO-001.'],
          ].map(([title, desc]) => <li key={title} className="border-t border-[#203a30]/12 py-5 pr-6"><h4 className="text-[13px] font-bold text-[#203a30]">{title}</h4><p className="mt-2 text-[13px] leading-[1.8] text-[#606b62]">{desc}</p></li>)}
        </ol>
      </GuideSection>
    </section>
  );
}

const INSTALLATION_TRACKER_GUIDE = [
  {
    number: '01',
    title: 'Purpose and flow',
    intro: 'The Installation Tracker manages the actual site execution after the proposal is accepted. It keeps payment, site work, delivery logs, documents and handover in one place.',
    image: {
      src: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Project management dashboard for solar installation work',
    },
    content: (
      <div id="tracker-overview" className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <h4 className="mb-4 text-[13px] font-bold uppercase tracking-[0.12em] text-[#435348]">What this module does</h4>
          <dl className="divide-y divide-[#203a30]/10">
            {[
              ['Dashboard', 'Shows all projects, payment totals and recent work at a glance.'],
              ['Installations', 'Tracks one customer project from advance payment to final handover.'],
              ['Technicians', 'Assigns named teams to each site with progress updates.'],
              ['Documents', 'Stores and opens delivery challans and compliance reports.'],
            ].map(([label, desc]) => <div key={label} className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-4"><dt className="text-[13px] font-semibold text-[#203a30]">{label}</dt><dd className="text-[13px] leading-[1.7] text-[#606b62]">{desc}</dd></div>)}
          </dl>
        </div>
        <div>
          <h4 className="mb-4 text-[13px] font-bold uppercase tracking-[0.12em] text-[#435348]">Why it matters</h4>
          <p className="text-[14px] leading-[1.8] text-[#606b62]">
            Solar projects fail when payments, dispatches and site work are spread across notes and spreadsheets. The tracker brings each customer’s progress, invoices and material movement into one system.
          </p>
          <p className="mt-4 text-[14px] leading-[1.8] text-[#606b62]">
            That means the sales team, project team and customer support team all see the same status and the same proof for every step.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: '02',
    title: 'Dashboard and customer view',
    intro: 'The dashboard gives total project health while each customer view shows the exact payment, stage and document status for one job.',
    image: {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      alt: 'Customer installation dashboard with payment and progress data',
    },
    content: (
      <div id="tracker-dashboard" className="grid gap-6 xl:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Dashboard cards</h4>
          <ul className="space-y-2 text-[13px] leading-[1.7] text-[#606b62]">
            <li>• Total installations, completed jobs, in-progress work and total due values.</li>
            <li>• Stage-wise payment progress with advance, first, second and final milestones.</li>
            <li>• Recent installations table with customer name, total cost, paid, due and status.</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Customer preview</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">
            Selecting a customer reveals the total cost, amount paid, due amount, project percentage, panel brand, inverter brand, site status and assigned technician.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: '03',
    title: 'Payment and project milestones',
    intro: 'Every payment is tied to a stage so customer work and financial progress stay aligned with the actual installation flow.',
    image: {
      src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Invoice and payment tracking for solar project milestones',
    },
    content: (
      <div id="tracker-payments" className="grid gap-6 xl:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Payment tracking</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">
            Enter the amount received and the system recalculates the paid total, due amount and payment percentage. Entries stay in the payment history with date and time for proof.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Stage gates</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">
            Each stage unlocks only when the customer reaches the required payment threshold. This keeps the workflow honest and prevents work from getting marked complete too early.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: '04',
    title: 'Four installation stages',
    intro: 'The core of the module is a four-stage payment workflow that covers structure, equipment, BOS and final handover.',
    image: {
      src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Solar panel installation stages from foundation to completion',
    },
    content: (
      <div id="tracker-stages" className="grid gap-6 lg:grid-cols-2">
        {[
          ['Advance Payment 20%', 'Structure design, dispatch, install and RCC tasks begin once the advance is received.'],
          ['1st Installment 60%', 'Panels and inverter are dispatched, installed and recorded with proofs.'],
          ['2nd Installment 90%', 'Electrical BOS work, wiring and earthing get tracked with photos and challans.'],
          ['Final 100%', 'Metering, subsidy and final handover are completed before job closure.'],
        ].map(([title, desc]) => (
          <div key={title} className="border-t border-[#203a30]/12 pt-4">
            <h4 className="text-[13px] font-bold text-[#203a30]">{title}</h4>
            <p className="mt-2 text-[13px] leading-[1.7] text-[#606b62]">{desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: '05',
    title: 'Delivery challans and photo proof',
    intro: 'Every dispatch and task is backed by delivery challans, site photos and an audit trail so the work is visible and defensible.',
    image: {
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      alt: 'Delivery challan and site documentation for installation materials',
    },
    content: (
      <div id="tracker-docs" className="grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Delivery challans</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">
            Each dispatch creates a PDF with the customer details, item list, quantity, date and signature area. This acts as a proof of receiving material on site.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Before and after evidence</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">
            Before and after site photos can be uploaded for each task. A task cannot be marked complete without photo proof, reducing disputes and improving accountability.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: '06',
    title: 'Technicians, documents and inventory',
    intro: 'The tracker also manages installation crew assignment, compliance paperwork and live stock movement for panels, inverters and BOS kits.',
    image: {
      src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
      alt: 'Technicians and inventory coordination during a solar installation project',
    },
    content: (
      <div id="tracker-support" className="grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Technicians</h4>
          <ul className="space-y-2 text-[13px] leading-[1.7] text-[#606b62]">
            <li>• Add team members with skill area, city and work mode.</li>
            <li>• Assign technicians to each customer project.</li>
            <li>• Track work progress and notes with timestamps.</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Documents and inventory</h4>
          <ul className="space-y-2 text-[13px] leading-[1.7] text-[#606b62]">
            <li>• Generate Work Completion, Commissioning, SLD and BOM outputs.</li>
            <li>• Track material stock and reduce inventory automatically on dispatch.</li>
            <li>• Keep every customer file tied to the correct proposal and site records.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    number: '07',
    title: 'Customer handover',
    intro: 'The final step turns the tracked site into a live, monitored solar system with proof for the customer and compliance paperwork for the grid.',
    image: {
      src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
      alt: 'Final solar site handover and customer monitoring setup',
    },
    content: (
      <div id="tracker-handover" className="grid gap-6 lg:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Handover records</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">
            The system stores net metering, subsidy, monitoring credentials and final handover dates so the customer receives a complete and active installation history.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Customer benefit</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">
            The customer gets payment transparency, signed material proof, site evidence and a direct route to live generation monitoring after commissioning.
          </p>
        </div>
      </div>
    ),
  },
];

function InstallationTrackerGuide() {
  return (
    <section className="mt-20 border-t-2 border-[#244337] pt-12" aria-labelledby="tracker-guide-title">
      <div className="max-w-3xl pb-10">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b6744]">Installation Tracker / Customer purpose</p>
        <h2 id="tracker-guide-title" className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.02] text-[#203a30]">From accepted proposal to live solar handover</h2>
        <p className="mt-5 text-[15px] leading-[1.8] text-[#606b62]">
          After a proposal is approved, the Installation Tracker becomes the operating system for the actual project. It keeps payments, dispatches, site tasks, technician work and final handover records in one place.
        </p>
      </div>

      <nav aria-label="Installation tracker sections" className="mb-2 grid gap-x-6 gap-y-3 border-y border-[#203a30]/12 py-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['Purpose', 'tracker-overview'],
          ['Dashboard', 'tracker-dashboard'],
          ['Payments', 'tracker-payments'],
          ['Stages', 'tracker-stages'],
          ['Docs', 'tracker-docs'],
          ['Support', 'tracker-support'],
          ['Handover', 'tracker-handover'],
        ].map(([label, id]) => (
          <a key={id} href={`#${id}`} className="text-[13px] font-semibold text-[#435348] underline decoration-[#8b6744]/40 underline-offset-4 hover:text-[#244337]">
            {label}
          </a>
        ))}
      </nav>

      {INSTALLATION_TRACKER_GUIDE.map((section) => (
        <GuideSection
          key={section.number}
          number={section.number}
          title={section.title}
          intro={section.intro}
          image={section.image}
        >
          {section.content}
        </GuideSection>
      ))}
    </section>
  );
}

type WorkflowGuideSection = {
  number: string;
  title: string;
  intro: string;
  nav: string;
  image: { src: string; alt: string };
  content: ReactNode;
};

function WorkflowModuleGuide({
  eyebrow,
  title,
  description,
  navLabel,
  sections,
}: {
  eyebrow: string;
  title: string;
  description: string;
  navLabel: string;
  sections: WorkflowGuideSection[];
}) {
  return (
    <section className="mt-20 border-t-2 border-[#244337] pt-12" aria-label={title}>
      <div className="max-w-3xl pb-10">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b6744]">{eyebrow}</p>
        <h2 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.02] text-[#203a30]">{title}</h2>
        <p className="mt-5 text-[15px] leading-[1.8] text-[#606b62]">{description}</p>
      </div>

      <nav aria-label={navLabel} className="mb-2 grid gap-x-6 gap-y-3 border-y border-[#203a30]/12 py-5 sm:grid-cols-2 lg:grid-cols-4">
        {sections.map((section) => (
          <a key={section.number} href={`#${section.nav}`} className="text-[13px] font-semibold text-[#435348] underline decoration-[#8b6744]/40 underline-offset-4 hover:text-[#244337]">
            {section.nav}
          </a>
        ))}
      </nav>

      {sections.map((section) => (
        <GuideSection
          key={section.number}
          number={section.number}
          title={section.title}
          intro={section.intro}
          image={section.image}
        >
          {section.content}
        </GuideSection>
      ))}
    </section>
  );
}

const STRUCTURE_DESIGNER_SECTIONS: WorkflowGuideSection[] = [
  {
    number: '01',
    title: 'Link the design to a customer',
    intro: 'Start with a proposal-backed customer so the structure design and its engineering record stay tied to the right solar project.',
    nav: 'Customer link',
    image: {
      src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
      alt: 'Solar panels on a rooftop for a customer-linked structure design',
    },
    content: (
      <div id="structure-customer" className="grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Select the proposal</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">Choose a customer from the proposal-linked dropdown. When Structure Designer is opened from Installation Tracker Stage 1, the customer is preselected from the proposal reference.</p>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Use the matched equipment</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">The selected proposal supplies the panel brand and wattage, reducing re-entry and helping ensure the frame is designed for the actual module.</p>
        </div>
      </div>
    ),
  },
  {
    number: '02',
    title: 'Set system and structural inputs',
    intro: 'Panel dimensions, roof category, bracing and local wind conditions determine how the mounting frame must be engineered.',
    nav: 'Design inputs',
    image: {
      src: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
      alt: 'Solar array layout informing structure and orientation inputs',
    },
    content: (
      <div id="structure-inputs" className="grid gap-8 xl:grid-cols-2">
        {[
          ['System and structure', ['Panel type and wattage', 'Portrait or landscape orientation', 'Low, medium or high wind zone', 'RCC, old building, industrial or ground mount roof category', 'Moment frame, X-bracing or K-bracing']],
          ['Array geometry', ['Panel rows and columns', 'At least two supporting rafters', 'Front support height', 'Back support height', 'Panel layout and overall array area']],
        ].map(([title, rows]) => (
          <div key={title as string}>
            <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">{title as string}</h4>
            <ul className="space-y-2 text-[13px] leading-[1.7] text-[#606b62]">
              {(rows as string[]).map((row) => <li key={row} className="border-t border-[#203a30]/10 pt-2">{row}</li>)}
            </ul>
          </div>
        ))}
        <p className="xl:col-span-2 text-[13px] leading-[1.8] text-[#606b62]">The height difference determines tilt. Layout, panel orientation and wind zone affect sun exposure, frame dimensions and the strength required for the site.</p>
      </div>
    ),
  },
  {
    number: '03',
    title: 'Calculate and check structural safety',
    intro: 'Calculate combines the selected equipment, wind zone, roof type, geometry and support heights into an engineering summary.',
    nav: 'Calculations',
    image: {
      src: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&q=80',
      alt: 'Engineering review for a solar mounting structure',
    },
    content: (
      <div id="structure-calculation" className="overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <thead><tr className="border-b border-[#203a30]/20"><th className="py-3 pr-6 text-[11px] font-bold uppercase tracking-[0.12em] text-[#8b6744]">Output</th><th className="py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#8b6744]">Customer value</th></tr></thead>
          <tbody>
            {[
              ['System summary', 'Orientation, wind zone, layout, panel count, DC capacity and tilt angle.'],
              ['Structure sizing', 'Front and back heights, total area and estimated steel weight.'],
              ['Member schedule', 'Rafter, purlin and brace lengths and quantities for fabrication.'],
              ['Wind check', 'Wind pressure and force per leg compared with capacity, marked SAFE or FAIL.'],
            ].map(([label, text]) => <tr key={label} className="border-b border-[#203a30]/10 align-top"><th className="py-3 pr-6 text-[13px] font-semibold text-[#203a30]">{label}</th><td className="py-3 text-[13px] leading-[1.7] text-[#606b62]">{text}</td></tr>)}
          </tbody>
        </table>
        <p className="mt-5 text-[13px] leading-[1.8] text-[#606b62]">A FAIL result signals that the design needs review before construction. The calculation should be confirmed by the responsible engineer before fabrication or installation.</p>
      </div>
    ),
  },
  {
    number: '04',
    title: 'Review the 3D drawing and panel layout',
    intro: 'Explore the calculated structure before steel is purchased or cut, then refine the panel arrangement for the actual roof shape.',
    nav: '3D and layout',
    image: {
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      alt: 'Engineer reviewing solar structure drawings and panel layout',
    },
    content: (
      <div id="structure-drawing" className="grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Explore three views</h4>
          <ul className="space-y-2 text-[13px] leading-[1.7] text-[#606b62]">
            <li>Top view shows the panel array and dimensions.</li>
            <li>Side view shows support heights and tilt.</li>
            <li>Isometric view shows the complete frame in 3D.</li>
            <li>Rotate, zoom and pan to inspect the design.</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Fit irregular roofs</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">The panel layout canvas lets you add, move or remove panel rectangles, clear the layout, or auto-fill it from rows and columns. Generate the structural design from the final canvas positions to accommodate roof obstacles and unusual shapes.</p>
        </div>
      </div>
    ),
  },
  {
    number: '05',
    title: 'Confirm and save the design',
    intro: 'A calculation becomes part of the customer record only after it is confirmed.',
    nav: 'Save design',
    image: {
      src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
      alt: 'Project team confirming an engineered solar design',
    },
    content: (
      <div id="structure-confirm" className="grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Confirm Design</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">Save the panel specifications, geometry, steel schedule, wind check and bracing against the selected proposal. Confirmation displays the assigned customer and makes the design retrievable after the app is closed.</p>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">View Confirmed Design</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">Reload the saved design later to restore its inputs and regenerate the drawing. An unconfirmed calculation remains a working session and is not the permanent customer record.</p>
        </div>
      </div>
    ),
  },
  {
    number: '06',
    title: 'Check roof point load',
    intro: 'Use the dead-load calculation to understand how module weight is distributed across the frame supports.',
    nav: 'Roof load',
    image: {
      src: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Rooftop solar installation where panel and support loads must be checked',
    },
    content: (
      <div id="structure-load" className="grid gap-6 sm:grid-cols-3">
        {[
          ['Module weight', 'Panel count multiplied by the weight of each module.'],
          ['Support points', 'Rafter count multiplied by two support legs per rafter.'],
          ['Point load per leg', 'Total module weight divided by the number of support points.'],
        ].map(([title, text]) => <div key={title} className="border-t border-[#203a30]/12 pt-4"><h4 className="text-[13px] font-bold text-[#203a30]">{title}</h4><p className="mt-2 text-[13px] leading-[1.7] text-[#606b62]">{text}</p></div>)}
        <p className="sm:col-span-3 text-[13px] leading-[1.8] text-[#606b62]">Use this result with the selected building category and a qualified structural review, especially for older buildings.</p>
      </div>
    ),
  },
  {
    number: '07',
    title: 'Export the engineering report',
    intro: 'Export PDF creates a one-page A4 structure report after the design has been confirmed.',
    nav: 'Export report',
    image: {
      src: 'https://images.unsplash.com/photo-1586281380349-6327a109a2e8?auto=format&fit=crop&w=1200&q=80',
      alt: 'Printed engineering report for a solar mounting structure',
    },
    content: (
      <div id="structure-report" className="grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Included in the PDF</h4>
          <ul className="space-y-2 text-[13px] leading-[1.7] text-[#606b62]">
            <li>Unique SSR report reference and structural summary.</li>
            <li>Top, side and isometric drawing views.</li>
            <li>Roof category and member schedule.</li>
            <li>Foundation recommendation and SAFE / FAIL wind check.</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">A shared engineering record</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">The report can be shared with the fabrication contractor or retained for project documentation and approvals where required. It records the calculated design for review; it does not replace approval by the responsible engineer or local authority.</p>
        </div>
      </div>
    ),
  },
];

const CRM_SECTIONS: WorkflowGuideSection[] = [
  {
    number: '01',
    title: 'Keep customer records searchable',
    intro: 'CRM is the working customer record for installed and incoming solar projects, from contact information to current service status.',
    nav: 'Customer records',
    image: {
      src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Customer operations team reviewing solar client records',
    },
    content: (
      <div id="crm-records" className="grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Directory and search</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">Search by part of a customer name and open a directory row to load the customer workspace. The directory includes customer ID, name, capacity, location and status such as Active, Inactive, AMC Due or Under Service.</p>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Add and maintain records</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">Add customers with name, system capacity, installation date, location, contact, address and status. Select an existing record to update its details or remove it from CRM after confirmation.</p>
        </div>
        <div className="lg:col-span-2 border-l-2 border-[#8b6744] bg-[#f0ede6] px-5 py-4">
          <p className="text-[13px] leading-[1.8] text-[#606b62]">Manual records can include customers whose original projects were created before the Proposal Maker was used. Deleting a CRM record does not remove it from the separate Proposal or Tracker database.</p>
        </div>
      </div>
    ),
  },
  {
    number: '02',
    title: 'Import and export customer lists',
    intro: 'Move existing customer records in and out of CRM without retyping an entire spreadsheet.',
    nav: 'Import and export',
    image: {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      alt: 'Customer data spreadsheet prepared for CRM import and export',
    },
    content: (
      <div id="crm-import-export" className="grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Import from Excel</h4>
          <ol className="space-y-2 text-[13px] leading-[1.7] text-[#606b62]">
            <li>1. Choose an .xlsx or .xls file.</li>
            <li>2. Review detected columns and the import preview.</li>
            <li>3. Proceed and check imported, skipped, duplicate and error totals.</li>
          </ol>
          <p className="mt-3 text-[13px] leading-[1.8] text-[#606b62]">Column matching handles common alternatives such as Phone for Contact. Existing customers with the same name and phone are skipped as duplicates.</p>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Export selected customers</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">Select one or multiple customers and export their IDs, names, capacity, installation date, location, contact, address and status to Excel for field teams or reporting.</p>
        </div>
      </div>
    ),
  },
  {
    number: '03',
    title: 'Record service visits',
    intro: 'Build a dependable service history with the work performed, assigned technician and payment details for each visit.',
    nav: 'Service visits',
    image: {
      src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
      alt: 'Solar service technician documenting maintenance work at a customer site',
    },
    content: (
      <div id="crm-service" className="grid gap-6 xl:grid-cols-3">
        {[
          ['Visit details', 'Customer, service date, description of the work, technician and linked complaint when applicable.'],
          ['Billing', 'Bill amount, whether it is paid, payment mode and a transaction or cheque reference.'],
          ['History and export', 'Review service IDs, dates, work, bills and technicians. Export one customer or all service records to Excel.'],
        ].map(([title, text]) => <div key={title} className="border-t border-[#203a30]/12 pt-4"><h4 className="text-[13px] font-bold text-[#203a30]">{title}</h4><p className="mt-2 text-[13px] leading-[1.7] text-[#606b62]">{text}</p></div>)}
        <p className="xl:col-span-3 text-[13px] leading-[1.8] text-[#606b62]">A written visit history supports warranty questions, dispute resolution and decisions about annual maintenance renewal.</p>
      </div>
    ),
  },
  {
    number: '04',
    title: 'Raise and resolve complaints',
    intro: 'Give every reported issue a trackable record, an owner and an expected resolution date.',
    nav: 'Complaints',
    image: {
      src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
      alt: 'Customer support team assigning a solar service complaint',
    },
    content: (
      <div id="crm-complaints" className="grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Create a complaint</h4>
          <ol className="space-y-2 text-[13px] leading-[1.7] text-[#606b62]">
            <li>1. Describe the issue, with at least three characters.</li>
            <li>2. Assign an available technician or add a technician.</li>
            <li>3. Set and validate an expected close date.</li>
            <li>4. Save to create a complaint ID and Open status.</li>
          </ol>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Manage the complaint record</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">Review open complaints, edit the description, technician or expected date, and close resolved issues. Complaint history can include linked service records, be exported to Excel or formatted for printing.</p>
        </div>
      </div>
    ),
  },
  {
    number: '05',
    title: 'Schedule Annual Maintenance Contracts',
    intro: 'Turn an AMC agreement into a planned series of service visits that can be assigned and tracked.',
    nav: 'AMC scheduling',
    image: {
      src: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80',
      alt: 'Solar plant scheduled for recurring annual maintenance visits',
    },
    content: (
      <div id="crm-amc" className="grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Create the contract</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">Set the duration, contract cost, paid status, payment mode and visit frequency. CRM calculates the validity date and generates future visit dates from the schedule.</p>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Run the visit calendar</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">Review scheduled visits, assign a technician and mark completed work. Export or print the calendar, and review the customer&apos;s past and current contracts in AMC history.</p>
        </div>
        <div className="lg:col-span-2 grid gap-3 sm:grid-cols-3">
          {[
            ['Monthly', 'One visit each month'],
            ['Quarterly', 'Four visits per year'],
            ['Yearly', 'One annual visit'],
          ].map(([title, text]) => <div key={title} className="border-t border-[#203a30]/12 pt-3"><h4 className="text-[13px] font-bold text-[#203a30]">{title}</h4><p className="mt-1 text-[12px] leading-[1.7] text-[#606b62]">{text}</p></div>)}
        </div>
      </div>
    ),
  },
  {
    number: '06',
    title: 'Create GST invoices and record payments',
    intro: 'Prepare project, AMC or service invoices with customer, supply and tax details, then track the balance as payments arrive.',
    nav: 'Invoices',
    image: {
      src: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Solar project tax invoice and payment reconciliation',
    },
    content: (
      <div id="crm-invoices" className="grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Invoice details</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">Set invoice and due dates, project type, capacity, billing mode, supply type, place of supply, customer GSTIN, base amount, discount and additional charges. Add line items with HSN/SAC, quantity, rate and tax.</p>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">PDF and payment status</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">The invoice PDF includes company and customer details, project information, line items, tax summary, notes and payment terms. Record payments by mode and reference to update the paid amount, balance and Unpaid, Partial or Paid status.</p>
        </div>
        <p className="lg:col-span-2 text-[13px] leading-[1.8] text-[#606b62]">Invoice history can be reviewed across customers or filtered to one customer, then opened to view or regenerate its PDF.</p>
      </div>
    ),
  },
  {
    number: '07',
    title: 'Keep an activity audit trail',
    intro: 'CRM records actions with timestamps so teams can understand what changed, when it changed and which customer it affected.',
    nav: 'Activity tracking',
    image: {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      alt: 'CRM activity audit log with customer, module and status data',
    },
    content: (
      <div id="crm-audit" className="grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">What the log records</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">Each row includes track ID, date, customer ID, module, action, success or failure status and notes. Logged areas include customers, service, complaints, AMC, invoices, payments and imports.</p>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Find and share activity</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">Filter the audit history by customer, module or date range, refresh the results and export the log to Excel for review.</p>
        </div>
      </div>
    ),
  },
];

const CUSTOMER_360_SECTIONS: WorkflowGuideSection[] = [
  {
    number: '01',
    title: 'See the customer at a glance',
    intro: 'Customer 360 is the Customers workspace inside CRM, not a separate record system. It brings the key installation facts into one view.',
    nav: 'Overview',
    image: {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      alt: 'Customer 360 dashboard bringing solar project information together',
    },
    content: (
      <div id="customer360-overview" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Plant capacity', 'Installed system size in kW.'],
          ['Customer status', 'Current operating or service status.'],
          ['Panel module', 'Panel brand matched from proposal data.'],
          ['Structure design', 'Installation type associated with the project.'],
        ].map(([title, text]) => <div key={title} className="border-t-2 border-[#244337] pt-4"><h4 className="text-[13px] font-bold text-[#203a30]">{title}</h4><p className="mt-2 text-[13px] leading-[1.7] text-[#606b62]">{text}</p></div>)}
      </div>
    ),
  },
  {
    number: '02',
    title: 'Review the customer profile and take action',
    intro: 'Selecting a customer fills the profile with identifying, installation and contact information alongside common service actions.',
    nav: 'Profile and actions',
    image: {
      src: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
      alt: 'Customer operations team reviewing a solar customer profile',
    },
    content: (
      <div id="customer360-profile" className="grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Customer command view</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">Review the customer&apos;s name, capacity, installation date, location, contact, address and status without searching through separate windows.</p>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Three direct actions</h4>
          <ul className="space-y-2 text-[13px] leading-[1.7] text-[#606b62]">
            <li><strong className="text-[#203a30]">Update Status</strong> to reflect the current customer situation.</li>
            <li><strong className="text-[#203a30]">Raise Complaint</strong> to create a tracked issue.</li>
            <li><strong className="text-[#203a30]">Add Service</strong> to move into service management.</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    number: '03',
    title: 'Identify installed equipment',
    intro: 'Panel and inverter information is matched from the customer’s proposal so the team can identify installed equipment quickly.',
    nav: 'Equipment',
    image: {
      src: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
      alt: 'Solar modules representing equipment linked to a customer proposal',
    },
    content: (
      <div id="customer360-equipment" className="grid gap-6 lg:grid-cols-2">
        {[
          ['Panel tile', 'Brand logo or initials, brand name, product type, wattage, quantity and plant capacity.'],
          ['Inverter tile', 'Brand logo or initials, brand name, product type, model details and quantity.'],
        ].map(([title, text]) => <div key={title} className="border-t border-[#203a30]/12 pt-4"><h4 className="text-[14px] font-bold text-[#203a30]">{title}</h4><p className="mt-2 text-[13px] leading-[1.8] text-[#606b62]">{text}</p></div>)}
        <div className="lg:col-span-2 border-l-2 border-[#8b6744] bg-[#f0ede6] px-5 py-4">
          <h4 className="mb-2 text-[13px] font-bold text-[#203a30]">How records are matched</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">The lookup prioritizes proposal ID, then phone number, customer name and capacity. Brand marks load from local logo assets when available, with initials as a fallback.</p>
        </div>
      </div>
    ),
  },
  {
    number: '04',
    title: 'Preview the installation type',
    intro: 'A project image helps the team understand the site setup before planning a service visit or dispatching a technician.',
    nav: 'Structure preview',
    image: {
      src: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
      alt: 'Solar installation type preview for a customer site',
    },
    content: (
      <div id="customer360-structure" className="grid gap-8 lg:grid-cols-2">
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Site setup context</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">The structure preview uses the installation type image associated with the matched proposal, with a caption for installation type, structure type and proposal reference.</p>
        </div>
        <div>
          <h4 className="mb-3 text-[14px] font-bold text-[#203a30]">Useful before a visit</h4>
          <p className="text-[13px] leading-[1.8] text-[#606b62]">Rooftop RCC, ground-mount and sloped-roof systems each have different access and mounting context. A visual cue helps field teams arrive prepared for the expected installation.</p>
        </div>
      </div>
    ),
  },
  {
    number: '05',
    title: 'Load the full picture on selection',
    intro: 'Customer selection refreshes profile information, summary metrics, matched equipment, structure image and available actions together.',
    nav: 'Refresh and benefits',
    image: {
      src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
      alt: 'Solar support team coordinating customer installation information',
    },
    content: (
      <div id="customer360-refresh" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['One-click view', 'See core project details without switching modules.'],
          ['Linked equipment', 'Use proposal data to identify panel and inverter brands.'],
          ['Installation visual', 'Give technicians context about the site structure.'],
          ['Fast service actions', 'Update status, raise a complaint or add a service record.'],
        ].map(([title, text]) => <div key={title} className="border-t border-[#203a30]/12 pt-4"><h4 className="text-[13px] font-bold text-[#203a30]">{title}</h4><p className="mt-2 text-[13px] leading-[1.7] text-[#606b62]">{text}</p></div>)}
      </div>
    ),
  },
];

function StructureDesignerGuide() {
  return <WorkflowModuleGuide eyebrow="Structure Designer / Customer purpose" title="Engineer the mounting structure before installation" description="Link the design to the customer proposal, calculate a site-specific mounting frame, review its wind and roof checks, then save and share the engineering record." navLabel="Structure Designer guide sections" sections={STRUCTURE_DESIGNER_SECTIONS} />;
}

function CRMGuide() {
  return <WorkflowModuleGuide eyebrow="CRM / Customer operations" title="Manage the customer relationship after the proposal" description="Keep customer records, service visits, complaints, maintenance schedules, invoices and activity history connected in one operational workspace." navLabel="CRM guide sections" sections={CRM_SECTIONS} />;
}

function Customer360Guide() {
  return <WorkflowModuleGuide eyebrow="Customer 360 / CRM Customers workspace" title="See the complete customer installation in one view" description="Customer 360 brings project capacity, customer status, equipment brands, installation type and common service actions together as soon as a customer is selected." navLabel="Customer 360 guide sections" sections={CUSTOMER_360_SECTIONS} />;
}

export default function WorkflowPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [dir, setDir] = useState<'next' | 'prev'>('next');

  function go(next: number) {
    if (animating) return;
    setDir(next > activeIdx ? 'next' : 'prev');
    setAnimating(true);
    setTimeout(() => { setActiveIdx(next); setAnimating(false); }, 350);
  }

  const mod = MODULES[activeIdx];
  const Icon = mod.icon;

  return (
    <div className="min-h-screen bg-[#f7f7f2]">
      <Header />

      {/* Page Hero */}
      <div className="pt-[76px] border-b border-[#203a30]/8 bg-[#f7f7f2]">
        <div className="w-[min(82rem,calc(100%-2.5rem))] mx-auto py-20">
          <div className="inline-flex items-center gap-2 mb-6 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b6744]">
            <span className="h-px w-6 bg-[#8b6744]" /> Platform Workflow
          </div>
          <h1 className="mb-5 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-[0.99] tracking-[-0.04em] text-[#203a30]">
            Five modules.<br />
            <span className="italic text-[#8b6744]">One connected platform.</span>
          </h1>
          <p className="max-w-xl text-[16px] leading-[1.8] text-[#606b62] md:text-[17px]">
            Walk through each module to see how Sollvian covers every stage of your solar operation.
          </p>
        </div>
      </div>

      {/* Module Navigation Pills */}
      <div className="sticky top-[76px] z-40 bg-[#f7f7f2]/95 backdrop-blur-md border-b border-[#203a30]/8">
        <div className="w-[min(82rem,calc(100%-2.5rem))] mx-auto py-3 flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {MODULES.map((m, i) => {
            const MIcon = m.icon;
            return (
              <button
                key={m.num}
                onClick={() => go(i)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full shrink-0 transition-all text-[13px] font-bold ${
                  activeIdx === i
                    ? 'bg-[#244337] text-white shadow-md'
                    : 'bg-white border border-[#203a30]/10 text-[#5a6b5e] hover:border-[#244337]/30 hover:text-[#244337]'
                }`}
              >
                <MIcon className="w-4 h-4" />
                {m.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Module Content */}
      <main className="w-[min(82rem,calc(100%-2.5rem))] mx-auto py-16">
        <div className={`transition-all duration-350 ${animating ? `opacity-0 ${dir === 'next' ? '-translate-x-4' : 'translate-x-4'}` : 'opacity-100 translate-x-0'}`}>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 xl:gap-20 items-start">

            {/* Left — Text */}
            <div>
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#203a30]/10 bg-[#e8ece3]">
                  <Icon className="h-7 w-7 text-[#244337]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b6744]">Module {mod.num}</div>
                  <h2 className="font-serif text-[clamp(2rem,3vw,2.8rem)] leading-[1.06] tracking-[-0.03em] text-[#203a30]">{mod.title}</h2>
                </div>
              </div>

              <p className="mb-4 text-[16px] font-semibold leading-[1.7] text-[#8b6744]">{mod.summary}</p>
              <p className="mb-10 text-[15px] leading-[1.8] text-[#606b62]">{mod.detail}</p>

              <div className="space-y-3 mb-10">
                {mod.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-[#203a30]/8 hover:border-[#244337]/25 hover:shadow-sm transition-all">
                    <CheckCircle2 className="w-5 h-5 text-[#244337] shrink-0 mt-0.5" />
                    <div>
                      <div className="mb-1 text-[14px] font-bold text-[#203a30]">{f.title}</div>
                      <div className="text-sm leading-relaxed text-[#606b62]">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

    
            </div>

            {/* Right — Video */}
            <div className="sticky top-[140px]">
              <div className="rounded-3xl overflow-hidden border border-[#203a30]/10 bg-white shadow-[0_20px_60px_-20px_rgba(31,58,48,0.2)]">
                {/* Fake browser bar */}
                <div className="flex items-center gap-2 px-4 h-10 bg-[#f0ede6] border-b border-[#203a30]/8">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c97d5e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c9b05e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#829b78]" />
                  <span className="ml-2 text-[10px] font-mono text-[#7b8b7e] flex-1 text-center truncate">
                    sollvian.io/{mod.title.toLowerCase().replace(/\s+/g, '-')}
                  </span>
                </div>
                <div className="aspect-[4/3] bg-[#e8ece3] relative overflow-hidden">
                  <video
                    key={mod.video}
                    src={mod.video}
                    autoPlay loop muted playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Prev/Next navigation */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => go((activeIdx - 1 + MODULES.length) % MODULES.length)}
                  className="flex items-center gap-2 rounded-full border border-[#203a30]/15 bg-white px-5 py-2.5 text-[13px] font-bold text-[#5a6b5e] transition-all hover:border-[#244337]/30 hover:text-[#244337]"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span className="text-[#7b8b7e] text-sm font-medium">{activeIdx + 1} / {MODULES.length}</span>
                <button
                  onClick={() => go((activeIdx + 1) % MODULES.length)}
                  className="flex items-center gap-2 rounded-full bg-[#244337] px-5 py-2.5 text-[13px] font-bold text-white shadow-md transition-all hover:bg-[#315844]"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {activeIdx === 0 && <ProposalGuide />}
        {activeIdx === 1 && <InstallationTrackerGuide />}
        {activeIdx === 2 && <StructureDesignerGuide />}
        {activeIdx === 3 && <CRMGuide />}
        {activeIdx === 4 && <Customer360Guide />}
      </main>

      <Footer />
    </div>
  );
}