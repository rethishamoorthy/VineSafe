

// // import { LinearGradient } from "expo-linear-gradient";
// // import { MaterialCommunityIcons } from "@expo/vector-icons";
// // import { useRouter } from "expo-router";
// // import { useEffect, useRef, useState } from "react";

// // import {
// //   Animated,
// //   Pressable,
// //   RefreshControl,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   View,
// // } from "react-native";

// // import { useTheme } from "../../context/ThemeContext";


// // // =====================================================
// // // BACKEND API
// // // =====================================================

// // // Your computer's current IPv4 address
// // const API_BASE_URL = "http://10.147.4.54:5000";


// // // =====================================================
// // // SENSOR THRESHOLDS
// // // =====================================================

// // const TEMP_LOW = 18;
// // const TEMP_HIGH = 30;

// // const HUM_LOW = 40;
// // const HUM_HIGH = 70;

// // const GAS_HIGH = 600;


// // // =====================================================
// // // CHECK SENSOR DANGER
// // // =====================================================

// // function checkDanger(room) {
// //   const temperature = Number(room.temperature);
// //   const humidity = Number(room.humidity);
// //   const gas = Number(room.gas_value);

// //   const temperatureDanger =
// //     temperature < TEMP_LOW ||
// //     temperature > TEMP_HIGH;

// //   const humidityDanger =
// //     humidity < HUM_LOW ||
// //     humidity > HUM_HIGH;

// //   const gasDanger =
// //     gas > GAS_HIGH;

// //   return (
// //     temperatureDanger ||
// //     humidityDanger ||
// //     gasDanger
// //   );
// // }


// // // =====================================================
// // // GET DANGER MESSAGE
// // // =====================================================

// // function getDangerMessage(room) {
// //   const messages = [];

// //   const temperature = Number(room.temperature);
// //   const humidity = Number(room.humidity);
// //   const gas = Number(room.gas_value);

// //   if (temperature < TEMP_LOW) {
// //     messages.push("Temperature too low");
// //   }

// //   if (temperature > TEMP_HIGH) {
// //     messages.push("Temperature too high");
// //   }

// //   if (humidity < HUM_LOW) {
// //     messages.push("Humidity too low");
// //   }

// //   if (humidity > HUM_HIGH) {
// //     messages.push("Humidity too high");
// //   }

// //   if (gas > GAS_HIGH) {
// //     messages.push("Gas level too high");
// //   }

// //   return messages.join(" • ");
// // }


// // // =====================================================
// // // ROOM SENSOR CARD
// // // =====================================================

// // function RoomSensorCard({
// //   room,
// //   theme,
// //   darkMode,
// // }) {
// //   const danger = checkDanger(room);

// //   const blinkAnimation = useRef(
// //     new Animated.Value(0)
// //   ).current;


// //   // ===================================================
// //   // DANGER BLINK
// //   // ===================================================

// //   useEffect(() => {
// //     let animation;

// //     if (!danger) {
// //       blinkAnimation.setValue(0);
// //       return;
// //     }

// //     animation = Animated.loop(
// //       Animated.sequence([
// //         Animated.timing(
// //           blinkAnimation,
// //           {
// //             toValue: 1,
// //             duration: 500,
// //             useNativeDriver: false,
// //           }
// //         ),

// //         Animated.timing(
// //           blinkAnimation,
// //           {
// //             toValue: 0,
// //             duration: 500,
// //             useNativeDriver: false,
// //           }
// //         ),
// //       ])
// //     );

// //     animation.start();

// //     return () => {
// //       if (animation) {
// //         animation.stop();
// //       }
// //     };
// //   }, [danger]);


// //   // ===================================================
// //   // CARD COLOR
// //   // ===================================================

// //   const backgroundColor = danger
// //     ? blinkAnimation.interpolate({
// //         inputRange: [0, 1],
// //         outputRange: [
// //           theme.card,
// //           "#C62828",
// //         ],
// //       })
// //     : theme.card;


// //   const textColor = danger
// //     ? blinkAnimation.interpolate({
// //         inputRange: [0, 1],
// //         outputRange: [
// //           theme.text,
// //           "#FFFFFF",
// //         ],
// //       })
// //     : theme.text;


// //   // ===================================================
// //   // REAL SENSOR VALUES
// //   // ===================================================

// //   const temperature =
// //     Number(room.temperature);

// //   const humidity =
// //     Number(room.humidity);

// //   const gas =
// //     Number(room.gas_value);


// //   return (
// //     <Animated.View
// //       style={[
// //         styles.roomCard,
// //         {
// //           backgroundColor,

// //           borderWidth:
// //             darkMode ? 1 : 0,

// //           borderColor:
// //             danger
// //               ? "#C62828"
// //               : theme.border,

// //           elevation:
// //             darkMode ? 0 : 4,
// //         },
// //       ]}
// //     >

// //       {/* =============================================
// //           ROOM HEADER
// //       ============================================= */}

// //       <View style={styles.roomHeader}>

// //         <View
// //           style={[
// //             styles.roomIcon,
// //             {
// //               backgroundColor:
// //                 danger
// //                   ? "rgba(255,255,255,0.15)"
// //                   : "rgba(46,125,50,0.12)",
// //             },
// //           ]}
// //         >

// //           <MaterialCommunityIcons
// //             name="warehouse"
// //             size={28}
// //             color={
// //               danger
// //                 ? "#FFFFFF"
// //                 : "#2E7D32"
// //             }
// //           />

// //         </View>


// //         <View style={styles.roomInfo}>

// //           <Animated.Text
// //             style={[
// //               styles.roomNumber,
// //               {
// //                 color: textColor,
// //               },
// //             ]}
// //           >
// //             Room {room.room_id}
// //           </Animated.Text>


// //           <Animated.Text
// //             style={[
// //               styles.roomId,
// //               {
// //                 color: danger
// //                   ? "#FFFFFF"
// //                   : theme.subText,
// //               },
// //             ]}
// //           >
// //             Room ID: {room.room_id}
// //           </Animated.Text>

// //         </View>


// //         {/* STATUS */}

// //         {danger ? (

// //           <View style={styles.dangerBadge}>

// //             <MaterialCommunityIcons
// //               name="alert"
// //               size={16}
// //               color="#FFFFFF"
// //             />

// //             <Text style={styles.dangerText}>
// //               DANGER
// //             </Text>

// //           </View>

// //         ) : (

// //           <View style={styles.safeBadge}>

// //             <MaterialCommunityIcons
// //               name="check-circle"
// //               size={16}
// //               color="#2E7D32"
// //             />

// //             <Text style={styles.safeText}>
// //               SAFE
// //             </Text>

// //           </View>

// //         )}

// //       </View>


// //       {/* =============================================
// //           WARNING
// //       ============================================= */}

// //       {danger && (

// //         <View style={styles.warningBox}>

// //           <MaterialCommunityIcons
// //             name="alert-circle"
// //             size={20}
// //             color="#FFFFFF"
// //           />

// //           <Text style={styles.warningText}>
// //             {getDangerMessage(room)}
// //           </Text>

// //         </View>

// //       )}


// //       {/* =============================================
// //           SENSOR VALUES
// //       ============================================= */}

// //       <View style={styles.sensorContainer}>

// //         {/* TEMPERATURE */}

// //         <View style={styles.sensorItem}>

// //           <MaterialCommunityIcons
// //             name="thermometer"
// //             size={30}
// //             color={
// //               danger
// //                 ? "#FFFFFF"
// //                 : "#2E7D32"
// //             }
// //           />

// //           <Animated.Text
// //             style={[
// //               styles.sensorLabel,
// //               {
// //                 color: danger
// //                   ? textColor
// //                   : theme.subText,
// //               },
// //             ]}
// //           >
// //             Temperature
// //           </Animated.Text>

// //           <Animated.Text
// //             style={[
// //               styles.sensorValue,
// //               {
// //                 color: textColor,
// //               },
// //             ]}
// //           >
// //             {temperature.toFixed(1)}°C
// //           </Animated.Text>

// //         </View>


// //         {/* HUMIDITY */}

// //         <View style={styles.sensorItem}>

// //           <MaterialCommunityIcons
// //             name="water-percent"
// //             size={30}
// //             color={
// //               danger
// //                 ? "#FFFFFF"
// //                 : "#2E7D32"
// //             }
// //           />

// //           <Animated.Text
// //             style={[
// //               styles.sensorLabel,
// //               {
// //                 color: danger
// //                   ? textColor
// //                   : theme.subText,
// //               },
// //             ]}
// //           >
// //             Humidity
// //           </Animated.Text>

// //           <Animated.Text
// //             style={[
// //               styles.sensorValue,
// //               {
// //                 color: textColor,
// //               },
// //             ]}
// //           >
// //             {humidity.toFixed(1)}%
// //           </Animated.Text>

// //         </View>


// //         {/* GAS */}

// //         <View style={styles.sensorItem}>

// //           <MaterialCommunityIcons
// //             name="molecule"
// //             size={30}
// //             color={
// //               danger
// //                 ? "#FFFFFF"
// //                 : "#2E7D32"
// //             }
// //           />

// //           <Animated.Text
// //             style={[
// //               styles.sensorLabel,
// //               {
// //                 color: danger
// //                   ? textColor
// //                   : theme.subText,
// //               },
// //             ]}
// //           >
// //             Gas
// //           </Animated.Text>

// //           <Animated.Text
// //             style={[
// //               styles.sensorValue,
// //               {
// //                 color: textColor,
// //               },
// //             ]}
// //           >
// //             {gas}
// //           </Animated.Text>

// //         </View>

// //       </View>


