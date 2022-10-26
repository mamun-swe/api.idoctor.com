const Patient = require("../../../models/Patient");
const Upload = require("../../services/FileUpload");
const Unlink = require("../../services/FileDelete");
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

// Update Bio
const updateBio = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { name, age, height, weight, bloodPressure } = req.body;

    // Find Profile
    const availableAccount = await Patient.findById(id);
    if (!availableAccount) {
      return res.status(404).json({
        status: false,
        message: "Patient not found",
      });
    }

    const data = { name, age, height, weight, bloodPressure };
    await Patient.findByIdAndUpdate({ $set: data }, { new: true }).exec();

    res.status(200).json({
      status: true,
      message: "Profile updated.",
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
    const availableAccount = await Patient.findById(id);
    if (!availableAccount) {
      return res.status(404).json({
        status: false,
        message: "Account not found.",
      });
    }

    // Remove Old file
    if (availableAccount.image) {
      await Unlink.fileDelete(
        "./uploads/patient/profiles/",
        availableAccount.image
      );
    }

    // Upload file
    if (req.files) {
      filename = Upload.fileUpload(
        req.files.image,
        "./uploads/patient/profiles/"
      );
    }

    const updateData = { image: filename };
    await Patient.findByIdAndUpdate({ $set: updateData }, { new: true }).exec();

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

module.exports = {
  me,
  updateBio,
  updatePhoto,
};
