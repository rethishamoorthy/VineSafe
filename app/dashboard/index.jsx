


// import { LinearGradient } from "expo-linear-gradient";
 
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { doc, getDoc } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { ScrollView, StyleSheet, Text, View } from "react-native";
// import Animated, { FadeInDown } from "react-native-reanimated";
// import { useRouter } from "expo-router";
// import { auth, db } from "../../firebaseConfig";
// import { useTheme } from "../../context/ThemeContext";
// import { useLanguage } from "../../context/LanguageContext";
 
// export default function Dashboard() {
//   const router = useRouter();
//   const [userName, setUserName] = useState("");
//   const { theme, darkMode } = useTheme();
//   const { t } = useLanguage();
 
//   useEffect(() => {
//     const loadUser = async () => {
//       const user = auth.currentUser;
 
//       if (!user) {
//         router.replace("/public/login");
//         return;
//       }
 
//       const docRef = doc(db, "users", user.uid);
//       const docSnap = await getDoc(docRef);
 
//       if (docSnap.exists()) {
//         setUserName(docSnap.data().name);
//       }
//     };
 
//     loadUser();
//   }, []);
 
//   const hour = new Date().getHours();
 
//   let greeting = "";
 
//   if (hour < 12) {
//     greeting = t("goodMorning");
//   } else if (hour < 17) {
//     greeting = t("goodAfternoon");
//   } else {
//     greeting = t("goodEvening");
//   }
 
//   // Card border/shadow flips to a flat outlined style in dark mode, same
//   // pattern used on Settings and Profile.
//   const cardStyle = [
//     styles.card,
//     {
//       backgroundColor: theme.card,
//       borderWidth: darkMode ? 1 : 0,
//       borderColor: theme.border,
//       elevation: darkMode ? 0 : 4,
//     },
//   ];
 
//   return (
//     <LinearGradient colors={[theme.background, theme.background2]} style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         <Animated.View entering={FadeInDown.duration(600)}>
//           <View style={styles.header}>
//             <Text style={[styles.logo, { color: theme.text }]}>VineSafe</Text>
 
//             <Text style={[styles.systemTitle, { color: theme.subText }]}>
//               {t("systemTitle")}
//             </Text>
 
//             <View
//               style={[
//                 styles.profileCard,
//                 {
//                   backgroundColor: theme.card,
//                   borderWidth: darkMode ? 1 : 0,
//                   borderColor: theme.border,
//                   elevation: darkMode ? 0 : 4,
//                 },
//               ]}
//             >
//               <View style={styles.profileTextContainer}>
//                 <Text style={[styles.greeting, { color: theme.subText }]}>{greeting}</Text>
//                 <Text style={[styles.userName, { color: theme.text }]} numberOfLines={1}>
//                   {userName}
//                 </Text>
//                 <Text style={[styles.role, { color: theme.primary }]}>
//                   {t("storageManager")}
//                 </Text>
//               </View>
 
//               <MaterialCommunityIcons
//                 name="account-circle"
//                 size={60}
//                 color={theme.primary}
//                 style={styles.profileIcon}
//               />
//             </View>
//           </View>
 
//           <View style={styles.row}>
//             <View style={cardStyle}>
//               <MaterialCommunityIcons name="thermometer" size={42} color="#2E7D32" />
//               <Text style={[styles.cardTitle, { color: theme.text }]}>{t("temperature")}</Text>
//               <Text style={[styles.value, { color: theme.primary }]}>24°C</Text>
//             </View>
 
//             <View style={cardStyle}>
//               <MaterialCommunityIcons name="water-percent" size={42} color="#2196F3" />
//               <Text style={[styles.cardTitle, { color: theme.text }]}>{t("humidity")}</Text>
//               <Text style={[styles.value, { color: theme.primary }]}>65%</Text>
//             </View>
//           </View>
 
//           <View style={styles.row}>
//             <View style={cardStyle}>
//               <MaterialCommunityIcons name="door-closed-lock" size={42} color="#7B1FA2" />
//               <Text style={[styles.cardTitle, { color: theme.text }]}>{t("door")}</Text>
//               <Text style={[styles.value, { color: theme.primary }]}>{t("doorClosed")}</Text>
//             </View>
 
//             <View style={cardStyle}>
//               <MaterialCommunityIcons name="package-variant" size={42} color="#FB8C00" />
//               <Text style={[styles.cardTitle, { color: theme.text }]}>{t("inventory")}</Text>
//               <Text style={[styles.value, { color: theme.primary }]}>
//                 152 {t("boxes")}
//               </Text>
//             </View>
//           </View>
 
//           <View style={styles.row}>
//             <View style={cardStyle}>
//               <MaterialCommunityIcons name="alert-circle" size={42} color="#E53935" />
//               <Text style={[styles.cardTitle, { color: theme.text }]}>{t("alerts")}</Text>
//               <Text style={[styles.value, { color: theme.primary }]}>0</Text>
//             </View>
 
