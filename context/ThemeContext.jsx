import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import * as SecureStore from "expo-secure-store";
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
  const loadTheme = async () => {
    const savedTheme = await SecureStore.getItemAsync("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  };

  loadTheme();
}, []);

useEffect(() => {
  SecureStore.setItemAsync(
    "theme",
    darkMode ? "dark" : "light"
  );
}, [darkMode]);
  
const theme = {
  background: darkMode ? "#0F172A" : "#F7FCF8",
  background2: darkMode ? "#111827" : "#FFFFFF",

  card: darkMode ? "#1E293B" : "#FFFFFF",

  text: darkMode ? "#FFFFFF" : "#123524",

  subText: darkMode ? "#CBD5E1" : "#64748B",

  primary: "#2E7D32",

  border: darkMode ? "#FFFFFF" : "#E5E7EB",

  // Icon background
  iconBg: darkMode ? "#334155" : "#E8F5E9",
};

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}