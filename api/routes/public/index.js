const publicRouter = require("express").Router();
const publicController = require("../../controllers/public/public.controller");

publicRouter.get("/doctors", publicController.doctors);

module.exports = { publicRouter };
