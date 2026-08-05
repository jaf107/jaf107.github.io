import React, { useState } from 'react';
import jobs from '../data/jobs.json';
import { SectionHeader } from './Research';
import { Md } from './Md';

interface Job {
  id: string;
  company: string;
  team?: string;
  location: string;
  role: string;
  roleNote?: string;
  period: string;
  current: boolean;
  summary: string;
  themes?: string[];
  bullets: { t: string; d: string }[];
}

const VISIBLE_BULLETS = 3;

function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const visibleBullets = open ? job.bullets : job.bullets.slice(0, VISIBLE_BULLETS);
  return (
    <div style={{
      borderLeft: `2px solid ${job.current ? 'var(--accent)' : 'var(--border-md)'}`,
      paddingLeft: '2rem', marginBottom: '3rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text)', margin: 0 }}>
            {job.company}
            {job.team && <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.95rem' }}> — {job.team}</span>}
          </h3>
          <p style={{ fontFamily: 'var(--sans)', fontStyle: 'italic', color: 'var(--accent)', margin: '4px 0 0', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            {job.role}
            {job.roleNote && <span style={{ fontStyle: 'normal', color: 'var(--text-muted)', fontSize: '0.78rem' }}>({job.roleNote})</span>}
            {job.current && <span style={{ fontStyle: 'normal', background: 'var(--accent-bg)', color: 'var(--accent)', fontSize: '0.7rem', padding: '2px 8px', borderRadius: '20px', fontFamily: 'var(--mono)', letterSpacing: '0.05em' }}>CURRENT</span>}
          </p>
          <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--text-muted)', margin: '6px 0 0' }}>{job.location}</p>
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.04em', paddingTop: '4px' }}>{job.period}</span>
      </div>

      <p style={{ fontFamily: 'var(--sans)', fontSize: '0.93rem', color: 'var(--text-muted)', margin: '1rem 0 0.75rem', lineHeight: 1.7 }}>{job.summary}</p>
      {job.themes && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          {job.themes.map(t => (
            <span key={t} style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--accent)', background: 'var(--accent-bg)', padding: '3px 9px', borderRadius: '4px' }}>{t}</span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
        {visibleBullets.map((b, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.9rem 1.1rem' }}>
            <div style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-mid)', marginBottom: '0.3rem' }}>{b.t}</div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}><Md s={b.d} /></p>
          </div>
        ))}
      </div>

      {job.bullets.length > VISIBLE_BULLETS && (
        <button onClick={() => setOpen(!open)}
          style={{
            marginTop: '1rem', background: 'transparent', border: '1px solid var(--border-md)',
            color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: '0.72rem',
            padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', letterSpacing: '0.04em',
          }}>
          {open ? '— show less' : `+ read more (${job.bullets.length - VISIBLE_BULLETS} more)`}
        </button>
      )}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="sec">
      <SectionHeader title="Experience" />
      {(jobs as Job[]).map(job => <JobCard key={job.id} job={job} />)}
    </section>
  );
}
