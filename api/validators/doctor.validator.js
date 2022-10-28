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

/* Profile update step two validator */
const updateProfileStepTwo = async (req, res, next) => {
  const rules = {
    name: "required|string",
    image: "required",
  };

  const validate = new Validator({ ...req.body, ...req.files }, rules);
  if (validate.fails()) {
    return res.status(422).json({
      status: false,
      errors: validate.errors.all(),
    });
  }

  next();
};

/* Profile update step three validator */
const updateProfileStepThree = async (req, res, next) => {
  const rules = {
    college: "required|string",
    passingYear: "required|string",
    specialist: "required|string",
    currentHospital: "required|string",
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

/* Profile update step four validator */
const updateProfileStepFour = async (req, res, next) => {
  const rules = {
    country: "required|string",
    city: "required|string",
    currentAddress: "required|string",
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

/* Profile update step five validator */
const updateProfileStepFive = async (req, res, next) => {
  const rules = {
    latitude: "required|string",
    longitude: "required|string",
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

/* Profile update step six validator */
const updateProfileStepSix = async (req, res, next) => {
  const rules = {
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

module.exports = {
  scheduleAppointment,
  updateProfileStepTwo,
  updateProfileStepThree,
  updateProfileStepFour,
  updateProfileStepFive,
  updateProfileStepSix,
};
