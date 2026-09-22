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

// export default function Analytics() {
//   const [period, setPeriod] = useState("Weekly");

//   // STATIC DATA FOR POC
//   const analyticsData = {
//     Daily: {
//       temperature: [23, 24, 25, 24, 26, 25, 24],
//       humidity: [62, 64, 67, 65, 68, 66, 63],
//       gas: [280, 310, 295, 330, 350, 320, 300],
//       labels: ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM", "12AM"],
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

//   const currentData = analyticsData[period];

//   return (
//     <View style={styles.container}>
//       <StatusBar style="dark" />

//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {/* HEADER */}

//         <Text style={styles.title}>Analytics</Text>

//         <Text style={styles.subtitle}>
//           Storage environment analysis
//         </Text>

//         {/* PERIOD SELECTOR */}

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

//         {/* SUMMARY CARDS */}

//         <View style={styles.summaryGrid}>
//           <SummaryCard
//             icon="thermometer-outline"
//             iconColor="#E53935"
//             iconBackground="#FDECEC"
//             label="Avg. Temperature"
//             value="24.8°C"
//             status="● Normal"
//           />

//           <SummaryCard
//             icon="water-outline"
//             iconColor="#1976D2"
//             iconBackground="#EAF3FF"
//             label="Avg. Humidity"
//             value="65%"
//             status="● Normal"
//           />

//           <SummaryCard
//             icon="flask-outline"
//             iconColor="#F57C00"
//             iconBackground="#FFF3E5"
//             label="Avg. Gas Level"
//             value="315 ppm"
//             status="● Safe"
//           />

//           <SummaryCard
//             icon="cube-outline"
//             iconColor="#2E7D32"
//             iconBackground="#EAF6EC"
//             label="Storage Used"
//             value="78%"
//             status="● Optimal"
//           />
//         </View>

//         {/* STORAGE HEALTH */}

//         <View style={styles.statusCard}>
//           <View style={styles.statusTop}>
//             <View>
//               <Text style={styles.sectionTitle}>
//                 Storage Health
//               </Text>

//               <Text style={styles.sectionSubtitle}>
//                 Overall environmental condition
//               </Text>
//             </View>

//             <View style={styles.healthBadge}>
//               <Ionicons
//                 name="checkmark-circle"
//                 size={18}
//                 color="#2E7D32"
//               />

//               <Text style={styles.healthText}>
//                 Healthy
//               </Text>
//             </View>
//           </View>

//           <View style={styles.progressBackground}>
//             <View style={styles.progressFill} />
//           </View>

//           <View style={styles.progressBottom}>
//             <Text style={styles.progressLabel}>
//               Overall Score
//             </Text>

//             <Text style={styles.progressValue}>
//               92%
//             </Text>
//           </View>
//         </View>

//         {/* TEMPERATURE */}

//         <AnalysisChart
//           title="Temperature Trend"
//           subtitle={`${period} temperature analysis`}
//           icon="thermometer-outline"
//           iconColor="#E53935"
//           values={currentData.temperature}
//           labels={currentData.labels}
//           unit="°C"
//           insight="Temperature remained within the recommended storage range."
//         />

//         {/* HUMIDITY */}

//         <AnalysisChart
//           title="Humidity Trend"
//           subtitle={`${period} humidity analysis`}
//           icon="water-outline"
//           iconColor="#1976D2"
//           values={currentData.humidity}
//           labels={currentData.labels}
//           unit="%"
//           insight="Humidity levels are stable and suitable for storage."
//         />

//         {/* GAS */}

//         <AnalysisChart
//           title="Gas Level Trend"
//           subtitle={`${period} gas analysis`}
//           icon="flask-outline"
//           iconColor="#F57C00"
//           values={currentData.gas}
//           labels={currentData.labels}
//           unit="ppm"
//           insight="Gas levels are currently below the critical threshold."
//           insightIcon="shield-checkmark-outline"
//           insightColor="#2E7D32"
//         />

//         {/* ROOM ANALYSIS */}

//         <View style={styles.roomCard}>
//           <View style={styles.roomHeader}>
//             <View>
//               <Text style={styles.sectionTitle}>
//                 Room Analysis
//               </Text>

//               <Text style={styles.sectionSubtitle}>
//                 Current storage room performance
//               </Text>
//             </View>

//             <Ionicons
//               name="business-outline"
//               size={25}
//               color="#374151"
//             />
//           </View>

//           <RoomRow
//             room="Room 01"
//             usage="85%"
//             status="Healthy"
//           />

//           <RoomRow
//             room="Room 02"
//             usage="72%"
//             status="Healthy"
//           />

//           <RoomRow
//             room="Room 03"
//             usage="78%"
//             status="Healthy"
//           />
//         </View>

//         {/* ALERT SUMMARY */}

        
//       </ScrollView>
//     </View>
//   );
// }

// /* =====================================================
//    SUMMARY CARD
// ===================================================== */

