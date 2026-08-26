const db = require("../database/db");

// Add Inventory
const addInventory = (data, callback) => {

    const sql = `
        INSERT INTO inventory
        (
            allocation_id,
            crop_name,
            quantity,
            unit,
            quality_grade
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.allocation_id,
            data.crop_name,
            data.quantity,
            data.unit,
            data.quality_grade
        ],
        callback
    );

};
// Get All Inventory
const getAllInventory = (callback) => {

    const sql = `
        SELECT *
        FROM inventory
        ORDER BY inventory_id DESC
    `;

    db.query(sql, callback);

};


// Get Inventory By ID
const getInventoryById = (id, callback) => {

    const sql = `
        SELECT *
        FROM inventory
        WHERE inventory_id = ?
    `;

    db.query(sql, [id], callback);

};


// Update Inventory
const updateInventory = (id, data, callback) => {

    const sql = `
        UPDATE inventory
        SET
            crop_name = ?,
            quantity = ?,
            unit = ?,
            quality_grade = ?
        WHERE inventory_id = ?
    `;

    db.query(sql, [
        data.crop_name,
        data.quantity,
        data.unit,
        data.quality_grade,
        id
    ], callback);

};
// Delete Inventory
const deleteInventory = (id, callback) => {

    const sql = `
        DELETE FROM inventory
        WHERE inventory_id = ?
    `;

    db.query(sql, [id], callback);

};
module.exports = {
    addInventory,
    getAllInventory,
    getInventoryById,
    updateInventory,
    deleteInventory
};