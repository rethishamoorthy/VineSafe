import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Image, Pressable, Text, View } from "react-native";
//import { DrawerActions } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { auth, db } from "../../firebaseConfig";
import { useTheme } from "../../context/ThemeContext";
const { width } = Dimensions.get("window");

const banners = [
  require("../../assets/banners/banner1.png"),
  require("../../assets/banners/banner2.png"),
  require("../../assets/banners/banner3.png"),
  require("../../assets/banners/banner4.png"),
];
export default function HomeScreen() {
 const { theme } = useTheme(); 
const router = useRouter();
const handleLogout = async () => {
  try {
    await signOut(auth);

    Alert.alert("Success", "Logged out successfully.");

    router.replace("/public");

  } catch (error) {
    Alert.alert("Logout Failed", error.message);
  }
};
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#F7FCF8", "#EEF8F1", "#FFFFFF"]}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
  <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= NAVBAR ================= */}

      

        <View style={styles.navbar}>

  {/* LEFT: LOGO */}
  <View style={styles.brand}>
  <Image
  source={require("../../assets/images/logo.png")}
  style={styles.logo}
  resizeMode="contain"
/>
    <Text style={styles.brandName}>VineSafe</Text>
  </View>

  {/* RIGHT: MENU BUTTON */}
  <TouchableOpacity
    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
    style={styles.menuButton}
  >
    <Ionicons name="menu" size={32} color="#2E7D32" />
  </TouchableOpacity>

</View>

        {/* ================= HERO ================= */}

        {/* ================= HERO ================= */}

<View style={styles.hero}>

  {/* <Carousel
  loop
  width={width - 60}
  height={260}
  autoPlay
  autoPlayInterval={3000}
  data={banners}
  scrollAnimationDuration={1200}

  renderItem={({ item }) => (
    <Image
      source={item}
      style={styles.bannerImage}
    />
  )}
/> */}

<Carousel
  loop
  width={width - 60}
  height={260}
  autoPlay
  autoPlayInterval={3000}
  data={banners}
  scrollAnimationDuration={1200}
  pagingEnabled
  snapEnabled
  mode="parallax"
  modeConfig={{
    parallaxScrollingScale: 0.9,
    parallaxScrollingOffset: 40,
  }}
  renderItem={({ item }) => {
    return (
      <Image
        source={item}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 16,
          resizeMode: "cover",
        }}
      />
    );
  }}
/>

  {/* <Text style={styles.title}>
    Smart Cold Storage
  </Text>

  <Text style={styles.title}>
    Monitoring
  </Text>

  <Text style={styles.subtitle}>
    Cold Storage Monitoring and{"\n"}
    Inventory Management System
  </Text>

  <Text style={styles.description}>
    Monitor temperature, humidity, inventory,
    and storage conditions in real time using
    IoT technology.
  </Text> */}



<View style={styles.cardsContainer}>

  {/* CARD 1 */}
  <Pressable
  style={({ pressed }) => [
    styles.card,
    pressed && {
      transform: [{ scale: 0.96 }],
      backgroundColor: "#EAF7ED",
    },
  ]}
>
    <View style={styles.iconBox}>
      <Ionicons name="thermometer" size={28} color="#2E7D32" />
    </View>

    <Text style={styles.cardTitle}>Real-time Monitoring</Text>
    <Text style={styles.cardText}>
      Track temperature & humidity instantly using IoT sensors.
    </Text>
  </Pressable>

  {/* CARD 2 */}
   <Pressable
  style={({ pressed }) => [
    styles.card,
    pressed && {
      transform: [{ scale: 0.96 }],
      backgroundColor: "#EAF7ED",
    },
  ]}
>
    <View style={styles.iconBox}>
      <Ionicons name="cash-outline" size={28} color="#2E7D32" />
    </View>

    <Text style={styles.cardTitle}>Cost Efficient</Text>
    <Text style={styles.cardText}>
      Reduce electricity waste and improve storage efficiency.
    </Text>
  </Pressable>

  {/* CARD 3 */}
   <Pressable
  style={({ pressed }) => [
    styles.card,
    pressed && {
      transform: [{ scale: 0.96 }],
      backgroundColor: "#EAF7ED",
    },
  ]}
