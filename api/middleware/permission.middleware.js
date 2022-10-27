const { verifyJwtAccessToken, httpErrorResponse } = require("../utils/helper");

// Patient permission
const patient = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;
    if (!token) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Token not found.",
          },
        })
      );
    }

    // decode token
    const splitToken = await req.headers.authorization.split(" ")[1];
    const decode = await verifyJwtAccessToken(splitToken);

    // check role
    if (decode.role !== "patient") {
      return res.status(401).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "You have no permissions to access",
          },
        })
      );
    }

    req.user = {
      id: decode.id,
      name: decode.name,
      role: decode.role,
    };
    next();
  } catch (error) {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(410).json(
          await httpErrorResponse({
            status: false,
            errors: {
              message: "Token expired",
            },
          })
        );
      }

      return res.status(501).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "unauthorized request",
          },
        })
      );
    }
  }
};

// Doctor permission
const doctor = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;
    if (!token) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Token not found.",
          },
        })
      );
    }

    // decode token
    const splitToken = await req.headers.authorization.split(" ")[1];
    const decode = await verifyJwtAccessToken(splitToken);

    // check role
    if (decode.role !== "doctor") {
      return res.status(401).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "You have no permissions to access",
          },
        })
      );
    }

    req.user = {
      id: decode.id,
      name: decode.name,
      role: decode.role,
    };
    next();
  } catch (error) {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(410).json(
          await httpErrorResponse({
            status: false,
            errors: {
              message: "Token expired",
            },
          })
        );
      }

      return res.status(501).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "unauthorized request",
          },
        })
      );
    }
  }
};

// Admin permission
const admin = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;
    if (!token) {
      return res.status(404).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "Token not found.",
          },
        })
      );
    }

    // decode token
    const splitToken = await req.headers.authorization.split(" ")[1];
    const decode = await verifyJwtAccessToken(splitToken);

    // check role
    if (decode.role !== "super_admin") {
      return res.status(401).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "You have no permissions to access",
          },
        })
      );
    }

    req.user = {
      id: decode.id,
      name: decode.name,
      role: decode.role,
    };
    next();
  } catch (error) {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(410).json(
          await httpErrorResponse({
            status: false,
            errors: {
              message: "Token expired",
            },
          })
        );
      }

      return res.status(501).json(
        await httpErrorResponse({
          status: false,
          errors: {
            message: "unauthorized request",
          },
        })
      );
    }
  }
};

module.exports = {
  patient,
  doctor,
  admin,
};