//             <View style={cardStyle}>
//               <MaterialCommunityIcons name="chart-line" size={42} color="#00897B" />
//               <Text style={[styles.cardTitle, { color: theme.text }]}>{t("analytics")}</Text>
//               <Text style={[styles.value, { color: theme.primary }]}>{t("view")}</Text>
//             </View>
//           </View>
//         </Animated.View>
//       </ScrollView>
//     </LinearGradient>
//   );
// }
 
// /* ================= STYLES ================= */
// // Layout/typography only — colors come from theme via inline styles above.
 
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
//     flexWrap: "wrap",
//   },
 
//   value: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: "bold",
//     textAlign: "center",
//     flexWrap: "wrap",
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
//     flexWrap: "wrap",
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
//     flexShrink: 1,
//     marginRight: 12,
//   },
 
//   profileIcon: {
//     flexShrink: 0,
//   },
 
//   greeting: {
//     fontSize: 14,
//     flexWrap: "wrap",
//   },
 
//   userName: {
//     fontSize: 24,
//     fontWeight: "700",
//     marginTop: 2,
//   },
 
//   role: {
//     fontSize: 14,
//     marginTop: 4,
//     flexWrap: "wrap",
//   },
// });
 
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
import { useRouter } from "expo-router";

import { auth, db } from "../../firebaseConfig";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";


export default function Dashboard() {

  const router = useRouter();

  const [userName, setUserName] = useState("");

  const {
    theme,
    darkMode
  } = useTheme();

  const { t } = useLanguage();


  // ===================================================
  // LOAD USER
  // ===================================================

  useEffect(() => {

    const loadUser = async () => {

      try {

        const user = auth.currentUser;

        if (!user) {

          router.replace("/public/login");

          return;
        }


        const docRef =
          doc(db, "users", user.uid);

        const docSnap =
          await getDoc(docRef);


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

  }, []);


  // ===================================================
  // GREETING
  // ===================================================

  const hour =
    new Date().getHours();

  let greeting = "";


  if (hour < 12) {

    greeting =
      t("goodMorning");

  } else if (hour < 17) {

    greeting =
      t("goodAfternoon");

  } else {

    greeting =
      t("goodEvening");

  }


  // ===================================================
  // CARD STYLE
  // ===================================================

  const cardStyle = [

    styles.card,

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

  ];


  // ===================================================
  // UI
  // ===================================================

  return (

    <LinearGradient
      colors={[
        theme.background,
        theme.background2
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
          entering={
            FadeInDown.duration(600)
          }
        >


          {/* =========================================
              HEADER
          ========================================= */}

          <View style={styles.header}>

            <Text
              style={[
                styles.logo,
                {
                  color: theme.text
                }
              ]}
            >
              VineSafe
            </Text>


            <Text
              style={[
                styles.systemTitle,
                {
                  color: theme.subText
                }
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
                }
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
                        theme.subText
                    }
                  ]}
                >
                  {greeting}
                </Text>


                <Text
                  style={[
                    styles.userName,
                    {
                      color:
                        theme.text
                    }
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
                        theme.primary
                    }
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



          {/* =========================================
              SENSOR MONITORING
          ========================================= */}

          <View style={styles.row}>

            <Pressable
              style={cardStyle}
              onPress={() =>
                router.push(
                  "/dashboard/sensor-monitoring"
                )
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
                      theme.text
                  }
                ]}
              >
                Sensor Monitoring
              </Text>


              <Text
                style={[
                  styles.value,
                  {
                    color:
                      theme.primary
                  }
                ]}
              >
                View Rooms
              </Text>

            </Pressable>


            {/* INVENTORY */}

            <View style={cardStyle}>

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
                      theme.text
                  }
                ]}
              >
                {t("inventory")}
              </Text>


              <Text
                style={[
                  styles.value,
                  {
                    color:
                      theme.primary
                  }
                ]}
              >
                152 {t("boxes")}
              </Text>

            </View>

          </View>



          {/* =========================================
              ALERTS + ANALYTICS
          ========================================= */}

          <View style={styles.row}>

            <View style={cardStyle}>

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
                      theme.text
                  }
                ]}
              >
                {t("alerts")}
              </Text>


              <Text
                style={[
                  styles.value,
                  {
                    color:
                      theme.primary
                  }
                ]}
              >
                0
              </Text>

            </View>


            <View style={cardStyle}>

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
                      theme.text
                  }
                ]}
              >
                {t("analytics")}
              </Text>


              <Text
                style={[
                  styles.value,
                  {
                    color:
                      theme.primary
                  }
                ]}
              >
                {t("view")}
              </Text>

            </View>

          </View>


        </Animated.View>

      </ScrollView>

    </LinearGradient>

  );

}


/* =====================================================
   STYLES
===================================================== */

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      padding: 20,
    },

    scrollContent: {
      paddingBottom: 40,
    },

    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },

    card: {
      width: "48%",
      borderRadius: 15,
      padding: 20,
      alignItems: "center",
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