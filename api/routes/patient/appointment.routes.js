const appointmentRoutes = require("express").Router();
const appointmentController = require("../../controllers/doctor/appointment.controller");

appointmentRoutes.get("/pending", appointmentController.pendingRequests);
appointmentRoutes.get("/approved", appointmentController.approvedRequests);
appointmentRoutes.put("/approve/:id", appointmentController.approveRequest);

module.exports = { appointmentRoutes };
