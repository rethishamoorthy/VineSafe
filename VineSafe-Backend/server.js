
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const db = require("./database/db");

// // =====================================================
// // IMPORT ROUTES
// // =====================================================

// const passwordResetRoutes =
//   require("./routes/passwordResetRoutes");

// const managerRoutes =
//   require("./routes/manager");

// const farmerRoutes =
//   require("./routes/farmer");

// const sensorRoutes =
//   require("./routes/sensor");

// const alertRoutes =
//   require("./routes/alertRoutes");

// const roomRoutes =
//   require("./routes/room");

// const allocationRoutes =
//   require("./routes/allocation");

// const inventoryRoutes =
//   require("./routes/inventory");

// const storageRoutes =
//   require("./routes/storage");


// // =====================================================
// // CREATE EXPRESS APP
// // =====================================================

// const app = express();

// app.use("/api/sensor", sensorRoutes);
// app.use("/api/alerts", alertRoutes);
// // =====================================================
// // MIDDLEWARE
// // =====================================================

// // Allow requests from:
// // - React Native app
// // - Browser
// // - ESP32
// // - Thunder Client
// app.use(cors());

// // Allow JSON request body
// // IMPORTANT: MUST COME BEFORE ROUTES
// app.use(express.json());

// // Allow URL encoded data
// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );


// // =====================================================
// // API ROUTES
// // =====================================================

// // Authentication
// app.use(
//   "/api/auth",
//   passwordResetRoutes
// );

// // Manager
// app.use(
//   "/api/manager",
//   managerRoutes
// );

// // Farmer
// app.use(
//   "/api/farmer",
//   farmerRoutes
// );

// // Sensor
// app.use(
//   "/api/sensor",
//   sensorRoutes
// );

// // Alerts
// app.use(
//   "/api/alerts",
//   alertRoutes
// );

// // Storage Rooms
// app.use(
//   "/api/room",
//   roomRoutes
// );

// // Room Allocations
// app.use(
//   "/api/allocations",
//   allocationRoutes
// );

// // Inventory
// app.use(
//   "/api/inventory",
//   inventoryRoutes
// );

// // Storage
// app.use(
//   "/api/storage",
//   storageRoutes
// );


// // =====================================================
// // HOME / SERVER TEST
// // =====================================================

// app.get("/", (req, res) => {
//   res.status(200).send(
//     "✅ VineSafe Backend is Running..."
//   );
// });


// // =====================================================
// // DATABASE TEST
// // =====================================================

// app.get("/test-db", (req, res) => {

//   db.query(
//     "SELECT 1 AS test",
//     (err, results) => {

//       if (err) {

//         console.error(
//           "❌ Database test failed:",
//           err.message
//         );

//         return res.status(500).json({
//           success: false,
//           message: "Database connection failed",
//           error: err.message,
//         });
//       }

//       console.log(
//         "✅ Database test successful"
//       );

//       res.status(200).json({
//         success: true,
//         message:
//           "✅ MySQL Connected Successfully",
//         results,
//       });

//     }
//   );

// });


// // =====================================================
// // 404 API / ROUTE HANDLER
// // =====================================================

// app.use((req, res) => {

//   res.status(404).json({
//     success: false,
//     message: `Route not found: ${req.method} ${req.originalUrl}`,
//   });

// });


// // =====================================================
// // GLOBAL ERROR HANDLER
// // =====================================================

// app.use(
//   (err, req, res, next) => {

//     console.error(
//       "❌ Server Error:",
//       err
//     );

//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: err.message,
//     });

//   }
// );


// // =====================================================
// // SERVER
// // =====================================================

// const PORT =
//   process.env.PORT || 5000;
// const notificationRoutes = require("./routes/notificationRoutes");
// app.listen(
//   PORT,
//   "0.0.0.0",
//   () => {

//     console.log(
//       "========================================"
//     );

//     console.log(
//       "🚀 VineSafe Backend Started"
//     );

//     console.log(
//       `📡 Port: ${PORT}`
//     );

//     console.log(
//       `🌐 Local: http://localhost:${PORT}`
//     );

//     console.log(
//       `🌐 Network: http://0.0.0.0:${PORT}`
//     );

//     console.log(
//       "========================================"
//     );

//   }
// );










const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./database/db");

