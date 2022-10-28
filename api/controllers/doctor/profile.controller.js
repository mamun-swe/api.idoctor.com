const Doctor = require("../../../models/Doctor");
const Council = require("../../../models/Council");
const {
  httpSuccessResponse,
  httpErrorResponse,
} = require("../../utils/helper");
const { destroyFile, uploadFile } = require("../../services/file.service");

const me = async (req, res, next) => {
  try {
    const { id } = req.user;

    // Find account using account id and role
    const account = await Doctor.findById(id, { access_token: 0, password: 0 })
      .populate("councilHour")
      .exec();

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Profile information.",
        data: account,
      })
    );
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

// Profile update step two
const updateStepTwo = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { name } = req.body;

    // Find Profile
    const availableAccount = await Doctor.findById(id);
    if (!availableAccount) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Account not found.",
          },
        })
      );
    }

    /* Delete old image */
    if (availableAccount.image) {
      await destroyFile({ filePath: availableAccount.image });
    }

    /* Upload image */
    const uploadedFilename = await uploadFile({ file: req.files.image });

    const formData = {
      name,
      image: uploadedFilename,
    };

    await Doctor.findByIdAndUpdate(id, {
      $set: { ...formData, updateRange: 40, updateStep: 2 },
    });
    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Second step completed.",
      })
    );
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

// Profile update step three
const updateStepThree = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { college, passingYear, specialist, currentHospital } = req.body;

    // Find Profile
    const availableAccount = await Doctor.findById(id);
    if (!availableAccount) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Account not found.",
          },
        })
      );
    }

    const formData = {
      college,
      passingYear,
      specialist,
      currentHospital,
    };

    await Doctor.findByIdAndUpdate(id, {
      $set: { ...formData, updateRange: 60, updateStep: 3 },
    });

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Third step completed.",
      })
    );
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

// Profile update step four
const updateStepFour = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { country, city, currentAddress } = req.body;

    // Find Profile
    const availableAccount = await Doctor.findById(id);
    if (!availableAccount) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Account not found.",
          },
        })
      );
    }

    const formData = {
      country,
      city,
      currentAddress,
    };

    await Doctor.findByIdAndUpdate(id, {
      $set: {
        updateRange: 80,
        updateStep: 4,
        "location.address": formData,
      },
    });

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Four step completed.",
      })
    );
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

// Profile update step five
const updateStepFive = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { latitude, longitude } = req.body;

    // Find Profile
    const availableAccount = await Doctor.findById(id);
    if (!availableAccount) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Account not found.",
          },
        })
      );
    }

    await Doctor.findByIdAndUpdate(id, {
      $set: {
        updateRange: 90,
        updateStep: 5,
        "location.coordinates": [latitude, longitude],
      },
    });

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Step five completed.",
      })
    );
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

// Profile update step six
const updateStepSix = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { day, startTime, endTime } = req.body;

    // Find Profile
    const availableAccount = await Doctor.findById(id);
    if (!availableAccount) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Account not found.",
          },
        })
      );
    }

    /* Create new council */
    const newCouncil = new Council({
      doctor: id,
      schedule: { day: day, startTime: startTime, endTime: endTime },
    });

    const council = await newCouncil.save();

    /* Update council to doctor */
    await Doctor.findByIdAndUpdate(id, {
      $set: {
        updateRange: 100,
        updateStep: 6,
        councilHour: [council._id],
        allSubmitted: true,
      },
    });

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Step five completed.",
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
  updateStepTwo,
  updateStepThree,
  updateStepFour,
  updateStepFive,
  updateStepSix,
};
