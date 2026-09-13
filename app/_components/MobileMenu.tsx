'use client';

interface NavLink { label: string; href: string; }
interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className={`menu${open ? ' is-open' : ''}`} aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div className="menu-backdrop" onClick={onClose} />

      {/* Slide panel */}
      <aside className="menu-panel">
        <button className="menu-close" onClick={onClose} aria-label="Close menu">
          ×
        </button>

        <p className="eyebrow">On this page</p>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          One horizontal line. Three stops.
        </p>

        <div className="menu-list">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="menu-link"
              onClick={onClose}
            >
              <span className="menu-num">0{i + 1}</span>
              {link.label}
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
}
