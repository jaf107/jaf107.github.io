// In-page section jumps glide, unless the visitor asked for less motion. This lives in JS, not in
// html { scroll-behavior: smooth }, because that CSS also animates Back/Forward scroll restoration.
// glide = false jumps: arriving from another page has no start point worth showing.
export function scrollToSection(id: string, glide = true) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = glide && !reduce ? 'smooth' : 'auto';
  document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' });
}
