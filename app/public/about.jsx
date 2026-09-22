// import React from "react";
// import { useRouter } from "expo-router";
// import Carousel from "react-native-reanimated-carousel";
// import { useWindowDimensions } from "react-native";
// import { Dimensions } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useRef, useEffect } from "react";
// import {
//   DrawerActions,
//   useNavigation,
// } from "@react-navigation/native";
// import { TouchableOpacity } from "react-native";
// import { useTheme } from "../../context/ThemeContext";
// import {
//   Animated,
//   FlatList,
  
// } from "react-native";
// import {
//   SafeAreaView,
//   ScrollView,
//   View,
//   Text,
//   Image,
// } from "react-native";
// import { ImageBackground } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { styles } from "../../styles/aboutStyles";

// const features = [
//   {
//     title: "Real-Time Monitoring",
//     description:
//       "Monitor storage conditions continuously in real time.",
//     icon: "pulse",
//     color: "#2E7D32",
//   },
  
//   {
//     title: "Temperature & Humidity",
//     description:
//       "Maintain ideal storage conditions for freshness.",
//     icon: "thermometer",
//     color: "#43A047",
//   },
//   {
//     title: "Inventory Management",
//     description:
//       "Organize and track inventory efficiently.",
//     icon: "cube",
//     color: "#66BB6A",
//   },
//   {
//     title: "Instant Alerts",
//     description:
//       "Receive immediate notifications during abnormal conditions.",
//     icon: "notifications",
//     color: "#388E3C",
//   },
//   {
//     title: "Cloud Connectivity",
//     description:
//       "Access your storage information from anywhere.",
//     icon: "cloud",
//     color: "#2E7D32",
//   },
//   {
//     title: "User-Friendly Dashboard",
//     description:
//       "Simple dashboard with powerful monitoring tools.",
//     icon: "desktop",
//     color: "#43A047",
//   },
// ];
// const banners = [
//   require("../../assets/banners/banner5.jpg"),
//   require("../../assets/banners/banner6.jpg"),
//   require("../../assets/banners/banner7.jpg"),
// ];
// export default function AboutScreen() {
//   const router = useRouter();
// const navigation = useNavigation();
//   useEffect(() => {
//   const interval = setInterval(() => {
//     currentIndex.current =
//       (currentIndex.current + 1) % features.length;

//     flatListRef.current?.scrollToIndex({
//       index: currentIndex.current,
//       animated: true,
//     });
//   }, 2000);

//   return () => clearInterval(interval);
// }, []);
//   const { width } = useWindowDimensions();
//   const cardWidth = width > 768 ? 360 : width * 0.75;

// const flatListRef = useRef<FlatList>(null);

// const scrollX = useRef(new Animated.Value(0)).current;

// const currentIndex = useRef(0);
//   const isMobile = width < 768;
//   const { theme } = useTheme();
//   return (
   
//      <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
 
//         {/* <View style={styles.hero}> */}
//            {/* <Image
//     source={require("../../assets/images/logo.png")}
//     style={styles.logo}
//     resizeMode="contain"
//   /> */}
//  <TouchableOpacity
//   style={{
//     position: "absolute",
//     top: 50,
//     left: 20,
//     zIndex: 1000,
//   }}
//   onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
// >
//   <Ionicons name="menu" size={32} color="#fff" />
// </TouchableOpacity>
// <Carousel
//   loop
//   autoPlay
//   autoPlayInterval={3000}
//   scrollAnimationDuration={1500}
//   width={isMobile ? width : width * 0.75}
//   height={isMobile ? 250 : 360}
//   style={{
//     width: width,
//     alignSelf: "center",
//   }}
//   data={banners}
//   mode="horizontal-stack"
//   modeConfig={{
//     snapDirection: "left",
//     stackInterval: 18,
//   }}
//   pagingEnabled
//   snapEnabled
//   renderItem={({ item }) => (
//     <ImageBackground
//       source={item}
//       style={styles.heroImage}
//       imageStyle={{
//         borderRadius: 25,
//       }}
//       resizeMode="cover"
//     >
//       <LinearGradient
//         colors={[
//           "rgba(18,53,36,0.70)",
//           "rgba(46,125,50,0.35)",
//         ]}
//         style={styles.overlay}
//       >
//         <Image
//           source={require("../../assets/images/logo.png")}
//           style={styles.logo}
//           resizeMode="contain"
//         />

