import React from 'react';
import talks from '../data/talks.json';
import { Md } from './Md';

export default function Talks() {
  return (
    <section id="talks" className="sec">
      <h2 className="sec-head">Talks &amp; Service</h2>
      <div className="rows">
        {talks.map((t, i) => (
          <div className="r" key={i}>
            <span className="d">{t.date}</span>
            <span><Md s={t.text} /></span>
          </div>
        ))}
      </div>
      <p style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '0.9rem' }}>
        Teaching, reviewing &amp; mentorship items — coming soon.
      </p>
    </section>
  );
}
