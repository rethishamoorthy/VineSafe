// import React, {
//   useCallback,
//   useEffect,
//   useState,
// } from "react";

// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   RefreshControl,
//   ActivityIndicator,
// } from "react-native";
// import { sendTestNotification } from "../../utils/notifications";
// import { Ionicons } from "@expo/vector-icons";
// import { StatusBar } from "expo-status-bar";
// import { useFocusEffect } from "@react-navigation/native";

// // =====================================================
// // BACKEND API
// // =====================================================

// const API_URL = "http://10.147.4.54:5000";

// // =====================================================
// // ALERTS SCREEN
// // =====================================================

// export default function Alerts() {
//   const [alerts, setAlerts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [error, setError] = useState(null);

//   // ===================================================
//   // FETCH ALERTS
//   // ===================================================

//   // const fetchAlerts = async () => {
//   //   try {
//   //     setError(null);

//   //     const url = `${API_URL}/api/alerts`;

//   //     console.log("=================================");
//   //     console.log("🔔 ALERT API REQUEST");
//   //     console.log("URL:", url);

//   //     const response = await fetch(url);

//   //     console.log("📡 HTTP STATUS:", response.status);

//   //     const responseText = await response.text();

//   //     console.log("📦 RAW RESPONSE:", responseText);

//   //     if (!response.ok) {
//   //       throw new Error(
//   //         `Server returned HTTP ${response.status}`
//   //       );
//   //     }

//   //     let result;

//   //     try {
//   //       result = JSON.parse(responseText);
//   //     } catch (parseError) {
//   //       throw new Error(
//   //         "Server returned invalid JSON"
//   //       );
//   //     }

//   //     console.log("✅ PARSED ALERT RESPONSE:", result);

//   //     if (!result.success) {
//   //       throw new Error(
//   //         result.message || "Alert API failed"
//   //       );
//   //     }

//   //     const alertData = Array.isArray(result.data)
//   //       ? result.data
//   //       : [];

//   //     console.log(
//   //       "🚨 ALERT COUNT:",
//   //       alertData.length
//   //     );

//   //     setAlerts(alertData);

//   //   } catch (err) {
//   //     console.error(
//   //       "❌ ALERT API ERROR:",
//   //       err.message
//   //     );

//   //     setError(
//   //       `Unable to load alerts: ${err.message}`
//   //     );

//   //   } finally {
//   //     setLoading(false);
//   //     setRefreshing(false);
//   //   }
//   // };

// const fetchAlerts = async () => {
//   try {
//     console.log("=================================");
//     console.log("🔔 ALERT API TEST");
//     console.log("📡 URL:", `${API_URL}/api/alerts`);

//     const response = await fetch(
//       `${API_URL}/api/alerts`,
//       {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//         },
//       }
//     );

//     console.log("📡 HTTP Status:", response.status);

//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status}`);
//     }

//     const text = await response.text();

//     console.log("📦 Raw response:", text);

//     const result = JSON.parse(text);

//     console.log("✅ Parsed response:", result);

//     if (result.success && Array.isArray(result.data)) {
//       setAlerts(result.data);
//       setError(null);
//     } else {
//       throw new Error(
//         result.message || "Invalid alert response"
//       );
//     }

//   } catch (error) {
//     console.error("❌ Alert fetch error:", error);

//     setError(
//       "Unable to connect to the server. Please check Wi-Fi."
//     );
//   } finally {
//     setLoading(false);
//     setRefreshing(false);
//   }
// };


//   // ===================================================
//   // INITIAL LOAD
//   // ===================================================

//   useEffect(() => {
//     fetchAlerts();
//   }, []);

//   // ===================================================
//   // REFRESH WHEN SCREEN OPENS
//   // ===================================================

//   useFocusEffect(
//     useCallback(() => {
//       fetchAlerts();
//     }, [])
//   );

//   // ===================================================
//   // AUTO REFRESH
//   // ===================================================

//   useEffect(() => {
//     const interval = setInterval(() => {
//       fetchAlerts();
//     }, 5000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   // ===================================================
//   // PULL TO REFRESH
//   // ===================================================

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchAlerts();
//   };

//   // ===================================================
//   // ACTIVE ALERTS
//   // ===================================================

//   const activeAlerts = alerts.filter(
//     (alert) => alert.status === "Active"
//   );

