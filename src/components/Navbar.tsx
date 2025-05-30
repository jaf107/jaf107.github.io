import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const activeSection = location.pathname.replace(/^\//, '') || 'about';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateToSection = (id: string) => {
    setIsMenuOpen(false);
    navigate(`/${id}`);
  };

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 bg-background/90 backdrop-blur-sm shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary">Abu Jafar</span>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => navigateToSection("about")}
              className={cn(
                "px-3 py-2 text-foreground hover:text-primary transition-colors",
                activeSection === "about" && "text-primary font-medium"
              )}
            >
              About
            </button>
            <button
              onClick={() => navigateToSection("experience")}
              className={cn(
                "px-3 py-2 text-foreground hover:text-primary transition-colors",
                activeSection === "experience" && "text-primary font-medium"
              )}
            >
              Experience
            </button>
            <button
              onClick={() => navigateToSection("projects")}
              className={cn(
                "px-3 py-2 text-foreground hover:text-primary transition-colors",
                activeSection === "projects" && "text-primary font-medium"
              )}
            >
              Projects
            </button>
            <button
              onClick={() => navigateToSection("research")}
              className={cn(
                "px-3 py-2 text-foreground hover:text-primary transition-colors",
                activeSection === "research" && "text-primary font-medium"
              )}
            >
              Research
            </button>
            <button
              onClick={() => navigateToSection("skills")}
              className={cn(
                "px-3 py-2 text-foreground hover:text-primary transition-colors",
                activeSection === "skills" && "text-primary font-medium"
              )}
            >
              Skills
            </button>
            <button
              onClick={() => navigateToSection("awards")}
              className={cn(
                "px-3 py-2 text-foreground hover:text-primary transition-colors",
                activeSection === "awards" && "text-primary font-medium"
              )}
            >
              Awards
            </button>
            <button
              onClick={() => navigateToSection("education")}
              className={cn(
                "px-3 py-2 text-foreground hover:text-primary transition-colors",
                activeSection === "education" && "text-primary font-medium"
              )}
            >
              Education
            </button>
            <button
              onClick={() => navigateToSection("contact")}
              className={cn(
                "px-3 py-2 text-foreground hover:text-primary transition-colors",
                activeSection === "contact" && "text-primary font-medium"
              )}
            >
              Contact
            </button>
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={toggleMenu} className="text-foreground">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => navigateToSection("about")}
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md w-full text-left"
            >
              About
            </button>
            <button
              onClick={() => navigateToSection("experience")}
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md w-full text-left"
            >
              Experience
            </button>
            <button
              onClick={() => navigateToSection("projects")}
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md w-full text-left"
            >
              Projects
            </button>
            <button
              onClick={() => navigateToSection("research")}
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md w-full text-left"
            >
              Research
            </button>
            <button
              onClick={() => navigateToSection("skills")}
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md w-full text-left"
            >
              Skills
            </button>
            <button
              onClick={() => navigateToSection("awards")}
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md w-full text-left"
            >
              Awards
            </button>
            <button
              onClick={() => navigateToSection("education")}
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md w-full text-left"
            >
              Education
            </button>
            <button
              onClick={() => navigateToSection("contact")}
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-secondary rounded-md w-full text-left"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
