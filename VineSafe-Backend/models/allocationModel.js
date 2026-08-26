// const db = require("../database/db");


// // Add Allocation
// const addAllocation = (data, callback) => {

//     const sql = `
//         INSERT INTO room_allocation
//         (room_id, farmer_id, start_date, end_date, status, notes)
//         VALUES (?, ?, ?, ?, ?, ?)
//     `;

//     db.query(
//         sql,
//         [
//             data.room_id,
//             data.farmer_id,
//             data.start_date,
//             data.end_date,
//             data.status || "Active",
//             data.notes
//         ],
//         callback
//     );

// };


// // Get All Allocations
// const getAllAllocations = (callback) => {

//    const sql = `
//     SELECT
//         ra.allocation_id,
//         sr.room_id,
//         sr.room_number,
//         sr.status AS room_status,

//         f.farmer_id,
//         f.name AS farmer_name,
//         f.phone,

//         ra.start_date,
//         ra.end_date,
//         ra.status,
//         ra.notes

//     FROM room_allocation ra

//     INNER JOIN storage_room sr
//         ON ra.room_id = sr.room_id

//     INNER JOIN farmer f
//         ON ra.farmer_id = f.farmer_id

//     ORDER BY ra.allocation_id DESC
// `;

//     db.query(sql, callback);
// };
// // Get Allocation By ID
// const getAllocationById = (id, callback) => {

//    const sql = `
//     SELECT
//         ra.allocation_id,

//         sr.room_id,
//         sr.room_number,
//         sr.capacity,
//         sr.current_load,
//         sr.status AS room_status,

//         f.farmer_id,
//         f.farmer_code,
//         f.name AS farmer_name,
//         f.phone,
//         f.address,
//         f.village,
//         f.district,
//         f.state,

//         ra.start_date,
//         ra.end_date,
//         ra.status,
//         ra.notes,
//         ra.created_at

//     FROM room_allocation ra

//     INNER JOIN storage_room sr
//         ON ra.room_id = sr.room_id

//     INNER JOIN farmer f
//         ON ra.farmer_id = f.farmer_id

//     WHERE ra.allocation_id = ?
// `;

//     db.query(sql, [id], callback);

// };
// // Update Allocation
// const updateAllocation = (id, data, callback) => {

//     const sql = `
//         UPDATE room_allocation
//         SET
//             room_id = ?,
//             farmer_id = ?,
//             start_date = ?,
//             end_date = ?,
//             status = ?,
//             notes = ?
//         WHERE allocation_id = ?
//     `;

//     db.query(
//         sql,
//         [
//             data.room_id,
//             data.farmer_id,
//             data.start_date,
//             data.end_date,
//             data.status,
//             data.notes,
//             id
//         ],
//         callback
//     );

// };
// // Delete Allocation
// const deleteAllocation = (id, callback) => {

//     const sql = `
//         DELETE FROM room_allocation
//         WHERE allocation_id = ?
//     `;

//     db.query(sql, [id], callback);

// };

// module.exports = {
//     addAllocation,
//     getAllAllocations,
//     getAllocationById,
//     updateAllocation,
//     deleteAllocation
// };
    

const db = require("../database/db");

