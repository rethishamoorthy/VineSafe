// // // // import React, { useState } from "react";
// // // // import {
// // // //   View,
// // // //   Text,
// // // //   StyleSheet,
// // // //   ScrollView,
// // // //   TouchableOpacity,
// // // // } from "react-native";
// // // // import { Ionicons } from "@expo/vector-icons";
// // // // import { StatusBar } from "expo-status-bar";

// // // // export default function Monitoring() {
// // // //   const [period, setPeriod] = useState("Daily");

// // // //   // =====================================================
// // // //   // DUMMY MONITORING DATA
// // // //   // Later this will come from ESP32 / API
// // // //   // =====================================================

// // // //   const data = {
// // // //     Daily: {
// // // //       temperature: [23, 24, 25, 24, 26, 25, 24],
// // // //       humidity: [62, 64, 67, 65, 68, 66, 63],
// // // //       gas: [280, 310, 295, 330, 350, 320, 300],
// // // //       labels: ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM", "12 AM"],
// // // //     },

// // // //     Weekly: {
// // // //       temperature: [23, 25, 24, 26, 25, 24, 27],
// // // //       humidity: [62, 65, 64, 68, 66, 63, 69],
// // // //       gas: [280, 320, 300, 350, 330, 310, 370],
// // // //       labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
// // // //     },

// // // //     Monthly: {
// // // //       temperature: [23, 24, 25, 26, 24, 27, 25],
// // // //       humidity: [61, 64, 66, 65, 68, 63, 67],
// // // //       gas: [270, 290, 320, 350, 310, 380, 340],
// // // //       labels: ["1", "5", "10", "15", "20", "25", "30"],
// // // //     },
// // // //   };

// // // //   const currentData = data[period];

// // // //   const currentTemperature =
// // // //     currentData.temperature[currentData.temperature.length - 1];

// // // //   const currentHumidity =
// // // //     currentData.humidity[currentData.humidity.length - 1];

// // // //   const currentGas =
// // // //     currentData.gas[currentData.gas.length - 1];

// // // //   return (
// // // //     <View style={styles.container}>
// // // //       <StatusBar style="dark" />

// // // //       <ScrollView
// // // //         showsVerticalScrollIndicator={false}
// // // //         contentContainerStyle={styles.scrollContent}
// // // //       >
// // // //         {/* =================================================
// // // //             TITLE
// // // //         ================================================= */}

// // // //         <Text style={styles.heading}>
// // // //           Monitoring
// // // //         </Text>

// // // //         <Text style={styles.subtitle}>
// // // //           Storage room environmental monitoring
// // // //         </Text>

// // // //         {/* =================================================
// // // //             CURRENT VALUES
// // // //         ================================================= */}

// // // //         <View style={styles.cardsContainer}>

// // // //           {/* TEMPERATURE */}

// // // //           <View style={styles.monitorCard}>
// // // //             <View style={styles.iconBox}>
// // // //               <Ionicons
// // // //                 name="thermometer-outline"
// // // //                 size={28}
// // // //                 color="#E53935"
// // // //               />
// // // //             </View>

// // // //             <Text style={styles.cardLabel}>
// // // //               Temperature
// // // //             </Text>

// // // //             <Text style={styles.cardValue}>
// // // //               {currentTemperature}°C
// // // //             </Text>

// // // //             <Text style={styles.cardStatus}>
// // // //               Normal
// // // //             </Text>
// // // //           </View>

// // // //           {/* HUMIDITY */}

// // // //           <View style={styles.monitorCard}>
// // // //             <View style={styles.iconBox}>
// // // //               <Ionicons
// // // //                 name="water-outline"
// // // //                 size={28}
// // // //                 color="#1976D2"
// // // //               />
// // // //             </View>

// // // //             <Text style={styles.cardLabel}>
// // // //               Humidity
// // // //             </Text>

// // // //             <Text style={styles.cardValue}>
// // // //               {currentHumidity}%
// // // //             </Text>

// // // //             <Text style={styles.cardStatus}>
// // // //               Normal
// // // //             </Text>
// // // //           </View>

// // // //           {/* GAS */}

// // // //           <View style={styles.monitorCard}>
// // // //             <View style={styles.iconBox}>
// // // //               <Ionicons
// // // //                 name="flask-outline"
// // // //                 size={28}
// // // //                 color="#F57C00"
// // // //               />
// // // //             </View>

// // // //             <Text style={styles.cardLabel}>
// // // //               Gas Level
// // // //             </Text>

// // // //             <Text style={styles.cardValue}>
// // // //               {currentGas}
// // // //             </Text>

// // // //             <Text style={styles.cardUnit}>
// // // //               ppm
// // // //             </Text>
// // // //           </View>

// // // //         </View>

// // // //         {/* =================================================
// // // //             PERIOD SELECTOR
// // // //         ================================================= */}

// // // //         <View style={styles.sectionHeader}>
// // // //           <Text style={styles.sectionTitle}>
// // // //             Monitoring History
// // // //           </Text>
// // // //         </View>

// // // //         <View style={styles.periodContainer}>

// // // //           {["Daily", "Weekly", "Monthly"].map(
// // // //             (item) => (
// // // //               <TouchableOpacity
// // // //                 key={item}
// // // //                 style={[
// // // //                   styles.periodButton,
// // // //                   period === item &&
// // // //                     styles.periodButtonActive,
// // // //                 ]}
// // // //                 onPress={() => setPeriod(item)}
// // // //               >
// // // //                 <Text
// // // //                   style={[
// // // //                     styles.periodText,
// // // //                     period === item &&
// // // //                       styles.periodTextActive,
// // // //                   ]}
// // // //                 >
// // // //                   {item}
// // // //                 </Text>
// // // //               </TouchableOpacity>
// // // //             )
// // // //           )}

// // // //         </View>

// // // //         {/* =================================================
// // // //             TEMPERATURE SCATTER PLOT
// // // //         ================================================= */}

// // // //         <View style={styles.chartCard}>

// // // //           <Text style={styles.chartTitle}>
// // // //             Temperature
// // // //           </Text>

// // // //           <Text style={styles.chartSubtitle}>
// // // //             {period} temperature readings
// // // //           </Text>

// // // //           <ScatterPlot
// // // //             values={currentData.temperature}
// // // //             labels={currentData.labels}
// // // //             unit="°C"
// // // //           />

// // // //         </View>

// // // //         {/* =================================================
// // // //             HUMIDITY SCATTER PLOT
// // // //         ================================================= */}

// // // //         <View style={styles.chartCard}>

// // // //           <Text style={styles.chartTitle}>
// // // //             Humidity
// // // //           </Text>

// // // //           <Text style={styles.chartSubtitle}>
// // // //             {period} humidity readings
// // // //           </Text>

// // // //           <ScatterPlot
// // // //             values={currentData.humidity}
// // // //             labels={currentData.labels}
// // // //             unit="%"
// // // //           />

// // // //         </View>

// // // //         {/* =================================================
// // // //             GAS SCATTER PLOT
// // // //         ================================================= */}

// // // //         <View style={styles.chartCard}>

// // // //           <Text style={styles.chartTitle}>
// // // //             Gas Level
// // // //           </Text>

// // // //           <Text style={styles.chartSubtitle}>
// // // //             {period} gas readings
// // // //           </Text>

// // // //           <ScatterPlot
// // // //             values={currentData.gas}
// // // //             labels={currentData.labels}
// // // //             unit="ppm"
// // // //           />

// // // //         </View>

// // // //       </ScrollView>
// // // //     </View>
// // // //   );
// // // // }


// // // // // =====================================================
// // // // // SIMPLE SCATTER PLOT
// // // // // =====================================================

// // // // function ScatterPlot({
// // // //   values,
// // // //   labels,
// // // //   unit,
// // // // }) {
// // // //   const minValue = Math.min(...values);
// // // //   const maxValue = Math.max(...values);

// // // //   const range =
// // // //     maxValue - minValue === 0
// // // //       ? 1
// // // //       : maxValue - minValue;

// // // //   return (
// // // //     <View style={styles.plotContainer}>

// // // //       {/* Y AXIS */}

// // // //       <View style={styles.yAxis}>

// // // //         <Text style={styles.axisText}>
// // // //           {maxValue}
// // // //         </Text>

// // // //         <Text style={styles.axisText}>
// // // //           {Math.round(
// // // //             (maxValue + minValue) / 2
// // // //           )}
// // // //         </Text>

// // // //         <Text style={styles.axisText}>
// // // //           {minValue}
// // // //         </Text>

// // // //       </View>

// // // //       {/* PLOT */}

// // // //       <View style={styles.plot}>

// // // //         {/* GRID */}

// // // //         <View
// // // //           style={[
// // // //             styles.gridLine,
// // // //             { top: "0%" },
// // // //           ]}
// // // //         />

// // // //         <View
// // // //           style={[
// // // //             styles.gridLine,
// // // //             { top: "50%" },
// // // //           ]}
// // // //         />

// // // //         <View
// // // //           style={[
// // // //             styles.gridLine,
// // // //             { top: "100%" },
// // // //           ]}
// // // //         />

// // // //         {/* POINTS */}

// // // //         {values.map((value, index) => {

// // // //           const left =
// // // //             values.length === 1
// // // //               ? 50
// // // //               : (index /
// // // //                   (values.length - 1)) *
// // // //                 100;

// // // //           const bottom =
// // // //             ((value - minValue) /
// // // //               range) *
// // // //             85;

// // // //           return (
// // // //             <View
// // // //               key={index}
// // // //               style={[
// // // //                 styles.point,
// // // //                 {
// // // //                   left: `${left}%`,
// // // //                   bottom: `${bottom}%`,
// // // //                 },
// // // //               ]}
// // // //             >
// // // //               <View style={styles.pointDot} />

// // // //               <Text style={styles.pointValue}>
// // // //                 {value}
// // // //               </Text>
// // // //             </View>
// // // //           );
// // // //         })}

// // // //       </View>

// // // //       {/* X AXIS */}

// // // //       <View style={styles.xAxis}>

// // // //         {labels.map((label, index) => (
// // // //           <Text
// // // //             key={index}
// // // //             style={styles.xAxisText}
// // // //           >
// // // //             {label}
// // // //           </Text>
// // // //         ))}

// // // //       </View>

// // // //       <Text style={styles.unitText}>
// // // //         Unit: {unit}
// // // //       </Text>

// // // //     </View>
// // // //   );
// // // // }


// // // // // =====================================================
// // // // // STYLES
// // // // // =====================================================

// // // // const styles = StyleSheet.create({

// // // //   container: {
// // // //     flex: 1,
// // // //     backgroundColor: "#F5F7F5",
// // // //   },

// // // //   scrollContent: {
// // // //     padding: 20,
// // // //     paddingBottom: 40,
// // // //   },

// // // //   heading: {
// // // //     fontSize: 28,
// // // //     fontWeight: "bold",
// // // //     color: "#1B5E20",
// // // //     marginTop: 20,
// // // //   },

// // // //   subtitle: {
// // // //     fontSize: 14,
// // // //     color: "#777",
// // // //     marginTop: 5,
// // // //     marginBottom: 20,
// // // //   },

// // // //   // ===================================================
// // // //   // MONITORING CARDS
// // // //   // ===================================================

// // // //   cardsContainer: {
// // // //     gap: 12,
// // // //   },

// // // //   monitorCard: {
// // // //     backgroundColor: "#FFFFFF",
// // // //     borderRadius: 16,
// // // //     padding: 18,
// // // //     borderWidth: 1,
// // // //     borderColor: "#D9E5D8",
// // // //     elevation: 3,
// // // //   },

// // // //   iconBox: {
// // // //     width: 50,
// // // //     height: 50,
// // // //     borderRadius: 14,
// // // //     backgroundColor: "#F5F7F5",
// // // //     justifyContent: "center",
// // // //     alignItems: "center",
// // // //     marginBottom: 10,
// // // //   },

// // // //   cardLabel: {
// // // //     fontSize: 15,
// // // //     color: "#666",
// // // //   },

// // // //   cardValue: {
// // // //     fontSize: 30,
// // // //     fontWeight: "bold",
// // // //     color: "#222",
// // // //     marginTop: 3,
// // // //   },

// // // //   cardStatus: {
// // // //     color: "#2E7D32",
// // // //     fontSize: 13,
// // // //     fontWeight: "bold",
// // // //     marginTop: 4,
// // // //   },

