import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { Alert, StyleSheet, Text, View } from "react-native";
import app from "../../firebaseConfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function Dashboard() {
    const auth = getAuth(app);


// const handleLogout = () => {
//   Alert.alert(
//     "Logout",
//     "Are you sure you want to logout?",
//     [
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//       {
//         text: "Logout",
//         style: "destructive",
//         onPress: async () => {
//           await signOut(auth);
//           router.replace("/public");
//         },
//       },
//     ]
//   );
// };
  return (
    <LinearGradient
      colors={["#F7FCF8", "#FFFFFF"]}
      style={styles.container}
    >
      <Text style={styles.title}>VineSafe Dashboard</Text>

      <Text style={styles.welcome}>
        Welcome to VineSafe 
      </Text>

      <View style={styles.row}>
        <View style={styles.card}>
         <MaterialCommunityIcons name="thermometer" size={42} color="#2E7D32" />
          <Text style={styles.cardTitle}>Temperature</Text>
          <Text style={styles.value}>24°C</Text>
        </View>

        <View style={styles.card}>
          <MaterialCommunityIcons name="water-percent" size={42} color="#2196F3" />
          <Text style={styles.cardTitle}>Humidity</Text>
          <Text style={styles.value}>65%</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <MaterialCommunityIcons name="door-closed-lock" size={42} color="#7B1FA2" />
          <Text style={styles.cardTitle}>Door</Text>
          <Text style={styles.value}>Closed</Text>
        </View>

        <View style={styles.card}>
          <MaterialCommunityIcons name="package-variant" size={42} color="#FB8C00" />
          <Text style={styles.cardTitle}>Inventory</Text>
          <Text style={styles.value}>152 Boxes</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
         <MaterialCommunityIcons name="alert-circle" size={42} color="#E53935" />
          <Text style={styles.cardTitle}>Alerts</Text>
          <Text style={styles.value}>0</Text>
        </View>

        <View style={styles.card}>
          <MaterialCommunityIcons name="chart-line" size={42} color="#00897B" />
          <Text style={styles.cardTitle}>Analytics</Text>
          <Text style={styles.value}>View</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#123524",
    marginTop: 40,
    marginBottom: 10,
  },

  welcome: {
    fontSize: 16,
    color: "#666",
    marginBottom: 25,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    elevation: 4,
  },

  icon: {
    fontSize: 35,
  },

  cardTitle: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#123524",
  },

  value: {
    marginTop: 8,
    fontSize: 18,
    color: "#2E7D32",
    fontWeight: "bold",
  },
});