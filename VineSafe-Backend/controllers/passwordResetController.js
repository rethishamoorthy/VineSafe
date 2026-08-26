// const db = require("../database/db");
// const crypto = require("crypto");
// const { sendVerificationEmail } = require("../services/emailService");

// // Temporary verification storage
// const verificationStore = new Map();

// /*
// =========================================================
// STEP 1: FORGOT PASSWORD
// - User enters email
// - Backend checks manager table
// - Generates 3 numbers
// - Sends all 3 numbers to email
// - Stores the correct number temporarily
// =========================================================
// */
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is required",
//       });
//     }

//     const normalizedEmail = email.trim().toLowerCase();

//     // Check manager account
//     const [users] = await db.promise().query(
//       "SELECT * FROM manager WHERE LOWER(email) = ? LIMIT 1",
//       [normalizedEmail]
//     );

//     if (users.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No account found with this email address.",
//       });
//     }

//     // Generate 4 unique numbers
//     const numbers = [];

//     while (numbers.length < 4) {
//       const number = crypto.randomInt(100, 1000);

//       if (!numbers.includes(number)) {
//         numbers.push(number);
//       }
//     }

//     // Select correct number
//     const correctNumber =
//       numbers[crypto.randomInt(0, numbers.length)];

//     // Create verification ID
//     const verificationId =
//       crypto.randomBytes(32).toString("hex");

//     // Store verification information
//     verificationStore.set(verificationId, {
//       email: normalizedEmail,
//       correctNumber,
//       expiresAt: Date.now() + 10 * 60 * 1000,
//       verified: false,
//     });

//     // Send all 4 numbers to email
//     await sendVerificationEmail(
//       normalizedEmail,
//       numbers
//     );

//     console.log(
//       "Verification numbers sent to:",
//       normalizedEmail
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Verification numbers sent successfully.",
//       verificationId,
//       numbers,
//     });

//   } catch (error) {
//     console.error(
//       "FORGOT PASSWORD ERROR:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message: "Unable to process password reset.",
//     });
//   }
// };


// /*
// =========================================================
// STEP 2: VERIFY SELECTED NUMBER
// - Frontend sends verificationId
// - Frontend sends selectedNumber
// - Backend checks the correct number
// =========================================================
// */

// const verifyResetNumber = async (req, res) => {
//   try {
//     const {
//       verificationId,
//       selectedNumber,
//     } = req.body;

//     if (
//       !verificationId ||
//       selectedNumber === undefined
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Verification ID and selected number are required.",
//       });
//     }

//     /*
//     =====================================================
//     FIND VERIFICATION SESSION
//     =====================================================
//     */

//     const verification =
//       verificationStore.get(verificationId);

//     if (!verification) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Verification session not found or expired.",
//       });
//     }

//     /*
//     =====================================================
//     CHECK EXPIRY
//     =====================================================
//     */

//     if (Date.now() > verification.expiresAt) {
//       verificationStore.delete(verificationId);

//       return res.status(400).json({
//         success: false,
//         message:
//           "Verification code has expired. Please try again.",
//       });
//     }

//     /*
//     =====================================================
//     CONVERT SELECTED NUMBER
//     =====================================================
//     */

//     const selected = Number(selectedNumber);

//     /*
//     =====================================================
//     CHECK NUMBER
//     =====================================================
//     */

//     if (
//       selected !== verification.correctNumber
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Incorrect number. Please select the correct number.",
//       });
//     }

//     /*
//     =====================================================
//     CORRECT NUMBER
//     =====================================================
//     */

//     verification.verified = true;

//     verificationStore.set(
//       verificationId,
//       verification
//     );

//     console.log(
//       "Email verification successful:",
//       verification.email
//     );

//     return res.status(200).json({
//       success: true,
//       message:
//         "Email verification successful.",
//       verificationId: verificationId,
//       verified: true,
//     });

