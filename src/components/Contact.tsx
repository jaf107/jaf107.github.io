import React, { useRef, useState } from 'react';
import site from '../data/site.json';
import { SectionHeader } from './Research';

export default function Contact() {
  const c = site.contact;
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();

  const confirmCopied = () => {
    setCopied(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 1800);
  };

  const fallbackCopyEmail = () => {
    const textarea = document.createElement('textarea');
    textarea.value = c.email;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    if (successful) {
      confirmCopied();
    }
  };

  const copyEmail = () => {
    if (navigator.clipboard) {
      void navigator.clipboard.writeText(c.email).then(confirmCopied).catch(fallbackCopyEmail);
      return;
    }
    fallbackCopyEmail();
  };

  return (
    <section id="contact" className="sec">
      <SectionHeader title="Contact" />
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.75rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 0 4px rgba(34,197,94,0.18)', display: 'inline-block' }}></span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{c.availability}</span>
        </div>
        <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 600, fontSize: '1.35rem', color: 'var(--text)', margin: '0 0 0.5rem', lineHeight: 1.3 }}>{c.headline}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0, maxWidth: '58ch' }}>{c.blurb}</p>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.4rem' }}>
          <a href={`mailto:${c.email}`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent)', color: 'var(--on-accent)',
              textDecoration: 'none', fontWeight: 600, fontSize: '0.86rem', padding: '0.75rem 1.3rem', borderRadius: '5px', whiteSpace: 'nowrap' }}>
            Send an email</a>
          <button onClick={copyEmail} aria-label="Copy email"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', background: copied ? 'var(--accent-bg)' : 'transparent',
              color: copied ? 'var(--accent)' : 'var(--text-mid)', border: `1px solid ${copied ? 'var(--accent)' : 'var(--border-md)'}`,
              fontFamily: 'var(--mono)', fontSize: '0.75rem', cursor: 'pointer', padding: '0 1.1rem', borderRadius: '5px', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
            {copied ? '✓ Copied' : 'Copy address'}</button>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.8rem', color: 'var(--text-muted)', alignSelf: 'center', marginLeft: '0.4rem', wordBreak: 'break-all' }}>{c.email}</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 2rem', marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
          {c.socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', fontSize: '0.83rem' }}>
              {s.label} <span style={{ fontFamily: 'var(--mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>· {s.handle} ↗</span>
            </a>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem 2.25rem', marginTop: '1rem', padding: '0.9rem 1.2rem',
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}>
        {c.meta.map(m => (
          <div key={m.l}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.62rem', color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: '3px' }}>{m.l}</div>
            <div style={{ fontSize: '0.83rem', color: 'var(--text-mid)' }}>{m.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
