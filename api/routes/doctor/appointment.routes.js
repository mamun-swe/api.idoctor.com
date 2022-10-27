const appointmentRoutes = require("express").Router();
const { validators } = require("../../validators");
const appointmentController = require("../../controllers/doctor/appointment.controller");

appointmentRoutes.get("/pending", appointmentController.pendingRequests);
appointmentRoutes.get("/approved", appointmentController.approvedRequests);
appointmentRoutes.put(
  "/schedule/:id",
  validators.doctor.scheduleAppointment,
  appointmentController.scheduleAppointment
);

module.exports = { appointmentRoutes };
