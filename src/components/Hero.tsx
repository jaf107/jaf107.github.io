import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const PHRASES = [
  'M.Sc. in Software Engineering · IIT, University of Dhaka',
  'PhD Applicant · Fall 2027',
  'Software Engineer II at Optimizely',
];

const STATS = [
  { label: '1', desc: 'Peer-Reviewed Paper' },
  { label: '3.92', desc: 'M.Sc. CGPA' },
  { label: '2+ yrs', desc: 'Optimizely' },
  { label: '300+', desc: 'PRs Reviewed' },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function TypedText() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      const t = setTimeout(() => { setPaused(false); setDeleting(true); }, 2200);
      return () => clearTimeout(t);
    }
    const phrase = PHRASES[idx];
    if (!deleting) {
      if (displayed.length < phrase.length) {
        const t = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 55);
        return () => clearTimeout(t);
      } else { setPaused(true); }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30);
        return () => clearTimeout(t);
      } else { setDeleting(false); setIdx((idx + 1) % PHRASES.length); }
    }
  }, [displayed, deleting, paused, idx]);

  return (
    <span style={{ color: 'var(--accent)' }}>
      {displayed}<span style={{ animation: 'blink 1s step-end infinite' }}>|</span>
    </span>
  );
}

export default function Hero() {
  const { dark } = useTheme();
  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: 'calc(64px + 2rem) clamp(1.5rem, 10vw, 12rem) 4rem',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(var(--accent-rgb), 0.07) 0%, transparent 60%),
          linear-gradient(var(--grid-line) 1px, transparent 1px),
          linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)`,
        backgroundSize: 'auto, 60px 60px, 60px 60px',
      }} />

      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center' }} className="hero-grid">
        <div style={{ maxWidth: '760px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-sm)', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: '1.5rem' }}>
            HELLO, WORLD! I'M
          </p>
          <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 'clamp(2.8rem, 7vw, 5rem)', lineHeight: 1.05, color: 'var(--text)', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
            Abu Jafar<br />Saifullah
          </h1>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)', color: 'var(--text-muted)', marginBottom: '1.5rem', minHeight: '2em' }}>
            <TypedText />
          </div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-lg)', color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: '560px', marginBottom: '2.5rem' }}>
            I'm a{' '}
            <span style={{ color: 'var(--text-mid)', fontWeight: 500 }}>software engineering researcher</span>{' '}
            working on web accessibility. I did my M.Sc. in Software Engineering at IIT, University of Dhaka,
            and I'm applying to{' '}
            <span style={{ color: 'var(--text-mid)', fontWeight: 500 }}>PhD programs for Fall 2027</span>.
            I also work as a full-stack software engineer at Optimizely Bangladesh, building features for the
            Content Marketing Platform (CMP) team.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => scrollToSection('research')}
              style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-base)', background: 'var(--accent)', color: dark ? '#0c0e13' : '#fff', border: 'none', padding: '12px 28px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
              View Research
            </button>
            <a href="/cv" target="_blank" rel="noreferrer"
              style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-base)', color: 'var(--text)', background: 'transparent', border: '1px solid var(--border-md)', padding: '12px 28px', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, textDecoration: 'none', display: 'inline-block' }}>
              Curriculum Vitae
            </a>
          </div>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '3.5rem', flexWrap: 'nowrap', alignItems: 'flex-start' }} className="hero-stats">
            {STATS.map(s => (
              <div key={s.desc} style={{ flexShrink: 0 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', whiteSpace: 'nowrap' }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', letterSpacing: '0.04em', marginTop: '2px', whiteSpace: 'nowrap' }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '380px', justifySelf: 'end', width: '100%' }} className="hero-portrait">
          <div style={{ position: 'absolute', inset: '-10px', borderRadius: '14px', border: '1px solid var(--border-md)', transform: 'translate(12px, 12px)' }} />
          <div style={{ position: 'absolute', inset: '-10px', borderRadius: '14px', background: 'var(--accent-bg)', transform: 'translate(-12px, -12px)' }} />
          <img src="assets/portrait.jpg" alt="Abu Jafar Saifullah" loading="lazy"
            style={{ position: 'relative', width: '100%', aspectRatio: '4/5', objectFit: 'cover', objectPosition: '50% 30%', borderRadius: '12px', border: '1px solid var(--border-md)', boxShadow: '0 20px 60px rgba(0,0,0,0.18)' }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-portrait { display: none !important; }
          .hero-stats { flex-wrap: wrap !important; gap: 1.5rem 2rem !important; }
        }
      `}</style>
    </section>
  );
}
