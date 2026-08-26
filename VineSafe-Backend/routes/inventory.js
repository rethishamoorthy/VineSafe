const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventoryController");
console.log("✅ Inventory route loaded");
// Add Inventory
router.post("/", inventoryController.addInventory);
// Get All Inventory
router.get("/", inventoryController.getAllInventory);
// Get Inventory By ID
router.get("/:id", inventoryController.getInventoryById);
// Update Inventory
router.put("/:id", inventoryController.updateInventory);
// Delete Inventory
router.delete("/:id", inventoryController.deleteInventory);
module.exports = router;