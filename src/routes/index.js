const express = require("express");
const router = express.Router();

const teachersRouter = require("./teacher.routes");

router.use("/teachers", teachersRouter);

module.exports = router;
