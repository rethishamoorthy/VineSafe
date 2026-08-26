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
// // //       labels: ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM", "12 AM"],
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
// // //     currentData.temperature[currentData.temperature.length - 1];

// // //   const currentHumidity =
// // //     currentData.humidity[currentData.humidity.length - 1];

// // //   const currentGas =
// // //     currentData.gas[currentData.gas.length - 1];

// // //   return (
// // //     <View style={styles.container}>
// // //       <StatusBar style="dark" />

// // //       <ScrollView
// // //         showsVerticalScrollIndicator={false}
// // //         contentContainerStyle={styles.scrollContent}
// // //       >
// // //         {/* =================================================
// // //             TITLE
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
// // //             <View style={styles.iconBox}>
// // //               <Ionicons
// // //                 name="thermometer-outline"
// // //                 size={28}
// // //                 color="#E53935"
// // //               />
// // //             </View>

// // //             <Text style={styles.cardLabel}>
// // //               Temperature
// // //             </Text>

// // //             <Text style={styles.cardValue}>
// // //               {currentTemperature}°C
// // //             </Text>

// // //             <Text style={styles.cardStatus}>
// // //               Normal
// // //             </Text>
// // //           </View>

// // //           {/* HUMIDITY */}

// // //           <View style={styles.monitorCard}>
// // //             <View style={styles.iconBox}>
// // //               <Ionicons
// // //                 name="water-outline"
// // //                 size={28}
// // //                 color="#1976D2"
// // //               />
// // //             </View>

// // //             <Text style={styles.cardLabel}>
// // //               Humidity
// // //             </Text>

// // //             <Text style={styles.cardValue}>
// // //               {currentHumidity}%
// // //             </Text>

// // //             <Text style={styles.cardStatus}>
// // //               Normal
// // //             </Text>
// // //           </View>

// // //           {/* GAS */}

// // //           <View style={styles.monitorCard}>
// // //             <View style={styles.iconBox}>
// // //               <Ionicons
// // //                 name="flask-outline"
// // //                 size={28}
// // //                 color="#F57C00"
// // //               />
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
// // //             PERIOD SELECTOR
// // //         ================================================= */}

// // //         <View style={styles.sectionHeader}>
// // //           <Text style={styles.sectionTitle}>
// // //             Monitoring History
// // //           </Text>
// // //         </View>

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
// // //                 onPress={() => setPeriod(item)}
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
// // //             TEMPERATURE SCATTER PLOT
// // //         ================================================= */}

// // //         <View style={styles.chartCard}>

// // //           <Text style={styles.chartTitle}>
// // //             Temperature
// // //           </Text>

// // //           <Text style={styles.chartSubtitle}>
// // //             {period} temperature readings
// // //           </Text>

// // //           <ScatterPlot
// // //             values={currentData.temperature}
// // //             labels={currentData.labels}
// // //             unit="°C"
// // //           />

// // //         </View>

// // //         {/* =================================================
// // //             HUMIDITY SCATTER PLOT
// // //         ================================================= */}

// // //         <View style={styles.chartCard}>

// // //           <Text style={styles.chartTitle}>
// // //             Humidity
// // //           </Text>

// // //           <Text style={styles.chartSubtitle}>
// // //             {period} humidity readings
// // //           </Text>

// // //           <ScatterPlot
// // //             values={currentData.humidity}
// // //             labels={currentData.labels}
// // //             unit="%"
// // //           />

// // //         </View>

// // //         {/* =================================================
// // //             GAS SCATTER PLOT
// // //         ================================================= */}

// // //         <View style={styles.chartCard}>

// // //           <Text style={styles.chartTitle}>
// // //             Gas Level
// // //           </Text>

// // //           <Text style={styles.chartSubtitle}>
// // //             {period} gas readings
// // //           </Text>

// // //           <ScatterPlot
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
// // // // SIMPLE SCATTER PLOT
// // // // =====================================================

// // // function ScatterPlot({
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

// // //   return (
// // //     <View style={styles.plotContainer}>

// // //       {/* Y AXIS */}

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

// // //       {/* PLOT */}

// // //       <View style={styles.plot}>

// // //         {/* GRID */}

// // //         <View
// // //           style={[
// // //             styles.gridLine,
// // //             { top: "0%" },
// // //           ]}
// // //         />

// // //         <View
// // //           style={[
// // //             styles.gridLine,
// // //             { top: "50%" },
// // //           ]}
// // //         />

// // //         <View
// // //           style={[
// // //             styles.gridLine,
// // //             { top: "100%" },
// // //           ]}
// // //         />

// // //         {/* POINTS */}

// // //         {values.map((value, index) => {

// // //           const left =
// // //             values.length === 1
// // //               ? 50
// // //               : (index /
// // //                   (values.length - 1)) *
// // //                 100;

// // //           const bottom =
// // //             ((value - minValue) /
// // //               range) *
// // //             85;

// // //           return (
// // //             <View
// // //               key={index}
// // //               style={[
// // //                 styles.point,
// // //                 {
// // //                   left: `${left}%`,
// // //                   bottom: `${bottom}%`,
// // //                 },
// // //               ]}
// // //             >
// // //               <View style={styles.pointDot} />

// // //               <Text style={styles.pointValue}>
// // //                 {value}
// // //               </Text>
// // //             </View>
// // //           );
// // //         })}

