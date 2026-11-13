// Server-renders each route the way scripts/prerender.mjs does, so a component that
// crashes outside the browser fails here instead of breaking the build.
import { describe, expect, it } from 'vitest';
import { render } from '../src/entry-server';
import profile from '../src/data/profile.json';
import projects from '../src/data/projects.json';

describe('routes', () => {
  it('renders the home page with contact links', () => {
    const html = render('/');
    expect(html).toContain(profile.name);
    expect(html).toContain(profile.links.orcid);
    expect(html).toContain(profile.links.scholar.replace(/&/g, '&amp;'));
  });

  it.each(projects.map((p) => [p.id, p.title]))('renders /project/%s', (id, title) => {
    expect(render(`/project/${id}`)).toContain(title);
  });

  it('renders the not-found page for unknown paths', () => {
    expect(render('/no-such-page')).toContain('Page not found');
  });
});
