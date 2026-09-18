import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';

// Inline markdown for JSON copy: **bold**, `code`, and [text](url).
// Internal hrefs (starting with "/") render as router Links.
const LINK: CSSProperties = { color: 'var(--accent)', textDecoration: 'underline' };

export function Md({ s }: { s: string }) {
  const out: ReactNode[] = [];
  let str = String(s ?? '');
  let k = 0;
  const rx = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`/;
  let m = rx.exec(str);
  while (m) {
    if (m.index > 0) {
      out.push(str.slice(0, m.index));
    }
    if (m[1] !== undefined) {
      out.push(<b key={k++} style={{ color: 'var(--text-mid)', fontWeight: 600 }}>{m[1]}</b>);
    } else if (m[4] !== undefined) {
      out.push(<code key={k++} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92em' }}>{m[4]}</code>);
    } else if (m[3].startsWith('/')) {
      out.push(<Link key={k++} to={m[3]} style={LINK}>{m[2]}</Link>);
    } else {
      out.push(<a key={k++} href={m[3]} target="_blank" rel="noopener noreferrer" style={LINK}>{m[2]}</a>);
    }
    str = str.slice(m.index + m[0].length);
    m = rx.exec(str);
  }
  out.push(str);
  return <>{out}</>;
}
