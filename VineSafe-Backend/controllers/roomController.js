const roomModel = require("../models/roomModel");

// ==============================
// ADD ROOM
// ==============================
const addRoom = (req, res) => {
  const {
    branch_name,
    city,
    room_number,
    length,
    height,
    status,
  } = req.body;

  console.log("ADD ROOM REQUEST:", req.body);

  // Required fields
  if (
    !branch_name?.trim() ||
    !city?.trim() ||
    !room_number?.trim() ||
    length === undefined ||
    height === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  // Validate numbers
  if (Number(length) <= 0 || Number(height) <= 0) {
    return res.status(400).json({
      success: false,
      message: "Length and height must be greater than 0",
    });
  }

  const roomData = {
    branch_name: branch_name.trim(),
    city: city.trim(),
    room_number: room_number.trim(),
    length: Number(length),
    height: Number(height),
    status: status || "Empty",
  };

  roomModel.addRoom(roomData, (err, result) => {
    if (err) {
      console.log("ADD ROOM DB ERROR:", err);

      // Duplicate room
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          success: false,
          message: `Room ${roomData.room_number} already exists in ${roomData.branch_name}`,
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to add room",
        error: err.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Room Added Successfully",
      roomId: result.insertId,
    });
  });
};
// ==============================
// GET ALL ROOMS
// ==============================
const getAllRooms = (req, res) => {
  roomModel.getAllRooms((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch rooms",
        error: err.message,
      });
    }

    return res.json({
      success: true,
      count: results.length,
      rooms: results,
    });
  });
};

// ==============================
// GET ROOM BY ID
// ==============================
const getRoomById = (req, res) => {
  const roomId = req.params.id;

  roomModel.getRoomById(roomId, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.json({
      success: true,
      room: result[0],
    });
  });
};

// ==============================
// UPDATE ROOM
// ==============================
const updateRoom = (req, res) => {
  const roomId = req.params.id;

  roomModel.updateRoom(roomId, req.body, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.json({
      success: true,
      message: "Room updated successfully",
    });
  });
};

// ==============================
// DELETE ROOM
// ==============================

const deleteRoom = (req, res) => {
  const roomId = req.params.id;

  console.log("DELETE ROOM ID:", roomId);

  roomModel.deleteRoom(roomId, (err, result) => {
if (err) {
  console.log("DELETE ROOM ERROR:", err);

  if (err.code === "ER_ROW_IS_REFERENCED_2") {
    return res.status(409).json({
      success: false,
      message:
        "This room cannot be deleted because it is currently allocated to a farmer.",
    });
  }

  return res.status(500).json({
    success: false,
    message: "Failed to delete room",
    error: err.message,
  });
}

    console.log("DELETE RESULT:", result);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    return res.json({
      success: true,
      message: "Room deleted successfully",
    });
  });
};
module.exports = {
  addRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};