//         <Text style={styles.title}>About VineSafe</Text>

//         <Text style={styles.subtitle}>
//           Smart Cold Storage Monitoring{"\n"}
//           & Inventory Management System
//         </Text>
//       </LinearGradient>
//     </ImageBackground>
//   )}
// />

//   {/* <ImageBackground
//   source={require("E:\\VineSafe\\assets\\banners\\banner.jpg")}
//   style={styles.heroImage}
//     imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
//   resizeMode="cover"
// >

//   <LinearGradient
//     colors={["rgba(18,53,36,0.85)", "rgba(46,125,50,0.65)"]}
//   style={styles.overlay}
//   >

//     <Image
//       source={require("E:\\VineSafe\\assets\\images\\logo.png")}
//       style={styles.logo}
//        resizeMode="contain"
//     />

//     <Text style={styles.title}>About VineSafe</Text>

//     <Text style={styles.subtitle}>
//       Smart Cold Storage Monitoring{"\n"}
//       & Inventory Management System
//     </Text>

//   </LinearGradient>

// </ImageBackground> */}
  
// {/* 
// <View style={styles.section}>
//   <Text style={styles.heading}>Who We Are</Text>

//   <Text style={styles.paragraph}>
//         VineSafe is a smart cold storage monitoring and inventory management
//         system developed to help farmers and warehouse owners protect their
//         agricultural products. Using IoT technology, VineSafe continuously
//         monitors temperature, humidity, and storage conditions while providing
//         real-time alerts and cloud-based monitoring to reduce food spoilage and
//         improve storage efficiency.
//       </Text>
// </View>
// <Image
//       source={require("../../assets/images/hero.png")}
//       style={styles.aboutImage}
//       resizeMode="contain"
//     /> */}
//      <View style={styles.section}>
//     <Text style={styles.heading}>Who We Are</Text>

//     <Text style={styles.paragraph}>
//       VineSafe is a smart cold storage monitoring and inventory management
//       system developed to help farmers and warehouse owners protect their
//       agricultural products. Using IoT technology, VineSafe continuously
//       monitors temperature, humidity, and storage conditions while providing
//       real-time alerts and cloud-based monitoring to reduce food spoilage and
//       improve storage efficiency.
//     </Text>
//   </View>

//   {/* <Image
//     source={require("../../assets/images/hero.png")}
//     style={styles.aboutImage}
//     resizeMode="contain"
//   /> */}

// <View style={styles.section}>
//   <Text style={styles.heading}>Our Mission</Text>

// <View style={styles.missionVisionContainer}>

//   <View style={styles.mvCard}>
//       <Image
//         source={require("../../assets/images/mission.jpg")}
//         style={styles.mvImage}
//           resizeMode="cover"
//       />

//       <Text style={styles.cardTitle}>Mission</Text>

//       <Text style={styles.cardText}>
//         To empower farmers and cold storage owners with affordable smart
//         monitoring solutions.
//       </Text>
//   </View>

//   <View style={styles.mvCard}>
//       <Image
//         source={require("../../assets/images/vision.jpg")}
//         style={styles.mvImage}
//           resizeMode="cover"
//       />




//       <Text style={styles.cardTitle}>Vision</Text>

//       <Text style={styles.cardText}>
//         To become India's trusted intelligent cold storage platform that
//         reduces food loss and supports sustainable agriculture.
//       </Text>
//   </View>

// </View>

//   {/* LEFT SIDE */}
  
// <View style={styles.section}>
//   <Text style={styles.heading}>Why Choose VineSafe?</Text>

//   <Carousel
//     loop
//     autoPlay
//     autoPlayInterval={2500}
//     scrollAnimationDuration={1500}
//     width={cardWidth}
//     height={260}
//     style={{
//       width: width,
//       alignSelf: "center",
//     }}
//     data={features}
//     mode="parallax"
//     modeConfig={{
//       parallaxScrollingScale: 0.92,
//       parallaxAdjacentItemScale: 0.8,
//       parallaxScrollingOffset: 80,
//     }}
//     renderItem={({ item }) => (
//       <View style={styles.featureCard}>

