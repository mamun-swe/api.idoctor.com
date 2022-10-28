const profileRoutes = require("express").Router();
const { validators } = require("../../validators");
const profileController = require("../../controllers/doctor/profile.controller");

profileRoutes.get("/", profileController.me);
profileRoutes.put(
  "/step-two",
  validators.doctor.updateProfileStepTwo,
  profileController.updateStepTwo
);
profileRoutes.put(
  "/step-three",
  validators.doctor.updateProfileStepThree,
  profileController.updateStepThree
);
profileRoutes.put(
  "/step-four",
  validators.doctor.updateProfileStepFour,
  profileController.updateStepFour
);
profileRoutes.put(
  "/step-five",
  validators.doctor.updateProfileStepFive,
  profileController.updateStepFive
);
profileRoutes.put(
  "/step-six",
  validators.doctor.updateProfileStepSix,
  profileController.updateStepSix
);

module.exports = { profileRoutes };