>
    <View style={styles.iconBox}>
      <Ionicons name="cube-outline" size={28} color="#2E7D32" />
    </View>

    <Text style={styles.cardTitle}>Inventory Control</Text>
    <Text style={styles.cardText}>
      Manage stock and storage automatically in real time.
    </Text>
  </Pressable>

  {/* CARD 4 */}
   <Pressable
  style={({ pressed }) => [
    styles.card,
    pressed && {
      transform: [{ scale: 0.96 }],
      backgroundColor: "#EAF7ED",
    },
  ]}
>
    <View style={styles.iconBox}>
      <Ionicons name="notifications-outline" size={28} color="#2E7D32" />
    </View>

    <Text style={styles.cardTitle}>Smart Alerts</Text>
    <Text style={styles.cardText}>
      Get instant alerts for temperature changes and risks.
    </Text>
  </Pressable>

</View>


  <View style={styles.buttonContainer}>

    <TouchableOpacity
      style={styles.getStarted}
      onPress={() => router.push("/public/signup")}
    >
      <Text style={styles.getStartedText}>
        Get Started
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.learnMore}
      onPress={() => router.push("/public/about")}
    >
      <Text style={styles.learnMoreText}>
        Learn More
      </Text>
    </TouchableOpacity>

  </View>
<Text style={styles.welcome}>
  Smart Cold Storage
</Text>

<Text style={styles.subWelcome}>
  IoT Monitoring • Real-time Control • Smart Alerts
</Text>
 
</View>
</ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
  },

  /* ===================== NAVBAR ===================== */

  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 55,
    height: 55,
    
  },

  brandName: {
    marginLeft: 12,
    fontSize: 28,
    fontWeight: "800",
    color: "#1B5E20",
    letterSpacing: 0.5,
  },

  menu: {
    flexDirection: "row",
    alignItems: "center",
  },

  login: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2E7D32",
    marginRight: 0,
  },

  signupButton: {
    backgroundColor: "#2E7D32",
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 30,

    shadowColor: "#2E7D32",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 6,
  },

  signupText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    paddingRight: 90,
  },

  /* ===================== HERO ===================== */

  hero: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -40,
    paddingTop:50,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#123524",
    textAlign: "center",
    lineHeight: 58,
    letterSpacing: 0.5,
  },

  subtitle: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 24,
    color: "#2E7D32",
    fontWeight: "700",
    lineHeight: 34,
  },

  description: {
    marginTop: 22,
    width: "82%",
    textAlign: "center",
    fontSize: 17,
    color: "#64748B",
    lineHeight: 28,
  },

  getStarted: {
    marginTop: 40,
    backgroundColor: "#2E7D32",
    width: 220,
    height: 60,
    borderRadius: 40,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#2E7D32",
    shadowOpacity: 0.30,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 10,
  },

  getStartedText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
    paddingLeft: 40,
  },
  heroLogo: {
  width: 120,
  height: 120,
  
  marginBottom: 20,
},

buttonContainer: {
  flexDirection: "row",
  marginTop: 35,
},

learnMore: {
  width: 200,
  height: 60,
  borderRadius: 40,
  borderWidth: 4,
  borderColor: "#2E7D32",
  justifyContent: "center",
  alignItems: "center",
  marginRight:30,
},

learnMoreText: {
  color: "#2E7D32",
  fontSize: 18,
  fontWeight: "700",
},

heroImage: {
  width: "100%",
  height: 280,
  
  marginTop: 30,
},
scrollContent: {
  flexGrow: 1,
},
bannerImage: {
  width: "100%",
  height: "100%",
  borderRadius: 6,

},

bannerContainer: {
  marginTop: 20,
  marginBottom: 30,
},

menuButton: {
  backgroundColor: "#E8F5E9",
  padding: 10,
  borderRadius: 25,
},

cardsContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  marginTop: 30,
},

card: {
  width: "47%",
  backgroundColor: "#F4FBF6",
  borderRadius: 18,
  padding: 18,
  marginBottom: 18,

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 5 },

  elevation: 5,
},

iconBox: {
  width: 50,
  height: 50,
  borderRadius: 12,
  backgroundColor: "#E8F5E9",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 10,
},

cardTitle: {
  fontSize: 16,
  fontWeight: "700",
  color: "#1B5E20",
},

cardText: {
  fontSize: 13,
  color: "#64748B",
  marginTop: 6,
  lineHeight: 18,
},
welcome: {
  fontSize: 26,
  fontWeight: "900",
  color: "#123524",
  textAlign: "center",
  marginTop: 10,
},

subWelcome: {
  fontSize: 14,
  textAlign: "center",
  color: "#64748B",
  marginBottom: 10,
},
});