//         <View
//           style={[
//             styles.iconContainer,
//             { backgroundColor: item.color + "20" },
//           ]}
//         >
//           <Ionicons
//             name={item.icon}
//             size={34}
//             color={item.color}
//           />
//         </View>

//         <Text style={styles.featureTitle}>
//           {item.title}
//         </Text>

//         <Text style={styles.featureText}>
//           {item.description}
//         </Text>

//       </View>
//     )}
//   />

// </View>
    

//   {/* RIGHT SIDE */}

 
// </View>
// <View style={styles.footer}>

//   <Text style={styles.footerTitle}>VineSafe</Text>

//   <Text style={styles.footerText}>
//     Smart Cold Storage Monitoring &
//     {"\n"}
//     Inventory Management System
//   </Text>

//   <View style={styles.footerDivider} />

//   <View style={styles.contactRow}>
//     <Ionicons name="call-outline" size={22} color="#fff" />
//     <Text style={styles.footerContact}>+91 98765 43210</Text>
//   </View>

//   <View style={styles.contactRow}>
//     <Ionicons name="mail-outline" size={22} color="#fff" />
//     <Text style={styles.footerContact}>
//       support@vinesafe.com
//     </Text>
//   </View>

//   <View style={styles.contactRow}>
//     <Ionicons name="location-outline" size={22} color="#fff" />
//     <Text style={styles.footerContact}>
//       Cumbum, Theni, Tamil Nadu
//     </Text>
//   </View>

//   <View style={styles.contactRow}>
//     <Ionicons name="globe-outline" size={22} color="#fff" />
//     <Text style={styles.footerContact}>
//       www.vinesafe.in
//     </Text>
//   </View>

//   {/* Social Media */}

//   <View style={styles.socialContainer}>

//     <Ionicons
//       name="logo-instagram"
//       size={30}
//       color="#fff"
//       style={styles.socialIcon}
//     />

//     <Ionicons
//       name="logo-facebook"
//       size={30}
//       color="#fff"
//       style={styles.socialIcon}
//     />

//     <Ionicons
//       name="logo-twitter"
//       size={30}
//       color="#fff"
//       style={styles.socialIcon}
//     />

//     <Ionicons
//       name="logo-linkedin"
//       size={30}
//       color="#fff"
//       style={styles.socialIcon}
//     />

//     <Ionicons
//       name="logo-youtube"
//       size={30}
//       color="#fff"
//       style={styles.socialIcon}
//     />

//   </View>

//   <View style={styles.footerDivider} />

//   <Text style={styles.copyright}>
//     © 2026 VineSafe. All Rights Reserved.
//   </Text>

// </View>
//       </ScrollView>
//       </SafeAreaView>
      
      
//   );
  
// }














import React, { useEffect, useRef } from "react";

import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import { useTheme } from "../../context/ThemeContext";
import { styles } from "../../styles/aboutStyles";

// =====================================================
// FEATURES
// =====================================================

const features = [
  {
    title: "Real-Time Monitoring",
    description:
      "Monitor storage conditions continuously in real time.",
    icon: "pulse",
    color: "#2E7D32",
  },
  {
    title: "Temperature & Humidity",
    description:
      "Maintain ideal storage conditions for freshness.",
    icon: "thermometer",
    color: "#43A047",
  },
  {
    title: "Inventory Management",
    description:
      "Organize and track inventory efficiently.",
    icon: "cube",
    color: "#66BB6A",
  },
  {
    title: "Instant Alerts",
    description:
      "Receive immediate notifications during abnormal conditions.",
    icon: "notifications",
    color: "#388E3C",
  },
  {
    title: "Cloud Connectivity",
    description:
      "Access your storage information from anywhere.",
    icon: "cloud",
    color: "#2E7D32",
  },
  {
    title: "User-Friendly Dashboard",
    description:
      "Simple dashboard with powerful monitoring tools.",
    icon: "desktop",
    color: "#43A047",
  },
];

