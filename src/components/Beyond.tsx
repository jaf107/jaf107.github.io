import React from 'react';
import { SectionHeader } from './Research';

interface SimpleGroup { label: string; items: string[]; }
interface Pursuit {
  label: string;
  title: string;
  items?: string[];
  groups?: SimpleGroup[];
}

const pursuits: Pursuit[] = [
  {
    label: 'GAMES',
    title: 'Mind & Social',
    items: ['Mafia', 'Monopoly Deal', 'Uno No Mercy', 'Puzzles', 'Interactive party games'],
  },
  {
    label: 'GAMING',
    title: 'Valorant',
    items: ['Occasional', 'With friends', 'Duelist main'],
  },
  {
    label: 'WATCHING',
    title: 'TV & Cinema',
    groups: [
      { label: 'Marvel',   items: ['Phase 1 → 4'] },
      { label: 'DC',       items: ['Batman', 'Peacemaker'] },
      { label: 'HBO',      items: ['Game of Thrones', 'House of the Dragon'] },
      { label: 'Sitcoms',  items: ['The Office', 'Brooklyn 99', 'HIMYM', 'Big Bang Theory'] },
    ],
  },
];

const STATEMENT = "When not shipping code, I'm deep in a game of Mafia, watching too many episodes of something, or occasionally fragging with friends on Valorant.";

function Chip({ text }: { text: string }) {
  return (
    <span style={{
      fontFamily: 'DM Sans, sans-serif',
      fontSize: '0.8rem',
      color: 'var(--text-mid)',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '5px',
      padding: '3px 10px',
      whiteSpace: 'nowrap',
    }}>{text}</span>
  );
}

export default function Beyond() {
  return (
    <section id="beyond" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)', background: 'var(--bg)' }}>
      <SectionHeader label="OFF-DUTY" title="Beyond Code" />

      <p style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '1.05rem',
        color: 'var(--text-mid)',
        maxWidth: '640px',
        margin: '0 0 3rem',
        lineHeight: 1.75,
        fontWeight: 300,
      }}>{STATEMENT}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2.5rem 2rem', alignItems: 'start' }}>
        {pursuits.map(p => (
          <div key={p.label}>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.12em', margin: '0 0 0.3rem' }}>{p.label}</p>
            <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)', margin: '0 0 1rem' }}>{p.title}</h3>

            {p.items && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {p.items.map(item => <Chip key={item} text={item} />)}
              </div>
            )}

            {p.groups && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {p.groups.map(g => (
                  <div key={g.label}>
                    <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', color: 'var(--text-dim)', letterSpacing: '0.08em', margin: '0 0 0.35rem' }}>{g.label}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {g.items.map(item => <Chip key={item} text={item} />)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
