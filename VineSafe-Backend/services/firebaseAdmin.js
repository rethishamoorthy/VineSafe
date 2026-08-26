// const {
//   initializeApp,
//   getApps,
//   cert,
// } = require("firebase-admin/app");

// let adminApp;

// try {
//   if (getApps().length === 0) {
//     const projectId = process.env.FIREBASE_PROJECT_ID;
//     const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

//     const privateKey = process.env.FIREBASE_PRIVATE_KEY
//       ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
//       : undefined;

//     // Check required Firebase credentials
//     if (!projectId) {
//       throw new Error("FIREBASE_PROJECT_ID is missing in .env");
//     }

//     if (!clientEmail) {
//       throw new Error("FIREBASE_CLIENT_EMAIL is missing in .env");
//     }

//     if (!privateKey) {
//       throw new Error("FIREBASE_PRIVATE_KEY is missing in .env");
//     }

//     adminApp = initializeApp({
//       credential: cert({
//         projectId,
//         clientEmail,
//         privateKey,
//       }),
//     });

//     console.log("✅ Firebase Admin initialized successfully");

//   } else {
//     adminApp = getApps()[0];

//     console.log("✅ Firebase Admin already initialized");
//   }

// } catch (error) {
//   console.error(
//     "❌ Firebase Admin initialization error:",
//     error
//   );
// }

// module.exports = adminApp;






const {
  initializeApp,
  getApps,
  cert,
} = require("firebase-admin/app");

const path = require("path");

let adminApp;

try {
  if (getApps().length === 0) {

    const serviceAccount = require(
      path.join(
        __dirname,
        "../vinesafe-fc830-firebase-adminsdk-fbsvc-cab5b78122.json"
      )
    );

    adminApp = initializeApp({
      credential: cert(serviceAccount),
    });

    console.log(
      "✅ Firebase Admin initialized successfully"
    );

  } else {

    adminApp = getApps()[0];

    console.log(
      "✅ Firebase Admin already initialized"
    );
  }

} catch (error) {

  console.error(
    "❌ Firebase Admin initialization error:",
    error
  );

}

module.exports = adminApp;