// =====================================================
// BANNERS
// =====================================================

const banners = [
  require("../../assets/banners/banner5.jpg"),
  require("../../assets/banners/banner6.jpg"),
  require("../../assets/banners/banner7.jpg"),
];

// =====================================================
// ABOUT SCREEN
// =====================================================

export default function AboutScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { theme } = useTheme();

  const isMobile = width < 768;

  const cardWidth =
    width > 768 ? 360 : width * 0.75;

  // ===================================================
  // FEATURE CAROUSEL REF
  // ===================================================

  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  // ===================================================
  // FEATURE AUTO SCROLL
  // ===================================================

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current =
        (currentIndex.current + 1) %
        features.length;

      flatListRef.current?.scrollToIndex?.({
        index: currentIndex.current,
        animated: true,
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // ===================================================
  // OPEN DRAWER
  // ===================================================
  // Expo Router / SDK 56 compatible.
  //
  // If this About page is inside the public stack and
  // the drawer is not available here, the button will
  // simply navigate to the public page.
  // ===================================================

  const handleMenuPress = () => {
    try {
      router.back();
    } catch (error) {
      console.log("Navigation error:", error);
    }
  };

  // ===================================================
  // UI
  // ===================================================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >

        {/* =================================================
            MENU BUTTON
        ================================================= */}

        <TouchableOpacity
          style={{
            position: "absolute",
            top: 50,
            left: 20,
            zIndex: 1000,
            elevation: 10,
          }}
          onPress={handleMenuPress}
        >
          <Ionicons
            name="menu"
            size={32}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        {/* =================================================
            HERO CAROUSEL
        ================================================= */}

        <Carousel
          loop
          autoPlay
          autoPlayInterval={3000}
          scrollAnimationDuration={1500}
          width={
            isMobile
              ? width
              : width * 0.75
          }
          height={
            isMobile
              ? 250
              : 360
          }
          style={{
            width: width,
            alignSelf: "center",
          }}
          data={banners}
          mode="horizontal-stack"
          modeConfig={{
            snapDirection: "left",
            stackInterval: 18,
          }}
          pagingEnabled
          snapEnabled
          renderItem={({ item }) => (
            <ImageBackground
              source={item}
              style={styles.heroImage}
              imageStyle={{
                borderRadius: 25,
              }}
              resizeMode="cover"
            >
              <LinearGradient
                colors={[
                  "rgba(18,53,36,0.70)",
                  "rgba(46,125,50,0.35)",
                ]}
                style={styles.overlay}
              >

                {/* LOGO */}

                <Image
                  source={require("../../assets/images/logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />

                {/* TITLE */}

                <Text style={styles.title}>
                  About VineSafe
                </Text>

                {/* SUBTITLE */}

                <Text style={styles.subtitle}>
                  Smart Cold Storage Monitoring
                  {"\n"}
                  & Inventory Management System
                </Text>

              </LinearGradient>
            </ImageBackground>
          )}
        />

        {/* =================================================
            WHO WE ARE
        ================================================= */}

        <View style={styles.section}>

          <Text style={styles.heading}>
            Who We Are
          </Text>

          <Text style={styles.paragraph}>
            VineSafe is a smart cold storage monitoring
            and inventory management system developed
            to help farmers and warehouse owners protect
            their agricultural products. Using IoT
            technology, VineSafe continuously monitors
            temperature, humidity, and storage conditions
            while providing real-time alerts and
            cloud-based monitoring to reduce food spoilage
            and improve storage efficiency.
          </Text>

        </View>

        {/* =================================================
            MISSION & VISION
        ================================================= */}

        <View style={styles.section}>

          <Text style={styles.heading}>
            Our Mission
          </Text>

          <View
            style={styles.missionVisionContainer}
          >

            {/* MISSION */}

            <View style={styles.mvCard}>

              <Image
                source={require("../../assets/images/mission.jpg")}
                style={styles.mvImage}
                resizeMode="cover"
              />

              <Text style={styles.cardTitle}>
                Mission
              </Text>

              <Text style={styles.cardText}>
                To empower farmers and cold storage
                owners with affordable smart monitoring
                solutions.
              </Text>

            </View>

            {/* VISION */}

            <View style={styles.mvCard}>

              <Image
                source={require("../../assets/images/vision.jpg")}
                style={styles.mvImage}
                resizeMode="cover"
              />

              <Text style={styles.cardTitle}>
                Vision
              </Text>

              <Text style={styles.cardText}>
                To become India's trusted intelligent
                cold storage platform that reduces
                food loss and supports sustainable
                agriculture.
              </Text>

            </View>

          </View>

        </View>

        {/* =================================================
            WHY CHOOSE VINESAFE
        ================================================= */}

        <View style={styles.section}>

          <Text style={styles.heading}>
            Why Choose VineSafe?
          </Text>

          <Carousel
            loop
            autoPlay
            autoPlayInterval={2500}
            scrollAnimationDuration={1500}
            width={cardWidth}
            height={260}
            style={{
              width: width,
              alignSelf: "center",
            }}
            data={features}
            mode="parallax"
            modeConfig={{
              parallaxScrollingScale: 0.92,
              parallaxAdjacentItemScale: 0.8,
              parallaxScrollingOffset: 80,
            }}
            renderItem={({ item }) => (
              <View style={styles.featureCard}>

                {/* ICON */}

                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor:
                        item.color + "20",
                    },
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={34}
                    color={item.color}
                  />
                </View>

                {/* TITLE */}

                <Text
                  style={styles.featureTitle}
                >
                  {item.title}
                </Text>

                {/* DESCRIPTION */}

                <Text
                  style={styles.featureText}
                >
                  {item.description}
                </Text>

              </View>
            )}
          />

        </View>

        {/* =================================================
            FOOTER
        ================================================= */}

        <View style={styles.footer}>

          <Text style={styles.footerTitle}>
            VineSafe
          </Text>

          <Text style={styles.footerText}>
            Smart Cold Storage Monitoring &
            {"\n"}
            Inventory Management System
          </Text>

          <View
            style={styles.footerDivider}
          />

          {/* PHONE */}

          <View style={styles.contactRow}>

            <Ionicons
              name="call-outline"
              size={22}
              color="#FFFFFF"
            />

            <Text
              style={styles.footerContact}
            >
              +91 98765 43210
            </Text>

          </View>

          {/* EMAIL */}

          <View style={styles.contactRow}>

            <Ionicons
              name="mail-outline"
              size={22}
              color="#FFFFFF"
            />

            <Text
              style={styles.footerContact}
            >
              support@vinesafe.com
            </Text>

          </View>

          {/* LOCATION */}

          <View style={styles.contactRow}>

            <Ionicons
              name="location-outline"
              size={22}
              color="#FFFFFF"
            />

            <Text
              style={styles.footerContact}
            >
              Cumbum, Theni, Tamil Nadu
            </Text>

          </View>

          {/* WEBSITE */}

          <View style={styles.contactRow}>

            <Ionicons
              name="globe-outline"
              size={22}
              color="#FFFFFF"
            />

            <Text
              style={styles.footerContact}
            >
              www.vinesafe.in
            </Text>

          </View>

          {/* =================================================
              SOCIAL MEDIA
          ================================================= */}

          <View
            style={styles.socialContainer}
          >

            <Ionicons
              name="logo-instagram"
              size={30}
              color="#FFFFFF"
              style={styles.socialIcon}
            />

            <Ionicons
              name="logo-facebook"
              size={30}
              color="#FFFFFF"
              style={styles.socialIcon}
            />

            <Ionicons
              name="logo-twitter"
              size={30}
              color="#FFFFFF"
              style={styles.socialIcon}
            />

            <Ionicons
              name="logo-linkedin"
              size={30}
              color="#FFFFFF"
              style={styles.socialIcon}
            />

            <Ionicons
              name="logo-youtube"
              size={30}
              color="#FFFFFF"
              style={styles.socialIcon}
            />

          </View>

          <View
            style={styles.footerDivider}
          />

          <Text
            style={styles.copyright}
          >
            © 2026 VineSafe. All Rights Reserved.
          </Text>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}