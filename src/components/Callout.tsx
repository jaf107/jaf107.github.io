import React from 'react';
import site from '../data/site.json';

export default function Callout() {
  const c = site.callout;
  const [head, ...rest] = c.text.split(' — ');
  return (
    <div className="callout">
      <span aria-hidden="true">🔔</span>
      <span>
        <b>{head}</b>
        {rest.length > 0 && <span> — {rest.join(' — ')}</span>}{' '}
        <a href={c.ctaHref}>{c.ctaLabel} →</a>
      </span>
    </div>
  );
}