//   const activeCount = activeAlerts.length;

//   // ===================================================
//   // FORMAT DATE
//   // ===================================================

//   const formatTime = (dateString) => {
//     if (!dateString) {
//       return "";
//     }

//     const date = new Date(dateString);

//     if (isNaN(date.getTime())) {
//       return "";
//     }

//     return date.toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   // ===================================================
//   // ALERT INFORMATION
//   // ===================================================

//   const getAlertInfo = (alertType) => {
//     switch (alertType) {
//       case "HIGH_TEMPERATURE":
//         return {
//           icon: "thermometer",
//           color: "#E53935",
//           background: "#FDECEC",
//           title: "High Temperature",
//           type: "Critical",
//         };

//       case "LOW_TEMPERATURE":
//         return {
//           icon: "thermometer-outline",
//           color: "#1976D2",
//           background: "#EAF3FF",
//           title: "Low Temperature",
//           type: "Warning",
//         };

//       case "HIGH_HUMIDITY":
//         return {
//           icon: "water",
//           color: "#F57C00",
//           background: "#FFF3E5",
//           title: "High Humidity",
//           type: "Warning",
//         };

//       case "LOW_HUMIDITY":
//         return {
//           icon: "water-outline",
//           color: "#1976D2",
//           background: "#EAF3FF",
//           title: "Low Humidity",
//           type: "Warning",
//         };

//       case "HIGH_GAS":
//         return {
//           icon: "flask",
//           color: "#E53935",
//           background: "#FDECEC",
//           title: "High Gas Level",
//           type: "Critical",
//         };

//       default:
//         return {
//           icon: "warning-outline",
//           color: "#F57C00",
//           background: "#FFF3E5",
//           title: "Storage Alert",
//           type: "Warning",
//         };
//     }
//   };

//   // ===================================================
//   // LOADING
//   // ===================================================

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator
//           size="large"
//           color="#1B5E20"
//         />

//         <Text style={styles.loadingText}>
//           Loading alerts...
//         </Text>
//       </View>
//     );
//   }

//   // ===================================================
//   // MAIN
//   // ===================================================

//   return (
//     <View style={styles.container}>
//       <StatusBar style="dark" />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={handleRefresh}
//           />
//         }
//       >
//         {/* HEADER */}

//         <Text style={styles.title}>
//           Alerts
//         </Text>

//         <Text style={styles.subtitle}>
//           Storage monitoring notifications
//         </Text>

//         {/* ERROR */}

//         {error && (
//           <View style={styles.errorCard}>
//             <Ionicons
//               name="cloud-offline-outline"
//               size={25}
//               color="#E53935"
//             />

//             <Text style={styles.errorText}>
//               {error}
//             </Text>
//           </View>
//         )}

//         {/* SUMMARY */}

//         <View style={styles.summaryCard}>
//           <View
//             style={[
//               styles.summaryIcon,
//               activeCount > 0
//                 ? styles.summaryDanger
//                 : styles.summarySafe,
//             ]}
//           >
//             <Ionicons
//               name="notifications-outline"
//               size={28}
//               color={
//                 activeCount > 0
//                   ? "#E53935"
//                   : "#2E7D32"
//               }
//             />
//           </View>

//           <View style={styles.summaryContent}>
//             <Text style={styles.summaryTitle}>
//               {activeCount}{" "}
//               {activeCount === 1
//                 ? "Active Alert"
//                 : "Active Alerts"}
//             </Text>

//             <Text style={styles.summaryText}>
//               {activeCount > 0
//                 ? "Check the storage conditions below"
//                 : "All storage conditions are normal"}
//             </Text>
//           </View>
//         </View>

//         {/* RECENT ALERTS */}

//         <Text style={styles.sectionTitle}>
//           Recent Alerts
//         </Text>

//         {/* EMPTY */}

//         {alerts.length === 0 && (
//           <View style={styles.emptyCard}>
//             <View style={styles.emptyIcon}>
//               <Ionicons
//                 name="shield-checkmark"
//                 size={35}
//                 color="#2E7D32"
//               />
//             </View>

//             <Text style={styles.emptyTitle}>
//               No Alerts
//             </Text>

//             <Text style={styles.emptyText}>
//               There are currently no storage
//               monitoring alerts.
//             </Text>
//           </View>
//         )}

//         {/* REAL ALERTS */}

