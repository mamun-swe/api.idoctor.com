const doctorRoutes = require("express").Router();
const doctorController = require("../../controllers/auth/doctor.controller");

doctorRoutes.post("/registration", doctorController.Register);
doctorRoutes.post("/login", doctorController.Login);
doctorRoutes.post("/reset", doctorController.Reset);

module.exports = { doctorRoutes };
