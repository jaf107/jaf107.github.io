import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Briefcase,
  Code,
  Award,
  GraduationCap,
  Mail,
  Sparkles,
  Brain,
  User,
  ListCollapse,
  FileText,
} from "lucide-react";
import Experience from "./Experience";
import Projects from "./Projects";
import Research from "./Research";
import Skills from "./Skills";
import Awards from "./Awards";
import Education from "./Education";
import Contact from "./Contact";
import Hero from "./Hero";
import Logo from "./Logo";
import {
  Sidebar,
  Nav,
  NavBody,
  NavFooter,
  NavHeader,
  NavItem,
  SidebarToggle,
  Text,
} from "@optiaxiom/react";
import navigationData from "../data/navigation.json";

const SectionTabs = () => {
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setActiveSection(hash);
    }
  }, []);

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);

    // Update URL hash without scrolling
    const scrollPosition = window.pageYOffset;
    window.location.hash = sectionId;
    window.scrollTo(window.pageXOffset, scrollPosition);
  };

  // Get icon component based on icon name from navigation data
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "User":
        return <User size={20} />;
      case "Briefcase":
        return <Briefcase size={20} />;
      case "Code":
        return <Code size={20} />;
      case "Brain":
        return <Brain size={20} />;
      case "Sparkles":
        return <Sparkles size={20} />;
      case "Award":
        return <Award size={20} />;
      case "GraduationCap":
        return <GraduationCap size={20} />;
      case "FileText":
        return <FileText size={20} />;
      case "Mail":
        return <Mail size={20} />;
      default:
        return <User size={20} />;
    }
  };

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "about":
        return <Hero />;
      case "experience":
        return <Experience />;
      case "projects":
        return <Projects />;
      case "research":
        return <Research />;
      case "skills":
        return <Skills />;
      case "awards":
        return <Awards />;
      case "education":
        return <Education />;
      case "contact":
        return <Contact />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar defaultExpanded>
        <Nav>
          <NavHeader alignItems={"start"} my="4">
            <NavItem icon={<Logo size={40} />}>
              <Text fontSize="lg" fontWeight="700">
                Abu Jafar
              </Text>
            </NavItem>
          </NavHeader>
          <NavBody>
            {navigationData.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                icon={getIconComponent(item.icon)}
                onClick={() => handleSectionChange(item.id)}
              >
                {item.label}
              </NavItem>
            ))}
          </NavBody>
          <NavFooter>
            <NavItem
              id="theme-toggle"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              icon={
                <div className="relative w-5 h-5">
                  <Sun className="h-5 w-5 absolute transition-all dark:scale-0 dark:opacity-0" />
                  <Moon className="h-5 w-5 absolute transition-all scale-0 opacity-0 dark:scale-100 dark:opacity-100" />
                </div>
              }
            >
              Toggle Theme
            </NavItem>
            <SidebarToggle icon={<ListCollapse size={20} />} />
          </NavFooter>
        </Nav>
      </Sidebar>

      <main className="flex-1 overflow-auto p-6 pb-20 bg-background">
        {renderContent()}
      </main>
    </div>
  );
};

export default SectionTabs;
