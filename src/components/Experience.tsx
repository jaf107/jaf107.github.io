import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import jobs from '../data/jobs.json';
import { Md } from './Md';

interface Bullet { t: string; d: string; }
interface Job {
  id: string; company: string; team?: string; location: string;
  role: string; roleNote?: string; period: string; current?: boolean;
  summary: string; themes?: string[]; bullets: Bullet[];
}

function JobCard({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const visible = open ? job.bullets : job.bullets.slice(0, 3);
  return (
    <div style={{ borderLeft: `2px solid ${job.current ? 'var(--accent)' : 'var(--border-md)'}`, paddingLeft: '2rem', marginBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'var(--fs-2xl)', color: 'var(--text)', margin: 0 }}>
            {job.company}
            {job.team && <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: 'var(--fs-md)' }}> · {job.team}</span>}
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', fontStyle: 'italic', color: 'var(--accent)', margin: '4px 0 0', fontSize: 'var(--fs-md)', display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            {job.role}
            {job.roleNote && <span style={{ fontStyle: 'normal', color: 'var(--text-muted)', fontSize: 'var(--fs-xs)' }}>({job.roleNote})</span>}
            {job.current && <span style={{ fontStyle: 'normal', background: 'var(--accent-bg)', color: 'var(--accent)', fontSize: 'var(--fs-xs)', padding: '2px 8px', borderRadius: '20px', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>CURRENT</span>}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', margin: '6px 0 0' }}>{job.location}</p>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', letterSpacing: '0.04em', paddingTop: '4px' }}>{job.period}</span>
      </div>

      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-md)', color: 'var(--text-muted)', margin: '1rem 0 0.75rem', lineHeight: 1.7 }}>{job.summary}</p>

      {job.themes && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          {job.themes.map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-2xs)', color: 'var(--accent)', background: 'var(--accent-bg)', padding: '3px 9px', borderRadius: '4px' }}>{t}</span>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1rem' }}>
        {visible.map((b, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.9rem 1.1rem' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 'var(--fs-md)', color: 'var(--text-mid)', marginBottom: '0.3rem' }}>{b.t}</div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-base)', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}><Md s={b.d} /></p>
          </div>
        ))}
      </div>

      {job.bullets.length > 3 && (
        <button onClick={() => setOpen(!open)} style={{
          marginTop: '1rem', background: 'transparent', border: '1px solid var(--border-md)',
          color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)',
          padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', letterSpacing: '0.04em',
        }}>
          {open ? '− show less' : `+ read more (${job.bullets.length - 3} more)`}
        </button>
      )}
    </div>
  );
}

export default function Experience() {
  const [ref, inView] = useInView();
  return (
    <section id="experience" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)' }}>
      <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.5s ease', marginBottom: '3rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>CAREER</p>
        <h2 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', color: 'var(--text)', margin: 0 }}>Experience</h2>
      </div>
      {(jobs as Job[]).map(job => <JobCard key={job.id} job={job} />)}
    </section>
  );
}