// // // //   cardUnit: {
// // // //     fontSize: 13,
// // // //     color: "#777",
// // // //     marginTop: -3,
// // // //   },

// // // //   // ===================================================
// // // //   // SECTION
// // // //   // ===================================================

// // // //   sectionHeader: {
// // // //     marginTop: 25,
// // // //     marginBottom: 12,
// // // //   },

// // // //   sectionTitle: {
// // // //     fontSize: 21,
// // // //     fontWeight: "bold",
// // // //     color: "#222",
// // // //   },

// // // //   // ===================================================
// // // //   // PERIOD BUTTONS
// // // //   // ===================================================

// // // //   periodContainer: {
// // // //     flexDirection: "row",
// // // //     backgroundColor: "#E8F5E9",
// // // //     borderRadius: 12,
// // // //     padding: 4,
// // // //     marginBottom: 18,
// // // //   },

// // // //   periodButton: {
// // // //     flex: 1,
// // // //     paddingVertical: 11,
// // // //     alignItems: "center",
// // // //     borderRadius: 9,
// // // //   },

// // // //   periodButtonActive: {
// // // //     backgroundColor: "#2E7D32",
// // // //   },

// // // //   periodText: {
// // // //     fontSize: 14,
// // // //     fontWeight: "600",
// // // //     color: "#2E7D32",
// // // //   },

// // // //   periodTextActive: {
// // // //     color: "#FFFFFF",
// // // //   },

// // // //   // ===================================================
// // // //   // CHART CARD
// // // //   // ===================================================

// // // //   chartCard: {
// // // //     backgroundColor: "#FFFFFF",
// // // //     borderRadius: 16,
// // // //     padding: 18,
// // // //     marginBottom: 18,
// // // //     borderWidth: 1,
// // // //     borderColor: "#D9E5D8",
// // // //     elevation: 3,
// // // //   },

// // // //   chartTitle: {
// // // //     fontSize: 19,
// // // //     fontWeight: "bold",
// // // //     color: "#1B5E20",
// // // //   },

// // // //   chartSubtitle: {
// // // //     fontSize: 13,
// // // //     color: "#888",
// // // //     marginTop: 4,
// // // //     marginBottom: 15,
// // // //   },

// // // //   // ===================================================
// // // //   // PLOT
// // // //   // ===================================================

// // // //   plotContainer: {
// // // //     height: 230,
// // // //     paddingLeft: 35,
// // // //   },

// // // //   yAxis: {
// // // //     position: "absolute",
// // // //     left: 0,
// // // //     top: 5,
// // // //     bottom: 30,
// // // //     justifyContent: "space-between",
// // // //   },

// // // //   axisText: {
// // // //     fontSize: 10,
// // // //     color: "#777",
// // // //   },

// // // //   plot: {
// // // //     height: 180,
// // // //     position: "relative",
// // // //     borderLeftWidth: 1,
// // // //     borderBottomWidth: 1,
// // // //     borderColor: "#BDBDBD",
// // // //   },

// // // //   gridLine: {
// // // //     position: "absolute",
// // // //     left: 0,
// // // //     right: 0,
// // // //     borderTopWidth: 1,
// // // //     borderTopColor: "#EEEEEE",
// // // //   },

// // // //   point: {
// // // //     position: "absolute",
// // // //     alignItems: "center",
// // // //     transform: [
// // // //       {
// // // //         translateX: -5,
// // // //       },
// // // //     ],
// // // //   },

// // // //   pointDot: {
// // // //     width: 10,
// // // //     height: 10,
// // // //     borderRadius: 5,
// // // //     backgroundColor: "#2E7D32",
// // // //     borderWidth: 2,
// // // //     borderColor: "#FFFFFF",
// // // //   },

// // // //   pointValue: {
// // // //     fontSize: 9,
// // // //     color: "#555",
// // // //     marginTop: 3,
// // // //   },

// // // //   xAxis: {
// // // //     flexDirection: "row",
// // // //     justifyContent: "space-between",
// // // //     paddingTop: 7,
// // // //   },

// // // //   xAxisText: {
// // // //     fontSize: 9,
// // // //     color: "#777",
// // // //   },

// // // //   unitText: {
// // // //     textAlign: "right",
// // // //     fontSize: 10,
// // // //     color: "#999",
// // // //     marginTop: 8,
// // // //   },

// // // // });





// // // import React, { useState } from "react";
// // // import {
// // //   View,
// // //   Text,
// // //   StyleSheet,
// // //   ScrollView,
// // //   TouchableOpacity,
// // // } from "react-native";
// // // import { Ionicons } from "@expo/vector-icons";
// // // import { StatusBar } from "expo-status-bar";

// // // export default function Monitoring() {
// // //   const [period, setPeriod] = useState("Daily");

// // //   // =====================================================
// // //   // DUMMY MONITORING DATA
// // //   // Later this will come from ESP32 / API
// // //   // =====================================================

// // //   const data = {
// // //     Daily: {
// // //       temperature: [23, 24, 25, 24, 26, 25, 24],
// // //       humidity: [62, 64, 67, 65, 68, 66, 63],
// // //       gas: [280, 310, 295, 330, 350, 320, 300],
// // //       labels: [
// // //         "6 AM",
// // //         "9 AM",
// // //         "12 PM",
// // //         "3 PM",
// // //         "6 PM",
// // //         "9 PM",
// // //         "12 AM",
// // //       ],
// // //     },

// // //     Weekly: {
// // //       temperature: [23, 25, 24, 26, 25, 24, 27],
// // //       humidity: [62, 65, 64, 68, 66, 63, 69],
// // //       gas: [280, 320, 300, 350, 330, 310, 370],
// // //       labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
// // //     },

// // //     Monthly: {
// // //       temperature: [23, 24, 25, 26, 24, 27, 25],
// // //       humidity: [61, 64, 66, 65, 68, 63, 67],
// // //       gas: [270, 290, 320, 350, 310, 380, 340],
// // //       labels: ["1", "5", "10", "15", "20", "25", "30"],
// // //     },
// // //   };

// // //   const currentData = data[period];

// // //   const currentTemperature =
// // //     currentData.temperature[
// // //       currentData.temperature.length - 1
// // //     ];

// // //   const currentHumidity =
// // //     currentData.humidity[
// // //       currentData.humidity.length - 1
// // //     ];

// // //   const currentGas =
// // //     currentData.gas[
// // //       currentData.gas.length - 1
// // //     ];

// // //   return (
// // //     <View style={styles.container}>
// // //       <StatusBar style="dark" />

// // //       <ScrollView
// // //         showsVerticalScrollIndicator={false}
// // //         contentContainerStyle={styles.scrollContent}
// // //       >

// // //         {/* =================================================
// // //             HEADER
// // //         ================================================= */}

// // //         <Text style={styles.heading}>
// // //           Monitoring
// // //         </Text>

// // //         <Text style={styles.subtitle}>
// // //           Storage room environmental monitoring
// // //         </Text>


// // //         {/* =================================================
// // //             CURRENT VALUES
// // //         ================================================= */}

// // //         <View style={styles.cardsContainer}>

// // //           {/* TEMPERATURE */}

// // //           <View style={styles.monitorCard}>

// // //             <View style={styles.cardTopRow}>

// // //               <View style={styles.iconBox}>
// // //                 <Ionicons
// // //                   name="thermometer-outline"
// // //                   size={28}
// // //                   color="#E53935"
// // //                 />
// // //               </View>

// // //               <View style={styles.liveBadge}>
// // //                 <View style={styles.liveDot} />

// // //                 <Text style={styles.liveText}>
// // //                   LIVE
// // //                 </Text>
// // //               </View>

// // //             </View>

// // //             <Text style={styles.cardLabel}>
// // //               Temperature
// // //             </Text>

// // //             <Text style={styles.cardValue}>
// // //               {currentTemperature}°C
// // //             </Text>

// // //             <Text style={styles.cardStatus}>
// // //               ● Normal
// // //             </Text>

// // //           </View>


// // //           {/* HUMIDITY */}

// // //           <View style={styles.monitorCard}>

// // //             <View style={styles.cardTopRow}>

// // //               <View style={styles.iconBox}>
// // //                 <Ionicons
// // //                   name="water-outline"
// // //                   size={28}
// // //                   color="#1976D2"
// // //                 />
// // //               </View>

// // //               <View style={styles.liveBadge}>
// // //                 <View style={styles.liveDot} />

// // //                 <Text style={styles.liveText}>
// // //                   LIVE
// // //                 </Text>
// // //               </View>

// // //             </View>

// // //             <Text style={styles.cardLabel}>
// // //               Humidity
// // //             </Text>

// // //             <Text style={styles.cardValue}>
// // //               {currentHumidity}%
// // //             </Text>

// // //             <Text style={styles.cardStatus}>
// // //               ● Normal
// // //             </Text>

// // //           </View>


// // //           {/* GAS */}

// // //           <View style={styles.monitorCard}>

// // //             <View style={styles.cardTopRow}>

// // //               <View style={styles.iconBox}>
// // //                 <Ionicons
// // //                   name="flask-outline"
// // //                   size={28}
// // //                   color="#F57C00"
// // //                 />
// // //               </View>

// // //               <View style={styles.liveBadge}>
// // //                 <View style={styles.liveDot} />

// // //                 <Text style={styles.liveText}>
// // //                   LIVE
// // //                 </Text>
// // //               </View>

// // //             </View>

// // //             <Text style={styles.cardLabel}>
// // //               Gas Level
// // //             </Text>

// // //             <Text style={styles.cardValue}>
// // //               {currentGas}
// // //             </Text>

// // //             <Text style={styles.cardUnit}>
// // //               ppm
// // //             </Text>

// // //           </View>

// // //         </View>


// // //         {/* =================================================
// // //             HISTORY
// // //         ================================================= */}

// // //         <View style={styles.sectionHeader}>

// // //           <View>
// // //             <Text style={styles.sectionTitle}>
// // //               Monitoring History
// // //             </Text>

// // //             <Text style={styles.sectionSubtitle}>
// // //               Environmental readings over time
// // //             </Text>
// // //           </View>

// // //         </View>


// // //         {/* =================================================
// // //             PERIOD SELECTOR
// // //         ================================================= */}

// // //         <View style={styles.periodContainer}>

// // //           {["Daily", "Weekly", "Monthly"].map(
// // //             (item) => (

// // //               <TouchableOpacity
// // //                 key={item}
// // //                 style={[
// // //                   styles.periodButton,
// // //                   period === item &&
// // //                     styles.periodButtonActive,
// // //                 ]}
// // //                 onPress={() =>
// // //                   setPeriod(item)
// // //                 }
// // //               >

// // //                 <Text
// // //                   style={[
// // //                     styles.periodText,
// // //                     period === item &&
// // //                       styles.periodTextActive,
// // //                   ]}
// // //                 >
// // //                   {item}
// // //                 </Text>

// // //               </TouchableOpacity>

// // //             )
// // //           )}

// // //         </View>


// // //         {/* =================================================
// // //             TEMPERATURE
// // //         ================================================= */}

// // //         <View style={styles.chartCard}>

// // //           <View style={styles.chartHeader}>

// // //             <View>

// // //               <Text style={styles.chartTitle}>
// // //                 Temperature
// // //               </Text>

// // //               <Text style={styles.chartSubtitle}>
// // //                 {period} temperature readings
// // //               </Text>

// // //             </View>

// // //             <View style={styles.chartIconTemperature}>
// // //               <Ionicons
// // //                 name="thermometer-outline"
// // //                 size={22}
// // //                 color="#E53935"
// // //               />
// // //             </View>

// // //           </View>

// // //           <LineScatterPlot
// // //             values={currentData.temperature}
// // //             labels={currentData.labels}
// // //             unit="°C"
// // //           />

// // //         </View>


// // //         {/* =================================================
// // //             HUMIDITY
// // //         ================================================= */}

// // //         <View style={styles.chartCard}>

// // //           <View style={styles.chartHeader}>

// // //             <View>

// // //               <Text style={styles.chartTitle}>
// // //                 Humidity
// // //               </Text>

// // //               <Text style={styles.chartSubtitle}>
// // //                 {period} humidity readings
// // //               </Text>

// // //             </View>

// // //             <View style={styles.chartIconHumidity}>
// // //               <Ionicons
// // //                 name="water-outline"
// // //                 size={22}
// // //                 color="#1976D2"
// // //               />
// // //             </View>

// // //           </View>

// // //           <LineScatterPlot
// // //             values={currentData.humidity}
// // //             labels={currentData.labels}
// // //             unit="%"
// // //           />

