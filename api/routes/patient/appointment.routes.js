const appointmentRoutes = require("express").Router();
const { validators } = require("../../validators");
const appointmentController = require("../../controllers/patient/appointment.controller");

appointmentRoutes.get("/", appointmentController.appointments);
appointmentRoutes.post(
  "/",
  validators.patient.bookAppointment,
  appointmentController.bookAppointment
);

module.exports = { appointmentRoutes };
