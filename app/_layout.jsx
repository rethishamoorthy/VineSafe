// import { Stack } from "expo-router";
// import { ThemeProvider } from "../context/ThemeContext";
// export default function RootLayout() {
//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="public" />
//       <Stack.Screen name="dashboard" />
//     </Stack>
//   );
// }


// import { Stack } from "expo-router";
// import { ThemeProvider } from "../context/ThemeContext";
// import { LanguageProvider } from "../context/LanguageContext";
// export default function RootLayout() {
//   return (
//     <ThemeProvider>
//          <LanguageProvider>
//       <Stack screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="public" />
//         <Stack.Screen name="dashboard" />
//       </Stack>
//           </LanguageProvider>
//     </ThemeProvider>
//   );
// }



// import { useEffect } from "react";
// import { registerForPushNotificationsAsync } from "../utils/notifications";
// import { Stack } from "expo-router";
// import { ThemeProvider } from "../context/ThemeContext";
// import { LanguageProvider } from "../context/LanguageContext";

// export default function RootLayout() {
//   useEffect(() => {
//     registerForPushNotificationsAsync();
//   }, []);

//   return (
//     <ThemeProvider>
//       <LanguageProvider>
//         <Stack screenOptions={{ headerShown: false }} />
//       </LanguageProvider>
//     </ThemeProvider>
//   );
// }




import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import { LanguageProvider } from "../context/LanguageContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </LanguageProvider>
    </ThemeProvider>
  );
}