// // //         </View>


// // //         {/* =================================================
// // //             GAS
// // //         ================================================= */}

// // //         <View style={styles.chartCard}>

// // //           <View style={styles.chartHeader}>

// // //             <View>

// // //               <Text style={styles.chartTitle}>
// // //                 Gas Level
// // //               </Text>

// // //               <Text style={styles.chartSubtitle}>
// // //                 {period} gas readings
// // //               </Text>

// // //             </View>

// // //             <View style={styles.chartIconGas}>
// // //               <Ionicons
// // //                 name="flask-outline"
// // //                 size={22}
// // //                 color="#F57C00"
// // //               />
// // //             </View>

// // //           </View>

// // //           <LineScatterPlot
// // //             values={currentData.gas}
// // //             labels={currentData.labels}
// // //             unit="ppm"
// // //           />

// // //         </View>

// // //       </ScrollView>
// // //     </View>
// // //   );
// // // }


// // // // =====================================================
// // // // LINE + SCATTER PLOT
// // // // =====================================================

// // // function LineScatterPlot({
// // //   values,
// // //   labels,
// // //   unit,
// // // }) {

// // //   const minValue = Math.min(...values);
// // //   const maxValue = Math.max(...values);

// // //   const range =
// // //     maxValue - minValue === 0
// // //       ? 1
// // //       : maxValue - minValue;

// // //   const chartHeight = 180;

// // //   const getLeftPosition = (index) => {

// // //     if (values.length === 1) {
// // //       return 50;
// // //     }

// // //     return (
// // //       (index /
// // //         (values.length - 1)) *
// // //       100
// // //     );

// // //   };

// // //   const getBottomPosition = (value) => {

// // //     return (
// // //       ((value - minValue) /
// // //         range) *
// // //       85
// // //     );

// // //   };

// // //   return (
// // //     <View style={styles.plotContainer}>

// // //       {/* =================================================
// // //           Y AXIS
// // //       ================================================= */}

// // //       <View style={styles.yAxis}>

// // //         <Text style={styles.axisText}>
// // //           {maxValue}
// // //         </Text>

// // //         <Text style={styles.axisText}>
// // //           {Math.round(
// // //             (maxValue + minValue) / 2
// // //           )}
// // //         </Text>

// // //         <Text style={styles.axisText}>
// // //           {minValue}
// // //         </Text>

// // //       </View>


// // //       {/* =================================================
// // //           PLOT AREA
// // //       ================================================= */}

// // //       <View
// // //         style={[
// // //           styles.plot,
// // //           {
// // //             height: chartHeight,
// // //           },
// // //         ]}
// // //       >

// // //         {/* =================================================
// // //             GRID
// // //         ================================================= */}

// // //         <View
// // //           style={[
// // //             styles.gridLine,
// // //             {
// // //               top: "0%",
// // //             },
// // //           ]}
// // //         />

// // //         <View
// // //           style={[
// // //             styles.gridLine,
// // //             {
// // //               top: "25%",
// // //             },
// // //           ]}
// // //         />

// // //         <View
// // //           style={[
// // //             styles.gridLine,
// // //             {
// // //               top: "50%",
// // //             },
// // //           ]}
// // //         />

// // //         <View
// // //           style={[
// // //             styles.gridLine,
// // //             {
// // //               top: "75%",
// // //             },
// // //           ]}
// // //         />

// // //         <View
// // //           style={[
// // //             styles.gridLine,
// // //             {
// // //               top: "100%",
// // //             },
// // //           ]}
// // //         />


// // //         {/* =================================================
// // //             CONNECTING LINES
// // //         ================================================= */}

// // //         {values.map((value, index) => {

// // //           if (index === values.length - 1) {
// // //             return null;
// // //           }

// // //           const nextValue =
// // //             values[index + 1];

// // //           const x1 =
// // //             getLeftPosition(index);

// // //           const x2 =
// // //             getLeftPosition(index + 1);

// // //           const y1 =
// // //             getBottomPosition(value);

// // //           const y2 =
// // //             getBottomPosition(nextValue);

// // //           const dx =
// // //             ((x2 - x1) / 100) *
// // //             100;

// // //           const dy =
// // //             ((y2 - y1) / 100) *
// // //             chartHeight;

// // //           const length =
// // //             Math.sqrt(
// // //               dx * dx +
// // //               dy * dy
// // //             );

// // //           const angle =
// // //             Math.atan2(
// // //               -dy,
// // //               dx
// // //             ) *
// // //             (180 / Math.PI);

// // //           return (
// // //             <View
// // //               key={`line-${index}`}
// // //               style={[
// // //                 styles.connectionLine,
// // //                 {
// // //                   width: length,
// // //                   left: `${x1}%`,
// // //                   bottom: `${y1}%`,
// // //                   transform: [
// // //                     {
// // //                       rotate: `${angle}deg`,
// // //                     },
// // //                   ],
// // //                 },
// // //               ]}
// // //             />
// // //           );

// // //         })}


// // //         {/* =================================================
// // //             DATA POINTS
// // //         ================================================= */}

// // //         {values.map(
// // //           (value, index) => {

// // //             const left =
// // //               getLeftPosition(index);

// // //             const bottom =
// // //               getBottomPosition(value);

// // //             return (
// // //               <View
// // //                 key={`point-${index}`}
// // //                 style={[
// // //                   styles.point,
// // //                   {
// // //                     left: `${left}%`,
// // //                     bottom: `${bottom}%`,
// // //                   },
// // //                 ]}
// // //               >

// // //                 {/* VALUE */}

// // //                 <Text style={styles.pointValue}>
// // //                   {value}
// // //                 </Text>


// // //                 {/* DOT */}

// // //                 <View
// // //                   style={styles.pointDot}
// // //                 />

// // //               </View>
// // //             );

// // //           }
// // //         )}

// // //       </View>


// // //       {/* =================================================
// // //           X AXIS
// // //       ================================================= */}

// // //       <View style={styles.xAxis}>

// // //         {labels.map(
// // //           (label, index) => (

// // //             <Text
// // //               key={index}
// // //               style={styles.xAxisText}
// // //             >
// // //               {label}
// // //             </Text>

// // //           )
// // //         )}

// // //       </View>


// // //       {/* =================================================
// // //           UNIT
// // //       ================================================= */}

// // //       <Text style={styles.unitText}>
// // //         Unit: {unit}
// // //       </Text>

// // //     </View>
// // //   );
// // // }


// // // // =====================================================
// // // // STYLES
// // // // =====================================================

// // // const styles = StyleSheet.create({

// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: "#F5F7F5",
// // //   },

// // //   scrollContent: {
// // //     padding: 20,
// // //     paddingBottom: 50,
// // //   },

// // //   // ===================================================
// // //   // HEADER
// // //   // ===================================================

// // //   heading: {
// // //     fontSize: 28,
// // //     fontWeight: "bold",
// // //     color: "#1B5E20",
// // //     marginTop: 20,
// // //   },

// // //   subtitle: {
// // //     fontSize: 14,
// // //     color: "#777",
// // //     marginTop: 5,
// // //     marginBottom: 20,
// // //   },

// // //   // ===================================================
// // //   // MONITORING CARDS
// // //   // ===================================================

// // //   cardsContainer: {
// // //     gap: 12,
// // //   },

// // //   monitorCard: {
// // //     backgroundColor: "#FFFFFF",
// // //     borderRadius: 16,
// // //     padding: 18,
// // //     borderWidth: 1,
// // //     borderColor: "#D9E5D8",
// // //     elevation: 3,
// // //   },

// // //   cardTopRow: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //   },

// // //   iconBox: {
// // //     width: 50,
// // //     height: 50,
// // //     borderRadius: 14,
// // //     backgroundColor: "#F5F7F5",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     marginBottom: 10,
// // //   },

// // //   liveBadge: {
// // //     flexDirection: "row",
// // //     alignItems: "center",
// // //     backgroundColor: "#E8F5E9",
// // //     paddingHorizontal: 9,
// // //     paddingVertical: 5,
// // //     borderRadius: 20,
// // //   },

// // //   liveDot: {
// // //     width: 7,
// // //     height: 7,
// // //     borderRadius: 4,
// // //     backgroundColor: "#2E7D32",
// // //     marginRight: 5,
// // //   },

// // //   liveText: {
// // //     fontSize: 10,
// // //     fontWeight: "bold",
// // //     color: "#2E7D32",
// // //   },

// // //   cardLabel: {
// // //     fontSize: 15,
// // //     color: "#666",
// // //   },

// // //   cardValue: {
// // //     fontSize: 30,
// // //     fontWeight: "bold",
// // //     color: "#222",
// // //     marginTop: 3,
// // //   },

// // //   cardStatus: {
// // //     color: "#2E7D32",
// // //     fontSize: 13,
// // //     fontWeight: "bold",
// // //     marginTop: 4,
// // //   },

// // //   cardUnit: {
// // //     fontSize: 13,
// // //     color: "#777",
// // //     marginTop: -3,
// // //   },

// // //   // ===================================================
// // //   // SECTION
// // //   // ===================================================

// // //   sectionHeader: {
// // //     marginTop: 28,
// // //     marginBottom: 12,
// // //   },

// // //   sectionTitle: {
// // //     fontSize: 21,
// // //     fontWeight: "bold",
// // //     color: "#222",
// // //   },

// // //   sectionSubtitle: {
// // //     fontSize: 13,
// // //     color: "#888",
// // //     marginTop: 3,
// // //   },

// // //   // ===================================================
// // //   // PERIOD
// // //   // ===================================================

// // //   periodContainer: {
// // //     flexDirection: "row",
// // //     backgroundColor: "#E8F5E9",
// // //     borderRadius: 12,
// // //     padding: 4,
// // //     marginBottom: 18,
// // //   },

// // //   periodButton: {
// // //     flex: 1,
// // //     paddingVertical: 11,
// // //     alignItems: "center",
// // //     borderRadius: 9,
// // //   },

// // //   periodButtonActive: {
// // //     backgroundColor: "#2E7D32",
// // //   },

// // //   periodText: {
// // //     fontSize: 14,
// // //     fontWeight: "600",
// // //     color: "#2E7D32",
// // //   },

// // //   periodTextActive: {
// // //     color: "#FFFFFF",
// // //   },

// // //   // ===================================================
// // //   // CHART CARD
// // //   // ===================================================

// // //   chartCard: {
// // //     backgroundColor: "#FFFFFF",
// // //     borderRadius: 18,
// // //     padding: 18,
// // //     marginBottom: 18,
// // //     borderWidth: 1,
// // //     borderColor: "#D9E5D8",
// // //     elevation: 3,
// // //   },

// // //   chartHeader: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     alignItems: "center",
// // //     marginBottom: 15,
// // //   },

// // //   chartTitle: {
// // //     fontSize: 19,
// // //     fontWeight: "bold",
// // //     color: "#1B5E20",
// // //   },

// // //   chartSubtitle: {
// // //     fontSize: 13,
// // //     color: "#888",
// // //     marginTop: 4,
// // //   },

// // //   chartIconTemperature: {
// // //     width: 42,
// // //     height: 42,
// // //     borderRadius: 12,
// // //     backgroundColor: "#FFEBEE",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },

// // //   chartIconHumidity: {
// // //     width: 42,
// // //     height: 42,
// // //     borderRadius: 12,
// // //     backgroundColor: "#E3F2FD",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },

// // //   chartIconGas: {
// // //     width: 42,
// // //     height: 42,
// // //     borderRadius: 12,
// // //     backgroundColor: "#FFF3E0",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //   },

// // //   // ===================================================
// // //   // PLOT
// // //   // ===================================================

// // //   plotContainer: {
// // //     height: 230,
// // //     paddingLeft: 38,
// // //   },

// // //   yAxis: {
// // //     position: "absolute",
// // //     left: 0,
// // //     top: 5,
// // //     bottom: 40,
// // //     justifyContent: "space-between",
// // //   },

// // //   axisText: {
// // //     fontSize: 10,
// // //     color: "#777",
// // //     width: 32,
// // //     textAlign: "right",
// // //   },

// // //   plot: {
// // //     position: "relative",
// // //     borderLeftWidth: 1,
// // //     borderBottomWidth: 1,
// // //     borderColor: "#BDBDBD",
// // //   },

// // //   gridLine: {
// // //     position: "absolute",
// // //     left: 0,
// // //     right: 0,
// // //     borderTopWidth: 1,
// // //     borderTopColor: "#EEEEEE",
// // //   },

