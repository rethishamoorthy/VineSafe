// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// import * as SecureStore from "expo-secure-store";
// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//     const [darkMode, setDarkMode] = useState(false);
//     useEffect(() => {
//   const loadTheme = async () => {
//     const savedTheme = await SecureStore.getItemAsync("theme");

//     if (savedTheme === "dark") {
//       setDarkMode(true);
//     } else {
//       setDarkMode(false);
//     }
//   };

//   loadTheme();
// }, []);

// useEffect(() => {
//   SecureStore.setItemAsync(
//     "theme",
//     darkMode ? "dark" : "light"
//   );
// }, [darkMode]);
  
// const theme = {
//   background: darkMode ? "#0F172A" : "#F7FCF8",
//   background2: darkMode ? "#111827" : "#FFFFFF",

//   card: darkMode ? "#1E293B" : "#FFFFFF",

//   text: darkMode ? "#FFFFFF" : "#123524",

//   subText: darkMode ? "#CBD5E1" : "#64748B",

//   primary: "#2E7D32",

//   border: darkMode ? "#FFFFFF" : "#E5E7EB",

//   // Icon background
//   iconBg: darkMode ? "#334155" : "#E8F5E9",
// };

//   return (
//     <ThemeContext.Provider
//       value={{
//         darkMode,
//         setDarkMode,
//         theme,
//       }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   return useContext(ThemeContext);
// }







import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

// =====================================================
// THEME CONTEXT
// =====================================================

const ThemeContext = createContext(null);

// =====================================================
// THEME STORAGE HELPERS
// =====================================================

const THEME_KEY = "theme";

// Get saved theme
const getSavedTheme = async () => {
  try {
    // -------------------------------
    // WEB
    // -------------------------------
    if (Platform.OS === "web") {
      const savedTheme =
        window.localStorage.getItem(THEME_KEY);

      return savedTheme;
    }

    // -------------------------------
    // ANDROID / IOS
    // -------------------------------
    const savedTheme =
      await SecureStore.getItemAsync(THEME_KEY);

    return savedTheme;
  } catch (error) {
    console.log(
      "Theme load error:",
      error
    );

    return null;
  }
};

// Save theme
const saveTheme = async (theme) => {
  try {
    // -------------------------------
    // WEB
    // -------------------------------
    if (Platform.OS === "web") {
      window.localStorage.setItem(
        THEME_KEY,
        theme
      );

      return;
    }

    // -------------------------------
    // ANDROID / IOS
    // -------------------------------
    await SecureStore.setItemAsync(
      THEME_KEY,
      theme
    );
  } catch (error) {
    console.log(
      "Theme save error:",
      error
    );
  }
};

// =====================================================
// THEME PROVIDER
// =====================================================

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] =
    useState(false);

  const [themeLoaded, setThemeLoaded] =
    useState(false);

  // ===================================================
  // LOAD SAVED THEME
  // ===================================================

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme =
          await getSavedTheme();

        if (savedTheme === "dark") {
          setDarkMode(true);
        } else {
          setDarkMode(false);
        }
      } catch (error) {
        console.log(
          "Failed to load theme:",
          error
        );

        setDarkMode(false);
      } finally {
        setThemeLoaded(true);
      }
    };

    loadTheme();
  }, []);

  // ===================================================
  // SAVE THEME WHEN IT CHANGES
  // ===================================================

  useEffect(() => {
    // Don't save before initial theme loading
    if (!themeLoaded) {
      return;
    }

    const themeValue =
      darkMode ? "dark" : "light";

    saveTheme(themeValue);
  }, [darkMode, themeLoaded]);

  // ===================================================
  // THEME COLORS
  // ===================================================

  const theme = {
    // Main background
    background: darkMode
      ? "#0F172A"
      : "#F7FCF8",

    // Secondary background
    background2: darkMode
      ? "#111827"
      : "#FFFFFF",

    // Cards
    card: darkMode
      ? "#1E293B"
      : "#FFFFFF",

    // Main text
    text: darkMode
      ? "#FFFFFF"
      : "#123524",

    // Secondary text
    subText: darkMode
      ? "#CBD5E1"
      : "#64748B",

    // Primary VineSafe green
    primary: "#2E7D32",

    // Borders
    border: darkMode
      ? "#475569"
      : "#E5E7EB",

    // Icon background
    iconBg: darkMode
      ? "#334155"
      : "#E8F5E9",
  };

  // ===================================================
  // CONTEXT VALUE
  // ===================================================

  const value = {
    darkMode,
    setDarkMode,
    theme,
  };

  // ===================================================
  // PROVIDER
  // ===================================================

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// =====================================================
// USE THEME HOOK
// =====================================================

export function useTheme() {
  const context = useContext(
    ThemeContext
  );

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}