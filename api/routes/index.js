const routers = require("express").Router();
const { authRouter } = require("../routes/auth");
const { adminRouter } = require("../routes/admin");
const { doctorRouter } = require("../routes/doctor");

routers.use("/auth", authRouter);
routers.use("/admin", adminRouter);
routers.use("/doctor", doctorRouter);

module.exports = { routers };
