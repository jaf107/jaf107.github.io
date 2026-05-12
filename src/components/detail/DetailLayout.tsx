import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav';
import Footer from '../Footer';
import { TechIcon } from '../TechIcon';

export interface DetailSection {
  h: string;
  body: string;
}

export interface DetailLink {
  label: string;
  href: string;
}

export interface DetailMetaItem {
  label: string;
  value: string;
}

export interface DetailLayoutProps {
  category?: string;
  year?: string;
  badge?: string;
  badgeIcon?: string;
  title: string;
  subtitle?: string;
  headline?: string;
  description?: string;
  sections?: DetailSection[];
  techIcons?: string[];
  images?: string[];
  metaItems?: DetailMetaItem[];
  links?: DetailLink[];
  backLabel?: string;
}

function isExternal(href: string) {
  return /^https?:\/\//i.test(href);
}

function LinkButton({ link, variant }: { link: DetailLink; variant: 'hero' | 'sidebar' }) {
  const external = isExternal(link.href);
  const heroStyle: React.CSSProperties = {
    fontFamily: 'DM Mono, monospace',
    fontSize: '0.78rem',
    color: 'var(--accent)',
    border: '1px solid var(--accent)',
    background: 'transparent',
    padding: '10px 18px',
    borderRadius: '6px',
    textDecoration: 'none',
    letterSpacing: '0.04em',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    whiteSpace: 'nowrap',
  };
  const sidebarStyle: React.CSSProperties = {
    fontFamily: 'DM Mono, monospace',
    fontSize: '0.78rem',
    color: 'var(--accent)',
    border: '1px solid var(--accent)',
    background: 'transparent',
    padding: '8px 14px',
    borderRadius: '6px',
    textDecoration: 'none',
    letterSpacing: '0.04em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.4rem',
    width: '100%',
  };

  return (
    <a
      href={link.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      style={variant === 'hero' ? heroStyle : sidebarStyle}
    >
      <span>{link.label}</span>
      <span aria-hidden="true">→</span>
    </a>
  );
}

function MetaRow({ category, year, badge, badgeIcon }: Pick<DetailLayoutProps, 'category' | 'year' | 'badge' | 'badgeIcon'>) {
  if (!category && !year && !badge) {
    return null;
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
      {category && (
        <span style={{
          fontFamily: 'DM Mono, monospace', fontSize: '0.68rem',
          color: 'var(--accent)', background: 'var(--accent-bg)',
          padding: '3px 8px', borderRadius: '3px', letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>{category}</span>
      )}
      {year && (
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: 'var(--text-dim)' }}>{year}</span>
      )}
      {badge && (
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: '#c89b00', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
          <span aria-hidden="true">{badgeIcon ?? '★'}</span>
          {badge}
        </span>
      )}
    </div>
  );
}

function Section({ section }: { section: DetailSection }) {
  return (
    <article style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '10px',
      padding: '1.4rem 1.5rem',
      position: 'relative',
    }}>
      <h3 style={{
        fontFamily: 'DM Sans, sans-serif',
        fontWeight: 700,
        fontSize: '0.95rem',
        color: 'var(--text)',
        margin: '0 0 0.7rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.55rem',
      }}>
        <span aria-hidden="true" style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: 'var(--accent)', flexShrink: 0,
        }} />
        {section.h}
      </h3>
      <p style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.92rem',
        color: 'var(--text-muted)',
        lineHeight: 1.75,
        margin: 0,
        overflowWrap: 'anywhere',
      }}>{section.body}</p>
    </article>
  );
}