//   } catch (error) {
//     console.error(
//       "VERIFY RESET NUMBER ERROR:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message:
//         "Unable to verify the number.",
//     });
//   }
// };


// /*
// =========================================================
// STEP 3: SEND VERIFICATION NUMBERS
// This is an alternative endpoint if your frontend
// currently calls /send-verification.

// It uses the same verification system.
// =========================================================
// */

// const sendVerificationNumbers = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is required",
//       });
//     }

//     const normalizedEmail =
//       email.trim().toLowerCase();

//     /*
//     =====================================================
//     DATABASE CHECK
//     =====================================================
//     */

//     const db = req.app.locals.db;

//     if (!db) {
//       return res.status(500).json({
//         success: false,
//         message:
//           "Database connection not available.",
//       });
//     }

//     const [users] = await db.query(
//       "SELECT * FROM manager WHERE LOWER(email) = ? LIMIT 1",
//       [normalizedEmail]
//     );

//     if (users.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "No account found with this email address.",
//       });
//     }

//     /*
//     =====================================================
//     GENERATE 3 UNIQUE NUMBERS
//     =====================================================
//     */

//     const numbers = [];

//     while (numbers.length < 3) {
//       const number = crypto.randomInt(100, 1000);

//       if (!numbers.includes(number)) {
//         numbers.push(number);
//       }
//     }

//     /*
//     =====================================================
//     SELECT CORRECT NUMBER
//     =====================================================
//     */

//     const correctNumber =
//       numbers[crypto.randomInt(0, numbers.length)];

//     /*
//     =====================================================
//     CREATE VERIFICATION ID
//     =====================================================
//     */

//     const verificationId =
//       crypto.randomBytes(32).toString("hex");

//     /*
//     =====================================================
//     STORE VERIFICATION
//     =====================================================
//     */

//     verificationStore.set(verificationId, {
//       email: normalizedEmail,
//       correctNumber: correctNumber,
//       verified: false,
//       expiresAt: Date.now() + 10 * 60 * 1000,
//     });

//     /*
//     =====================================================
//     SEND EMAIL
//     =====================================================
//     */

//     await sendVerificationEmail(
//       normalizedEmail,
//       numbers
//     );

//     console.log(
//       "Verification numbers sent to:",
//       normalizedEmail
//     );

//     return res.status(200).json({
//       success: true,
//       message:
//         "Verification numbers sent to your email.",
//       verificationId: verificationId,
//     });

//   } catch (error) {
//     console.error(
//       "SEND VERIFICATION ERROR:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message:
//         "Unable to send verification email.",
//     });
//   }
// };


// /*
// =========================================================
// EXPORT EVERYTHING
// ONLY ONE module.exports
// =========================================================
// */

// module.exports = {
//   forgotPassword,
//   verifyResetNumber,
//   verificationStore,
//   sendVerificationNumbers,
// };





// const db = require("../database/db");
// const crypto = require("crypto");
// const {
//   sendVerificationEmail,
// } = require("../services/emailService");

// // =====================================================
// // TEMPORARY VERIFICATION STORAGE
// // =====================================================

// const verificationStore = new Map();

// // =====================================================
// // STEP 1
// // FORGOT PASSWORD
// //
// // User enters email
// // → Check manager table
// // → Generate 4 numbers
// // → Send 4 numbers to email
// // → Store correct number temporarily
// // =====================================================

// const forgotPassword = async (req, res) => {
//   try {
//     // -------------------------------------------------
//     // CHECK REQUEST BODY
//     // -------------------------------------------------

//     if (!req.body) {
//       return res.status(400).json({
//         success: false,
//         message: "Request body is missing.",
//       });
//     }

//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email is required.",
//       });
//     }

//     // -------------------------------------------------
//     // NORMALIZE EMAIL
//     // -------------------------------------------------

//     const normalizedEmail = email
//       .trim()
//       .toLowerCase();