// //       {/* =============================================
// //           SENSOR ID
// //       ============================================= */}

// //       <Animated.Text
// //         style={[
// //           styles.sensorId,
// //           {
// //             color: danger
// //               ? "#FFFFFF"
// //               : theme.subText,
// //           },
// //         ]}
// //       >
// //         Latest Reading ID: {room.sensor_id}
// //       </Animated.Text>

// //     </Animated.View>
// //   );
// // }


// // // =====================================================
// // // MAIN SCREEN
// // // =====================================================

// // export default function SensorMonitoring() {

// //   const router = useRouter();

// //   const {
// //     theme,
// //     darkMode,
// //   } = useTheme();


// //   const [rooms, setRooms] =
// //     useState([]);

// //   const [loading, setLoading] =
// //     useState(true);

// //   const [refreshing, setRefreshing] =
// //     useState(false);

// //   const [error, setError] =
// //     useState("");


// //   // ===================================================
// //   // FETCH REAL SENSOR DATA
// //   // ===================================================

// //   const fetchSensorData = async () => {

// //     try {

// //       console.log("=================================");
// //       console.log("📡 Fetching REAL sensor data...");
// //       console.log(
// //         "🌐 URL:",
// //         `${API_BASE_URL}/api/sensor`
// //       );


// //       const response = await fetch(
// //         `${API_BASE_URL}/api/sensor`
// //       );


// //       console.log(
// //         "📡 HTTP STATUS:",
// //         response.status
// //       );


// //       if (!response.ok) {

// //         throw new Error(
// //           `HTTP ${response.status}`
// //         );

// //       }


// //       const result =
// //         await response.json();


// //       console.log(
// //         "📦 SENSOR API RESPONSE:",
// //         result
// //       );


// //       if (
// //         !result.success ||
// //         !Array.isArray(result.data)
// //       ) {

// //         setRooms([]);

// //         setError(
// //           "No sensor data available"
// //         );

// //         return;
// //       }


// //       // =================================================
// //       // IMPORTANT:
// //       // ONE CARD PER ROOM
// //       //
// //       // Backend returns many readings:
// //       //
// //       // 428 -> Room 1
// //       // 427 -> Room 1
// //       // 426 -> Room 1
// //       //
// //       // We keep only the latest reading
// //       // for each room.
// //       // =================================================

// //       const latestRooms = {};


// //       result.data.forEach((sensor) => {

// //         const roomId =
// //           sensor.room_id;


// //         if (
// //           roomId === undefined ||
// //           roomId === null
// //         ) {
// //           return;
// //         }


// //         const existing =
// //           latestRooms[roomId];


// //         if (
// //           !existing ||
// //           Number(sensor.sensor_id) >
// //             Number(existing.sensor_id)
// //         ) {

// //           latestRooms[roomId] =
// //             sensor;

// //         }

// //       });


// //       // Convert object to array

// //       const uniqueRooms =
// //         Object.values(
// //           latestRooms
// //         );


// //       // Sort rooms by room ID

// //       uniqueRooms.sort(
// //         (a, b) =>
// //           Number(a.room_id) -
// //           Number(b.room_id)
// //       );


// //       console.log(
// //         "🏭 UNIQUE ROOMS:",
// //         uniqueRooms
// //       );


// //       setRooms(
// //         uniqueRooms
// //       );


// //       setError("");

// //     } catch (err) {

// //       console.log(
// //         "❌ SENSOR CONNECTION ERROR:",
// //         err
// //       );


// //       setError(
// //         "Unable to connect to VineSafe server"
// //       );

// //     } finally {

// //       setLoading(false);

// //       setRefreshing(false);

// //     }

// //   };


// //   // ===================================================
// //   // LOAD DATA
// //   // ===================================================

// //   useEffect(() => {

// //     fetchSensorData();


// //     // Get latest real data every 5 seconds

// //     const interval =
// //       setInterval(
// //         fetchSensorData,
// //         5000
// //       );


// //     return () => {

// //       clearInterval(
// //         interval
// //       );

// //     };

// //   }, []);


// //   // ===================================================
// //   // PULL TO REFRESH
// //   // ===================================================

// //   const onRefresh = () => {

// //     setRefreshing(true);

// //     fetchSensorData();

// //   };


// //   // ===================================================
// //   // UI
// //   // ===================================================

// //   return (

// //     <LinearGradient
// //       colors={[
// //         theme.background,
// //         theme.background2,
// //       ]}
// //       style={styles.container}
// //     >

// //       <ScrollView
// //         showsVerticalScrollIndicator={false}

// //         contentContainerStyle={
// //           styles.scrollContent
// //         }

// //         refreshControl={
// //           <RefreshControl
// //             refreshing={
// //               refreshing
// //             }
// //             onRefresh={
// //               onRefresh
// //             }
// //           />
// //         }
// //       >


// //         {/* =========================================
// //             HEADER
// //         ========================================= */}

// //         <View style={styles.header}>

// //           <Pressable
// //             onPress={() =>
// //               router.back()
// //             }
// //             style={styles.backButton}
// //           >

// //             <MaterialCommunityIcons
// //               name="arrow-left"
// //               size={26}
// //               color={theme.text}
// //             />

// //           </Pressable>


// //           <View style={styles.headerText}>

// //             <Text
// //               style={[
// //                 styles.title,
// //                 {
// //                   color:
// //                     theme.text,
// //                 },
// //               ]}
// //             >
// //               Sensor Monitoring
// //             </Text>


// //             <Text
// //               style={[
// //                 styles.subtitle,
// //                 {
// //                   color:
// //                     theme.subText,
// //                 },
// //               ]}
// //             >
// //               Current conditions of all storage rooms
// //             </Text>

// //           </View>

// //         </View>


// //         {/* =========================================
// //             THRESHOLD INFORMATION
// //         ========================================= */}

// //         <View
// //           style={[
// //             styles.thresholdCard,
// //             {
// //               backgroundColor:
// //                 theme.card,

// //               borderWidth:
// //                 darkMode ? 1 : 0,

// //               borderColor:
// //                 theme.border,
// //             },
// //           ]}
// //         >

// //           <MaterialCommunityIcons
// //             name="information-outline"
// //             size={22}
// //             color="#2E7D32"
// //           />


// //           <View
// //             style={
// //               styles.thresholdTextContainer
// //             }
// //           >

// //             <Text
// //               style={[
// //                 styles.thresholdTitle,
// //                 {
// //                   color:
// //                     theme.text,
// //                 },
// //               ]}
// //             >
// //               Monitoring Thresholds
// //             </Text>


// //             <Text
// //               style={[
// //                 styles.thresholdText,
// //                 {
// //                   color:
// //                     theme.subText,
// //                 },
// //               ]}
// //             >
// //               Temperature: {TEMP_LOW}–{TEMP_HIGH}°C
// //             </Text>


// //             <Text
// //               style={[
// //                 styles.thresholdText,
// //                 {
// //                   color:
// //                     theme.subText,
// //                 },
// //               ]}
// //             >
// //               Humidity: {HUM_LOW}–{HUM_HIGH}%
// //             </Text>


// //             <Text
// //               style={[
// //                 styles.thresholdText,
// //                 {
// //                   color:
// //                     theme.subText,
// //                 },
// //               ]}
// //             >
// //               Gas: below {GAS_HIGH}
// //             </Text>

// //           </View>

// //         </View>


// //         {/* =========================================
// //             LOADING
// //         ========================================= */}

// //         {loading && (

// //           <View style={styles.center}>

// //             <Text
// //               style={{
// //                 color:
// //                   theme.subText,
// //               }}
// //             >
// //               Loading real sensor data...
// //             </Text>

// //           </View>

// //         )}


// //         {/* =========================================
// //             CONNECTION ERROR
// //         ========================================= */}

// //         {!loading &&
// //           error !== "" && (

// //             <View
// //               style={[
// //                 styles.errorCard,
// //                 {
// //                   backgroundColor:
// //                     theme.card,
// //                 },
// //               ]}
// //             >

// //               <MaterialCommunityIcons
// //                 name="wifi-off"
// //                 size={35}
// //                 color="#2E7D32"
// //               />


// //               <Text
// //                 style={[
// //                   styles.errorTitle,
// //                   {
// //                     color:
// //                       theme.text,
// //                   },
// //                 ]}
// //               >
// //                 Connection Problem
// //               </Text>


// //               <Text
// //                 style={[
// //                   styles.errorText,
// //                   {
// //                     color:
// //                       theme.subText,
// //                   },
// //                 ]}
// //               >
// //                 {error}
// //               </Text>


// //               <Text
// //                 style={[
// //                   styles.apiText,
// //                   {
// //                     color:
// //                       theme.subText,
// //                   },
// //                 ]}
// //               >
// //                 {API_BASE_URL}
// //               </Text>


// //               <Pressable
// //                 style={
// //                   styles.retryButton
// //                 }
// //                 onPress={
// //                   fetchSensorData
// //                 }
// //               >

// //                 <Text
// //                   style={
// //                     styles.retryText
// //                   }
// //                 >
// //                   Retry
// //                 </Text>

// //               </Pressable>

// //             </View>

// //           )}


// //         {/* =========================================
// //             NO DATA
// //         ========================================= */}

// //         {!loading &&
// //           error === "" &&
// //           rooms.length === 0 && (

// //             <View
// //               style={[
// //                 styles.errorCard,
// //                 {
// //                   backgroundColor:
// //                     theme.card,
// //                 },
// //               ]}
// //             >

// //               <MaterialCommunityIcons
// //                 name="database-off"
// //                 size={35}
// //                 color="#2E7D32"
// //               />