// function SummaryCard({
//   icon,
//   iconColor,
//   iconBackground,
//   label,
//   value,
//   status,
// }) {
//   return (
//     <View style={styles.summaryCard}>
//       <View
//         style={[
//           styles.summaryIcon,
//           {
//             backgroundColor: iconBackground,
//           },
//         ]}
//       >
//         <Ionicons
//           name={icon}
//           size={22}
//           color={iconColor}
//         />
//       </View>

//       <Text style={styles.summaryLabel}>
//         {label}
//       </Text>

//       <Text style={styles.summaryValue}>
//         {value}
//       </Text>

//       <Text style={styles.goodText}>
//         {status}
//       </Text>
//     </View>
//   );
// }

// /* =====================================================
//    ANALYSIS CHART
// ===================================================== */

// function AnalysisChart({
//   title,
//   subtitle,
//   icon,
//   iconColor,
//   values,
//   labels,
//   unit,
//   insight,
//   insightIcon = "information-circle-outline",
//   insightColor = "#1976D2",
// }) {
//   return (
//     <View style={styles.chartCard}>
//       <View style={styles.chartHeader}>
//         <View style={{ flex: 1 }}>
//           <Text style={styles.chartTitle}>
//             {title}
//           </Text>

//           <Text style={styles.chartSubtitle}>
//             {subtitle}
//           </Text>
//         </View>

//         <View style={styles.chartIcon}>
//           <Ionicons
//             name={icon}
//             size={24}
//             color={iconColor}
//           />
//         </View>
//       </View>

//       <LineChart
//         values={values}
//         labels={labels}
//         unit={unit}
//       />

//       <View style={styles.insightBox}>
//         <Ionicons
//           name={insightIcon}
//           size={20}
//           color={insightColor}
//         />

//         <Text style={styles.insightText}>
//           {insight}
//         </Text>
//       </View>
//     </View>
//   );
// }

// /* =====================================================
//    LINE CHART
// ===================================================== */

// function LineChart({ values, labels, unit }) {
//   const chartWidth = SCREEN_WIDTH - 72;
//   const chartHeight = 210;

//   const leftPadding = 42;
//   const rightPadding = 10;
//   const topPadding = 15;
//   const bottomPadding = 32;

//   const graphWidth =
//     chartWidth -
//     leftPadding -
//     rightPadding;

//   const graphHeight =
//     chartHeight -
//     topPadding -
//     bottomPadding;

//   const minValue = Math.min(...values);
//   const maxValue = Math.max(...values);

//   const range =
//     maxValue - minValue === 0
//       ? 1
//       : maxValue - minValue;

//   const yValues = [
//     maxValue,
//     Math.round(minValue + range * 0.66),
//     Math.round(minValue + range * 0.33),
//     minValue,
//   ];

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

//   const polylinePoints = points
//     .map(
//       (point) =>
//         `${point.x},${point.y}`
//     )
//     .join(" ");

//   return (
//     <View style={styles.chartContainer}>
//       <Svg
//         width={chartWidth}
//         height={chartHeight}
//       >
//         {/* GRID LINES */}

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
//               x2={chartWidth - rightPadding}
//               y2={y}
//               stroke="#E5E7EB"
//               strokeWidth="1"
//             />
//           );
//         })}

//         {/* Y AXIS VALUES */}

//         {yValues.map((value, index) => {
//           const y =
//             topPadding +
//             (index / (yValues.length - 1)) *
//               graphHeight;

//           return (
//             <SvgText
//               key={`y-${index}`}
//               x="4"
//               y={y + 4}
//               fontSize="10"
//               fill="#6B7280"
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
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />

//         {/* POINTS */}

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
//               key={`label-${index}`}
//               x={x}
//               y={chartHeight - 8}
//               fontSize="10"
//               fill="#6B7280"
//               textAnchor="middle"
//             >
//               {label}
//             </SvgText>
//           );
//         })}
//       </Svg>

//       <Text style={styles.chartUnit}>
//         Unit: {unit}
//       </Text>
//     </View>
//   );
// }

// /* =====================================================
//    ROOM ROW
// ===================================================== */

// function RoomRow({
//   room,
//   usage,
//   status,
// }) {
//   return (
//     <View style={styles.roomRow}>
//       <View style={styles.roomInfo}>
//         <Ionicons
//           name="cube-outline"
//           size={22}
//           color="#374151"
//         />

//         <Text style={styles.roomName}>
//           {room}
//         </Text>
//       </View>

//       <View style={styles.roomUsage}>
//         <Text style={styles.usageText}>
//           {usage}
//         </Text>

//         <View style={styles.usageBar}>
//           <View
//             style={[
//               styles.usageFill,
//               {
//                 width: usage,
//               },
//             ]}
//           />
//         </View>
//       </View>

//       <View style={styles.roomStatus}>
//         <View style={styles.statusDot} />

//         <Text style={styles.roomStatusText}>
//           {status}
//         </Text>
//       </View>
//     </View>
//   );
// }

