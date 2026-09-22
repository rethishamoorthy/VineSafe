

import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* =========================================
            NORMAL PUBLIC ROUTES
        ========================================= */}

        <Drawer.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />

        <Drawer.Screen
          name="login"
          options={{
            title: "Login",
          }}
        />

        <Drawer.Screen
          name="signup"
          options={{
            title: "Sign Up",
          }}
        />

        <Drawer.Screen
          name="about"
          options={{
            title: "About VineSafe",
          }}
        />

        {/* =========================================
            HIDDEN PASSWORD RESET ROUTES
            These routes can still be opened using
            router.push(), but will NOT appear
            in the Drawer menu.
        ========================================= */}

        <Drawer.Screen
          name="forgot-password"
          options={{
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        />

        <Drawer.Screen
          name="verify-reset-number"
          options={{
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        />

        <Drawer.Screen
          name="reset-password"
          options={{
            drawerItemStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

