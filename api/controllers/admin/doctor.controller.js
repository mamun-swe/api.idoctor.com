const Doctor = require("../../../models/Doctor");
const checkId = require("../../middleware/CheckId");
const {
  httpSuccessResponse,
  httpErrorResponse,
} = require("../../utils/helper");

// Index of doctors
const Index = async (req, res, next) => {
  try {
    const results = await Doctor.find(
      {},
      { name: 1, specialist: 1, image: 1, isApproved: 1 }
    ).sort({ _id: -1 });

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Doctros list.",
        data: results,
      })
    );
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

// Show individual doctor
const Show = async (req, res, next) => {
  try {
    const { id } = req.params;
    await checkId(id);

    // Find doctor
    const doctor = await Doctor.findById(id, {
      access_token: 0,
      password: 0,
      role: 0,
      appointments: 0,
    })
      .populate("councilHour", "schedule")
      .exec();

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Doctor information",
        data: doctor,
      })
    );
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

// Update account status
const UpdateStatus = async (req, res, next) => {
  try {
    const { id, status } = req.params;
    await checkId(id);

    /* Check available */
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

    await Doctor.findByIdAndUpdate(id, { $set: { isApproved: status } });

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Saved changes.",
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
  Index,
  Show,
  UpdateStatus,
};
