const Doctor = require("../../../models/Doctor");
const Patient = require("../../../models/Patient");
const Appointment = require("../../../models/Appointment");
const CheckId = require("../../middleware/CheckId");
const {
  httpSuccessResponse,
  httpErrorResponse,
} = require("../../utils/helper");

// All appointments
const appointments = async (req, res, next) => {
  try {
    const { id } = req.user;
    const results = await Appointment.find(
      { patientId: id },
      { schedule: 1, status: 1 }
    )
      .populate("doctor", "name")
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

// Book appointment
const bookAppointment = async (req, res, next) => {
  try {
    const { id } = req.user;
    const {
      doctorId,
      name,
      phone,
      age,
      height,
      weight,
      bloodPressure,
      problemShortInfo,
    } = req.body;

    await CheckId(doctorId);

    /* Check ailable doctor */
    const availableDoctor = await Doctor.findOne({
      $and: [{ _id: doctorId }, { isApproved: true }],
    });

    if (!availableDoctor) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Doctor not available.",
          },
        })
      );
    }

    const newAppointment = new Appointment({
      doctor: doctorId,
      patientId: id,
      patient: {
        name,
        phone,
        age,
        height,
        weight,
        bloodPressure,
        problemShortInfo,
      },
    });

    // Create appoinment
    const createAppointment = await newAppointment.save();

    // Update doctor
    await Doctor.findByIdAndUpdate(
      doctorId,
      { $push: { appointments: [createAppointment._id] } },
      { new: true }
    ).exec();

    // Update Patient
    await Patient.findByIdAndUpdate(
      id,
      { $push: { appointmentRequests: [createAppointment._id] } },
      { new: true }
    ).exec();

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Your appointment request has been sent.",
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
  appointments,
  bookAppointment,
};
