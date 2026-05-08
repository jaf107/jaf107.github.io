import { useState } from 'react';
import { SectionHeader } from './Research';
import { useTheme } from '../context/ThemeContext';
import skillsData from '../data/skills.json';
import { SKILL_ICONS, resolveIconUrl } from '../data/skillIcons';

const RESEARCH_KEY = 'Research Methods';
const categories = Object.keys(skillsData).filter(k => k !== RESEARCH_KEY) as (keyof typeof skillsData)[];
const researchMethods = (skillsData as Record<string, string[]>)[RESEARCH_KEY] ?? [];

function SkillTile({ name }: { name: string }) {
  const [hovered, setHovered] = useState(false);
  const { dark } = useTheme();
  const icon = SKILL_ICONS[name];
  const iconUrl = icon?.src ? resolveIconUrl(icon.src) : null;
  const iconFilter = icon?.invertOnDark && dark ? 'brightness(0) invert(1)' : undefined;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        width: '80px',
        padding: '0.75rem 0.5rem',
        background: 'var(--surface)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '10px',
        cursor: 'default',
        transition: 'all 0.15s',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {iconUrl ? (
          <img
            src={iconUrl}
            alt={name}
            width={40}
            height={40}
            style={{ objectFit: 'contain', opacity: hovered ? 1 : 0.85, transition: 'opacity 0.15s', filter: iconFilter }}
          />
        ) : (
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: hovered ? 'var(--accent)' : 'var(--text-dim)', lineHeight: 1 }}>/&gt;</span>
        )}
      </div>
      <span style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.68rem',
        color: hovered ? 'var(--accent)' : 'var(--text-muted)',
        textAlign: 'center',
        lineHeight: 1.2,
        transition: 'color 0.15s',
        maxWidth: '72px',
        wordBreak: 'break-word',
      }}>{name}</span>
    </div>
  );
}

function CategoryRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <p style={{
        fontFamily: 'DM Mono, monospace',
        fontSize: '0.65rem',
        color: 'var(--accent)',
        letterSpacing: '0.1em',
        margin: 0,
      }}>{label.toUpperCase()}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
        {items.map(name => <SkillTile key={name} name={name} />)}
      </div>
    </div>
  );
}

const PILL_LABELS = ['All', ...categories];

export default function Skills() {
  const [active, setActive] = useState('All');
  const visibleCategories = active === 'All' ? categories : categories.filter(c => c === active);

  return (
    <section id="skills" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)', background: 'var(--bg)' }}>
      <SectionHeader label="TECHNICAL" title="Skills" />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '2.5rem' }}>
        {PILL_LABELS.map(label => (
          <button
            key={label}
            onClick={() => setActive(label)}
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.06em',
              padding: '5px 14px',
              borderRadius: '20px',
              border: `1px solid ${active === label ? 'var(--accent)' : 'var(--border)'}`,
              background: active === label ? 'var(--accent-bg)' : 'var(--surface)',
              color: active === label ? 'var(--accent)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >{label.toUpperCase()}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {visibleCategories.map(cat => (
          <CategoryRow
            key={cat}
            label={cat}
            items={(skillsData as Record<string, string[]>)[cat]}
          />
        ))}
      </div>

      {researchMethods.length > 0 && (
        <div style={{ marginTop: '2.5rem' }}>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.1em', margin: '0 0 0.75rem' }}>RESEARCH METHODS</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {researchMethods.map(m => (
              <span key={m} style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.8rem',
                color: 'var(--text-mid)',
                background: 'var(--surface)',
                padding: '5px 12px',
                borderRadius: '6px',
                border: '1px solid var(--border)',
              }}>{m}</span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
