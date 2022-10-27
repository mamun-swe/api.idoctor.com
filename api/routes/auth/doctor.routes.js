const doctorRoutes = require("express").Router();
const { validators } = require("../../validators");
const doctorController = require("../../controllers/auth/doctor.controller");

doctorRoutes.post("/registration", doctorController.Register);
doctorRoutes.post("/login", validators.auth.login, doctorController.Login);
doctorRoutes.post("/reset", doctorController.Reset);

module.exports = { doctorRoutes };
