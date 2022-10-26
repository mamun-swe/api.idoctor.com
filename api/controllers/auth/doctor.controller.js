const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Doctor = require("../../../models/Doctor");

// Register Account
const Register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Doctor Check
    const existAccount = await Doctor.findOne({ email: email }).exec();
    if (existAccount)
      return res.status(409).json({
        status: false,
        message: "This email already used.",
      });

    // Password Hash
    const hashPassword = await bcrypt.hash(password, 10);

    // Create account object
    const newAccount = new Doctor({
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
    let account = await Doctor.findOne({ email }).exec();
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

    return res.status(200).json({
      status: true,
      token,
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
