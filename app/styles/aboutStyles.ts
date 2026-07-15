import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7FCF8",
  },

//   hero: {
//     padding: 40,
//     backgroundColor: "#2E7D32",
//     alignItems: "center",
//     justifyContent: "center",
//   },

hero: {
  padding: 0,
  backgroundColor: "#2E7D32",
},

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#E8F5E9",
    textAlign: "center",
    lineHeight: 24,
  },
  section: {
  padding: 20,
},

heading: {
  fontSize: 24,
  fontWeight: "bold",
  color: "#123524",
  marginBottom: 12,
},

paragraph: {
  fontSize: 16,
  color: "#555",
  lineHeight: 26,
},
card: {
  backgroundColor: "#FFFFFF",
  borderRadius: 18,
  padding: 20,
  marginBottom: 18,
  elevation: 4,
},

cardTitle: {
  fontSize: 20,
  fontWeight: "bold",
  color: "#2E7D32",
  marginBottom: 10,
},

cardText: {
  fontSize: 15,
  color: "#555",
  lineHeight: 24,
},

logo: {
  width: 120,
  height: 120,
  marginBottom: 20,
},
heroImage: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
},
overlay: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 25,
  paddingTop: 40,
  paddingBottom: 40,
},

overlayLogo: {
  width: 110,
  height: 110,
  marginBottom: 20,
},

overlayTitle: {
  fontSize: 34,
  fontWeight: "bold",
  color: "#fff",
},

overlaySubtitle: {
  color: "#fff",
  textAlign: "center",
  fontSize: 17,
  marginTop: 10,
  lineHeight: 28,
},
aboutTextContainer: {
  flex: 1,
  paddingRight: 15,
},

heroContainer: {
  width: "100%",
},
pagination: {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 12,
  marginBottom: 20,
},

dot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: "#C8E6C9",
  marginHorizontal: 4,
},

activeDot: {
  width: 22,
  backgroundColor: "#2E7D32",
},
statsSection: {
  flexDirection: "row",
  justifyContent: "space-around",
  marginHorizontal: 20,
  marginTop: 20,
  marginBottom: 20,
},

statCard: {
  backgroundColor: "#FFFFFF",
  width: "30%",
  borderRadius: 18,
  paddingVertical: 20,
  alignItems: "center",
  elevation: 5,
},

statNumber: {
  fontSize: 24,
  fontWeight: "bold",
  color: "#2E7D32",
},

statLabel: {
  fontSize: 14,
  color: "#666",
  marginTop: 8,
  textAlign: "center",
},


aboutRow: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 20,
  paddingVertical: 30,
},

aboutColumn: {
  flexDirection: "column",
},

aboutText: {
  flex: 1,
  paddingRight: 20,
},

aboutImage: {
  width: 420,
  height: 300,
},

whyContainer: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: 30,
},

whyContainerMobile: {
  flexDirection: "column",
},

leftSide: {
  flex: 1,
  marginRight: 30,
},

whyImage: {
  flex: 1,
  width: "100%",
  maxWidth: 500,
  height: 420,
},
missionVisionContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",   // Center the cards
  alignItems: "center",
  gap: 25,
  paddingHorizontal: 20,
  marginVertical: 30,
},

mvCard: {
  flex: 1,
  minWidth: 320,
  backgroundColor: "#fff",
  borderRadius: 20,
  padding: 20,
  alignItems: "center",

  shadowColor: "#000",
  shadowOpacity: 0.08,
  shadowRadius: 10,
  elevation: 5,
},

mvImage: {
  width: "100%",
  height: 320,
  marginBottom: 15,
},

featureCard: {
  height: 240,
  marginHorizontal: 15,

  backgroundColor: "#fff",

  borderRadius: 25,

  padding: 25,

  justifyContent: "center",

  alignItems: "center",

  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 12,
  elevation: 8,
},
iconContainer: {
  width: 70,
  height: 70,
  borderRadius: 35,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 18,
},
featureTitle: {
  fontSize: 22,
  fontWeight: "700",
  color: "#123524",
  textAlign: "center",
  marginBottom: 10,
},

featureText: {
  fontSize: 15,
  color: "#666",
  textAlign: "center",
  lineHeight: 24,
},
footer: {
  backgroundColor: "#111",
  paddingVertical: 45,
  paddingHorizontal: 25,
  marginTop: 40,
},

footerTitle: {
  color: "#fff",
  fontSize: 30,
  fontWeight: "bold",
  textAlign: "center",
},

footerText: {
  color: "#CFCFCF",
  fontSize: 16,
  textAlign: "center",
  marginTop: 10,
  lineHeight: 26,
},

footerDivider: {
  height: 1,
  backgroundColor: "#333",
  marginVertical: 25,
},

contactRow: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 18,
},

footerContact: {
  color: "#fff",
  fontSize: 16,
  marginLeft: 15,
},

socialContainer: {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 25,
},

socialIcon: {
  marginHorizontal: 15,
},

copyright: {
  color: "#999",
  textAlign: "center",
  marginTop: 15,
  fontSize: 14,
},

});