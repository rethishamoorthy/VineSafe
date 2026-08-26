import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
// const [showPassword, setShowPassword] = useState(false);
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import app, { db } from "../../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import {

 setDoc
} from "firebase/firestore";
// import { useIdTokenAuthRequest } from "expo-auth-session/providers/google";

import  GoogleSignin  from "../../services/auth";

const auth = getAuth(app);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  // const [, , promptAsync] = useIdTokenAuthRequest({
  //   clientId: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
  //   scopes: ["openid", "profile", "email"],
  // });

const handleForgotPassword = () => {
  router.push("/public/forgot-password");
};

  useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, async (user) => {

    if (!user) return;

    const userDoc = await getDoc(
      doc(db, "users", user.uid)
    );

    if (userDoc.exists()) {
      router.replace("/dashboard");
    }

  });

  return unsubscribe;

}, []);

  const openSignup = () => {
    router.push("/public/signup");
  };



// const handleGoogleLogin = async () => {
//   try {
//     console.log("Starting Google Login...");

//     const result = await promptAsync();

//     console.log("Google Result:", JSON.stringify(result, null, 2));

//     if (result.type !== "success") {
//       Alert.alert("Login Cancelled", result.type);
//       return;
//     }

//     const idToken = result.params?.id_token;

//     console.log("ID Token:", idToken);

//     const credential = GoogleAuthProvider.credential(idToken);

//     const userCredential = await signInWithCredential(auth, credential);

//     console.log("Firebase Login Success:", userCredential.user.uid);

//     router.replace("/dashboard");

//   } catch (error: any) {
//     console.log("FULL ERROR:", error);
//     console.log("ERROR MESSAGE:", error.message);

//     Alert.alert("Google Error", error.message);
//   }
// };



const handleGoogleLogin = async () => {
  try {
    // Check Google Play Services
    await GoogleSignin.hasPlayServices();
await GoogleSignin.signOut().catch(() => {});
    // Open Google Sign-In
    const result = await GoogleSignin.signIn();

    // Get ID Token
    const idToken = result.data?.idToken;

    if (!idToken) {
      Alert.alert("Google Login", "No ID Token received.");
      return;
    }

    // Firebase Credential
    const credential = GoogleAuthProvider.credential(idToken);

    // Firebase Sign-In
    const userCredential = await signInWithCredential(auth, credential);
    const user = userCredential.user;

const userRef = doc(db,"users",user.uid);

const userSnap = await getDoc(userRef);


if(!userSnap.exists()){

 await setDoc(userRef,{
   name:user.displayName,
   email:user.email,
   photo:user.photoURL,
   provider:"google",
   createdAt:new Date()
 });

}

    console.log("Firebase User:", userCredential.user.uid);

    router.replace("/dashboard");

  }
  catch (error) {

    console.log("GOOGLE ERROR:", error);


    if(error.code === "auth/account-exists-with-different-credential"){

      Alert.alert(
        "Account Exists",
        "Please login using your email and password."
      );

      return;
    }


    Alert.alert(
      "Google Login Failed",
      error?.message || "Unknown error"
    );

}
};




  const handleLogin = async () => {
    if (loading) return;
    if (!email.trim()) {
      Alert.alert("Validation Error", "Please enter your email.");
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Validation Error", "Please enter your password.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );
      
if (!userCredential.user.emailVerified) {
  Alert.alert(
    "Email Not Verified",
    "Please verify your email before login."
  );

  await signOut(auth);
  return;
}
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

      if (!userDoc.exists()) {
        await signOut(auth);
        Alert.alert(
          "Account Not Found",
          "This account does not exist. Please sign up.",
          [
            {
              text: "Go to Sign Up",
              onPress: openSignup,
            },
          ]
        );
        return;
      }

      Alert.alert("Success", "Login Successful!");
      router.replace("/dashboard");
    } 
    catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          Alert.alert("Invalid Email", "Please enter a valid email.");
          break;

        case "auth/invalid-credential":
        case "auth/user-not-found":
          Alert.alert(
            "Account Not Found",
            "This account does not exist. Please sign up.",
            [
              {
                text: "Go to Sign Up",
                onPress: openSignup,
              },
            ]
          );
          break;

        case "auth/wrong-password":
          Alert.alert("Wrong Password", "Please enter the correct password.");
          break;

        case "auth/too-many-requests":
          Alert.alert("Too Many Attempts", "Try again after some time.");
          break;

        default:
          Alert.alert("Error", error.message);
      }
      
    }
    finally {
    setLoading(false);
  }
  };

  return (
    <LinearGradient 
colors={["#F7FCF8","#FFFFFF"]}
style={{flex:1}}
>

<ScrollView 
contentContainerStyle={styles.container}
keyboardShouldPersistTaps="handled"
><Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Smart Cold Storage System</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />
       
      </View>
 





<View style={styles.passwordContainer}>
  <TextInput
    placeholder="Password"
    value={password}
    onChangeText={setPassword}
    secureTextEntry={!showPassword}
    style={styles.passwordInput}
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
</View>
<TouchableOpacity
  onPress={handleForgotPassword}
  style={{ alignSelf: "flex-end", marginTop: 8 }}
>
  <Text
    style={{
      color: "#2E7D32",
      fontWeight: "600",
    }}
  >
    Forgot Password?
  </Text>
</TouchableOpacity>
 <TouchableOpacity
  style={[
    styles.button,
    loading && { opacity: 0.7 },
  ]}
  onPress={handleLogin}
  disabled={loading}
>
  <Text style={styles.buttonText}>
    {loading ? "Logging In..." : "Login"}
  </Text>
</TouchableOpacity> 

      <TouchableOpacity onPress={handleGoogleLogin} style={styles.googleBtn}>
        <Text style={styles.googleG}>G</Text>
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openSignup}>
        <Text style={styles.createAccountText}>Create account</Text>
      </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container:{
  flexGrow:1,
  justifyContent:"center",
  padding:20,
},
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#123524",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 20,
  },
  form: {
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 30,
    marginTop: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  googleBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 30,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  googleG: {
    color: "#4285F4",
    fontWeight: "900",
    fontSize: 18,
  },
  googleText: {
    marginLeft: 10,
    fontWeight: "600",
    color: "#333",
  },
  createAccountText: {
    textAlign: "center",
    marginTop: 20,
    color: "#2E7D32",
    fontWeight: "700",
  },
  passwordContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: 10,
  marginTop: 10,
  paddingHorizontal: 15,
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 8,
  elevation: 3,
},

passwordInput: {
  flex: 1,
  paddingVertical: 15,
},
});




