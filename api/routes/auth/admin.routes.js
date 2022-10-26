const adminRoutes = require("express").Router();
const adminController = require("../../controllers/auth/admin.controller");

adminRoutes.post("/login", adminController.Login);

module.exports = { adminRoutes };
