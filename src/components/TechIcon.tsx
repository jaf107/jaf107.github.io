import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { SKILL_ICONS, resolveIconUrl } from '../data/skillIcons';

// Abstract concepts with no brand logo — short label + fixed color tile.
const MONO_TILES: Record<string, { label: string; color: string }> = {
  'llms': { label: 'LM', color: '#A855F7' },
  'mcp': { label: 'MCP', color: '#0EA5E9' },
  'bpe tokenization': { label: 'BPE', color: '#EAB308' },
  'textrank': { label: 'TR', color: '#14B8A6' },
  'tf-idf': { label: 'TF', color: '#F97316' },
  'wcag 2.4': { label: 'A11Y', color: '#0EA5E9' },
  'axe-core': { label: 'AX', color: '#7B1FA2' },
  'dynamic program analysis': { label: 'DPA', color: '#0EA5E9' },
  'mining software repositories (szz)': { label: 'MSR', color: '#6366F1' },
  'controlled user studies': { label: 'UX', color: '#EC4899' },
  'statistical evaluation': { label: 'σ', color: '#10B981' },
  'inter-rater agreement (κ, pabak)': { label: 'κ', color: '#8B5CF6' },
};

// Stable palette pick for unknown names so ad-hoc tiles still look intentional.
const MONO_PALETTE = ['#0EA5E9', '#6366F1', '#EC4899', '#10B981', '#F97316', '#8B5CF6', '#14B8A6', '#EAB308'];

function hashColor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h * 31 + name.charCodeAt(i)) >>> 0;
  }
  return MONO_PALETTE[h % MONO_PALETTE.length];
}

function getMonogram(name: string) {
  const compact = name
    .replace(/\b(API|SDK|UI|Core)\b/g, '')
    .trim()
    .split(/[\s./+-]+/)
    .filter(Boolean);

  if (compact.length > 1) {
    return compact.map(part => part[0]).join('').slice(0, 3).toUpperCase();
  }

  return name.replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase();
}

function MonoTile({ label, color, size }: { label: string; color: string; size: number }) {
  const fontSize = Math.max(6, Math.round(size * (label.length >= 3 ? 0.34 : 0.46)));
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: Math.max(3, Math.round(size * 0.27)),
        background: color,
        color: '#fff',
        fontFamily: 'var(--mono)',
        fontWeight: 700,
        fontSize: `${fontSize}px`,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        flexShrink: 0,
      }}
    >{label}</span>
  );
}

interface TechIconProps {
  name: string;
  size?: number;
}

export function TechIcon({ name, size = 24 }: TechIconProps) {
  const { dark } = useTheme();
  const [failed, setFailed] = useState(false);
  const icon = SKILL_ICONS[name];
  const iconUrl = icon?.src && !failed ? resolveIconUrl(icon.src) : null;
  const iconFilter = icon?.invertOnDark && dark ? 'brightness(0) invert(1)' : undefined;
  const mono = MONO_TILES[name.toLowerCase().trim()];

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
          style={{ display: 'block', width: `${size}px`, height: `${size}px`, objectFit: 'contain', filter: iconFilter }}
        />
      ) : (
        <MonoTile
          label={mono?.label ?? getMonogram(name)}
          color={mono?.color ?? hashColor(name)}
          size={size}
        />
      )}
    </span>
  );
}
