import { useState } from 'react';
import { SectionHeader } from './Research';
import skillsData from '../data/skills.json';
import { SKILL_ICONS, resolveIconUrl } from '../data/skillIcons';

const RESEARCH_KEY = 'Research Methods';
const categories = Object.keys(skillsData).filter(k => k !== RESEARCH_KEY) as (keyof typeof skillsData)[];
const researchMethods = (skillsData as Record<string, string[]>)[RESEARCH_KEY] ?? [];

// Tiles are not interactive, so they have no hover state: a lift would promise a click.
function SkillTile({ name }: { name: string }) {
  const icon = SKILL_ICONS[name];
  const iconUrl = icon?.src ? resolveIconUrl(icon.src) : null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        width: '88px',
        padding: '0.75rem 0.5rem',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '10px',
        cursor: 'default',
      }}
    >
      <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {iconUrl ? (
          <img
            src={iconUrl}
            alt={name}
            width={40}
            height={40}
            className={icon?.invertOnDark ? 'invert-on-dark' : undefined}
            style={{ objectFit: 'contain', opacity: 0.85 }}
          />
        ) : (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-2xs)', color: 'var(--text-dim)', lineHeight: 1 }}>/&gt;</span>
        )}
      </div>
      <span style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--fs-2xs)',
        color: 'var(--text-muted)',
        textAlign: 'center',
        lineHeight: 1.2,
        maxWidth: '100%',
        wordBreak: 'break-word',
      }}>{name}</span>
    </div>
  );
}

function CategoryRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-xs)',
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
    <section id="skills" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)' }}>
      <SectionHeader label="TECHNICAL" title="Skills" />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '2.5rem' }}>
        {PILL_LABELS.map(label => (
          <button
            key={label}
            className="pill"
            onClick={() => setActive(label)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--fs-xs)',
              letterSpacing: '0.06em',
              padding: '5px 14px',
              borderRadius: '20px',
              border: `1px solid ${active === label ? 'var(--accent)' : 'var(--border)'}`,
              background: active === label ? 'var(--accent-bg)' : 'var(--surface)',
              color: active === label ? 'var(--accent)' : 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >{label.toUpperCase()}</button>
        ))}
      </div>

      {researchMethods.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--accent)', letterSpacing: '0.1em', margin: '0 0 0.75rem' }}>RESEARCH METHODS</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {researchMethods.map(m => (
              <span key={m} style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--fs-sm)',
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {visibleCategories.map(cat => (
          <CategoryRow
            key={cat}
            label={cat}
            items={(skillsData as Record<string, string[]>)[cat]}
          />
        ))}
      </div>
    </section>
  );
}
