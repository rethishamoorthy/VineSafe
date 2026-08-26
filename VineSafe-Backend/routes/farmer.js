// const express = require("express");
// const router = express.Router();

// const farmerController = require("../controllers/farmerController");
// router.get("/all", farmerController.getAllFarmers);
// // Add Farmer
// router.post("/add", farmerController.addFarmer);
// router.get("/all", farmerController.getAllFarmers);
// router.get("/:id", farmerController.getFarmerById);
// router.put("/:id", farmerController.updateFarmer);
// router.delete("/:id", farmerController.deleteFarmer);
// module.exports = router;



const express = require("express");
const router = express.Router();

const farmerController = require("../controllers/farmerController");

// Add Farmer
router.post("/add", farmerController.addFarmer);

// Get All Farmers
router.get("/all", farmerController.getAllFarmers);

// Get Farmer by ID
router.get("/:id", farmerController.getFarmerById);

// Update Farmer
router.put("/update/:id", farmerController.updateFarmer);

// Delete Farmer
router.delete("/delete/:id", farmerController.deleteFarmer);

module.exports = router;