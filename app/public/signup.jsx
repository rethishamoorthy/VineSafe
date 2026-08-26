

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
// import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import {
    createUserWithEmailAndPassword,
    deleteUser,
    getAdditionalUserInfo,
    GoogleAuthProvider,
    sendEmailVerification,
    signInWithCredential
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { db } from "../../firebaseConfig";
import { auth } from "../../firebaseConfig";

// import * as AuthService from "../../services/auth";
import GoogleSignin from "../../services/auth";
export default function SignupScreen() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
const hasMinLength = password.length >= 8;
const hasUpperCase = /[A-Z]/.test(password);
const hasLowerCase = /[a-z]/.test(password);
const hasNumber = /\d/.test(password);
const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const router = useRouter();
  
  // const googleAuthHook =
  //   typeof (AuthService).useGoogleAuth === "function"
  //     ? (AuthService).useGoogleAuth
  //     : typeof (AuthService).default === "function"
  //     ? (AuthService).default
  //     : null;

  // const { promptAsync } =
  //   (googleAuthHook ? googleAuthHook() : null) ?? {
  //     promptAsync: async () => {
  //       throw new Error("Google auth not configured");
  //     },
  //   };

  const isSubmitDisabled =
    loading ||
    !name.trim() ||
    !email.trim() ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword;

  const handleSignup = async () => {
    if (loading) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

    if (!trimmedName) {
      Alert.alert("Validation Error", "Please enter your full name.");
      return;
    }

    if (trimmedName.length < 3) {
      Alert.alert("Validation Error", "Full name must be at least 3 characters.");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!passwordRegex.test(password)) {
      Alert.alert(
        "Weak Password",
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (!confirmPassword) {
      Alert.alert("Validation Error", "Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }

    let createdUser = null;

    try {
      setLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        password
      );

      createdUser = userCredential.user;

      await sendEmailVerification(createdUser);

      // await setDoc(doc(db, "users", createdUser.uid), {
      //   uid: createdUser.uid,
      //   name: trimmedName,
      //   email: trimmedEmail,
      //   photoURL: null,
      //   provider: "email",
      //   emailVerified: createdUser.emailVerified,
      //   createdAt: serverTimestamp(),
      // });

      try {
  await setDoc(doc(db, "users", createdUser.uid), {
    uid: createdUser.uid,
    name: trimmedName,
    email: trimmedEmail,
    photoURL: null,
    provider: "email",
    emailVerified: createdUser.emailVerified,
    createdAt: serverTimestamp(),
  });

  console.log("✅ Firestore document created successfully");
  Alert.alert("Success", "User saved in Firestore");
} catch (error) {
  console.log("❌ Firestore Error:", error);
  Alert.alert("Firestore Error", error.message);
}

      Alert.alert(
        "Signup Successful",
        "Your account has been created successfully.\nA verification email has been sent.\nPlease verify your email before logging in.",
        [
          {
            text: "OK",
            onPress: () => router.replace("/public/login"),
          },
        ]
      );
    } catch (error) {
      if (createdUser) {
        try {
          await deleteUser(createdUser);
        } catch (cleanupError) {
          console.log("Auth cleanup failed:", cleanupError);
        }
      }

      if (error?.code === "auth/email-already-in-use") {
        Alert.alert(
          "Already Signed Up",
          "You have already signed up. Please go to login.",
          [
            {
              text: "Go to Login",
              onPress: () => router.replace("/public/login"),
            },
          ]
        );
        return;
      }

      if (error?.code === "auth/invalid-email") {
        Alert.alert("Invalid Email", "Please enter a valid email.");
        return;
      }

      if (error?.code === "auth/network-request-failed") {
        Alert.alert("No Internet", "Please check your connection.");
        return;
      }

      if (error?.code === "auth/weak-password") {
        Alert.alert(
          "Weak Password",
          "Password should be at least 6 characters."
        );
        return;
      }

      Alert.alert(
        "Signup Failed",
        error?.message || "Unable to complete signup."
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔥 GOOGLE SIGNUP
  // const handleGoogleSignup = async () => {
  //   if (loading) return;

  //   try {
  //     setLoading(true);

  //     const result = await promptAsync();

  //     if (result?.type !== "success") return;

  //     const idToken = result.params?.id_token;

  //     if (!idToken) {
  //       Alert.alert("Error", "Google login failed. No token received.");
  //       return;
  //     }

  //     const credential = GoogleAuthProvider.credential(idToken);
  //     const userCredential = await signInWithCredential(auth, credential);
  //     const user = userCredential.user;
  //     const userDocRef = doc(db, "users", user.uid);
  //     const userDoc = await getDoc(userDocRef);

  //     const info = getAdditionalUserInfo(userCredential);
  //     const isNewUser = info?.isNewUser;

  //     if (!isNewUser) {
  //       Alert.alert(
  //         "Already Signed Up",
  //         "You have already signed up. Please go to login.",
  //         [
  //           {
  //             text: "Go to Login",
  //             onPress: () => router.replace("/public/login"),
  //           },
  //         ]
  //       );
  //       return;
  //     }

  //     if (!userDoc.exists()) {
  //       await setDoc(userDocRef, {
  //         uid: user.uid,
  //         name: user.displayName || user.email?.split("@")[0] || "Google User",
  //         email: user.email || "",
  //         photoURL: user.photoURL || null,
  //         provider: "google",
  //         emailVerified: user.emailVerified,
  //         createdAt: serverTimestamp(),
  //       });
  //     }

  //     Alert.alert("Success", "Account created successfully!");
  //     router.replace("/public/login");
  //   } catch (error) {
  //     console.log(error);

  //     switch (error?.code) {
  //       case "auth/email-already-in-use":
  //         Alert.alert(
  //           "Account Already Exists",
  //           "An account with this email already exists. Please login instead."
  //         );
  //         router.replace("/public/login");
  //         break;

  //       case "auth/invalid-email":
  //         Alert.alert("Invalid Email", "Please enter a valid email address.");
  //         break;

  //       case "auth/weak-password":
  //         Alert.alert("Weak Password", "Please choose a stronger password.");
  //         break;

  //       case "auth/network-request-failed":
  //         Alert.alert(
  //           "No Internet",
  //           "Please check your internet connection and try again."
  //         );
  //         break;

  //       case "auth/too-many-requests":
  //         Alert.alert(
  //           "Too Many Attempts",
  //           "Please wait a few minutes before trying again."
  //         );
  //         break;

  //       case "auth/internal-error":
  //         Alert.alert(
  //           "Server Error",
  //           "Something went wrong. Please try again later."
  //         );
  //         break;

  //       default:
  //         Alert.alert(
  //           "Signup Failed",
  //           "Unable to create your account. Please try again."
  //         );
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };


const handleGoogleSignup = async () => {
  if (loading) return;

  try {
    setLoading(true);

    // Sign out first (avoids cached account issues)
    await GoogleSignin.signOut().catch(() => {});

    // Start Google Sign-In
    await GoogleSignin.hasPlayServices();

    const userInfo = await GoogleSignin.signIn();

    const idToken = userInfo.data?.idToken || userInfo.idToken;

    if (!idToken) {
      Alert.alert("Error", "Google login failed.");
      return;
    }

    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);

    const user = userCredential.user;
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    const info = getAdditionalUserInfo(userCredential);
    const isNewUser = info?.isNewUser;

    if (!isNewUser) {
      Alert.alert(
        "Already Signed Up",
        "You have already signed up. Please login.",
        [
          {
            text: "Go to Login",
            onPress: () => router.replace("/public/login"),
          },
        ]
      );
      return;
    }

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        name: user.displayName || "Google User",
        email: user.email || "",
        photoURL: user.photoURL || null,
        provider: "google",
        emailVerified: user.emailVerified,
        createdAt: serverTimestamp(),
      });
    }

    Alert.alert("Success", "Account created successfully!");
    router.replace("/public/login");

  } catch (error) {
    console.log("GOOGLE ERROR:", error);
    Alert.alert("Google Sign-In Failed", error.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <LinearGradient colors={["#F7FCF8", "#FFFFFF"]} style={styles.container}>

      {/* LOGO */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Smart Cold Storage System</Text>

      {/* INPUTS */}
      <View style={styles.form}>
  <TextInput
    placeholder="Full Name"
    value={name}
    onChangeText={setName}
    style={styles.input}
    autoCapitalize="words"
    autoCorrect={false}
    keyboardType="default"
  />

  <TextInput
    placeholder="Email Address"
    value={email}
    onChangeText={setEmail}
    style={styles.input}
    keyboardType="email-address"
    autoCapitalize="none"
    autoCorrect={false}
    textContentType="emailAddress"
  />


       {/* <View style={styles.passwordContainer}>
  <TextInput
    placeholder="Password"
    value={password}
    onChangeText={setPassword}
    secureTextEntry={!showPassword}
    style={styles.passwordInput}
    autoCapitalize="none"
    autoCorrect={false}
    textContentType="newPassword"
  />

  <TouchableOpacity
    onPress={() => setShowPassword(!showPassword)}
  >
    <Ionicons
      name={showPassword ? "eye-off-outline" : "eye-outline"}
      size={22}
      color="#666"
    />
  </TouchableOpacity>
  <View style={styles.passwordRules}>
  <Text
    style={[
      styles.ruleText,
      { color: hasMinLength ? "green" : "red" },
    ]}
  >
    • Minimum 8 characters
  </Text>

  <Text
    style={[
      styles.ruleText,
      { color: hasUpperCase ? "green" : "red" },
    ]}
  >
    • At least one uppercase letter
  </Text>

  <Text
    style={[
      styles.ruleText,
      { color: hasLowerCase ? "green" : "red" },
    ]}
  >
    • At least one lowercase letter
  </Text>

  <Text
    style={[
      styles.ruleText,
      { color: hasNumber ? "green" : "red" },
    ]}
  >
    • At least one number
  </Text>

  <Text
    style={[
      styles.ruleText,
      { color: hasSpecialChar ? "green" : "red" },
    ]}
  >
    • At least one special character (!@#$%^&*)
  </Text>
</View>
</View>
        <View style={styles.passwordContainer}>
  <TextInput
    placeholder="Confirm Password"
    value={confirmPassword}
    onChangeText={setConfirmPassword}
    secureTextEntry={!showConfirmPassword}
    style={styles.passwordInput}
    autoCapitalize="none"
    autoCorrect={false}
    textContentType="newPassword"
  /> </View>
{confirmPassword.length > 0 && (
  <Text
    style={{
      color: password === confirmPassword ? "green" : "red",
      marginBottom: 12,
      marginLeft: 5,
      fontSize: 13,
      fontWeight: "500",
    }}
  >
    {password === confirmPassword
      ? "✓ Passwords match"
      : "✗ Passwords do not match"}
  </Text>
)}
  <TouchableOpacity
    onPress={() =>
      setShowConfirmPassword(!showConfirmPassword)
    }
  >
    <Ionicons
      name={
        showConfirmPassword
          ? "eye-off-outline"
          : "eye-outline"
      }
      size={22}
      color="#666"
    />
  </TouchableOpacity>
</View> */}
     

      {/* SIGN UP BUTTON */}
      {/* <TouchableOpacity
  onPress={handleSignup}
  style={[
    styles.button,
    (!name ||
      !email ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword ||
      nameError ||
      emailError ||
      passwordError) && styles.buttonDisabled,
  ]}
  disabled={
     !name ||
  !email ||
  !password ||
  !confirmPassword ||
  password !== confirmPassword ||
  !!nameError ||
  !!emailError ||
  !!passwordError
  }
>
        <Text style={styles.buttonText}>
  {loading ? "Creating Account..." : "Sign Up"}
</Text>
      </TouchableOpacity> */}

<View style={styles.passwordContainer}>
  <TextInput
    placeholder="Password"
    value={password}
    onChangeText={setPassword}
    secureTextEntry={!showPassword}
    style={styles.passwordInput}
    autoCapitalize="none"
    autoCorrect={false}
    textContentType="newPassword"
  />

  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    <Ionicons
      name={showPassword ? "eye-off-outline" : "eye-outline"}
      size={22}
      color="#666"
    />
  </TouchableOpacity>
</View>

{/* Password Rules */}
<View style={styles.passwordRules}>
  <Text style={[styles.ruleText, { color: hasMinLength ? "green" : "red" }]}>
    • Minimum 8 characters
  </Text>

  <Text style={[styles.ruleText, { color: hasUpperCase ? "green" : "red" }]}>
    • At least one uppercase letter
  </Text>

  <Text style={[styles.ruleText, { color: hasLowerCase ? "green" : "red" }]}>
    • At least one lowercase letter
  </Text>

  <Text style={[styles.ruleText, { color: hasNumber ? "green" : "red" }]}>
    • At least one number
  </Text>

  <Text style={[styles.ruleText, { color: hasSpecialChar ? "green" : "red" }]}>
    • At least one special character (!@#$%^&*)
  </Text>
</View>

<View style={styles.passwordContainer}>
  <TextInput
    placeholder="Confirm Password"
    value={confirmPassword}
    onChangeText={setConfirmPassword}
    secureTextEntry={!showConfirmPassword}
    style={styles.passwordInput}
    autoCapitalize="none"
    autoCorrect={false}
    textContentType="newPassword"
  />

  <TouchableOpacity
    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    <Ionicons
      name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
      size={22}
      color="#666"
    />
  </TouchableOpacity>
</View>

{/* Password Match */}
{confirmPassword.length > 0 && (
  <Text
    style={{
      color: password === confirmPassword ? "green" : "red",
      marginBottom: 12,
      marginLeft: 5,
      fontSize: 13,
      fontWeight: "500",
    }}
  >
    {password === confirmPassword
      ? "✓ Passwords match"
      : "✗ Passwords do not match"}
  </Text>
)}

</View>
<TouchableOpacity
  style={[
    styles.button,
    isSubmitDisabled && styles.buttonDisabled,
  ]}
  onPress={() => handleSignup()}
  disabled={isSubmitDisabled}
>
  <Text style={styles.buttonText}>
    {loading ? "Creating Account..." : "Sign Up"}
  </Text>
</TouchableOpacity>


      {/* GOOGLE BUTTON */}
      <TouchableOpacity
        style={styles.googleBtn}
        onPress={handleGoogleSignup}
      >
        <Text style={styles.googleG}>G</Text>
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* LOGIN LINK */}
      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>
          Already have an account?
        </Text>

        <TouchableOpacity onPress={() => router.push("/public/login")}>
          <Text style={styles.linkText}> Login</Text>
        </TouchableOpacity>
      </View>

    </LinearGradient>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
  },
buttonDisabled: {
  backgroundColor: "#A5D6A7",
},
  logo: {
    width: 90,
    height: 90,
    alignSelf: "center",
    marginBottom: 10,
    
  },

  title: {
    fontSize: 26,
    fontWeight: "900",
    color: "#123524",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 25,
    marginTop: 5,
  },

  form: {
    marginTop: 10,
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },

  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 30,
    marginTop: 15,
    elevation: 3,
  },
passwordContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: 12,
  paddingHorizontal: 15,
  marginBottom: 12,
  elevation: 3,
},

passwordInput: {
  flex: 1,
  paddingVertical: 15,
},
  googleG: {
    fontSize: 20,
    fontWeight: "900",
    color: "#4285F4",
  },

  googleText: {
    marginLeft: 10,
    fontWeight: "700",
    color: "#333",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  bottomText: {
    color: "#64748B",
  },

  linkText: {
    color: "#2E7D32",
    fontWeight: "700",
    paddingBottom: 70,
  },
  passwordRules: {
  marginTop: -5,
  marginBottom: 12,
  paddingLeft: 5,
},

ruleText: {
  fontSize: 13,
  marginVertical: 2,
  fontWeight: "500",
},
});