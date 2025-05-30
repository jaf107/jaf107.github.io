import { useTheme } from "next-themes";
import { Button } from "@optiaxiom/react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      appearance="subtle"
      icon={theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    />
  );
};

export default ThemeToggle;
