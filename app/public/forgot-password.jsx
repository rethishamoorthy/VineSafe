// import { Ionicons } from "@expo/vector-icons";
// import { useState } from "react";
// import {
//     Alert,
//     KeyboardAvoidingView,
//     Platform,
//     Pressable,
//     StyleSheet,
//     Text,
//     TextInput,
//     View,
// } from "react-native";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");

//   const handleContinue = () => {
//     const trimmedEmail = email.trim();

//     if (!trimmedEmail) {
//       Alert.alert("Required", "Please enter your email address.");
//       return;
//     }

//     if (!trimmedEmail.includes("@")) {
//       Alert.alert("Invalid Email", "Please enter a valid email address.");
//       return;
//     }

//     // Backend verification will be added in Step 2.
//     Alert.alert(
//       "Email Entered",
//       "Your email is ready for verification."
//     );
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
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

//         <Text style={styles.subtitle}>
//           Enter your registered email address
//           {"\n"}
//           to reset your password.
//         </Text>

//         {/* EMAIL */}
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
//           />
//         </View>

//         {/* CONTINUE BUTTON */}
//         <Pressable
//           style={styles.continueButton}
//           onPress={handleContinue}
//         >
//           <Text style={styles.continueText}>
//             Continue
//           </Text>

//           <Ionicons
//             name="arrow-forward-outline"
//             size={20}
//             color="#FFFFFF"
//           />
//         </Pressable>

//         {/* LOGIN */}
//         <View style={styles.loginRow}>
//           <Text style={styles.loginText}>
//             Remember your password?
//           </Text>

//           <Pressable
//             onPress={() => {
//               // Login navigation will be connected later.
//             }}
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







// import { Ionicons } from "@expo/vector-icons";
// import { useState } from "react";
// import {
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   Pressable,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   ActivityIndicator,
// } from "react-native";

// const API_URL = "http://192.168.43.23:5000";

// export default function ForgotPassword({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

// const handleContinue = async () => {
//   const trimmedEmail = email.trim().toLowerCase();

//   if (!trimmedEmail) {
//     Alert.alert("Required", "Please enter your email address.");
//     return;
//   }

//   if (!trimmedEmail.includes("@")) {
//     Alert.alert("Invalid Email", "Please enter a valid email address.");
//     return;
//   }

//   try {
//     const response = await fetch(
//       "http://192.168.43.23:5000/api/auth/forgot-password",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: trimmedEmail,
//         }),
//       }
//     );

//     const data = await response.json();

//     console.log("FORGOT PASSWORD RESPONSE:", data);

//     if (!response.ok || !data.success) {
//       Alert.alert(
//         "Password Reset",
//         data.message || "Unable to send verification email."
//       );
//       return;
//     }

//     Alert.alert(
//       "Check Your Email",
//       "We sent 4 numbers to your registered email address."
//     );

//     // NEXT STEP:
//     // Navigate to the verification-number screen.
//     // We will do this next.
    
//   } catch (error) {
//     console.error("FORGOT PASSWORD ERROR:", error);

//     Alert.alert(
//       "Connection Error",
//       "Unable to connect to the server."
//     );
//   }
// };

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

//         <Text style={styles.subtitle}>
//           Enter your registered email address
//           {"\n"}
//           to reset your password.
//         </Text>

//         {/* EMAIL */}
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
//             loading && styles.disabledButton,
//           ]}
//           onPress={handleContinue}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator
//               size="small"
//               color="#FFFFFF"
//             />
//           ) : (
//             <>
//               <Text style={styles.continueText}>
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
//               if (navigation) {
//                 navigation.goBack();
//               }
//             }}
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
import { useState } from "react";
import { useRouter } from "expo-router";
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