// =====================================================
// IMPORT ROUTES
// =====================================================

const passwordResetRoutes =
  require("./routes/passwordResetRoutes");

const managerRoutes =
  require("./routes/manager");

const farmerRoutes =
  require("./routes/farmer");

const sensorRoutes =
  require("./routes/sensor");

const alertRoutes =
  require("./routes/alertRoutes");

const roomRoutes =
  require("./routes/room");

const allocationRoutes =
  require("./routes/allocation");

const inventoryRoutes =
  require("./routes/inventory");

const storageRoutes =
  require("./routes/storage");

const notificationRoutes =
  require("./routes/notificationRoutes");


// =====================================================
// CREATE EXPRESS APP
// =====================================================

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

// Allow requests from:
// React Native
// Browser
// ESP32
// Thunder Client

app.use(cors());

// JSON request body
app.use(express.json());

// URL encoded data
app.use(
  express.urlencoded({
    extended: true,
  })
);


// =====================================================
// API ROUTES
// =====================================================

// -----------------------------------------------------
// Authentication
// -----------------------------------------------------

app.use(
  "/api/auth",
  passwordResetRoutes
);


// -----------------------------------------------------
// Manager
// -----------------------------------------------------

app.use(
  "/api/manager",
  managerRoutes
);


// -----------------------------------------------------
// Farmer
// -----------------------------------------------------

app.use(
  "/api/farmer",
  farmerRoutes
);


// -----------------------------------------------------
// Sensor
// ESP32 → Backend
// -----------------------------------------------------

app.use(
  "/api/sensor",
  sensorRoutes
);


// -----------------------------------------------------
// Alerts
// -----------------------------------------------------

app.use(
  "/api/alerts",
  alertRoutes
);


// -----------------------------------------------------
// Notifications
// -----------------------------------------------------

app.use(
  "/api/notifications",
  notificationRoutes
);


// -----------------------------------------------------
// Storage Rooms
// -----------------------------------------------------

app.use(
  "/api/room",
  roomRoutes
);


// -----------------------------------------------------
// Room Allocations
// -----------------------------------------------------

app.use(
  "/api/allocations",
  allocationRoutes
);


// -----------------------------------------------------
// Inventory
// -----------------------------------------------------

app.use(
  "/api/inventory",
  inventoryRoutes
);


// -----------------------------------------------------
// Storage
// -----------------------------------------------------

app.use(
  "/api/storage",
  storageRoutes
);


// =====================================================
// HOME / SERVER TEST
// =====================================================

app.get("/", (req, res) => {

  res.status(200).send(
    "✅ VineSafe Backend is Running..."
  );

});


// =====================================================
// DATABASE TEST
// =====================================================

app.get("/test-db", (req, res) => {

  db.query(
    "SELECT 1 AS test",
    (err, results) => {

      if (err) {

        console.error(
          "❌ Database test failed:",
          err.message
        );

        return res.status(500).json({
          success: false,
          message:
            "Database connection failed",
          error: err.message,
        });

      }

      console.log(
        "✅ Database test successful"
      );

      res.status(200).json({

        success: true,

        message:
          "✅ MySQL Connected Successfully",

        results,

      });

    }
  );

});


// =====================================================
// 404 ROUTE HANDLER
// =====================================================

app.use((req, res) => {

  res.status(404).json({

    success: false,

    message:
      `Route not found: ${req.method} ${req.originalUrl}`,

  });

});


// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use(
  (err, req, res, next) => {

    console.error(
      "❌ Server Error:",
      err
    );

    res.status(500).json({

      success: false,

      message:
        "Internal server error",

      error:
        err.message,

    });

  }
);


// =====================================================
// START SERVER
// =====================================================

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      "========================================"
    );

    console.log(
      "🚀 VineSafe Backend Started"
    );

    console.log(
      `📡 Port: ${PORT}`
    );

    console.log(
      `🌐 Local: http://localhost:${PORT}`
    );

    console.log(
      `🌐 Network: http://0.0.0.0:${PORT}`
    );

    console.log(
      "========================================"
    );

    console.log(
      "📡 Sensor API: /api/sensor"
    );

    console.log(
      "🚨 Alerts API: /api/alerts"
    );

    console.log(
      "🔔 Notification API: /api/notifications"
    );

    console.log(
      "========================================"
    );

  }
);