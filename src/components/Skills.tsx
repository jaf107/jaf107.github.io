import React, { useState } from 'react';
import { SectionHeader } from './Research';
import {
  SiTypescript, SiJavascript, SiPython, SiOpenjdk, SiCplusplus,
  SiReact, SiNextdotjs, SiAngular, SiVite, SiTailwindcss,
  SiChakraui, SiFramer, SiStorybook,
  SiNodedotjs, SiHono, SiExpress, SiFastapi, SiSpringboot, SiDotnet,
  SiVitest, SiMocha, SiSelenium,
  SiMongodb, SiPostgresql, SiFirebase, SiRedis, SiSupabase,
  SiDocker, SiNginx, SiGithubactions, SiNetlify, SiCloudflare,
  SiTensorflow, SiHuggingface, SiScikitlearn,
} from 'react-icons/si';

type IconComp = React.ComponentType<{ size?: number; color?: string }>;

const ICON_MAP: Record<string, IconComp> = {
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'Python': SiPython,
  'Java': SiOpenjdk,
  'C++': SiCplusplus,
  'React 18/19': SiReact,
  'Next.js': SiNextdotjs,
  'Angular': SiAngular,
  'Vite': SiVite,
  'Tailwind CSS': SiTailwindcss,
  'Chakra UI': SiChakraui,
  'Framer Motion': SiFramer,
  'Storybook': SiStorybook,
  'Node.js': SiNodedotjs,
  'Hono': SiHono,
  'Express': SiExpress,
  'FastAPI': SiFastapi,
  'Spring Boot 3': SiSpringboot,
  'ASP.NET Core': SiDotnet,
  'Entity Framework Core': SiDotnet,
  'Vitest': SiVitest,
  'Mocha': SiMocha,
  'Selenium': SiSelenium,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'Firebase': SiFirebase,
  'Redis': SiRedis,
  'Supabase': SiSupabase,
  'Docker': SiDocker,
  'NGINX': SiNginx,
  'GitHub Actions': SiGithubactions,
  'Netlify': SiNetlify,
  'Cloudflare Workers': SiCloudflare,
  'TensorFlow': SiTensorflow,
  'HuggingFace': SiHuggingface,
  'scikit-learn': SiScikitlearn,
};

const SKILLS_GROUPED: { label: string; items: string[] }[] = [
  { label: 'Languages',         items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C#', 'C++'] },
  { label: 'Frontend',          items: ['React 18/19', 'Next.js', 'Angular', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Radix UI', 'Chakra UI', 'Framer Motion', 'Storybook', 'Module Federation', 'Rspack'] },
  { label: 'Backend',           items: ['Node.js', 'Hono', 'Express', 'FastAPI', 'Spring Boot 3', 'ASP.NET Core', 'Entity Framework Core'] },
  { label: 'Testing',           items: ['Playwright', 'Vitest', 'Karma', 'Mocha', 'Chai', 'Sinon', 'axe-core', 'Selenium'] },
  { label: 'Databases',         items: ['MongoDB', 'PostgreSQL', 'SQL Server', 'Firebase', 'Redis', 'Supabase'] },
  { label: 'DevOps / Cloud',    items: ['AWS CodeArtifact', 'AWS S3', 'Azure', 'Cloudflare Workers', 'Docker', 'NGINX', 'GitHub Actions', 'Netlify'] },
  { label: 'ML / NLP',          items: ['TensorFlow', 'HuggingFace', 'BPE Tokenization', 'TextRank', 'TF-IDF', 'scikit-learn'] },
];

const RESEARCH_METHODS = [
  'Dynamic Program Analysis',
  'Mining Software Repositories (SZZ)',
  'Controlled User Studies',
  'Statistical Evaluation',
  'Inter-rater Agreement (κ, PABAK)',
];

function SkillRow({ name }: { name: string }) {
  const [hovered, setHovered] = useState(false);
  const Icon = ICON_MAP[name];
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.5rem 0.75rem',
        background: hovered ? 'var(--accent-bg)' : 'var(--surface)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '7px',
        cursor: 'default',
        transition: 'all 0.15s',
      }}
    >
      {Icon ? (
        <Icon size={16} color={hovered ? 'var(--accent)' : 'var(--text-muted)'} />
      ) : (
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: hovered ? 'var(--accent)' : 'var(--text-dim)', lineHeight: 1, width: 16, textAlign: 'center' }}>/&gt;</span>
      )}
      <span style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.82rem',
        color: hovered ? 'var(--accent)' : 'var(--text-mid)',
        transition: 'color 0.15s',
        whiteSpace: 'nowrap',
      }}>{name}</span>
    </div>
  );
}

function CategoryColumn({ group, showLabel }: { group: { label: string; items: string[] }; showLabel: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', minWidth: 0 }}>
      {showLabel && (
        <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.1em', margin: '0 0 0.4rem' }}>
          {group.label.toUpperCase()}
        </p>
      )}
      {group.items.map(name => <SkillRow key={name} name={name} />)}
    </div>
  );
}

const PILL_LABELS = ['All', ...SKILLS_GROUPED.map(g => g.label)];

export default function Skills() {
  const [active, setActive] = useState('All');
  const visible = active === 'All' ? SKILLS_GROUPED : SKILLS_GROUPED.filter(g => g.label === active);

  return (
    <section id="skills" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)', background: 'var(--bg)' }}>
      <SectionHeader label="TECHNICAL" title="Skills" />

      {/* Filter pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '2rem' }}>
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

      {/* Categories as vertical columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem 1rem', alignItems: 'start' }}>
        {visible.map(group => (
          <CategoryColumn key={group.label} group={group} showLabel={active === 'All'} />
        ))}
      </div>

      {/* Research Methods */}
      <div style={{ marginTop: '2.5rem' }}>
        <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: 'var(--accent)', letterSpacing: '0.1em', margin: '0 0 0.75rem' }}>RESEARCH METHODS</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {RESEARCH_METHODS.map(m => (
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
    </section>
  );
}
