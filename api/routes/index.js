const routers = require("express").Router();
const {
  admin,
  doctor,
  patient,
} = require("../middleware/permission.middleware");
const { authRouter } = require("../routes/auth");
const { adminRouter } = require("../routes/admin");
const { doctorRouter } = require("../routes/doctor");
const { patientRouter } = require("../routes/patient");
const { publicRouter } = require("../routes/public");

routers.use("/auth", authRouter);
routers.use("/admin", admin, adminRouter);
routers.use("/doctor", doctor, doctorRouter);
routers.use("/patient", patient, patientRouter);
routers.use("/public", publicRouter);

module.exports = { routers };
