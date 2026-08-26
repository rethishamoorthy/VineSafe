// const express = require("express");

// const {
//   forgotPassword,
//   verifyResetNumber,
//   resetPassword,
// } = require("../controllers/passwordResetController");

// const router = express.Router();

// // STEP 1
// router.post(
//   "/forgot-password",
//   forgotPassword
// );

// // STEP 2
// router.post(
//   "/verify-reset-number",
//   verifyResetNumber
// );

// // STEP 3
// router.post(
//   "/reset-password",
//   resetPassword
// );

// module.exports = router;











const express = require("express");

const {
  forgotPassword,
  verifyResetNumber,
  resetPassword,
} = require("../controllers/passwordResetController");

const router = express.Router();


// =====================================================
// STEP 1
// SEND 4 NUMBERS
// =====================================================

router.post(
  "/forgot-password",
  forgotPassword
);


// =====================================================
// STEP 2
// VERIFY SELECTED NUMBER
// =====================================================

router.post(
  "/verify-reset-number",
  verifyResetNumber
);


// =====================================================
// STEP 3
// CHANGE PASSWORD
// =====================================================

router.post(
  "/reset-password",
  resetPassword
);


module.exports = router;