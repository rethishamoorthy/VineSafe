// // const express = require("express");
// // const router = express.Router();


// // // =====================================================
// // // RECEIVE SENSOR DATA FROM ESP32
// // // POST /api/sensor-data
// // // =====================================================

// // router.post("/", (req, res) => {

// //   console.log("📡 Sensor data received:");
// //   console.log(req.body);

// //   const {
// //     room_id,
// //     temperature,
// //     humidity,
// //     gas_value
// //   } = req.body;

// //   // Check required values
// //   if (
// //     temperature === undefined ||
// //     humidity === undefined ||
// //     gas_value === undefined
// //   ) {
// //     return res.status(400).json({
// //       success: false,
// //       message: "Temperature, humidity and gas_value are required"
// //     });
// //   }

// //   res.status(200).json({
// //     success: true,
// //     message: "Sensor data received successfully",
// //     data: {
// //       room_id: room_id || null,
// //       temperature,
// //       humidity,
// //       gas_value
// //     }
// //   });
// // });


// // module.exports = router;




// const express = require("express");

// const router = express.Router();

// // POST /api/sensor
// router.post("/", (req, res) => {
//   console.log("📡 Sensor data received:");
//   console.log(req.body);

//   const {
//     room_id,
//     temperature,
//     humidity,
//     gas_value,
//   } = req.body;

//   if (
//     temperature === undefined ||
//     humidity === undefined ||
//     gas_value === undefined
//   ) {
//     return res.status(400).json({
//       success: false,
//       message: "Temperature, humidity and gas_value are required",
//     });
//   }

//   res.status(200).json({
//     success: true,
//     message: "Sensor data received successfully",
//     data: {
//       room_id: room_id || null,
//       temperature,
//       humidity,
//       gas_value,
//     },
//   });
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const db = require("../database/db"); // use your actual DB file path

// // POST /api/sensor
// router.post("/", (req, res) => {

//   console.log("📡 Sensor data received:");
//   console.log(req.body);

//   const {
//     room_id,
//     temperature,
//     humidity,
//     gas_value
//   } = req.body;

//   // Check required values
//   if (
//     room_id === undefined ||
//     temperature === undefined ||
//     humidity === undefined ||
//     gas_value === undefined
//   ) {
//     return res.status(400).json({
//       success: false,
//       message: "room_id, temperature, humidity and gas_value are required"
//     });
//   }

