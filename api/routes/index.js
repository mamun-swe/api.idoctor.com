const routers = require("express").Router();
const { admin } = require("../middleware/permission.middleware");
const { authRouter } = require("../routes/auth");
const { adminRouter } = require("../routes/admin");
const { doctorRouter } = require("../routes/doctor");
const { publicRouter } = require("../routes/public");

routers.use("/auth", authRouter);
routers.use("/admin", admin, adminRouter);
routers.use("/doctor", doctorRouter);
routers.use("/public", publicRouter);

module.exports = { routers };