// // //       </View>

// // //       {/* X AXIS */}

// // //       <View style={styles.xAxis}>

// // //         {labels.map((label, index) => (
// // //           <Text
// // //             key={index}
// // //             style={styles.xAxisText}
// // //           >
// // //             {label}
// // //           </Text>
// // //         ))}

// // //       </View>

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
// // //     paddingBottom: 40,
// // //   },

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

// // //   iconBox: {
// // //     width: 50,
// // //     height: 50,
// // //     borderRadius: 14,
// // //     backgroundColor: "#F5F7F5",
// // //     justifyContent: "center",
// // //     alignItems: "center",
// // //     marginBottom: 10,
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
// // //     marginTop: 25,
// // //     marginBottom: 12,
// // //   },

// // //   sectionTitle: {
// // //     fontSize: 21,
// // //     fontWeight: "bold",
// // //     color: "#222",
// // //   },

// // //   // ===================================================
// // //   // PERIOD BUTTONS
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
// // //     borderRadius: 16,
// // //     padding: 18,
// // //     marginBottom: 18,
// // //     borderWidth: 1,
// // //     borderColor: "#D9E5D8",
// // //     elevation: 3,
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
// // //     marginBottom: 15,
// // //   },

// // //   // ===================================================
// // //   // PLOT
// // //   // ===================================================

// // //   plotContainer: {
// // //     height: 230,
// // //     paddingLeft: 35,
// // //   },

// // //   yAxis: {
// // //     position: "absolute",
// // //     left: 0,
// // //     top: 5,
// // //     bottom: 30,
// // //     justifyContent: "space-between",
// // //   },

// // //   axisText: {
// // //     fontSize: 10,
// // //     color: "#777",
// // //   },

// // //   plot: {
// // //     height: 180,
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
// // //     marginTop: 3,
// // //   },

// // //   xAxis: {
// // //     flexDirection: "row",
// // //     justifyContent: "space-between",
// // //     paddingTop: 7,
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
// // } from "react-native";
// // import { Ionicons } from "@expo/vector-icons";
// // import { StatusBar } from "expo-status-bar";

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
// //       labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
// //     },

// //     Monthly: {
// //       temperature: [23, 24, 25, 26, 24, 27, 25],
// //       humidity: [61, 64, 66, 65, 68, 63, 67],
// //       gas: [270, 290, 320, 350, 310, 380, 340],
// //       labels: ["1", "5", "10", "15", "20", "25", "30"],
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
// //             HEADER
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

// //             <View style={styles.cardTopRow}>

// //               <View style={styles.iconBox}>
// //                 <Ionicons
// //                   name="thermometer-outline"
// //                   size={28}
// //                   color="#E53935"
// //                 />
// //               </View>

// //               <View style={styles.liveBadge}>
// //                 <View style={styles.liveDot} />

// //                 <Text style={styles.liveText}>
// //                   LIVE
// //                 </Text>
// //               </View>

// //             </View>

// //             <Text style={styles.cardLabel}>
// //               Temperature
// //             </Text>

// //             <Text style={styles.cardValue}>
// //               {currentTemperature}°C
// //             </Text>

// //             <Text style={styles.cardStatus}>
// //               ● Normal
// //             </Text>

// //           </View>


// //           {/* HUMIDITY */}

// //           <View style={styles.monitorCard}>

// //             <View style={styles.cardTopRow}>

// //               <View style={styles.iconBox}>
// //                 <Ionicons
// //                   name="water-outline"
// //                   size={28}
// //                   color="#1976D2"
// //                 />
// //               </View>

// //               <View style={styles.liveBadge}>
// //                 <View style={styles.liveDot} />

// //                 <Text style={styles.liveText}>
// //                   LIVE
// //                 </Text>
// //               </View>

// //             </View>

// //             <Text style={styles.cardLabel}>
// //               Humidity
// //             </Text>

// //             <Text style={styles.cardValue}>
// //               {currentHumidity}%
// //             </Text>

// //             <Text style={styles.cardStatus}>
// //               ● Normal
// //             </Text>

// //           </View>


// //           {/* GAS */}

// //           <View style={styles.monitorCard}>

// //             <View style={styles.cardTopRow}>

// //               <View style={styles.iconBox}>
// //                 <Ionicons
// //                   name="flask-outline"
// //                   size={28}
// //                   color="#F57C00"
// //                 />
// //               </View>

// //               <View style={styles.liveBadge}>
// //                 <View style={styles.liveDot} />

// //                 <Text style={styles.liveText}>
// //                   LIVE
// //                 </Text>
// //               </View>

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
// //             HISTORY
// //         ================================================= */}

// //         <View style={styles.sectionHeader}>

// //           <View>
// //             <Text style={styles.sectionTitle}>
// //               Monitoring History
// //             </Text>

// //             <Text style={styles.sectionSubtitle}>
// //               Environmental readings over time
// //             </Text>
// //           </View>

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

// //             <View style={styles.chartIconTemperature}>
// //               <Ionicons
// //                 name="thermometer-outline"
// //                 size={22}
// //                 color="#E53935"
// //               />
// //             </View>

// //           </View>

// //           <LineScatterPlot
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

// //             <View style={styles.chartIconHumidity}>
// //               <Ionicons
// //                 name="water-outline"
// //                 size={22}
// //                 color="#1976D2"
// //               />
// //             </View>