//     // -------------------------------------------------
//     // CHECK MANAGER ACCOUNT
//     // -------------------------------------------------

//     const [users] = await db
//       .promise()
//       .query(
//         `
//         SELECT *
//         FROM manager
//         WHERE LOWER(email) = ?
//         LIMIT 1
//         `,
//         [normalizedEmail]
//       );

//     if (users.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "No account found with this email address.",
//       });
//     }

//     // -------------------------------------------------
//     // GENERATE 4 UNIQUE NUMBERS
//     // -------------------------------------------------

//     const numbers = [];

//     while (numbers.length < 4) {
//       const number = crypto.randomInt(
//         100,
//         1000
//       );

//       if (!numbers.includes(number)) {
//         numbers.push(number);
//       }
//     }

//     // -------------------------------------------------
//     // SELECT ONE CORRECT NUMBER
//     // -------------------------------------------------

//     const correctNumber =
//       numbers[
//         crypto.randomInt(
//           0,
//           numbers.length
//         )
//       ];

//     // -------------------------------------------------
//     // CREATE VERIFICATION ID
//     // -------------------------------------------------

//     const verificationId =
//       crypto
//         .randomBytes(32)
//         .toString("hex");

//     // -------------------------------------------------
//     // STORE VERIFICATION DATA
//     // -------------------------------------------------

//     verificationStore.set(
//       verificationId,
//       {
//         email: normalizedEmail,

//         correctNumber: correctNumber,

//         numbers: numbers,

//         verified: false,

//         expiresAt:
//           Date.now() +
//           10 * 60 * 1000,
//       }
//     );

//     // -------------------------------------------------
//     // SEND EMAIL
//     // -------------------------------------------------

//     await sendVerificationEmail(
//       normalizedEmail,
//       numbers
//     );

//     console.log(
//       "================================="
//     );

//     console.log(
//       "VERIFICATION EMAIL SENT"
//     );

//     console.log(
//       "Email:",
//       normalizedEmail
//     );

//     console.log(
//       "Numbers:",
//       numbers
//     );

//     console.log(
//       "Verification ID:",
//       verificationId
//     );

//     console.log(
//       "================================="
//     );

//     // -------------------------------------------------
//     // SEND RESPONSE TO FRONTEND
//     //
//     // IMPORTANT:
//     // Do NOT send correctNumber.
//     // -------------------------------------------------

//     return res.status(200).json({
//       success: true,

//       message:
//         "Verification numbers sent successfully.",

//       verificationId:

//         verificationId,

//       numbers: numbers,
//     });

//   } catch (error) {

//     console.error(
//       "FORGOT PASSWORD ERROR:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message:
//         "Unable to process password reset.",
//     });
//   }
// };

// // =====================================================
// // STEP 2
// // VERIFY SELECTED NUMBER
// //
// // Frontend sends:
// // verificationId
// // selectedNumber
// //
// // Backend checks:
// // selectedNumber === correctNumber
// // =====================================================

// const verifyResetNumber = async (
//   req,
//   res
// ) => {
//   try {

//     // -------------------------------------------------
//     // CHECK REQUEST BODY
//     // -------------------------------------------------

//     if (!req.body) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Request body is missing.",
//       });
//     }

//     const {
//       verificationId,
//       selectedNumber,
//     } = req.body;

//     // -------------------------------------------------
//     // VALIDATION
//     // -------------------------------------------------

//     if (
//       !verificationId ||
//       selectedNumber === undefined ||
//       selectedNumber === null
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Verification ID and selected number are required.",
//       });
//     }

//     // -------------------------------------------------
//     // FIND VERIFICATION SESSION
//     // -------------------------------------------------

//     const verification =
//       verificationStore.get(
//         verificationId
//       );

//     if (!verification) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Verification session not found or expired. Please request a new verification email.",
//       });
//     }

