const inventoryModel = require("../models/inventoryModel");

// Add Inventory
const addInventory = (req, res) => {

    inventoryModel.addInventory(req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to add inventory",
                error: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Inventory added successfully",
            inventoryId: result.insertId
        });

    });

};

// Get All Inventory
const getAllInventory = (req, res) => {

    inventoryModel.getAllInventory((err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch inventory",
                error: err.message
            });
        }

        res.json({
            success: true,
            count: results.length,
            inventory: results
        });

    });

};


// Get Inventory By ID
const getInventoryById = (req, res) => {

    const id = req.params.id;

    inventoryModel.getInventoryById(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch inventory",
                error: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Inventory not found"
            });
        }

        res.json({
            success: true,
            inventory: result[0]
        });

    });

};

// Update Inventory
const updateInventory = (req, res) => {

    const id = req.params.id;

    inventoryModel.updateInventory(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to update inventory",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Inventory not found"
            });
        }

        res.json({
            success: true,
            message: "Inventory updated successfully"
        });

    });

};

// Delete Inventory
const deleteInventory = (req, res) => {

    const id = req.params.id;

    inventoryModel.deleteInventory(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to delete inventory",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Inventory not found"
            });
        }

        res.json({
            success: true,
            message: "Inventory deleted successfully"
        });

    });

};
module.exports = {
    addInventory,
    getAllInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
};