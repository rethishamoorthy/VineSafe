const db = require("../database/db");

// Add Storage Details
const addStorage = (data, callback) => {

    const sql = `
        INSERT INTO storage_details (
            crop_name,
            crop_variety,
            quantity,
            storage_room,
            storage_section,
            storage_type,
            rack_cabinet_number,
            shelf_number,
            storage_date,
            expected_export_date,
            market_name,
            destination,
            market_address,
            owner_name,
            owner_phone,
            notes
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        data.crop_name,
        data.crop_variety,
        data.quantity,
        data.storage_room,
        data.storage_section,
        data.storage_type,
        data.rack_cabinet_number,
        data.shelf_number,
        data.storage_date,
        data.expected_export_date,
        data.market_name,
        data.destination,
        data.market_address,
        data.owner_name,
        data.owner_phone,
        data.notes
    ];

    db.query(sql, values, callback);
};


// Get All Storage Details
const getAllStorage = (callback) => {

    const sql = `
        SELECT *
        FROM storage_details
        ORDER BY storage_id DESC
    `;

    db.query(sql, callback);
};


// Get Storage Details By ID
const getStorageById = (id, callback) => {

    const sql = `
        SELECT *
        FROM storage_details
        WHERE storage_id = ?
    `;

    db.query(sql, [id], callback);
};


// Update Storage Details
const updateStorage = (id, data, callback) => {

    const sql = `
        UPDATE storage_details
        SET
            crop_name = ?,
            crop_variety = ?,
            quantity = ?,
            storage_room = ?,
            storage_section = ?,
            storage_type = ?,
            rack_cabinet_number = ?,
            shelf_number = ?,
            storage_date = ?,
            expected_export_date = ?,
            market_name = ?,
            destination = ?,
            market_address = ?,
            owner_name = ?,
            owner_phone = ?,
            notes = ?
        WHERE storage_id = ?
    `;

    const values = [
        data.crop_name,
        data.crop_variety,
        data.quantity,
        data.storage_room,
        data.storage_section,
        data.storage_type,
        data.rack_cabinet_number,
        data.shelf_number,
        data.storage_date,
        data.expected_export_date,
        data.market_name,
        data.destination,
        data.market_address,
        data.owner_name,
        data.owner_phone,
        data.notes,
        id
    ];

    db.query(sql, values, callback);
};


// Delete Storage Details
const deleteStorage = (id, callback) => {

    const sql = `
        DELETE FROM storage_details
        WHERE storage_id = ?
    `;

    db.query(sql, [id], callback);
};

// ==========================================
// GET STORAGE SUGGESTIONS
// ==========================================
const getStorageSuggestions = (field, search, callback) => {

    const allowedFields = [
        "crop_name",
        "crop_variety",
        "storage_room",
        "storage_section",
        "storage_type",
        "rack_cabinet_number",
        "shelf_number",
        "market_name",
        "destination",
        "owner_name",
        "owner_phone"
    ];

    if (!allowedFields.includes(field)) {
        return callback(new Error("Invalid suggestion field"));
    }

    const sql = `
        SELECT DISTINCT ${field} AS value
        FROM storage_details
        WHERE ${field} IS NOT NULL
        AND ${field} != ''
        AND ${field} LIKE ?
        ORDER BY ${field} ASC
        LIMIT 10
    `;

    db.query(sql, [`%${search}%`], callback);
};
module.exports = {
    addStorage,
    getAllStorage,
    getStorageById,
    updateStorage,
    deleteStorage,
    getStorageSuggestions
};