// /* =====================================================
//    STYLES
// ===================================================== */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F7F8FA",
//   },

//   scrollContent: {
//     padding: 18,
//     paddingBottom: 40,
//   },

//   title: {
//     fontSize: 28,
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

//   /* PERIOD */

//   periodContainer: {
//     flexDirection: "row",
//     backgroundColor: "#EDEFF2",
//     borderRadius: 12,
//     padding: 4,
//     marginBottom: 18,
//   },

//   periodButton: {
//     flex: 1,
//     paddingVertical: 10,
//     alignItems: "center",
//     borderRadius: 9,
//   },

//   periodButtonActive: {
//     backgroundColor: "#FFFFFF",
//   },

//   periodText: {
//     fontSize: 13,
//     color: "#6B7280",
//     fontWeight: "500",
//   },

//   periodTextActive: {
//     color: "#111827",
//     fontWeight: "700",
//   },

//   /* SUMMARY */

//   summaryGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },

//   summaryCard: {
//     width: "48.5%",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 15,
//     marginBottom: 12,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//   },

//   summaryIcon: {
//     width: 42,
//     height: 42,
//     borderRadius: 12,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 12,
//   },

//   summaryLabel: {
//     fontSize: 12,
//     color: "#6B7280",
//     marginBottom: 5,
//   },

//   summaryValue: {
//     fontSize: 20,
//     fontWeight: "700",
//     color: "#111827",
//   },

//   goodText: {
//     fontSize: 11,
//     color: "#2E7D32",
//     marginTop: 6,
//     fontWeight: "600",
//   },

//   /* STORAGE HEALTH */

//   statusCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 18,
//     marginTop: 6,
//     marginBottom: 14,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//   },

//   statusTop: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//   },

//   sectionTitle: {
//     fontSize: 17,
//     fontWeight: "700",
//     color: "#111827",
//   },

//   sectionSubtitle: {
//     fontSize: 12,
//     color: "#6B7280",
//     marginTop: 4,
//   },

//   healthBadge: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#EAF6EC",
//     paddingHorizontal: 9,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },

//   healthText: {
//     color: "#2E7D32",
//     fontSize: 12,
//     fontWeight: "600",
//     marginLeft: 4,
//   },

//   progressBackground: {
//     height: 9,
//     backgroundColor: "#E5E7EB",
//     borderRadius: 10,
//     marginTop: 18,
//   },

//   progressFill: {
//     width: "92%",
//     height: "100%",
//     backgroundColor: "#2E7D32",
//     borderRadius: 10,
//   },

//   progressBottom: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 8,
//   },

//   progressLabel: {
//     fontSize: 12,
//     color: "#6B7280",
//   },

//   progressValue: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: "#2E7D32",
//   },

//   /* CHART */

//   chartCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 14,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//   },

//   chartHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },

//   chartTitle: {
//     fontSize: 17,
//     fontWeight: "700",
//     color: "#111827",
//   },

//   chartSubtitle: {
//     fontSize: 12,
//     color: "#6B7280",
//     marginTop: 4,
//   },

//   chartIcon: {
//     width: 44,
//     height: 44,
//     borderRadius: 12,
//     backgroundColor: "#F5F6F8",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   chartContainer: {
//     alignItems: "center",
//   },

//   chartUnit: {
//     fontSize: 10,
//     color: "#9CA3AF",
//     alignSelf: "flex-end",
//     marginRight: 5,
//     marginTop: -3,
//   },

//   insightBox: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F4F8FF",
//     borderRadius: 10,
//     padding: 11,
//     marginTop: 12,
//   },

//   insightText: {
//     flex: 1,
//     fontSize: 12,
//     color: "#4B5563",
//     lineHeight: 18,
//     marginLeft: 8,
//   },

//   /* ROOM */

//   roomCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 18,
//     marginBottom: 14,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//   },

//   roomHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 14,
//   },

//   roomRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 13,
//     borderTopWidth: 1,
//     borderTopColor: "#F0F1F3",
//   },

//   roomInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "30%",
//   },

//   roomName: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#374151",
//     marginLeft: 7,
//   },

//   roomUsage: {
//     width: "35%",
//   },

//   usageText: {
//     fontSize: 11,
//     color: "#6B7280",
//     marginBottom: 4,
//   },

//   usageBar: {
//     height: 5,
//     backgroundColor: "#E5E7EB",
//     borderRadius: 5,
//     width: "85%",
//   },

//   usageFill: {
//     height: "100%",
//     backgroundColor: "#2E7D32",
//     borderRadius: 5,
//   },

//   roomStatus: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },

//   statusDot: {
//     width: 7,
//     height: 7,
//     borderRadius: 7,
//     backgroundColor: "#2E7D32",
//     marginRight: 5,
//   },

//   roomStatusText: {
//     fontSize: 11,
//     color: "#2E7D32",
//     fontWeight: "600",
//   },

//   /* ALERT */

//   alertCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 16,
//     padding: 16,
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOpacity: 0.05,
//     shadowRadius: 5,
//   },

