const auth = require("./auth.validator");
const admin = require("./admin.validator");
const doctor = require("./doctor.validator");
const patient = require("./patient.validator");

const validators = {
  auth,
  admin,
  doctor,
  patient,
};

module.exports = { validators };
