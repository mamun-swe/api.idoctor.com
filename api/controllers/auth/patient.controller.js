const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Patient = require("../../../models/Patient");

// Register Account
const Register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Patient Check
    const existAccount = await Patient.findOne({ email: email }).exec();
    if (existAccount)
      return res.status(409).json({
        status: false,
        message: "This email already used.",
      });

    // Password Hash
    let hashPassword = await bcrypt.hash(password, 10);

    // Create account object
    let newAccount = new Patient({
      email: email,
      role: role,
      password: hashPassword,
    });

    // Save information
    await newAccount.save();

    res.status(201).json({
      status: true,
      message: "Successfully account created",
    });
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

// Login Account
const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Account find using email
    let account = await Patient.findOne({ email }).exec();
    if (!account) {
      return res.status(404).json({
        status: false,
        message: "Invalid e-mail or password",
      });
    }

    // Compare with password

    const result = await bcrypt.compare(password, account.password);
    if (!result) {
      return res.status(404).json({
        status: false,
        message: "Invalid e-mail or password",
      });
    }

    // Generate JWT token
    const token = await jwt.sign(
      { id: account._id, name: account.name, role: account.role },
      "SECRET",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      status: true,
      token: token,
    });
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

// Reset Password
const Reset = async (req, res, next) => {
  try {
    const { email } = req.body;

    return res.status(200).json({
      status: true,
      message: "Under development.",
    });
  } catch (error) {
    if (error) next(error);
  }
};

module.exports = {
  Register,
  Login,
  Reset,
};
