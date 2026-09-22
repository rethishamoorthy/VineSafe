
// import { LinearGradient } from "expo-linear-gradient";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { doc, getDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import {
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import Animated, {
//   FadeInDown,
// } from "react-native-reanimated";
// import { useRouter } from "expo-router";

// import { auth, db } from "../../firebaseConfig";
// import { useTheme } from "../../context/ThemeContext";
// import { useLanguage } from "../../context/LanguageContext";


// export default function Dashboard() {

//   const router = useRouter();

//   const [userName, setUserName] = useState("");

//   const {
//     theme,
//     darkMode
//   } = useTheme();

//   const { t } = useLanguage();


//   // ===================================================
//   // LOAD USER
//   // ===================================================

//   useEffect(() => {

//     const loadUser = async () => {

//       try {

//         const user = auth.currentUser;

//         if (!user) {

//           router.replace("/public/login");

//           return;
//         }


//         const docRef =
//           doc(db, "users", user.uid);

//         const docSnap =
//           await getDoc(docRef);


//         if (docSnap.exists()) {

//           setUserName(
//             docSnap.data().name || ""
//           );

//         }

//       } catch (error) {

//         console.log(
//           "Error loading user:",
//           error
//         );

//       }

//     };


//     loadUser();

//   }, []);


//   // ===================================================
//   // GREETING
//   // ===================================================

//   const hour =
//     new Date().getHours();

//   let greeting = "";


//   if (hour < 12) {

//     greeting =
//       t("goodMorning");

//   } else if (hour < 17) {

//     greeting =
//       t("goodAfternoon");

//   } else {

//     greeting =
//       t("goodEvening");

//   }


//   // ===================================================
//   // CARD STYLE
//   // ===================================================

//   const cardStyle = [

//     styles.card,

//     {
//       backgroundColor:
//         theme.card,

//       borderWidth:
//         darkMode ? 1 : 0,

//       borderColor:
//         theme.border,

//       elevation:
//         darkMode ? 0 : 4,
//     },

//   ];


//   // ===================================================
//   // UI
//   // ===================================================

//   return (

//     <LinearGradient
//       colors={[
//         theme.background,
//         theme.background2
//       ]}
//       style={styles.container}
//     >

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={
//           styles.scrollContent
//         }
//       >

//         <Animated.View
//           entering={
//             FadeInDown.duration(600)
//           }
//         >


//           {/* =========================================
//               HEADER
//           ========================================= */}

//           <View style={styles.header}>

//             <Text
//               style={[
//                 styles.logo,
//                 {
//                   color: theme.text
//                 }
//               ]}
//             >
//               VineSafe
//             </Text>


//             <Text
//               style={[
//                 styles.systemTitle,
//                 {
//                   color: theme.subText
//                 }
//               ]}
//             >
//               {t("systemTitle")}
//             </Text>


//             {/* PROFILE */}

//             <View
//               style={[
//                 styles.profileCard,
//                 {
//                   backgroundColor:
//                     theme.card,

//                   borderWidth:
//                     darkMode ? 1 : 0,

//                   borderColor:
//                     theme.border,

//                   elevation:
//                     darkMode ? 0 : 4,
//                 }
//               ]}
//             >

//               <View
//                 style={
//                   styles.profileTextContainer
//                 }
//               >

//                 <Text
//                   style={[
//                     styles.greeting,
//                     {
//                       color:
//                         theme.subText
//                     }
//                   ]}
//                 >
//                   {greeting}
//                 </Text>


//                 <Text
//                   style={[
//                     styles.userName,
//                     {
//                       color:
//                         theme.text
//                     }
//                   ]}
//                   numberOfLines={1}
//                 >
//                   {userName}
//                 </Text>


//                 <Text
//                   style={[
//                     styles.role,
//                     {
//                       color:
//                         theme.primary
//                     }
//                   ]}
//                 >
//                   {t("storageManager")}
//                 </Text>

//               </View>


//               <MaterialCommunityIcons
//                 name="account-circle"
//                 size={60}
//                 color={theme.primary}
//               />

//             </View>

//           </View>



//           {/* =========================================
//               SENSOR MONITORING
//           ========================================= */}

//           <View style={styles.row}>

//             <Pressable
//               style={cardStyle}
//               onPress={() =>
//                 router.push(
//                   "/dashboard/sensor-monitoring"
//                 )
//               }
//             >

//               <MaterialCommunityIcons
//                 name="access-point"
//                 size={42}
//                 color="#2E7D32"
//               />


//               <Text
//                 style={[
//                   styles.cardTitle,
//                   {
//                     color:
//                       theme.text
//                   }
//                 ]}
//               >
//                 Sensor Monitoring
//               </Text>


//               <Text
//                 style={[
//                   styles.value,
//                   {
//                     color:
//                       theme.primary
//                   }
//                 ]}
//               >
//                 View Rooms
//               </Text>

//             </Pressable>


//             {/* INVENTORY */}

//             <View style={cardStyle}>

//               <MaterialCommunityIcons
//                 name="package-variant"
//                 size={42}
//                 color="#2E7D32"
//               />


//               <Text
//                 style={[
//                   styles.cardTitle,
//                   {
//                     color:
//                       theme.text
//                   }
//                 ]}
//               >
//                 {t("inventory")}
//               </Text>


//               <Text
//                 style={[
//                   styles.value,
//                   {
//                     color:
//                       theme.primary
//                   }
//                 ]}
//               >
//                 View Inventory
//               </Text>

//             </View>

//           </View>



//           {/* =========================================
//               ALERTS + ANALYTICS
//           ========================================= */}

//           <View style={styles.row}>

//             <View style={cardStyle}>

//               <MaterialCommunityIcons
//                 name="alert-circle"
//                 size={42}
//                 color="#2E7D32"
//               />


//               <Text
//                 style={[
//                   styles.cardTitle,
//                   {
//                     color:
//                       theme.text
//                   }
//                 ]}
//               >
//                 {t("alerts")}
//               </Text>


//               <Text
//                 style={[
//                   styles.value,
//                   {
//                     color:
//                       theme.primary
//                   }
//                 ]}
//               >
//                 View Alerts
//               </Text>

//             </View>


//             <View style={cardStyle}>

//               <MaterialCommunityIcons
//                 name="chart-line"
//                 size={42}
//                 color="#2E7D32"
//               />


//               <Text
//                 style={[
//                   styles.cardTitle,
//                   {
//                     color:
//                       theme.text
//                   }
//                 ]}
//               >
//                 {t("analytics")}
//               </Text>


//               <Text
//                 style={[
//                   styles.value,
//                   {
//                     color:
//                       theme.primary
//                   }
//                 ]}
//               >
//                 {t("view")}
//               </Text>

//             </View>

//           </View>


//         </Animated.View>

//       </ScrollView>

//     </LinearGradient>

//   );

// }


// /* =====================================================
//    STYLES
// ===================================================== */

// const styles =
//   StyleSheet.create({

//     container: {
//       flex: 1,
//       padding: 20,
//     },

//     scrollContent: {
//       paddingBottom: 40,
//     },

//     row: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//       marginBottom: 20,
//     },

//     card: {
//       width: "48%",
//       borderRadius: 15,
//       padding: 20,
//       alignItems: "center",
//     },

//     cardTitle: {
//       marginTop: 10,
//       fontWeight: "bold",
//       textAlign: "center",
//     },

//     value: {
//       marginTop: 8,
//       fontSize: 17,
//       fontWeight: "bold",
//       textAlign: "center",
//     },

//     header: {
//       marginTop: 40,
//       marginBottom: 25,
//     },

//     logo: {
//       fontSize: 30,
//       fontWeight: "900",
//     },

//     systemTitle: {
//       fontSize: 14,
//       marginTop: 3,
//       marginBottom: 22,
//     },

//     profileCard: {
//       borderRadius: 18,
//       padding: 18,
//       flexDirection: "row",
//       justifyContent: "space-between",
//       alignItems: "center",
//     },

//     profileTextContainer: {
//       flex: 1,
//       marginRight: 12,
//     },

//     greeting: {
//       fontSize: 14,
//     },

//     userName: {
//       fontSize: 24,
//       fontWeight: "700",
//       marginTop: 2,
//     },

//     role: {
//       fontSize: 14,
//       marginTop: 4,
//     },

//   });





// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import { doc, getDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import {
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import Animated, {
//   FadeInDown,
// } from "react-native-reanimated";

// import { useLanguage } from "../../context/LanguageContext";
// import { useTheme } from "../../context/ThemeContext";
// import { auth, db } from "../../firebaseConfig";

// export default function Dashboard() {
//   const router = useRouter();

//   const [userName, setUserName] = useState("");

//   const {
//     theme,
//     darkMode,
//   } = useTheme();

//   const { t } = useLanguage();

//   // ===================================================
//   // LOAD USER
//   // ===================================================

//   useEffect(() => {
//     const loadUser = async () => {
//       try {
//         const user = auth.currentUser;

//         if (!user) {
//           router.replace("/public/login");
//           return;
//         }

//         const docRef = doc(
//           db,
//           "users",
//           user.uid
//         );

//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           setUserName(
//             docSnap.data().name || ""
//           );
//         }
//       } catch (error) {
//         console.log(
//           "Error loading user:",
//           error
//         );
//       }
//     };

//     loadUser();
//   }, []);

//   // ===================================================
//   // GREETING
//   // ===================================================

//   const hour = new Date().getHours();

//   let greeting = "";

//   if (hour < 12) {
//     greeting = t("goodMorning");
//   } else if (hour < 17) {
//     greeting = t("goodAfternoon");
//   } else {
//     greeting = t("goodEvening");
//   }

//   // ===================================================
//   // CARD STYLE
//   // ===================================================

//   const cardStyle = [
//     styles.card,
//     {
//       backgroundColor: theme.card,

//       borderWidth: darkMode ? 1 : 0,

//       borderColor: theme.border,

//       elevation: darkMode ? 0 : 4,
//     },
//   ];

//   // ===================================================
//   // UI
//   // ===================================================

//   return (
//     <LinearGradient
//       colors={[
//         theme.background,
//         theme.background2,
//       ]}
//       style={styles.container}
//     >
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={
//           styles.scrollContent
//         }
//       >
//         <Animated.View
//           entering={FadeInDown.duration(600)}
//         >
//           {/* =========================================
//               HEADER
//           ========================================= */}

//           <View style={styles.header}>
//             <Text
//               style={[
//                 styles.logo,
//                 {
//                   color: theme.text,
//                 },
//               ]}
//             >
//               VineSafe
//             </Text>

//             <Text
//               style={[
//                 styles.systemTitle,
//                 {
//                   color: theme.subText,
//                 },
//               ]}
//             >
//               {t("systemTitle")}
//             </Text>

//             {/* PROFILE */}

//             <View
//               style={[
//                 styles.profileCard,
//                 {
//                   backgroundColor:
//                     theme.card,

//                   borderWidth:
//                     darkMode ? 1 : 0,

//                   borderColor:
//                     theme.border,

//                   elevation:
//                     darkMode ? 0 : 4,
//                 },
//               ]}
//             >
//               <View
//                 style={
//                   styles.profileTextContainer
//                 }
//               >
//                 <Text
//                   style={[
//                     styles.greeting,
//                     {
//                       color:
//                         theme.subText,
//                     },
//                   ]}
//                 >
//                   {greeting}
//                 </Text>

//                 <Text
//                   style={[
//                     styles.userName,
//                     {
//                       color:
//                         theme.text,
//                     },
//                   ]}
//                   numberOfLines={1}
//                 >
//                   {userName}
//                 </Text>

//                 <Text
//                   style={[
//                     styles.role,
//                     {
//                       color:
//                         theme.primary,
//                     },
//                   ]}
//                 >
//                   {t("storageManager")}
//                 </Text>
//               </View>

//               <MaterialCommunityIcons
//                 name="account-circle"
//                 size={60}
//                 color={theme.primary}
//               />
//             </View>
//           </View>

//           {/* =========================================
//               SENSOR MONITORING + INVENTORY
//           ========================================= */}

//           <View style={styles.row}>

//             {/* SENSOR MONITORING */}

//             <Pressable
//               style={cardStyle}
//               onPress={() =>
//                 router.push(
//                   "/dashboard/sensor-monitoring"
//                 )
//               }
//             >
//               <MaterialCommunityIcons
//                 name="access-point"
//                 size={42}
//                 color="#2E7D32"
//               />

//               <Text
//                 style={[
//                   styles.cardTitle,
//                   {
//                     color: theme.text,
//                   },
//                 ]}
//               >
//                 Sensor Monitoring
//               </Text>

//               <Text
//                 style={[
//                   styles.value,
//                   {
//                     color:
//                       theme.primary,
//                   },
//                 ]}
//               >
//                 View Rooms
//               </Text>
//             </Pressable>

//             {/* INVENTORY */}

//             <Pressable
//               style={cardStyle}
//               onPress={() =>
//                 router.push(
//                   "/dashboard/inventory"
//                 )
//               }
//             >
//               <MaterialCommunityIcons
//                 name="package-variant"
//                 size={42}
//                 color="#2E7D32"
//               />

//               <Text
//                 style={[
//                   styles.cardTitle,
//                   {
//                     color: theme.text,
//                   },
//                 ]}
//               >
//                 {t("inventory")}
//               </Text>

//               <Text
//                 style={[
//                   styles.value,
//                   {
//                     color:
//                       theme.primary,
//                   },
//                 ]}
//               >
//                 View Inventory
//               </Text>
//             </Pressable>

//           </View>

//           {/* =========================================
//               ALERTS + ANALYTICS
//           ========================================= */}

//           <View style={styles.row}>

//             {/* ALERTS */}

//             <Pressable
//               style={cardStyle}
//               onPress={() =>
//                 router.push(
//                   "/dashboard/alerts"
//                 )
//               }
//             >
//               <MaterialCommunityIcons
//                 name="alert-circle"
//                 size={42}
//                 color="#2E7D32"
//               />

//               <Text
//                 style={[
//                   styles.cardTitle,
//                   {
//                     color: theme.text,
//                   },
//                 ]}
//               >
//                 {t("alerts")}
//               </Text>

//               <Text
//                 style={[
//                   styles.value,
//                   {
//                     color:
//                       theme.primary,
//                   },
//                 ]}
//               >
//                 View Alerts
//               </Text>
//             </Pressable>

//             {/* ANALYTICS */}

//             <Pressable
//               style={cardStyle}
//               onPress={() =>
//                 router.push(
//                   "/dashboard/analytics"
//                 )
//               }
//             >
//               <MaterialCommunityIcons
//                 name="chart-line"
//                 size={42}
//                 color="#2E7D32"
//               />

//               <Text
//                 style={[
//                   styles.cardTitle,
//                   {
//                     color: theme.text,
//                   },
//                 ]}
//               >
//                 {t("analytics")}
//               </Text>

//               <Text
//                 style={[
//                   styles.value,
//                   {
//                     color:
//                       theme.primary,
//                   },
//                 ]}
//               >
//                 {t("view")}
//               </Text>
//             </Pressable>

//           </View>

//         </Animated.View>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// /* =====================================================
//    STYLES
// ===================================================== */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },

//   scrollContent: {
//     paddingBottom: 40,
//   },

//   row: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },

//   card: {
//     width: "48%",
//     borderRadius: 15,
//     padding: 20,
//     alignItems: "center",
//   },

//   cardTitle: {
//     marginTop: 10,
//     fontWeight: "bold",
//     textAlign: "center",
//   },

//   value: {
//     marginTop: 8,
//     fontSize: 17,
//     fontWeight: "bold",
//     textAlign: "center",
//   },

//   header: {
//     marginTop: 40,
//     marginBottom: 25,
//   },

//   logo: {
//     fontSize: 30,
//     fontWeight: "900",
//   },

//   systemTitle: {
//     fontSize: 14,
//     marginTop: 3,
//     marginBottom: 22,
//   },

//   profileCard: {
//     borderRadius: 18,
//     padding: 18,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   profileTextContainer: {
//     flex: 1,
//     marginRight: 12,
//   },

//   greeting: {
//     fontSize: 14,
//   },

//   userName: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginTop: 2,
//   },

//   role: {
//     fontSize: 14,
//     marginTop: 4,
//   },
// });





import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
} from "react-native-reanimated";

import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";
import { auth, db } from "../../firebaseConfig";

export default function Dashboard() {
  const router = useRouter();

  const [userName, setUserName] = useState("");

  const { theme, darkMode } = useTheme();
  const { t } = useLanguage();

  // =====================================================
  // LOAD USER
  // =====================================================

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          router.replace("/public/login");
          return;
        }

        const docRef = doc(
          db,
          "users",
          user.uid
        );

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserName(
            docSnap.data().name || ""
          );
        }
      } catch (error) {
        console.log(
          "Error loading user:",
          error
        );
      }
    };

    loadUser();
  }, [router]);

  // =====================================================
  // GREETING
  // =====================================================

  const hour = new Date().getHours();

  let greeting = "";

  if (hour < 12) {
    greeting = t("goodMorning");
  } else if (hour < 17) {
    greeting = t("goodAfternoon");
  } else {
    greeting = t("goodEvening");
  }

  // =====================================================
  // CARD STYLE
  // =====================================================

  const cardStyle = [
    styles.card,
    {
      backgroundColor: theme.card,
      borderWidth: darkMode ? 1 : 0,
      borderColor: theme.border,
      elevation: darkMode ? 0 : 4,
    },
  ];

  // =====================================================
  // NAVIGATION FUNCTIONS
  // =====================================================

  const openSensorMonitoring = () => {
    router.push(
      "/dashboard/sensor-monitoring"
    );
  };

  const openInventory = () => {
    router.push(
      "/dashboard/inventory"
    );
  };

  const openAlerts = () => {
    router.push(
      "/dashboard/alerts"
    );
  };

  const openAnalytics = () => {
    router.push(
      "/dashboard/analytics"
    );
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <LinearGradient
      colors={[
        theme.background,
        theme.background2,
      ]}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >
        <Animated.View
          entering={FadeInDown.duration(600)}
        >

          {/* =================================================
              HEADER
          ================================================= */}

          <View style={styles.header}>

            <Text
              style={[
                styles.logo,
                {
                  color: theme.text,
                },
              ]}
            >
              VineSafe
            </Text>

            <Text
              style={[
                styles.systemTitle,
                {
                  color: theme.subText,
                },
              ]}
            >
              {t("systemTitle")}
            </Text>

            {/* PROFILE */}

            <View
              style={[
                styles.profileCard,
                {
                  backgroundColor:
                    theme.card,

                  borderWidth:
                    darkMode ? 1 : 0,

                  borderColor:
                    theme.border,

                  elevation:
                    darkMode ? 0 : 4,
                },
              ]}
            >
              <View
                style={
                  styles.profileTextContainer
                }
              >

                <Text
                  style={[
                    styles.greeting,
                    {
                      color:
                        theme.subText,
                    },
                  ]}
                >
                  {greeting}
                </Text>

                <Text
                  style={[
                    styles.userName,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {userName}
                </Text>

                <Text
                  style={[
                    styles.role,
                    {
                      color:
                        theme.primary,
                    },
                  ]}
                >
                  {t("storageManager")}
                </Text>

              </View>

              <MaterialCommunityIcons
                name="account-circle"
                size={60}
                color={theme.primary}
              />

            </View>

          </View>

          {/* =================================================
              SENSOR MONITORING + INVENTORY
          ================================================= */}

          <View style={styles.row}>

            {/* SENSOR MONITORING */}

            <Pressable
              style={({ pressed }) => [
                cardStyle,
                pressed &&
                  styles.cardPressed,
              ]}
              onPress={
                openSensorMonitoring
              }
            >
              <MaterialCommunityIcons
                name="access-point"
                size={42}
                color="#2E7D32"
              />

              <Text
                style={[
                  styles.cardTitle,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                Sensor Monitoring
              </Text>

              <Text
                style={[
                  styles.value,
                  {
                    color:
                      theme.primary,
                  },
                ]}
              >
                View Rooms
              </Text>

            </Pressable>

            {/* INVENTORY */}

            <Pressable
              style={({ pressed }) => [
                cardStyle,
                pressed &&
                  styles.cardPressed,
              ]}
              onPress={
                openInventory
              }
            >
              <MaterialCommunityIcons
                name="package-variant"
                size={42}
                color="#2E7D32"
              />

              <Text
                style={[
                  styles.cardTitle,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                {t("inventory")}
              </Text>

              <Text
                style={[
                  styles.value,
                  {
                    color:
                      theme.primary,
                  },
                ]}
              >
                View Inventory
              </Text>

            </Pressable>

          </View>

          {/* =================================================
              ALERTS + ANALYTICS
          ================================================= */}

          <View style={styles.row}>

            {/* ALERTS */}

            <Pressable
              style={({ pressed }) => [
                cardStyle,
                pressed &&
                  styles.cardPressed,
              ]}
              onPress={openAlerts}
            >
              <MaterialCommunityIcons
                name="alert-circle"
                size={42}
                color="#2E7D32"
              />

              <Text
                style={[
                  styles.cardTitle,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                {t("alerts")}
              </Text>

              <Text
                style={[
                  styles.value,
                  {
                    color:
                      theme.primary,
                  },
                ]}
              >
                View Alerts
              </Text>

            </Pressable>

            {/* ANALYTICS */}

            <Pressable
              style={({ pressed }) => [
                cardStyle,
                pressed &&
                  styles.cardPressed,
              ]}
              onPress={openAnalytics}
            >
              <MaterialCommunityIcons
                name="chart-line"
                size={42}
                color="#2E7D32"
              />

              <Text
                style={[
                  styles.cardTitle,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                {t("analytics")}
              </Text>

              <Text
                style={[
                  styles.value,
                  {
                    color:
                      theme.primary,
                  },
                ]}
              >
                {t("view")}
              </Text>

            </Pressable>

          </View>

        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  // ===================================================
  // ROW
  // ===================================================

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  // ===================================================
  // CARD
  // ===================================================

  card: {
    width: "48%",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },

  cardPressed: {
    opacity: 0.75,
    transform: [
      {
        scale: 0.98,
      },
    ],
  },

  cardTitle: {
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },

  value: {
    marginTop: 8,
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },

  // ===================================================
  // HEADER
  // ===================================================

  header: {
    marginTop: 40,
    marginBottom: 25,
  },

  logo: {
    fontSize: 30,
    fontWeight: "900",
  },

  systemTitle: {
    fontSize: 14,
    marginTop: 3,
    marginBottom: 22,
  },

  // ===================================================
  // PROFILE
  // ===================================================

  profileCard: {
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  profileTextContainer: {
    flex: 1,
    marginRight: 12,
  },

  greeting: {
    fontSize: 14,
  },

  userName: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 2,
  },

  role: {
    fontSize: 14,
    marginTop: 4,
  },

});
