import React from 'react';
import { Link } from 'react-router-dom';
import education from '../data/education.json';
import { SectionHeader } from './Research';

interface Education {
  school: string;
  degree: string;
  period: string;
  note?: string;
  gpa: string;
  current?: boolean;
}

export default function EducationSection() {
  return (
    <section id="education" className="sec">
      <SectionHeader title="Education" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {(education as Education[]).map((e, i) => (
          <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px',
            padding: '1.15rem 1.4rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ minWidth: 0, flex: '1 1 280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.02rem', color: 'var(--text)', margin: 0 }}>{e.school}</h3>
                {e.current && <span style={{ background: 'var(--accent-bg)', color: 'var(--accent)', fontSize: '0.62rem', padding: '2px 8px', borderRadius: '20px', fontFamily: 'var(--mono)', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>IN PROGRESS</span>}
              </div>
              <p style={{ color: 'var(--text-mid)', margin: '4px 0 0', fontSize: '0.88rem' }}>{e.degree}</p>
              {e.note && <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '3px 0 0' }}>{e.note}</p>}
              <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-dim)', margin: '8px 0 0' }}>{e.period}</p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', color: 'var(--accent)', fontWeight: 600 }}>{e.gpa.split(' / ')[0]}</div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>GPA / {e.gpa.split(' / ')[1] || '4.00'}</div>
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
        Graduate coursework projects: <Link to="/project/szz-mining">ML Bug Mining (SZZ)</Link>
      </p>
    </section>
  );
}
