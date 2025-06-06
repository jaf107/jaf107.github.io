import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import {
  FiMoon,
  FiSun,
  FiBriefcase,
  FiCode,
  FiAward,
  FiUser,
  FiMail,
  FiStar,
  FiHeart,
  FiList,
  FiFileText,
} from "react-icons/fi";
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
  Box,
} from "@optiaxiom/react";
import navigationData from "../data/navigation.json";

const SectionTabs = () => {
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("about");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace(/^\//, "") || "about";
    setActiveSection(path);
  }, [location.pathname]);

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    navigate(`/${sectionId}`);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "User":
        return <FiUser size={20} />;
      case "Briefcase":
        return <FiBriefcase size={20} />;
      case "Code":
        return <FiCode size={20} />;
      case "Brain":
        return <FiHeart size={20} />;
      case "Sparkles":
        return <FiStar size={20} />;
      case "Award":
        return <FiAward size={20} />;
      case "GraduationCap":
        return <FiUser size={20} />;
      case "FileText":
        return <FiFileText size={20} />;
      case "Mail":
        return <FiMail size={20} />;
      default:
        return <FiUser size={20} />;
    }
  };

  return (
    <Box className="flex h-screen overflow-hidden">
      <Sidebar defaultExpanded>
        <Nav>
          <NavHeader alignItems={"start"} my="4">
            <NavItem icon={<Logo size={40} />}>
              <Text ml="8" fontSize="lg" fontWeight="700">
                Abu Jafar
              </Text>
            </NavItem>
          </NavHeader>
          <NavBody mt="32">
            {navigationData.map((item) => (
              <NavItem
                key={item.id}
                id={item.id}
                icon={getIconComponent(item.icon)}
                onClick={() => handleSectionChange(item.id)}
                active={activeSection === item.id}
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
                <Box className="relative w-5 h-5">
                  <FiSun className="h-5 w-5 absolute transition-all dark:scale-0 dark:opacity-0" />
                  <FiMoon className="h-5 w-5 absolute transition-all scale-0 opacity-0 dark:scale-100 dark:opacity-100" />
                </Box>
              }
            >
              Toggle Theme
            </NavItem>
            <SidebarToggle icon={<FiList size={20} />} />
          </NavFooter>
        </Nav>
      </Sidebar>

      <Box asChild className="flex-1 overflow-auto p-6 pb-20 bg-background">
        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<Hero />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/research" element={<Research />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/education" element={<Education />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </Box>
    </Box>
  );
};

export default SectionTabs;