// // //   // ===================================================
// // //   // CONNECTING LINE
// // //   // ===================================================

// // //   connectionLine: {
// // //     position: "absolute",
// // //     height: 2,
// // //     backgroundColor: "#2E7D32",
// // //     transformOrigin: "left center",
// // //   },

// // //   // ===================================================
// // //   // POINT
// // //   // ===================================================

// // //   point: {
// // //     position: "absolute",
// // //     alignItems: "center",
// // //     transform: [
// // //       {
// // //         translateX: -5,
// // //       },
// // //     ],
// // //   },

// // //   pointDot: {
// // //     width: 10,
// // //     height: 10,
// // //     borderRadius: 5,
// // //     backgroundColor: "#2E7D32",
// // //     borderWidth: 2,
// // //     borderColor: "#FFFFFF",
// // //   },

// // //   pointValue: {
// // //     fontSize: 9,
// // //     color: "#555",
// // //     marginBottom: 3,
// // //     fontWeight: "600",
// // //   },

// // //   // ===================================================
// // //   // X AXIS
// // //   // ===================================================

// // //   xAxis: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     paddingTop: 8,
// // //   },

// // //   xAxisText: {
// // //     fontSize: 9,
// // //     color: "#777",
// // //   },

// // //   unitText: {
// // //     textAlign: "right",
// // //     fontSize: 10,
// // //     color: "#999",
// // //     marginTop: 8,
// // //   },

// // // });


// // import React, { useState } from "react";
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   ScrollView,
// //   TouchableOpacity,
// //   Dimensions,
// // } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// // import { StatusBar } from "expo-status-bar";
// // import Svg, {
// //   Line,
// //   Polyline,
// //   Circle,
// //   Text as SvgText,
// // } from "react-native-svg";

// // const SCREEN_WIDTH = Dimensions.get("window").width;

// // export default function Monitoring() {
// //   const [period, setPeriod] = useState("Daily");

// //   // =====================================================
// //   // DUMMY MONITORING DATA
// //   // Later this will come from ESP32 / API
// //   // =====================================================

// //   const data = {
// //     Daily: {
// //       temperature: [23, 24, 25, 24, 26, 25, 24],
// //       humidity: [62, 64, 67, 65, 68, 66, 63],
// //       gas: [280, 310, 295, 330, 350, 320, 300],

// //       labels: [
// //         "6 AM",
// //         "9 AM",
// //         "12 PM",
// //         "3 PM",
// //         "6 PM",
// //         "9 PM",
// //         "12 AM",
// //       ],
// //     },

// //     Weekly: {
// //       temperature: [23, 25, 24, 26, 25, 24, 27],
// //       humidity: [62, 65, 64, 68, 66, 63, 69],
// //       gas: [280, 320, 300, 350, 330, 310, 370],

// //       labels: [
// //         "Mon",
// //         "Tue",
// //         "Wed",
// //         "Thu",
// //         "Fri",
// //         "Sat",
// //         "Sun",
// //       ],
// //     },

// //     Monthly: {
// //       temperature: [23, 24, 25, 26, 24, 27, 25],
// //       humidity: [61, 64, 66, 65, 68, 63, 67],
// //       gas: [270, 290, 320, 350, 310, 380, 340],

// //       labels: [
// //         "1",
// //         "5",
// //         "10",
// //         "15",
// //         "20",
// //         "25",
// //         "30",
// //       ],
// //     },
// //   };

// //   const currentData = data[period];

// //   const currentTemperature =
// //     currentData.temperature[
// //       currentData.temperature.length - 1
// //     ];

// //   const currentHumidity =
// //     currentData.humidity[
// //       currentData.humidity.length - 1
// //     ];

// //   const currentGas =
// //     currentData.gas[
// //       currentData.gas.length - 1
// //     ];

// //   return (
// //     <View style={styles.container}>

// //       <StatusBar style="dark" />

// //       <ScrollView
// //         showsVerticalScrollIndicator={false}
// //         contentContainerStyle={styles.scrollContent}
// //       >

// //         {/* =================================================
// //             TITLE
// //         ================================================= */}

// //         <Text style={styles.heading}>
// //           Monitoring
// //         </Text>

// //         <Text style={styles.subtitle}>
// //           Storage room environmental monitoring
// //         </Text>

// //         {/* =================================================
// //             CURRENT VALUES
// //         ================================================= */}

// //         <View style={styles.cardsContainer}>

// //           {/* TEMPERATURE */}

// //           <View style={styles.monitorCard}>

// //             <View style={styles.iconBox}>
// //               <Ionicons
// //                 name="thermometer-outline"
// //                 size={28}
// //                 color="#E53935"
// //               />
// //             </View>

// //             <Text style={styles.cardLabel}>
// //               Temperature
// //             </Text>

// //             <Text style={styles.cardValue}>
// //               {currentTemperature}°C
// //             </Text>

// //             <Text style={styles.cardStatus}>
// //               Normal
// //             </Text>

// //           </View>

// //           {/* HUMIDITY */}

// //           <View style={styles.monitorCard}>

// //             <View style={styles.iconBox}>
// //               <Ionicons
// //                 name="water-outline"
// //                 size={28}
// //                 color="#1976D2"
// //               />
// //             </View>

// //             <Text style={styles.cardLabel}>
// //               Humidity
// //             </Text>

// //             <Text style={styles.cardValue}>
// //               {currentHumidity}%
// //             </Text>

// //             <Text style={styles.cardStatus}>
// //               Normal
// //             </Text>

// //           </View>

// //           {/* GAS */}

// //           <View style={styles.monitorCard}>

// //             <View style={styles.iconBox}>
// //               <Ionicons
// //                 name="flask-outline"
// //                 size={28}
// //                 color="#F57C00"
// //               />
// //             </View>

// //             <Text style={styles.cardLabel}>
// //               Gas Level
// //             </Text>

// //             <Text style={styles.cardValue}>
// //               {currentGas}
// //             </Text>

// //             <Text style={styles.cardUnit}>
// //               ppm
// //             </Text>

// //           </View>

// //         </View>

// //         {/* =================================================
// //             MONITORING HISTORY
// //         ================================================= */}

// //         <View style={styles.sectionHeader}>

// //           <Text style={styles.sectionTitle}>
// //             Monitoring History
// //           </Text>

// //           <Text style={styles.sectionSubtitle}>
// //             Environmental readings over time
// //           </Text>

// //         </View>

// //         {/* =================================================
// //             PERIOD SELECTOR
// //         ================================================= */}

// //         <View style={styles.periodContainer}>

// //           {["Daily", "Weekly", "Monthly"].map(
// //             (item) => (

// //               <TouchableOpacity
// //                 key={item}
// //                 style={[
// //                   styles.periodButton,
// //                   period === item &&
// //                     styles.periodButtonActive,
// //                 ]}
// //                 onPress={() =>
// //                   setPeriod(item)
// //                 }
// //               >

// //                 <Text
// //                   style={[
// //                     styles.periodText,
// //                     period === item &&
// //                       styles.periodTextActive,
// //                   ]}
// //                 >
// //                   {item}
// //                 </Text>

// //               </TouchableOpacity>

// //             )
// //           )}

// //         </View>

// //         {/* =================================================
// //             TEMPERATURE
// //         ================================================= */}

// //         <View style={styles.chartCard}>

// //           <View style={styles.chartHeader}>

// //             <View>
// //               <Text style={styles.chartTitle}>
// //                 Temperature
// //               </Text>

// //               <Text style={styles.chartSubtitle}>
// //                 {period} temperature readings
// //               </Text>
// //             </View>

// //             <View style={styles.temperatureIcon}>
// //               <Ionicons
// //                 name="thermometer-outline"
// //                 size={28}
// //                 color="#E53935"
// //               />
// //             </View>

// //           </View>

// //           <LineChart
// //             values={currentData.temperature}
// //             labels={currentData.labels}
// //             unit="°C"
// //           />

// //         </View>

// //         {/* =================================================
// //             HUMIDITY
// //         ================================================= */}

// //         <View style={styles.chartCard}>

// //           <View style={styles.chartHeader}>

// //             <View>
// //               <Text style={styles.chartTitle}>
// //                 Humidity
// //               </Text>

// //               <Text style={styles.chartSubtitle}>
// //                 {period} humidity readings
// //               </Text>
// //             </View>

// //             <View style={styles.humidityIcon}>
// //               <Ionicons
// //                 name="water-outline"
// //                 size={28}
// //                 color="#1976D2"
// //               />
// //             </View>

// //           </View>

// //           <LineChart
// //             values={currentData.humidity}
// //             labels={currentData.labels}
// //             unit="%"
// //           />

// //         </View>

// //         {/* =================================================
// //             GAS
// //         ================================================= */}

// //         <View style={styles.chartCard}>

// //           <View style={styles.chartHeader}>

// //             <View>
// //               <Text style={styles.chartTitle}>
// //                 Gas Level
// //               </Text>

// //               <Text style={styles.chartSubtitle}>
// //                 {period} gas readings
// //               </Text>
// //             </View>

// //             <View style={styles.gasIcon}>
// //               <Ionicons
// //                 name="flask-outline"
// //                 size={28}
// //                 color="#F57C00"
// //               />
// //             </View>

// //           </View>

// //           <LineChart
// //             values={currentData.gas}
// //             labels={currentData.labels}
// //             unit="ppm"
// //           />

// //         </View>

// //       </ScrollView>

// //     </View>
// //   );
// // }


// // // =====================================================
// // // CONNECTED LINE / SCATTER GRAPH
// // // =====================================================

// // function LineChart({
// //   values,
// //   labels,
// //   unit,
// // }) {

// //   // -----------------------------------------------------
// //   // GRAPH SIZE
// //   // -----------------------------------------------------

// //   const chartWidth =
// //     Math.min(SCREEN_WIDTH - 80, 410);

// //   const chartHeight = 220;

// //   const graphWidth =
// //     chartWidth - 45;

// //   const graphHeight = 170;

// //   const leftPadding = 42;

// //   const topPadding = 10;

// //   // -----------------------------------------------------
// //   // MIN / MAX
// //   // -----------------------------------------------------

// //   const dataMin = Math.min(...values);
// //   const dataMax = Math.max(...values);

// //   let minValue = Math.floor(dataMin);
// //   let maxValue = Math.ceil(dataMax);

// //   if (minValue === maxValue) {
// //     minValue -= 1;
// //     maxValue += 1;
// //   }

// //   const range =
// //     maxValue - minValue;

// //   // -----------------------------------------------------
// //   // CREATE 4 Y AXIS VALUES
// //   // -----------------------------------------------------

// //   const yValues = [
// //     maxValue,
// //     Math.round(
// //       maxValue - range / 3
// //     ),
// //     Math.round(
// //       maxValue - (range * 2) / 3
// //     ),
// //     minValue,
// //   ];

// //   // -----------------------------------------------------
// //   // CALCULATE POINTS
// //   // -----------------------------------------------------

// //   const points = values.map(
// //     (value, index) => {

// //       let x;

// //       if (values.length === 1) {
// //         x =
// //           leftPadding +
// //           graphWidth / 2;
// //       } else {
// //         x =
// //           leftPadding +
// //           (index /
// //             (values.length - 1)) *
// //             graphWidth;
// //       }

// //       const y =
// //         topPadding +
// //         graphHeight -
// //         ((value - minValue) /
// //           range) *
// //           graphHeight;

// //       return {
// //         x,
// //         y,
// //         value,
// //       };
// //     }
// //   );

// //   // -----------------------------------------------------
// //   // POLYLINE STRING
// //   // -----------------------------------------------------

// //   const polylinePoints =
// //     points
// //       .map(
// //         (point) =>
// //           `${point.x},${point.y}`
// //       )
// //       .join(" ");

// //   return (
// //     <View style={styles.graphWrapper}>

// //       {/* =================================================
// //           GRAPH
// //       ================================================= */}

// //       <Svg
// //         width={chartWidth}
// //         height={chartHeight}
// //       >

// //         {/* ===============================================
// //             HORIZONTAL GRID LINES
// //         =============================================== */}

// //         {yValues.map(
// //           (value, index) => {

// //             const y =
// //               topPadding +
// //               (index /
// //                 (yValues.length - 1)) *
// //                 graphHeight;

// //             return (
// //               <Line
// //                 key={`grid-${index}`}
// //                 x1={leftPadding}
// //                 y1={y}
// //                 x2={
// //                   leftPadding +
// //                   graphWidth
// //                 }
// //                 y2={y}
// //                 stroke="#E5E5E5"
// //                 strokeWidth="1"
// //               />
// //             );
// //           }
// //         )}

