import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Index from './pages/Index';
import ProjectDetail from './pages/ProjectDetail';
import NotFound from './pages/NotFound';

const App = () => (
  <ThemeProvider>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </ThemeProvider>
);

export default App;