// //               <Text
// //                 style={[
// //                   styles.errorTitle,
// //                   {
// //                     color:
// //                       theme.text,
// //                   },
// //                 ]}
// //               >
// //                 No Sensor Data
// //               </Text>


// //               <Text
// //                 style={[
// //                   styles.errorText,
// //                   {
// //                     color:
// //                       theme.subText,
// //                   },
// //                 ]}
// //               >
// //                 No sensor readings have been received yet.
// //               </Text>

// //             </View>

// //           )}


// //         {/* =========================================
// //             ONE CARD PER ROOM
// //         ========================================= */}

// //         {rooms.map(
// //           (room) => (

// //             <RoomSensorCard
// //               key={
// //                 String(room.room_id)
// //               }

// //               room={room}

// //               theme={theme}

// //               darkMode={
// //                 darkMode
// //               }
// //             />

// //           )
// //         )}


// //       </ScrollView>

// //     </LinearGradient>

// //   );
// // }


// // // =====================================================
// // // STYLES
// // // =====================================================

// // const styles =
// //   StyleSheet.create({

// //     container: {
// //       flex: 1,
// //       padding: 20,
// //     },


// //     scrollContent: {
// //       paddingTop: 45,
// //       paddingBottom: 40,
// //     },


// //     header: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //       marginBottom: 22,
// //     },


// //     backButton: {
// //       width: 42,
// //       height: 42,
// //       borderRadius: 21,
// //       justifyContent: "center",
// //       alignItems: "center",
// //       marginRight: 12,
// //     },


// //     headerText: {
// //       flex: 1,
// //     },


// //     title: {
// //       fontSize: 26,
// //       fontWeight: "800",
// //     },


// //     subtitle: {
// //       fontSize: 13,
// //       marginTop: 4,
// //     },


// //     thresholdCard: {
// //       borderRadius: 16,
// //       padding: 16,
// //       flexDirection: "row",
// //       marginBottom: 20,
// //     },


// //     thresholdTextContainer: {
// //       marginLeft: 12,
// //       flex: 1,
// //     },


// //     thresholdTitle: {
// //       fontSize: 15,
// //       fontWeight: "800",
// //       marginBottom: 5,
// //     },


// //     thresholdText: {
// //       fontSize: 12,
// //       marginTop: 2,
// //     },


// //     roomCard: {
// //       borderRadius: 20,
// //       padding: 18,
// //       marginBottom: 18,
// //     },


// //     roomHeader: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //       marginBottom: 16,
// //     },


// //     roomIcon: {
// //       width: 48,
// //       height: 48,
// //       borderRadius: 14,
// //       justifyContent: "center",
// //       alignItems: "center",
// //     },


// //     roomInfo: {
// //       flex: 1,
// //       marginLeft: 12,
// //     },


// //     roomNumber: {
// //       fontSize: 19,
// //       fontWeight: "800",
// //     },


// //     roomId: {
// //       fontSize: 12,
// //       marginTop: 3,
// //     },


// //     safeBadge: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //       paddingHorizontal: 9,
// //       paddingVertical: 5,
// //       borderRadius: 12,
// //       backgroundColor:
// //         "rgba(46,125,50,0.12)",
// //     },


// //     safeText: {
// //       color: "#2E7D32",
// //       fontSize: 10,
// //       fontWeight: "800",
// //       marginLeft: 4,
// //     },


// //     dangerBadge: {
// //       flexDirection: "row",
// //       alignItems: "center",
// //       backgroundColor: "#C62828",
// //       paddingHorizontal: 9,
// //       paddingVertical: 5,
// //       borderRadius: 12,
// //     },


// //     dangerText: {
// //       color: "#FFFFFF",
// //       fontSize: 10,
// //       fontWeight: "900",
// //       marginLeft: 4,
// //     },


// //     warningBox: {
// //       backgroundColor: "#C62828",
// //       borderRadius: 12,
// //       padding: 10,
// //       flexDirection: "row",
// //       alignItems: "center",
// //       marginBottom: 16,
// //     },


// //     warningText: {
// //       color: "#FFFFFF",
// //       fontSize: 12,
// //       fontWeight: "700",
// //       marginLeft: 8,
// //       flex: 1,
// //     },


// //     sensorContainer: {
// //       flexDirection: "row",
// //       justifyContent: "space-between",
// //     },


// //     sensorItem: {
// //       flex: 1,
// //       alignItems: "center",
// //     },


// //     sensorLabel: {
// //       fontSize: 11,
// //       marginTop: 6,
// //       textAlign: "center",
// //     },


// //     sensorValue: {
// //       fontSize: 17,
// //       fontWeight: "900",
// //       marginTop: 4,
// //     },


// //     sensorId: {
// //       fontSize: 10,
// //       textAlign: "center",
// //       marginTop: 16,
// //     },


// //     center: {
// //       alignItems: "center",
// //       padding: 30,
// //     },


// //     errorCard: {
// //       borderRadius: 18,
// //       padding: 25,
// //       alignItems: "center",
// //       marginBottom: 20,
// //     },


// //     errorTitle: {
// //       fontSize: 18,
// //       fontWeight: "800",
// //       marginTop: 10,
// //     },


// //     errorText: {
// //       fontSize: 13,
// //       textAlign: "center",
// //       marginTop: 7,
// //       lineHeight: 20,
// //     },


// //     apiText: {
// //       fontSize: 11,
// //       marginTop: 10,
// //       textAlign: "center",
// //     },


// //     retryButton: {
// //       backgroundColor: "#2E7D32",
// //       paddingHorizontal: 25,
// //       paddingVertical: 10,
// //       borderRadius: 10,
// //       marginTop: 15,
// //     },


// //     retryText: {
// //       color: "#FFFFFF",
// //       fontWeight: "800",
// //     },

// //   });






// import { LinearGradient } from "expo-linear-gradient";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { useEffect, useRef, useState } from "react";

// import {
//   Animated,
//   Pressable,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";

// import { useTheme } from "../../context/ThemeContext";

// // =====================================================
// // BACKEND API
// // =====================================================

// // Your computer's current IPv4 address
// const API_BASE_URL = "http://10.147.4.54:5000";

// // =====================================================
// // SENSOR THRESHOLDS
// // =====================================================

// const TEMP_LOW = 18;
// const TEMP_HIGH = 30;

// const HUM_LOW = 40;
// const HUM_HIGH = 70;

// const GAS_HIGH = 600;

// // =====================================================
// // CHECK SENSOR DANGER
// // =====================================================

// function checkDanger(room) {
//   const temperature = Number(room.temperature);
//   const humidity = Number(room.humidity);
//   const gas = Number(room.gas_value);

//   const temperatureDanger =
//     temperature < TEMP_LOW ||
//     temperature > TEMP_HIGH;

//   const humidityDanger =
//     humidity < HUM_LOW ||
//     humidity > HUM_HIGH;

//   const gasDanger =
//     gas > GAS_HIGH;

//   return (
//     temperatureDanger ||
//     humidityDanger ||
//     gasDanger
//   );
// }

// // =====================================================
// // GET DANGER MESSAGE
// // =====================================================

// function getDangerMessage(room) {
//   const messages = [];

//   const temperature = Number(room.temperature);
//   const humidity = Number(room.humidity);
//   const gas = Number(room.gas_value);

//   // Temperature
//   if (temperature < TEMP_LOW) {
//     messages.push(
//       `Temperature: ${temperature.toFixed(1)}°C (Too Low)`
//     );
//   }

//   if (temperature > TEMP_HIGH) {
//     messages.push(
//       `Temperature: ${temperature.toFixed(1)}°C (Too High)`
//     );
//   }

//   // Humidity
//   if (humidity < HUM_LOW) {
//     messages.push(
//       `Humidity: ${humidity.toFixed(1)}% (Too Low)`
//     );
//   }

//   if (humidity > HUM_HIGH) {
//     messages.push(
//       `Humidity: ${humidity.toFixed(1)}% (Too High)`
//     );
//   }

//   // Gas
//   if (gas > GAS_HIGH) {
//     messages.push(
//       `Gas: ${gas} (Too High)`
//     );
//   }

//   return messages.join(" • ");
// }

// // =====================================================
// // ROOM SENSOR CARD
// // =====================================================

// function RoomSensorCard({
//   room,
//   theme,
//   darkMode,
// }) {
//   const danger = checkDanger(room);

//   // ===================================================
//   // BLINK ANIMATION
//   // ===================================================

//   const blinkAnimation = useRef(
//     new Animated.Value(0)
//   ).current;

//   useEffect(() => {
//     const animation = Animated.loop(
//       Animated.sequence([
//         Animated.timing(
//           blinkAnimation,
//           {
//             toValue: 1,
//             duration: 500,
//             useNativeDriver: false,
//           }
//         ),

//         Animated.timing(
//           blinkAnimation,
//           {
//             toValue: 0,
//             duration: 500,
//             useNativeDriver: false,
//           }
//         ),
//       ])
//     );

//     animation.start();

//     return () => {
//       animation.stop();
//     };
//   }, []);

//   // ===================================================
//   // CARD COLOR
//   // ===================================================

//   const backgroundColor =
//     blinkAnimation.interpolate({
//       inputRange: [0, 1],

//       outputRange: danger
//         ? [
//             theme.card,
//             "#C62828",
//           ]
//         : [
//             theme.card,
//             "#2E7D32",
//           ],
//     });

//   // ===================================================
//   // TEXT COLOR
//   // ===================================================

//   const textColor =
//     blinkAnimation.interpolate({
//       inputRange: [0, 1],

