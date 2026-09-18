import { SectionHeader } from './Research';
import awards from '../data/awards.json';

interface Award { slug: string; title: string; org?: string; year?: string; desc?: string; }

export default function Awards() {
  return (
    <section id="awards" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)' }}>
      <SectionHeader label="RECOGNITION" title="Awards & Achievements" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.85rem' }}>
        {(awards as Award[]).map((a) => (
          <div
            key={a.slug}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              padding: '1.1rem 1.25rem',
              display: 'flex',
              gap: '0.85rem',
              alignItems: 'flex-start',
            }}
          >
            <span style={{ color: 'var(--gold)', fontSize: 'var(--fs-xl)', flexShrink: 0 }}>★</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'var(--fs-md)', color: 'var(--text)', margin: '0 0 0.2rem' }}>{a.title}</p>
              {a.org && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', margin: '0 0 0.35rem' }}>{a.org}</p>}
              {a.desc && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', margin: '0 0 0.35rem', lineHeight: 1.55 }}>{a.desc}</p>}
              {a.year && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-2xs)', color: 'var(--accent)', background: 'var(--accent-bg)', padding: '1px 7px', borderRadius: '3px' }}>{a.year}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
