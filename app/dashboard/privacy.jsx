import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { useTheme } from "../../context/ThemeContext";


export default function PrivacyScreen() {
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
          Privacy Policy
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

          {/* Privacy policy content will go here */}
<Text style={[styles.heading, { color: theme.text }]}>
  1. Information We Collect
</Text>

<Text style={[styles.paragraph, { color: theme.subText }]}>
  VineSafe collects only the information required to provide storage monitoring
  services. This may include your name, email address, account details, and
  storage sensor data such as temperature, humidity, and door status.
</Text>

<Text style={[styles.heading, { color: theme.text }]}>
  2. How We Use Your Information
</Text>

<Text style={[styles.paragraph, { color: theme.subText }]}>
  Your information is used to provide real-time monitoring, send alerts,
  improve application performance, and enhance your overall experience with
  VineSafe.
</Text>

<Text style={[styles.heading, { color: theme.text }]}>
  3. Data Security
</Text>

<Text style={[styles.paragraph, { color: theme.subText }]}>
  We take appropriate security measures to protect your personal information.
  Data is securely stored using Firebase services and is accessible only to
  authorized users.
</Text>

<Text style={[styles.heading, { color: theme.text }]}>
  4. Third-Party Services
</Text>

<Text style={[styles.paragraph, { color: theme.subText }]}>
  VineSafe uses trusted third-party services such as Firebase Authentication
  and Firebase Firestore to manage user accounts and securely store application
  data.
</Text>

<Text style={[styles.heading, { color: theme.text }]}>
  5. Your Rights
</Text>

<Text style={[styles.paragraph, { color: theme.subText }]}>
  You may update your account information, request deletion of your account,
  or contact us regarding your personal data at any time.
</Text>

<Text style={[styles.heading, { color: theme.text }]}>
  6. Contact Us
</Text>

<Text style={[styles.paragraph, { color: theme.subText }]}>
  If you have any questions about this Privacy Policy, please contact the
  VineSafe support team.
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