// //           </View>

// //           <LineScatterPlot
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

// //             <View style={styles.chartIconGas}>
// //               <Ionicons
// //                 name="flask-outline"
// //                 size={22}
// //                 color="#F57C00"
// //               />
// //             </View>

// //           </View>

// //           <LineScatterPlot
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
// // // LINE + SCATTER PLOT
// // // =====================================================

// // function LineScatterPlot({
// //   values,
// //   labels,
// //   unit,
// // }) {

// //   const minValue = Math.min(...values);
// //   const maxValue = Math.max(...values);

// //   const range =
// //     maxValue - minValue === 0
// //       ? 1
// //       : maxValue - minValue;

// //   const chartHeight = 180;

// //   const getLeftPosition = (index) => {

// //     if (values.length === 1) {
// //       return 50;
// //     }

// //     return (
// //       (index /
// //         (values.length - 1)) *
// //       100
// //     );

// //   };

// //   const getBottomPosition = (value) => {

// //     return (
// //       ((value - minValue) /
// //         range) *
// //       85
// //     );

// //   };

// //   return (
// //     <View style={styles.plotContainer}>

// //       {/* =================================================
// //           Y AXIS
// //       ================================================= */}

// //       <View style={styles.yAxis}>

// //         <Text style={styles.axisText}>
// //           {maxValue}
// //         </Text>

// //         <Text style={styles.axisText}>
// //           {Math.round(
// //             (maxValue + minValue) / 2
// //           )}
// //         </Text>

// //         <Text style={styles.axisText}>
// //           {minValue}
// //         </Text>

// //       </View>


// //       {/* =================================================
// //           PLOT AREA
// //       ================================================= */}

// //       <View
// //         style={[
// //           styles.plot,
// //           {
// //             height: chartHeight,
// //           },
// //         ]}
// //       >

// //         {/* =================================================
// //             GRID
// //         ================================================= */}

// //         <View
// //           style={[
// //             styles.gridLine,
// //             {
// //               top: "0%",
// //             },
// //           ]}
// //         />

// //         <View
// //           style={[
// //             styles.gridLine,
// //             {
// //               top: "25%",
// //             },
// //           ]}
// //         />

// //         <View
// //           style={[
// //             styles.gridLine,
// //             {
// //               top: "50%",
// //             },
// //           ]}
// //         />

// //         <View
// //           style={[
// //             styles.gridLine,
// //             {
// //               top: "75%",
// //             },
// //           ]}
// //         />

// //         <View
// //           style={[
// //             styles.gridLine,
// //             {
// //               top: "100%",
// //             },
// //           ]}
// //         />


// //         {/* =================================================
// //             CONNECTING LINES
// //         ================================================= */}

// //         {values.map((value, index) => {

// //           if (index === values.length - 1) {
// //             return null;
// //           }

// //           const nextValue =
// //             values[index + 1];

// //           const x1 =
// //             getLeftPosition(index);

// //           const x2 =
// //             getLeftPosition(index + 1);

// //           const y1 =
// //             getBottomPosition(value);

// //           const y2 =
// //             getBottomPosition(nextValue);

// //           const dx =
// //             ((x2 - x1) / 100) *
// //             100;

// //           const dy =
// //             ((y2 - y1) / 100) *
// //             chartHeight;

// //           const length =
// //             Math.sqrt(
// //               dx * dx +
// //               dy * dy
// //             );

// //           const angle =
// //             Math.atan2(
// //               -dy,
// //               dx
// //             ) *
// //             (180 / Math.PI);

// //           return (
// //             <View
// //               key={`line-${index}`}
// //               style={[
// //                 styles.connectionLine,
// //                 {
// //                   width: length,
// //                   left: `${x1}%`,
// //                   bottom: `${y1}%`,
// //                   transform: [
// //                     {
// //                       rotate: `${angle}deg`,
// //                     },
// //                   ],
// //                 },
// //               ]}
// //             />
// //           );

// //         })}


// //         {/* =================================================
// //             DATA POINTS
// //         ================================================= */}

// //         {values.map(
// //           (value, index) => {

// //             const left =
// //               getLeftPosition(index);

// //             const bottom =
// //               getBottomPosition(value);

// //             return (
// //               <View
// //                 key={`point-${index}`}
// //                 style={[
// //                   styles.point,
// //                   {
// //                     left: `${left}%`,
// //                     bottom: `${bottom}%`,
// //                   },
// //                 ]}
// //               >

// //                 {/* VALUE */}

// //                 <Text style={styles.pointValue}>
// //                   {value}
// //                 </Text>


// //                 {/* DOT */}

// //                 <View
// //                   style={styles.pointDot}
// //                 />

// //               </View>
// //             );

// //           }
// //         )}

// //       </View>


// //       {/* =================================================
// //           X AXIS
// //       ================================================= */}

// //       <View style={styles.xAxis}>

// //         {labels.map(
// //           (label, index) => (

// //             <Text
// //               key={index}
// //               style={styles.xAxisText}
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

// //   container: {
// //     flex: 1,
// //     backgroundColor: "#F5F7F5",
// //   },

// //   scrollContent: {
// //     padding: 20,
// //     paddingBottom: 50,
// //   },

// //   // ===================================================
// //   // HEADER
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

