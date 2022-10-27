const CheckId = require("../../middleware/CheckId");
const Appointment = require("../../../models/Appointment");
const {
  httpSuccessResponse,
  httpErrorResponse,
} = require("../../utils/helper");

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

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Pending appointments.",
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

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Approved appointments.",
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

// approve appointment
const scheduleAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { day, startTime } = req.body;

    await CheckId(id);

    /* Check available */
    const availableAppointment = await Appointment.findById(id);
    if (!availableAppointment) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Appointment not found.",
          },
        })
      );
    }

    await Appointment.findByIdAndUpdate(id, {
      $set: {
        schedule: { day: day, startTime: startTime },
        status: "approved",
      },
    });

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Appointment accepted.",
      })
    );
  } catch (error) {
    if (error) next(error);
  }
};

module.exports = {
  pendingRequests,
  approvedRequests,
  scheduleAppointment,
};
