export interface SkillIcon {
  src: string | null;
  invertOnDark?: boolean;
}

export const SKILL_ICONS: Record<string, SkillIcon> = {
  TypeScript:          { src: "devicon:typescript" },
  Python:              { src: "devicon:python" },
  "C++":               { src: "devicon:cplusplus" },
  React:               { src: "devicon:react" },
  "React 19":           { src: "devicon:react" },
  Angular:             { src: "devicon:angularjs" },
  "Tailwind CSS":      { src: "devicon:tailwindcss" },
  "shadcn/ui":         { src: "simpleicons:shadcnui", invertOnDark: true },
  "Radix UI":          { src: "simpleicons:radixui", invertOnDark: true },
  Storybook:           { src: "devicon:storybook" },
  "Node.js":           { src: "devicon:nodejs" },
  Hono:                { src: "simpleicons:hono" },
  Express:             { src: "simpleicons:express", invertOnDark: true },
  FastAPI:             { src: "devicon:fastapi" },
  Flask:               { src: "devicon:flask", invertOnDark: true },
  Playwright:          { src: "devicon:playwright" },
  Vitest:              { src: "simpleicons:vitest" },
  Mocha:               { src: "devicon:mocha" },
  MongoDB:             { src: "devicon:mongodb" },
  PostgreSQL:          { src: "devicon:postgresql" },
  "SQL Server":        { src: "devicon:microsoftsqlserver" },
  "ASP.NET Core":      { src: "simpleicons:dotnet" },
  "EF Core":           { src: "simpleicons:dotnet" },
  Supabase:            { src: "devicon:supabase" },
  Docker:              { src: "devicon:docker" },
  TensorFlow:          { src: "devicon:tensorflow" },
  pandas:              { src: "devicon:pandas" },
  "scikit-learn":      { src: "devicon:scikitlearn" },
  "Spring Boot 3":     { src: "devicon:spring" },
  NGINX:               { src: "devicon:nginx" },
  "AWS S3":            { src: "simpleicons:amazons3" },
  "OpenAI API":        { src: "simpleicons:openai", invertOnDark: true },
  HuggingFace:         { src: "simpleicons:huggingface" },
  MUI:                 { src: "simpleicons:mui" },
  Carbon:              { src: "simpleicons:ibm", invertOnDark: true },
  "Fluent UI":         { src: "simpleicons:microsoft" },
  GitPython:           { src: "devicon:git" },
  Chromium:            { src: "simpleicons:chromium" },
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