// //   cardTopRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
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

// //   liveBadge: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     backgroundColor: "#E8F5E9",
// //     paddingHorizontal: 9,
// //     paddingVertical: 5,
// //     borderRadius: 20,
// //   },

// //   liveDot: {
// //     width: 7,
// //     height: 7,
// //     borderRadius: 4,
// //     backgroundColor: "#2E7D32",
// //     marginRight: 5,
// //   },

// //   liveText: {
// //     fontSize: 10,
// //     fontWeight: "bold",
// //     color: "#2E7D32",
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
// //     marginBottom: 12,
// //   },

// //   sectionTitle: {
// //     fontSize: 21,
// //     fontWeight: "bold",
// //     color: "#222",
// //   },

// //   sectionSubtitle: {
// //     fontSize: 13,
// //     color: "#888",
// //     marginTop: 3,
// //   },

// //   // ===================================================
// //   // PERIOD
// //   // ===================================================

// //   periodContainer: {
// //     flexDirection: "row",
// //     backgroundColor: "#E8F5E9",
// //     borderRadius: 12,
// //     padding: 4,
// //     marginBottom: 18,
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
// //     fontSize: 14,
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
// //     borderRadius: 18,
// //     padding: 18,
// //     marginBottom: 18,
// //     borderWidth: 1,
// //     borderColor: "#D9E5D8",
// //     elevation: 3,
// //   },

// //   chartHeader: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginBottom: 15,
// //   },

// //   chartTitle: {
// //     fontSize: 19,
// //     fontWeight: "bold",
// //     color: "#1B5E20",
// //   },

// //   chartSubtitle: {
// //     fontSize: 13,
// //     color: "#888",
// //     marginTop: 4,
// //   },

// //   chartIconTemperature: {
// //     width: 42,
// //     height: 42,
// //     borderRadius: 12,
// //     backgroundColor: "#FFEBEE",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },

// //   chartIconHumidity: {
// //     width: 42,
// //     height: 42,
// //     borderRadius: 12,
// //     backgroundColor: "#E3F2FD",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },

// //   chartIconGas: {
// //     width: 42,
// //     height: 42,
// //     borderRadius: 12,
// //     backgroundColor: "#FFF3E0",
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },

// //   // ===================================================
// //   // PLOT
// //   // ===================================================

// //   plotContainer: {
// //     height: 230,
// //     paddingLeft: 38,
// //   },

// //   yAxis: {
// //     position: "absolute",
// //     left: 0,
// //     top: 5,
// //     bottom: 40,
// //     justifyContent: "space-between",
// //   },

// //   axisText: {
// //     fontSize: 10,
// //     color: "#777",
// //     width: 32,
// //     textAlign: "right",
// //   },

// //   plot: {
// //     position: "relative",
// //     borderLeftWidth: 1,
// //     borderBottomWidth: 1,
// //     borderColor: "#BDBDBD",
// //   },

// //   gridLine: {
// //     position: "absolute",
// //     left: 0,
// //     right: 0,
// //     borderTopWidth: 1,
// //     borderTopColor: "#EEEEEE",
// //   },

// //   // ===================================================
// //   // CONNECTING LINE
// //   // ===================================================

// //   connectionLine: {
// //     position: "absolute",
// //     height: 2,
// //     backgroundColor: "#2E7D32",
// //     transformOrigin: "left center",
// //   },

// //   // ===================================================
// //   // POINT
// //   // ===================================================

// //   point: {
// //     position: "absolute",
// //     alignItems: "center",
// //     transform: [
// //       {
// //         translateX: -5,
// //       },
// //     ],
// //   },

// //   pointDot: {
// //     width: 10,
// //     height: 10,
// //     borderRadius: 5,
// //     backgroundColor: "#2E7D32",
// //     borderWidth: 2,
// //     borderColor: "#FFFFFF",
// //   },

// //   pointValue: {
// //     fontSize: 9,
// //     color: "#555",
// //     marginBottom: 3,
// //     fontWeight: "600",
// //   },

// //   // ===================================================
// //   // X AXIS
// //   // ===================================================

// //   xAxis: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     paddingTop: 8,
// //   },

// //   xAxisText: {
// //     fontSize: 9,
// //     color: "#777",
// //   },

// //   unitText: {
// //     textAlign: "right",
// //     fontSize: 10,
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

//   // =====================================================
//   // DUMMY MONITORING DATA
//   // Later this will come from ESP32 / API
//   // =====================================================

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

//       labels: [
//         "Mon",
//         "Tue",
//         "Wed",
//         "Thu",
//         "Fri",
//         "Sat",
//         "Sun",
//       ],
//     },

//     Monthly: {
//       temperature: [23, 24, 25, 26, 24, 27, 25],
//       humidity: [61, 64, 66, 65, 68, 63, 67],
//       gas: [270, 290, 320, 350, 310, 380, 340],

//       labels: [
//         "1",
//         "5",
//         "10",
//         "15",
//         "20",
//         "25",
//         "30",
//       ],
//     },
//   };

//   const currentData = data[period];

//   const currentTemperature =
//     currentData.temperature[
//       currentData.temperature.length - 1
//     ];

//   const currentHumidity =
//     currentData.humidity[
//       currentData.humidity.length - 1
//     ];

//   const currentGas =
//     currentData.gas[
//       currentData.gas.length - 1
//     ];