//     // -------------------------------------------------
//     // CHECK EXPIRY
//     // -------------------------------------------------

//     if (
//       Date.now() >
//       verification.expiresAt
//     ) {

//       verificationStore.delete(
//         verificationId
//       );

//       return res.status(400).json({
//         success: false,
//         message:
//           "Verification code has expired. Please request a new one.",
//       });
//     }

//     // -------------------------------------------------
//     // IF ALREADY VERIFIED
//     // -------------------------------------------------

//     if (verification.verified) {
//       return res.status(200).json({
//         success: true,
//         message:
//           "Email is already verified.",
//         verificationId:
//           verificationId,
//         verified: true,
//       });
//     }

//     // -------------------------------------------------
//     // CONVERT SELECTED NUMBER
//     // -------------------------------------------------

//     const selected =
//       Number(selectedNumber);

//     // -------------------------------------------------
//     // CHECK NUMBER
//     // -------------------------------------------------

//     if (
//       Number.isNaN(selected)
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Invalid number selected.",
//       });
//     }

//     // -------------------------------------------------
//     // WRONG NUMBER
//     // -------------------------------------------------

//     if (
//       selected !==
//       verification.correctNumber
//     ) {

//       console.log(
//         "Incorrect verification number for:",
//         verification.email
//       );

//       return res.status(400).json({
//         success: false,
//         message:
//           "Incorrect number. Please select the correct number from your email.",
//       });
//     }

//     // -------------------------------------------------
//     // CORRECT NUMBER
//     // -------------------------------------------------

//     verification.verified = true;

//     verificationStore.set(
//       verificationId,
//       verification
//     );

//     console.log(
//       "================================="
//     );

//     console.log(
//       "EMAIL VERIFICATION SUCCESSFUL"
//     );

//     console.log(
//       "Email:",
//       verification.email
//     );

//     console.log(
//       "================================="
//     );

//     // -------------------------------------------------
//     // SUCCESS RESPONSE
//     // -------------------------------------------------

//     return res.status(200).json({
//       success: true,

//       message:
//         "Email verification successful.",

//       verificationId:
//         verificationId,

//       email:
//         verification.email,

//       verified: true,
//     });

//   } catch (error) {

//     console.error(
//       "VERIFY RESET NUMBER ERROR:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message:
//         "Unable to verify the number.",
//     });
//   }
// };

// // =====================================================
// // STEP 3
// // SEND VERIFICATION NUMBERS
// //
// // This is an optional endpoint.
// // If your app does not use it, it can remain here safely.
// // =====================================================

// const sendVerificationNumbers = async (
//   req,
//   res
// ) => {
//   try {

//     // -------------------------------------------------
//     // CHECK REQUEST BODY
//     // -------------------------------------------------

//     if (!req.body) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Request body is missing.",
//       });
//     }

//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Email is required.",
//       });
//     }

//     // -------------------------------------------------
//     // NORMALIZE EMAIL
//     // -------------------------------------------------

//     const normalizedEmail =
//       email
//         .trim()
//         .toLowerCase();

//     // -------------------------------------------------
//     // CHECK DATABASE
//     // -------------------------------------------------

//     const [users] = await db
//       .promise()
//       .query(
//         `
//         SELECT *
//         FROM manager
//         WHERE LOWER(email) = ?
//         LIMIT 1
//         `,
//         [normalizedEmail]
//       );

//     if (users.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message:
//           "No account found with this email address.",
//       });
//     }

//     // -------------------------------------------------
//     // GENERATE 4 UNIQUE NUMBERS
//     // -------------------------------------------------

//     const numbers = [];

//     while (numbers.length < 4) {

//       const number =
//         crypto.randomInt(
//           100,
//           1000
//         );

//       if (
//         !numbers.includes(number)
//       ) {
//         numbers.push(number);
//       }
//     }

//     // -------------------------------------------------
//     // SELECT CORRECT NUMBER
//     // -------------------------------------------------

