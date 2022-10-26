const adminRoutes = require("express").Router();
const { validators } = require("../../validators");
const adminController = require("../../controllers/auth/admin.controller");

adminRoutes.post("/login", validators.auth.login, adminController.Login);

module.exports = { adminRoutes };
