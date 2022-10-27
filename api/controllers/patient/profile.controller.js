const Patient = require("../../../models/Patient");
const Upload = require("../../services/FileUpload");
const Unlink = require("../../services/FileDelete");
const publicURL = require("../../utils/url");
const {
  httpSuccessResponse,
  httpErrorResponse,
} = require("../../utils/helper");

// Me
const me = async (req, res, next) => {
  try {
    const { id } = req.user;

    /* Find account */
    let result = await Patient.findById(id, {
      access_token: 0,
      password: 0,
    });

    if (result && result.image) {
      result.image = publicURL(req) + "uploads/" + result.image;
    }

    return res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Profile information",
        data: result,
      })
    );
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
    const { id } = req.user;
    const { name, age, height, weight, bloodPressure } = req.body;

    // Find Profile
    const availableAccount = await Patient.findById(id);
    if (!availableAccount) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Account not found",
          },
        })
      );
    }

    const data = { name, age, height, weight, bloodPressure };
    await Patient.findByIdAndUpdate(id, { $set: { ...data } });

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Profile updated.",
      })
    );
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

// Update Profile Photo
const updatePhoto = async (req, res, next) => {
  try {
    let filename;
    const { id } = req.user;

    // Find Profile
    const availableAccount = await Patient.findById(id);
    if (!availableAccount) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Account not found",
          },
        })
      );
    }

    // Remove Old file
    if (availableAccount.image) {
      await Unlink.fileDelete({ file: availableAccount.image });
    }

    // Upload file
    filename = await Upload.fileUpload({ file: req.files.image });

    const updateData = { image: filename };
    await Patient.findByIdAndUpdate(id, { $set: { ...updateData } });

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Account updated.",
      })
    );
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