//   // Insert sensor data into MySQL
//   const sql = `
//     INSERT INTO sensor_data
//     (room_id, temperature, humidity, gas_value, door_status, fan_status)
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   const values = [
//     room_id,
//     temperature,
//     humidity,
//     gas_value,
//     "Closed",
//     "OFF"
//   ];

//   db.query(sql, values, (err, result) => {

//     if (err) {

//       console.error("❌ Sensor data insert failed:", err.message);

//       return res.status(500).json({
//         success: false,
//         message: "Failed to save sensor data",
//         error: err.message
//       });
//     }

//     console.log("✅ Sensor data saved to MySQL");
//     console.log("Sensor ID:", result.insertId);

//     res.status(200).json({
//       success: true,
//       message: "Sensor data saved successfully",
//       sensor_id: result.insertId
//     });

//   });

// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const db = require("../database/db");


// // =====================================================
// // POST /api/sensor
// // RECEIVE SENSOR DATA FROM ESP32
// // =====================================================

// router.post("/", (req, res) => {

//   console.log("📡 Sensor data received:");
//   console.log(req.body);

//   const {
//     room_id,
//     temperature,
//     humidity,
//     gas_value
//   } = req.body;

//   // Check required values
//   if (
//     room_id === undefined ||
//     temperature === undefined ||
//     humidity === undefined ||
//     gas_value === undefined
//   ) {
//     return res.status(400).json({
//       success: false,
//       message:
//         "room_id, temperature, humidity and gas_value are required"
//     });
//   }

//   // Insert sensor data into MySQL
//   const sql = `
//     INSERT INTO sensor_data
//     (room_id, temperature, humidity, gas_value, door_status, fan_status)
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   const values = [
//     room_id,
//     temperature,
//     humidity,
//     gas_value,
//     "Closed",
//     "OFF"
//   ];

//   db.query(sql, values, (err, result) => {

//     if (err) {

//       console.error(
//         "❌ Sensor data insert failed:",
//         err.message
//       );

//       return res.status(500).json({
//         success: false,
//         message: "Failed to save sensor data",
//         error: err.message
//       });
//     }

//     console.log("✅ Sensor data saved to MySQL");
//     console.log("Sensor ID:", result.insertId);

//     res.status(200).json({
//       success: true,
//       message: "Sensor data saved successfully",
//       sensor_id: result.insertId
//     });

//   });

// });


// // =====================================================
// // GET /api/sensor
// // GET LATEST SENSOR DATA
// // =====================================================

// router.get("/", (req, res) => {

//   const sql = `
//     SELECT
//       sensor_id,
//       room_id,
//       temperature,
//       humidity,
//       gas_value,
//       door_status,
//       fan_status
//     FROM sensor_data
//     ORDER BY sensor_id DESC
//     LIMIT 20
//   `;

//   db.query(sql, (err, results) => {

//     if (err) {

//       console.error(
//         "❌ Failed to fetch sensor data:",
//         err.message
//       );

//       return res.status(500).json({
//         success: false,
//         message: "Failed to fetch sensor data",
//         error: err.message
//       });
//     }

//     res.status(200).json({
//       success: true,
//       count: results.length,
//       data: results
//     });

//   });

// });

// // =====================================================
// // GET LATEST SENSOR DATA
// // =====================================================

// router.get("/", (req, res) => {
//   const sql = `
//     SELECT
//       sd.sensor_id,
//       sd.room_id,
//       sr.room_number,
//       sd.temperature,
//       sd.humidity,
//       sd.gas_value,
//       sd.door_status,
//       sd.fan_status
//     FROM sensor_data sd
//     LEFT JOIN storage_room sr
//       ON sd.room_id = sr.room_id
//     ORDER BY sd.sensor_id DESC
//     LIMIT 20
//   `;

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("GET Error:", err);
//       return res.status(500).json({
//         success: false,
//         error: err.message,
//       });
//     }

//     res.json({
//       success: true,
//       count: results.length,
//       data: results,
//     });
//   });
// });
// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const db = require("../database/db");

// =====================================================
// POST /api/sensor
// ESP32 → BACKEND → MYSQL
// =====================================================

// router.post("/", (req, res) => {
//   console.log("📡 Sensor data received:");
//   console.log(req.body);

//   const {
//     room_id,
//     temperature,
//     humidity,
//     gas_value,
//   } = req.body;

//   if (
//     room_id === undefined ||
//     temperature === undefined ||
//     humidity === undefined ||
//     gas_value === undefined
//   ) {
//     return res.status(400).json({
//       success: false,
//       message:
//         "room_id, temperature, humidity and gas_value are required",
//     });
//   }

//   const sql = `
//     INSERT INTO sensor_data
//     (
//       room_id,
//       temperature,
//       humidity,
//       gas_value,
//       door_status,
//       fan_status
//     )
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   const values = [
//     room_id,
//     temperature,
//     humidity,
//     gas_value,
//     "Closed",
//     "OFF",
//   ];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error(
//         "❌ Sensor data insert failed:",
//         err.message
//       );

//       return res.status(500).json({
//         success: false,
//         message: "Failed to save sensor data",
//         error: err.message,
//       });
//     }

//     console.log("✅ Sensor data saved to MySQL");
//     console.log("Sensor ID:", result.insertId);

//     res.status(200).json({
//       success: true,
//       message: "Sensor data saved successfully",
//       sensor_id: result.insertId,
//     });
//   });
// });

// // =====================================================
// // GET /api/sensor
// // FRONTEND → BACKEND → MYSQL
// // GET LATEST SENSOR DATA
// // =====================================================

// router.get("/", (req, res) => {
//   const sql = `
//     SELECT
//       sd.sensor_id,
//       sd.room_id,
//       sr.room_number,
//       sd.temperature,
//       sd.humidity,
//       sd.gas_value,
//       sd.door_status,
//       sd.fan_status,
//       sd.recorded_at
//     FROM sensor_data sd
//     LEFT JOIN storage_room sr
//       ON sd.room_id = sr.room_id
//     ORDER BY sd.sensor_id DESC
//     LIMIT 20
//   `;

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error(
//         "❌ Failed to fetch sensor data:",
//         err.message
//       );

//       return res.status(500).json({
//         success: false,
//         message: "Failed to fetch sensor data",
//         error: err.message,
//       });
//     }

//     res.status(200).json({
//       success: true,
//       count: results.length,
//       data: results,
//     });
//   });
// });






// // =====================================================
// // POST /api/sensor
// // ESP32 → BACKEND → MYSQL
// // SENSOR DATA + ALERT DETECTION
// // =====================================================

// router.post("/", (req, res) => {
//   console.log("📡 Sensor data received:");
//   console.log(req.body);

//   const {
//     room_id,
//     temperature,
//     humidity,
//     gas_value,
//   } = req.body;

//   // ===================================================
//   // VALIDATION
//   // ===================================================

//   if (
//     room_id === undefined ||
//     temperature === undefined ||
//     humidity === undefined ||
//     gas_value === undefined
//   ) {
//     return res.status(400).json({
//       success: false,
//       message:
//         "room_id, temperature, humidity and gas_value are required",
//     });
//   }

//   // ===================================================
//   // INSERT SENSOR DATA
//   // ===================================================

//   const sensorSql = `
//     INSERT INTO sensor_data
//     (
//       room_id,
//       temperature,
//       humidity,
//       gas_value,
//       door_status,
//       fan_status
//     )
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   const sensorValues = [
//     room_id,
//     temperature,
//     humidity,
//     gas_value,
//     "Closed",
//     "OFF",
//   ];

//   db.query(sensorSql, sensorValues, (err, result) => {
//     if (err) {
//       console.error(
//         "❌ Sensor data insert failed:",
//         err.message
//       );

//       return res.status(500).json({
//         success: false,
//         message: "Failed to save sensor data",
//         error: err.message,
//       });
//     }

//     const sensor_id = result.insertId;

//     console.log("✅ Sensor data saved to MySQL");
//     console.log("Sensor ID:", sensor_id);

//     // =================================================
//     // ALERT THRESHOLDS
//     // =================================================

//     const TEMP_LOW = 18;
//     const TEMP_HIGH = 30;

//     const HUM_LOW = 40;
//     const HUM_HIGH = 70;

//     const GAS_HIGH = 600;

//     // =================================================
//     // DETECT ALERT
//     // =================================================

//     let alertType = null;
//     let alertMessage = null;
//     let alertValue = null;

//     if (temperature > TEMP_HIGH) {

//       alertType = "HIGH_TEMPERATURE";
//       alertMessage =
//         `Temperature is too high in Room ${room_id}`;
//       alertValue = temperature;

//     } else if (temperature < TEMP_LOW) {

//       alertType = "LOW_TEMPERATURE";
//       alertMessage =
//         `Temperature is too low in Room ${room_id}`;
//       alertValue = temperature;

//     } else if (humidity > HUM_HIGH) {

//       alertType = "HIGH_HUMIDITY";
//       alertMessage =
//         `Humidity is too high in Room ${room_id}`;
//       alertValue = humidity;

//     } else if (humidity < HUM_LOW) {

//       alertType = "LOW_HUMIDITY";
//       alertMessage =
//         `Humidity is too low in Room ${room_id}`;
//       alertValue = humidity;

//     } else if (gas_value > GAS_HIGH) {

//       alertType = "HIGH_GAS";
//       alertMessage =
//         `Gas level is too high in Room ${room_id}`;
//       alertValue = gas_value;
//     }

//     // =================================================
//     // NO ALERT
//     // =================================================

//     if (!alertType) {

//       return res.status(200).json({
//         success: true,
//         message: "Sensor data saved successfully",
//         sensor_id: sensor_id,
//         alert_created: false,
//       });
//     }

//     // =================================================
//     // CHECK IF SAME ALERT IS ALREADY ACTIVE
//     // =================================================

//     const checkAlertSql = `
//       SELECT alert_id
//       FROM alerts
//       WHERE room_id = ?
//         AND alert_type = ?
//         AND status = 'Active'
//       LIMIT 1
//     `;

//     db.query(
//       checkAlertSql,
//       [room_id, alertType],
//       (alertCheckError, alertResults) => {

//         if (alertCheckError) {

//           console.error(
//             "❌ Alert check failed:",
//             alertCheckError.message
//           );

//           return res.status(500).json({
//             success: false,
//             message: "Sensor saved but alert check failed",
//             sensor_id: sensor_id,
//             error: alertCheckError.message,
//           });
//         }

//         // =============================================
//         // SAME ALERT ALREADY EXISTS
//         // =============================================

//         if (alertResults.length > 0) {

//           console.log(
//             `⚠️ ${alertType} already active for Room ${room_id}`
//           );

//           return res.status(200).json({
//             success: true,
//             message: "Sensor data saved successfully",
//             sensor_id: sensor_id,
//             alert_created: false,
//             alert_already_active: true,
//           });
//         }

//         // =============================================
//         // CREATE NEW ALERT
//         // =============================================

//         const alertSql = `
//           INSERT INTO alerts
//           (
//             room_id,
//             sensor_id,
//             alert_type,
//             message,
//             sensor_value,
//             status
//           )
//           VALUES (?, ?, ?, ?, ?, 'Active')
//         `;

//         const alertValues = [
//           room_id,
//           sensor_id,
//           alertType,
//           alertMessage,
//           alertValue,
//         ];

//         db.query(
//           alertSql,
//           alertValues,
//           (alertError, alertResult) => {

//             if (alertError) {

//               console.error(
//                 "❌ Alert creation failed:",
//                 alertError.message
//               );

//               return res.status(500).json({
//                 success: false,
//                 message:
//                   "Sensor data saved but alert creation failed",
//                 sensor_id: sensor_id,
//                 error: alertError.message,
//               });
//             }

//             console.log("🚨 ALERT CREATED");
//             console.log(
//               "Alert ID:",
//               alertResult.insertId
//             );
//             console.log(
//               "Alert Type:",
//               alertType
//             );

//             // =========================================
//             // FINAL RESPONSE
//             // =========================================

//             res.status(200).json({
//               success: true,
//               message:
//                 "Sensor data saved and alert created successfully",
//               sensor_id: sensor_id,
//               alert_created: true,
//               alert_id: alertResult.insertId,
//               alert_type: alertType,
//             });
//           }
//         );
//       }
//     );
//   });
// });





// module.exports = router;









// const express = require("express");
// const router = express.Router();
// const db = require("../database/db");
// const {
//   sendPushNotification,
// } = require("../services/notificationService");

// // =====================================================
// // ALERT THRESHOLDS
// // =====================================================

// const TEMP_LOW = 18;
// const TEMP_HIGH = 30;

// const HUM_LOW = 40;
// const HUM_HIGH = 70;

// const GAS_HIGH = 600;


// // =====================================================
// // POST /api/sensor
// // ESP32 → BACKEND → MYSQL
// // SENSOR DATA + ALERT DETECTION + AUTO RESOLUTION
// // =====================================================

// router.post("/", (req, res) => {

//   console.log("📡 Sensor data received:");
//   console.log(req.body);


//   // ===================================================
//   // GET SENSOR VALUES
//   // ===================================================

//   const {
//     room_id,
//     temperature,
//     humidity,
//     gas_value,
//   } = req.body;


//   // ===================================================
//   // VALIDATION
//   // ===================================================

//   if (
//     room_id === undefined ||
//     temperature === undefined ||
//     humidity === undefined ||
//     gas_value === undefined
//   ) {
//     return res.status(400).json({
//       success: false,
//       message:
//         "room_id, temperature, humidity and gas_value are required",
//     });
//   }


//   // ===================================================
//   // INSERT SENSOR DATA
//   // ===================================================

//   const sensorSql = `
//     INSERT INTO sensor_data
//     (
//       room_id,
//       temperature,
//       humidity,
//       gas_value,
//       door_status,
//       fan_status
//     )
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;

//   const sensorValues = [
//     room_id,
//     temperature,
//     humidity,
//     gas_value,
//     "Closed",
//     "OFF",
//   ];


//   db.query(
//     sensorSql,
//     sensorValues,
//     (err, result) => {

//       if (err) {

//         console.error(
//           "❌ Sensor data insert failed:",
//           err.message
//         );

//         return res.status(500).json({
//           success: false,
//           message: "Failed to save sensor data",
//           error: err.message,
//         });
//       }


//       const sensor_id = result.insertId;


//       console.log(
//         "✅ Sensor data saved to MySQL"
//       );

//       console.log(
//         "Sensor ID:",
//         sensor_id
//       );


//       // =================================================
//       // DETECT ALL CURRENT ALERT CONDITIONS
//       // =================================================

//       const currentAlerts = [];


//       // -------------------------------------------------
//       // HIGH TEMPERATURE
//       // -------------------------------------------------

//       if (temperature > TEMP_HIGH) {

//         currentAlerts.push({
//           type: "HIGH_TEMPERATURE",
//           message:
//             `Temperature is too high in Room ${room_id}`,
//           value: temperature,
//         });
//       }


//       // -------------------------------------------------
//       // LOW TEMPERATURE
//       // -------------------------------------------------

//       if (temperature < TEMP_LOW) {

//         currentAlerts.push({
//           type: "LOW_TEMPERATURE",
//           message:
//             `Temperature is too low in Room ${room_id}`,
//           value: temperature,
//         });
//       }


//       // -------------------------------------------------
//       // HIGH HUMIDITY
//       // -------------------------------------------------

//       if (humidity > HUM_HIGH) {

//         currentAlerts.push({
//           type: "HIGH_HUMIDITY",
//           message:
//             `Humidity is too high in Room ${room_id}`,
//           value: humidity,
//         });
//       }


//       // -------------------------------------------------
//       // LOW HUMIDITY
//       // -------------------------------------------------

//       if (humidity < HUM_LOW) {

//         currentAlerts.push({
//           type: "LOW_HUMIDITY",
//           message:
//             `Humidity is too low in Room ${room_id}`,
//           value: humidity,
//         });
//       }


//       // -------------------------------------------------
//       // HIGH GAS
//       // -------------------------------------------------

//       if (gas_value > GAS_HIGH) {

//         currentAlerts.push({
//           type: "HIGH_GAS",
//           message:
//             `Gas level is too high in Room ${room_id}`,
//           value: gas_value,
//         });
//       }


//       console.log(
//         "🔎 Current alert conditions:",
//         currentAlerts.map(
//           alert => alert.type
//         )
//       );


//       // =================================================
//       // ALERT TYPES
//       // =================================================

//       const allAlertTypes = [
//         "HIGH_TEMPERATURE",
//         "LOW_TEMPERATURE",
//         "HIGH_HUMIDITY",
//         "LOW_HUMIDITY",
//         "HIGH_GAS",
//       ];


//       // =================================================
//       // FIND ACTIVE ALERTS
//       // =================================================

//       const activeAlertsSql = `
//         SELECT
//           alert_id,
//           alert_type
//         FROM alerts
//         WHERE room_id = ?
//           AND status = 'Active'
//       `;


//       db.query(
//         activeAlertsSql,
//         [room_id],
//         (activeError, activeAlerts) => {

//           if (activeError) {

//             console.error(
//               "❌ Active alert check failed:",
//               activeError.message
//             );

//             return res.status(500).json({
//               success: false,
//               message:
//                 "Sensor saved but active alert check failed",
//               sensor_id,
//               error: activeError.message,
//             });
//           }


//           // =================================================
//           // ACTIVE ALERT TYPES
//           // =================================================

//           const activeAlertTypes =
//             activeAlerts.map(
//               alert => alert.alert_type
//             );


//           // =================================================
//           // RESOLVE ALERTS THAT ARE NOW SAFE
//           // =================================================

//           const alertsToResolve =
//             activeAlerts.filter(
//               activeAlert =>
//                 !currentAlerts.some(
//                   currentAlert =>
//                     currentAlert.type ===
//                     activeAlert.alert_type
//                 )
//             );


//           // =================================================
//           // RESOLVE EACH SAFE ALERT
//           // =================================================

//           const resolveNext = (index) => {

//             if (
//               index >=
//               alertsToResolve.length
//             ) {

//               // Continue to alert creation
//               createNextAlert(0);

//               return;
//             }


//             const alertToResolve =
//               alertsToResolve[index];


//             const resolveSql = `
//               UPDATE alerts
//               SET
//                 status = 'Resolved',
//                 resolved_at = NOW()
//               WHERE alert_id = ?
//                 AND status = 'Active'
//             `;


//             db.query(
//               resolveSql,
//               [alertToResolve.alert_id],
//               (resolveError) => {

//                 if (resolveError) {

//                   console.error(
//                     "❌ Alert resolution failed:",
//                     resolveError.message
//                   );

//                   return res.status(500).json({
//                     success: false,
//                     message:
//                       "Sensor saved but alert resolution failed",
//                     sensor_id,
//                     error:
//                       resolveError.message,
//                   });
//                 }


//                 console.log(
//                   `✅ ALERT RESOLVED: ${alertToResolve.alert_type}`
//                 );


//                 resolveNext(index + 1);
//               }
//             );
//           };


//           // =================================================
//           // CREATE NEW ALERTS
//           // =================================================

//           const createdAlerts = [];
//           const alreadyActiveAlerts = [];


//           const createNextAlert = (index) => {

//             if (
//               index >=
//               currentAlerts.length
//             ) {

//               // ===========================================
//               // FINAL RESPONSE
//               // ===========================================

//               return res.status(200).json({

//                 success: true,

//                 message:
//                   "Sensor data saved successfully",

//                 sensor_id,

//                 alert_created:
//                   createdAlerts.length > 0,

//                 alert_ids:
//                   createdAlerts,

//                 alerts_already_active:
//                   alreadyActiveAlerts,

//                 alerts_resolved:
//                   alertsToResolve.map(
//                     alert =>
//                       alert.alert_type
//                   ),
//               });
//             }


//             const alert =
//               currentAlerts[index];


//             // =================================================
//             // CHECK WHETHER THIS ALERT IS ALREADY ACTIVE
//             // =================================================

//             if (
//               activeAlertTypes.includes(
//                 alert.type
//               )
//             ) {

//               console.log(
//                 `⚠️ ${alert.type} already active for Room ${room_id}`
//               );


//               alreadyActiveAlerts.push(
//                 alert.type
//               );


//               createNextAlert(
//                 index + 1
//               );

//               return;
//             }


//             // =================================================
//             // CREATE NEW ALERT
//             // =================================================

//             const alertSql = `
//               INSERT INTO alerts
//               (
//                 room_id,
//                 sensor_id,
//                 alert_type,
//                 message,
//                 sensor_value,
//                 status
//               )
//               VALUES (?, ?, ?, ?, ?, 'Active')
//             `;


//             const alertValues = [
//               room_id,
//               sensor_id,
//               alert.type,
//               alert.message,
//               alert.value,
//             ];


//             db.query(
//               alertSql,
//               alertValues,
//               (alertError, alertResult) => {

//                 if (alertError) {

//                   console.error(
//                     "❌ Alert creation failed:",
//                     alertError.message
//                   );

//                   return res.status(500).json({
//                     success: false,
//                     message:
//                       "Sensor data saved but alert creation failed",
//                     sensor_id,
//                     error:
//                       alertError.message,
//                   });
//                 }


//                 console.log(
//                   "🚨 ALERT CREATED"
//                 );

//                 console.log(
//                   "Alert ID:",
//                   alertResult.insertId
//                 );

//                 console.log(
//                   "Alert Type:",
//                   alert.type
//                 );


//                 createdAlerts.push(
//                   alertResult.insertId
//                 );


//                 createNextAlert(
//                   index + 1
//                 );
//               }
//             );
//           };


//           // =================================================
//           // START RESOLUTION PROCESS
//           // =================================================

//           resolveNext(0);

//         }
//       );

//     }
//   );

// });


// // =====================================================
// // GET /api/sensor
// // GET ALL SENSOR DATA
// // =====================================================

// router.get("/", (req, res) => {

//   const sql = `
//     SELECT
//       sensor_id,
//       room_id,
//       temperature,
//       humidity,
//       gas_value,
//       door_status,
//       fan_status,
//       recorded_at
//     FROM sensor_data
//     ORDER BY sensor_id DESC
//   `;


//   db.query(
//     sql,
//     (err, results) => {

//       if (err) {

//         console.error(
//           "❌ Failed to fetch sensor data:",
//           err.message
//         );

//         return res.status(500).json({
//           success: false,
//           message:
//             "Failed to fetch sensor data",
//           error: err.message,
//         });
//       }


//       res.status(200).json({
//         success: true,
//         count: results.length,
//         data: results,
//       });

//     }
//   );

// });


// // =====================================================
// // EXPORT ROUTER
// // =====================================================

// module.exports = router;














const express = require("express");
const router = express.Router();
const db = require("../database/db");

const {
  sendPushNotification,
} = require("../services/notificationService");

// =====================================================
// ALERT THRESHOLDS
// =====================================================

const TEMP_LOW = 18;
const TEMP_HIGH = 30;

const HUM_LOW = 40;
const HUM_HIGH = 70;

const GAS_HIGH = 600;


// =====================================================
// SEND NOTIFICATION TO ALL SAVED DEVICES
// =====================================================

function sendAlertNotification(alert) {

  const tokenSql = `
    SELECT expo_push_token
    FROM push_tokens
  `;

  db.query(tokenSql, async (tokenError, tokens) => {

    if (tokenError) {

      console.error(
        "❌ Failed to get push tokens:",
        tokenError.message
      );

      return;
    }

    if (!tokens || tokens.length === 0) {

      console.log(
        "⚠️ No Expo push tokens found"
      );

      return;
    }

    console.log(
      `📱 Sending notification to ${tokens.length} device(s)`
    );


    // =================================================
    // SEND TO EVERY SAVED TOKEN
    // =================================================

    for (const tokenRow of tokens) {

      const expoPushToken =
        tokenRow.expo_push_token;

      try {

        await sendPushNotification(

          expoPushToken,

          `🚨 VineSafe Alert - Room ${alert.room_id}`,

          alert.message

        );

        console.log(
          `✅ Notification sent for ${alert.type}`
        );

      } catch (error) {

        console.error(
          `❌ Notification failed for token ${expoPushToken}:`,
          error.message
        );

      }
    }
  });
}


// =====================================================
// POST /api/sensor
// ESP32 → BACKEND → MYSQL
//
// SENSOR DATA
//      ↓
// ALERT DETECTION
//      ↓
// CREATE ALERT
//      ↓
// SEND PUSH NOTIFICATION AUTOMATICALLY
// =====================================================

router.post("/", (req, res) => {

  console.log("========================================");
  console.log("📡 SENSOR DATA RECEIVED");
  console.log(req.body);
  console.log("========================================");


  // ===================================================
  // GET SENSOR VALUES
  // ===================================================

  const {
    room_id,
    temperature,
    humidity,
    gas_value,
  } = req.body;


  // ===================================================
  // VALIDATION
  // ===================================================

  if (
    room_id === undefined ||
    temperature === undefined ||
    humidity === undefined ||
    gas_value === undefined
  ) {

    return res.status(400).json({

      success: false,

      message:
        "room_id, temperature, humidity and gas_value are required",

    });
  }


  // ===================================================
  // INSERT SENSOR DATA
  // ===================================================

  const sensorSql = `
    INSERT INTO sensor_data
    (
      room_id,
      temperature,
      humidity,
      gas_value,
      door_status,
      fan_status
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;


  const sensorValues = [

    room_id,
    temperature,
    humidity,
    gas_value,

    "Closed",
    "OFF",

  ];


  db.query(
    sensorSql,
    sensorValues,
    (err, result) => {

      if (err) {

        console.error(
          "❌ Sensor data insert failed:",
          err.message
        );

        return res.status(500).json({

          success: false,

          message:
            "Failed to save sensor data",

          error:
            err.message,

        });
      }


      // =================================================
      // SENSOR ID
      // =================================================

      const sensor_id =
        result.insertId;


      console.log(
        "✅ Sensor data saved"
      );

      console.log(
        "Sensor ID:",
        sensor_id
      );


      // =================================================
      // DETECT CURRENT ALERT CONDITIONS
      // =================================================

      const currentAlerts = [];


      // =================================================
      // HIGH TEMPERATURE
      // =================================================

      if (temperature > TEMP_HIGH) {

        currentAlerts.push({

          type:
            "HIGH_TEMPERATURE",

          message:
            `Temperature is too high in Room ${room_id}`,

          value:
            temperature,

        });
      }


      // =================================================
      // LOW TEMPERATURE
      // =================================================

      if (temperature < TEMP_LOW) {

        currentAlerts.push({

          type:
            "LOW_TEMPERATURE",

          message:
            `Temperature is too low in Room ${room_id}`,

          value:
            temperature,

        });
      }


      // =================================================
      // HIGH HUMIDITY
      // =================================================

      if (humidity > HUM_HIGH) {

        currentAlerts.push({

          type:
            "HIGH_HUMIDITY",

          message:
            `Humidity is too high in Room ${room_id}`,

          value:
            humidity,

        });
      }


      // =================================================
      // LOW HUMIDITY
      // =================================================

      if (humidity < HUM_LOW) {

        currentAlerts.push({

          type:
            "LOW_HUMIDITY",

          message:
            `Humidity is too low in Room ${room_id}`,

          value:
            humidity,

        });
      }


      // =================================================
      // HIGH GAS
      // =================================================

      if (gas_value > GAS_HIGH) {

        currentAlerts.push({

          type:
            "HIGH_GAS",

          message:
            `Gas level is too high in Room ${room_id}`,

          value:
            gas_value,

        });
      }


      console.log(
        "🔎 Current alert conditions:",
        currentAlerts.map(
          alert => alert.type
        )
      );


      // =================================================
      // FIND CURRENT ACTIVE ALERTS
      // =================================================

      const activeAlertsSql = `

        SELECT
          alert_id,
          alert_type

        FROM alerts

        WHERE room_id = ?

          AND status = 'Active'

      `;


      db.query(

        activeAlertsSql,

        [room_id],

        (activeError, activeAlerts) => {

          if (activeError) {

            console.error(
              "❌ Active alert check failed:",
              activeError.message
            );

            return res.status(500).json({

              success: false,

              message:
                "Sensor saved but active alert check failed",

              sensor_id,

              error:
                activeError.message,

            });
          }


          // =================================================
          // GET ACTIVE ALERT TYPES
          // =================================================

          const activeAlertTypes =
            activeAlerts.map(
              alert =>
                alert.alert_type
            );


          // =================================================
          // FIND ALERTS THAT ARE NOW SAFE
          // =================================================

          const alertsToResolve =
            activeAlerts.filter(

              activeAlert =>

                !currentAlerts.some(

                  currentAlert =>

                    currentAlert.type ===
                    activeAlert.alert_type

                )

            );


          // =================================================
          // CREATED ALERT IDS
          // =================================================

          const createdAlerts = [];

          const alreadyActiveAlerts = [];


          // =================================================
          // RESOLVE OLD ALERTS
          // =================================================

          const resolveNext = (index) => {

            if (
              index >=
              alertsToResolve.length
            ) {

              // After resolving,
              // create new alerts

              createNextAlert(0);

              return;
            }


            const alertToResolve =
              alertsToResolve[index];


            const resolveSql = `

              UPDATE alerts

              SET
                status = 'Resolved',
                resolved_at = NOW()

              WHERE alert_id = ?

                AND status = 'Active'

            `;


            db.query(

              resolveSql,

              [alertToResolve.alert_id],

              (resolveError) => {

                if (resolveError) {

                  console.error(
                    "❌ Alert resolution failed:",
                    resolveError.message
                  );

                  return res.status(500).json({

                    success: false,

                    message:
                      "Sensor saved but alert resolution failed",

                    sensor_id,

                    error:
                      resolveError.message,

                  });
                }


                console.log(
                  `✅ ALERT RESOLVED: ${alertToResolve.alert_type}`
                );


                resolveNext(
                  index + 1
                );

              }

            );

          };


          // =================================================
          // CREATE NEW ALERTS
          // =================================================

          const createNextAlert = (index) => {

            // =================================================
            // ALL ALERTS PROCESSED
            // =================================================

            if (
              index >=
              currentAlerts.length
            ) {

              console.log(
                "========================================"
              );

              console.log(
                "✅ SENSOR PROCESS COMPLETED"
              );

              console.log(
                "Created alerts:",
                createdAlerts
              );

              console.log(
                "Already active:",
                alreadyActiveAlerts
              );

              console.log(
                "Resolved:",
                alertsToResolve.map(
                  alert =>
                    alert.alert_type
                )
              );

              console.log(
                "========================================"
              );


              return res.status(200).json({

                success: true,

                message:
                  "Sensor data saved successfully",

                sensor_id,

                alert_created:
                  createdAlerts.length > 0,

                alert_ids:
                  createdAlerts,

                alerts_already_active:
                  alreadyActiveAlerts,

                alerts_resolved:
                  alertsToResolve.map(
                    alert =>
                      alert.alert_type
                  ),

              });

            }


            // =================================================
            // CURRENT ALERT
            // =================================================

            const alert =
              currentAlerts[index];


            // =================================================
            // CHECK IF ALERT ALREADY ACTIVE
            // =================================================

            if (
              activeAlertTypes.includes(
                alert.type
              )
            ) {

              console.log(

                `⚠️ ${alert.type} already active for Room ${room_id}`

              );


              alreadyActiveAlerts.push(
                alert.type
              );


              createNextAlert(
                index + 1
              );

              return;
            }


            // =================================================
            // INSERT NEW ALERT
            // =================================================

            const alertSql = `

              INSERT INTO alerts

              (
                room_id,
                sensor_id,
                alert_type,
                message,
                sensor_value,
                status
              )

              VALUES
              (?, ?, ?, ?, ?, 'Active')

            `;


            const alertValues = [

              room_id,

              sensor_id,

              alert.type,

              alert.message,

              alert.value,

            ];


            db.query(

              alertSql,

              alertValues,

              (alertError, alertResult) => {

                if (alertError) {

                  console.error(

                    "❌ Alert creation failed:",

                    alertError.message

                  );


                  return res.status(500).json({

                    success: false,

                    message:
                      "Sensor saved but alert creation failed",

                    sensor_id,

                    error:
                      alertError.message,

                  });

                }


                // =================================================
                // ALERT CREATED
                // =================================================

                const alert_id =
                  alertResult.insertId;


                console.log(
                  "🚨 ALERT CREATED"
                );

                console.log(
                  "Alert ID:",
                  alert_id
                );

                console.log(
                  "Alert Type:",
                  alert.type
                );

                console.log(
                  "Room:",
                  room_id
                );

                console.log(
                  "Value:",
                  alert.value
                );


                createdAlerts.push(
                  alert_id
                );


                // =================================================
                // 🔔 AUTOMATIC PUSH NOTIFICATION
                // =================================================

                sendAlertNotification({

                  type:
                    alert.type,

                  room_id:
                    room_id,

                  message:
                    alert.message,

                  value:
                    alert.value,

                });


                // =================================================
                // NEXT ALERT
                // =================================================

                createNextAlert(
                  index + 1
                );

              }

            );

          };


          // =================================================
          // START
          // =================================================

          resolveNext(0);

        }

      );

    }

  );

});


// =====================================================
// GET /api/sensor
// GET ALL SENSOR DATA
// =====================================================

router.get("/", (req, res) => {

  const sql = `

    SELECT

      sensor_id,
      room_id,
      temperature,
      humidity,
      gas_value,
      door_status,
      fan_status,
      recorded_at

    FROM sensor_data

    ORDER BY sensor_id DESC

  `;


  db.query(

    sql,

    (err, results) => {

      if (err) {

        console.error(

          "❌ Failed to fetch sensor data:",

          err.message

        );


        return res.status(500).json({

          success: false,

          message:
            "Failed to fetch sensor data",

          error:
            err.message,

        });

      }


      res.status(200).json({

        success: true,

        count:
          results.length,

        data:
          results,

      });

    }

  );

});


// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;