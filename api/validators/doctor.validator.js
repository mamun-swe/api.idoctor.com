const Validator = require("validatorjs");

/* Approve appointment validator */
const scheduleAppointment = async (req, res, next) => {
  const rules = {
    day: "required|date",
    startTime: "required|string",
  };

  const validate = new Validator({ ...req.body }, rules);

  if (validate.fails()) {
    return res.status(422).json({
      status: false,
      errors: validate.errors.all(),
    });
  }

  next();
};

/* Profile update validator */
const updateProfile = async (req, res, next) => {
  const rules = {
    name: "required|string",
    college: "required|string",
    passingYear: "required|string",
    specialist: "required|string",
    currentHospital: "required|string",
    country: "required|string",
    city: "required|string",
    currentAddress: "required|string",
    latitude: "required|string",
    longitude: "required|string",
    day: "required|string",
    startTime: "required|string",
    endTime: "required|string",
  };

  const validate = new Validator({ ...req.body }, rules);

  if (validate.fails()) {
    return res.status(422).json({
      status: false,
      errors: validate.errors.all(),
    });
  }

  next();
};

module.exports = { scheduleAppointment };
