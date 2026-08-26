const express = require("express");
const router = express.Router();
const db = require("../database/db");

// =====================================================
// GET /api/alerts
// GET ALL ALERTS
// =====================================================

router.get("/", (req, res) => {
  const sql = `
    SELECT
      a.alert_id,
      a.room_id,
      sr.room_number,
      a.sensor_id,
      a.alert_type,
      a.message,
      a.sensor_value,
      a.status,
      a.created_at,
      a.resolved_at
    FROM alerts a
    LEFT JOIN storage_room sr
      ON a.room_id = sr.room_id
    ORDER BY a.alert_id DESC
    LIMIT 50
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error(
        "❌ Failed to fetch alerts:",
        err.message
      );

      return res.status(500).json({
        success: false,
        message: "Failed to fetch alerts",
        error: err.message,
      });
    }

    res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  });
});

module.exports = router;