//   return (
//     <View style={styles.container}>

//       <StatusBar style="dark" />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >

//         {/* =================================================
//             TITLE
//         ================================================= */}

//         <Text style={styles.heading}>
//           Monitoring
//         </Text>

//         <Text style={styles.subtitle}>
//           Storage room environmental monitoring
//         </Text>

//         {/* =================================================
//             CURRENT VALUES
//         ================================================= */}

//         <View style={styles.cardsContainer}>

//           {/* TEMPERATURE */}

//           <View style={styles.monitorCard}>

//             <View style={styles.iconBox}>
//               <Ionicons
//                 name="thermometer-outline"
//                 size={28}
//                 color="#E53935"
//               />
//             </View>

//             <Text style={styles.cardLabel}>
//               Temperature
//             </Text>

//             <Text style={styles.cardValue}>
//               {currentTemperature}°C
//             </Text>

//             <Text style={styles.cardStatus}>
//               Normal
//             </Text>

//           </View>

//           {/* HUMIDITY */}

//           <View style={styles.monitorCard}>

//             <View style={styles.iconBox}>
//               <Ionicons
//                 name="water-outline"
//                 size={28}
//                 color="#1976D2"
//               />
//             </View>

//             <Text style={styles.cardLabel}>
//               Humidity
//             </Text>

//             <Text style={styles.cardValue}>
//               {currentHumidity}%
//             </Text>

//             <Text style={styles.cardStatus}>
//               Normal
//             </Text>

//           </View>

//           {/* GAS */}

//           <View style={styles.monitorCard}>

//             <View style={styles.iconBox}>
//               <Ionicons
//                 name="flask-outline"
//                 size={28}
//                 color="#F57C00"
//               />
//             </View>

//             <Text style={styles.cardLabel}>
//               Gas Level
//             </Text>

//             <Text style={styles.cardValue}>
//               {currentGas}
//             </Text>

//             <Text style={styles.cardUnit}>
//               ppm
//             </Text>

//           </View>

//         </View>

//         {/* =================================================
//             MONITORING HISTORY
//         ================================================= */}

//         <View style={styles.sectionHeader}>

//           <Text style={styles.sectionTitle}>
//             Monitoring History
//           </Text>

//           <Text style={styles.sectionSubtitle}>
//             Environmental readings over time
//           </Text>

//         </View>

//         {/* =================================================
//             PERIOD SELECTOR
//         ================================================= */}

//         <View style={styles.periodContainer}>

//           {["Daily", "Weekly", "Monthly"].map(
//             (item) => (

//               <TouchableOpacity
//                 key={item}
//                 style={[
//                   styles.periodButton,
//                   period === item &&
//                     styles.periodButtonActive,
//                 ]}
//                 onPress={() =>
//                   setPeriod(item)
//                 }
//               >

//                 <Text
//                   style={[
//                     styles.periodText,
//                     period === item &&
//                       styles.periodTextActive,
//                   ]}
//                 >
//                   {item}
//                 </Text>

//               </TouchableOpacity>

//             )
//           )}

//         </View>

//         {/* =================================================
//             TEMPERATURE
//         ================================================= */}

//         <View style={styles.chartCard}>

//           <View style={styles.chartHeader}>

//             <View>
//               <Text style={styles.chartTitle}>
//                 Temperature
//               </Text>

//               <Text style={styles.chartSubtitle}>
//                 {period} temperature readings
//               </Text>
//             </View>

//             <View style={styles.temperatureIcon}>
//               <Ionicons
//                 name="thermometer-outline"
//                 size={28}
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

//         {/* =================================================
//             HUMIDITY
//         ================================================= */}

//         <View style={styles.chartCard}>

//           <View style={styles.chartHeader}>

//             <View>
//               <Text style={styles.chartTitle}>
//                 Humidity
//               </Text>

//               <Text style={styles.chartSubtitle}>
//                 {period} humidity readings
//               </Text>
//             </View>

//             <View style={styles.humidityIcon}>
//               <Ionicons
//                 name="water-outline"
//                 size={28}
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

//         {/* =================================================
//             GAS
//         ================================================= */}

//         <View style={styles.chartCard}>

//           <View style={styles.chartHeader}>

//             <View>
//               <Text style={styles.chartTitle}>
//                 Gas Level
//               </Text>

//               <Text style={styles.chartSubtitle}>
//                 {period} gas readings
//               </Text>
//             </View>

//             <View style={styles.gasIcon}>
//               <Ionicons
//                 name="flask-outline"
//                 size={28}
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
// // CONNECTED LINE / SCATTER GRAPH
// // =====================================================

// function LineChart({
//   values,
//   labels,
//   unit,
// }) {

//   // -----------------------------------------------------
//   // GRAPH SIZE
//   // -----------------------------------------------------

//   const chartWidth =
//     Math.min(SCREEN_WIDTH - 80, 410);

//   const chartHeight = 220;

//   const graphWidth =
//     chartWidth - 45;

//   const graphHeight = 170;

//   const leftPadding = 42;

//   const topPadding = 10;

//   // -----------------------------------------------------
//   // MIN / MAX
//   // -----------------------------------------------------

//   const dataMin = Math.min(...values);
//   const dataMax = Math.max(...values);

