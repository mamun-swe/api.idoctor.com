const doctorRoutes = require("express").Router();
const { validators } = require("../../validators");
const doctorController = require("../../controllers/admin/doctor.controller");

doctorRoutes.get("/", doctorController.Index);
doctorRoutes.get("/:id", doctorController.Show);
doctorRoutes.put(
  "/:id/:status",
  validators.admin.changeDoctorStatus,
  doctorController.UpdateStatus
);

module.exports = { doctorRoutes };