//       outputRange: danger
//         ? [
//             theme.text,
//             "#FFFFFF",
//           ]
//         : [
//             theme.text,
//             "#FFFFFF",
//           ],
//     });

//   // ===================================================
//   // REAL SENSOR VALUES
//   // ===================================================

//   const temperature =
//     Number(room.temperature);

//   const humidity =
//     Number(room.humidity);

//   const gas =
//     Number(room.gas_value);

//   // ===================================================
//   // RETURN ROOM CARD
//   // ===================================================

//   return (
//     <Animated.View
//       style={[
//         styles.roomCard,
//         {
//           backgroundColor,

//           borderWidth:
//             darkMode ? 1 : 0,

//           borderColor:
//             danger
//               ? "#C62828"
//               : "#2E7D32",

//           elevation:
//             darkMode ? 0 : 4,
//         },
//       ]}
//     >

//       {/* =============================================
//           ROOM HEADER
//       ============================================= */}

//       <View style={styles.roomHeader}>

//         <View
//           style={[
//             styles.roomIcon,
//             {
//               backgroundColor:
//                 danger
//                   ? "rgba(255,255,255,0.15)"
//                   : "rgba(46,125,50,0.12)",
//             },
//           ]}
//         >

//           <MaterialCommunityIcons
//             name="warehouse"
//             size={28}
//             color={
//               danger
//                 ? "#FFFFFF"
//                 : "#2E7D32"
//             }
//           />

//         </View>

//         <View style={styles.roomInfo}>

//           <Animated.Text
//             style={[
//               styles.roomNumber,
//               {
//                 color: textColor,
//               },
//             ]}
//           >
//             Room {room.room_id}
//           </Animated.Text>

//           <Animated.Text
//             style={[
//               styles.roomId,
//               {
//                 color: danger
//                   ? "#FFFFFF"
//                   : theme.subText,
//               },
//             ]}
//           >
//             Room ID: {room.room_id}
//           </Animated.Text>

//         </View>

//         {/* =========================================
//             STATUS
//         ========================================= */}

//         {danger ? (

//           <Animated.View
//             style={[
//               styles.dangerBadge,
//               {
//                 opacity:
//                   blinkAnimation.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0.5, 1],
//                   }),
//               },
//             ]}
//           >

//             <MaterialCommunityIcons
//               name="alert"
//               size={16}
//               color="#FFFFFF"
//             />

//             <Text style={styles.dangerText}>
//               DANGER
//             </Text>

//           </Animated.View>

//         ) : (

//           <Animated.View
//             style={[
//               styles.safeBadge,
//               {
//                 opacity:
//                   blinkAnimation.interpolate({
//                     inputRange: [0, 1],
//                     outputRange: [0.5, 1],
//                   }),
//               },
//             ]}
//           >

//             <MaterialCommunityIcons
//               name="check-circle"
//               size={16}
//               color="#FFFFFF"
//             />

//             <Text style={styles.safeTextWhite}>
//               SAFE
//             </Text>

//           </Animated.View>

//         )}

//       </View>

//       {/* =============================================
//           DANGER WARNING
//       ============================================= */}

//       {danger && (

//         <Animated.View
//           style={[
//             styles.warningBox,
//             {
//               opacity:
//                 blinkAnimation.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [0.75, 1],
//                 }),
//             },
//           ]}
//         >

//           <MaterialCommunityIcons
//             name="alert-circle"
//             size={20}
//             color="#FFFFFF"
//           />

//           <Text style={styles.warningText}>
//             {getDangerMessage(room)}
//           </Text>

//         </Animated.View>

//       )}

//       {/* =============================================
//           SAFE MESSAGE
//       ============================================= */}

//       {!danger && (

//         <Animated.View
//           style={[
//             styles.safeMessageBox,
//             {
//               opacity:
//                 blinkAnimation.interpolate({
//                   inputRange: [0, 1],
//                   outputRange: [0.7, 1],
//                 }),
//             },
//           ]}
//         >

//           <MaterialCommunityIcons
//             name="check-circle"
//             size={20}
//             color="#FFFFFF"
//           />

//           <Text style={styles.safeMessageText}>
//             All sensor readings are within safe limits
//           </Text>

//         </Animated.View>

//       )}

//       {/* =============================================
//           SENSOR VALUES
//       ============================================= */}

//       <View style={styles.sensorContainer}>

//         {/* =========================================
//             TEMPERATURE
//         ========================================= */}

//         <View style={styles.sensorItem}>

//           <MaterialCommunityIcons
//             name="thermometer"
//             size={30}
//             color="#FFFFFF"
//           />

//           <Animated.Text
//             style={[
//               styles.sensorLabel,
//               {
//                 color: "#FFFFFF",
//               },
//             ]}
//           >
//             Temperature
//           </Animated.Text>

//           <Animated.Text
//             style={[
//               styles.sensorValue,
//               {
//                 color: "#FFFFFF",
//               },
//             ]}
//           >
//             {temperature.toFixed(1)}°C
//           </Animated.Text>

//           {/* Temperature status */}

//           <Text
//             style={
//               temperature < TEMP_LOW ||
//               temperature > TEMP_HIGH
//                 ? styles.sensorDanger
//                 : styles.sensorSafe
//             }
//           >
//             {temperature < TEMP_LOW
//               ? "TOO LOW"
//               : temperature > TEMP_HIGH
//               ? "TOO HIGH"
//               : "NORMAL"}
//           </Text>

//         </View>

//         {/* =========================================
//             HUMIDITY
//         ========================================= */}

//         <View style={styles.sensorItem}>

//           <MaterialCommunityIcons
//             name="water-percent"
//             size={30}
//             color="#FFFFFF"
//           />

//           <Animated.Text
//             style={[
//               styles.sensorLabel,
//               {
//                 color: "#FFFFFF",
//               },
//             ]}
//           >
//             Humidity
//           </Animated.Text>

//           <Animated.Text
//             style={[
//               styles.sensorValue,
//               {
//                 color: "#FFFFFF",
//               },
//             ]}
//           >
//             {humidity.toFixed(1)}%
//           </Animated.Text>

//           {/* Humidity status */}

//           <Text
//             style={
//               humidity < HUM_LOW ||
//               humidity > HUM_HIGH
//                 ? styles.sensorDanger
//                 : styles.sensorSafe
//             }
//           >
//             {humidity < HUM_LOW
//               ? "TOO LOW"
//               : humidity > HUM_HIGH
//               ? "TOO HIGH"
//               : "NORMAL"}
//           </Text>

//         </View>

//         {/* =========================================
//             GAS
//         ========================================= */}

//         <View style={styles.sensorItem}>

//           <MaterialCommunityIcons
//             name="molecule"
//             size={30}
//             color="#FFFFFF"
//           />

//           <Animated.Text
//             style={[
//               styles.sensorLabel,
//               {
//                 color: "#FFFFFF",
//               },
//             ]}
//           >
//             Gas
//           </Animated.Text>

//           <Animated.Text
//             style={[
//               styles.sensorValue,
//               {
//                 color: "#FFFFFF",
//               },
//             ]}
//           >
//             {gas}
//           </Animated.Text>

//           {/* Gas status */}

//           <Text
//             style={
//               gas > GAS_HIGH
//                 ? styles.sensorDanger
//                 : styles.sensorSafe
//             }
//           >
//             {gas > GAS_HIGH
//               ? "TOO HIGH"
//               : "NORMAL"}
//           </Text>

//         </View>

//       </View>

//       {/* =============================================
//           SENSOR ID
//       ============================================= */}

//       <Animated.Text
//         style={[
//           styles.sensorId,
//           {
//             color: "#FFFFFF",
//           },
//         ]}
//       >
//         Latest Reading ID: {room.sensor_id}
//       </Animated.Text>

//     </Animated.View>
//   );
// }

// // =====================================================
// // MAIN SCREEN
// // =====================================================

// export default function SensorMonitoring() {

//   const router = useRouter();

//   const {
//     theme,
//     darkMode,
//   } = useTheme();

//   const [rooms, setRooms] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [refreshing, setRefreshing] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   // ===================================================
//   // FETCH REAL SENSOR DATA
//   // ===================================================

//   const fetchSensorData = async () => {

//     try {

//       console.log(
//         "================================="
//       );

//       console.log(
//         "📡 Fetching REAL sensor data..."
//       );

//       console.log(
//         "🌐 URL:",
//         `${API_BASE_URL}/api/sensor`
//       );

//       const response = await fetch(
//         `${API_BASE_URL}/api/sensor`
//       );

//       console.log(
//         "📡 HTTP STATUS:",
//         response.status
//       );

//       if (!response.ok) {

//         throw new Error(
//           `HTTP ${response.status}`
//         );

//       }

//       const result =
//         await response.json();

//       console.log(
//         "📦 SENSOR API RESPONSE:",
//         result
//       );

//       if (
//         !result.success ||
//         !Array.isArray(result.data)
//       ) {

//         setRooms([]);

//         setError(
//           "No sensor data available"
//         );

//         return;
//       }

//       // =================================================
//       // ONE CARD PER ROOM
//       //
//       // Backend returns many readings:
//       //
//       // 428 -> Room 1
//       // 427 -> Room 1
//       // 426 -> Room 1
//       //
//       // Keep only the latest reading
//       // for each room.
//       // =================================================

//       const latestRooms = {};

//       result.data.forEach((sensor) => {

//         const roomId =
//           sensor.room_id;

//         if (
//           roomId === undefined ||
//           roomId === null
//         ) {
//           return;
//         }

//         const existing =
//           latestRooms[roomId];

