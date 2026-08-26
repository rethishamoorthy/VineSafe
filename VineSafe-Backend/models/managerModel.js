const db = require("../database/db");

// Register Manager
const registerManager = (managerData, callback) => {
  const { name, phone, email, password } = managerData;

  const sql = `
    INSERT INTO manager (name, phone, email, password)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [name, phone, email, password], callback);
};

// Login Manager
const loginManager = (email, password, callback) => {
  const sql = `
    SELECT *
    FROM manager
    WHERE email = ? AND password = ?
  `;

  db.query(sql, [email, password], callback);
};

module.exports = {
  registerManager,
  loginManager,
};