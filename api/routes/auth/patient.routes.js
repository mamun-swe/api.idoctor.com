const patientRoutes = require("express").Router();
const patientController = require("../../controllers/auth/doctor.controller");

patientRoutes.post("/registration", patientController.Register);
patientRoutes.post("/login", patientController.Login);
patientRoutes.post("/reset", patientController.Reset);

module.exports = { patientRoutes };
