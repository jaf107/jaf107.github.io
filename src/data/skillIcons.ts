export interface SkillIcon {
  src: string | null;
  invertOnDark?: boolean;
}

export const SKILL_ICONS: Record<string, SkillIcon> = {
  TypeScript:          { src: "devicon:typescript" },
  Python:              { src: "devicon:python" },
  "C++":               { src: "devicon:cplusplus" },
  React:               { src: "devicon:react" },
  "Tailwind CSS":      { src: "devicon:tailwindcss" },
  "shadcn/ui":         { src: "simpleicons:shadcnui", invertOnDark: true },
  "Radix UI":          { src: "simpleicons:radixui", invertOnDark: true },
  Storybook:           { src: "devicon:storybook" },
  "Node.js":           { src: "devicon:nodejs" },
  Hono:                { src: "simpleicons:hono" },
  Express:             { src: "simpleicons:express", invertOnDark: true },
  FastAPI:             { src: "devicon:fastapi" },
  Playwright:          { src: "devicon:playwright" },
  Vitest:              { src: "simpleicons:vitest" },
  Mocha:               { src: "devicon:mocha" },
  MongoDB:             { src: "devicon:mongodb" },
  PostgreSQL:          { src: "devicon:postgresql" },
  "SQL Server":        { src: "devicon:microsoftsqlserver" },
  Supabase:            { src: "devicon:supabase" },
  Docker:              { src: "devicon:docker" },
  "GitHub Actions":    { src: "devicon:githubactions" },
  "Cloudflare Workers":{ src: "devicon:cloudflare" },
};

export function resolveIconUrl(src: string): string {
  if (src.startsWith("devicon:")) {
    const rest = src.replace("devicon:", "");
    const [slug, variant = "original"] = rest.split("/");
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-${variant}.svg`;
  }
  if (src.startsWith("simpleicons:")) {
    const slug = src.replace("simpleicons:", "");
    return `https://cdn.simpleicons.org/${slug}`;
  }
  return src;
}
