const Doctor = require("../../../models/Doctor");
const Patient = require("../../../models/Patient");
const Appointment = require("../../../models/Appointment");

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

    res.status(200).json({
      status: true,
      data: results,
    });
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
    await Doctor.findOneAndUpdate(
      { _id: doctorId },
      { $push: { appointments: [createAppointment._id] } },
      { new: true }
    ).exec();

    // Update Patient
    await Patient.findOneAndUpdate(
      { _id: patientId },
      { $push: { appointmentRequests: [createAppointment._id] } },
      { new: true }
    ).exec();

    res.status(200).json({
      status: true,
      message: "Your appointment request has been sent.",
    });
  } catch (error) {
    if (error) {
      next(error);
    }
  }
};

module.exports = {
  appointments,
  bookAppointment,
};
