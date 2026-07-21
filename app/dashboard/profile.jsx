

// import { Ionicons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import {
//   onAuthStateChanged,
//   sendEmailVerification,
//   signOut
// } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import { auth } from "../../firebaseConfig";
// import {
//   ActivityIndicator,
//   Alert,
//   Image,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { db } from "../../firebaseConfig";
 
// export default function ProfileScreen() {
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [profile, setProfile] = useState(null);
//   const [signingOut, setSigningOut] = useState(false);
 
//   const router = useRouter();
  
 
//   // Merge Firebase Auth user + Firestore "users/{uid}" doc
//   const loadProfile = async (currentUser) => {
//     if (!currentUser) {
//       setProfile(null);
//       return;
//     }
 
//     let firestoreData = {};
//     try {
//       const snap = await getDoc(doc(db, "users", currentUser.uid));
//       if (snap.exists()) {
//         firestoreData = snap.data();
//       }
//     } catch (err) {
//       console.log("Failed to load Firestore profile:", err);
//     }
 
//     setProfile({
//       uid: currentUser.uid,
//       name:
//         firestoreData.name ||
//         currentUser.displayName ||
//         currentUser.email?.split("@")[0] ||
//         "User",
//       email: currentUser.email || firestoreData.email || "",
//       photoURL: currentUser.photoURL || firestoreData.photoURL || null,
//       provider: firestoreData.provider || "email",
//       emailVerified: currentUser.emailVerified,
//       createdAt: firestoreData.createdAt?.toDate
//         ? firestoreData.createdAt.toDate()
//         : null,
//     });
//   };
 
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (!currentUser) {
//         setLoading(false);
//         router.replace("/public/login");
//         return;
//       }
//       await loadProfile(currentUser);
//       setLoading(false);
//     });
 
//     return unsubscribe;
//   }, []);
 
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await loadProfile(auth.currentUser);
//     setRefreshing(false);
//   };
 
//   const handleResendVerification = async () => {
//     try {
//       if (!auth.currentUser) return;
//       await sendEmailVerification(auth.currentUser);
//       Alert.alert("Verification Sent", "Check your inbox for the verification link.");
//     } catch (err) {
//       Alert.alert("Error", err?.message || "Could not send verification email.");
//     }
//   };
 
//   const handleLogout = () => {
//     Alert.alert("Log Out", "Are you sure you want to log out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Log Out",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             setSigningOut(true);
//             await signOut(auth);
//             router.replace("/public/login");
//           } catch (err) {
//             Alert.alert("Error", err?.message || "Could not log out.");
//           } finally {
//             setSigningOut(false);
//           }
//         },
//       },
//     ]);
//   };
 
//   const formatDate = (date) => {
//     if (!date) return "—";
//     return date.toLocaleDateString(undefined, {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };
 
//   const getInitials = (name) => {
//     if (!name) return "U";
//     const parts = name.trim().split(" ");
//     const initials = parts.length > 1
//       ? parts[0][0] + parts[parts.length - 1][0]
//       : parts[0][0];
//     return initials.toUpperCase();
//   };
 
//   if (loading) {
//     return (
//       <LinearGradient colors={["#F7FCF8", "#FFFFFF"]} style={styles.center}>
//         <ActivityIndicator size="large" color="#2E7D32" />
//       </LinearGradient>
//     );
//   }
 
//   if (!profile) {
//     return (
//       <LinearGradient colors={["#F7FCF8", "#FFFFFF"]} style={styles.center}>
//         <Text style={styles.subtitle}>No user is logged in.</Text>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => router.replace("/public/login")}
//         >
//           <Text style={styles.buttonText}>Go to Login</Text>
//         </TouchableOpacity>
//       </LinearGradient>
//     );
//   }
 
//   return (
//     <LinearGradient colors={["#F7FCF8", "#FFFFFF"]} style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         refreshControl={
//           <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#2E7D32"]} />
//         }
//       >
//         {/* AVATAR */}
//         <View style={styles.avatarWrap}>
//           {profile.photoURL ? (
//             <Image source={{ uri: profile.photoURL }} style={styles.avatar} />
//           ) : (
//             <View style={[styles.avatar, styles.avatarFallback]}>
//               <Text style={styles.avatarInitials}>{getInitials(profile.name)}</Text>
//             </View>
//           )}
 
//           {profile.provider === "google" && (
//             <View style={styles.providerBadge}>
//               <Text style={styles.providerBadgeText}>G</Text>
//             </View>
//           )}
//         </View>
 
//         <Text style={styles.name}>{profile.name}</Text>
//         <Text style={styles.email}>{profile.email}</Text>
 
//         {/* VERIFICATION STATUS */}
//         <View style={styles.verifyRow}>
//           <Ionicons
//             name={profile.emailVerified ? "checkmark-circle" : "alert-circle"}
//             size={16}
//             color={profile.emailVerified ? "#2E7D32" : "#C0392B"}
//           />
//           <Text
//             style={[
//               styles.verifyText,
//               { color: profile.emailVerified ? "#2E7D32" : "#C0392B" },
//             ]}
//           >
//             {profile.emailVerified ? "Email Verified" : "Email Not Verified"}
//           </Text>
 
//           {!profile.emailVerified && (
//             <TouchableOpacity onPress={handleResendVerification}>
//               <Text style={styles.resendText}> Resend</Text>
//             </TouchableOpacity>
//           )}
//         </View>
 
//         {/* DETAILS CARD */}
//         <View style={styles.card}>
//           <DetailRow icon="person-outline" label="Full Name" value={profile.name} />
//           <DetailRow icon="mail-outline" label="Email" value={profile.email} />
//           <DetailRow
//             icon="log-in-outline"
//             label="Signed up with"
//             value={profile.provider === "google" ? "Google" : "Email & Password"}
//           />
//           <DetailRow icon="calendar-outline" label="Member Since" value={formatDate(profile.createdAt)} />
//           <DetailRow icon="key-outline" label="User ID" value={profile.uid} small />
//         </View>
 
//         {/* ACTIONS */}
//         <TouchableOpacity
//           style={[styles.button, styles.logoutButton]}
//           onPress={handleLogout}
//           disabled={signingOut}
//         >
//           <Ionicons name="log-out-outline" size={18} color="#fff" />
//           <Text style={styles.buttonText}>
//             {signingOut ? "Logging Out..." : "  Log Out"}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </LinearGradient>
//   );
// }
 
// function DetailRow({ icon, label, value, small }) {
//   return (
//     <View style={styles.detailRow}>
//       <Ionicons name={icon} size={18} color="#2E7D32" style={styles.detailIcon} />
//       <View style={{ flex: 1 }}>
//         <Text style={styles.detailLabel}>{label}</Text>
//         <Text
//           style={[styles.detailValue, small && { fontSize: 11, color: "#94A3B8" }]}
//           numberOfLines={1}
//         >
//           {value}
//         </Text>
//       </View>
//     </View>
//   );
// }
 
// /* ================= STYLES ================= */
 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 25,
//   },
//   scrollContent: {
//     padding: 25,
//     alignItems: "center",
//     paddingBottom: 60,
//   },
 
//   avatarWrap: {
//     marginTop: 20,
//     marginBottom: 12,
//   },
//   avatar: {
//     width: 96,
//     height: 96,
//     borderRadius: 48,
//     backgroundColor: "#E8F5E9",
//   },
//   avatarFallback: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   avatarInitials: {
//     fontSize: 32,
//     fontWeight: "800",
//     color: "#2E7D32",
//   },
//   providerBadge: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     width: 26,
//     height: 26,
//     borderRadius: 13,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 3,
//     borderWidth: 1,
//     borderColor: "#eee",
//   },
//   providerBadgeText: {
//     fontWeight: "900",
//     color: "#4285F4",
//   },
 
//   name: {
//     fontSize: 22,
//     fontWeight: "900",
//     color: "#123524",
//     textAlign: "center",
//   },
//   email: {
//     fontSize: 14,
//     color: "#64748B",
//     marginTop: 2,
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#64748B",
//     marginBottom: 20,
//   },
 
//   verifyRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   verifyText: {
//     fontSize: 13,
//     fontWeight: "600",
//     marginLeft: 4,
//   },
//   resendText: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: "#2E7D32",
//     textDecorationLine: "underline",
//   },
 
//   card: {
//     width: "100%",
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 18,
//     elevation: 3,
//     marginBottom: 25,
//   },
//   detailRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 10,
//     borderBottomWidth: StyleSheet.hairlineWidth,
//     borderBottomColor: "#E5E7EB",
//   },
//   detailIcon: {
//     marginRight: 12,
//   },
//   detailLabel: {
//     fontSize: 12,
//     color: "#94A3B8",
//     fontWeight: "600",
//   },
//   detailValue: {
//     fontSize: 14,
//     color: "#123524",
//     fontWeight: "600",
//     marginTop: 2,
//   },
 
//   button: {
//     backgroundColor: "#2E7D32",
//     padding: 16,
//     borderRadius: 30,
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//   },
//   logoutButton: {
//     flexDirection: "row",
//     backgroundColor: "#C0392B",
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "800",
//     fontSize: 16,
//   },
// });
 
