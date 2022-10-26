const Validator = require("validatorjs");

/* Login validator */
const login = async (req, res, next) => {
  const rules = {
    email: "required|email",
    password: "required|min:5",
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

module.exports = { login };
