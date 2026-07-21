


import React from "react";
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { auth, db } from "../../firebaseConfig";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";

import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList,
} from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";

import { signOut } from "firebase/auth";

export default function DashboardLayout() {
  

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(auth);

              router.dismissAll();

              router.replace("/public");
            } catch (error) {
              Alert.alert("Logout Failed", error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <>
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <DrawerItem style={{ paddingBottom: 70 }}
              label="Logout"
              icon={({ color, size }) => (
                <Ionicons
                  name="log-out-outline"
                  color="red"
                  size={size}
                />
              )}
              onPress={handleLogout}
            />
          </>
        )}
        screenOptions={{
          headerStyle: {
            backgroundColor: "#2E7D32",
          },
          headerTintColor: "#fff",
          drawerActiveTintColor: "#2E7D32",
          drawerInactiveTintColor: "#555",
          drawerLabelStyle: {
            fontSize: 16,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Dashboard",
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="grid-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="inventory"
          options={{
            title: "Inventory",
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="cube-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="monitoring"
          options={{
            title: "Monitoring",
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="pulse-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="analytics"
          options={{
            title: "Analytics",
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="bar-chart-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="alerts"
          options={{
            title: "Alerts",
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="notifications-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="profile"
          options={{
            title: "Profile",
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="person-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="settings"
          options={{
            title: "Settings",
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="settings-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}