// //         {/* ===============================================
// //             Y AXIS
// //         =============================================== */}

// //         <Line
// //           x1={leftPadding}
// //           y1={topPadding}
// //           x2={leftPadding}
// //           y2={
// //             topPadding +
// //             graphHeight
// //           }
// //           stroke="#BDBDBD"
// //           strokeWidth="1"
// //         />

// //         {/* ===============================================
// //             BOTTOM AXIS
// //         =============================================== */}

// //         <Line
// //           x1={leftPadding}
// //           y1={
// //             topPadding +
// //             graphHeight
// //           }
// //           x2={
// //             leftPadding +
// //             graphWidth
// //           }
// //           y2={
// //             topPadding +
// //             graphHeight
// //           }
// //           stroke="#BDBDBD"
// //           strokeWidth="1"
// //         />

// //         {/* ===============================================
// //             Y AXIS VALUES
// //         =============================================== */}

// //         {yValues.map(
// //           (value, index) => {

// //             const y =
// //               topPadding +
// //               (index /
// //                 (yValues.length - 1)) *
// //                 graphHeight;

// //             return (
// //               <SvgText
// //                 key={`ylabel-${index}`}
// //                 x="34"
// //                 y={y + 4}
// //                 fontSize="11"
// //                 fill="#777"
// //                 textAnchor="end"
// //               >
// //                 {value}
// //               </SvgText>
// //             );
// //           }
// //         )}

// //         {/* ===============================================
// //             CONNECTING LINE
// //         =============================================== */}

// //         <Polyline
// //           points={polylinePoints}
// //           fill="none"
// //           stroke="#2E7D32"
// //           strokeWidth="3"
// //           strokeLinecap="round"
// //           strokeLinejoin="round"
// //         />

// //         {/* ===============================================
// //             DATA POINTS
// //         =============================================== */}

// //         {points.map(
// //           (point, index) => (

// //             <Circle
// //               key={`point-${index}`}
// //               cx={point.x}
// //               cy={point.y}
// //               r="5"
// //               fill="#2E7D32"
// //               stroke="#FFFFFF"
// //               strokeWidth="2"
// //             />

// //           )
// //         )}

// //         {/* ===============================================
// //             DATA VALUES
// //         =============================================== */}

// //         {points.map(
// //           (point, index) => {

// //             let valueY =
// //               point.y - 12;

// //             // Prevent value from going outside top
// //             if (valueY < 12) {
// //               valueY =
// //                 point.y + 20;
// //             }

// //             return (
// //               <SvgText
// //                 key={`value-${index}`}
// //                 x={point.x}
// //                 y={valueY}
// //                 fontSize="11"
// //                 fill="#555"
// //                 fontWeight="500"
// //                 textAnchor="middle"
// //               >
// //                 {point.value}
// //               </SvgText>
// //             );
// //           }
// //         )}

// //       </Svg>

// //       {/* =================================================
// //           X AXIS LABELS
// //       ================================================= */}

// //       <View
// //         style={[
// //           styles.xLabels,
// //           {
// //             width: graphWidth,
// //             marginLeft: leftPadding,
// //           },
// //         ]}
// //       >

// //         {labels.map(
// //           (label, index) => (

// //             <Text
// //               key={`xlabel-${index}`}
// //               style={styles.xLabel}
// //             >
// //               {label}
// //             </Text>

// //           )
// //         )}

// //       </View>

// //       {/* =================================================
// //           UNIT
// //       ================================================= */}

// //       <Text style={styles.unitText}>
// //         Unit: {unit}
// //       </Text>

// //     </View>
// //   );
// // }


// // // =====================================================
// // // STYLES
// // // =====================================================

// // const styles = StyleSheet.create({

// //   // ===================================================
// //   // MAIN
// //   // ===================================================

// //   container: {
// //     flex: 1,
// //     backgroundColor: "#F5F7F5",
// //   },

// //   scrollContent: {
// //     padding: 20,
// //     paddingBottom: 50,
// //   },

// //   // ===================================================
// //   // TITLE
// //   // ===================================================

// //   heading: {
// //     fontSize: 28,
// //     fontWeight: "bold",
// //     color: "#1B5E20",
// //     marginTop: 20,
// //   },

// //   subtitle: {
// //     fontSize: 14,
// //     color: "#777",
// //     marginTop: 5,
// //     marginBottom: 20,
// //   },

// //   // ===================================================
// //   // MONITORING CARDS
// //   // ===================================================

// //   cardsContainer: {
// //     gap: 12,
// //   },

// //   monitorCard: {
// //     backgroundColor: "#FFFFFF",
// //     borderRadius: 16,
// //     padding: 18,
// //     borderWidth: 1,
// //     borderColor: "#D9E5D8",
// //     elevation: 3,
// //   },

// //   iconBox: {
// //     width: 50,
// //     height: 50,
// //     borderRadius: 14,
// //     backgroundColor: "#F5F7F5",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     marginBottom: 10,
// //   },

// //   cardLabel: {
// //     fontSize: 15,
// //     color: "#666",
// //   },

// //   cardValue: {
// //     fontSize: 30,
// //     fontWeight: "bold",
// //     color: "#222",
// //     marginTop: 3,
// //   },

// //   cardStatus: {
// //     color: "#2E7D32",
// //     fontSize: 13,
// //     fontWeight: "bold",
// //     marginTop: 4,
// //   },

// //   cardUnit: {
// //     fontSize: 13,
// //     color: "#777",
// //     marginTop: -3,
// //   },

// //   // ===================================================
// //   // SECTION
// //   // ===================================================

// //   sectionHeader: {
// //     marginTop: 28,
// //     marginBottom: 15,
// //   },

// //   sectionTitle: {
// //     fontSize: 22,
// //     fontWeight: "bold",
// //     color: "#222",
// //   },

// //   sectionSubtitle: {
// //     fontSize: 14,
// //     color: "#888",
// //     marginTop: 5,
// //   },

// //   // ===================================================
// //   // PERIOD
// //   // ===================================================

// //   periodContainer: {
// //     flexDirection: "row",
// //     backgroundColor: "#E8F5E9",
// //     borderRadius: 12,
// //     padding: 4,
// //     marginBottom: 20,
// //   },

// //   periodButton: {
// //     flex: 1,
// //     paddingVertical: 11,
// //     alignItems: "center",
// //     borderRadius: 9,
// //   },

// //   periodButtonActive: {
// //     backgroundColor: "#2E7D32",
// //   },

// //   periodText: {
// //     fontSize: 15,
// //     fontWeight: "600",
// //     color: "#2E7D32",
// //   },

// //   periodTextActive: {
// //     color: "#FFFFFF",
// //   },

// //   // ===================================================
// //   // CHART CARD
// //   // ===================================================

// //   chartCard: {
// //     backgroundColor: "#FFFFFF",
// //     borderRadius: 20,
// //     padding: 18,
// //     marginBottom: 20,
// //     borderWidth: 1,
// //     borderColor: "#D9E5D8",

// //     elevation: 4,

// //     shadowColor: "#000",
// //     shadowOffset: {
// //       width: 0,
// //       height: 2,
// //     },
// //     shadowOpacity: 0.08,
// //     shadowRadius: 5,
// //   },

// //   // ===================================================
// //   // CHART HEADER
// //   // ===================================================

// //   chartHeader: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: 8,
// //   },

// //   chartTitle: {
// //     fontSize: 21,
// //     fontWeight: "bold",
// //     color: "#1B5E20",
// //   },

// //   chartSubtitle: {
// //     fontSize: 14,
// //     color: "#888",
// //     marginTop: 5,
// //   },

// //   // ===================================================
// //   // SENSOR ICONS
// //   // ===================================================

// //   temperatureIcon: {
// //     width: 52,
// //     height: 52,
// //     borderRadius: 16,
// //     backgroundColor: "#FFEBEE",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },

// //   humidityIcon: {
// //     width: 52,
// //     height: 52,
// //     borderRadius: 16,
// //     backgroundColor: "#E3F2FD",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },

// //   gasIcon: {
// //     width: 52,
// //     height: 52,
// //     borderRadius: 16,
// //     backgroundColor: "#FFF3E0",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },

// //   // ===================================================
// //   // GRAPH
// //   // ===================================================

// //   graphWrapper: {
// //     marginTop: 10,
// //     width: "100%",
// //   },

// //   // ===================================================
// //   // X LABELS
// //   // ===================================================

// //   xLabels: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginTop: -5,
// //   },

// //   xLabel: {
// //     fontSize: 10,
// //     color: "#777",
// //     textAlign: "center",
// //   },

// //   // ===================================================
// //   // UNIT
// //   // ===================================================

// //   unitText: {
// //     textAlign: "right",
// //     fontSize: 11,
// //     color: "#999",
// //     marginTop: 8,
// //   },

// // });

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { StatusBar } from "expo-status-bar";
// import Svg, {
//   Line,
//   Polyline,
//   Circle,
//   Text as SvgText,
// } from "react-native-svg";

// const SCREEN_WIDTH = Dimensions.get("window").width;

// export default function Monitoring() {
//   const [period, setPeriod] = useState("Daily");

//   const data = {
//     Daily: {
//       temperature: [23, 24, 25, 24, 26, 25, 24],
//       humidity: [62, 64, 67, 65, 68, 66, 63],
//       gas: [280, 310, 295, 330, 350, 320, 300],
//       labels: [
//         "6 AM",
//         "9 AM",
//         "12 PM",
//         "3 PM",
//         "6 PM",
//         "9 PM",
//         "12 AM",
//       ],
//     },

//     Weekly: {
//       temperature: [23, 25, 24, 26, 25, 24, 27],
//       humidity: [62, 65, 64, 68, 66, 63, 69],
//       gas: [280, 320, 300, 350, 330, 310, 370],
//       labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//     },

//     Monthly: {
//       temperature: [23, 24, 25, 26, 24, 27, 25],
//       humidity: [61, 64, 66, 65, 68, 63, 67],
//       gas: [270, 290, 320, 350, 310, 380, 340],
//       labels: ["1", "5", "10", "15", "20", "25", "30"],
//     },
//   };

//   const currentData = data[period];

//   return (
//     <View style={styles.container}>
//       <StatusBar style="dark" />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* HEADER */}

//         <Text style={styles.title}>Monitoring History</Text>

//         <Text style={styles.subtitle}>
//           Environmental readings over time
//         </Text>

//         {/* PERIOD BUTTONS */}

//         <View style={styles.periodContainer}>
//           {["Daily", "Weekly", "Monthly"].map((item) => (
//             <TouchableOpacity
//               key={item}
//               style={[
//                 styles.periodButton,
//                 period === item && styles.periodButtonActive,
//               ]}
//               onPress={() => setPeriod(item)}
//             >
//               <Text
//                 style={[
//                   styles.periodText,
//                   period === item && styles.periodTextActive,
//                 ]}
//               >
//                 {item}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* TEMPERATURE */}

//         <View style={styles.chartCard}>
//           <View style={styles.chartHeader}>
//             <View>
//               <Text style={styles.chartTitle}>Temperature</Text>

//               <Text style={styles.chartSubtitle}>
//                 {period} temperature readings
//               </Text>
//             </View>

//             <View style={styles.temperatureIcon}>
//               <Ionicons
//                 name="thermometer-outline"
//                 size={27}
//                 color="#E53935"
//               />
//             </View>
//           </View>

//           <LineChart
//             values={currentData.temperature}
//             labels={currentData.labels}
//             unit="°C"
//           />
//         </View>

//         {/* HUMIDITY */}

//         <View style={styles.chartCard}>
//           <View style={styles.chartHeader}>
//             <View>
//               <Text style={styles.chartTitle}>Humidity</Text>

//               <Text style={styles.chartSubtitle}>
//                 {period} humidity readings
//               </Text>
//             </View>

//             <View style={styles.humidityIcon}>
//               <Ionicons
//                 name="water-outline"
//                 size={27}
//                 color="#1976D2"
//               />
//             </View>
//           </View>

//           <LineChart
//             values={currentData.humidity}
//             labels={currentData.labels}
//             unit="%"
//           />
//         </View>

//         {/* GAS */}

//         <View style={styles.chartCard}>
//           <View style={styles.chartHeader}>
//             <View>
//               <Text style={styles.chartTitle}>Gas Level</Text>

