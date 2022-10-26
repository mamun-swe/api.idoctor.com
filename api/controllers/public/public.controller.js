const Doctor = require("../../../models/Doctor");
const hostURL = require("../../utils/url");

// All Approved doctors
const doctors = async (req, res, next) => {
  try {
    let doctors = await Doctor.find(
      { isApproved: "approved" },
      {
        role: 0,
        password: 0,
        access_token: 0,
        createdAt: 0,
        updatedAt: 0,
        status: 0,
        updateRange: 0,
        updateStep: 0,
        email: 0,
        isApproved: 0,
        passingYear: 0,
        location: 0,
      }
    )
      .populate("councilHour", "schedule")
      .exec();
    // If doctor are not available
    if (!doctors.length)
      return res
        .status(404)
        .json({ status: false, message: "Doctors not found" });

    // Modifiy image path
    if (doctors && doctors.length) {
      await doctors.map((item) => {
        if (item.image) {
          item.image = hostURL(req) + "uploads/doctor/profiles/" + item.image;
        } else {
          item.image = null;
        }
      });
    }

    res.status(200).json({
      status: true,
      data: doctors,
    });
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
