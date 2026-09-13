const PRODUCTS = [
  {
    num: '01',
    title: 'Proposal & ROI',
    summary: 'Customized proposals for unique business needs, with the return made visible.',
    detail:
      'We gather the site, the buyer, and the numbers that have to survive after the signature. The document that goes out is specific enough to build from.',
  },
  {
    num: '02',
    title: 'Installation Tracking',
    summary: 'Real-time tracking for smooth and timely installations.',
    detail:
      'Crews, sites, and blockers sit on one timeline. A slip is visible the morning it happens, not the week the customer asks.',
  },
  {
    num: '03',
    title: 'Structure Design',
    summary: 'Scalable solar structure design for every site.',
    detail:
      'Each site gets a structure that fits the ground, the load, and the install plan — not a reused drawing from the last job.',
  },
  {
    num: '04',
    title: 'CRM',
    summary: 'Stronger relationships. Better engagement. Greater growth.',
    detail:
      'Notes, next actions, and the last promise live together. The account view is what a person would say if you asked how the work is going.',
  },
  {
    num: '05',
    title: 'Customer 360°',
    summary: 'A complete view. Personalized experiences. Loyal customers.',
    detail:
      'Contracts, tickets, installs, and usage fold into one picture. Support does not start from a blank page.',
  },
];

export default function ProductSection() {
  return (
    <section className="product" id="product">
      <div className="section-inner">
        <p className="eyebrow">Product</p>
        <h2>Five systems. One operating picture.</h2>
        <p className="section-copy">
          The same five nodes from the Sollvian AI Tech hub, written so a buyer
          can actually use them.
        </p>

        <div className="cards">
          {PRODUCTS.map((p) => (
            <article className="card" key={p.num}>
              <p className="card-num">{p.num}</p>
              <h3>{p.title}</h3>
              <p className="card-summary">{p.summary}</p>
              <p className="pill">In the hub</p>
              <p className="card-detail">{p.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
