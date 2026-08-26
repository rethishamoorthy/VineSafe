

// import React, { createContext, useContext, useEffect, useState } from "react";
// import * as SecureStore from "expo-secure-store";

// import en from "../locales/en";
// import ta from "../locales/ta";
// import hi from "../locales/hi";

// const LanguageContext = createContext();

// export function LanguageProvider({ children }) {
//   const [language, setLanguage] = useState("en");

//   // Load saved language
//   useEffect(() => {
//     const loadLanguage = async () => {
//       try {
//         const savedLanguage = await SecureStore.getItemAsync("language");

//         if (savedLanguage) {
//           setLanguage(savedLanguage);
//         }
//       } catch (error) {
//         console.log("Language Load Error:", error);
//       }
//     };

//     loadLanguage();
//   }, []);

//   // Save language whenever it changes
//   useEffect(() => {
//     const saveLanguage = async () => {
//       try {
//         await SecureStore.setItemAsync("language", language);
//       } catch (error) {
//         console.log("Language Save Error:", error);
//       }
//     };

//     saveLanguage();
//   }, [language]);

//   const translations = {
//     en,
//     ta,
//     hi,
//   };

//   // Translation function
//   const t = (key) => {
//     return translations[language]?.[key] || key;
//   };

//   return (
//     <LanguageContext.Provider
//       value={{
//         language,
//         setLanguage,
//         languageData: translations[language],
//         t,
//       }}
//     >
//       {children}
//     </LanguageContext.Provider>
//   );
// }

// export function useLanguage() {
//   return useContext(LanguageContext);
// }


import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import en from "../locales/en";
import ta from "../locales/ta";
import hi from "../locales/hi";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  // Load saved language
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await SecureStore.getItemAsync("language");

        if (savedLanguage) {
          setLanguage(savedLanguage);
        }
      } catch (error) {
        console.log("Language Load Error:", error);
      }
    };

    loadLanguage();
  }, []);

  // Save language whenever it changes
  useEffect(() => {
    const saveLanguage = async () => {
      try {
        await SecureStore.setItemAsync("language", language);
      } catch (error) {
        console.log("Language Save Error:", error);
      }
    };

    saveLanguage();
  }, [language]);

  const translations = {
    en,
    ta,
    hi,
  };

  // Translation function — falls back to English for any key missing
  // in the active language, then to the raw key if English is missing it too.
  const t = (key) => {
    return translations[language]?.[key] ?? translations.en?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        languageData: translations[language],
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