//         if (
//           !existing ||
//           Number(sensor.sensor_id) >
//             Number(existing.sensor_id)
//         ) {

//           latestRooms[roomId] =
//             sensor;

//         }

//       });

//       // =================================================
//       // CONVERT OBJECT TO ARRAY
//       // =================================================

//       const uniqueRooms =
//         Object.values(
//           latestRooms
//         );

//       // =================================================
//       // SORT ROOMS BY ROOM ID
//       // =================================================

//       uniqueRooms.sort(
//         (a, b) =>
//           Number(a.room_id) -
//           Number(b.room_id)
//       );

//       console.log(
//         "🏭 UNIQUE ROOMS:",
//         uniqueRooms
//       );

//       setRooms(
//         uniqueRooms
//       );

//       setError("");

//     } catch (err) {

//       console.log(
//         "❌ SENSOR CONNECTION ERROR:",
//         err
//       );

//       setError(
//         "Unable to connect to VineSafe server"
//       );

//     } finally {

//       setLoading(false);

//       setRefreshing(false);

//     }

//   };

//   // ===================================================
//   // LOAD DATA
//   // ===================================================

//   useEffect(() => {

//     fetchSensorData();

//     // Get latest real data every 5 seconds

//     const interval =
//       setInterval(
//         fetchSensorData,
//         5000
//       );

//     return () => {

//       clearInterval(
//         interval
//       );

//     };

//   }, []);

//   // ===================================================
//   // PULL TO REFRESH
//   // ===================================================

//   const onRefresh = () => {

//     setRefreshing(true);

//     fetchSensorData();

//   };

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

//         refreshControl={
//           <RefreshControl
//             refreshing={
//               refreshing
//             }

//             onRefresh={
//               onRefresh
//             }
//           />
//         }
//       >

//         {/* =========================================
//             HEADER
//         ========================================= */}

//         <View style={styles.header}>

//           <Pressable
//             onPress={() =>
//               router.back()
//             }

//             style={styles.backButton}
//           >

//             <MaterialCommunityIcons
//               name="arrow-left"
//               size={26}
//               color={theme.text}
//             />

//           </Pressable>

//           <View style={styles.headerText}>

//             <Text
//               style={[
//                 styles.title,
//                 {
//                   color:
//                     theme.text,
//                 },
//               ]}
//             >
//               Sensor Monitoring
//             </Text>

//             <Text
//               style={[
//                 styles.subtitle,
//                 {
//                   color:
//                     theme.subText,
//                 },
//               ]}
//             >
//               Current conditions of all storage rooms
//             </Text>

//           </View>

//         </View>

//         {/* =========================================
//             THRESHOLD INFORMATION
//         ========================================= */}

//         <View
//           style={[
//             styles.thresholdCard,
//             {
//               backgroundColor:
//                 theme.card,

//               borderWidth:
//                 darkMode ? 1 : 0,

//               borderColor:
//                 theme.border,
//             },
//           ]}
//         >

//           <MaterialCommunityIcons
//             name="information-outline"
//             size={22}
//             color="#2E7D32"
//           />

//           <View
//             style={
//               styles.thresholdTextContainer
//             }
//           >

//             <Text
//               style={[
//                 styles.thresholdTitle,
//                 {
//                   color:
//                     theme.text,
//                 },
//               ]}
//             >
//               Monitoring Thresholds
//             </Text>

//             <Text
//               style={[
//                 styles.thresholdText,
//                 {
//                   color:
//                     theme.subText,
//                 },
//               ]}
//             >
//               Temperature: {TEMP_LOW}–{TEMP_HIGH}°C
//             </Text>

//             <Text
//               style={[
//                 styles.thresholdText,
//                 {
//                   color:
//                     theme.subText,
//                 },
//               ]}
//             >
//               Humidity: {HUM_LOW}–{HUM_HIGH}%
//             </Text>

//             <Text
//               style={[
//                 styles.thresholdText,
//                 {
//                   color:
//                     theme.subText,
//                 },
//               ]}
//             >
//               Gas: below {GAS_HIGH}
//             </Text>

//           </View>

//         </View>

//         {/* =========================================
//             LOADING
//         ========================================= */}

//         {loading && (

//           <View style={styles.center}>

//             <Text
//               style={{
//                 color:
//                   theme.subText,
//               }}
//             >
//               Loading real sensor data...
//             </Text>

//           </View>

//         )}

//         {/* =========================================
//             CONNECTION ERROR
//         ========================================= */}

//         {!loading &&
//           error !== "" && (

//             <View
//               style={[
//                 styles.errorCard,
//                 {
//                   backgroundColor:
//                     theme.card,
//                 },
//               ]}
//             >

//               <MaterialCommunityIcons
//                 name="wifi-off"
//                 size={35}
//                 color="#2E7D32"
//               />

//               <Text
//                 style={[
//                   styles.errorTitle,
//                   {
//                     color:
//                       theme.text,
//                   },
//                 ]}
//               >
//                 Connection Problem
//               </Text>

//               <Text
//                 style={[
//                   styles.errorText,
//                   {
//                     color:
//                       theme.subText,
//                   },
//                 ]}
//               >
//                 {error}
//               </Text>

//               <Text
//                 style={[
//                   styles.apiText,
//                   {
//                     color:
//                       theme.subText,
//                   },
//                 ]}
//               >
//                 {API_BASE_URL}
//               </Text>

//               <Pressable
//                 style={
//                   styles.retryButton
//                 }

//                 onPress={
//                   fetchSensorData
//                 }
//               >

//                 <Text
//                   style={
//                     styles.retryText
//                   }
//                 >
//                   Retry
//                 </Text>

//               </Pressable>

//             </View>

//           )}

//         {/* =========================================
//             NO DATA
//         ========================================= */}

//         {!loading &&
//           error === "" &&
//           rooms.length === 0 && (

//             <View
//               style={[
//                 styles.errorCard,
//                 {
//                   backgroundColor:
//                     theme.card,
//                 },
//               ]}
//             >

//               <MaterialCommunityIcons
//                 name="database-off"
//                 size={35}
//                 color="#2E7D32"
//               />

//               <Text
//                 style={[
//                   styles.errorTitle,
//                   {
//                     color:
//                       theme.text,
//                   },
//                 ]}
//               >
//                 No Sensor Data
//               </Text>

//               <Text
//                 style={[
//                   styles.errorText,
//                   {
//                     color:
//                       theme.subText,
//                   },
//                 ]}
//               >
//                 No sensor readings have been received yet.
//               </Text>

//             </View>

//           )}

//         {/* =========================================
//             ONE CARD PER ROOM
//         ========================================= */}

//         {rooms.map(
//           (room) => (

//             <RoomSensorCard
//               key={
//                 String(room.room_id)
//               }

//               room={room}

//               theme={theme}

//               darkMode={
//                 darkMode
//               }
//             />

//           )
//         )}

//       </ScrollView>

//     </LinearGradient>

//   );
// }

// // =====================================================
// // STYLES
// // =====================================================

// const styles =
//   StyleSheet.create({

//     container: {
//       flex: 1,
//       padding: 20,
//     },

//     scrollContent: {
//       paddingTop: 45,
//       paddingBottom: 40,
//     },

//     // =================================================
//     // HEADER
//     // =================================================

//     header: {
//       flexDirection: "row",
//       alignItems: "center",
//       marginBottom: 22,
//     },

//     backButton: {
//       width: 42,
//       height: 42,
//       borderRadius: 21,
//       justifyContent: "center",
//       alignItems: "center",
//       marginRight: 12,
//     },

//     headerText: {
//       flex: 1,
//     },

//     title: {
//       fontSize: 26,
//       fontWeight: "800",
//     },

//     subtitle: {
//       fontSize: 13,
//       marginTop: 4,
//     },

//     // =================================================
//     // THRESHOLD CARD
//     // =================================================

//     thresholdCard: {
//       borderRadius: 16,
//       padding: 16,
//       flexDirection: "row",
//       marginBottom: 20,
//     },

//     thresholdTextContainer: {
//       marginLeft: 12,
//       flex: 1,
//     },

//     thresholdTitle: {
//       fontSize: 15,
//       fontWeight: "800",
//       marginBottom: 5,
//     },

//     thresholdText: {
//       fontSize: 12,
//       marginTop: 2,
//     },

//     // =================================================
//     // ROOM CARD
//     // =================================================

//     roomCard: {
//       borderRadius: 20,
//       padding: 18,
//       marginBottom: 18,
//     },

//     roomHeader: {
//       flexDirection: "row",
//       alignItems: "center",
//       marginBottom: 16,
//     },

//     roomIcon: {
//       width: 48,
//       height: 48,
//       borderRadius: 14,
//       justifyContent: "center",
//       alignItems: "center",
//     },

//     roomInfo: {
//       flex: 1,
//       marginLeft: 12,
//     },

//     roomNumber: {
//       fontSize: 19,
//       fontWeight: "800",
//     },

//     roomId: {
//       fontSize: 12,
//       marginTop: 3,
//     },

//     // =================================================
//     // SAFE BADGE
//     // =================================================

//     safeBadge: {
//       flexDirection: "row",
//       alignItems: "center",
//       paddingHorizontal: 9,
//       paddingVertical: 5,
//       borderRadius: 12,
//       backgroundColor: "#2E7D32",
//     },

//     safeText: {
//       color: "#2E7D32",
//       fontSize: 10,
//       fontWeight: "800",
//       marginLeft: 4,
//     },

//     safeTextWhite: {
//       color: "#FFFFFF",
//       fontSize: 10,
//       fontWeight: "900",
//       marginLeft: 4,
//     },

//     // =================================================
//     // DANGER BADGE
//     // =================================================

