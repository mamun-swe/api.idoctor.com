const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Mongoose = require("mongoose");
const JWT_SECRET = process.env.JWT_SECRET;

/* Generate JWT token */
const getJwtAccessToken = async ({ id, name, role }) => {
  return await jwt.sign({ id, name, role }, `${JWT_SECRET}`, {
    expiresIn: "1d",
  });
};

/* Verify JWT token */
const verifyJwtAccessToken = async (token) => {
  return await jwt.verify(token, `${JWT_SECRET}`);
};

/* Password encryption */
const encryptPassword = async (data) => {
  return await bcrypt.hash(data, 10);
};

/* Compare passwords */
const comparePassword = async ({ plainPassword, hashPassword }) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};

/* Valid mongoose ID */
const validMongooseId = (id) => {
  return Mongoose.Types.ObjectId.isValid(id);
};

/* Valid email */
const validEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

/* HTTP error response handeller */
const httpErrorResponse = async ({ status, errors }) => {
  return {
    status,
    errors,
  };
};

/* HTTP success response handeller */
const httpSuccessResponse = async ({ status, message, data, token }) => {
  let responstType = {};
  responstType.status = status;
  responstType.message = message;
  responstType.data = data;

  if (token) responstType.token = token;

  return { ...responstType };
};

module.exports = {
  getJwtAccessToken,
  verifyJwtAccessToken,
  encryptPassword,
  comparePassword,
  validMongooseId,
  validEmail,
  httpErrorResponse,
  httpSuccessResponse,
};
