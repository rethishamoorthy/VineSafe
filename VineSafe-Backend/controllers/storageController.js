const storageModel = require("../models/storageModel");

// ==========================================
// ADD STORAGE
// ==========================================
const addStorage = (req, res) => {

    console.log("📦 Add Storage Request");
    console.log("REQ BODY:", req.body);

    storageModel.addStorage(req.body, (err, result) => {

        if (err) {
            console.error("❌ Error adding storage:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to add storage details",
                error: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Storage details added successfully",
            storage_id: result.insertId
        });
    });
};


// ==========================================
// GET ALL STORAGE
// ==========================================
const getAllStorage = (req, res) => {

    storageModel.getAllStorage((err, results) => {

        if (err) {
            console.error("❌ Error getting storage details:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to get storage details",
                error: err.message
            });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
};


// ==========================================
// GET STORAGE BY ID
// ==========================================
const getStorageById = (req, res) => {

    const { id } = req.params;

    storageModel.getStorageById(id, (err, results) => {

        if (err) {
            console.error("❌ Error getting storage:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to get storage details",
                error: err.message
            });
        }

        if (results.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Storage details not found"
            });
        }

        res.status(200).json({
            success: true,
            data: results[0]
        });
    });
};


// ==========================================
// UPDATE STORAGE
// ==========================================
const updateStorage = (req, res) => {

    const { id } = req.params;

    console.log("✏️ Update Storage ID:", id);
    console.log("REQ BODY:", req.body);

    storageModel.updateStorage(id, req.body, (err, result) => {

        if (err) {
            console.error("❌ Error updating storage:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to update storage details",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                message: "Storage details not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Storage details updated successfully"
        });
    });
};


// ==========================================
// DELETE STORAGE
// ==========================================
const deleteStorage = (req, res) => {

    const { id } = req.params;

    storageModel.deleteStorage(id, (err, result) => {

        if (err) {
            console.error("❌ Error deleting storage:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to delete storage details",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {

            return res.status(404).json({
                success: false,
                message: "Storage details not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Storage details deleted successfully"
        });
    });
};

// ==========================================
// GET STORAGE SUGGESTIONS
// ==========================================
const getStorageSuggestions = (req, res) => {

    const { field, search } = req.query;

    if (!field) {
        return res.status(400).json({
            success: false,
            message: "Field is required"
        });
    }

    storageModel.getStorageSuggestions(field, search || "", (err, results) => {

        if (err) {
            console.error("❌ Error getting suggestions:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to get suggestions",
                error: err.message
            });
        }

        res.status(200).json({
            success: true,
            suggestions: results
        });
    });
};
// ==========================================
// EXPORT
// ==========================================
module.exports = {
    addStorage,
    getAllStorage,
    getStorageById,
    updateStorage,
    deleteStorage,
    getStorageSuggestions
};