const API_URL = "http://192.168.43.23:5000";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
const router = useRouter();
  const handleContinue = async () => {
    const trimmedEmail = email.trim().toLowerCase();

    // ===============================
    // VALIDATION
    // ===============================

    if (!trimmedEmail) {
      Alert.alert(
        "Required",
        "Please enter your email address."
      );
      return;
    }

    if (!trimmedEmail.includes("@")) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    // ===============================
    // START LOADING
    // ===============================

    setLoading(true);

    try {
      console.log(
        "Sending forgot password request..."
      );

      console.log(
        "Email:",
        trimmedEmail
      );

      // ===============================
      // CALL BACKEND
      // ===============================

      const response = await fetch(
        `${API_URL}/api/auth/forgot-password`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: trimmedEmail,
          }),
        }
      );

      // ===============================
      // READ RESPONSE
      // ===============================

      const data = await response.json();

      console.log(
        "FORGOT PASSWORD RESPONSE:",
        data
      );

      // ===============================
      // ERROR RESPONSE
      // ===============================

      if (!response.ok || !data.success) {
        Alert.alert(
          "Password Reset",
          data.message ||
            "Unable to send verification email."
        );

        return;
      }

      // ===============================
      // SUCCESS
      // ===============================

      console.log(
        "Verification ID:",
        data.verificationId
      );

      Alert.alert(
  "Check Your Email",
  "We sent 4 numbers to your registered email address.",
  [
    {
      text: "Continue",
      onPress: () => {
        router.push({
          pathname: "/public/verify-reset-number",
          params: {
            verificationId: data.verificationId,
            email: trimmedEmail,
          },
        });
      },
    },
  ]
);

    } catch (error) {
      // ===============================
      // CONNECTION ERROR
      // ===============================

      console.error(
        "FORGOT PASSWORD ERROR:",
        error
      );

      Alert.alert(
        "Connection Error",
        "Unable to connect to the server. Please make sure the backend server is running."
      );

    } finally {
      // ===============================
      // STOP LOADING
      // ===============================

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

        {/* =========================
            ICON
        ========================== */}

        <View style={styles.iconContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={34}
            color="#2E7D32"
          />
        </View>

        {/* =========================
            TITLE
        ========================== */}

        <Text style={styles.title}>
          Forgot Password?
        </Text>

        <Text style={styles.subtitle}>
          Enter your registered email address
          {"\n"}
          to reset your password.
        </Text>

        {/* =========================
            EMAIL INPUT
        ========================== */}

        <View style={styles.inputContainer}>

          <Ionicons
            name="mail-outline"
            size={21}
            color="#777"
          />

          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            editable={!loading}
          />

        </View>

        {/* =========================
            CONTINUE BUTTON
        ========================== */}

        <Pressable
          style={[
            styles.continueButton,
            loading &&
              styles.disabledButton,
          ]}
          onPress={handleContinue}
          disabled={loading}
        >

          {loading ? (
            <ActivityIndicator
              size="small"
              color="#FFFFFF"
            />
          ) : (
            <>
              <Text style={styles.continueText}>
                Continue
              </Text>

              <Ionicons
                name="arrow-forward-outline"
                size={20}
                color="#FFFFFF"
              />
            </>
          )}

        </Pressable>

        {/* =========================
            LOGIN
        ========================== */}

        <View style={styles.loginRow}>

          <Text style={styles.loginText}>
            Remember your password?
          </Text>

          <Pressable
            onPress={() => {
              if (navigation) {
                navigation.goBack();
              }
            }}
          >
            <Text style={styles.loginLink}>
              Login
            </Text>
          </Pressable>

        </View>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

  // ===============================
  // MAIN CONTAINER
  // ===============================

  container: {
    flex: 1,
    backgroundColor: "#F5F7F5",
  },

  // ===============================
  // CONTENT
  // ===============================

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  // ===============================
  // ICON
  // ===============================

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

  // ===============================
  // TITLE
  // ===============================

  title: {
    fontSize: 29,
    fontWeight: "800",
    color: "#1B5E20",
    textAlign: "center",
  },

  // ===============================
  // SUBTITLE
  // ===============================

  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: "#777",
    textAlign: "center",
    marginTop: 9,
    marginBottom: 28,
  },

  // ===============================
  // INPUT CONTAINER
  // ===============================

  inputContainer: {
    height: 54,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE8DC",
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  // ===============================
  // INPUT
  // ===============================

  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    marginLeft: 10,
  },

  // ===============================
  // CONTINUE BUTTON
  // ===============================

  continueButton: {
    height: 54,
    backgroundColor: "#2E7D32",
    borderRadius: 13,
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  // ===============================
  // DISABLED BUTTON
  // ===============================

  disabledButton: {
    opacity: 0.7,
  },

  // ===============================
  // BUTTON TEXT
  // ===============================

  continueText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  // ===============================
  // LOGIN ROW
  // ===============================

  loginRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },

  // ===============================
  // LOGIN TEXT
  // ===============================

  loginText: {
    color: "#777",
    fontSize: 13,
  },

  // ===============================
  // LOGIN LINK
  // ===============================

  loginLink: {
    color: "#2E7D32",
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 5,
  },

});