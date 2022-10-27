const patientRoutes = require("express").Router();
const { validators } = require("../../validators");
const patientController = require("../../controllers/auth/patient.controller");

patientRoutes.post(
  "/registration",
  validators.auth.login,
  patientController.Register
);
patientRoutes.post("/login", validators.auth.login, patientController.Login);
patientRoutes.post("/reset", patientController.Reset);

module.exports = { patientRoutes };