//               <Text style={styles.chartSubtitle}>
//                 {period} gas readings
//               </Text>
//             </View>

//             <View style={styles.gasIcon}>
//               <Ionicons
//                 name="flask-outline"
//                 size={27}
//                 color="#F57C00"
//               />
//             </View>
//           </View>

//           <LineChart
//             values={currentData.gas}
//             labels={currentData.labels}
//             unit="ppm"
//           />
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// // =====================================================
// // LINE CHART
// // =====================================================

// function LineChart({ values, labels, unit }) {
//   const chartWidth = SCREEN_WIDTH - 76;
//   const chartHeight = 220;

//   const leftPadding = 42;
//   const rightPadding = 10;
//   const topPadding = 15;
//   const bottomPadding = 25;

//   const graphWidth =
//     chartWidth - leftPadding - rightPadding;

//   const graphHeight =
//     chartHeight - topPadding - bottomPadding;

//   // MINIMUM AND MAXIMUM

//   const minValue = Math.min(...values);
//   const maxValue = Math.max(...values);

//   const range =
//     maxValue - minValue === 0
//       ? 1
//       : maxValue - minValue;

//   // Y VALUES

//   const yValues = [
//     maxValue,
//     Math.round(minValue + range * 0.66),
//     Math.round(minValue + range * 0.33),
//     minValue,
//   ];

//   // POINTS

//   const points = values.map((value, index) => {
//     const x =
//       leftPadding +
//       (index / (values.length - 1)) *
//         graphWidth;

//     const y =
//       topPadding +
//       graphHeight -
//       ((value - minValue) / range) *
//         graphHeight;

//     return {
//       x,
//       y,
//       value,
//     };
//   });

//   // LINE

//   const polylinePoints = points
//     .map((point) => `${point.x},${point.y}`)
//     .join(" ");

//   return (
//     <View style={styles.chartContainer}>
//       <Svg
//         width={chartWidth}
//         height={chartHeight}
//       >
//         {/* HORIZONTAL GRID LINES */}

//         {yValues.map((value, index) => {
//           const y =
//             topPadding +
//             (index / (yValues.length - 1)) *
//               graphHeight;

//           return (
//             <Line
//               key={`grid-${index}`}
//               x1={leftPadding}
//               y1={y}
//               x2={leftPadding + graphWidth}
//               y2={y}
//               stroke="#E5E7EB"
//               strokeWidth="1"
//             />
//           );
//         })}

//         {/* Y AXIS LABELS */}

//         {yValues.map((value, index) => {
//           const y =
//             topPadding +
//             (index / (yValues.length - 1)) *
//               graphHeight;

//           return (
//             <SvgText
//               key={`label-${index}`}
//               x={leftPadding - 8}
//               y={y + 4}
//               fontSize="10"
//               fill="#6B7280"
//               textAnchor="end"
//             >
//               {value}
//             </SvgText>
//           );
//         })}

//         {/* LINE */}

//         <Polyline
//           points={polylinePoints}
//           fill="none"
//           stroke="#2563EB"
//           strokeWidth="3"
//           strokeLinejoin="round"
//           strokeLinecap="round"
//         />

//         {/* DATA POINTS */}

//         {points.map((point, index) => (
//           <Circle
//             key={`point-${index}`}
//             cx={point.x}
//             cy={point.y}
//             r="4"
//             fill="#FFFFFF"
//             stroke="#2563EB"
//             strokeWidth="2"
//           />
//         ))}

//         {/* X AXIS LABELS */}

//         {labels.map((label, index) => {
//           const x =
//             leftPadding +
//             (index / (labels.length - 1)) *
//               graphWidth;

//           return (
//             <SvgText
//               key={`x-label-${index}`}
//               x={x}
//               y={chartHeight - 5}
//               fontSize="9"
//               fill="#6B7280"
//               textAnchor="middle"
//             >
//               {label}
//             </SvgText>
//           );
//         })}
//       </Svg>

//       {/* UNIT */}

//       <Text style={styles.unitText}>
//         Unit: {unit}
//       </Text>
//     </View>
//   );
// }

// // =====================================================
// // STYLES
// // =====================================================

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F7F9FC",
//   },

//   scrollContent: {
//     padding: 20,
//     paddingBottom: 40,
//   },

//   title: {
//     fontSize: 26,
//     fontWeight: "700",
//     color: "#111827",
//     marginTop: 10,
//   },

//   subtitle: {
//     fontSize: 14,
//     color: "#6B7280",
//     marginTop: 5,
//     marginBottom: 20,
//   },

//   periodContainer: {
//     flexDirection: "row",
//     backgroundColor: "#E9EEF5",
//     borderRadius: 12,
//     padding: 4,
//     marginBottom: 20,
//   },

//   periodButton: {
//     flex: 1,
//     paddingVertical: 11,
//     alignItems: "center",
//     borderRadius: 9,
//   },

//   periodButtonActive: {
//     backgroundColor: "#FFFFFF",
//   },

//   periodText: {
//     fontSize: 13,
//     fontWeight: "600",
//     color: "#6B7280",
//   },

//   periodTextActive: {
//     color: "#111827",
//   },

//   chartCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 18,
//     padding: 16,
//     marginBottom: 18,

//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     shadowOpacity: 0.08,
//     shadowRadius: 8,

//     elevation: 3,
//   },

//   chartHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },

//   chartTitle: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#111827",
//   },

//   chartSubtitle: {
//     fontSize: 12,
//     color: "#6B7280",
//     marginTop: 4,
//   },

//   temperatureIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     backgroundColor: "#FDECEC",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   humidityIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     backgroundColor: "#E8F1FC",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   gasIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     backgroundColor: "#FFF3E5",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   chartContainer: {
//     marginTop: 5,
//     alignItems: "center",
//   },

//   unitText: {
//     alignSelf: "flex-end",
//     fontSize: 10,
//     color: "#9CA3AF",
//     marginTop: -5,
//     marginRight: 5,
//   },
// });







import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, {
  Circle,
  Line,
  Polyline,
  Text as SvgText,
} from "react-native-svg";

const SCREEN_WIDTH = Dimensions.get("window").width;

// =====================================================
// BACKEND
// =====================================================

const API_URL = "http://10.147.4.54:5000/api/sensor";

// =====================================================
// SENSOR THRESHOLDS
// =====================================================

const TEMP_LOW = 18;
const TEMP_HIGH = 30;

const HUM_LOW = 40;
const HUM_HIGH = 70;

const GAS_HIGH = 600;

// =====================================================
// ANALYTICS
// =====================================================

