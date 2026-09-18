import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

// Paths that now live elsewhere. GitHub Pages sends unknown paths through
// 404.html into the app, which forwards them here.
function Forward({ to }: { to: string }) {
  useEffect(() => { window.location.replace(to); }, [to]);
  return null;
}

const App = () => (
  <ThemeProvider>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/cv" element={<Forward to="/Abu_Jafar_Saifullah_CV.pdf" />} />
      <Route path="/resume_academic.pdf" element={<Forward to="/Abu_Jafar_Saifullah_CV.pdf" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </ThemeProvider>
);

export default App;
