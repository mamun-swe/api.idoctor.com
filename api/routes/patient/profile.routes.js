const profileRoutes = require("express").Router();
const profileController = require("../../controllers/doctor/profile.controller");

profileRoutes.get("/", profileController.me);
profileRoutes.put("/", profileController.update);

module.exports = { profileRoutes };