//     const correctNumber =
//       numbers[
//         crypto.randomInt(
//           0,
//           numbers.length
//         )
//       ];

//     // -------------------------------------------------
//     // CREATE VERIFICATION ID
//     // -------------------------------------------------

//     const verificationId =
//       crypto
//         .randomBytes(32)
//         .toString("hex");

//     // -------------------------------------------------
//     // STORE DATA
//     // -------------------------------------------------

//     verificationStore.set(
//       verificationId,
//       {
//         email:
//           normalizedEmail,

//         correctNumber:
//           correctNumber,

//         numbers:
//           numbers,

//         verified: false,

//         expiresAt:
//           Date.now() +
//           10 * 60 * 1000,
//       }
//     );

//     // -------------------------------------------------
//     // SEND EMAIL
//     // -------------------------------------------------

//     await sendVerificationEmail(
//       normalizedEmail,
//       numbers
//     );

//     console.log(
//       "Verification numbers sent:",
//       normalizedEmail
//     );

//     // -------------------------------------------------
//     // RESPONSE
//     // -------------------------------------------------

//     return res.status(200).json({
//       success: true,

//       message:
//         "Verification numbers sent to your email.",

//       verificationId:
//         verificationId,

//       numbers:
//         numbers,
//     });

//   } catch (error) {

//     console.error(
//       "SEND VERIFICATION ERROR:",
//       error
//     );

//     return res.status(500).json({
//       success: false,

//       message:
//         "Unable to send verification email.",
//     });
//   }
// };

// // =====================================================
// // EXPORT
// // ONLY ONE module.exports
// // =====================================================
// const resetPassword = async (req, res) => {
//   try {
//     const {
//       verificationId,
//       newPassword,
//       confirmPassword,
//     } = req.body;

//     // -----------------------------
//     // Validate input
//     // -----------------------------
//     if (
//       !verificationId ||
//       !newPassword ||
//       !confirmPassword
//     ) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Verification ID, new password and confirm password are required.",
//       });
//     }

//     // -----------------------------
//     // Check passwords
//     // -----------------------------
//     if (newPassword !== confirmPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "Passwords do not match.",
//       });
//     }

//     // -----------------------------
//     // Password length
//     // -----------------------------
//     if (newPassword.length < 6) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Password must contain at least 6 characters.",
//       });
//     }

//     // -----------------------------
//     // Find verification session
//     // -----------------------------
//     const verification =
//       verificationStore.get(verificationId);

//     if (!verification) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "Verification session not found or expired.",
//       });
//     }

//     // -----------------------------
//     // Check expiry
//     // -----------------------------
//     if (Date.now() > verification.expiresAt) {
//       verificationStore.delete(verificationId);

//       return res.status(400).json({
//         success: false,
//         message:
//           "Verification session has expired. Please start again.",
//       });
//     }

//     // -----------------------------
//     // IMPORTANT:
//     // User must verify email first
//     // -----------------------------
//     if (!verification.verified) {
//       return res.status(403).json({
//         success: false,
//         message:
//           "Please verify your email before changing the password.",
//       });
//     }

//     const email = verification.email;

//     // -----------------------------
//     // Update manager password
//     // -----------------------------
//     await db.promise().query(
//       "UPDATE manager SET password = ? WHERE LOWER(email) = ?",
//       [newPassword, email]
//     );

//     // -----------------------------
//     // Delete verification session
//     // -----------------------------
//     verificationStore.delete(verificationId);

//     console.log(
//       "PASSWORD RESET SUCCESS:",
//       email
//     );

//     return res.status(200).json({
//       success: true,
//       message:
//         "Password changed successfully.",
//     });

//   } catch (error) {
//     console.error(
//       "RESET PASSWORD ERROR:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message:
//         "Unable to reset password.",
//     });
//   }
// };
// module.exports = {
//   forgotPassword,
//   verifyResetNumber,
//   verificationStore,
//   sendVerificationNumbers,
//   resetPassword,
// };