// =====================================================
// ADD ALLOCATION
// =====================================================
const addAllocation = (data, callback) => {
    const sql = `
        INSERT INTO room_allocation
        (
            room_id,
            farmer_id,
            start_date,
            end_date,
            status,
            notes,
            rent_amount,
            security_deposit,
            payment_due_date,
            payment_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            data.room_id,
            data.farmer_id,
            data.start_date,
            data.end_date,
            data.status || "Active",
            data.notes || null,
            data.rent_amount || 0,
            data.security_deposit || 0,
            data.payment_due_date || null,
            data.payment_status || "Pending"
        ],
        callback
    );
};


// =====================================================
// GET ALL ALLOCATIONS
// =====================================================
const getAllAllocations = (callback) => {

    const sql = `
        SELECT
            ra.allocation_id,

            sr.room_id,
            sr.room_number,
            sr.status AS room_status,

            f.farmer_id,
            f.farmer_code,
            f.name AS farmer_name,
            f.phone,
            f.address,
            f.village,
            f.district,
            f.state,

            ra.start_date,
            ra.end_date,
            ra.status,
            ra.notes,

            ra.rent_amount,
            ra.security_deposit,
            ra.payment_due_date,
            ra.payment_status,

            ra.created_at

        FROM room_allocation ra

        INNER JOIN storage_room sr
            ON ra.room_id = sr.room_id

        INNER JOIN farmer f
            ON ra.farmer_id = f.farmer_id

        ORDER BY ra.allocation_id DESC
    `;

    db.query(sql, callback);
};


// =====================================================
// GET ALLOCATION BY ID
// =====================================================
const getAllocationById = (id, callback) => {

    const sql = `
        SELECT
            ra.allocation_id,

            sr.room_id,
            sr.room_number,
            sr.status AS room_status,

            f.farmer_id,
            f.farmer_code,
            f.name AS farmer_name,
            f.phone,
            f.address,
            f.village,
            f.district,
            f.state,

            ra.start_date,
            ra.end_date,
            ra.status,
            ra.notes,

            ra.rent_amount,
            ra.security_deposit,
            ra.payment_due_date,
            ra.payment_status,

            ra.created_at

        FROM room_allocation ra

        INNER JOIN storage_room sr
            ON ra.room_id = sr.room_id

        INNER JOIN farmer f
            ON ra.farmer_id = f.farmer_id

        WHERE ra.allocation_id = ?
    `;

    db.query(sql, [id], callback);
};


// =====================================================
// UPDATE ALLOCATION
// =====================================================
const updateAllocation = (id, data, callback) => {

    const sql = `
        UPDATE room_allocation
        SET
            room_id = ?,
            farmer_id = ?,
            start_date = ?,
            end_date = ?,
            status = ?,
            notes = ?,

            rent_amount = ?,
            security_deposit = ?,
            payment_due_date = ?,
            payment_status = ?

        WHERE allocation_id = ?
    `;

    db.query(
        sql,
        [
            data.room_id,
            data.farmer_id,
            data.start_date,
            data.end_date,
            data.status || "Active",
            data.notes || null,

            data.rent_amount || 0,
            data.security_deposit || 0,
            data.payment_due_date || null,
            data.payment_status || "Pending",

            id
        ],
        callback
    );
};


// =====================================================
// DELETE ALLOCATION
// =====================================================
const deleteAllocation = (id, callback) => {

    const sql = `
        DELETE FROM room_allocation
        WHERE allocation_id = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );
};

// =====================================================
// GET ALLOCATION BY ROOM ID
// =====================================================
const getAllocationByRoomId = (roomId, callback) => {

    const sql = `
        SELECT
            ra.allocation_id,

            sr.room_id,
            sr.room_number,
            sr.branch_name,
            sr.city,
            sr.length,
            sr.height,
            sr.status AS room_status,

            f.farmer_id,
            f.farmer_code,
            f.name AS farmer_name,
            f.phone,
            f.address,
            f.village,
            f.district,
            f.state,

            ra.start_date,
            ra.end_date,
            ra.status,
            ra.notes,

            ra.rent_amount,
            ra.security_deposit,
            ra.payment_due_date,
            ra.payment_status,

            ra.created_at

        FROM room_allocation ra

        INNER JOIN storage_room sr
            ON ra.room_id = sr.room_id

        INNER JOIN farmer f
            ON ra.farmer_id = f.farmer_id

        WHERE ra.room_id = ?

        ORDER BY ra.allocation_id DESC

        LIMIT 1
    `;

    db.query(
        sql,
        [roomId],
        callback
    );
};
// =====================================================
// EXPORT
// =====================================================
module.exports = {
    addAllocation,
    getAllAllocations,
    getAllocationById,
    getAllocationByRoomId,
    updateAllocation,
    deleteAllocation
};