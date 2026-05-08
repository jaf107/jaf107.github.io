export interface SkillIcon {
  src: string | null;
  bg?: string;
}

export const SKILL_ICONS: Record<string, SkillIcon> = {
  'TypeScript':         { src: 'devicon:typescript' },
  'Python':             { src: 'devicon:python' },
  'C++':                { src: 'devicon:cplusplus' },
  'React':              { src: 'devicon:react' },
  'Next.js':            { src: 'devicon:nextjs', bg: '#000' },
  'Tailwind CSS':       { src: 'devicon:tailwindcss' },
  'shadcn/ui':          { src: 'simpleicons:shadcnui' },
  'Radix UI':           { src: 'simpleicons:radixui' },
  'Storybook':          { src: 'devicon:storybook' },
  'Module Federation':  { src: null },
  'Rspack':             { src: 'simpleicons:rspack' },
  'Node.js':            { src: 'devicon:nodejs' },
  'Hono':               { src: 'simpleicons:hono' },
  'Express':            { src: 'devicon:express', bg: '#000' },
  'FastAPI':            { src: 'devicon:fastapi' },
  'Playwright':         { src: 'devicon:playwright' },
  'Vitest':             { src: 'simpleicons:vitest' },
  'Mocha':              { src: 'devicon:mocha' },
  'MongoDB':            { src: 'devicon:mongodb' },
  'PostgreSQL':         { src: 'devicon:postgresql' },
  'SQL Server':         { src: 'devicon:microsoftsqlserver' },
  'Supabase':           { src: 'devicon:supabase' },
  'Docker':             { src: 'devicon:docker' },
  'NGINX':              { src: 'devicon:nginx' },
  'GitHub Actions':     { src: 'devicon:githubactions' },
  'AWS CodeArtifact':   { src: 'simpleicons:amazonaws' },
  'AWS S3':             { src: 'simpleicons:amazons3' },
  'Cloudflare Workers': { src: 'devicon:cloudflare' },
};

export function resolveIconUrl(src: string): string {
  if (src.startsWith('devicon:')) {
    const slug = src.replace('devicon:', '');
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`;
  }
  if (src.startsWith('simpleicons:')) {
    const slug = src.replace('simpleicons:', '');
    return `https://cdn.simpleicons.org/${slug}`;
  }
  return src;
}
