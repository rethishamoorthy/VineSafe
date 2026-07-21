

// import * as AuthSession from "expo-auth-session";
// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";

// WebBrowser.maybeCompleteAuthSession();

// console.log(
//   "Redirect URI:",
//   AuthSession.makeRedirectUri()
// );
// export function useGoogleAuth() {
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     webClientId:
//       "476617091342-55fj14pve00etsgvlvi52480cke68qn7.apps.googleusercontent.com",

//     androidClientId:
//       "476617091342-mrjkpejpdbrrlac98nf721cf9t7lkq9e.apps.googleusercontent.com",

//     responseType: "id_token",
//   });

//   return { request, response, promptAsync };
// }


// import * as Google from "expo-auth-session/providers/google";
// import * as WebBrowser from "expo-web-browser";

// WebBrowser.maybeCompleteAuthSession();

// export function useGoogleAuth() {
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     webClientId:
//       "476617091342-55fj14pve00etsgvlvi52480cke68qn7.apps.googleusercontent.com",

//     androidClientId:
//       "476617091342-mrjkpejpdbrrlac98nf721cf9t7lkq9e.apps.googleusercontent.com",

//     scopes: ["openid", "profile", "email"],

//     responseType: "id_token",
//   });

//   return {
//     request,
//     response,
//     promptAsync,
//   };
// }


import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "476617091342-55fj14pve00etsgvlvi52480cke68qn7.apps.googleusercontent.com",
  
});

console.log("GoogleSignin Object:", GoogleSignin);

export default GoogleSignin;