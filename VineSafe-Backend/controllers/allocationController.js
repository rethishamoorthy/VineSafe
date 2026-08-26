const allocationModel = require("../models/allocationModel");


// Add Allocation
const addAllocation = (req, res) => {

    allocationModel.addAllocation(req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to allocate room",
                error: err.message
            });
        }

        res.status(201).json({
            success: true,
            message: "Room allocated successfully",
            allocationId: result.insertId
        });

    });

};


// Get All Allocations
const getAllAllocations = (req, res) => {

    allocationModel.getAllAllocations((err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch allocations",
                error: err.message
            });
        }

        res.json({
            success: true,
            count: results.length,
            allocations: results
        });

    });

};

// Get Allocation By ID
const getAllocationById = (req, res) => {

    const { id } = req.params;

    allocationModel.getAllocationById(id, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch allocation",
                error: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Allocation not found"
            });
        }

        res.json({
            success: true,
            allocation: results[0]
        });

    });

};

// Update Allocation
// const updateAllocation = (req, res) => {

//     const { id } = req.params;

//     allocationModel.updateAllocation(id, req.body, (err, result) => {

//         if (err) {
//             return res.status(500).json({
//                 success: false,
//                 message: "Failed to update allocation",
//                 error: err.message
//             });
//         }

//         if (result.affectedRows === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Allocation not found"
//             });
//         }

//         res.json({
//             success: true,
//             message: "Allocation updated successfully"
//         });

//     });

// };


const updateAllocation = (req, res) => {

    const { id } = req.params;

    console.log("UPDATE ALLOCATION ID:", id);
    console.log("UPDATE ALLOCATION BODY:", req.body);

    allocationModel.updateAllocation(id, req.body, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to update allocation",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Allocation not found"
            });
        }

        res.json({
            success: true,
            message: "Allocation updated successfully"
        });
    });
};

// Delete Allocation
const deleteAllocation = (req, res) => {

    const { id } = req.params;

    allocationModel.deleteAllocation(id, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to delete allocation",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Allocation not found"
            });
        }

        res.json({
            success: true,
            message: "Allocation deleted successfully"
        });

    });

};
// =====================================================
// GET ALLOCATION BY ROOM ID
// =====================================================
const getAllocationByRoomId = (req, res) => {

    const { roomId } = req.params;

    allocationModel.getAllocationByRoomId(
        roomId,
        (err, results) => {

            if (err) {

                return res.status(500).json({
                    success: false,
                    message: "Failed to fetch room farmer details",
                    error: err.message
                });

            }

            if (results.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "No farmer allocated to this room"
                });

            }

            res.json({
                success: true,
                allocation: results[0]
            });

        }
    );
};
module.exports = {
    addAllocation,
    getAllAllocations,
    getAllocationById,
    getAllocationByRoomId,
    updateAllocation,
    deleteAllocation
};
