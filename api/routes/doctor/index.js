const doctorRouter = require("express").Router();
const { profileRoutes } = require("./profile.routes");
const { appointmentRoutes } = require("./appointment.routes");

doctorRouter.use("/profile", profileRoutes);
doctorRouter.use("/appointment", appointmentRoutes);

module.exports = { doctorRouter };