//         {alerts.map((alert) => {
//           const info = getAlertInfo(
//             alert.alert_type
//           );

//           const isActive =
//             alert.status === "Active";

//           return (
//             <AlertCard
//               key={alert.alert_id}
//               icon={info.icon}
//               iconColor={
//                 isActive
//                   ? info.color
//                   : "#2E7D32"
//               }
//               iconBackground={
//                 isActive
//                   ? info.background
//                   : "#EAF6EC"
//               }
//               title={info.title}
//               message={
//                 alert.message ||
//                 "Storage condition requires attention."
//               }
//               roomNumber={
//                 alert.room_number ||
//                 `Room ${alert.room_id}`
//               }
//               value={
//                 alert.sensor_value !== null &&
//                 alert.sensor_value !== undefined
//                   ? alert.sensor_value
//                   : "--"
//               }
//               time={
//                 isActive
//                   ? formatTime(alert.created_at)
//                   : formatTime(alert.resolved_at)
//               }
//               type={
//                 isActive
//                   ? info.type
//                   : "Resolved"
//               }
//               typeColor={
//                 isActive
//                   ? info.color
//                   : "#2E7D32"
//               }
//               status={alert.status}
//             />
//           );
//         })}

//         {/* MONITORING STATUS */}

//         <View style={styles.safeCard}>
//           <View style={styles.safeIcon}>
//             <Ionicons
//               name="shield-checkmark"
//               size={28}
//               color="#2E7D32"
//             />
//           </View>

//           <View style={styles.safeContent}>
//             <Text style={styles.safeTitle}>
//               Storage Monitoring Active
//             </Text>

//             <Text style={styles.safeText}>
//               VineSafe is continuously monitoring
//               temperature, humidity, gas level
//               and door status.
//             </Text>
//           </View>
//         </View>

//         {/* REFRESH BUTTON */}

//         <TouchableOpacity
//           style={styles.button}
//           onPress={fetchAlerts}
//         >
//           <Ionicons
//             name="refresh-outline"
//             size={20}
//             color="#FFFFFF"
//           />

//           <Text style={styles.buttonText}>
//             Refresh Alerts
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// }

// // =====================================================
// // ALERT CARD
// // =====================================================

// function AlertCard({
//   icon,
//   iconColor,
//   iconBackground,
//   title,
//   message,
//   roomNumber,
//   value,
//   time,
//   type,
//   typeColor,
//   status,
// }) {
//   const isResolved = status === "Resolved";

//   return (
//     <View
//       style={[
//         styles.alertCard,
//         isResolved && styles.resolvedCard,
//       ]}
//     >
//       {/* ICON */}

//       <View
//         style={[
//           styles.alertIcon,
//           {
//             backgroundColor:
//               iconBackground,
//           },
//         ]}
//       >
//         <Ionicons
//           name={icon}
//           size={24}
//           color={iconColor}
//         />
//       </View>

//       {/* CONTENT */}

//       <View style={styles.alertContent}>
//         {/* TOP */}

//         <View style={styles.alertTop}>
//           <Text
//             style={styles.alertTitle}
//             numberOfLines={1}
//           >
//             {title}
//           </Text>

//           <View
//             style={[
//               styles.typeBadge,
//               {
//                 backgroundColor:
//                   `${typeColor}15`,
//               },
//             ]}
//           >
//             <Text
//               style={[
//                 styles.typeText,
//                 {
//                   color: typeColor,
//                 },
//               ]}
//             >
//               {type}
//             </Text>
//           </View>
//         </View>

//         {/* ROOM */}

//         <Text style={styles.roomText}>
//           {roomNumber}
//         </Text>

//         {/* MESSAGE */}

//         <Text style={styles.alertMessage}>
//           {message}
//         </Text>

//         {/* VALUE + TIME */}

//         <View style={styles.alertBottom}>
//           <Text
//             style={[
//               styles.alertValue,
//               {
//                 color: iconColor,
//               },
//             ]}
//           >
//             {value}
//           </Text>

//           <Text style={styles.alertTime}>
//             {time}
//           </Text>
//         </View>

//         {/* STATUS */}

//         <View style={styles.statusRow}>
//           <Ionicons
//             name={
//               isResolved
//                 ? "checkmark-circle"
//                 : "radio-button-on"
//             }
//             size={14}
//             color={typeColor}
//           />