//   let minValue = Math.floor(dataMin);
//   let maxValue = Math.ceil(dataMax);

//   if (minValue === maxValue) {
//     minValue -= 1;
//     maxValue += 1;
//   }

//   const range =
//     maxValue - minValue;

//   // -----------------------------------------------------
//   // CREATE 4 Y AXIS VALUES
//   // -----------------------------------------------------

//   const yValues = [
//     maxValue,
//     Math.round(
//       maxValue - range / 3
//     ),
//     Math.round(
//       maxValue - (range * 2) / 3
//     ),
//     minValue,
//   ];

//   // -----------------------------------------------------
//   // CALCULATE POINTS
//   // -----------------------------------------------------

//   const points = values.map(
//     (value, index) => {

//       let x;

//       if (values.length === 1) {
//         x =
//           leftPadding +
//           graphWidth / 2;
//       } else {
//         x =
//           leftPadding +
//           (index /
//             (values.length - 1)) *
//             graphWidth;
//       }

//       const y =
//         topPadding +
//         graphHeight -
//         ((value - minValue) /
//           range) *
//           graphHeight;

//       return {
//         x,
//         y,
//         value,
//       };
//     }
//   );

//   // -----------------------------------------------------
//   // POLYLINE STRING
//   // -----------------------------------------------------

//   const polylinePoints =
//     points
//       .map(
//         (point) =>
//           `${point.x},${point.y}`
//       )
//       .join(" ");

//   return (
//     <View style={styles.graphWrapper}>

//       {/* =================================================
//           GRAPH
//       ================================================= */}

//       <Svg
//         width={chartWidth}
//         height={chartHeight}
//       >

//         {/* ===============================================
//             HORIZONTAL GRID LINES
//         =============================================== */}

//         {yValues.map(
//           (value, index) => {

//             const y =
//               topPadding +
//               (index /
//                 (yValues.length - 1)) *
//                 graphHeight;

//             return (
//               <Line
//                 key={`grid-${index}`}
//                 x1={leftPadding}
//                 y1={y}
//                 x2={
//                   leftPadding +
//                   graphWidth
//                 }
//                 y2={y}
//                 stroke="#E5E5E5"
//                 strokeWidth="1"
//               />
//             );
//           }
//         )}

//         {/* ===============================================
//             Y AXIS
//         =============================================== */}

//         <Line
//           x1={leftPadding}
//           y1={topPadding}
//           x2={leftPadding}
//           y2={
//             topPadding +
//             graphHeight
//           }
//           stroke="#BDBDBD"
//           strokeWidth="1"
//         />

//         {/* ===============================================
//             BOTTOM AXIS
//         =============================================== */}

//         <Line
//           x1={leftPadding}
//           y1={
//             topPadding +
//             graphHeight
//           }
//           x2={
//             leftPadding +
//             graphWidth
//           }
//           y2={
//             topPadding +
//             graphHeight
//           }
//           stroke="#BDBDBD"
//           strokeWidth="1"
//         />

//         {/* ===============================================
//             Y AXIS VALUES
//         =============================================== */}

//         {yValues.map(
//           (value, index) => {

//             const y =
//               topPadding +
//               (index /
//                 (yValues.length - 1)) *
//                 graphHeight;

//             return (
//               <SvgText
//                 key={`ylabel-${index}`}
//                 x="34"
//                 y={y + 4}
//                 fontSize="11"
//                 fill="#777"
//                 textAnchor="end"
//               >
//                 {value}
//               </SvgText>
//             );
//           }
//         )}

//         {/* ===============================================
//             CONNECTING LINE
//         =============================================== */}

//         <Polyline
//           points={polylinePoints}
//           fill="none"
//           stroke="#2E7D32"
//           strokeWidth="3"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />

//         {/* ===============================================
//             DATA POINTS
//         =============================================== */}

//         {points.map(
//           (point, index) => (

//             <Circle
//               key={`point-${index}`}
//               cx={point.x}
//               cy={point.y}
//               r="5"
//               fill="#2E7D32"
//               stroke="#FFFFFF"
//               strokeWidth="2"
//             />

//           )
//         )}

//         {/* ===============================================
//             DATA VALUES
//         =============================================== */}

//         {points.map(
//           (point, index) => {

//             let valueY =
//               point.y - 12;

//             // Prevent value from going outside top
//             if (valueY < 12) {
//               valueY =
//                 point.y + 20;
//             }

//             return (
//               <SvgText
//                 key={`value-${index}`}
//                 x={point.x}
//                 y={valueY}
//                 fontSize="11"
//                 fill="#555"
//                 fontWeight="500"
//                 textAnchor="middle"
//               >
//                 {point.value}
//               </SvgText>
//             );
//           }
//         )}

//       </Svg>

//       {/* =================================================
//           X AXIS LABELS
//       ================================================= */}

//       <View
//         style={[
//           styles.xLabels,
//           {
//             width: graphWidth,
//             marginLeft: leftPadding,
//           },
//         ]}
//       >

//         {labels.map(
//           (label, index) => (

//             <Text
//               key={`xlabel-${index}`}
//               style={styles.xLabel}
//             >
//               {label}
//             </Text>

//           )
//         )}

//       </View>

//       {/* =================================================
//           UNIT
//       ================================================= */}

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

//   // ===================================================
//   // MAIN
//   // ===================================================

