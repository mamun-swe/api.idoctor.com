const Admin = require("../../../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Login to account
const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Account find using email
    let account = await Admin.findOne({ email }).exec();

    // Compare with password
    if (account) {
      const result = await bcrypt.compare(password, account.password);
      if (result) {
        // Generate JWT token
        const token = await jwt.sign(
          { id: account._id, name: account.name, role: account.role },
          "SECRET",
          { expiresIn: "1d" }
        );

        // Update JWT token
        const updateToken = await Admin.findOneAndUpdate(
          { _id: account._id },
          { $set: { access_token: token, status: "online" } },
          { new: true }
        ).exec();

        if (updateToken) {
          return res.status(200).json({
            status: true,
            token,
          });
        }
        return res.status(404).json({
          status: false,
          message: "Invalid e-mail or password",
        });
      }
      return res.status(404).json({
        status: false,
        message: "Invalid e-mail or password",
      });
    }
  } catch (error) {
    if (error) next(error);
  }
};

module.exports = {
  Login,
};
