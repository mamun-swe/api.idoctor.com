const Patient = require("../../../models/Patient");
const {
  httpErrorResponse,
  httpSuccessResponse,
  comparePassword,
  encryptPassword,
  getJwtAccessToken,
} = require("../../utils/helper");

// Register Account
const Register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Patient Check
    const existAccount = await Patient.findOne({ email: email }).exec();
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
    let hashPassword = await encryptPassword(password);

    // Create account object
    let newAccount = new Patient({
      email: email,
      password: hashPassword,
    });

    // Save information
    await newAccount.save();

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

// Login Account
const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Account find using email
    const account = await Patient.findOne({ email }).exec();
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
          errors: { message: "Invalid e-mail or password" },
        })
      );
    }

    // Generate JWT token
    const token = await getJwtAccessToken({
      id: account._id,
      name: account.name,
      role: account.role,
    });

    res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Successfully loggeding.",
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
        message: "On development.",
        data: email,
      })
    );
  } catch (error) {
    if (error) next(error);
  }
};

module.exports = {
  Register,
  Login,
  Reset,
};
