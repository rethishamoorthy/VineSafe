const farmerModel = require("../models/farmerModel");

// Add Farmer
const addFarmer = (req, res) => {

  farmerModel.addFarmer(req.body, (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.status(201).json({
      success: true,
      message: "Farmer added successfully",
      farmerId: result.insertId,
    });

  });

};
// Get All Farmers
const getAllFarmers = (req, res) => {
  farmerModel.getAllFarmers((err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json({
      success: true,
      count: results.length,
      farmers: results,
    });
  });
};

// Get Farmer by ID
const getFarmerById = (req, res) => {
  const { id } = req.params;

  farmerModel.getFarmerById(id, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Farmer not found",
      });
    }

    res.json({
      success: true,
      farmer: results[0],
    });
  });
};

// Update Farmer
const updateFarmer = (req, res) => {
  const { id } = req.params;

  farmerModel.updateFarmer(id, req.body, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json({
      success: true,
      message: "Farmer updated successfully",
    });
  });
};
// Delete Farmer
const deleteFarmer = (req, res) => {
  const { id } = req.params;

  farmerModel.deleteFarmer(id, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    res.json({
      success: true,
      message: "Farmer deleted successfully",
    });
  });
};
module.exports = {
  addFarmer,
  getAllFarmers,
  getFarmerById,
  updateFarmer,
  deleteFarmer,
};