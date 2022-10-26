const CheckId = require("../../middleware/CheckId");
const Appointment = require("../../../models/Appointment");

// Pending requests
const pendingRequests = async (req, res, next) => {
  try {
    const { id } = req.user;
    const results = await Appointment.find(
      { doctor: id, status: "pending" },
      { doctor: 0, createdAt: 0, updatedAt: 0 }
    )
      .populate("patientId", "_id")
      .exec();

    res.status(200).json({
      status: true,
      requests: results,
    });
  } catch (error) {
    if (error) next(error);
  }
};

// approved appointments
const approvedRequests = async (req, res, next) => {
  try {
    const { id } = req.user;
    const results = await Appointment.find(
      { doctor: id, status: "approved" },
      { doctor: 0, createdAt: 0, updatedAt: 0 }
    )
      .populate("patientId", "_id")
      .exec();

    res.status(200).json({
      status: true,
      results: results,
    });
  } catch (error) {
    if (error) next(error);
  }
};

// approve appointment
const approveRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { day, startTime } = req.body;

    await CheckId(id);
    await Appointment.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          schedule: { day: day, startTime: startTime },
          status: "approved",
        },
      }
    );

    return res.status(200).json({
      status: true,
      message: "Appointment accepted.",
    });
  } catch (error) {
    if (error) next(error);
  }
};

module.exports = {
  pendingRequests,
  approvedRequests,
  approveRequest,
};
