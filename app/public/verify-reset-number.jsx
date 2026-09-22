// // import { Ionicons } from "@expo/vector-icons";
// // import { useLocalSearchParams, useRouter } from "expo-router";
// // import { useState } from "react";
// // import {
// //   ActivityIndicator,
// //   Alert,
// //   Pressable,
// //   StyleSheet,
// //   Text,
// //   View,
// // } from "react-native";

// // const API_URL = "http://10.147.4.54:5000";

// // export default function VerifyResetNumber() {
// //   const router = useRouter();

// //   const { verificationId, email } = useLocalSearchParams();

// //   const [selectedNumber, setSelectedNumber] = useState(null);
// //   const [loading, setLoading] = useState(false);

// //   // Temporary numbers shown to the user.
// //   // We will replace this with the numbers returned by the backend.
// //   const { verificationId, email, numbers: numbersParam } =
// //   useLocalSearchParams();

// // const numbers = numbersParam
// //   ? JSON.parse(numbersParam)
// //   : [];

// //   const handleVerify = async () => {
// //     if (selectedNumber === null) {
// //       Alert.alert(
// //         "Select Number",
// //         "Please select a number from your email."
// //       );
// //       return;
// //     }

// //     if (!verificationId) {
// //       Alert.alert(
// //         "Error",
// //         "Verification session is missing. Please try again."
// //       );
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       const response = await fetch(
// //         `${API_URL}/api/auth/verify-reset-number`,
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({
// //             verificationId,
// //             selectedNumber,
// //           }),
// //         }
// //       );

// //       const data = await response.json();

// //       console.log("VERIFY RESPONSE:", data);

// //       if (!response.ok || !data.success) {
// //         Alert.alert(
// //           "Verification Failed",
// //           data.message || "Incorrect number."
// //         );
// //         return;
// //       }

// //       Alert.alert(
// //         "Verified",
// //         "Email verification successful.",
// //         [
// //           {
// //             text: "Continue",
// //             onPress: () => {
// //               router.push({
// //                 pathname: "/public/reset-password",
// //                 params: {
// //                   verificationId,
// //                   email,
// //                 },
// //               });
// //             },
// //           },
// //         ]
// //       );
// //     } catch (error) {
// //       console.error("VERIFY ERROR:", error);

// //       Alert.alert(
// //         "Connection Error",
// //         "Unable to connect to the server."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.content}>

// //         <View style={styles.iconContainer}>
// //           <Ionicons
// //             name="mail-open-outline"
// //             size={34}
// //             color="#2E7D32"
// //           />
// //         </View>

// //         <Text style={styles.title}>
// //           Verify Your Email
// //         </Text>

// //         <Text style={styles.subtitle}>
// //           We sent 4 numbers to your email.
// //           {"\n"}
// //           Select the correct number to continue.
// //         </Text>

// //         {email ? (
// //           <Text style={styles.emailText}>
// //             {email}
// //           </Text>
// //         ) : null}

// //         <View style={styles.numberContainer}>
// //           {numbers.map((number) => (
// //             <Pressable
// //               key={number}
// //               style={[
// //                 styles.numberButton,
// //                 selectedNumber === number &&
// //                   styles.selectedNumber,
// //               ]}
// //               onPress={() => setSelectedNumber(number)}
// //             >
// //               <Text
// //                 style={[
// //                   styles.numberText,
// //                   selectedNumber === number &&
// //                     styles.selectedNumberText,
// //                 ]}
// //               >
// //                 {number}
// //               </Text>
// //             </Pressable>
// //           ))}
// //         </View>

// //         <Pressable
// //           style={[
// //             styles.verifyButton,
// //             loading && styles.disabledButton,
// //           ]}
// //           onPress={handleVerify}
// //           disabled={loading}
// //         >
// //           {loading ? (
// //             <ActivityIndicator
// //               color="#FFFFFF"
// //             />
// //           ) : (
// //             <>
// //               <Text style={styles.verifyText}>
// //                 Verify
// //               </Text>

// //               <Ionicons
// //                 name="checkmark-circle-outline"
// //                 size={21}
// //                 color="#FFFFFF"
// //               />
// //             </>
// //           )}
// //         </Pressable>

// //         <Pressable
// //           onPress={() => router.back()}
// //           style={styles.backButton}
// //         >
// //           <Text style={styles.backText}>
// //             Back
// //           </Text>
// //         </Pressable>

// //       </View>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#F5F7F5",
// //   },

// //   content: {
// //     flex: 1,
// //     justifyContent: "center",
// //     paddingHorizontal: 25,
// //   },

// //   iconContainer: {
// //     width: 75,
// //     height: 75,
// //     borderRadius: 23,
// //     backgroundColor: "#EAF6EC",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     alignSelf: "center",
// //     marginBottom: 22,
// //   },

// //   title: {
// //     fontSize: 28,
// //     fontWeight: "800",
// //     color: "#1B5E20",
// //     textAlign: "center",
// //   },

// //   subtitle: {
// //     fontSize: 14,
// //     lineHeight: 21,
// //     color: "#777",
// //     textAlign: "center",
// //     marginTop: 9,
// //   },

// //   emailText: {
// //     fontSize: 14,
// //     fontWeight: "600",
// //     color: "#2E7D32",
// //     textAlign: "center",
// //     marginTop: 12,
// //   },

// //   numberContainer: {
// //     marginTop: 30,
// //     gap: 12,
// //   },

// //   numberButton: {
// //     height: 54,
// //     backgroundColor: "#FFFFFF",
// //     borderWidth: 1,
// //     borderColor: "#DCE8DC",
// //     borderRadius: 13,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },

// //   selectedNumber: {
// //     backgroundColor: "#EAF6EC",
// //     borderColor: "#2E7D32",
// //     borderWidth: 2,
// //   },

// //   numberText: {
// //     fontSize: 18,
// //     fontWeight: "700",
// //     color: "#333",
// //   },

// //   selectedNumberText: {
// //     color: "#2E7D32",
// //   },

// //   verifyButton: {
// //     height: 54,
// //     backgroundColor: "#2E7D32",
// //     borderRadius: 13,
// //     marginTop: 20,
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     gap: 8,
// //   },

// //   disabledButton: {
// //     opacity: 0.7,
// //   },

// //   verifyText: {
// //     color: "#FFFFFF",
// //     fontSize: 16,
// //     fontWeight: "800",
// //   },

// //   backButton: {
// //     alignItems: "center",
// //     marginTop: 20,
// //   },

// //   backText: {
// //     color: "#2E7D32",
// //     fontSize: 14,
// //     fontWeight: "700",
// //   },
// // });





// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
// import { useState } from "react";

// import {
//   ActivityIndicator,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";

// const API_URL = "http://10.147.4.54:5000";

// export default function ForgotPassword() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleContinue = async () => {
//     const trimmedEmail = email.trim().toLowerCase();

//     // ===============================
//     // VALIDATION
//     // ===============================

//     if (!trimmedEmail) {
//       Alert.alert(
//         "Required",
//         "Please enter your email address."
//       );
//       return;
//     }

//     if (!trimmedEmail.includes("@")) {
//       Alert.alert(
//         "Invalid Email",
//         "Please enter a valid email address."
//       );
//       return;
//     }

//     try {
//       setLoading(true);

//       console.log(
//         "Sending forgot password request..."
//       );

//       console.log(
//         "Email:",
//         trimmedEmail
//       );

//       // ===============================
//       // SEND REQUEST TO BACKEND
//       // ===============================

//       const response = await fetch(
//         `${API_URL}/api/auth/forgot-password`,
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",
//           },

//           body: JSON.stringify({
//             email: trimmedEmail,
//           }),
//         }
//       );

//       // ===============================
//       // READ RESPONSE
//       // ===============================

//       const data = await response.json();

//       console.log(
//         "FORGOT PASSWORD RESPONSE:",
//         data
//       );

//       // ===============================
//       // BACKEND ERROR
//       // ===============================

//       if (!response.ok || !data.success) {
//         Alert.alert(
//           "Password Reset",
//           data.message ||
//             "Unable to send verification email."
//         );

//         return;
//       }

//       // ===============================
//       // CHECK VERIFICATION ID
//       // ===============================

//       if (!data.verificationId) {
//         Alert.alert(
//           "Error",
//           "Verification session was not created."
//         );

//         return;
//       }

//       // ===============================
//       // CHECK NUMBERS
//       // ===============================

//       if (
//         !data.numbers ||
//         !Array.isArray(data.numbers) ||
//         data.numbers.length === 0
//       ) {
//         Alert.alert(
//           "Error",
//           "Verification numbers were not received from the server."
//         );

//         return;
//       }

//       // ===============================
//       // SUCCESS
//       // ===============================

//       Alert.alert(
//         "Check Your Email",
//         "We sent 4 numbers to your registered email address.",
//         [
//           {
//             text: "Continue",

//             onPress: () => {
//               router.push({
//                 pathname:
//                   "/public/verify-reset-number",

//                 params: {
//                   verificationId:
//                     data.verificationId,

//                   email:
//                     trimmedEmail,

//                   numbers:
//                     JSON.stringify(
//                       data.numbers
//                     ),
//                 },
//               });
//             },
//           },
//         ]
//       );
//     } catch (error) {
//       console.error(
//         "FORGOT PASSWORD ERROR:",
//         error
//       );

//       Alert.alert(
//         "Connection Error",
//         "Unable to connect to the server. Please make sure the backend is running."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===============================
//   // UI
//   // ===============================

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={
//         Platform.OS === "ios"
//           ? "padding"
//           : undefined
//       }
//     >
//       <View style={styles.content}>

//         {/* ICON */}

//         <View style={styles.iconContainer}>
//           <Ionicons
//             name="lock-closed-outline"
//             size={34}
//             color="#2E7D32"
//           />
//         </View>

//         {/* TITLE */}

//         <Text style={styles.title}>
//           Forgot Password?
//         </Text>

//         {/* SUBTITLE */}

//         <Text style={styles.subtitle}>
//           Enter your registered email address
//           {"\n"}
//           to reset your password.
//         </Text>

//         {/* EMAIL INPUT */}

//         <View style={styles.inputContainer}>

//           <Ionicons
//             name="mail-outline"
//             size={21}
//             color="#777"
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Email address"
//             placeholderTextColor="#999"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             autoCapitalize="none"
//             autoCorrect={false}
//             editable={!loading}
//           />

//         </View>

//         {/* CONTINUE BUTTON */}

//         <Pressable
//           style={[
//             styles.continueButton,
//             loading &&
//               styles.disabledButton,
//           ]}
//           onPress={handleContinue}
//           disabled={loading}
//         >

//           {loading ? (
//             <>
//               <ActivityIndicator
//                 size="small"
//                 color="#FFFFFF"
//               />

//               <Text
//                 style={styles.continueText}
//               >
//                 Sending...
//               </Text>
//             </>
//           ) : (
//             <>
//               <Text
//                 style={styles.continueText}
//               >
//                 Continue
//               </Text>

//               <Ionicons
//                 name="arrow-forward-outline"
//                 size={20}
//                 color="#FFFFFF"
//               />
//             </>
//           )}

//         </Pressable>

//         {/* LOGIN */}

//         <View style={styles.loginRow}>

//           <Text style={styles.loginText}>
//             Remember your password?
//           </Text>

//           <Pressable
//             onPress={() => {
//               router.back();
//             }}
//             disabled={loading}
//           >
//             <Text style={styles.loginLink}>
//               Login
//             </Text>
//           </Pressable>

//         </View>

//       </View>
//     </KeyboardAvoidingView>
//   );
// }

// // =====================================================
// // STYLES
// // =====================================================

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F7F5",
//   },

//   content: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 25,
//   },

//   iconContainer: {
//     width: 75,
//     height: 75,
//     borderRadius: 23,
//     backgroundColor: "#EAF6EC",
//     alignItems: "center",
//     justifyContent: "center",
//     alignSelf: "center",
//     marginBottom: 22,
//   },

//   title: {
//     fontSize: 29,
//     fontWeight: "800",
//     color: "#1B5E20",
//     textAlign: "center",
//   },

//   subtitle: {
//     fontSize: 14,
//     lineHeight: 21,
//     color: "#777",
//     textAlign: "center",
//     marginTop: 9,
//     marginBottom: 28,
//   },

//   inputContainer: {
//     height: 54,
//     backgroundColor: "#FFFFFF",
//     borderWidth: 1,
//     borderColor: "#DCE8DC",
//     borderRadius: 13,
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 15,
//   },

//   input: {
//     flex: 1,
//     fontSize: 15,
//     color: "#333",
//     marginLeft: 10,
//   },

//   continueButton: {
//     height: 54,
//     backgroundColor: "#2E7D32",
//     borderRadius: 13,
//     marginTop: 17,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//   },

//   disabledButton: {
//     opacity: 0.7,
//   },

//   continueText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "800",
//   },

//   loginRow: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 24,
//   },

//   loginText: {
//     color: "#777",
//     fontSize: 13,
//   },

//   loginLink: {
//     color: "#2E7D32",
//     fontSize: 13,
//     fontWeight: "800",
//     marginLeft: 5,
//   },
// });
















import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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

const API_URL = "http://10.147.4.54:5000";

export default function ResetPassword() {
  const router = useRouter();

  const { verificationId, email } = useLocalSearchParams();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    // -----------------------------
    // Check verification ID
    // -----------------------------
    if (!verificationId) {
      Alert.alert(
        "Verification Error",
        "Verification session is missing. Please start again."
      );
      return;
    }

    // -----------------------------
    // Check password
    // -----------------------------
    if (!newPassword.trim()) {
      Alert.alert(
        "Password Required",
        "Please enter your new password."
      );
      return;
    }

    // -----------------------------
    // Password length
    // -----------------------------
    if (newPassword.length < 6) {
      Alert.alert(
        "Weak Password",
        "Password must contain at least 6 characters."
      );
      return;
    }

    // -----------------------------
    // Confirm password
    // -----------------------------
    if (!confirmPassword.trim()) {
      Alert.alert(
        "Confirm Password",
        "Please confirm your new password."
      );
      return;
    }

    // -----------------------------
    // Match passwords
    // -----------------------------
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
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            verificationId,
            newPassword,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "RESET PASSWORD RESPONSE:",
        data
      );

      // -----------------------------
      // Backend error
      // -----------------------------
      if (!response.ok || !data.success) {
        Alert.alert(
          "Reset Failed",
          data.message ||
            "Unable to reset your password."
        );

        return;
      }

      // -----------------------------
      // Success
      // -----------------------------
      Alert.alert(
        "Password Changed",
        "Your password has been changed successfully.",
        [
          {
            text: "Login",
            onPress: () => {
              router.replace("/public/login");
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
        "Unable to connect to the server. Please check that your backend is running."
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
              setShowPassword(!showPassword)
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
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
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
            loading && styles.disabledButton,
          ]}
          onPress={handleResetPassword}
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
          onPress={() => router.back()}
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