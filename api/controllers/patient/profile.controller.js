const Patient = require("../../../models/Patient");
const Upload = require("../../services/FileUpload");
const Unlink = require("../../services/FileDelete");
const CheckId = require("../../middleware/CheckId");
const publicURL = require("../../utils/url");

// Me
const me = async (req, res, next) => {
  try {
    const { id } = req.user;

    /* Find account */
    let account = await Patient.findById(id, {
      access_token: 0,
      password: 0,
    });

    if (account && account.image) {
      account.image =
        publicURL(req) + "uploads/patient/profiles/" + account.image;
    }

    return res.status(200).json({
      status: true,
      data: account,
    });
  } catch (error) {
    if (error) next(error);
  }
};

// Update Profile Photo
const updatePhoto = async (req, res, next) => {
  try {
    const { id } = req.user;

    // Find Profile
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({
        status: false,
        message: "Account not found.",
      });
    }

    // Remove Old file
    if (patient.image) {
      await Unlink.fileDelete("./uploads/patient/profiles/", patient.image);
    }

    // Upload file
    if (req.files) {
      filename = Upload.fileUpload(
        req.files.image,
        "./uploads/patient/profiles/"
      );
    }

    const updateData = { image: filename };
    await patient.updateOne({ $set: updateData }, { new: true }).exec();

    res.status(200).json({
      status: true,
      message: "Account updated.",
    });
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

// Update Bio
const updateBio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, age, height, weight, bloodPressure } = req.body;

    await CheckId(id);

    // Find Profile
    const patient = await Patient.findById({ _id: id }).exec();
    if (!patient) {
      return res.status(404).json({
        status: false,
        message: "Patient not found",
      });
    }

    const data = { name, age, height, weight, bloodPressure };

    const updatePatient = await patient
      .updateOne({ $set: data }, { new: true })
      .exec();

    if (!updatePatient) {
      return res.status(501).json({
        message: "Update error",
      });
    }

    return res.status(201).json({
      status: true,
      message: "Successfully profile updated.",
    });
  } catch (error) {
    if (error) next(error);
  }
};

module.exports = {
  me,
  updatePhoto,
  updateBio,
};
