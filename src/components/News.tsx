import { useState, type CSSProperties } from 'react';
import { SectionHeader } from './Research';
import { Md } from './Md';
import news from '../data/news.json';

interface NewsItem { date: string; type: string; text: string; }

// type -> [emoji, label read by screen readers]
const KINDS: Record<string, [string, string]> = {
  paper: ['📝', 'Paper'],
  talk: ['🎤', 'Talk'],
  award: ['🏆', 'Award'],
  career: ['💼', 'Career'],
  education: ['🎓', 'Education'],
  research: ['🔬', 'Research'],
  update: ['📣', 'Update'],
  life: ['🌱', 'Life'],
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const VISIBLE = 6;

// "2026-05" -> "May 2026"; a bare year stays as is.
function formatDate(iso: string) {
  const [year, month] = iso.split('-');
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

export default function News() {
  const [showAll, setShowAll] = useState(false);
  const items = news as NewsItem[];
  const shown = showAll ? items : items.slice(0, VISIBLE);

  return (
    <section id="news" style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 10vw, 12rem)' }}>
      <SectionHeader label="LATEST" title="News & Activities" />
      <ul id="news-list" style={{ listStyle: 'none', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
        {shown.map((n, i) => {
          const [emoji, label] = KINDS[n.type] ?? KINDS.update;
          return (
            // Rows past the first VISIBLE only mount on "show all"; they fade in (see .enter).
            <li key={`${n.date}-${i}`} className={i < VISIBLE ? 'news-item' : 'news-item enter'}
              style={{ padding: '1rem 1.5rem', borderTop: i ? '1px solid var(--border)' : 'none', '--enter-i': i - VISIBLE } as CSSProperties}>
              <time dateTime={n.date} style={{ gridArea: 'date', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--accent)', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{formatDate(n.date)}</time>
              <span role="img" aria-label={label} title={label} style={{ gridArea: 'icon', fontSize: 'var(--fs-md)' }}>{emoji}</span>
              <p style={{ gridArea: 'text', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-base)', color: 'var(--text-mid)', lineHeight: 1.6 }}><Md s={n.text} /></p>
            </li>
          );
        })}
      </ul>

      {items.length > VISIBLE && (
        <button onClick={() => setShowAll(!showAll)} aria-expanded={showAll} aria-controls="news-list" className="press" style={{
          marginTop: '1rem', background: 'transparent', border: '1px solid var(--border-md)',
          color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)',
          padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', letterSpacing: '0.04em',
        }}>
          {showAll ? '− show recent only' : `+ show all (${items.length})`}
        </button>
      )}
    </section>
  );
}
