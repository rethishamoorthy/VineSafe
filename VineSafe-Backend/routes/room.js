const express = require("express");
const router = express.Router();

const roomController = require("../controllers/roomController");

// Add Room
router.post("/add", roomController.addRoom);

// Get All Rooms
router.get("/all", roomController.getAllRooms);

// // Get Room by ID
 router.get("/:id", roomController.getRoomById);

// // Update Room
router.put("/update/:id", roomController.updateRoom);

// // Delete Room
router.delete("/delete/:id", roomController.deleteRoom);



module.exports = router;