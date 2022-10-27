const Doctor = require("../../../models/Doctor");
const {
  httpErrorResponse,
  httpSuccessResponse,
  encryptPassword,
  comparePassword,
  getJwtAccessToken,
} = require("../../utils/helper");

// Register Account
const Register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Doctor Check
    const existAccount = await Doctor.findOne({ email: email });
    if (existAccount)
      return res.status(409).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "This email already used.",
          },
        })
      );

    // Password Hash
    const hashPassword = await encryptPassword(password);

    // Create account object
    const newAccount = new Doctor({
      email: email,
      password: hashPassword,
    });

    // Save information
    await newAccount.save();

    res.status(201).json(
      await httpSuccessResponse({
        status: true,
        message: "Account created.",
      })
    );
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
    let account = await Doctor.findOne({ email });
    if (!account) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Invalid e-mail or password",
          },
        })
      );
    }

    // Compare with password
    const result = await comparePassword({
      plainPassword: password,
      hashPassword: account.password,
    });
    if (!result) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Invalid e-mail or password",
          },
        })
      );
    }

    // Generate JWT token
    const token = await getJwtAccessToken({
      id: account._id,
      name: account.name,
      role: account.role,
    });

    return res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Successfully loggedin.",
        token: token,
      })
    );
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

    return res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Under development.",
        data: email,
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
  Register,
  Login,
  Reset,
};
