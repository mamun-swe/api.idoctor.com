const Validator = require("validatorjs");

/* Store validator */
const store = async (req, res, next) => {
  const rules = {
    name: "required|string",
    email: "required|string|email",
    role: ["required", { in: ["super_admin", "admin", "manager"] }],
    password: "required|string|min:5",
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

/* Change status validator */
const changeDoctorStatus = async (req, res, next) => {
  const rules = {
    status: [
      "required",
      { in: ["approved", "pending", "submitted", "canceled"] },
    ],
  };

  const validate = new Validator({ ...req.params }, rules);

  if (validate.fails()) {
    return res.status(422).json({
      status: false,
      errors: validate.errors.all(),
    });
  }

  next();
};

module.exports = { store, changeDoctorStatus };