//     dangerBadge: {
//       flexDirection: "row",
//       alignItems: "center",
//       backgroundColor: "#C62828",
//       paddingHorizontal: 9,
//       paddingVertical: 5,
//       borderRadius: 12,
//     },

//     dangerText: {
//       color: "#FFFFFF",
//       fontSize: 10,
//       fontWeight: "900",
//       marginLeft: 4,
//     },

//     // =================================================
//     // DANGER WARNING
//     // =================================================

//     warningBox: {
//       backgroundColor: "#C62828",
//       borderRadius: 12,
//       padding: 10,
//       flexDirection: "row",
//       alignItems: "center",
//       marginBottom: 16,
//     },

//     warningText: {
//       color: "#FFFFFF",
//       fontSize: 12,
//       fontWeight: "700",
//       marginLeft: 8,
//       flex: 1,
//     },

//     // =================================================
//     // SAFE MESSAGE
//     // =================================================

//     safeMessageBox: {
//       backgroundColor: "#2E7D32",
//       borderRadius: 12,
//       padding: 10,
//       flexDirection: "row",
//       alignItems: "center",
//       marginBottom: 16,
//     },

//     safeMessageText: {
//       color: "#FFFFFF",
//       fontSize: 12,
//       fontWeight: "700",
//       marginLeft: 8,
//       flex: 1,
//     },

//     // =================================================
//     // SENSOR VALUES
//     // =================================================

//     sensorContainer: {
//       flexDirection: "row",
//       justifyContent: "space-between",
//     },

//     sensorItem: {
//       flex: 1,
//       alignItems: "center",
//     },

//     sensorLabel: {
//       fontSize: 11,
//       marginTop: 6,
//       textAlign: "center",
//     },

//     sensorValue: {
//       fontSize: 17,
//       fontWeight: "900",
//       marginTop: 4,
//     },

//     // =================================================
//     // SENSOR STATUS
//     // =================================================

//     sensorDanger: {
//       color: "#FFD54F",
//       fontSize: 9,
//       fontWeight: "900",
//       marginTop: 4,
//     },

//     sensorSafe: {
//       color: "#FFFFFF",
//       fontSize: 9,
//       fontWeight: "700",
//       marginTop: 4,
//     },

//     // =================================================
//     // SENSOR ID
//     // =================================================

//     sensorId: {
//       fontSize: 10,
//       textAlign: "center",
//       marginTop: 16,
//     },

//     // =================================================
//     // LOADING
//     // =================================================

//     center: {
//       alignItems: "center",
//       padding: 30,
//     },

//     // =================================================
//     // ERROR CARD
//     // =================================================

//     errorCard: {
//       borderRadius: 18,
//       padding: 25,
//       alignItems: "center",
//       marginBottom: 20,
//     },

//     errorTitle: {
//       fontSize: 18,
//       fontWeight: "800",
//       marginTop: 10,
//     },

//     errorText: {
//       fontSize: 13,
//       textAlign: "center",
//       marginTop: 7,
//       lineHeight: 20,
//     },

//     apiText: {
//       fontSize: 11,
//       marginTop: 10,
//       textAlign: "center",
//     },

//     // =================================================
//     // RETRY BUTTON
//     // =================================================

//     retryButton: {
//       backgroundColor: "#2E7D32",
//       paddingHorizontal: 25,
//       paddingVertical: 10,
//       borderRadius: 10,
//       marginTop: 15,
//     },

//     retryText: {
//       color: "#FFFFFF",
//       fontWeight: "800",
//     },

//   });









import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";

import {
    Animated,
    Pressable,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { useTheme } from "../../context/ThemeContext";

// =====================================================
// BACKEND API
// =====================================================

const API_BASE_URL = "http://10.147.4.54:5000";

// =====================================================
// SENSOR THRESHOLDS
// THESE MUST MATCH THE ARDUINO CODE
// =====================================================

// Arduino:
// #define TEMP_THRESHOLD 25.0
// #define GAS_THRESHOLD 2000

const TEMP_THRESHOLD = 25;
const GAS_THRESHOLD = 2000;

// IMPORTANT:
// Arduino does NOT have a humidity threshold.
// Therefore humidity is displayed only.
// It does NOT cause DANGER.

// =====================================================
// CHECK SENSOR DANGER
// MATCHES ARDUINO LOGIC
// =====================================================

function checkDanger(room) {
  const temperature = Number(room.temperature);
  const gas = Number(room.gas_value);

  const temperatureHigh =
    temperature > TEMP_THRESHOLD;

  const gasHigh =
    gas > GAS_THRESHOLD;

  return (
    temperatureHigh ||
    gasHigh
  );
}

// =====================================================
// GET DANGER MESSAGE
// MATCHES ARDUINO
// =====================================================

function getDangerMessage(room) {
  const messages = [];

  const temperature =
    Number(room.temperature);

  const gas =
    Number(room.gas_value);

  if (
    temperature > TEMP_THRESHOLD
  ) {
    messages.push(
      `Temperature: ${temperature.toFixed(
        1
      )}°C (Too High)`
    );
  }

  if (
    gas > GAS_THRESHOLD
  ) {
    messages.push(
      `Gas: ${gas} (Too High)`
    );
  }

  return messages.join(" • ");
}

// =====================================================
// CHECK WHICH SENSOR IS DANGEROUS
// =====================================================

function getTemperatureStatus(
  temperature
) {
  if (
    temperature > TEMP_THRESHOLD
  ) {
    return "TOO HIGH";
  }

  return "NORMAL";
}

// =====================================================
// GAS STATUS
// =====================================================

function getGasStatus(gas) {
  if (
    gas > GAS_THRESHOLD
  ) {
    return "TOO HIGH";
  }

  return "NORMAL";
}

// =====================================================
// ROOM SENSOR CARD
// =====================================================

function RoomSensorCard({
  room,
  theme,
  darkMode,
}) {
  const danger =
    checkDanger(room);

  // ===================================================
  // BLINK ANIMATION
  // ONLY RUN WHEN DANGER
  // ===================================================

  const blinkAnimation =
    useRef(
      new Animated.Value(0)
    ).current;

  useEffect(() => {
    let animation;

    if (!danger) {
      blinkAnimation.setValue(0);
      return;
    }

    animation =
      Animated.loop(
        Animated.sequence([
          Animated.timing(
            blinkAnimation,
            {
              toValue: 1,
              duration: 500,
              useNativeDriver: false,
            }
          ),

          Animated.timing(
            blinkAnimation,
            {
              toValue: 0,
              duration: 500,
              useNativeDriver: false,
            }
          ),
        ])
      );

    animation.start();

    return () => {
      if (animation) {
        animation.stop();
      }
    };
  }, [
    danger,
    blinkAnimation,
  ]);

  // ===================================================
  // REAL SENSOR VALUES
  // ===================================================

  const temperature =
    Number(room.temperature);

  const humidity =
    Number(room.humidity);

  const gas =
    Number(room.gas_value);

  // ===================================================
  // CARD BACKGROUND
  // ===================================================

  const backgroundColor =
    danger
      ? blinkAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [
            theme.card,
            "#C62828",
          ],
        })
      : "#2E7D32";

  // ===================================================
  // TEXT COLOR
  // ===================================================

  const textColor =
    danger
      ? blinkAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [
            theme.text,
            "#FFFFFF",
          ],
        })
      : "#FFFFFF";

  // ===================================================
  // TEMPERATURE STATUS
  // ===================================================

  const temperatureStatus =
    getTemperatureStatus(
      temperature
    );

  // ===================================================
  // GAS STATUS
  // ===================================================

  const gasStatus =
    getGasStatus(gas);

  // ===================================================
  // RETURN CARD
  // ===================================================

  return (
    <Animated.View
      style={[
        styles.roomCard,
        {
          backgroundColor,

          borderWidth:
            darkMode ? 1 : 0,

          borderColor:
            danger
              ? "#C62828"
              : "#2E7D32",

          elevation:
            darkMode ? 0 : 4,
        },
      ]}
    >

      {/* =================================================
          ROOM HEADER
      ================================================= */}

      <View
        style={styles.roomHeader}
      >

        <View
          style={[
            styles.roomIcon,
            {
              backgroundColor:
                danger
                  ? "rgba(255,255,255,0.15)"
                  : "rgba(255,255,255,0.15)",
            },
          ]}
        >

          <MaterialCommunityIcons
            name="warehouse"
            size={28}
            color="#FFFFFF"
          />

        </View>

        <View
          style={styles.roomInfo}
        >

          <Animated.Text
            style={[
              styles.roomNumber,
              {
                color: textColor,
              },
            ]}
          >
            Room {room.room_id}
          </Animated.Text>

          <Animated.Text
            style={[
              styles.roomId,
              {
                color:
                  "#FFFFFF",
              },
            ]}
          >
            Room ID: {room.room_id}
          </Animated.Text>

        </View>

        {/* =================================================
            STATUS BADGE
        ================================================= */}

        {danger ? (

          <Animated.View
            style={[
              styles.dangerBadge,
              {
                opacity:
                  blinkAnimation.interpolate({
                    inputRange: [
                      0,
                      1,
                    ],
                    outputRange: [
                      0.55,
                      1,
                    ],
                  }),
              },
            ]}
          >

            <MaterialCommunityIcons
              name="alert"
              size={16}
              color="#FFFFFF"
            />

            <Text
              style={
                styles.dangerText
              }
            >
              DANGER
            </Text>

          </Animated.View>

        ) : (

          <View
            style={
              styles.safeBadge
            }
          >

            <MaterialCommunityIcons
              name="check-circle"
              size={16}
              color="#FFFFFF"
            />

            <Text
              style={
                styles.safeTextWhite
              }
            >
              SAFE
            </Text>

          </View>

        )}

      </View>

      {/* =================================================
          DANGER WARNING
      ================================================= */}

      {danger && (

        <Animated.View
          style={[
            styles.warningBox,
            {
              opacity:
                blinkAnimation.interpolate({
                  inputRange: [
                    0,
                    1,
                  ],
                  outputRange: [
                    0.75,
                    1,
                  ],
                }),
            },
          ]}
        >

          <MaterialCommunityIcons
            name="alert-circle"
            size={20}
            color="#FFFFFF"
          />

          <Text
            style={
              styles.warningText
            }
          >
            {getDangerMessage(
              room
            )}
          </Text>

        </Animated.View>

      )}

      {/* =================================================
          SAFE MESSAGE
      ================================================= */}

      {!danger && (

        <View
          style={
            styles.safeMessageBox
          }
        >

          <MaterialCommunityIcons
            name="check-circle"
            size={20}
            color="#FFFFFF"
          />

          <Text
            style={
              styles.safeMessageText
            }
          >
            All monitored readings
            are within safe limits
          </Text>

        </View>

      )}

      {/* =================================================
          SENSOR VALUES
      ================================================= */}

      <View
        style={
          styles.sensorContainer
        }
      >

        {/* =================================================
            TEMPERATURE
        ================================================= */}

        <View
          style={
            styles.sensorItem
          }
        >

          <MaterialCommunityIcons
            name="thermometer"
            size={30}
            color="#FFFFFF"
          />

          <Text
            style={
              styles.sensorLabel
            }
          >
            Temperature
          </Text>

          <Text
            style={
              styles.sensorValue
            }
          >
            {temperature.toFixed(
              1
            )}
            °C
          </Text>

          <Text
            style={
              temperature >
              TEMP_THRESHOLD
                ? styles.sensorDanger
                : styles.sensorSafe
            }
          >
            {temperatureStatus}
          </Text>

        </View>

        {/* =================================================
            HUMIDITY
        ================================================= */}

        <View
          style={
            styles.sensorItem
          }
        >

          <MaterialCommunityIcons
            name="water-percent"
            size={30}
            color="#FFFFFF"
          />

          <Text
            style={
              styles.sensorLabel
            }
          >
            Humidity
          </Text>

          <Text
            style={
              styles.sensorValue
            }
          >
            {humidity.toFixed(
              1
            )}
            %
          </Text>

          {/* Humidity is only displayed.
              Arduino has no humidity threshold. */}

          <Text
            style={
              styles.sensorSafe
            }
          >
            MONITORING
          </Text>

        </View>

        {/* =================================================
            GAS
        ================================================= */}

        <View
          style={
            styles.sensorItem
          }
        >

          <MaterialCommunityIcons
            name="molecule"
            size={30}
            color="#FFFFFF"
          />

          <Text
            style={
              styles.sensorLabel
            }
          >
            Gas
          </Text>

          <Text
            style={
              styles.sensorValue
            }
          >
            {gas}
          </Text>

          <Text
            style={
              gas >
              GAS_THRESHOLD
                ? styles.sensorDanger
                : styles.sensorSafe
            }
          >
            {gasStatus}
          </Text>

        </View>

      </View>

      {/* =================================================
          SENSOR ID
      ================================================= */}

      <Text
        style={
          styles.sensorId
        }
      >
        Latest Reading ID:{" "}
        {room.sensor_id}
      </Text>

      {/* =================================================
          RECORDED TIME
      ================================================= */}

      {room.recorded_at && (
        <Text
          style={
            styles.recordedTime
          }
        >
          Updated:{" "}
          {String(
            room.recorded_at
          )}
        </Text>
      )}

    </Animated.View>
  );
}

