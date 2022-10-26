const authRouter = require("express").Router();
const { adminRoutes } = require("./admin.routes");
const { doctorRoutes } = require("./doctor.routes");
const { patientRoutes } = require("./patient.routes");

authRouter.use("/admin", adminRoutes);
authRouter.use("/doctor", doctorRoutes);
authRouter.use("/patient", patientRoutes);

module.exports = { authRouter };