export default function Analytics() {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Selected date
  const [selectedDate, setSelectedDate] = useState(
    new Date()
  );

  // Calendar month currently displayed
  const [calendarMonth, setCalendarMonth] = useState(
    new Date()
  );

  const [calendarVisible, setCalendarVisible] =
    useState(false);

  // =====================================================
  // FETCH REAL SENSOR DATA
  // =====================================================

  const fetchSensorData = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}`
        );
      }

      const result = await response.json();

      console.log(
        "ANALYTICS API RESPONSE:",
        result
      );

      let records = [];

      // Supports:
      // [ ... ]
      // { data: [...] }
      // { sensors: [...] }

      if (Array.isArray(result)) {
        records = result;
      } else if (Array.isArray(result.data)) {
        records = result.data;
      } else if (Array.isArray(result.sensors)) {
        records = result.sensors;
      }

      setSensorData(records);
    } catch (error) {
      console.log(
        "ANALYTICS FETCH ERROR:",
        error
      );

      setSensorData([]);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LIVE REFRESH
  // =====================================================

  useEffect(() => {
    fetchSensorData();

    const interval = setInterval(() => {
      fetchSensorData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // =====================================================
  // GET TIMESTAMP FROM SENSOR RECORD
  // =====================================================

  const getRecordDate = (item) => {
    const timestamp =
      item.created_at ||
      item.timestamp ||
      item.recorded_at ||
      item.createdAt ||
      item.date ||
      item.datetime ||
      item.time;

    if (!timestamp) {
      return null;
    }

    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
      return null;
    }

    return date;
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // =====================================================
  // SELECTED DATE SENSOR DATA
  // =====================================================

  const selectedDateData = useMemo(() => {
    return sensorData.filter((item) => {
      const recordDate = getRecordDate(item);

      if (!recordDate) {
        return false;
      }

      return (
        recordDate.getFullYear() ===
          selectedDate.getFullYear() &&
        recordDate.getMonth() ===
          selectedDate.getMonth() &&
        recordDate.getDate() ===
          selectedDate.getDate()
      );
    });
  }, [sensorData, selectedDate]);

  // =====================================================
  // NUMERIC VALUES
  // =====================================================

  const temperatures = selectedDateData
    .map((item) => Number(item.temperature))
    .filter((value) => !isNaN(value));

  const humidities = selectedDateData
    .map((item) => Number(item.humidity))
    .filter((value) => !isNaN(value));

  const gases = selectedDateData
    .map((item) => Number(item.gas_value))
    .filter((value) => !isNaN(value));

  // =====================================================
  // CALCULATION
  // =====================================================

  const calculateAverage = (values) => {
    if (!values.length) {
      return 0;
    }

    return (
      values.reduce(
        (total, value) => total + value,
        0
      ) / values.length
    );
  };

  const temperatureAverage =
    calculateAverage(temperatures);

  const humidityAverage =
    calculateAverage(humidities);

  const gasAverage =
    calculateAverage(gases);

  const temperatureMin = temperatures.length
    ? Math.min(...temperatures)
    : 0;

  const temperatureMax = temperatures.length
    ? Math.max(...temperatures)
    : 0;

  const humidityMin = humidities.length
    ? Math.min(...humidities)
    : 0;

  const humidityMax = humidities.length
    ? Math.max(...humidities)
    : 0;

  const gasMin = gases.length
    ? Math.min(...gases)
    : 0;

  const gasMax = gases.length
    ? Math.max(...gases)
    : 0;

  // =====================================================
  // SENSOR STATUS
  // =====================================================

  const temperatureWarning =
    temperatureAverage < TEMP_LOW ||
    temperatureAverage > TEMP_HIGH;

  const humidityWarning =
    humidityAverage < HUM_LOW ||
    humidityAverage > HUM_HIGH;

  const gasWarning =
    gasAverage > GAS_HIGH;

  // =====================================================
  // HEALTH ANALYSIS
  // =====================================================

  let healthStatus = "No Data";
  let healthScore = 0;

  if (selectedDateData.length > 0) {
    const warnings =
      Number(temperatureWarning) +
      Number(humidityWarning) +
      Number(gasWarning);

    if (warnings === 0) {
      healthStatus = "Healthy";
      healthScore = 100;
    } else if (warnings === 1) {
      healthStatus = "Warning";
      healthScore = 70;
    } else {
      healthStatus = "Critical";
      healthScore = 40;
    }
  }

  // =====================================================
  // CHART DATA
  // =====================================================

  const chartData = [...selectedDateData]
    .sort((a, b) => {
      const dateA = getRecordDate(a);
      const dateB = getRecordDate(b);

      if (!dateA || !dateB) {
        return 0;
      }

      return dateA - dateB;
    })
    .slice(-12);

  const chartLabels = chartData.map((item) => {
    const date = getRecordDate(item);

    if (!date) {
      return "--";
    }

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  });

  const chartTemperature = chartData
    .map((item) => Number(item.temperature))
    .filter((value) => !isNaN(value));

  const chartHumidity = chartData
    .map((item) => Number(item.humidity))
    .filter((value) => !isNaN(value));

  const chartGas = chartData
    .map((item) => Number(item.gas_value))
    .filter((value) => !isNaN(value));

  // =====================================================
  // ROOM ANALYSIS
  // =====================================================

  const roomAnalysis = useMemo(() => {
    const roomMap = {};

    selectedDateData.forEach((item) => {
      const roomId = item.room_id;

      if (
        roomId === undefined ||
        roomId === null
      ) {
        return;
      }

      if (!roomMap[roomId]) {
        roomMap[roomId] = [];
      }

      roomMap[roomId].push(item);
    });

    return Object.keys(roomMap)
      .map((roomId) => {
        const records = roomMap[roomId];

        const temps = records
          .map((item) =>
            Number(item.temperature)
          )
          .filter((v) => !isNaN(v));

        const hums = records
          .map((item) =>
            Number(item.humidity)
          )
          .filter((v) => !isNaN(v));

        const gas = records
          .map((item) =>
            Number(item.gas_value)
          )
          .filter((v) => !isNaN(v));

        const avgTemp =
          calculateAverage(temps);

        const avgHum =
          calculateAverage(hums);

        const avgGas =
          calculateAverage(gas);

        const warning =
          avgTemp < TEMP_LOW ||
          avgTemp > TEMP_HIGH ||
          avgHum < HUM_LOW ||
          avgHum > HUM_HIGH ||
          avgGas > GAS_HIGH;

        return {
          roomId,
          temperature: avgTemp,
          humidity: avgHum,
          gas: avgGas,
          status: warning
            ? "Warning"
            : "Healthy",
        };
      })
      .sort(
        (a, b) =>
          Number(a.roomId) -
          Number(b.roomId)
      );
  }, [selectedDateData]);

  // =====================================================
  // CALENDAR
  // =====================================================

  const calendarDays =
    getCalendarDays(calendarMonth);

  const changeMonth = (amount) => {
    setCalendarMonth(
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth() + amount,
        1
      )
    );
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setCalendarVisible(false);
  };

  const goToToday = () => {
    const today = new Date();

    setSelectedDate(today);
    setCalendarMonth(today);
    setCalendarVisible(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <Text style={styles.title}>
          Analytics
        </Text>

        <Text style={styles.subtitle}>
          Storage environment analysis
        </Text>

        {/* =================================================
            CALENDAR BUTTON
        ================================================= */}

        <TouchableOpacity
          style={styles.dateSelector}
          onPress={() =>
            setCalendarVisible(
              !calendarVisible
            )
          }
        >
          <View style={styles.calendarIcon}>
            <Ionicons
              name="calendar-outline"
              size={25}
              color="#2E7D32"
            />
          </View>

          <View style={styles.dateInfo}>
            <Text style={styles.dateSmall}>
              Analyze Date
            </Text>

            <Text style={styles.dateText}>
              {formatDate(selectedDate)}
            </Text>
          </View>

          <Ionicons
            name={
              calendarVisible
                ? "chevron-up"
                : "chevron-down"
            }
            size={22}
            color="#555"
          />
        </TouchableOpacity>

        {/* =================================================
            CALENDAR
        ================================================= */}

        {calendarVisible && (
          <Calendar
            month={calendarMonth}
            selectedDate={selectedDate}
            days={calendarDays}
            onPrevious={() =>
              changeMonth(-1)
            }
            onNext={() =>
              changeMonth(1)
            }
            onSelect={handleDateSelect}
            onToday={goToToday}
          />
        )}

        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (
          <View style={styles.loadingCard}>
            <ActivityIndicator
              size="large"
              color="#2E7D32"
            />

            <Text style={styles.loadingText}>
              Loading real sensor data...
            </Text>
          </View>
        ) : selectedDateData.length ===
          0 ? (
          <View style={styles.noDataCard}>
            <Ionicons
              name="analytics-outline"
              size={48}
              color="#9CA3AF"
            />

            <Text style={styles.noDataTitle}>
              No Data for Selected Date
            </Text>

            <Text style={styles.noDataText}>
              No sensor readings were found
              for {formatDate(selectedDate)}.
            </Text>

            <TouchableOpacity
              style={styles.todayButton}
              onPress={goToToday}
            >
              <Text style={styles.todayButtonText}>
                View Today
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* =================================================
                DATA COUNT
            ================================================= */}

            <View style={styles.dataInfoCard}>
              <View>
                <Text style={styles.dataInfoTitle}>
                  Analysis for
                </Text>

                <Text style={styles.dataInfoDate}>
                  {formatDate(selectedDate)}
                </Text>
              </View>

              <View style={styles.readingBadge}>
                <Text style={styles.readingNumber}>
                  {selectedDateData.length}
                </Text>

                <Text style={styles.readingLabel}>
                  readings
                </Text>
              </View>
            </View>

            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <View style={styles.summaryGrid}>
              <SummaryCard
                icon="thermometer-outline"
                iconColor="#E53935"
                iconBackground="#FDECEC"
                label="Avg. Temperature"
                value={`${temperatureAverage.toFixed(
                  1
                )}°C`}
                status={
                  temperatureWarning
                    ? "● Warning"
                    : "● Normal"
                }
                warning={temperatureWarning}
              />

              <SummaryCard
                icon="water-outline"
                iconColor="#1976D2"
                iconBackground="#EAF3FF"
                label="Avg. Humidity"
                value={`${humidityAverage.toFixed(
                  1
                )}%`}
                status={
                  humidityWarning
                    ? "● Warning"
                    : "● Normal"
                }
                warning={humidityWarning}
              />

              <SummaryCard
                icon="flask-outline"
                iconColor="#F57C00"
                iconBackground="#FFF3E5"
                label="Avg. Gas Level"
                value={`${gasAverage.toFixed(
                  0
                )}`}
                status={
                  gasWarning
                    ? "● High"
                    : "● Safe"
                }
                warning={gasWarning}
              />

              <SummaryCard
                icon="pulse-outline"
                iconColor="#2E7D32"
                iconBackground="#EAF6EC"
                label="Total Readings"
                value={selectedDateData.length}
                status="● Recorded"
              />
            </View>

            {/* =================================================
                STORAGE HEALTH
            ================================================= */}

            <View style={styles.statusCard}>
              <View style={styles.statusTop}>
                <View>
                  <Text style={styles.sectionTitle}>
                    Storage Health
                  </Text>

                  <Text style={styles.sectionSubtitle}>
                    Environmental condition for
                    selected date
                  </Text>
                </View>

                <View
                  style={[
                    styles.healthBadge,
                    healthStatus ===
                      "Warning" &&
                      styles.warningBadge,
                    healthStatus ===
                      "Critical" &&
                      styles.criticalBadge,
                  ]}
                >
                  <Ionicons
                    name={
                      healthStatus ===
                      "Healthy"
                        ? "checkmark-circle"
                        : "alert-circle"
                    }
                    size={18}
                    color={
                      healthStatus ===
                      "Healthy"
                        ? "#2E7D32"
                        : "#D32F2F"
                    }
                  />

                  <Text
                    style={[
                      styles.healthText,
                      healthStatus !==
                        "Healthy" &&
                        styles.warningText,
                    ]}
                  >
                    {healthStatus}
                  </Text>
                </View>
              </View>

              <View
                style={styles.progressBackground}
              >
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${healthScore}%`,
                    },
                  ]}
                />
              </View>

              <View
                style={styles.progressBottom}
              >
                <Text
                  style={styles.progressLabel}
                >
                  Overall Score
                </Text>

                <Text
                  style={styles.progressValue}
                >
                  {healthScore}%
                </Text>
              </View>
            </View>

            {/* =================================================
                TEMPERATURE
            ================================================= */}

            <AnalysisChart
              title="Temperature Analysis"
              subtitle={`${formatDate(
                selectedDate
              )} temperature readings`}
              icon="thermometer-outline"
              iconColor="#E53935"
              values={chartTemperature}
              labels={chartLabels}
              unit="°C"
              min={temperatureMin}
              max={temperatureMax}
              warning={temperatureWarning}
              insight={
                temperatureWarning
                  ? `Temperature went outside the recommended ${TEMP_LOW}°C–${TEMP_HIGH}°C range.`
                  : "Temperature remained within the recommended storage range."
              }
            />

            {/* =================================================
                HUMIDITY
            ================================================= */}

            <AnalysisChart
              title="Humidity Analysis"
              subtitle={`${formatDate(
                selectedDate
              )} humidity readings`}
              icon="water-outline"
              iconColor="#1976D2"
              values={chartHumidity}
              labels={chartLabels}
              unit="%"
              min={humidityMin}
              max={humidityMax}
              warning={humidityWarning}
              insight={
                humidityWarning
                  ? `Humidity went outside the recommended ${HUM_LOW}%–${HUM_HIGH}% range.`
                  : "Humidity remained within the recommended storage range."
              }
            />

            {/* =================================================
                GAS
            ================================================= */}

            <AnalysisChart
              title="Gas Level Analysis"
              subtitle={`${formatDate(
                selectedDate
              )} gas readings`}
              icon="flask-outline"
              iconColor="#F57C00"
              values={chartGas}
              labels={chartLabels}
              unit="MQ-135"
              min={gasMin}
              max={gasMax}
              warning={gasWarning}
              insight={
                gasWarning
                  ? `Gas level exceeded the critical threshold of ${GAS_HIGH}.`
                  : "Gas level remained below the critical threshold."
              }
            />

            {/* =================================================
                ROOM ANALYSIS
            ================================================= */}

            <View style={styles.roomCard}>
              <View
                style={styles.roomHeader}
              >
                <View>
                  <Text
                    style={styles.sectionTitle}
                  >
                    Room Analysis
                  </Text>

                  <Text
                    style={styles.sectionSubtitle}
                  >
                    Real room sensor analysis
                  </Text>
                </View>

                <Ionicons
                  name="business-outline"
                  size={25}
                  color="#374151"
                />
              </View>

              {roomAnalysis.length ===
              0 ? (
                <Text
                  style={styles.emptyText}
                >
                  No room information found
                  for this date.
                </Text>
              ) : (
                roomAnalysis.map(
                  (room) => (
                    <RoomRow
                      key={room.roomId}
                      roomId={
                        room.roomId
                      }
                      temperature={
                        room.temperature
                      }
                      humidity={
                        room.humidity
                      }
                      gas={room.gas}
                      status={
                        room.status
                      }
                    />
                  )
                )
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

// =====================================================
// CALENDAR
// =====================================================

function Calendar({
  month,
  selectedDate,
  days,
  onPrevious,
  onNext,
  onSelect,
  onToday,
}) {
  const monthTitle =
    month.toLocaleDateString(
      "en-IN",
      {
        month: "long",
        year: "numeric",
      }
    );

  return (
    <View style={styles.calendarCard}>
      {/* HEADER */}

      <View
        style={styles.calendarHeader}
      >
        <TouchableOpacity
          style={styles.monthButton}
          onPress={onPrevious}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color="#374151"
          />
        </TouchableOpacity>

        <Text
          style={styles.monthTitle}
        >
          {monthTitle}
        </Text>

        <TouchableOpacity
          style={styles.monthButton}
          onPress={onNext}
        >
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#374151"
          />
        </TouchableOpacity>
      </View>

      {/* TODAY */}

      <TouchableOpacity
        style={styles.todaySmallButton}
        onPress={onToday}
      >
        <Ionicons
          name="today-outline"
          size={16}
          color="#2E7D32"
        />

        <Text
          style={styles.todaySmallText}
        >
          Today
        </Text>
      </TouchableOpacity>

      {/* WEEK DAYS */}

      <View
        style={styles.weekHeader}
      >
        {[
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ].map((day) => (
          <Text
            key={day}
            style={styles.weekText}
          >
            {day}
          </Text>
        ))}
      </View>

      {/* DATES */}

      <View
        style={styles.calendarGrid}
      >
        {days.map(
          (date, index) => {
            if (!date) {
              return (
                <View
                  key={`empty-${index}`}
                  style={styles.calendarDay}
                />
              );
            }

            const selected =
              isSameDate(
                date,
                selectedDate
              );

            const today =
              isSameDate(
                date,
                new Date()
              );

            return (
              <TouchableOpacity
                key={date.toISOString()}
                style={[
                  styles.calendarDay,
                  selected &&
                    styles.selectedDay,
                ]}
                onPress={() =>
                  onSelect(date)
                }
              >
                <Text
                  style={[
                    styles.dayText,
                    selected &&
                      styles.selectedDayText,
                    today &&
                      !selected &&
                      styles.todayText,
                  ]}
                >
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          }
        )}
      </View>
    </View>
  );
}

// =====================================================
// GET CALENDAR DAYS
// =====================================================

function getCalendarDays(date) {
  const year =
    date.getFullYear();

  const month =
    date.getMonth();

  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay();

  const totalDays =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  const days = [];

  for (
    let i = 0;
    i < firstDay;
    i++
  ) {
    days.push(null);
  }

  for (
    let day = 1;
    day <= totalDays;
    day++
  ) {
    days.push(
      new Date(
        year,
        month,
        day
      )
    );
  }

  return days;
}

// =====================================================
// SAME DATE
// =====================================================

function isSameDate(
  first,
  second
) {
  return (
    first.getFullYear() ===
      second.getFullYear() &&
    first.getMonth() ===
      second.getMonth() &&
    first.getDate() ===
      second.getDate()
  );
}

// =====================================================
// SUMMARY CARD
// =====================================================

function SummaryCard({
  icon,
  iconColor,
  iconBackground,
  label,
  value,
  status,
  warning = false,
}) {
  return (
    <View
      style={styles.summaryCard}
    >
      <View
        style={[
          styles.summaryIcon,
          {
            backgroundColor:
              iconBackground,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={iconColor}
        />
      </View>

      <Text
        style={styles.summaryLabel}
      >
        {label}
      </Text>

      <Text
        style={styles.summaryValue}
      >
        {value}
      </Text>

      <Text
        style={[
          styles.goodText,
          warning &&
            styles.warningText,
        ]}
      >
        {status}
      </Text>
    </View>
  );
}

// =====================================================
// ANALYSIS CHART
// =====================================================

function AnalysisChart({
  title,
  subtitle,
  icon,
  iconColor,
  values,
  labels,
  unit,
  min,
  max,
  warning,
  insight,
}) {
  return (
    <View
      style={styles.chartCard}
    >
      <View
        style={styles.chartHeader}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={styles.chartTitle}
          >
            {title}
          </Text>

          <Text
            style={styles.chartSubtitle}
          >
            {subtitle}
          </Text>
        </View>

        <View
          style={[
            styles.chartIcon,
            {
              backgroundColor:
                warning
                  ? "#FDECEC"
                  : "#F5F6F8",
            },
          ]}
        >
          <Ionicons
            name={icon}
            size={25}
            color={iconColor}
          />
        </View>
      </View>

      {values.length > 0 ? (
        <>
          <LineChart
            values={values}
            labels={labels}
          />

          <View
            style={styles.minMaxRow}
          >
            <View>
              <Text
                style={
                  styles.minMaxLabel
                }
              >
                Minimum
              </Text>

              <Text
                style={
                  styles.minMaxValue
                }
              >
                {min.toFixed(1)}{" "}
                {unit}
              </Text>
            </View>

            <View
              style={{
                alignItems:
                  "flex-end",
              }}
            >
              <Text
                style={
                  styles.minMaxLabel
                }
              >
                Maximum
              </Text>

              <Text
                style={
                  styles.minMaxValue
                }
              >
                {max.toFixed(1)}{" "}
                {unit}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <Text
          style={styles.noChartText}
        >
          No chart data available.
        </Text>
      )}

      <View
        style={[
          styles.insightBox,
          warning &&
            styles.warningInsight,
        ]}
      >
        <Ionicons
          name={
            warning
              ? "alert-circle-outline"
              : "checkmark-circle-outline"
          }
          size={20}
          color={
            warning
              ? "#D32F2F"
              : "#2E7D32"
          }
        />

        <Text
          style={styles.insightText}
        >
          {insight}
        </Text>
      </View>
    </View>
  );
}

// =====================================================
// LINE CHART
// =====================================================

function LineChart({
  values,
  labels,
}) {
  if (
    !values ||
    values.length === 0
  ) {
    return null;
  }

  const chartWidth =
    Math.max(
      SCREEN_WIDTH - 72,
      280
    );

  const chartHeight = 220;

  const left = 42;
  const right = 10;
  const top = 15;
  const bottom = 32;

  const graphWidth =
    chartWidth -
    left -
    right;

  const graphHeight =
    chartHeight -
    top -
    bottom;

  const minValue =
    Math.min(...values);

  const maxValue =
    Math.max(...values);

  const range =
    maxValue - minValue === 0
      ? 1
      : maxValue - minValue;

  const points = values.map(
    (value, index) => {
      const x =
        values.length === 1
          ? left +
            graphWidth / 2
          : left +
            (index /
              (values.length - 1)) *
              graphWidth;

      const y =
        top +
        graphHeight -
        ((value - minValue) /
          range) *
          graphHeight;

      return {
        x,
        y,
        value,
      };
    }
  );

  const polyline =
    points
      .map(
        (point) =>
          `${point.x},${point.y}`
      )
      .join(" ");

  const gridValues = [
    maxValue,
    minValue +
      range * 0.66,
    minValue +
      range * 0.33,
    minValue,
  ];

  return (
    <View
      style={styles.graphContainer}
    >
      <Svg
        width={chartWidth}
        height={chartHeight}
      >
        {/* GRID */}

        {gridValues.map(
          (value, index) => {
            const y =
              top +
              (index / 3) *
                graphHeight;

            return (
              <Line
                key={`grid-${index}`}
                x1={left}
                y1={y}
                x2={
                  chartWidth -
                  right
                }
                y2={y}
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            );
          }
        )}

        {/* Y AXIS VALUES */}

        {gridValues.map(
          (value, index) => {
            const y =
              top +
              (index / 3) *
                graphHeight;

            return (
              <SvgText
                key={`y-${index}`}
                x="3"
                y={y + 4}
                fontSize="10"
                fill="#6B7280"
              >
                {Number(
                  value
                ).toFixed(0)}
              </SvgText>
            );
          }
        )}

        {/* LINE */}

        <Polyline
          points={polyline}
          fill="none"
          stroke="#2E7D32"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* POINTS */}

        {points.map(
          (point, index) => (
            <Circle
              key={`point-${index}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#FFFFFF"
              stroke="#2E7D32"
              strokeWidth="2"
            />
          )
        )}

        {/* X LABELS */}

        {labels.map(
          (label, index) => {
            const x =
              labels.length === 1
                ? left +
                  graphWidth / 2
                : left +
                  (index /
                    (labels.length -
                      1)) *
                    graphWidth;

            return (
              <SvgText
                key={`label-${index}`}
                x={x}
                y={
                  chartHeight -
                  8
                }
                fontSize="9"
                fill="#6B7280"
                textAnchor="middle"
              >
                {label}
              </SvgText>
            );
          }
        )}
      </Svg>
    </View>
  );
}

// =====================================================
// ROOM ROW
// =====================================================

function RoomRow({
  roomId,
  temperature,
  humidity,
  gas,
  status,
}) {
  const warning =
    status !== "Healthy";

  return (
    <View
      style={styles.roomRow}
    >
      <View
        style={styles.roomTop}
      >
        <View
          style={styles.roomNameBox}
        >
          <Ionicons
            name="cube-outline"
            size={21}
            color="#374151"
          />

          <Text
            style={styles.roomName}
          >
            Room{" "}
            {String(roomId).padStart(
              2,
              "0"
            )}
          </Text>
        </View>

        <View
          style={[
            styles.roomStatusBadge,
            warning &&
              styles.roomWarningBadge,
          ]}
        >
          <View
            style={[
              styles.statusDot,
              warning &&
                styles.warningDot,
            ]}
          />

          <Text
            style={[
              styles.roomStatusText,
              warning &&
                styles.warningText,
            ]}
          >
            {status}
          </Text>
        </View>
      </View>

      <View
        style={styles.roomMetrics}
      >
        <View>
          <Text
            style={styles.metricLabel}
          >
            Temperature
          </Text>

          <Text
            style={styles.metricValue}
          >
            {temperature.toFixed(
              1
            )}°C
          </Text>
        </View>

        <View>
          <Text
            style={styles.metricLabel}
          >
            Humidity
          </Text>

          <Text
            style={styles.metricValue}
          >
            {humidity.toFixed(1)}%
          </Text>
        </View>

        <View>
          <Text
            style={styles.metricLabel}
          >
            Gas
          </Text>

          <Text
            style={styles.metricValue}
          >
            {gas.toFixed(0)}
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
    padding: 18,
    paddingBottom: 45,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginTop: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 5,
    marginBottom: 18,
  },

  // =====================================================
  // DATE SELECTOR
  // =====================================================

  dateSelector: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    marginBottom: 12,
  },

  calendarIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "#EAF6EC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  dateInfo: {
    flex: 1,
  },

  dateSmall: {
    fontSize: 11,
    color: "#6B7280",
  },

  dateText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 3,
  },

  // =====================================================
  // CALENDAR
  // =====================================================

  calendarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },

  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  monthTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  monthButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#F4F5F6",
    justifyContent: "center",
    alignItems: "center",
  },

  todaySmallButton: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#EAF6EC",
  },

  todaySmallText: {
    color: "#2E7D32",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 5,
  },

  weekHeader: {
    flexDirection: "row",
    marginBottom: 5,
  },

  weekText: {
    width: "14.285%",
    textAlign: "center",
    fontSize: 11,
    fontWeight: "700",
    color: "#6B7280",
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  calendarDay: {
    width: "14.285%",
    height: 43,
    justifyContent: "center",
    alignItems: "center",
  },

  selectedDay: {
    backgroundColor: "#2E7D32",
    borderRadius: 12,
  },

  dayText: {
    fontSize: 13,
    color: "#374151",
  },

  selectedDayText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  todayText: {
    color: "#2E7D32",
    fontWeight: "800",
  },

  // =====================================================
  // LOADING
  // =====================================================

  loadingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 35,
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#6B7280",
    fontSize: 13,
  },

  // =====================================================
  // NO DATA
  // =====================================================

  noDataCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 35,
    alignItems: "center",
    marginTop: 5,
  },

  noDataTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#374151",
    marginTop: 12,
  },

  noDataText: {
    textAlign: "center",
    fontSize: 12,
    color: "#6B7280",
    marginTop: 7,
    lineHeight: 18,
  },

  todayButton: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 16,
  },

  todayButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },

  // =====================================================
  // DATA INFO
  // =====================================================

  dataInfoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dataInfoTitle: {
    fontSize: 11,
    color: "#6B7280",
  },

  dataInfoDate: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginTop: 3,
  },

  readingBadge: {
    backgroundColor: "#EAF6EC",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
  },

  readingNumber: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2E7D32",
  },

  readingLabel: {
    fontSize: 9,
    color: "#2E7D32",
  },

  // =====================================================
  // SUMMARY
  // =====================================================

  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  summaryCard: {
    width: "48.5%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  summaryIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 11,
  },

  summaryLabel: {
    fontSize: 11,
    color: "#6B7280",
  },

  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginTop: 4,
  },

  goodText: {
    color: "#2E7D32",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 6,
  },

  warningText: {
    color: "#D32F2F",
  },

  // =====================================================
  // STORAGE HEALTH
  // =====================================================

  statusCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  statusTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  sectionSubtitle: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 4,
  },

  healthBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF6EC",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
  },

  warningBadge: {
    backgroundColor: "#FFF3E5",
  },

  criticalBadge: {
    backgroundColor: "#FDECEC",
  },

  healthText: {
    color: "#2E7D32",
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 4,
  },

  progressBackground: {
    height: 9,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginTop: 18,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#2E7D32",
    borderRadius: 10,
  },

  progressBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  progressLabel: {
    fontSize: 11,
    color: "#6B7280",
  },

  progressValue: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2E7D32",
  },

  // =====================================================
  // CHART
  // =====================================================

  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 17,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  chartHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  chartTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  chartSubtitle: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 4,
  },

  chartIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  graphContainer: {
    alignItems: "center",
    marginTop: 5,
  },

  minMaxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#F0F1F3",
    paddingTop: 10,
    marginTop: 5,
  },

  minMaxLabel: {
    fontSize: 10,
    color: "#9CA3AF",
  },

  minMaxValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    marginTop: 2,
  },

  noChartText: {
    textAlign: "center",
    color: "#9CA3AF",
    paddingVertical: 30,
    fontSize: 12,
  },

  insightBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F8F1",
    borderRadius: 11,
    padding: 11,
    marginTop: 12,
  },

  warningInsight: {
    backgroundColor: "#FFF4F4",
  },

  insightText: {
    flex: 1,
    fontSize: 11,
    color: "#4B5563",
    lineHeight: 17,
    marginLeft: 8,
  },

  // =====================================================
  // ROOM
  // =====================================================

  roomCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  roomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  roomRow: {
    borderTopWidth: 1,
    borderTopColor: "#F0F1F3",
    paddingVertical: 14,
  },

  roomTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  roomNameBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  roomName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginLeft: 7,
  },

  roomStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF6EC",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 15,
  },

  roomWarningBadge: {
    backgroundColor: "#FDECEC",
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: "#2E7D32",
    marginRight: 5,
  },

  warningDot: {
    backgroundColor: "#D32F2F",
  },

  roomStatusText: {
    fontSize: 10,
    color: "#2E7D32",
    fontWeight: "700",
  },

  roomMetrics: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingLeft: 2,
  },

  metricLabel: {
    fontSize: 9,
    color: "#9CA3AF",
  },

  metricValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    marginTop: 3,
  },

  emptyText: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 8,
  },
});

