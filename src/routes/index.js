const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const usersRouter = require("./user.routes");
const authRouter = require("./auth.routes");
const coursesRouter = require("./course.routes");
const cathedrasRouter = require("./cathedra.routes");
const sdosRouter = require("./sdo.routes");
const yearsRouter = require("./year.routes");
const formsRouter = require("./form.routes");
const listenersCategoriesRouter = require("./listenersCategory.routes");

router.use("/users", auth("VIEWER"), usersRouter);
router.use("/auth", authRouter);
router.use("/courses", auth("VIEWER"), coursesRouter);
router.use("/cathedras", auth("VIEWER"), cathedrasRouter);
router.use("/sdos", sdosRouter);
router.use("/years", yearsRouter);
router.use("/forms", formsRouter);
router.use("/listenersCategories", listenersCategoriesRouter);

module.exports = router;
