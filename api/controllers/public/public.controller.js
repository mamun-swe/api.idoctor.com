const Doctor = require("../../../models/Doctor");
const { httpSuccessResponse } = require("../../utils/helper");

// All Approved doctors
const doctors = async (req, res, next) => {
  try {
    let results = await Doctor.find(
      { isApproved: true },
      {
        name: 1,
        image: 1,
        college: 1,
        specialist: 1,
        currentHospital: 1,
        councilHour: 1,
        isApproved: 1,
      }
    )
      .populate("councilHour", "schedule")
      .exec();

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
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

module.exports = {
  doctors,
};
