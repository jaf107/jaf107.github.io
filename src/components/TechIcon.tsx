import React, { useState } from 'react';
import { SKILL_ICONS, resolveIconUrl } from '../data/skillIcons';

function getMonogram(name: string) {
  const compact = name
    .replace(/\b(API|SDK|UI|Core)\b/g, '')
    .trim()
    .split(/[\s./+-]+/)
    .filter(Boolean);

  if (compact.length > 1) {
    return compact.map(part => part[0]).join('').slice(0, 3).toUpperCase();
  }

  return name.replace(/[^a-z0-9]/gi, '').slice(0, 3).toUpperCase();
}

interface TechIconProps {
  name: string;
  size?: number;
}

export function TechIcon({ name, size = 24 }: TechIconProps) {
  const [failed, setFailed] = useState(false);
  const icon = SKILL_ICONS[name];
  const iconUrl = icon?.src && !failed ? resolveIconUrl(icon.src) : null;

  return (
    <span
      title={name}
      aria-label={name}
      role="img"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        flex: `0 0 ${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
      }}
    >
      {iconUrl ? (
        <img
          src={iconUrl}
          alt=""
          aria-hidden="true"
          width={size}
          height={size}
          loading="lazy"
          onError={() => setFailed(true)}
          className={icon?.invertOnDark ? 'invert-on-dark' : undefined}
          style={{ display: 'block', width: `${size}px`, height: `${size}px`, objectFit: 'contain' }}
        />
      ) : (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-2xs)', lineHeight: 1, letterSpacing: '0.02em' }}>
          {getMonogram(name)}
        </span>
      )}
    </span>
  );
}
