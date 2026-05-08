import React, { useState } from 'react';
import { SectionHeader } from './Research';
import {
  SiTypescript, SiJavascript, SiPython, SiJava, SiCsharp,
  SiReact, SiNextdotjs, SiAngular, SiVite, SiTailwindcss,
  SiChakraui, SiFramer, SiStorybook,
  SiNodedotjs, SiExpress, SiFastapi, SiSpringboot, SiDotnet,
  SiPlaywright, SiVitest, SiMocha, SiSelenium,
  SiMongodb, SiPostgresql, SiMicrosoftsqlserver, SiFirebase, SiRedis, SiSupabase,
  SiDocker, SiNginx, SiGithubactions, SiNetlify,
  SiMicrosoftazure, SiCloudflare, SiAmazons3,
  SiTensorflow, SiHuggingface, SiScikitlearn,
} from 'react-icons/si';

type IconComponent = React.ComponentType<{ size?: number; style?: React.CSSProperties }>;

const ICON_MAP: Record<string, IconComponent> = {
  'TypeScript': SiTypescript,
  'JavaScript': SiJavascript,
  'Python': SiPython,
  'Java': SiJava,
  'C#': SiCsharp,
  'React 18/19': SiReact,
  'Next.js': SiNextdotjs,
  'Angular': SiAngular,
  'Vite': SiVite,
  'Tailwind CSS': SiTailwindcss,
  'Chakra UI': SiChakraui,
  'Framer Motion': SiFramer,
  'Storybook': SiStorybook,
  'Node.js': SiNodedotjs,
  'Express': SiExpress,
  'FastAPI': SiFastapi,
  'Spring Boot 3': SiSpringboot,
  'ASP.NET Core': SiDotnet,
  'Entity Framework Core': SiDotnet,
  'Playwright': SiPlaywright,
  'Vitest': SiVitest,
  'Mocha': SiMocha,
  'Selenium': SiSelenium,
  'MongoDB': SiMongodb,
  'PostgreSQL': SiPostgresql,
  'SQL Server': SiMicrosoftsqlserver,
  'Firebase': SiFirebase,
  'Redis': SiRedis,
  'Supabase': SiSupabase,
  'Docker': SiDocker,
  'NGINX': SiNginx,
  'GitHub Actions': SiGithubactions,
  'Netlify': SiNetlify,
  'Azure': SiMicrosoftazure,
  'Cloudflare Workers': SiCloudflare,
  'AWS S3': SiAmazons3,
  'TensorFlow': SiTensorflow,
  'HuggingFace': SiHuggingface,
  'scikit-learn': SiScikitlearn,
};

const RESEARCH_METHODS = [
  'Dynamic Program Analysis',
  'Mining Software Repositories (SZZ)',
  'Controlled User Studies',
  'Statistical Evaluation',
  'Inter-rater Agreement (κ, PABAK)',
];

function SkillCell({ name }: { name: string }) {
  const [hovered, setHovered] = useState(false);
  const Icon = ICON_MAP[name];

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
        padding: '1rem 0.5rem',
        background: 'var(--surface)',
        border: `1px solid ${hovered ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: '10px',
        cursor: 'default',
        transition: 'border-color 0.2s, transform 0.15s',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      {Icon ? (
        <Icon size={26} style={{ color: hovered ? 'var(--accent)' : 'var(--text-mid)' }} />
      ) : (
        <span style={{ fontSize: '1rem', fontFamily: 'DM Mono, monospace', color: hovered ? 'var(--accent)' : 'var(--text-muted)', lineHeight: 1 }}>{'/>'}</span>
      )}
      <span style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
        textAlign: 'center',
        lineHeight: 1.3,
      }}>{name}</span>
    </div>
  );
}

import skills from '../data/skills.json';

export default function Skills() {
  const allSkills = Object.entries(skills)
    .filter(([cat]) => cat !== 'Research Methods')
    .flatMap(([, items]) => items as string[]);

  return (
    <section id="skills" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)', background: 'var(--bg)' }}>
      <SectionHeader label="TECHNICAL" title="Skills" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(95px, 1fr))', gap: '0.65rem', marginBottom: '2.5rem' }}>
        {allSkills.map(name => <SkillCell key={name} name={name} />)}
      </div>
      <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'var(--accent)', letterSpacing: '0.1em', margin: '0 0 0.85rem' }}>RESEARCH METHODS</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {RESEARCH_METHODS.map(m => (
          <span key={m} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'var(--text-mid)', background: 'var(--surface)', padding: '4px 11px', borderRadius: '6px', border: '1px solid var(--border)' }}>{m}</span>
        ))}
      </div>
    </section>
  );
}
