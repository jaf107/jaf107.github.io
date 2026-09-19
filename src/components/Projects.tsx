import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { TechIcon } from './TechIcon';
import projects from '../data/projects.json';

interface Project {
  id: string; title: string; subtitle: string; tech: string[];
  category: string; year: string; badge?: string; summary: string;
  listed?: boolean;
}

const CATEGORIES = ['All', 'Research', 'AI', 'Open Source', 'Full Stack', 'Distributed Systems'];

function ProjectCard({ project }: { project: Project }) {
  const [ref, inView] = useInView(`project:${project.id}`);

  // The wrapper reveals on scroll; the card owns hover, press and focus.
  return (
    <div ref={ref} className="reveal" data-in-view={inView || undefined} style={{ display: 'flex' }}>
      <article className="project-card" style={{
        flex: 1, background: 'var(--surface)', borderRadius: '10px', padding: '1.5rem',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        <div aria-hidden="true" className="project-card-bar" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-2xs)', color: 'var(--accent)', background: 'var(--accent-bg)', padding: '3px 8px', borderRadius: '3px', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{project.category}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--text-dim)' }}>{project.year}</span>
        </div>

        {project.badge && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--gold)', marginBottom: '0.5rem' }}>★ {project.badge}</div>
        )}

        <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'var(--fs-xl)', color: 'var(--text)', margin: '0 0 0.25rem' }}>
          <Link to={`/project/${project.id}`} className="project-card-link">{project.title}</Link>
        </h3>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', margin: '0 0 0.9rem' }}>{project.subtitle}</p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-base)', color: 'var(--text-muted)', lineHeight: 1.65, margin: '0 0 1rem', flex: 1 }}>{project.summary}</p>

        <div className="project-card-tech" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem', alignItems: 'center', marginBottom: '1rem' }}>
          {project.tech.map(t => (
            <TechIcon key={t} name={t} />
          ))}
        </div>

        <div aria-hidden="true" className="project-card-more" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', letterSpacing: '0.04em' }}>
          READ MORE →
        </div>
      </article>
    </div>
  );
}

export default function Projects() {
  const [ref, inView] = useInView('header:Projects');
  const [filter, setFilter] = useState('All');
  // After the first pill click, new results appear with UI timing instead of the scroll reveal.
  const [filtered, setFiltered] = useState(false);
  // Thesis work lives in Research and Publications; its detail pages stay reachable by URL.
  const listed = (projects as Project[]).filter(p => p.listed !== false);
  const shown = filter === 'All' ? listed : listed.filter(p => p.category === filter);

  return (
    <section id="projects" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)' }}>
      <div ref={ref} className="reveal" data-in-view={inView || undefined} style={{ marginBottom: '2rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>RESEARCH & WORK</p>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--text)', margin: '0 0 1.5rem' }}>Projects</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} className="pill" onClick={() => { setFilter(c); setFiltered(true); }} style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)',
              padding: '6px 14px', borderRadius: '20px', cursor: 'pointer',
              border: `1px solid ${filter === c ? 'var(--accent)' : 'var(--border-md)'}`,
              background: filter === c ? 'var(--accent-bg)' : 'transparent',
              color: filter === c ? 'var(--accent)' : 'var(--text-muted)',
              letterSpacing: '0.04em',
            }}>{c}</button>
          ))}
        </div>
      </div>
      {/* min(320px, 100%): on phones the column is narrower than 320px and would overflow. */}
      <div data-filtered={filtered || undefined} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '1.25rem' }}>
        {shown.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>
  );
}
