// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";

// WebBrowser.maybeCompleteAuthSession();

// export function useGoogleAuth() {
//   const [request, response, promptAsync] =
//     Google.useAuthRequest({
//       webClientId:
//         "476617091342-55fj14pve00etsgvlvi52480cke68qn7.apps.googleusercontent.com",

//       responseType: "id_token",
//     });

//   return {
//     request,
//     response,
//     promptAsync,
//   };
// }




import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleAuth() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "476617091342-55fj14pve00etsgvlvi52480cke68qn7.apps.googleusercontent.com",

    ...(Platform.OS === "android"
      ? {}
      : {}),

    responseType: "id_token",
  });

  return { request, response, promptAsync };
}