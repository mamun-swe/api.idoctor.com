const Validator = require("validatorjs");

/* profile info update validator */
const updateProfileInfo = async (req, res, next) => {
  const rules = {
    name: "required|string",
    age: "required|string",
    height: "required|string",
    weight: "required|string",
    bloodPressure: "required|string",
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

/* profile image update validator */
const updateProfileImage = async (req, res, next) => {
  const rules = {
    image: "required",
  };

  const validate = new Validator({ ...req.files }, rules);

  if (validate.fails()) {
    return res.status(422).json({
      status: false,
      errors: validate.errors.all(),
    });
  }

  next();
};

/* book appointment validator */
const bookAppointment = async (req, res, next) => {
  const rules = {
    doctorId: "required|string",
    name: "required|string",
    phone: "required|string",
    age: "required|string",
    height: "required|string",
    weight: "required|string",
    bloodPressure: "required|string",
    problemShortInfo: "required|string",
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

module.exports = { updateProfileInfo, updateProfileImage, bookAppointment };
