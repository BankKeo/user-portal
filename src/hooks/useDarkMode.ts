import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

export function useDarkMode() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("jesam-theme") as Theme | null;
    return saved ?? "system";
  });

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const root = document.documentElement;
      if (mq.matches) root.classList.add("dark");
      else root.classList.remove("dark");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const setAndSaveTheme = (t: Theme) => {
    setTheme(t);
    localStorage.setItem("jesam-theme", t);
  };

  const toggle = () => {
    setAndSaveTheme(isDark ? "light" : "dark");
  };

  return { theme, isDark, toggle, setTheme: setAndSaveTheme };
}
