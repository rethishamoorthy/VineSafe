// import * as Notifications from "expo-notifications";
// import Constants from "expo-constants";
// import { Platform } from "react-native";

// // =====================================================
// // NOTIFICATION HANDLER
// // =====================================================

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowBanner: true,
//     shouldShowList: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// // =====================================================
// // REGISTER FOR PUSH NOTIFICATIONS
// // =====================================================

// export async function registerForPushNotificationsAsync() {
//   try {
//     // -------------------------------------------------
//     // ANDROID CHANNEL
//     // -------------------------------------------------

//     if (Platform.OS === "android") {
//       await Notifications.setNotificationChannelAsync(
//         "default",
//         {
//           name: "VineSafe Alerts",
//           importance: Notifications.AndroidImportance.MAX,
//           vibrationPattern: [0, 250, 250, 250],
//           sound: "default",
//         }
//       );
//     }

//     // -------------------------------------------------
//     // PERMISSION
//     // -------------------------------------------------

//     const {
//       status: existingStatus,
//     } = await Notifications.getPermissionsAsync();

//     let finalStatus = existingStatus;

//     if (existingStatus !== "granted") {
//       const {
//         status,
//       } = await Notifications.requestPermissionsAsync();

//       finalStatus = status;
//     }

//     if (finalStatus !== "granted") {
//       console.log(
//         "❌ Notification permission not granted"
//       );

//       return null;
//     }

//     console.log(
//       "✅ Notification permission granted"
//     );

//     // -------------------------------------------------
//     // GET EXPO PUSH TOKEN
//     // -------------------------------------------------

//     const projectId =
//       Constants?.expoConfig?.extra?.eas?.projectId ||
//       Constants?.easConfig?.projectId;

//     if (!projectId) {
//       console.log(
//         "❌ Expo projectId not found"
//       );

//       return null;
//     }

//     const tokenData =
//       await Notifications.getExpoPushTokenAsync({
//         projectId,
//       });

//     const token = tokenData.data;

//     console.log(
//       "📱 EXPO PUSH TOKEN:"
//     );

//     console.log(token);

//     return token;

//   } catch (error) {

//     console.error(
//       "❌ Push notification registration error:",
//       error
//     );

//     return null;
//   }
// }

// // =====================================================
// // TEST LOCAL NOTIFICATION
// // =====================================================

// export async function sendTestNotification() {

//   try {

//     await Notifications.scheduleNotificationAsync({

//       content: {

//         title: "🚨 VineSafe Alert",

//         body:
//           "High temperature detected in Room 1",

//         sound: "default",

//       },

//       trigger: null,

//     });

//     console.log(
//       "✅ Test notification sent"
//     );

//   } catch (error) {

//     console.error(
//       "❌ Test notification error:",
//       error
//     );

//   }
// }





import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// =====================================================
// BACKEND
// =====================================================

const API_URL = "http://10.147.4.54:5000";

// =====================================================
// NOTIFICATION HANDLER
// =====================================================

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// =====================================================
// REGISTER PUSH NOTIFICATIONS
// =====================================================

export async function registerForPushNotificationsAsync() {

   try {

    // -------------------------------------------------
    // ANDROID CHANNEL
    // -------------------------------------------------

    if (Platform.OS === "android") {

      await Notifications.setNotificationChannelAsync(
        "default",
        {
          name: "default",

          importance:
            Notifications.AndroidImportance.MAX,

          vibrationPattern: [
            0,
            250,
            250,
            250,
          ],

          sound: "default",
        }
      );
    }


    // -------------------------------------------------
    // PHYSICAL DEVICE CHECK
    // -------------------------------------------------

    
    // -------------------------------------------------
    // ANDROID CHANNEL
    // -------------------------------------------------

    if (Platform.OS === "android") {

      await Notifications.setNotificationChannelAsync(
        "default",
        {
          name: "default",

          importance:
            Notifications.AndroidImportance.MAX,

          vibrationPattern: [
            0,
            250,
            250,
            250,
          ],

          sound: "default",
        }
      );
    }

    // -------------------------------------------------
    // CHECK PERMISSION
    // -------------------------------------------------

    const {
      status: existingStatus,
    } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    // -------------------------------------------------
    // REQUEST PERMISSION
    // -------------------------------------------------

    if (existingStatus !== "granted") {

      const {
        status,
      } =
        await Notifications.requestPermissionsAsync();

      finalStatus = status;
    }

    if (finalStatus !== "granted") {

      console.log(
        "❌ Notification permission not granted"
      );

      return null;
    }

    console.log(
      "✅ Notification permission granted"
    );

    // -------------------------------------------------
    // GET EXPO PUSH TOKEN
    // -------------------------------------------------

    const tokenData =
      await Notifications.getExpoPushTokenAsync();

    const expoPushToken =
      tokenData.data;

    console.log(
      "📱 EXPO PUSH TOKEN:"
    );

    console.log(
      expoPushToken
    );

    // -------------------------------------------------
    // SEND TOKEN TO BACKEND
    // -------------------------------------------------

    const response = await fetch(
      `${API_URL}/api/notifications/token`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Accept:
            "application/json",
        },

        body: JSON.stringify({
          expo_push_token:
            expoPushToken,
        }),
      }
    );

    console.log(
      "📡 Token API status:",
      response.status
    );

    const result =
      await response.json();

    console.log(
      "📦 Token API response:",
      result
    );

    if (!response.ok) {

      throw new Error(
        result.message ||
        "Failed to register push token"
      );
    }

    console.log(
      "✅ Push token registered with backend"
    );

    return expoPushToken;

  } catch (error) {

    console.error(
      "❌ Notification registration error:",
      error
    );

    return null;
  }
}


// =====================================================
// TEST LOCAL NOTIFICATION
// =====================================================

export async function sendTestNotification() {

  try {

    await Notifications.scheduleNotificationAsync({

      content: {

        title:
          "🚨 VineSafe Alert",

        body:
          "High temperature detected in Room 1",

        sound:
          "default",

      },

      trigger:
        null,

    });

    console.log(
      "✅ Test notification sent"
    );

  } catch (error) {

    console.error(
      "❌ Test notification error:",
      error
    );

  }
}