const db = require("../database/db");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../services/emailService");
const admin = require("../services/firebaseAdmin");

// =====================================================
// TEMPORARY VERIFICATION STORAGE
// =====================================================

const verificationStore = new Map();


// =====================================================
// STEP 1
// FORGOT PASSWORD
// =====================================================

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body || {};

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // =================================================
    // CHECK MANAGER ACCOUNT IN MYSQL
    // =================================================

    const [users] = await db
      .promise()
      .query(
        "SELECT * FROM manager WHERE LOWER(email) = ? LIMIT 1",
        [normalizedEmail]
      );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No account found with this email address.",
      });
    }

    // =================================================
    // GENERATE 4 UNIQUE NUMBERS
    // =================================================

    const numbers = [];

    while (numbers.length < 4) {
      const number = crypto.randomInt(100, 1000);

      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }

    // =================================================
    // SELECT CORRECT NUMBER
    // =================================================

    const correctNumber =
      numbers[crypto.randomInt(0, numbers.length)];

    // =================================================
    // CREATE VERIFICATION ID
    // =================================================

    const verificationId =
      crypto.randomBytes(32).toString("hex");

    // =================================================
    // STORE VERIFICATION
    // =================================================

    verificationStore.set(verificationId, {
      email: normalizedEmail,
      correctNumber: correctNumber,
      verified: false,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    // =================================================
    // SEND EMAIL
    // =================================================

    await sendVerificationEmail(
      normalizedEmail,
      numbers
    );

    console.log(
      "Verification numbers sent to:",
      normalizedEmail
    );

    return res.status(200).json({
      success: true,
      message:
        "Verification numbers sent successfully.",
      verificationId: verificationId,
      numbers: numbers,
    });

  } catch (error) {
    console.error(
      "FORGOT PASSWORD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to process password reset.",
    });
  }
};


// =====================================================
// STEP 2
// VERIFY NUMBER
// =====================================================

const verifyResetNumber = async (req, res) => {
  try {
    const {
      verificationId,
      selectedNumber,
    } = req.body || {};

    if (
      !verificationId ||
      selectedNumber === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Verification ID and selected number are required.",
      });
    }

    // =================================================
    // FIND SESSION
    // =================================================

    const verification =
      verificationStore.get(verificationId);

    if (!verification) {
      return res.status(400).json({
        success: false,
        message:
          "Verification session not found or expired.",
      });
    }

    // =================================================
    // CHECK EXPIRY
    // =================================================

    if (Date.now() > verification.expiresAt) {
      verificationStore.delete(verificationId);

      return res.status(400).json({
        success: false,
        message:
          "Verification code has expired. Please try again.",
      });
    }

    // =================================================
    // CHECK NUMBER
    // =================================================

    const selected = Number(selectedNumber);

    if (selected !== verification.correctNumber) {
      return res.status(400).json({
        success: false,
        message:
          "Incorrect number. Please select the correct number.",
      });
    }

    // =================================================
    // VERIFICATION SUCCESS
    // =================================================

    verification.verified = true;

    verificationStore.set(
      verificationId,
      verification
    );

    console.log(
      "EMAIL VERIFIED:",
      verification.email
    );

    return res.status(200).json({
      success: true,
      message:
        "Email verification successful.",
      verificationId: verificationId,
      verified: true,
    });

  } catch (error) {
    console.error(
      "VERIFY RESET NUMBER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to verify the number.",
    });
  }
};


// =====================================================
// STEP 3
// RESET FIREBASE PASSWORD
// =====================================================

