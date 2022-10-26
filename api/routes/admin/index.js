const adminRouter = require("express").Router();
const { adminRoutes } = require("./admin.routes");
const { doctorRoutes } = require("./doctor.routes");

adminRouter.use("/admin", adminRoutes);
adminRouter.use("/doctor", doctorRoutes);

module.exports = { adminRouter };