// =====================================================
// MAIN SCREEN
// =====================================================

export default function SensorMonitoring() {

  const router =
    useRouter();

  const {
    theme,
    darkMode,
  } = useTheme();

  // ===================================================
  // STATE
  // ===================================================

  const [rooms, setRooms] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  // ===================================================
  // PREVENT OVERLAPPING REQUESTS
  // ===================================================

  const fetchingRef =
    useRef(false);

  // ===================================================
  // FETCH SENSOR DATA
  // ===================================================

  const fetchSensorData =
    async (
      isRefresh = false
    ) => {

      // Prevent another request
      // while one is already running.

      if (
        fetchingRef.current
      ) {
        return;
      }

      fetchingRef.current =
        true;

      try {

        if (isRefresh) {
          setRefreshing(true);
        }

        // =================================================
        // CACHE BUSTER
        // This prevents old API response from being reused.
        // =================================================

        const url =
          `${API_BASE_URL}/api/sensor?_=${Date.now()}`;

        const response =
          await fetch(
            url,
            {
              method: "GET",

              headers: {
                Accept:
                  "application/json",

                "Cache-Control":
                  "no-cache",

                Pragma:
                  "no-cache",
              },
            }
          );

        if (
          !response.ok
        ) {
          throw new Error(
            `HTTP ${response.status}`
          );
        }

        const result =
          await response.json();

        // =================================================
        // VALIDATE RESPONSE
        // =================================================

        if (
          !result ||
          !result.success ||
          !Array.isArray(
            result.data
          )
        ) {

          setError(
            "No sensor data available"
          );

          return;
        }

        // =================================================
        // ONE LATEST READING PER ROOM
        // =================================================

        const latestRooms =
          {};

        result.data.forEach(
          (sensor) => {

            const roomId =
              sensor.room_id;

            if (
              roomId ===
                undefined ||
              roomId === null
            ) {
              return;
            }

            const existing =
              latestRooms[
                roomId
              ];

            // ---------------------------------------------
            // If this is the first reading
            // ---------------------------------------------

            if (!existing) {

              latestRooms[
                roomId
              ] = sensor;

              return;
            }

            // ---------------------------------------------
            // Compare recorded_at FIRST
            // ---------------------------------------------

            const newTime =
              sensor.recorded_at
                ? new Date(
                    sensor.recorded_at
                  ).getTime()
                : 0;

            const oldTime =
              existing.recorded_at
                ? new Date(
                    existing.recorded_at
                  ).getTime()
                : 0;

            // ---------------------------------------------
            // New reading
            // ---------------------------------------------

            if (
              newTime > oldTime
            ) {

              latestRooms[
                roomId
              ] = sensor;

              return;
            }

            // ---------------------------------------------
            // Same/missing timestamp
            // Use sensor_id as fallback
            // ---------------------------------------------

            if (
              newTime ===
                oldTime &&
              Number(
                sensor.sensor_id
              ) >
                Number(
                  existing.sensor_id
                )
            ) {

              latestRooms[
                roomId
              ] = sensor;
            }

          }
        );

        // =================================================
        // CONVERT TO ARRAY
        // =================================================

        const uniqueRooms =
          Object.values(
            latestRooms
          );

        // =================================================
        // SORT BY ROOM ID
        // =================================================

        uniqueRooms.sort(
          (a, b) =>
            Number(
              a.room_id
            ) -
            Number(
              b.room_id
            )
        );

        // =================================================
        // UPDATE ONLY IF DATA EXISTS
        // =================================================

        setRooms(
          uniqueRooms
        );

        setError("");

      } catch (err) {

        console.log(
          "Sensor fetch error:",
          err
        );

        // Don't immediately erase
        // already displayed values
        // if a temporary request fails.

        if (
          rooms.length === 0
        ) {

          setError(
            "Unable to connect to VineSafe server"
          );

        }

      } finally {

        fetchingRef.current =
          false;

        setLoading(false);

        setRefreshing(false);
      }
    };

  // =====================================================
  // INITIAL LOAD + FAST MONITORING
  // =====================================================

  useEffect(() => {

    // Load immediately
    fetchSensorData();

    // Arduino sends every 1.5 seconds.
    // App checks every 1 second.

    const interval =
      setInterval(
        () => {
          fetchSensorData();
        },
        1000
      );

    return () => {
      clearInterval(
        interval
      );
    };

  }, []);

  // =====================================================
  // PULL TO REFRESH
  // =====================================================

  const onRefresh =
    () => {

      fetchSensorData(
        true
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
      style={
        styles.container
      }
    >

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }

        contentContainerStyle={
          styles.scrollContent
        }

        refreshControl={
          <RefreshControl
            refreshing={
              refreshing
            }
            onRefresh={
              onRefresh
            }
          />
        }
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <View
          style={
            styles.header
          }
        >

          <Pressable
            onPress={() =>
              router.back()
            }
            style={
              styles.backButton
            }
          >

            <MaterialCommunityIcons
              name="arrow-left"
              size={26}
              color={
                theme.text
              }
            />

          </Pressable>

          <View
            style={
              styles.headerText
            }
          >

            <Text
              style={[
                styles.title,
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
                styles.subtitle,
                {
                  color:
                    theme.subText,
                },
              ]}
            >
              Live conditions of all
              storage rooms
            </Text>

          </View>

        </View>

        {/* =================================================
            THRESHOLD INFORMATION
        ================================================= */}

        <View
          style={[
            styles.thresholdCard,
            {
              backgroundColor:
                theme.card,

              borderWidth:
                darkMode
                  ? 1
                  : 0,

              borderColor:
                theme.border,
            },
          ]}
        >

          <MaterialCommunityIcons
            name="information-outline"
            size={22}
            color="#2E7D32"
          />

          <View
            style={
              styles.thresholdTextContainer
            }
          >

            <Text
              style={[
                styles.thresholdTitle,
                {
                  color:
                    theme.text,
                },
              ]}
            >
              Arduino Monitoring
              Thresholds
            </Text>

            <Text
              style={[
                styles.thresholdText,
                {
                  color:
                    theme.subText,
                },
              ]}
            >
              Temperature:
              {" "}
              ≤ {TEMP_THRESHOLD}°C
              = Normal
            </Text>

            <Text
              style={[
                styles.thresholdText,
                {
                  color:
                    theme.subText,
                },
              ]}
            >
              Temperature:
              {" "}
              &gt; {TEMP_THRESHOLD}°C
              = Danger
            </Text>

            <Text
              style={[
                styles.thresholdText,
                {
                  color:
                    theme.subText,
                },
              ]}
            >
              Gas:
              {" "}
              ≤ {GAS_THRESHOLD}
              = Normal
            </Text>

            <Text
              style={[
                styles.thresholdText,
                {
                  color:
                    theme.subText,
                },
              ]}
            >
              Gas:
              {" "}
              &gt; {GAS_THRESHOLD}
              = Danger
            </Text>

            <Text
              style={[
                styles.thresholdText,
                {
                  color:
                    theme.subText,
                },
              ]}
            >
              Humidity: Display only
            </Text>

          </View>

        </View>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (

          <View
            style={
              styles.center
            }
          >

            <Text
              style={{
                color:
                  theme.subText,
              }}
            >
              Connecting to live
              sensor data...
            </Text>

          </View>

        )}

        {/* =================================================
            CONNECTION ERROR
        ================================================= */}

        {!loading &&
          error !== "" && (

            <View
              style={[
                styles.errorCard,
                {
                  backgroundColor:
                    theme.card,
                },
              ]}
            >

              <MaterialCommunityIcons
                name="wifi-off"
                size={35}
                color="#2E7D32"
              />

              <Text
                style={[
                  styles.errorTitle,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                Connection Problem
              </Text>

              <Text
                style={[
                  styles.errorText,
                  {
                    color:
                      theme.subText,
                  },
                ]}
              >
                {error}
              </Text>

              <Text
                style={[
                  styles.apiText,
                  {
                    color:
                      theme.subText,
                  },
                ]}
              >
                {API_BASE_URL}
              </Text>

              <Pressable
                style={
                  styles.retryButton
                }
                onPress={() =>
                  fetchSensorData(
                    true
                  )
                }
              >

                <Text
                  style={
                    styles.retryText
                  }
                >
                  Retry
                </Text>

              </Pressable>

            </View>

          )}

        {/* =================================================
            NO DATA
        ================================================= */}

        {!loading &&
          error === "" &&
          rooms.length === 0 && (

            <View
              style={[
                styles.errorCard,
                {
                  backgroundColor:
                    theme.card,
                },
              ]}
            >

              <MaterialCommunityIcons
                name="database-off"
                size={35}
                color="#2E7D32"
              />

              <Text
                style={[
                  styles.errorTitle,
                  {
                    color:
                      theme.text,
                  },
                ]}
              >
                No Sensor Data
              </Text>

              <Text
                style={[
                  styles.errorText,
                  {
                    color:
                      theme.subText,
                  },
                ]}
              >
                No sensor readings
                have been received yet.
              </Text>

            </View>

          )}

        {/* =================================================
            ONE CARD PER ROOM
        ================================================= */}

        {rooms.map(
          (room) => (

            <RoomSensorCard
              key={
                String(
                  room.room_id
                )
              }

              room={
                room
              }

              theme={
                theme
              }

              darkMode={
                darkMode
              }
            />

          )
        )}

      </ScrollView>

    </LinearGradient>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles =
  StyleSheet.create({

    container: {
      flex: 1,
      padding: 20,
    },

    scrollContent: {
      paddingTop: 45,
      paddingBottom: 40,
    },

    // =================================================
    // HEADER
    // =================================================

    header: {
      flexDirection:
        "row",

      alignItems:
        "center",

      marginBottom:
        22,
    },

    backButton: {
      width: 42,
      height: 42,
      borderRadius: 21,

      justifyContent:
        "center",

      alignItems:
        "center",

      marginRight: 12,
    },

    headerText: {
      flex: 1,
    },

    title: {
      fontSize: 26,
      fontWeight: "800",
    },

    subtitle: {
      fontSize: 13,
      marginTop: 4,
    },

    // =================================================
    // THRESHOLD CARD
    // =================================================

    thresholdCard: {
      borderRadius: 16,
      padding: 16,

      flexDirection:
        "row",

      marginBottom:
        20,
    },

    thresholdTextContainer: {
      marginLeft: 12,
      flex: 1,
    },

    thresholdTitle: {
      fontSize: 15,
      fontWeight: "800",
      marginBottom: 5,
    },

    thresholdText: {
      fontSize: 12,
      marginTop: 2,
    },

    // =================================================
    // ROOM CARD
    // =================================================

    roomCard: {
      borderRadius: 20,
      padding: 18,
      marginBottom: 18,
    },

    roomHeader: {
      flexDirection:
        "row",

      alignItems:
        "center",

      marginBottom:
        16,
    },

    roomIcon: {
      width: 48,
      height: 48,

      borderRadius: 14,

      justifyContent:
        "center",

      alignItems:
        "center",
    },

    roomInfo: {
      flex: 1,
      marginLeft: 12,
    },

    roomNumber: {
      fontSize: 19,
      fontWeight: "800",
    },

    roomId: {
      fontSize: 12,
      marginTop: 3,
    },

    // =================================================
    // SAFE BADGE
    // =================================================

    safeBadge: {
      flexDirection:
        "row",

      alignItems:
        "center",

      paddingHorizontal:
        9,

      paddingVertical:
        5,

      borderRadius:
        12,

      backgroundColor:
        "#2E7D32",
    },

    safeTextWhite: {
      color:
        "#FFFFFF",

      fontSize:
        10,

      fontWeight:
        "900",

      marginLeft:
        4,
    },

    // =================================================
    // DANGER BADGE
    // =================================================

    dangerBadge: {
      flexDirection:
        "row",

      alignItems:
        "center",

      backgroundColor:
        "#C62828",

      paddingHorizontal:
        9,

      paddingVertical:
        5,

      borderRadius:
        12,
    },

    dangerText: {
      color:
        "#FFFFFF",

      fontSize:
        10,

      fontWeight:
        "900",

      marginLeft:
        4,
    },

    // =================================================
    // WARNING
    // =================================================

    warningBox: {
      backgroundColor:
        "#C62828",

      borderRadius:
        12,

      padding:
        10,

      flexDirection:
        "row",

      alignItems:
        "center",

      marginBottom:
        16,
    },

    warningText: {
      color:
        "#FFFFFF",

      fontSize:
        12,

      fontWeight:
        "700",

      marginLeft:
        8,

      flex: 1,
    },

    // =================================================
    // SAFE MESSAGE
    // =================================================

    safeMessageBox: {
      backgroundColor:
        "#2E7D32",

      borderRadius:
        12,

      padding:
        10,

      flexDirection:
        "row",

      alignItems:
        "center",

      marginBottom:
        16,
    },

    safeMessageText: {
      color:
        "#FFFFFF",

      fontSize:
        12,

      fontWeight:
        "700",

      marginLeft:
        8,

      flex: 1,
    },

    // =================================================
    // SENSOR VALUES
    // =================================================

    sensorContainer: {
      flexDirection:
        "row",

      justifyContent:
        "space-between",
    },

    sensorItem: {
      flex: 1,
      alignItems:
        "center",
    },

    sensorLabel: {
      color:
        "#FFFFFF",

      fontSize:
        11,

      marginTop:
        6,

      textAlign:
        "center",
    },

    sensorValue: {
      color:
        "#FFFFFF",

      fontSize:
        17,

      fontWeight:
        "900",

      marginTop:
        4,
    },

    // =================================================
    // SENSOR STATUS
    // =================================================

    sensorDanger: {
      color:
        "#FFD54F",

      fontSize:
        9,

      fontWeight:
        "900",

      marginTop:
        4,
    },

    sensorSafe: {
      color:
        "#FFFFFF",

      fontSize:
        9,

      fontWeight:
        "700",

      marginTop:
        4,
    },

    // =================================================
    // SENSOR ID
    // =================================================

    sensorId: {
      color:
        "#FFFFFF",

      fontSize:
        10,

      textAlign:
        "center",

      marginTop:
        16,
    },

    recordedTime: {
      color:
        "rgba(255,255,255,0.75)",

      fontSize:
        9,

      textAlign:
        "center",

      marginTop:
        4,
    },

    // =================================================
    // LOADING
    // =================================================

    center: {
      alignItems:
        "center",

      padding:
        30,
    },

    // =================================================
    // ERROR
    // =================================================

    errorCard: {
      borderRadius:
        18,

      padding:
        25,

      alignItems:
        "center",

      marginBottom:
        20,
    },

    errorTitle: {
      fontSize:
        18,

      fontWeight:
        "800",

      marginTop:
        10,
    },

    errorText: {
      fontSize:
        13,

      textAlign:
        "center",

      marginTop:
        7,

      lineHeight:
        20,
    },

    apiText: {
      fontSize:
        11,

      marginTop:
        10,

      textAlign:
        "center",
    },

    // =================================================
    // RETRY
    // =================================================

    retryButton: {
      backgroundColor:
        "#2E7D32",

      paddingHorizontal:
        25,

      paddingVertical:
        10,

      borderRadius:
        10,

      marginTop:
        15,
    },

    retryText: {
      color:
  
      "#FFFFFF",

      fontWeight:
        "800",
    },

  });