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

export default function Analytics() {
  const [period, setPeriod] = useState("Weekly");

  // STATIC DATA FOR POC
  const analyticsData = {
    Daily: {
      temperature: [23, 24, 25, 24, 26, 25, 24],
      humidity: [62, 64, 67, 65, 68, 66, 63],
      gas: [280, 310, 295, 330, 350, 320, 300],
      labels: ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM", "12AM"],
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

  const currentData = analyticsData[period];

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
          Storage environment analysis
        </Text>

        {/* PERIOD SELECTOR */}

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

        {/* SUMMARY CARDS */}

        <View style={styles.summaryGrid}>
          <SummaryCard
            icon="thermometer-outline"
            iconColor="#E53935"
            iconBackground="#FDECEC"
            label="Avg. Temperature"
            value="24.8°C"
            status="● Normal"
          />

          <SummaryCard
            icon="water-outline"
            iconColor="#1976D2"
            iconBackground="#EAF3FF"
            label="Avg. Humidity"
            value="65%"
            status="● Normal"
          />

          <SummaryCard
            icon="flask-outline"
            iconColor="#F57C00"
            iconBackground="#FFF3E5"
            label="Avg. Gas Level"
            value="315 ppm"
            status="● Safe"
          />

          <SummaryCard
            icon="cube-outline"
            iconColor="#2E7D32"
            iconBackground="#EAF6EC"
            label="Storage Used"
            value="78%"
            status="● Optimal"
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
                Overall environmental condition
              </Text>
            </View>

            <View style={styles.healthBadge}>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color="#2E7D32"
              />

              <Text style={styles.healthText}>
                Healthy
              </Text>
            </View>
          </View>

          <View style={styles.progressBackground}>
            <View style={styles.progressFill} />
          </View>

          <View style={styles.progressBottom}>
            <Text style={styles.progressLabel}>
              Overall Score
            </Text>

            <Text style={styles.progressValue}>
              92%
            </Text>
          </View>
        </View>

        {/* TEMPERATURE */}

        <AnalysisChart
          title="Temperature Trend"
          subtitle={`${period} temperature analysis`}
          icon="thermometer-outline"
          iconColor="#E53935"
          values={currentData.temperature}
          labels={currentData.labels}
          unit="°C"
          insight="Temperature remained within the recommended storage range."
        />

        {/* HUMIDITY */}

        <AnalysisChart
          title="Humidity Trend"
          subtitle={`${period} humidity analysis`}
          icon="water-outline"
          iconColor="#1976D2"
          values={currentData.humidity}
          labels={currentData.labels}
          unit="%"
          insight="Humidity levels are stable and suitable for storage."
        />

        {/* GAS */}

        <AnalysisChart
          title="Gas Level Trend"
          subtitle={`${period} gas analysis`}
          icon="flask-outline"
          iconColor="#F57C00"
          values={currentData.gas}
          labels={currentData.labels}
          unit="ppm"
          insight="Gas levels are currently below the critical threshold."
          insightIcon="shield-checkmark-outline"
          insightColor="#2E7D32"
        />

        {/* ROOM ANALYSIS */}

        <View style={styles.roomCard}>
          <View style={styles.roomHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Room Analysis
              </Text>

              <Text style={styles.sectionSubtitle}>
                Current storage room performance
              </Text>
            </View>

            <Ionicons
              name="business-outline"
              size={25}
              color="#374151"
            />
          </View>

          <RoomRow
            room="Room 01"
            usage="85%"
            status="Healthy"
          />

          <RoomRow
            room="Room 02"
            usage="72%"
            status="Healthy"
          />

          <RoomRow
            room="Room 03"
            usage="78%"
            status="Healthy"
          />
        </View>

        {/* ALERT SUMMARY */}

        
      </ScrollView>
    </View>
  );
}

/* =====================================================
   SUMMARY CARD
===================================================== */

function SummaryCard({
  icon,
  iconColor,
  iconBackground,
  label,
  value,
  status,
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

      <Text style={styles.goodText}>
        {status}
      </Text>
    </View>
  );
}

/* =====================================================
   ANALYSIS CHART
===================================================== */

function AnalysisChart({
  title,
  subtitle,
  icon,
  iconColor,
  values,
  labels,
  unit,
  insight,
  insightIcon = "information-circle-outline",
  insightColor = "#1976D2",
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

      <LineChart
        values={values}
        labels={labels}
        unit={unit}
      />

      <View style={styles.insightBox}>
        <Ionicons
          name={insightIcon}
          size={20}
          color={insightColor}
        />

        <Text style={styles.insightText}>
          {insight}
        </Text>
      </View>
    </View>
  );
}

/* =====================================================
   LINE CHART
===================================================== */

function LineChart({ values, labels, unit }) {
  const chartWidth = SCREEN_WIDTH - 72;
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
    Math.round(minValue + range * 0.66),
    Math.round(minValue + range * 0.33),
    minValue,
  ];

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
        {/* GRID LINES */}

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
              x2={chartWidth - rightPadding}
              y2={y}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          );
        })}

        {/* Y AXIS VALUES */}

        {yValues.map((value, index) => {
          const y =
            topPadding +
            (index / (yValues.length - 1)) *
              graphHeight;

          return (
            <SvgText
              key={`y-${index}`}
              x="4"
              y={y + 4}
              fontSize="10"
              fill="#6B7280"
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
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* POINTS */}

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
              key={`label-${index}`}
              x={x}
              y={chartHeight - 8}
              fontSize="10"
              fill="#6B7280"
              textAnchor="middle"
            >
              {label}
            </SvgText>
          );
        })}
      </Svg>

      <Text style={styles.chartUnit}>
        Unit: {unit}
      </Text>
    </View>
  );
}

