// import { Ionicons } from "@expo/vector-icons";
// import {
//   DrawerContentScrollView,
//   DrawerItem,
//   DrawerItemList,
// } from "@react-navigation/drawer";
// import { router } from "expo-router";
// import { Drawer } from "expo-router/drawer";
// import { getAuth, signOut } from "firebase/auth";
// import { Alert } from "react-native";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import app from "../../firebaseConfig";
// export default function DashboardLayout() {
//   const auth = getAuth(app);

//   const handleLogout = () => {
//     Alert.alert(
//       "Logout",
//       "Are you sure you want to logout?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Logout",
//           style: "destructive",
//           onPress: async () => {
//             await signOut(auth);
//             router.replace("/public");
//           },
//         },
//       ]
//     );
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Drawer
//         screenOptions={{
//           headerStyle: {
//             backgroundColor: "#2E7D32",
//           },
//           headerTintColor: "#fff",
//           drawerActiveTintColor: "#2E7D32",
//           drawerInactiveTintColor: "#555",
//           drawerLabelStyle: {
//             fontSize: 16,
//           },
//         }}
//       >
//         <Drawer.Screen
//           name="dashboard"
//           options={{
//             title: "Dashboard",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="grid-outline" color={color} size={size} />
//             ),
//           }}
//         />

//         <Drawer.Screen
//           name="inventory"
//           options={{
//             title: "Inventory",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="cube-outline" color={color} size={size} />
//             ),
//           }}
//         />

//         <Drawer.Screen
//           name="monitoring"
//           options={{
//             title: "Monitoring",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="pulse-outline" color={color} size={size} />
//             ),
//           }}
//         />

//         <Drawer.Screen
//           name="analytics"
//           options={{
//             title: "Analytics",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="bar-chart-outline" color={color} size={size} />
//             ),
//           }}
//         />

//         <Drawer.Screen
//           name="alerts"
//           options={{
//             title: "Alerts",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons
//                 name="notifications-outline"
//                 color={color}
//                 size={size}
//               />
//             ),
//           }}
//         />

//         <Drawer.Screen
//           name="profile"
//           options={{
//             title: "Profile",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="person-outline" color={color} size={size} />
//             ),
//           }}
//         />

//         <Drawer.Screen
//           name="settings"
//           options={{
//             title: "Settings",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons name="settings-outline" color={color} size={size} />
//             ),
//           }}
//         />

//         {/* About page from public folder */}
//         <Drawer.Screen
//           name="../public/about"
//           options={{
//             title: "About",
//             drawerIcon: ({ color, size }) => (
//               <Ionicons
//                 name="information-circle-outline"
//                 color={color}
//                 size={size}
//               />
//             ),
//           }}
//         />

//       <Drawer
//   drawerContent={(props) => (
//     <>
//       <DrawerContentScrollView {...props}>
//         <DrawerItemList {...props} />
//       </DrawerContentScrollView>

//       <DrawerItem
//         label="Logout"
//         icon={({ color, size }) => (
//           <Ionicons name="log-out-outline" size={size} color={color} />
//         )}
//         onPress={handleLogout}
//       />
//     </>
//   )}
// ></Drawer>  
//       </Drawer>
//     </GestureHandlerRootView>
//   );
// }




import React from "react";
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";

import { getAuth, signOut } from "firebase/auth";
import app from "../../firebaseConfig";

export default function DashboardLayout() {
  const auth = getAuth(app);

  //const handleLogout = () => {
    // console.log("Logout clicked");
    // Alert.alert(
    //   "Logout",
    //   "Are you sure you want to logout?",
    //   [
    //     {
    //       text: "Cancel",
    //       style: "cancel",
    //     },
    //     {
    //       text: "Logout",
    //       style: "destructive",
    //       onPress: async () => {
    //         try {
    //           await signOut(auth);

    //           // Go to Welcome Page
    //           router.replace("/public/index");
    //         } catch (error: any) {
    //           Alert.alert("Logout Failed", error.message);
    //         }
    //       },
        //},
      //]
    //);
  //};

//   const handleLogout = () => {
//   Alert.alert("Logout", "Are you sure?", [
//     { text: "Cancel", style: "cancel" },
//     {
//       text: "Logout",
//       onPress: async () => {
//         try {
          
//         await signOut(auth);

// router.dismissAll();

// router.replace("/public"); 
//         } catch (e) {
//           console.log(e);
//         }
//       },
//     },
//   ]);
// };



const handleLogout = () => {
  console.log("Logout pressed");

  router.replace("/public");
};

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <>
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <DrawerItem
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
      <Ionicons name="grid-outline" color={color} size={size} />
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