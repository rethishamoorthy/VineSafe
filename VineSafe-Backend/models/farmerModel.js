const db = require("../database/db");

// Add Farmer
const addFarmer = (farmer, callback) => {
  const sql = `
    INSERT INTO farmer
    (farmer_code, name, phone, address, village, district, state)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      farmer.farmer_code,
      farmer.name,
      farmer.phone,
      farmer.address,
      farmer.village,
      farmer.district,
      farmer.state,
    ],
    callback
  );
};
// Get All Farmers
const getAllFarmers = (callback) => {
  const sql = "SELECT * FROM farmer ORDER BY farmer_id DESC";
  db.query(sql, callback);
};

// Get Farmer by ID
const getFarmerById = (id, callback) => {
  const sql = "SELECT * FROM farmer WHERE farmer_id = ?";
  db.query(sql, [id], callback);
};
// Update Farmer
const updateFarmer = (id, farmer, callback) => {
  const sql = `
    UPDATE farmer
    SET
      farmer_code = ?,
      name = ?,
      phone = ?,
      address = ?,
      village = ?,
      district = ?,
      state = ?
    WHERE farmer_id = ?
  `;

  db.query(
    sql,
    [
      farmer.farmer_code,
      farmer.name,
      farmer.phone,
      farmer.address,
      farmer.village,
      farmer.district,
      farmer.state,
      id,
    ],
    callback
  );
};
// Delete Farmer
const deleteFarmer = (id, callback) => {
  const sql = "DELETE FROM farmer WHERE farmer_id = ?";
  db.query(sql, [id], callback);
};
module.exports = {
  addFarmer,
  getAllFarmers,
  getFarmerById,
  updateFarmer,
  deleteFarmer,
};