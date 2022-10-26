const patientRouter = require("express").Router();
const { profileRoutes } = require("./profile.routes");
const { appointmentRoutes } = require("./appointment.routes");

patientRouter.use("/profile", profileRoutes);
patientRouter.use("/appointment", appointmentRoutes);

module.exports = { patientRouter };
