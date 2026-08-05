import React from 'react';
import publications from '../data/publications.json';
import { SectionHeader } from './Research';

interface Publication {
  id: string;
  authors: string;
  title: string;
  venue: string;
  status: string;
  year: string;
  keyResults: string[];
  links: { label: string; href: string }[];
  note?: string;
}

export default function Publications() {
  const pubs = publications as Publication[];
  return (
    <section id="publications" className="sec">
      <SectionHeader title="Publications" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {pubs.map(p => {
          const primary = p.links[0];
          return (
            <div key={p.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.4rem 1.6rem' }}>
              <h3 style={{ margin: '0 0 0.4rem', lineHeight: 1.4 }}>
                <a href={primary?.href} target="_blank" rel="noreferrer"
                  style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.15rem', color: 'var(--text)', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text)')}>{p.title}</a>
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', margin: '0 0 0.3rem' }}>{p.authors}</p>
              <p style={{ fontSize: '0.85rem', fontStyle: 'italic', fontFamily: 'var(--serif)', color: 'var(--text-muted)', margin: 0 }}>{p.venue} · {p.status}</p>
              <ul style={{ margin: '0.9rem 0 0', paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {p.keyResults.map((k, i) => (
                  <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{k}</li>
                ))}
              </ul>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '1.1rem' }}>
                {p.links.map(l => <a key={l.label} className="chip" href={l.href} target="_blank" rel="noreferrer">{l.label}</a>)}
                {p.note && <span className="chip chip-gold">{p.note}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
