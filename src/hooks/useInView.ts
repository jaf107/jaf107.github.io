import { useEffect, useRef, useState } from 'react';

// Keys revealed during this visit. Scroll reveals are first-sight decoration, so coming back
// (Back from a project page, re-filtering projects) shows those elements at once instead of
// replaying the entrance. Module state starts empty on every page load, so hydration matches
// the prerendered HTML.
const revealed = new Set<string>();

// Reveals that land in the same frame are applied together, in document order, 50ms apart through
// --reveal-i (see .reveal): a row of cards runs left to right, a header leads its cards, and an
// element arriving alone starts at once. Capped so the last of a group never waits over 200ms.
// Sorted here because observers' callbacks don't arrive in document order.
let pending: { el: HTMLElement; reveal: () => void }[] = [];
function queueReveal(el: HTMLElement, reveal: () => void) {
  if (pending.length === 0) {
    requestAnimationFrame(() => {
      const batch = pending.sort((a, b) =>
        a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
      pending = [];
      batch.forEach((item, i) => {
        item.el.style.setProperty('--reveal-i', String(Math.min(i, 4)));
        item.reveal();
      });
    });
  }
  pending.push({ el, reveal });
}

export function useInView(key: string, threshold = 0.15): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(() => revealed.has(key));

  useEffect(() => {
    const el = ref.current;
    if (inView || !el) {
      return;
    }
    // Reveals fire once, so stop watching after the first hit.
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          obs.disconnect();
          revealed.add(key);
          queueReveal(el, () => setInView(true));
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [key, threshold, inView]);

  return [ref, inView];
}
