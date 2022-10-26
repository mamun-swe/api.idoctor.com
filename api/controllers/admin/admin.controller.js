const Admin = require("../../../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Index of admin
const Index = async (req, res, next) => {
  try {
    const results = await Admin.find(
      {},
      { name: 1, email: 1, image: 1, role: 1, status: 1 }
    ).exec();
    if (!results.length)
      return res
        .status(404)
        .json({ status: false, message: "Admin not found" });

    res.status(200).json({
      status: true,
      admins: results,
    });
  } catch (error) {
    if (error) next(error);
  }
};

// Create New Admin
const Store = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Find exist admin
    const existAdmin = await Admin.findOne({ email: email }).exec();
    if (existAdmin)
      return res
        .status(409)
        .json({ status: false, message: "Admin already created." });

    // Password Hash
    const hashPassword = await bcrypt.hash(password, 10);

    // Create account object
    const newAdmin = new Admin({
      name: name,
      email: email,
      role: role,
      password: hashPassword,
    });

    // Save admin
    const saveAdmin = await newAdmin.save();
    if (saveAdmin)
      return res.status(201).json({
        status: true,
        message: "Successfully account created",
      });
  } catch (error) {
    if (error) next(error);
  }
};

module.exports = {
  Index,
  Store,
};
