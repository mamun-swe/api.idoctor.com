const adminRoutes = require("express").Router();
const { validators } = require("../../validators");
const adminController = require("../../controllers/admin/admin.controller");

adminRoutes.get("/", adminController.Index);
adminRoutes.post("/", validators.admin.store, adminController.Store);

module.exports = { adminRoutes };
