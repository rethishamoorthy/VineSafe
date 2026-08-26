const managerModel = require("../models/managerModel");

// Register Manager
const register = (req, res) => {
  const { name, phone, email, password } = req.body;

  managerModel.registerManager(
    { name, phone, email, password },
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.status(201).json({
        success: true,
        message: "Manager registered successfully",
      });
    }
  );
};

// Login Manager
const login = (req, res) => {
  const { email, password } = req.body;

  managerModel.loginManager(email, password, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      manager: result[0],
    });
  });
};

module.exports = {
  register,
  login,
};