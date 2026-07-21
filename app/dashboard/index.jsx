import { LinearGradient } from "expo-linear-gradient";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { auth, db } from "../../firebaseConfig";

export default function Dashboard() {
   const router = useRouter(); 
const [userName, setUserName] = useState("");



useEffect(() => {
  const loadUser = async () => {
    const user = auth.currentUser;

    if (!user) {
      router.replace("/public/login");
      return;
    }

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserName(docSnap.data().name);
    }
  };

  loadUser();
}, []);


// useEffect(() => {
//   const loadUser = async () => {
//     const user = auth.currentUser;

//     if (!user) return;

//     const docRef = doc(db, "users", user.uid);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       setUserName(docSnap.data().name);
//     }
//   };

//   loadUser();
// }, []);
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


const hour = new Date().getHours();

let greeting = "";

if (hour < 12) {
  greeting = "Good Morning";
} else if (hour < 17) {
  greeting = "Good Afternoon";
} else {
  greeting = "Good Evening";
}


  return (
    <LinearGradient
      colors={["#F7FCF8", "#FFFFFF"]}
      style={styles.container}
    >
       <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.scrollContent}
  >
    <Animated.View entering={FadeInDown.duration(600)}>
     <View style={styles.header}>

  <Text style={styles.logo}>VineSafe</Text>

  <Text style={styles.systemTitle}>
    Cold Storage Monitoring System
  </Text>

  <View style={styles.profileCard}>
    <View>
      <Text style={styles.greeting}>
  {greeting}
</Text>

      <Text style={styles.userName}>
        {userName}
      </Text>

      <Text style={styles.role}>
        Storage Manager
      </Text>
    </View>

    <MaterialCommunityIcons
      name="account-circle"
      size={60}
      color="#2E7D32"
    />
  </View>

</View>

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
      </Animated.View>
       </ScrollView>
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
  userName: {
  fontSize: 22,
  fontWeight: "700",
  color: "#123524",
  marginTop: 8,
},

subtitle: {
  fontSize: 14,
  color: "#64748B",
  marginTop: 4,
  marginBottom: 25,
},
header: {
  marginTop: 40,
  marginBottom: 25,
},

logo: {
  fontSize: 30,
  fontWeight: "900",
  color: "#123524",
},

systemTitle: {
  fontSize: 14,
  color: "#6B7280",
  marginTop: 3,
  marginBottom: 22,
},

profileCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 18,
  padding: 18,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  elevation: 4,
},

greeting: {
  fontSize: 14,
  color: "#777",
},

userName: {
  fontSize: 24,
  fontWeight: "700",
  color: "#123524",
  marginTop: 2,
},

role: {
  fontSize: 14,
  color: "#2E7D32",
  marginTop: 4,
},
});