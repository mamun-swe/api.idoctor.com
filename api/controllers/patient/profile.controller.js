const Patient = require("../../../models/Patient");
const {
  httpSuccessResponse,
  httpErrorResponse,
} = require("../../utils/helper");
const { uploadFile, destroyFile } = require("../../services/file.service");

// Me
const me = async (req, res, next) => {
  try {
    const { id } = req.user;

    /* Find account */
    const result = await Patient.findById(id, {
      access_token: 0,
      password: 0,
    });

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
      await destroyFile({ filePath: availableAccount.image });
    }

    // Upload file
    const filename = await uploadFile({ file: req.files.image });

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
