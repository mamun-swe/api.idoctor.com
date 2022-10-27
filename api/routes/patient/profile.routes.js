const profileRoutes = require("express").Router();
const { validators } = require("../../validators");
const profileController = require("../../controllers/patient/profile.controller");

profileRoutes.get("/", profileController.me);
profileRoutes.put(
  "/",
  validators.patient.updateProfileInfo,
  profileController.updateBio
);
profileRoutes.put(
  "/update-photo",
  validators.patient.updateProfileImage,
  profileController.updatePhoto
);

module.exports = { profileRoutes };
