const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const usersRouter = require("./user.routes");
const authRouter = require("./auth.routes");
const coursesRouter = require("./course.routes");

router.use("/users", auth("USER"), usersRouter);
router.use("/auth", authRouter);
router.use("/courses", auth("USER"), coursesRouter);

module.exports = router;
