import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';
import jobs from '../data/jobs.json';

interface Bullet { t: string; d: string; }
interface Job {
  id: string; company: string; team?: string; location: string;
  role: string; roleNote?: string; period: string; current?: boolean;
  summary: string; themes?: string[]; bullets: Bullet[];
}

function renderDescription(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0, m: RegExpExecArray | null;
  while ((m = pattern.exec(text)) !== null) {
    if (m.index > last) {
      parts.push(text.slice(last, m.index));
    }
    parts.push(
      <a key={m.index} href={m[2]} target="_blank" rel="noopener noreferrer"
        style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) {
    parts.push(text.slice(last));
  }
  return parts.length ? parts : text;
}

function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const visible = open ? job.bullets : job.bullets.slice(0, 3);
  return (
    <div style={{ borderLeft: `2px solid ${job.current ? 'var(--accent)' : 'var(--border-md)'}`, paddingLeft: '2rem', marginBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text)', margin: 0 }}>
            {job.company}
            {job.team && <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.95rem' }}> — {job.team}</span>}
          </h3>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontStyle: 'italic', color: 'var(--accent)', margin: '4px 0 0', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            {job.role}
            {job.roleNote && <span style={{ fontStyle: 'normal', color: 'var(--text-muted)', fontSize: '0.78rem' }}>({job.roleNote})</span>}
            {job.current && <span style={{ fontStyle: 'normal', background: 'var(--accent-bg)', color: 'var(--accent)', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '20px', fontFamily: 'DM Mono, monospace', letterSpacing: '0.05em' }}>CURRENT</span>}
          </p>
          <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: 'var(--text-muted)', margin: '6px 0 0' }}>{job.location}</p>
        </div>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.04em', paddingTop: '4px' }}>{job.period}</span>
      </div>

      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.93rem', color: 'var(--text-muted)', margin: '1rem 0 0.75rem', lineHeight: 1.7 }}>{job.summary}</p>

      {job.themes && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          {job.themes.map(t => (
            <span key={t} style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', color: 'var(--accent)', background: 'var(--accent-bg)', padding: '3px 9px', borderRadius: '4px' }}>{t}</span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
        {visible.map((b, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.9rem 1.1rem' }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-mid)', marginBottom: '0.3rem' }}>{b.t}</div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{renderDescription(b.d)}</p>
          </div>
        ))}
      </div>

      {job.bullets.length > 3 && (
        <button onClick={() => setOpen(!open)} style={{
          marginTop: '1rem', background: 'transparent', border: '1px solid var(--border-md)',
          color: 'var(--accent)', fontFamily: 'DM Mono, monospace', fontSize: '0.72rem',
          padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', letterSpacing: '0.04em',
        }}>
          {open ? '— show less' : `+ read more (${job.bullets.length - 3} more)`}
        </button>
      )}
    </div>
  );
}

export default function Experience() {
  const [ref, inView] = useInView();
  return (
    <section id="experience" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)', background: 'var(--bg)' }}>
      <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.5s ease', marginBottom: '3rem' }}>
        <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>CAREER</p>
        <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--text)', margin: 0 }}>Experience</h2>
      </div>
      {(jobs as Job[]).map(job => <JobCard key={job.id} job={job} />)}
    </section>
  );
}
