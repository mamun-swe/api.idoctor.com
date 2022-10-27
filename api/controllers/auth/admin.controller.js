const Admin = require("../../../models/Admin");
const {
  getJwtAccessToken,
  comparePassword,
  httpErrorResponse,
  httpSuccessResponse,
} = require("../../utils/helper");

// Login to account
const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    /* Account find using email */
    const availableAccount = await Admin.findOne({ email });
    if (!availableAccount) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Invalid e-mail or password",
          },
        })
      );
    }

    /* Compare with password */
    const passwordMatches = await comparePassword({
      plainPassword: password,
      hashPassword: availableAccount.password,
    });

    if (!passwordMatches) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Invalid e-mail or password",
          },
        })
      );
    }

    /* Generate jwt token */
    const token = await getJwtAccessToken({
      id: availableAccount._id,
      name: availableAccount.name,
      role: availableAccount.role,
    });

    return res.status(200).json(
      await httpSuccessResponse({
        status: true,
        message: "Succesfully loggedin.",
        token,
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
  Login,
};