//   container: {
//     flex: 1,
//     backgroundColor: "#F5F7F5",
//   },

//   scrollContent: {
//     padding: 20,
//     paddingBottom: 50,
//   },

//   // ===================================================
//   // TITLE
//   // ===================================================

//   heading: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#1B5E20",
//     marginTop: 20,
//   },

//   subtitle: {
//     fontSize: 14,
//     color: "#777",
//     marginTop: 5,
//     marginBottom: 20,
//   },

//   // ===================================================
//   // MONITORING CARDS
//   // ===================================================

//   cardsContainer: {
//     gap: 12,
//   },

//   monitorCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 18,
//     borderWidth: 1,
//     borderColor: "#D9E5D8",
//     elevation: 3,
//   },

//   iconBox: {
//     width: 50,
//     height: 50,
//     borderRadius: 14,
//     backgroundColor: "#F5F7F5",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//   },

//   cardLabel: {
//     fontSize: 15,
//     color: "#666",
//   },

//   cardValue: {
//     fontSize: 30,
//     fontWeight: "bold",
//     color: "#222",
//     marginTop: 3,
//   },

//   cardStatus: {
//     color: "#2E7D32",
//     fontSize: 13,
//     fontWeight: "bold",
//     marginTop: 4,
//   },

//   cardUnit: {
//     fontSize: 13,
//     color: "#777",
//     marginTop: -3,
//   },

//   // ===================================================
//   // SECTION
//   // ===================================================

//   sectionHeader: {
//     marginTop: 28,
//     marginBottom: 15,
//   },

//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#222",
//   },

//   sectionSubtitle: {
//     fontSize: 14,
//     color: "#888",
//     marginTop: 5,
//   },

//   // ===================================================
//   // PERIOD
//   // ===================================================

//   periodContainer: {
//     flexDirection: "row",
//     backgroundColor: "#E8F5E9",
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
//     backgroundColor: "#2E7D32",
//   },

//   periodText: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#2E7D32",
//   },

//   periodTextActive: {
//     color: "#FFFFFF",
//   },

//   // ===================================================
//   // CHART CARD
//   // ===================================================

//   chartCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 20,
//     padding: 18,
//     marginBottom: 20,
//     borderWidth: 1,
//     borderColor: "#D9E5D8",

//     elevation: 4,

//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.08,
//     shadowRadius: 5,
//   },

//   // ===================================================
//   // CHART HEADER
//   // ===================================================

//   chartHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 8,
//   },

//   chartTitle: {
//     fontSize: 21,
//     fontWeight: "bold",
//     color: "#1B5E20",
//   },

//   chartSubtitle: {
//     fontSize: 14,
//     color: "#888",
//     marginTop: 5,
//   },

//   // ===================================================
//   // SENSOR ICONS
//   // ===================================================

//   temperatureIcon: {
//     width: 52,
//     height: 52,
//     borderRadius: 16,
//     backgroundColor: "#FFEBEE",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   humidityIcon: {
//     width: 52,
//     height: 52,
//     borderRadius: 16,
//     backgroundColor: "#E3F2FD",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   gasIcon: {
//     width: 52,
//     height: 52,
//     borderRadius: 16,
//     backgroundColor: "#FFF3E0",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   // ===================================================
//   // GRAPH
//   // ===================================================

//   graphWrapper: {
//     marginTop: 10,
//     width: "100%",
//   },

//   // ===================================================
//   // X LABELS
//   // ===================================================

//   xLabels: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: -5,
//   },

//   xLabel: {
//     fontSize: 10,
//     color: "#777",
//     textAlign: "center",
//   },

//   // ===================================================
//   // UNIT
//   // ===================================================

//   unitText: {
//     textAlign: "right",
//     fontSize: 11,
//     color: "#999",
//     marginTop: 8,
//   },

// });

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Svg, {
  Line,
  Polyline,
  Circle,
  Text as SvgText,
} from "react-native-svg";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Monitoring() {
  const [period, setPeriod] = useState("Daily");

  const data = {
    Daily: {
      temperature: [23, 24, 25, 24, 26, 25, 24],
      humidity: [62, 64, 67, 65, 68, 66, 63],
      gas: [280, 310, 295, 330, 350, 320, 300],
      labels: [
        "6 AM",
        "9 AM",
        "12 PM",
        "3 PM",
        "6 PM",
        "9 PM",
        "12 AM",
      ],
    },

    Weekly: {
      temperature: [23, 25, 24, 26, 25, 24, 27],
      humidity: [62, 65, 64, 68, 66, 63, 69],
      gas: [280, 320, 300, 350, 330, 310, 370],
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },

    Monthly: {
      temperature: [23, 24, 25, 26, 24, 27, 25],
      humidity: [61, 64, 66, 65, 68, 63, 67],
      gas: [270, 290, 320, 350, 310, 380, 340],
      labels: ["1", "5", "10", "15", "20", "25", "30"],
    },
  };

  const currentData = data[period];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}

        <Text style={styles.title}>Monitoring History</Text>

        <Text style={styles.subtitle}>
          Environmental readings over time
        </Text>

        {/* PERIOD BUTTONS */}

        <View style={styles.periodContainer}>
          {["Daily", "Weekly", "Monthly"].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.periodButton,
                period === item && styles.periodButtonActive,
              ]}
              onPress={() => setPeriod(item)}
            >
              <Text
                style={[
                  styles.periodText,
                  period === item && styles.periodTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* TEMPERATURE */}

        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>Temperature</Text>

              <Text style={styles.chartSubtitle}>
                {period} temperature readings
              </Text>
            </View>

            <View style={styles.temperatureIcon}>
              <Ionicons
                name="thermometer-outline"
                size={27}
                color="#E53935"
              />
            </View>
          </View>

          <LineChart
            values={currentData.temperature}
            labels={currentData.labels}
            unit="°C"
          />
        </View>

        {/* HUMIDITY */}

        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>Humidity</Text>

              <Text style={styles.chartSubtitle}>
                {period} humidity readings
              </Text>
            </View>

            <View style={styles.humidityIcon}>
              <Ionicons
                name="water-outline"
                size={27}
                color="#1976D2"
              />
            </View>
          </View>

          <LineChart
            values={currentData.humidity}
            labels={currentData.labels}
            unit="%"
          />
        </View>

        {/* GAS */}

        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>Gas Level</Text>

              <Text style={styles.chartSubtitle}>
                {period} gas readings
              </Text>
            </View>

            <View style={styles.gasIcon}>
              <Ionicons
                name="flask-outline"
                size={27}
                color="#F57C00"
              />
            </View>
          </View>

          <LineChart
            values={currentData.gas}
            labels={currentData.labels}
            unit="ppm"
          />
        </View>
      </ScrollView>
    </View>
  );
}

