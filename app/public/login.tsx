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
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import app, { db } from "../../firebaseConfig";
import { useGoogleAuth } from "../../services/auth";

const auth = getAuth(app);
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { promptAsync } = useGoogleAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        router.replace("/dashboard");
        return;
      }

      await signOut(auth);
      Alert.alert(
        "Account Not Found",
        "This account does not exist. Please sign up.",
        [
          {
            text: "Go to Sign Up",
            onPress: () => router.push("/public/signup"),
          },
        ]
      );
    });

    return unsubscribe;
  }, [router]);

  const openSignup = () => {
    router.push("/public/signup");
  };

  // const handleGoogleLogin = async () => {
  //   try {
  //     const result = await promptAsync();

  //     if (result?.type !== "success" || !result.authentication?.idToken) {
  //       return;
  //     }

  //     const credential = GoogleAuthProvider.credential(result.authentication.idToken);
  //     const userCredential = await signInWithCredential(auth, credential);
  //     const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));

  //     if (!userDoc.exists()) {
  //       await signOut(auth);
  //       Alert.alert(
  //         "Account Not Found",
  //         "This account does not exist. Please sign up.",
  //         [
  //           {
  //             text: "Go to Sign Up",
  //             onPress: openSignup,
  //           },
  //         ]
  //       );
  //       return;
  //     }

  //     router.replace("/dashboard");
  //   } catch (error) {
  //     Alert.alert("Google Login", "Unable to sign in with Google.");
  //   }
  // };

const handleGoogleLogin = async () => {
  try {
    const result = await promptAsync();

    if (result?.type !== "success") {
      return;
    }

    const idToken = result.params?.id_token;

    const credential = GoogleAuthProvider.credential(idToken);

    const userCredential = await signInWithCredential(
      auth,
      credential
    );

    console.log(
      "Google User:",
      userCredential.user.uid
    );

    router.replace("/dashboard");

  } catch (error:any) {

    console.log(
      "GOOGLE ERROR:",
      error.message
    );

    Alert.alert(
      "Google Login Error",
      error.message
    );
  }
};




  const handleLogin = async () => {
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        password
      );

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
    catch (error: any) {
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
  };

  return (
    <LinearGradient colors={["#F7FCF8", "#FFFFFF"]} style={styles.container}>
      <Image
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
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleGoogleLogin} style={styles.googleBtn}>
        <Text style={styles.googleG}>G</Text>
        <Text style={styles.googleText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openSignup}>
        <Text style={styles.createAccountText}>Create account</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
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
});