//           <Text
//             style={[
//               styles.statusText,
//               {
//                 color: typeColor,
//               },
//             ]}
//           >
//             {status}
//           </Text>
//           <TouchableOpacity
//   style={styles.button}
//   onPress={fetchAlerts}
// >
//   <Ionicons
//     name="refresh-outline"
//     size={20}
//     color="#FFFFFF"
//   />

//   <Text style={styles.buttonText}>
//     Refresh Alerts
//   </Text>
// </TouchableOpacity>


// {/* =================================================
//     TEST NOTIFICATION
// ================================================= */}

// <TouchableOpacity
//   style={[
//     styles.button,
//     {
//       marginTop: 12,
//       backgroundColor: "#E53935",
//     },
//   ]}
//   onPress={sendTestNotification}
// >
//   <Ionicons
//     name="notifications-outline"
//     size={20}
//     color="#FFFFFF"
//   />

//   <Text style={styles.buttonText}>
//     Test Notification
//   </Text>
// </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// }

// // =====================================================
// // STYLES
// // =====================================================

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F7F8FA",
//   },

//   scrollContent: {
//     padding: 20,
//     paddingBottom: 40,
//   },

//   // LOADING

//   loadingContainer: {
//     flex: 1,
//     backgroundColor: "#F7F8FA",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   loadingText: {
//     marginTop: 12,
//     fontSize: 14,
//     color: "#6B7280",
//   },

//   // HEADER

//   title: {
//     fontSize: 28,
//     fontWeight: "800",
//     color: "#111827",
//     marginTop: 10,
//   },

//   subtitle: {
//     fontSize: 14,
//     color: "#6B7280",
//     marginTop: 5,
//     marginBottom: 22,
//   },

//   // ERROR

//   errorCard: {
//     backgroundColor: "#FDECEC",
//     borderRadius: 16,
//     padding: 15,
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 18,
//   },

//   errorText: {
//     flex: 1,
//     marginLeft: 10,
//     fontSize: 13,
//     color: "#B71C1C",
//   },

//   // SUMMARY

//   summaryCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 18,
//     padding: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 25,
//     borderWidth: 1,
//     borderColor: "#EEEEEE",
//   },

//   summaryIcon: {
//     width: 55,
//     height: 55,
//     borderRadius: 16,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 15,
//   },

//   summaryDanger: {
//     backgroundColor: "#FDECEC",
//   },

//   summarySafe: {
//     backgroundColor: "#EAF6EC",
//   },

//   summaryContent: {
//     flex: 1,
//   },

//   summaryTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#111827",
//   },

//   summaryText: {
//     fontSize: 13,
//     color: "#6B7280",
//     marginTop: 4,
//   },

//   sectionTitle: {
//     fontSize: 19,
//     fontWeight: "700",
//     color: "#111827",
//     marginBottom: 12,
//   },

//   // ALERT CARD

//   alertCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 18,
//     padding: 16,
//     marginBottom: 13,
//     flexDirection: "row",
//     borderWidth: 1,
//     borderColor: "#EEEEEE",
//   },

//   resolvedCard: {
//     opacity: 0.78,
//   },

//   alertIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 13,
//   },

//   alertContent: {
//     flex: 1,
//   },

//   alertTop: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },

//   alertTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#111827",
//     flex: 1,
//   },

//   typeBadge: {
//     paddingHorizontal: 9,
//     paddingVertical: 4,
//     borderRadius: 8,
//     marginLeft: 8,
//   },

//   typeText: {
//     fontSize: 11,
//     fontWeight: "700",
//   },

//   roomText: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#4B5563",
//     marginTop: 5,
//   },

//   alertMessage: {
//     fontSize: 13,
//     color: "#6B7280",
//     lineHeight: 19,
//     marginTop: 6,
//   },

//   alertBottom: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginTop: 10,
//   },

//   alertValue: {
//     fontSize: 15,
//     fontWeight: "800",
//   },

//   alertTime: {
//     fontSize: 11,
//     color: "#9CA3AF",
//   },

//   statusRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 8,
//   },

//   statusText: {
//     fontSize: 11,
//     fontWeight: "700",
//     marginLeft: 5,
//   },

//   // EMPTY

//   emptyCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 18,
//     padding: 25,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#EEEEEE",
//     marginBottom: 15,
//   },

