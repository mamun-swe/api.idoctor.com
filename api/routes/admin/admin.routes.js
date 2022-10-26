const adminRoutes = require("express").Router();
const adminController = require("../../controllers/admin/admin.controller");

adminRoutes.get("/", adminController.Index);
adminRoutes.post("/", adminController.Store);

module.exports = { adminRoutes };
