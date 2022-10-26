const appointmentRoutes = require("express").Router();
const appointmentController = require("../../controllers/patient/appointment.controller");

appointmentRoutes.get("/", appointmentController.appointments);
appointmentRoutes.post("/", appointmentController.bookAppointment);

module.exports = { appointmentRoutes };