//   emptyIcon: {
//     width: 65,
//     height: 65,
//     borderRadius: 20,
//     backgroundColor: "#EAF6EC",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 12,
//   },

//   emptyTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#1B5E20",
//   },

//   emptyText: {
//     fontSize: 13,
//     color: "#6B7280",
//     textAlign: "center",
//     marginTop: 5,
//     lineHeight: 19,
//   },

//   // SAFE CARD

//   safeCard: {
//     backgroundColor: "#EAF6EC",
//     borderRadius: 18,
//     padding: 18,
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 18,
//   },

//   safeIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 15,
//     backgroundColor: "#FFFFFF",
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 14,
//   },

//   safeContent: {
//     flex: 1,
//   },

//   safeTitle: {
//     fontSize: 16,
//     fontWeight: "700",
//     color: "#1B5E20",
//   },

//   safeText: {
//     fontSize: 12,
//     color: "#4B5563",
//     lineHeight: 18,
//     marginTop: 4,
//   },

//   // BUTTON

//   button: {
//     height: 52,
//     borderRadius: 14,
//     backgroundColor: "#1B5E20",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     gap: 8,
//   },

//   buttonText: {
//     color: "#FFFFFF",
//     fontSize: 15,
//     fontWeight: "700",
//   },
// });








import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";

import { sendTestNotification } from "../../utils/notifications";

// =====================================================
// BACKEND API
// =====================================================

const API_URL = "http://10.147.4.54:5000";

