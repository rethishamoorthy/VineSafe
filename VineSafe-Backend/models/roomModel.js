const db = require("../database/db");

// ==============================
// ADD ROOM
// ==============================
const addRoom = (room, callback) => {
  const sql = `
    INSERT INTO storage_room
    (branch_name, city, room_number, length, height, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      room.branch_name,
      room.city,
      room.room_number,
      room.length,
      room.height,
      room.status,
    ],
    callback
  );
};

// ==============================
// GET ALL ROOMS
// ==============================
const getAllRooms = (callback) => {
  const sql = `
    SELECT
      room_id,
      branch_name,
      city,
      room_number,
      length,
      height,
      status
    FROM storage_room
    ORDER BY room_id DESC
  `;

  db.query(sql, callback);
};

// ==============================
// GET ROOM BY ID
// ==============================
const getRoomById = (id, callback) => {
  const sql = `
    SELECT
      room_id,
      branch_name,
      city,
      room_number,
      length,
      height,
      status
    FROM storage_room
    WHERE room_id = ?
  `;

  db.query(sql, [id], callback);
};

// ==============================
// UPDATE ROOM
// ==============================
const updateRoom = (id, room, callback) => {
  const sql = `
    UPDATE storage_room
    SET
      branch_name = ?,
      city = ?,
      room_number = ?,
      length = ?,
      height = ?,
      status = ?
    WHERE room_id = ?
  `;

  db.query(
    sql,
    [
      room.branch_name,
      room.city,
      room.room_number,
      room.length,
      room.height,
      room.status,
      id,
    ],
    callback
  );
};

// ==============================
// DELETE ROOM
// ==============================
const deleteRoom = (id, callback) => {
  const sql = `
    DELETE FROM storage_room
    WHERE room_id = ?
  `;

  db.query(sql, [id], callback);
};

module.exports = {
  addRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};