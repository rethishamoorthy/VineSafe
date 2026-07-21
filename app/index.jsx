// import { Redirect } from "expo-router";

// export default function Index() {
//   return <Redirect href="/public" />;
// }

import { Redirect } from "expo-router";
import { auth } from "../firebaseConfig";

export default function Index() {
  if (auth.currentUser) {
    return <Redirect href="/dashboard" />;
  }

  return <Redirect href="/public" />;
}