const resetPassword = async (req, res) => {
  try {
    const {
      verificationId,
      newPassword,
      confirmPassword,
    } = req.body || {};

    // =================================================
    // VALIDATION
    // =================================================

    if (!verificationId) {
      return res.status(400).json({
        success: false,
        message:
          "Verification session is missing.",
      });
    }

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "New password is required.",
      });
    }

    if (!confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Confirm password is required.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain at least 6 characters.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Passwords do not match.",
      });
    }

    // =================================================
    // FIND VERIFICATION
    // =================================================

    const verification =
      verificationStore.get(verificationId);

    if (!verification) {
      return res.status(400).json({
        success: false,
        message:
          "Verification session not found or expired.",
      });
    }

    // =================================================
    // CHECK EXPIRY
    // =================================================

    if (Date.now() > verification.expiresAt) {
      verificationStore.delete(verificationId);

      return res.status(400).json({
        success: false,
        message:
          "Verification session has expired. Please start again.",
      });
    }

    // =================================================
    // IMPORTANT:
    // USER MUST HAVE VERIFIED EMAIL NUMBER
    // =================================================

    if (!verification.verified) {
      return res.status(403).json({
        success: false,
        message:
          "Please verify your email before changing the password.",
      });
    }

    const email = verification.email;

    // =================================================
    // FIND FIREBASE USER
    // =================================================

    let firebaseUser;

    try {
      firebaseUser =
        await admin
          .auth()
          .getUserByEmail(email);

    } catch (firebaseError) {
      console.error(
        "FIREBASE USER ERROR:",
        firebaseError
      );

      if (
        firebaseError.code ===
        "auth/user-not-found"
      ) {
        return res.status(404).json({
          success: false,
          message:
            "No Firebase account found with this email.",
        });
      }

      throw firebaseError;
    }

    // =================================================
    // UPDATE FIREBASE PASSWORD
    // =================================================

    await admin
      .auth()
      .updateUser(firebaseUser.uid, {
        password: newPassword,
      });

    // =================================================
    // REMOVE USED VERIFICATION SESSION
    // =================================================

    verificationStore.delete(
      verificationId
    );

    console.log(
      "PASSWORD RESET SUCCESS:",
      email
    );

    return res.status(200).json({
      success: true,
      message:
        "Password changed successfully.",
    });

  } catch (error) {
    console.error(
      "RESET PASSWORD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to reset password.",
    });
  }
};


// =====================================================
// OPTIONAL
// SEND VERIFICATION NUMBERS
// =====================================================

const sendVerificationNumbers = async (req, res) => {
  try {
    const { email } = req.body || {};

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const normalizedEmail =
      email.trim().toLowerCase();

    // =================================================
    // CHECK MYSQL
    // =================================================

    const [users] = await db
      .promise()
      .query(
        "SELECT * FROM manager WHERE LOWER(email) = ? LIMIT 1",
        [normalizedEmail]
      );

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "No account found with this email address.",
      });
    }

    // =================================================
    // GENERATE NUMBERS
    // =================================================

    const numbers = [];

    while (numbers.length < 4) {
      const number = crypto.randomInt(100, 1000);

      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }

    const correctNumber =
      numbers[crypto.randomInt(0, numbers.length)];

    // =================================================
    // VERIFICATION ID
    // =================================================

    const verificationId =
      crypto.randomBytes(32).toString("hex");

    // =================================================
    // STORE
    // =================================================

    verificationStore.set(verificationId, {
      email: normalizedEmail,
      correctNumber,
      verified: false,
      expiresAt:
        Date.now() + 10 * 60 * 1000,
    });

    // =================================================
    // SEND EMAIL
    // =================================================

    await sendVerificationEmail(
      normalizedEmail,
      numbers
    );

    return res.status(200).json({
      success: true,
      message:
        "Verification numbers sent to your email.",
      verificationId,
      numbers,
    });

  } catch (error) {
    console.error(
      "SEND VERIFICATION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to send verification email.",
    });
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  forgotPassword,
  verifyResetNumber,
  resetPassword,
  verificationStore,
  sendVerificationNumbers,
};