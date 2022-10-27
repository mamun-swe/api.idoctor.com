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

module.exports = { scheduleAppointment };
