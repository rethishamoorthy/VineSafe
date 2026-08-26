const express = require("express");
const router = express.Router();
const db = require("../database/db");

// =====================================================
// POST /api/notifications/token
// APP → BACKEND → MYSQL
// SAVE EXPO PUSH TOKEN
// =====================================================

router.post("/token", (req, res) => {
  const { expo_push_token } = req.body;

  console.log("📱 Push token received:");
  console.log(expo_push_token);

  // ---------------------------------------------------
  // VALIDATION
  // ---------------------------------------------------

  if (!expo_push_token) {
    return res.status(400).json({
      success: false,
      message: "expo_push_token is required",
    });
  }

  // ---------------------------------------------------
  // INSERT / UPDATE TOKEN
  // ---------------------------------------------------

  const sql = `
    INSERT INTO push_tokens
      (expo_push_token)
    VALUES (?)
    ON DUPLICATE KEY UPDATE
      expo_push_token = VALUES(expo_push_token)
  `;

  db.query(
    sql,
    [expo_push_token],
    (err, result) => {

      if (err) {
        console.error(
          "❌ Failed to save push token:",
          err.message
        );

        return res.status(500).json({
          success: false,
          message: "Failed to save push token",
          error: err.message,
        });
      }

      console.log(
        "✅ Push token saved successfully"
      );

      res.status(200).json({
        success: true,
        message: "Push token saved successfully",
      });
    }
  );
});

module.exports = router;