const express = require("express");
const router = express.Router();

const teachersRouter = require("./teacher.routes");
const usersRouter = require("./user.routes");
const authRouter = require("./auth.routes");

router.use("/teachers", teachersRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);

module.exports = router;
