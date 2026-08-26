// const express = require("express");

// const router = express.Router();

// const storageController = require("../controllers/storageController");

// console.log("✅ Storage route loaded");

// // Add Storage Details
// router.post("/", storageController.addStorage);

// // Get All Storage Details
// router.get("/", storageController.getAllStorage);

// // Get Storage Details By ID
// router.get("/:id", storageController.getStorageById);

// // Update Storage Details
// router.put("/:id", storageController.updateStorage);

// // Delete Storage Details
// router.delete("/:id", storageController.deleteStorage);

// module.exports = router;


const express = require("express");

const router = express.Router();

const storageController = require("../controllers/storageController");

console.log("✅ Storage route loaded");

// Add Storage Details
router.post("/", storageController.addStorage);

// Get All Storage Details
router.get("/", storageController.getAllStorage);

// 🔍 Get autocomplete suggestions
router.get("/suggestions", storageController.getStorageSuggestions);

// Get Storage Details By ID
router.get("/:id", storageController.getStorageById);

// Update Storage Details
router.put("/:id", storageController.updateStorage);

// Delete Storage Details
router.delete("/:id", storageController.deleteStorage);
router.put("/update/:id", storageController.updateStorage);
module.exports = router;