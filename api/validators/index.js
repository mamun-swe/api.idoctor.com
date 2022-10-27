const auth = require("./auth.validator");
const admin = require("./admin.validator");

const validators = {
  auth,
  admin,
};

module.exports = { validators };