// =====================================================
// ALERTS SCREEN
// =====================================================

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // ===================================================
  // FETCH ALERTS
  // ===================================================

  const fetchAlerts = async () => {
    try {
      console.log("=================================");
      console.log("🔔 ALERT API TEST");
      console.log(
        "📡 URL:",
        `${API_URL}/api/alerts`
      );
      console.log("=================================");

      const response = await fetch(
        `${API_URL}/api/alerts`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log(
        "📡 HTTP Status:",
        response.status
      );

      if (!response.ok) {
        throw new Error(
          `HTTP ${response.status}`
        );
      }

      const text = await response.text();

      console.log(
        "📦 Raw response:",
        text
      );

      let result;

      try {
        result = JSON.parse(text);
      } catch (parseError) {
        throw new Error(
          "Server returned invalid JSON"
        );
      }

      console.log(
        "✅ Parsed response:",
        result
      );

      if (
        result.success &&
        Array.isArray(result.data)
      ) {
        setAlerts(result.data);
        setError(null);

        console.log(
          "🚨 ALERT COUNT:",
          result.data.length
        );
      } else {
        throw new Error(
          result.message ||
            "Invalid alert response"
        );
      }
    } catch (error) {
      console.error(
        "❌ Alert fetch error:",
        error
      );

      setError(
        "Unable to connect to the server. Please check Wi-Fi."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ===================================================
  // INITIAL LOAD
  // ===================================================

  useEffect(() => {
    fetchAlerts();
  }, []);

  // ===================================================
  // REFRESH WHEN SCREEN OPENS
  // ===================================================

  useFocusEffect(
    useCallback(() => {
      fetchAlerts();
    }, [])
  );

  // ===================================================
  // AUTO REFRESH EVERY 5 SECONDS
  // ===================================================

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAlerts();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // ===================================================
  // PULL TO REFRESH
  // ===================================================

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAlerts();
  };

  // ===================================================
  // ACTIVE ALERTS
  // ===================================================

  const activeAlerts = alerts.filter(
    (alert) => alert.status === "Active"
  );

  const activeCount = activeAlerts.length;

  // ===================================================
  // FORMAT DATE
  // ===================================================

  const formatTime = (dateString) => {
    if (!dateString) {
      return "";
    }

    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "";
    }

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ===================================================
  // ALERT INFORMATION
  // ===================================================

  const getAlertInfo = (alertType) => {
    switch (alertType) {
      case "HIGH_TEMPERATURE":
        return {
          icon: "thermometer",
          color: "#E53935",
          background: "#FDECEC",
          title: "High Temperature",
          type: "Critical",
        };

      case "LOW_TEMPERATURE":
        return {
          icon: "thermometer-outline",
          color: "#1976D2",
          background: "#EAF3FF",
          title: "Low Temperature",
          type: "Warning",
        };

      case "HIGH_HUMIDITY":
        return {
          icon: "water",
          color: "#F57C00",
          background: "#FFF3E5",
          title: "High Humidity",
          type: "Warning",
        };

      case "LOW_HUMIDITY":
        return {
          icon: "water-outline",
          color: "#1976D2",
          background: "#EAF3FF",
          title: "Low Humidity",
          type: "Warning",
        };

      case "HIGH_GAS":
        return {
          icon: "flask",
          color: "#E53935",
          background: "#FDECEC",
          title: "High Gas Level",
          type: "Critical",
        };

      default:
        return {
          icon: "warning-outline",
          color: "#F57C00",
          background: "#FFF3E5",
          title: "Storage Alert",
          type: "Warning",
        };
    }
  };

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#1B5E20"
        />

        <Text style={styles.loadingText}>
          Loading alerts...
        </Text>
      </View>
    );
  }

  // ===================================================
  // MAIN
  // ===================================================

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        {/* HEADER */}

        <Text style={styles.title}>
          Alerts
        </Text>

        <Text style={styles.subtitle}>
          Storage monitoring notifications
        </Text>

        {/* ERROR */}

        {error && (
          <View style={styles.errorCard}>
            <Ionicons
              name="cloud-offline-outline"
              size={25}
              color="#E53935"
            />

            <Text style={styles.errorText}>
              {error}
            </Text>
          </View>
        )}

        {/* SUMMARY */}

        <View style={styles.summaryCard}>
          <View
            style={[
              styles.summaryIcon,
              activeCount > 0
                ? styles.summaryDanger
                : styles.summarySafe,
            ]}
          >
            <Ionicons
              name="notifications-outline"
              size={28}
              color={
                activeCount > 0
                  ? "#E53935"
                  : "#2E7D32"
              }
            />
          </View>

          <View style={styles.summaryContent}>
            <Text style={styles.summaryTitle}>
              {activeCount}{" "}
              {activeCount === 1
                ? "Active Alert"
                : "Active Alerts"}
            </Text>

            <Text style={styles.summaryText}>
              {activeCount > 0
                ? "Check the storage conditions below"
                : "All storage conditions are normal"}
            </Text>
          </View>
        </View>

        {/* RECENT ALERTS */}

        <Text style={styles.sectionTitle}>
          Recent Alerts
        </Text>

        {/* EMPTY */}

        {alerts.length === 0 && (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="shield-checkmark"
                size={35}
                color="#2E7D32"
              />
            </View>

            <Text style={styles.emptyTitle}>
              No Alerts
            </Text>

            <Text style={styles.emptyText}>
              There are currently no storage
              monitoring alerts.
            </Text>
          </View>
        )}

        {/* REAL ALERTS */}

        {alerts.map((alert) => {
          const info = getAlertInfo(
            alert.alert_type
          );

          const isActive =
            alert.status === "Active";

          return (
            <AlertCard
              key={alert.alert_id}
              icon={info.icon}
              iconColor={
                isActive
                  ? info.color
                  : "#2E7D32"
              }
              iconBackground={
                isActive
                  ? info.background
                  : "#EAF6EC"
              }
              title={info.title}
              message={
                alert.message ||
                "Storage condition requires attention."
              }
              roomNumber={
                alert.room_number ||
                `Room ${alert.room_id}`
              }
              value={
                alert.sensor_value !== null &&
                alert.sensor_value !== undefined
                  ? alert.sensor_value
                  : "--"
              }
              time={
                isActive
                  ? formatTime(alert.created_at)
                  : formatTime(alert.resolved_at)
              }
              type={
                isActive
                  ? info.type
                  : "Resolved"
              }
              typeColor={
                isActive
                  ? info.color
                  : "#2E7D32"
              }
              status={alert.status}
            />
          );
        })}

        {/* MONITORING STATUS */}

        <View style={styles.safeCard}>
          <View style={styles.safeIcon}>
            <Ionicons
              name="shield-checkmark"
              size={28}
              color="#2E7D32"
            />
          </View>

          <View style={styles.safeContent}>
            <Text style={styles.safeTitle}>
              Storage Monitoring Active
            </Text>

            <Text style={styles.safeText}>
              VineSafe is continuously monitoring
              temperature, humidity, gas level
              and door status.
            </Text>
          </View>
        </View>

        {/* REFRESH BUTTON */}

        <TouchableOpacity
          style={styles.button}
          onPress={fetchAlerts}
        >
          <Ionicons
            name="refresh-outline"
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.buttonText}>
            Refresh Alerts
          </Text>
        </TouchableOpacity>

        {/* TEST NOTIFICATION */}

        <TouchableOpacity
          style={[
            styles.button,
            {
              marginTop: 12,
              backgroundColor: "#E53935",
            },
          ]}
          onPress={sendTestNotification}
        >
          <Ionicons
            name="notifications-outline"
            size={20}
            color="#FFFFFF"
          />

          <Text style={styles.buttonText}>
            Test Notification
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// =====================================================
// ALERT CARD
// =====================================================