//   alertIcon: {
//     width: 45,
//     height: 45,
//     borderRadius: 12,
//     backgroundColor: "#FFF3E5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   alertContent: {
//     flex: 1,
//     marginLeft: 12,
//   },

//   alertTitle: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#111827",
//   },

//   alertSubtitle: {
//     fontSize: 11,
//     color: "#6B7280",
//     marginTop: 4,
//   },

//   alertNumber: {
//     fontSize: 26,
//     fontWeight: "700",
//     color: "#F57C00",
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
    View
} from "react-native";
import Svg, {
    Circle,
    Line,
    Polyline,
    Text as SvgText,
} from "react-native-svg";

const SCREEN_WIDTH = Dimensions.get("window").width;

// =====================================================
// BACKEND API
// =====================================================

const API_URL = "http://10.147.4.54:5000/api/sensor";

// =====================================================
// THRESHOLDS
// =====================================================

const TEMP_LOW = 18;
const TEMP_HIGH = 30;

const HUM_LOW = 40;
const HUM_HIGH = 70;

const GAS_HIGH = 600;

// =====================================================
// ANALYTICS SCREEN
// =====================================================

export default function Analytics() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // =====================================================
  // FETCH SENSOR DATA
  // =====================================================

  const fetchSensorData = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const result = await response.json();

      console.log("ANALYTICS SENSOR RESPONSE:", result);

      // Supports:
      // [ ... ]
      // OR { data: [...] }
      // OR { sensors: [...] }

      let records = [];

      if (Array.isArray(result)) {
        records = result;
      } else if (Array.isArray(result.data)) {
        records = result.data;
      } else if (Array.isArray(result.sensors)) {
        records = result.sensors;
      }

      setSensorData(records);
    } catch (error) {
      console.log("ANALYTICS FETCH ERROR:", error);
      setSensorData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();

    // Refresh every 5 seconds
    const interval = setInterval(() => {
      fetchSensorData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // =====================================================
  // SELECTED DATE DATA
  // =====================================================

  const selectedDateData = useMemo(() => {
    return sensorData.filter((item) => {
      const timestamp =
        item.created_at ||
        item.timestamp ||
        item.recorded_at ||
        item.date ||
        item.createdAt;

      if (!timestamp) return false;

      const date = new Date(timestamp);

      if (isNaN(date.getTime())) return false;

      return (
        date.getFullYear() === selectedDate.getFullYear() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getDate() === selectedDate.getDate()
      );
    });
  }, [sensorData, selectedDate]);

  // =====================================================
  // ANALYTICS CALCULATIONS
  // =====================================================

  const temperatureValues = selectedDateData
    .map((item) => Number(item.temperature))
    .filter((value) => !isNaN(value));

  const humidityValues = selectedDateData
    .map((item) => Number(item.humidity))
    .filter((value) => !isNaN(value));

  const gasValues = selectedDateData
    .map((item) => Number(item.gas_value))
    .filter((value) => !isNaN(value));

  const average = (values) => {
    if (!values.length) return 0;

    return (
      values.reduce((sum, value) => sum + value, 0) /
      values.length
    );
  };

  const temperatureAverage = average(temperatureValues);
  const humidityAverage = average(humidityValues);
  const gasAverage = average(gasValues);

  const temperatureMin = temperatureValues.length
    ? Math.min(...temperatureValues)
    : 0;

  const temperatureMax = temperatureValues.length
    ? Math.max(...temperatureValues)
    : 0;

  const humidityMin = humidityValues.length
    ? Math.min(...humidityValues)
    : 0;

  const humidityMax = humidityValues.length
    ? Math.max(...humidityValues)
    : 0;

  const gasMin = gasValues.length
    ? Math.min(...gasValues)
    : 0;

  const gasMax = gasValues.length
    ? Math.max(...gasValues)
    : 0;

  // =====================================================
  // STATUS
  // =====================================================

  const temperatureDanger =
    temperatureAverage < TEMP_LOW ||
    temperatureAverage > TEMP_HIGH;

  const humidityDanger =
    humidityAverage < HUM_LOW ||
    humidityAverage > HUM_HIGH;

  const gasDanger = gasAverage > GAS_HIGH;

  const dangerCount =
    Number(temperatureDanger) +
    Number(humidityDanger) +
    Number(gasDanger);

  let healthStatus = "Healthy";
  let healthScore = 100;

  if (selectedDateData.length === 0) {
    healthStatus = "No Data";
    healthScore = 0;
  } else if (dangerCount === 0) {
    healthStatus = "Healthy";
    healthScore = 100;
  } else if (dangerCount === 1) {
    healthStatus = "Warning";
    healthScore = 70;
  } else {
    healthStatus = "Critical";
    healthScore = 40;
  }

  // =====================================================
  // CHART DATA
  // =====================================================

  const chartLabels = selectedDateData
    .slice(-12)
    .map((item) => {
      const timestamp =
        item.created_at ||
        item.timestamp ||
        item.recorded_at ||
        item.date ||
        item.createdAt;

      if (!timestamp) return "--";

      const date = new Date(timestamp);

      if (isNaN(date.getTime())) return "--";

      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    });

  const chartTemperature = selectedDateData
    .slice(-12)
    .map((item) => Number(item.temperature))
    .filter((value) => !isNaN(value));

  const chartHumidity = selectedDateData
    .slice(-12)
    .map((item) => Number(item.humidity))
    .filter((value) => !isNaN(value));

  const chartGas = selectedDateData
    .slice(-12)
    .map((item) => Number(item.gas_value))
    .filter((value) => !isNaN(value));

  // =====================================================
  // ROOM ANALYSIS
  // =====================================================

  const roomAnalysis = useMemo(() => {
    const rooms = {};

    selectedDateData.forEach((item) => {
      const roomId = item.room_id;

      if (roomId === undefined || roomId === null) {
        return;
      }

      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }

      rooms[roomId].push(item);
    });

    return Object.keys(rooms)
      .map((roomId) => {
        const records = rooms[roomId];

        const temps = records
          .map((item) => Number(item.temperature))
          .filter((value) => !isNaN(value));

        const hums = records
          .map((item) => Number(item.humidity))
          .filter((value) => !isNaN(value));

        const gases = records
          .map((item) => Number(item.gas_value))
          .filter((value) => !isNaN(value));

        const avgTemp = average(temps);
        const avgHum = average(hums);
        const avgGas = average(gases);

        const danger =
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
          status: danger ? "Warning" : "Healthy",
        };
      })
      .sort((a, b) => Number(a.roomId) - Number(b.roomId));
  }, [selectedDateData]);

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formattedDate = selectedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  // =====================================================
  // CALENDAR
  // =====================================================

  const calendarDays = getCalendarDays(currentMonth);

  const selectDate = (date) => {
    setSelectedDate(date);
    setCalendarOpen(false);
  };

  const previousMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}

        <Text style={styles.title}>Analytics</Text>

        <Text style={styles.subtitle}>
          Real sensor analysis by selected date
        </Text>

        {/* DATE SELECTOR */}

        <TouchableOpacity
          style={styles.dateSelector}
          onPress={() => setCalendarOpen(!calendarOpen)}
        >
          <View style={styles.calendarIcon}>
            <Ionicons
              name="calendar-outline"
              size={23}
              color="#2E7D32"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.dateLabel}>
              Selected Date
            </Text>

            <Text style={styles.dateValue}>
              {formattedDate}
            </Text>
          </View>

          <Ionicons
            name={
              calendarOpen
                ? "chevron-up"
                : "chevron-down"
            }
            size={22}
            color="#6B7280"
          />
        </TouchableOpacity>

        {/* CALENDAR */}

        {calendarOpen && (
          <Calendar
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            days={calendarDays}
            onPrevious={previousMonth}
            onNext={nextMonth}
            onSelect={selectDate}
          />
        )}

        {/* LOADING */}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color="#2E7D32"
            />

            <Text style={styles.loadingText}>
              Loading sensor data...
            </Text>
          </View>
        ) : selectedDateData.length === 0 ? (
          <View style={styles.noDataCard}>
            <Ionicons
              name="analytics-outline"
              size={45}
              color="#9CA3AF"
            />

            <Text style={styles.noDataTitle}>
              No Sensor Data
            </Text>

            <Text style={styles.noDataText}>
              No sensor readings were recorded for{" "}
              {formattedDate}.
            </Text>
          </View>
        ) : (
          <>
            {/* SUMMARY */}

            <View style={styles.summaryGrid}>
              <SummaryCard
                icon="thermometer-outline"
                iconColor="#E53935"
                iconBackground="#FDECEC"
                label="Avg. Temperature"
                value={`${temperatureAverage.toFixed(1)}°C`}
                status={
                  temperatureDanger
                    ? "● Warning"
                    : "● Normal"
                }
                statusDanger={temperatureDanger}
              />

              <SummaryCard
                icon="water-outline"
                iconColor="#1976D2"
                iconBackground="#EAF3FF"
                label="Avg. Humidity"
                value={`${humidityAverage.toFixed(1)}%`}
                status={
                  humidityDanger
                    ? "● Warning"
                    : "● Normal"
                }
                statusDanger={humidityDanger}
              />

              <SummaryCard
                icon="flask-outline"
                iconColor="#F57C00"
                iconBackground="#FFF3E5"
                label="Avg. Gas Level"
                value={`${gasAverage.toFixed(0)}`}
                status={
                  gasDanger
                    ? "● High"
                    : "● Safe"
                }
                statusDanger={gasDanger}
              />

              <SummaryCard
                icon="pulse-outline"
                iconColor="#2E7D32"
                iconBackground="#EAF6EC"
                label="Readings"
                value={selectedDateData.length}
                status="● Recorded"
              />
            </View>

            {/* STORAGE HEALTH */}

            <View style={styles.statusCard}>
              <View style={styles.statusTop}>
                <View>
                  <Text style={styles.sectionTitle}>
                    Storage Health
                  </Text>

                  <Text style={styles.sectionSubtitle}>
                    Environmental condition on{" "}
                    {formattedDate}
                  </Text>
                </View>

                <View
                  style={[
                    styles.healthBadge,
                    healthStatus === "Warning" &&
                      styles.warningBadge,
                    healthStatus === "Critical" &&
                      styles.criticalBadge,
                  ]}
                >
                  <Ionicons
                    name={
                      healthStatus === "Healthy"
                        ? "checkmark-circle"
                        : "alert-circle"
                    }
                    size={18}
                    color={
                      healthStatus === "Healthy"
                        ? "#2E7D32"
                        : "#D32F2F"
                    }
                  />

                  <Text
                    style={[
                      styles.healthText,
                      healthStatus !== "Healthy" &&
                        styles.warningText,
                    ]}
                  >
                    {healthStatus}
                  </Text>
                </View>
              </View>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${healthScore}%`,
                    },
                  ]}
                />
              </View>

              <View style={styles.progressBottom}>
                <Text style={styles.progressLabel}>
                  Overall Score
                </Text>

                <Text style={styles.progressValue}>
                  {healthScore}%
                </Text>
              </View>
            </View>

            {/* TEMPERATURE */}

            <AnalysisChart
              title="Temperature Analysis"
              subtitle={`${selectedDateData.length} readings`}
              icon="thermometer-outline"
              iconColor="#E53935"
              values={chartTemperature}
              labels={chartLabels.slice(
                0,
                chartTemperature.length
              )}
              unit="°C"
              min={temperatureMin}
              max={temperatureMax}
              insight={
                temperatureDanger
                  ? `Temperature went outside the recommended range of ${TEMP_LOW}°C–${TEMP_HIGH}°C.`
                  : "Temperature remained within the recommended storage range."
              }
              insightIcon={
                temperatureDanger
                  ? "alert-circle-outline"
                  : "checkmark-circle-outline"
              }
              insightColor={
                temperatureDanger
                  ? "#D32F2F"
                  : "#2E7D32"
              }
            />

            {/* HUMIDITY */}

            <AnalysisChart
              title="Humidity Analysis"
              subtitle={`${selectedDateData.length} readings`}
              icon="water-outline"
              iconColor="#1976D2"
              values={chartHumidity}
              labels={chartLabels.slice(
                0,
                chartHumidity.length
              )}
              unit="%"
              min={humidityMin}
              max={humidityMax}
              insight={
                humidityDanger
                  ? `Humidity went outside the recommended range of ${HUM_LOW}%–${HUM_HIGH}%.`
                  : "Humidity remained within the recommended storage range."
              }
              insightIcon={
                humidityDanger
                  ? "alert-circle-outline"
                  : "checkmark-circle-outline"
              }
              insightColor={
                humidityDanger
                  ? "#D32F2F"
                  : "#2E7D32"
              }
            />

            {/* GAS */}

            <AnalysisChart
              title="Gas Level Analysis"
              subtitle={`${selectedDateData.length} readings`}
              icon="flask-outline"
              iconColor="#F57C00"
              values={chartGas}
              labels={chartLabels.slice(
                0,
                chartGas.length
              )}
              unit="MQ-135"
              min={gasMin}
              max={gasMax}
              insight={
                gasDanger
                  ? `Gas level exceeded the critical threshold of ${GAS_HIGH}.`
                  : "Gas levels are below the critical threshold."
              }
              insightIcon={
                gasDanger
                  ? "alert-circle-outline"
                  : "shield-checkmark-outline"
              }
              insightColor={
                gasDanger
                  ? "#D32F2F"
                  : "#2E7D32"
              }
            />

            {/* ROOM ANALYSIS */}

            <View style={styles.roomCard}>
              <View style={styles.roomHeader}>
                <View>
                  <Text style={styles.sectionTitle}>
                    Room Analysis
                  </Text>

                  <Text style={styles.sectionSubtitle}>
                    Analysis for {formattedDate}
                  </Text>
                </View>

                <Ionicons
                  name="business-outline"
                  size={25}
                  color="#374151"
                />
              </View>

              {roomAnalysis.length === 0 ? (
                <Text style={styles.emptyRoomText}>
                  No room information available.
                </Text>
              ) : (
                roomAnalysis.map((room) => (
                  <RoomRow
                    key={room.roomId}
                    room={`Room ${String(
                      room.roomId
                    ).padStart(2, "0")}`}
                    temperature={room.temperature}
                    humidity={room.humidity}
                    gas={room.gas}
                    status={room.status}
                  />
                ))
              )}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

// =====================================================
// CALENDAR COMPONENT
// =====================================================

function Calendar({
  currentMonth,
  selectedDate,
  days,
  onPrevious,
  onNext,
  onSelect,
}) {
  const monthName = currentMonth.toLocaleDateString(
    "en-IN",
    {
      month: "long",
      year: "numeric",
    }
  );

  return (
    <View style={styles.calendarCard}>
      <View style={styles.calendarHeader}>
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

        <Text style={styles.monthTitle}>
          {monthName}
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

      <View style={styles.weekHeader}>
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

      <View style={styles.calendarGrid}>
        {days.map((day, index) => {
          if (!day) {
            return (
              <View
                key={`empty-${index}`}
                style={styles.calendarDay}
              />
            );
          }

          const isSelected =
            day.getDate() ===
              selectedDate.getDate() &&
            day.getMonth() ===
              selectedDate.getMonth() &&
            day.getFullYear() ===
              selectedDate.getFullYear();

          const isToday =
            day.toDateString() ===
            new Date().toDateString();

          return (
            <TouchableOpacity
              key={day.toISOString()}
              style={[
                styles.calendarDay,
                isSelected &&
                  styles.calendarDaySelected,
              ]}
              onPress={() => onSelect(day)}
            >
              <Text
                style={[
                  styles.calendarDayText,
                  isSelected &&
                    styles.calendarDayTextSelected,
                  isToday &&
                    !isSelected &&
                    styles.todayText,
                ]}
              >
                {day.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// =====================================================
// CALENDAR DAYS
// =====================================================

function getCalendarDays(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const numberOfDays = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= numberOfDays; day++) {
    days.push(
      new Date(year, month, day)
    );
  }

  return days;
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
  statusDanger = false,
}) {
  return (
    <View style={styles.summaryCard}>
      <View
        style={[
          styles.summaryIcon,
          {
            backgroundColor: iconBackground,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={iconColor}
        />
      </View>

      <Text style={styles.summaryLabel}>
        {label}
      </Text>

      <Text style={styles.summaryValue}>
        {value}
      </Text>

      <Text
        style={[
          styles.goodText,
          statusDanger &&
            styles.dangerText,
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
  insight,
  insightIcon,
  insightColor,
}) {
  return (
    <View style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.chartTitle}>
            {title}
          </Text>

          <Text style={styles.chartSubtitle}>
            {subtitle}
          </Text>
        </View>

        <View style={styles.chartIcon}>
          <Ionicons
            name={icon}
            size={24}
            color={iconColor}
          />
        </View>
      </View>

      {values.length > 0 ? (
        <>
          <LineChart
            values={values}
            labels={labels}
            unit={unit}
          />

          <View style={styles.minMaxRow}>
            <View>
              <Text style={styles.minMaxLabel}>
                Minimum
              </Text>

              <Text style={styles.minMaxValue}>
                {min.toFixed(1)} {unit}
              </Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.minMaxLabel}>
                Maximum
              </Text>

              <Text style={styles.minMaxValue}>
                {max.toFixed(1)} {unit}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.noChartText}>
          No readings available.
        </Text>
      )}

      <View style={styles.insightBox}>
        <Ionicons
          name={
            insightIcon ||
            "information-circle-outline"
          }
          size={20}
          color={insightColor || "#1976D2"}
        />

        <Text style={styles.insightText}>
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
  unit,
}) {
  if (!values || values.length === 0) {
    return null;
  }

  const chartWidth = Math.max(
    SCREEN_WIDTH - 72,
    280
  );

  const chartHeight = 210;

  const leftPadding = 42;
  const rightPadding = 10;
  const topPadding = 15;
  const bottomPadding = 32;

  const graphWidth =
    chartWidth -
    leftPadding -
    rightPadding;

  const graphHeight =
    chartHeight -
    topPadding -
    bottomPadding;

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const range =
    maxValue - minValue === 0
      ? 1
      : maxValue - minValue;

  const yValues = [
    maxValue,
    minValue + range * 0.66,
    minValue + range * 0.33,
    minValue,
  ];

  const points = values.map(
    (value, index) => {
      const x =
        values.length === 1
          ? leftPadding +
            graphWidth / 2
          : leftPadding +
            (index /
              (values.length - 1)) *
              graphWidth;

      const y =
        topPadding +
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

  const polylinePoints = points
    .map(
      (point) =>
        `${point.x},${point.y}`
    )
    .join(" ");

  return (
    <View style={styles.chartContainer}>
      <Svg
        width={chartWidth}
        height={chartHeight}
      >
        {/* GRID */}

        {yValues.map(
          (value, index) => {
            const y =
              topPadding +
              (index / 3) *
                graphHeight;

            return (
              <Line
                key={`grid-${index}`}
                x1={leftPadding}
                y1={y}
                x2={
                  chartWidth -
                  rightPadding
                }
                y2={y}
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            );
          }
        )}

        {/* Y VALUES */}

        {yValues.map(
          (value, index) => {
            const y =
              topPadding +
              (index / 3) *
                graphHeight;

            return (
              <SvgText
                key={`y-${index}`}
                x="4"
                y={y + 4}
                fontSize="10"
                fill="#6B7280"
              >
                {Number(value).toFixed(0)}
              </SvgText>
            );
          }
        )}

        {/* LINE */}

        <Polyline
          points={polylinePoints}
          fill="none"
          stroke="#2563EB"
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
              stroke="#2563EB"
              strokeWidth="2"
            />
          )
        )}

        {/* X LABELS */}

        {labels.map(
          (label, index) => {
            const x =
              labels.length === 1
                ? leftPadding +
                  graphWidth / 2
                : leftPadding +
                  (index /
                    (labels.length -
                      1)) *
                    graphWidth;

            return (
              <SvgText
                key={`label-${index}`}
                x={x}
                y={
                  chartHeight - 8
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

      <Text style={styles.chartUnit}>
        Unit: {unit}
      </Text>
    </View>
  );
}

// =====================================================
// ROOM ROW
// =====================================================

function RoomRow({
  room,
  temperature,
  humidity,
  gas,
  status,
}) {
  const danger = status !== "Healthy";

  return (
    <View style={styles.roomRow}>
      <View style={styles.roomInfo}>
        <Ionicons
          name="cube-outline"
          size={22}
          color="#374151"
        />

        <Text style={styles.roomName}>
          {room}
        </Text>
      </View>

      <View style={styles.roomMetrics}>
        <Text style={styles.roomMetric}>
          {temperature.toFixed(1)}°C
        </Text>

        <Text style={styles.roomMetric}>
          {humidity.toFixed(0)}%
        </Text>

        <Text style={styles.roomMetric}>
          {gas.toFixed(0)}
        </Text>
      </View>

      <View style={styles.roomStatus}>
        <View
          style={[
            styles.statusDot,
            danger &&
              styles.dangerDot,
          ]}
        />

        <Text
          style={[
            styles.roomStatusText,
            danger &&
              styles.dangerText,
          ]}
        >
          {status}
        </Text>
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
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginTop: 10,
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
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  calendarIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#EAF6EC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  dateLabel: {
    fontSize: 11,
    color: "#6B7280",
  },

  dateValue: {
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  monthTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  monthButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F5F6F8",
    alignItems: "center",
    justifyContent: "center",
  },

  weekHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },

  weekText: {
    width: "14.285%",
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
    color: "#6B7280",
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  calendarDay: {
    width: "14.285%",
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  calendarDaySelected: {
    backgroundColor: "#2E7D32",
    borderRadius: 12,
  },

  calendarDayText: {
    fontSize: 13,
    color: "#374151",
  },

  calendarDayTextSelected: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  todayText: {
    color: "#2E7D32",
    fontWeight: "700",
  },

  // =====================================================
  // LOADING
  // =====================================================

  loadingContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    marginTop: 5,
  },

  loadingText: {
    color: "#6B7280",
    marginTop: 10,
    fontSize: 13,
  },

  // =====================================================
  // NO DATA
  // =====================================================

  noDataCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
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
    marginTop: 6,
    lineHeight: 18,
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
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  summaryLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 5,
  },

  summaryValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },

  goodText: {
    fontSize: 11,
    color: "#2E7D32",
    marginTop: 6,
    fontWeight: "600",
  },

  dangerText: {
    color: "#D32F2F",
  },

  // =====================================================
  // STORAGE HEALTH
  // =====================================================

  statusCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginTop: 6,
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
    fontSize: 12,
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
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },

  warningText: {
    color: "#D32F2F",
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
    fontSize: 12,
    color: "#6B7280",
  },

  progressValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2E7D32",
  },

  // =====================================================
  // CHART
  // =====================================================

  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  chartHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  chartTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  chartSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  chartIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F5F6F8",
    alignItems: "center",
    justifyContent: "center",
  },

  chartContainer: {
    alignItems: "center",
  },

  chartUnit: {
    fontSize: 10,
    color: "#9CA3AF",
    alignSelf: "flex-end",
    marginRight: 5,
    marginTop: -3,
  },

  minMaxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#F0F1F3",
    marginTop: 8,
    paddingTop: 10,
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
    backgroundColor: "#F4F8FF",
    borderRadius: 10,
    padding: 11,
    marginTop: 12,
  },

  insightText: {
    flex: 1,
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 18,
    marginLeft: 8,
  },

  // =====================================================
  // ROOM
  // =====================================================

  roomCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  roomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  roomRow: {
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: "#F0F1F3",
  },

  roomInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },

  roomName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginLeft: 7,
  },

  roomMetrics: {
    flexDirection: "row",
    gap: 15,
    marginLeft: 29,
  },

  roomMetric: {
    fontSize: 11,
    color: "#6B7280",
  },

  roomStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 29,
    marginTop: 5,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: "#2E7D32",
    marginRight: 5,
  },

  dangerDot: {
    backgroundColor: "#D32F2F",
  },

  roomStatusText: {
    fontSize: 11,
    color: "#2E7D32",
    fontWeight: "600",
  },

  emptyRoomText: {
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 10,
  },
});