function StackPanel({ items }: { items: DetailMetaItem[] }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '10px',
      padding: '1rem 1.1rem',
    }}>
      <p style={{
        fontFamily: 'DM Mono, monospace', fontSize: '0.68rem',
        color: 'var(--accent)', letterSpacing: '0.12em',
        margin: '0 0 0.75rem',
      }}>STACK</p>
      <dl style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', margin: 0 }}>
        {items.map(item => (
          <div key={item.label}>
            <dt style={{
              fontFamily: 'DM Mono, monospace', fontSize: '0.62rem',
              color: 'var(--text-dim)', letterSpacing: '0.08em',
              textTransform: 'uppercase', marginBottom: '2px',
            }}>{item.label}</dt>
            <dd style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem',
              color: 'var(--text-mid)', margin: 0, lineHeight: 1.5,
              overflowWrap: 'anywhere',
            }}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function LinksPanel({ links }: { links: DetailLink[] }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '10px',
      padding: '1rem 1.1rem',
    }}>
      <p style={{
        fontFamily: 'DM Mono, monospace', fontSize: '0.68rem',
        color: 'var(--accent)', letterSpacing: '0.12em',
        margin: '0 0 0.75rem',
      }}>LINKS</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {links.map(l => (
          <LinkButton key={l.label + l.href} link={l} variant="sidebar" />
        ))}
      </div>
    </div>
  );
}

function ImageGallery({ images }: { images: string[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: '1rem',
      marginTop: '0.5rem',
    }}>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          style={{
            width: '100%',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            objectFit: 'cover',
            aspectRatio: '4/3',
          }}
        />
      ))}
    </div>
  );
}

export default function DetailLayout(props: DetailLayoutProps) {
  const {
    category, year, badge, badgeIcon,
    title, subtitle, headline,
    description, sections, techIcons, images,
    metaItems, links,
    backLabel = 'BACK',
  } = props;

  const navigate = useNavigate();
  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate('/');
  };

  const hasMetaItems = !!(metaItems && metaItems.length > 0);
  const hasLinks = !!(links && links.length > 0);
  const hasSidebar = hasMetaItems || hasLinks;
  const hasSections = !!(sections && sections.length > 0);
  const hasImages = !!(images && images.length > 0);
  const hasTech = !!(techIcons && techIcons.length > 0);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />

      <div style={{
        paddingTop: '64px',
        padding: '64px clamp(1.5rem, 10vw, 12rem) 0',
        borderBottom: '1px solid var(--border)',
      }}>
        <button
          onClick={goBack}
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.78rem',
            color: 'var(--accent)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.06em',
            padding: '1.25rem 0',
          }}
        >
          ← {backLabel}
        </button>
      </div>

      <main style={{
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 10vw, 12rem)',
        flex: 1,
      }}>
        {/* Hero */}
        <header style={{ marginBottom: '2.5rem', maxWidth: '1100px' }}>
          <MetaRow category={category} year={year} badge={badge} badgeIcon={badgeIcon} />
          <h1 style={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: 'var(--text)',
            margin: '0 0 0.4rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            overflowWrap: 'anywhere',
          }}>{title}</h1>
          {subtitle && (
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              margin: '0 0 1.5rem',
              overflowWrap: 'anywhere',
            }}>{subtitle}</p>
          )}
          {headline && (
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderLeft: '3px solid var(--accent)',
              borderRadius: '8px',
              padding: '1rem 1.25rem',
              marginBottom: hasTech || hasLinks ? '1.5rem' : 0,
            }}>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.95rem',
                color: 'var(--text-mid)',
                margin: 0,
                lineHeight: 1.7,
                overflowWrap: 'anywhere',
              }}>{headline}</p>
            </div>
          )}
          {hasTech && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.7rem',
              alignItems: 'center',
              marginTop: headline ? '0' : '1rem',
              marginBottom: hasLinks ? '1.5rem' : 0,
            }}>
              {techIcons.map(t => <TechIcon key={t} name={t} size={26} />)}
            </div>
          )}
          {hasLinks && (
            <div className="detail-hero-cta-mobile" style={{
              gap: '0.6rem',
              flexWrap: 'wrap',
              marginTop: '0.5rem',
            }}>
              {links.map(l => <LinkButton key={l.label + l.href} link={l} variant="hero" />)}
            </div>
          )}
        </header>

        {/* Body grid */}
        <div className="detail-grid">
          <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {description && (
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                margin: 0,
                overflowWrap: 'anywhere',
              }}>{description}</p>
            )}
            {hasSections && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {sections.map((s, i) => <Section key={i} section={s} />)}
              </div>
            )}
            {hasImages && <ImageGallery images={images} />}
          </div>

          {hasSidebar && (
            <aside className="detail-sidebar">
              {hasMetaItems && <StackPanel items={metaItems} />}
              {hasLinks && <LinksPanel links={links} />}
            </aside>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
