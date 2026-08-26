
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../../context/LanguageContext";
import { useTheme } from "../../context/ThemeContext";



const LANGUAGES = [
  { name: "English", code: "en" },
  { name: "தமிழ்", code: "ta" },
  { name: "हिन्दी", code: "hi" },
];

// Shared row shell used by both SettingRow and SwitchRow so spacing/theme stay in sync
function RowShell({ icon, title, subtitle, onPress, rightComponent }) {
  const { theme } = useTheme();
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      style={styles.row}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.leftContainer}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: theme.iconBg },
          ]}
        >
          <Ionicons name={icon} size={22} color={theme.primary} />
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.rowTitle, { color: theme.text }]}>
            {title}
          </Text>
          <Text style={[styles.rowSubtitle, { color: theme.subText }]}>
            {subtitle}
          </Text>
        </View>
      </View>

      {rightComponent ? (
        rightComponent
      ) : (
        <Ionicons name="chevron-forward" size={20} color={theme.subText} />
      )}
    </Wrapper>
  );
}
function SettingRow({ icon, title, subtitle, onPress, theme }) {
  return (
    <RowShell
      icon={icon}
      title={title}
      subtitle={subtitle}
      theme={theme}
      onPress={onPress}
    />
  );
}

function SwitchRow({ icon, title, subtitle, value, onValueChange, theme }) {
  return (
    <RowShell
      icon={icon}
      title={title}
      subtitle={subtitle}
      theme={theme}
      rightComponent={
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: theme.switchTrackOff, true: theme.switchTrackOn }}
          thumbColor={value ? theme.primary : theme.switchThumbOff}
        />
      }
    />
  );
}

function Section({ title, theme, children }) {
  return (
    <>
      <Text style={[styles.sectionTitle, { color: theme.subText }]}>
        {title}
      </Text>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderWidth: theme.darkMode ? 1 : 0,
            borderColor: theme.darkMode ? "#2A3A45" : "transparent",
            shadowOpacity: theme.darkMode ? 0 : 0.06,
            elevation: theme.darkMode ? 0 : 3,
          },
        ]}
      >
        {children}
      </View>
    </>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { darkMode, setDarkMode, theme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  const [pushNotification, setPushNotification] = useState(true);
  const [tempAlert, setTempAlert] = useState(true);
  const [humidityAlert, setHumidityAlert] = useState(true);
  const [doorAlert, setDoorAlert] = useState(false);


  const [languageModalVisible, setLanguageModalVisible] = useState(false);


  return (
    <LinearGradient
      colors={[theme.background, theme.background2]}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={[styles.header, { color: theme.text }]}>
          {t("settings")}
        </Text>

        <Section title={t("account")} theme={theme}>
          <SettingRow
            icon="person-outline"
            title={t("profile")}
            subtitle={t("viewProfile")}
            theme={theme}
            onPress={() => router.push("/dashboard/profile")}
          />
          <SettingRow
            icon="lock-closed-outline"
            title={t("changePassword")}
            subtitle={t("updatePassword")}
            theme={theme}
            onPress={() => {}}
          />
        </Section>

        <Section title={t("notifications")} theme={theme}>
          <SwitchRow
            icon="notifications-outline"
            title={t("pushNotifications")}
            subtitle={t("receiveAlerts")}
            value={pushNotification}
            onValueChange={setPushNotification}
            theme={theme}
          />
          <SwitchRow
            icon="thermometer-outline"
            title={t("temperatureAlerts")}
            subtitle={t("temperatureAlertsDesc")}
            value={tempAlert}
            onValueChange={setTempAlert}
            theme={theme}
          />
          <SwitchRow
            icon="water-outline"
            title={t("humidityAlerts")}
            subtitle={t("humidityAlertsDesc")}
            value={humidityAlert}
            onValueChange={setHumidityAlert}
            theme={theme}
          />
          <SwitchRow
            icon="lock-open-outline"
            title={t("doorAlerts")}
            subtitle={t("doorAlertsDesc")}
            value={doorAlert}
            onValueChange={setDoorAlert}
            theme={theme}
          />
        </Section>

        <Section title={t("appearance")} theme={theme}>
          <SwitchRow
            icon="moon-outline"
            title={t("darkMode")}
            subtitle={t("useDarkTheme")}
            value={darkMode}
            onValueChange={setDarkMode}
            theme={theme}
          />
          <SettingRow
            icon="language-outline"
            title={t("language")}
            subtitle={
              language === "en"
                ? "English"
                : language === "ta"
                ? "தமிழ்"
                : "हिन्दी"
            }
            theme={theme}
            onPress={() => setLanguageModalVisible(true)}
          />
          <SettingRow
            icon="thermometer-outline"
            title={t("temperatureUnit")}
            subtitle={t("celsius")}
            theme={theme}
            onPress={() => {}}
          />
        </Section>

        <Section title={t("about")} theme={theme}>
          <SettingRow
            icon="information-circle-outline"
            title={t("aboutApp")}
            subtitle={t("learnMore")}
            theme={theme}
            onPress={() => router.push("/public/about")}
          />
          <SettingRow
  icon="shield-checkmark-outline"
  title={t("privacyPolicy")}
  subtitle={t("readPrivacyPolicy")}
  theme={theme}
  // onPress={() => router.push("/dashboard/privacy")}

  onPress={() => {
  console.log("Privacy pressed");
  router.push("/dashboard/privacy");
}}
/>
          <SettingRow
  icon="document-text-outline"
  title="Terms & Conditions"
  subtitle="View terms of service"
  onPress={() => router.push("/dashboard/terms")}
/>
          <SettingRow
            icon="phone-portrait-outline"
            title={t("appVersion")}
            subtitle={t("versionNumber")}
            theme={theme}
            onPress={() => {}}
          />
        </Section>

        <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
          <Ionicons name="log-out-outline" size={22} color="#FFFFFF" />
          <Text style={styles.logoutText}>{t("logout")}</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={languageModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <TouchableOpacity
          style={[styles.modalOverlay, { backgroundColor: theme.modalOverlay }]}
          activeOpacity={1}
          onPress={() => setLanguageModalVisible(false)}
        >
          <View
            style={[styles.modalCard, { backgroundColor: theme.card }]}
            onStartShouldSetResponder={() => true}
          >
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {t("selectLanguage")}
            </Text>

            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={styles.modalRow}
                onPress={() => {
                  setLanguage(lang.code);
                  setLanguageModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.modalRowText,
                    {
                      color: lang.code === language ? theme.primary : theme.text,
                      fontWeight: lang.code === language ? "700" : "400",
                    },
                  ]}
                >
                  {lang.name}
                </Text>

                {lang.code === language && (
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color={theme.primary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
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

  header: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
    marginLeft: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  card: {
    borderRadius: 16,
    paddingVertical: 5,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  leftContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    flexShrink: 0,
  },

  textContainer: {
    flex: 1,
    flexShrink: 1,
  },

  rowTitle: {
    fontSize: 15,
    fontWeight: "700",
    flexWrap: "wrap",
  },

  rowSubtitle: {
    fontSize: 12,
    marginTop: 2,
    flexWrap: "wrap",
  },

  logoutButton: {
    backgroundColor: "#d32f2f",
    borderRadius: 15,
    height: 55,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginTop: 10,
    marginBottom: 40,
  },

  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  modalCard: {
    width: "100%",
    borderRadius: 16,
    padding: 20,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  modalRowText: {
    fontSize: 15,
    flex: 1,
    flexShrink: 1,
    marginRight: 10,
  },
});