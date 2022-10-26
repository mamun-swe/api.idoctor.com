const profileRoutes = require("express").Router();
const profileController = require("../../controllers/patient/profile.controller");

profileRoutes.get("/", profileController.me);
profileRoutes.put("/", profileController.updateBio);
profileRoutes.put("/update-photo", profileController.updatePhoto);

module.exports = { profileRoutes };
