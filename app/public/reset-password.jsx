import { Ionicons } from "@expo/vector-icons";
import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useState } from "react";

import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const API_URL =
  "http://192.168.43.23:5000";

export default function ResetPassword() {

  const router = useRouter();

  const {
    verificationId,
    email,
  } = useLocalSearchParams();

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);


  // =====================================================
  // RESET PASSWORD
  // =====================================================

  const handleResetPassword = async () => {

    if (!verificationId) {

      Alert.alert(
        "Verification Error",
        "Verification session is missing. Please start again."
      );

      return;
    }


    if (!newPassword.trim()) {

      Alert.alert(
        "Password Required",
        "Please enter your new password."
      );

      return;
    }


    if (newPassword.length < 6) {

      Alert.alert(
        "Weak Password",
        "Password must contain at least 6 characters."
      );

      return;
    }


    if (!confirmPassword.trim()) {

      Alert.alert(
        "Confirm Password",
        "Please confirm your new password."
      );

      return;
    }


    if (newPassword !== confirmPassword) {

      Alert.alert(
        "Password Mismatch",
        "New password and confirm password do not match."
      );

      return;
    }


    try {

      setLoading(true);

      console.log(
        "RESET PASSWORD REQUEST:",
        {
          verificationId,
          email,
        }
      );


      const response = await fetch(
        `${API_URL}/api/auth/reset-password`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            verificationId,
            newPassword,
            confirmPassword,
          }),
        }
      );


      const data =
        await response.json();


      console.log(
        "RESET PASSWORD RESPONSE:",
        data
      );


      if (
        !response.ok ||
        !data.success
      ) {

        Alert.alert(
          "Reset Failed",
          data.message ||
            "Unable to reset your password."
        );

        return;
      }


      // =================================================
      // SUCCESS
      // =================================================

      Alert.alert(
        "Password Changed",
        "Your password has been changed successfully.",
        [
          {
            text: "Login",
            onPress: () => {

              router.replace(
                "/public/login"
              );

            },
          },
        ]
      );

    } catch (error) {

      console.error(
        "RESET PASSWORD ERROR:",
        error
      );

      Alert.alert(
        "Connection Error",
        "Unable to connect to the server."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >

      <View style={styles.content}>

        {/* ICON */}

        <View style={styles.iconContainer}>

          <Ionicons
            name="lock-open-outline"
            size={34}
            color="#2E7D32"
          />

        </View>


        {/* TITLE */}

        <Text style={styles.title}>
          Reset Password
        </Text>


        {/* SUBTITLE */}

        <Text style={styles.subtitle}>
          Create a new password for your account.
        </Text>


        {/* EMAIL */}

        {email ? (

          <Text style={styles.emailText}>
            {email}
          </Text>

        ) : null}


        {/* NEW PASSWORD */}

        <View style={styles.inputContainer}>

          <Ionicons
            name="lock-closed-outline"
            size={21}
            color="#777"
          />

          <TextInput
            style={styles.input}
            placeholder="New password"
            placeholderTextColor="#999"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />

          <Pressable
            onPress={() =>
              setShowPassword(
                !showPassword
              )
            }
          >

            <Ionicons
              name={
                showPassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={22}
              color="#777"
            />

          </Pressable>

        </View>


        {/* CONFIRM PASSWORD */}

        <View style={styles.inputContainer}>

          <Ionicons
            name="lock-closed-outline"
            size={21}
            color="#777"
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="#999"
            value={confirmPassword}
            onChangeText={
              setConfirmPassword
            }
            secureTextEntry={
              !showConfirmPassword
            }
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />

          <Pressable
            onPress={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >

            <Ionicons
              name={
                showConfirmPassword
                  ? "eye-off-outline"
                  : "eye-outline"
              }
              size={22}
              color="#777"
            />

          </Pressable>

        </View>


        {/* PASSWORD INFO */}

        <Text style={styles.passwordInfo}>
          Password must contain at least 6 characters.
        </Text>


        {/* RESET BUTTON */}

        <Pressable
          style={[
            styles.resetButton,
            loading &&
              styles.disabledButton,
          ]}
          onPress={
            handleResetPassword
          }
          disabled={loading}
        >

          {loading ? (

            <ActivityIndicator
              size="small"
              color="#FFFFFF"
            />

          ) : (

            <>
              <Text style={styles.resetText}>
                Change Password
              </Text>

              <Ionicons
                name="checkmark-circle-outline"
                size={21}
                color="#FFFFFF"
              />
            </>

          )}

        </Pressable>


        {/* BACK */}

        <Pressable
          onPress={() =>
            router.back()
          }
          style={styles.backButton}
          disabled={loading}
        >

          <Text style={styles.backText}>
            Back
          </Text>

        </Pressable>

      </View>

    </KeyboardAvoidingView>

  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7F5",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  iconContainer: {
    width: 75,
    height: 75,
    borderRadius: 23,
    backgroundColor: "#EAF6EC",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 22,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1B5E20",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "#777",
    textAlign: "center",
    marginTop: 9,
  },

  emailText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E7D32",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  inputContainer: {
    height: 54,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE8DC",
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 12,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    marginLeft: 10,
  },

  passwordInfo: {
    fontSize: 12,
    color: "#777",
    marginTop: 8,
    marginLeft: 4,
  },

  resetButton: {
    height: 54,
    backgroundColor: "#2E7D32",
    borderRadius: 13,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  disabledButton: {
    opacity: 0.7,
  },

  resetText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  backButton: {
    alignItems: "center",
    marginTop: 20,
  },

  backText: {
    color: "#2E7D32",
    fontSize: 14,
    fontWeight: "700",
  },

});