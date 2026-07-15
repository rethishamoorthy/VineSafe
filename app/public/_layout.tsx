


// import { Drawer } from "expo-router/drawer";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// export default function Layout() {
//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Drawer screenOptions={{ headerShown: false }}>

//         {/* Main Home (your tabs or home screen) */}
//         <Drawer.Screen
//           name="(tabs)"
//           options={{ title: "Home" }}
//         />

//         <Drawer.Screen
//           name="login"
//           options={{ title: "Login" }}
//         />

//         <Drawer.Screen
//           name="signup"
//           options={{ title: "Sign Up" }}
//         />

//         <Drawer.Screen
//           name="about"
//           options={{ title: "About VineSafe" }}
//         />

//       </Drawer>
//     </GestureHandlerRootView>
//   );
// }




import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{ headerShown: false }}>
        <Drawer.Screen
          name="index"
          options={{ title: "Home" }}
        />

        <Drawer.Screen
          name="login"
          options={{ title: "Login" }}
        />

        <Drawer.Screen
          name="signup"
          options={{ title: "Sign Up" }}
        />

        <Drawer.Screen
          name="about"
          options={{ title: "About VineSafe" }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}