// =====================================================
// LINE CHART
// =====================================================

function LineChart({ values, labels, unit }) {
  const chartWidth = SCREEN_WIDTH - 76;
  const chartHeight = 220;

  const leftPadding = 42;
  const rightPadding = 10;
  const topPadding = 15;
  const bottomPadding = 25;

  const graphWidth =
    chartWidth - leftPadding - rightPadding;

  const graphHeight =
    chartHeight - topPadding - bottomPadding;

  // MINIMUM AND MAXIMUM

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const range =
    maxValue - minValue === 0
      ? 1
      : maxValue - minValue;

  // Y VALUES

  const yValues = [
    maxValue,
    Math.round(minValue + range * 0.66),
    Math.round(minValue + range * 0.33),
    minValue,
  ];

  // POINTS

  const points = values.map((value, index) => {
    const x =
      leftPadding +
      (index / (values.length - 1)) *
        graphWidth;

    const y =
      topPadding +
      graphHeight -
      ((value - minValue) / range) *
        graphHeight;

    return {
      x,
      y,
      value,
    };
  });

  // LINE

  const polylinePoints = points
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  return (
    <View style={styles.chartContainer}>
      <Svg
        width={chartWidth}
        height={chartHeight}
      >
        {/* HORIZONTAL GRID LINES */}

        {yValues.map((value, index) => {
          const y =
            topPadding +
            (index / (yValues.length - 1)) *
              graphHeight;

          return (
            <Line
              key={`grid-${index}`}
              x1={leftPadding}
              y1={y}
              x2={leftPadding + graphWidth}
              y2={y}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          );
        })}

        {/* Y AXIS LABELS */}

        {yValues.map((value, index) => {
          const y =
            topPadding +
            (index / (yValues.length - 1)) *
              graphHeight;

          return (
            <SvgText
              key={`label-${index}`}
              x={leftPadding - 8}
              y={y + 4}
              fontSize="10"
              fill="#6B7280"
              textAnchor="end"
            >
              {value}
            </SvgText>
          );
        })}

        {/* LINE */}

        <Polyline
          points={polylinePoints}
          fill="none"
          stroke="#2563EB"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* DATA POINTS */}

        {points.map((point, index) => (
          <Circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#FFFFFF"
            stroke="#2563EB"
            strokeWidth="2"
          />
        ))}

        {/* X AXIS LABELS */}

        {labels.map((label, index) => {
          const x =
            leftPadding +
            (index / (labels.length - 1)) *
              graphWidth;

          return (
            <SvgText
              key={`x-label-${index}`}
              x={x}
              y={chartHeight - 5}
              fontSize="9"
              fill="#6B7280"
              textAnchor="middle"
            >
              {label}
            </SvgText>
          );
        })}
      </Svg>

      {/* UNIT */}

      <Text style={styles.unitText}>
        Unit: {unit}
      </Text>
    </View>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 5,
    marginBottom: 20,
  },

  periodContainer: {
    flexDirection: "row",
    backgroundColor: "#E9EEF5",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },

  periodButton: {
    flex: 1,
    paddingVertical: 11,
    alignItems: "center",
    borderRadius: 9,
  },

  periodButtonActive: {
    backgroundColor: "#FFFFFF",
  },

  periodText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
  },

  periodTextActive: {
    color: "#111827",
  },

  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,

    elevation: 3,
  },

  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  chartTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  chartSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  temperatureIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FDECEC",
    justifyContent: "center",
    alignItems: "center",
  },

  humidityIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#E8F1FC",
    justifyContent: "center",
    alignItems: "center",
  },

  gasIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#FFF3E5",
    justifyContent: "center",
    alignItems: "center",
  },

  chartContainer: {
    marginTop: 5,
    alignItems: "center",
  },

  unitText: {
    alignSelf: "flex-end",
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: -5,
    marginRight: 5,
  },
});