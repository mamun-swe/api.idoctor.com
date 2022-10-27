const Admin = require("../../../models/Admin");
const bcrypt = require("bcryptjs");
const {
  httpSuccessResponse,
  httpErrorResponse,
} = require("../../utils/helper");

// Index of admin
const Index = async (req, res, next) => {
  try {
    const results = await Admin.find(
      {},
      { name: 1, email: 1, image: 1, role: 1 }
    );

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Admin list.",
        data: results,
      })
    );
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

// Create New Admin
const Store = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Find exist admin
    const existAdmin = await Admin.findOne({ email: email }).exec();
    if (existAdmin)
      return res.status(409).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Admin already created.",
          },
        })
      );

    // Password Hash
    const hashPassword = await bcrypt.hash(password, 10);

    // Create account object
    const newAdmin = new Admin({
      name: name,
      email: email,
      role: role,
      password: hashPassword,
    });

    // Save admin
    await newAdmin.save();

    res.status(201).json(
      await httpSuccessResponse({
        status: true,
        message: "Successfully account created",
      })
    );
  } catch (error) {
    if (error) {
      console.log(error);
      next(error);
    }
  }
};

module.exports = {
  Index,
  Store,
};
