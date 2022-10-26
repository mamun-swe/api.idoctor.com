const jwt = require("jsonwebtoken");
const Patient = require("../../models/Patient");
const Doctor = require("../../models/Doctor");

// Patient permission
const patient = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;
    if (!token) return res.status(404).json({ message: "Token not found" });

    // decode token
    const splitToken = await req.headers.authorization.split(" ")[1];
    const decode = await jwt.verify(splitToken, "SECRET");

    // find user using token
    const user = await Patient.findOne(
      { $and: [{ _id: decode.id }, { access_token: splitToken }] },
      { role: "patient" }
    ).exec();
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // check role
    if (user.role === "patient") {
      next();
    } else {
      return res
        .status(401)
        .json({ message: "You have no permissions to access" });
    }
  } catch (error) {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(410).json({ message: "Token expired" });
      }
      return res.status(501).json({ message: "unauthorized request" });
    }
  }
};

// Doctor permission
const doctor = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;
    if (!token) return res.status(404).json({ message: "Token not found" });

    // decode token
    const splitToken = await req.headers.authorization.split(" ")[1];
    const decode = await jwt.verify(splitToken, "SECRET");

    // find doctor using token
    const doctor = await Doctor.findOne(
      { $and: [{ _id: decode.id }, { access_token: splitToken }] },
      { role: "doctor" }
    ).exec();
    if (!doctor) return res.status(401).json({ message: "Invalid token" });

    // check role
    if (doctor.role === "doctor") next();
    else
      return res
        .status(401)
        .json({ message: "You have no permissions to access" });
  } catch (error) {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(410).json({ message: "Token expired" });
      }
      return res.status(501).json({ message: "unauthorized request" });
    }
  }
};

// Admin permission
const admin = async (req, res, next) => {
  try {
    const token = await req.headers.authorization;
    if (!token) {
      return res.status(404).json({
        status: false,
        message: "Token not found",
      });
    }

    // decode token
    const splitToken = await req.headers.authorization.split(" ")[1];
    const decode = await jwt.verify(splitToken, "SECRET");

    // check role
    if (decode.role !== "doctor") {
      return res.status(401).json({
        status: false,
        message: "You have no permissions to access",
      });
    }

    next();
  } catch (error) {
    if (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(410).json({ message: "Token expired" });
      }
      return res.status(501).json({ message: "unauthorized request" });
    }
  }
};

module.exports = {
  patient,
  doctor,
  admin,
};