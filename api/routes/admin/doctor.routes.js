const doctorRoutes = require("express").Router();
const doctorController = require("../../controllers/admin/doctor.controller");

doctorRoutes.get("/", doctorController.Index);
doctorRoutes.get("/:id", doctorController.Show);
doctorRoutes.put("/:id/:status", doctorController.UpdateStatus);

module.exports = { doctorRoutes };
