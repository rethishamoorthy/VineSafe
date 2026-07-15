// // // Import the functions you need from the SDKs you need
// // //import { getAnalytics } from "firebase/analytics";
// // import { initializeApp } from "firebase/app";
// // // TODO: Add SDKs for Firebase products that you want to use
// // // https://firebase.google.com/docs/web/setup#available-libraries

// // // Your web app's Firebase configuration
// // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// // const firebaseConfig = {
// //   apiKey: "AIzaSyAFOkrPSI_A1CJ-VqxyTNDCY-X-v6O45xI",
// //   authDomain: "vinesafe-fc830.firebaseapp.com",
// //   projectId: "vinesafe-fc830",
// //   storageBucket: "vinesafe-fc830.firebasestorage.app",
// //   messagingSenderId: "476617091342",
// //   appId: "1:476617091342:web:969ead9f511d7b2c724f5f",
// //   measurementId: "G-K4XBJDXEZC"
// // };

// // // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// // //const analytics = getAnalytics(app);
// // export default app;



// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAFOkrPSI_A1CJ-VqxyTNDCY-X-v6O45xI",
//   authDomain: "vinesafe-fc830.firebaseapp.com",
//   projectId: "vinesafe-fc830",
//   storageBucket: "vinesafe-fc830.firebasestorage.app",
//   messagingSenderId: "476617091342",
//   appId: "1:476617091342:web:969ead9f511d7b2c724f5f",
//   measurementId: "G-K4XBJDXEZC",
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
// export const db = getFirestore(app);

// export default app;


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFOkrPSI_A1CJ-VqxyTNDCY-X-v6O45xI",
  authDomain: "vinesafe-fc830.firebaseapp.com",
  projectId: "vinesafe-fc830",
  storageBucket: "vinesafe-fc830.firebasestorage.app",
  messagingSenderId: "476617091342",
  appId: "1:476617091342:web:969ead9f511d7b2c724f5f",
  measurementId: "G-K4XBJDXEZC",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;