/* =====================================================
   ROOM ROW
===================================================== */

function RoomRow({
  room,
  usage,
  status,
}) {
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

      <View style={styles.roomUsage}>
        <Text style={styles.usageText}>
          {usage}
        </Text>

        <View style={styles.usageBar}>
          <View
            style={[
              styles.usageFill,
              {
                width: usage,
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.roomStatus}>
        <View style={styles.statusDot} />

        <Text style={styles.roomStatusText}>
          {status}
        </Text>
      </View>
    </View>
  );
}

/* =====================================================
   STYLES
===================================================== */

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
    marginBottom: 20,
  },

  /* PERIOD */

  periodContainer: {
    flexDirection: "row",
    backgroundColor: "#EDEFF2",
    borderRadius: 12,
    padding: 4,
    marginBottom: 18,
  },

  periodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 9,
  },

  periodButtonActive: {
    backgroundColor: "#FFFFFF",
  },

  periodText: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },

  periodTextActive: {
    color: "#111827",
    fontWeight: "700",
  },

  /* SUMMARY */

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

  /* STORAGE HEALTH */

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

  healthText: {
    color: "#2E7D32",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },

  progressBackground: {
    height: 9,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginTop: 18,
  },

  progressFill: {
    width: "92%",
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

  /* CHART */

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

  /* ROOM */

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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderTopWidth: 1,
    borderTopColor: "#F0F1F3",
  },

  roomInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: "30%",
  },

  roomName: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    marginLeft: 7,
  },

  roomUsage: {
    width: "35%",
  },

  usageText: {
    fontSize: 11,
    color: "#6B7280",
    marginBottom: 4,
  },

  usageBar: {
    height: 5,
    backgroundColor: "#E5E7EB",
    borderRadius: 5,
    width: "85%",
  },

  usageFill: {
    height: "100%",
    backgroundColor: "#2E7D32",
    borderRadius: 5,
  },

  roomStatus: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: "#2E7D32",
    marginRight: 5,
  },

  roomStatusText: {
    fontSize: 11,
    color: "#2E7D32",
    fontWeight: "600",
  },

  /* ALERT */

  alertCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },

  alertIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#FFF3E5",
    alignItems: "center",
    justifyContent: "center",
  },

  alertContent: {
    flex: 1,
    marginLeft: 12,
  },

  alertTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  alertSubtitle: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 4,
  },

  alertNumber: {
    fontSize: 26,
    fontWeight: "700",
    color: "#F57C00",
  },
});