function AlertCard({
  icon,
  iconColor,
  iconBackground,
  title,
  message,
  roomNumber,
  value,
  time,
  type,
  typeColor,
  status,
}) {
  const isResolved =
    status === "Resolved";

  return (
    <View
      style={[
        styles.alertCard,
        isResolved &&
          styles.resolvedCard,
      ]}
    >
      {/* ICON */}

      <View
        style={[
          styles.alertIcon,
          {
            backgroundColor:
              iconBackground,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={24}
          color={iconColor}
        />
      </View>

      {/* CONTENT */}

      <View style={styles.alertContent}>
        {/* TOP */}

        <View style={styles.alertTop}>
          <Text
            style={styles.alertTitle}
            numberOfLines={1}
          >
            {title}
          </Text>

          <View
            style={[
              styles.typeBadge,
              {
                backgroundColor:
                  `${typeColor}15`,
              },
            ]}
          >
            <Text
              style={[
                styles.typeText,
                {
                  color: typeColor,
                },
              ]}
            >
              {type}
            </Text>
          </View>
        </View>

        {/* ROOM */}

        <Text style={styles.roomText}>
          {roomNumber}
        </Text>

        {/* MESSAGE */}

        <Text style={styles.alertMessage}>
          {message}
        </Text>

        {/* VALUE + TIME */}

        <View style={styles.alertBottom}>
          <Text
            style={[
              styles.alertValue,
              {
                color: iconColor,
              },
            ]}
          >
            {value}
          </Text>

          <Text style={styles.alertTime}>
            {time}
          </Text>
        </View>

        {/* STATUS */}

        <View style={styles.statusRow}>
          <Ionicons
            name={
              isResolved
                ? "checkmark-circle"
                : "radio-button-on"
            }
            size={14}
            color={typeColor}
          />

          <Text
            style={[
              styles.statusText,
              {
                color: typeColor,
              },
            ]}
          >
            {status}
          </Text>
        </View>
      </View>
    </View>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // LOADING

  loadingContainer: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#6B7280",
  },

  // HEADER

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 5,
    marginBottom: 22,
  },

  // ERROR

  errorCard: {
    backgroundColor: "#FDECEC",
    borderRadius: 16,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  errorText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: "#B71C1C",
  },

  // SUMMARY

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  summaryIcon: {
    width: 55,
    height: 55,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  summaryDanger: {
    backgroundColor: "#FDECEC",
  },

  summarySafe: {
    backgroundColor: "#EAF6EC",
  },

  summaryContent: {
    flex: 1,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  summaryText: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  // ALERT CARD

  alertCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 13,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#EEEEEE",
  },

  resolvedCard: {
    opacity: 0.78,
  },

  alertIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 13,
  },

  alertContent: {
    flex: 1,
  },

  alertTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  alertTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    flex: 1,
  },

  typeBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },

  typeText: {
    fontSize: 11,
    fontWeight: "700",
  },

  roomText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4B5563",
    marginTop: 5,
  },

  alertMessage: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 19,
    marginTop: 6,
  },

  alertBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  alertValue: {
    fontSize: 15,
    fontWeight: "800",
  },

  alertTime: {
    fontSize: 11,
    color: "#9CA3AF",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 5,
  },

  // EMPTY

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    marginBottom: 15,
  },

  emptyIcon: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: "#EAF6EC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B5E20",
  },

  emptyText: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 5,
    lineHeight: 19,
  },

  // SAFE CARD

  safeCard: {
    backgroundColor: "#EAF6EC",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 18,
  },

  safeIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  safeContent: {
    flex: 1,
  },

  safeTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B5E20",
  },

  safeText: {
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 18,
    marginTop: 4,
  },

  // BUTTON

  button: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#1B5E20",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});