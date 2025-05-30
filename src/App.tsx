import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AxiomProvider } from "@optiaxiom/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AxiomProvider>
            <Routes>
              <Route path="/" element={<Index />}>
                <Route index element={<Navigate to="/about" replace />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AxiomProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
