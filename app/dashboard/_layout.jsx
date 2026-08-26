


import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
 
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
  
const { theme } = useTheme();
const { t } = useLanguage();
  const handleLogout = () => {
    Alert.alert(
      t("logout"),
      t("logoutConfirmMsg"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("logout"),
          style: "destructive",
          onPress: async () => {
            try { 
              await signOut(auth);
 
              router.dismissAll();
 
              router.replace("/public");
            } catch (error) {
              Alert.alert(t("logoutFailedTitle"), error.message);
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
              label={t("logout")}
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
    backgroundColor: theme.primary,
  },
 
  headerTintColor: theme.text,
 
  drawerStyle: {
    backgroundColor: theme.card,
  },
 
  drawerActiveTintColor: theme.primary,
 
  drawerInactiveTintColor: theme.subText,
 
  drawerLabelStyle: {
    fontSize: 16,
    color: theme.text,
  },
}}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: t("dashboard"),
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
            title: t("inventory"),
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
            title: t("monitoring"),
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
            title: t("analytics"),
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
            title: t("alerts"),
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
            title: t("profile"),
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
            title: t("settings"),
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="settings-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Drawer.Screen
  name="privacy"
  options={{
    drawerItemStyle: { display: "none" },
    headerTitle: "Privacy Policy",
     drawerIcon: ({ color, size }) => (
              <Ionicons
                name="settings-outline"
                color={color}
                size={size}
              />
            ),
  }}
/>

<Drawer.Screen
  name="terms"
  options={{
    drawerItemStyle: { display: "none" },
    headerTitle: "Terms & Conditions",
     drawerIcon: ({ color, size }) => (
              <Ionicons
                name="settings-outline"
                color={color}
                size={size}
              />
            ),
  }}
/>
<Drawer.Screen
  name="add-room"
  options={{
    drawerItemStyle: { display: "none" },
    //headerShown: false,
    headerTitle: "Add Rooms",
     drawerIcon: ({ color, size }) => (
              <Ionicons
                name="settings-outline"
                color={color}
                size={size}
              />
            ),
  }}
/>

<Drawer.Screen
  name="view-rooms"
  options={{
    drawerItemStyle: { display: "none" },
    //headerShown: false,
    headerTitle: "View Room",
    
     drawerIcon: ({ color, size }) => (
              <Ionicons
                name="settings-outline"
                color={color}
                size={size}
              />
            ),
  }}
/>

<Drawer.Screen
  name="room-details"
  options={{
    drawerItemStyle: { display: "none" },
    //headerShown: false,
    headerTitle: "Room Details",

     drawerIcon: ({ color, size }) => (
              <Ionicons
                name="settings-outline"
                color={color}
                size={size}
              />
            ),
  }}
/>

<Drawer.Screen
  name="farmer-details"
  options={{
    drawerItemStyle: { display: "none" },
    //headerShown: false,
    headerTitle: "Former Details",
     drawerIcon: ({ color, size }) => (
              <Ionicons
                name="settings-outline"
                color={color}
                size={size}
              />
            ),
  }}
/>
<Drawer.Screen
  name="room-allocation"
  options={{
    drawerItemStyle: { display: "none" },
    //headerShown: false,
    headerTitle: "Room Allocation",
     drawerIcon: ({ color, size }) => (
              <Ionicons
                name="settings-outline"
                color={color}
                size={size}
              />
            ),
  }}
/>
<Drawer.Screen
  name="storage-details"
  options={{
    drawerItemStyle: { display: "none" },
    //headerShown: false,
    headerTitle: "Storage Drtails",
     drawerIcon: ({ color, size }) => (
              <Ionicons
                name="settings-outline"
                color={color}
                size={size}
              />
            ),
  }}
/>

<Drawer.Screen
  name="inventory-list"
  options={{
    drawerItemStyle: { display: "none" },
    //headerShown: false,
    headerTitle: "Storage Drtails",
     drawerIcon: ({ color, size }) => (
              <Ionicons
                name="settings-outline"
                color={color}
                size={size}
              />
            ),
  }}
/>



<Drawer.Screen
  name="forgot-password"
  options={{
    drawerItemStyle: { display: "none" },
    //headerShown: false,
    headerTitle: "Storage Drtails",
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