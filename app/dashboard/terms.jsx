import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../context/ThemeContext";



export default function TermsScreen() {
  const { theme, darkMode } = useTheme();

  return (
    <LinearGradient
      colors={[theme.background, theme.background2]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>

        <Text
          style={[
            styles.title,
            { color: theme.text },
          ]}
        >
          Terms & Conditions
        </Text>

        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.card,
              borderWidth: darkMode ? 1 : 0,
              borderColor: darkMode ? "#FFFFFF" : "transparent",
            },
          ]}
        >

          {/* Terms content will go here */}
          <Text style={[styles.heading, { color: theme.text }]}>
  Acceptance of Terms
</Text>

<Text style={[styles.paragraph, { color: theme.subText }]}>
  By using the VineSafe application, you agree to comply with these Terms & Conditions. If you do not agree with any part of these terms, please discontinue using the application.
</Text>

<Text style={[styles.heading, { color: theme.text }]}>
  Use of the Application
</Text>

<Text style={[styles.paragraph, { color: theme.subText }]}>
  VineSafe is designed to monitor cold storage conditions such as temperature, humidity, and door status. The application should be used only for lawful purposes and in accordance with these terms.
</Text>

<Text style={[styles.heading, { color: theme.text }]}>
  User Responsibilities
</Text>

<Text style={[styles.paragraph, { color: theme.subText }]}>
  Users are responsible for maintaining the confidentiality of their account credentials and ensuring that the information provided is accurate. Any misuse of the application is strictly prohibited.
</Text>

<Text style={[styles.heading, { color: theme.text }]}>
  Data Accuracy
</Text>

<Text style={[styles.paragraph, { color: theme.subText }]}>
  VineSafe displays sensor data received from connected IoT devices. While we strive for accuracy, we cannot guarantee that all readings are error-free at all times.
</Text>

<Text style={[styles.heading, { color: theme.text }]}>
  Limitation of Liability
</Text>

<Text style={[styles.paragraph, { color: theme.subText }]}>
  VineSafe is not responsible for any financial loss, crop damage, equipment failure, or other damages resulting from incorrect sensor readings, network interruptions, or improper use of the application.
</Text>

<Text style={[styles.heading, { color: theme.text }]}>
  Changes to the Terms
</Text>

<Text style={[styles.paragraph, { color: theme.subText }]}>
  We reserve the right to update or modify these Terms & Conditions at any time. Continued use of the application after changes are made constitutes acceptance of the updated terms.
</Text>

<Text style={[styles.lastUpdated, { color: theme.primary }]}>
  Last Updated: August 2026
</Text>

        </View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 20,
  },

  card: {
    borderRadius: 16,
    padding: 20,
    elevation: 3,
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 15,
    marginBottom: 8,
  },

  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "justify",
  },

  lastUpdated: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 25,
    textAlign: "center",
  },
});