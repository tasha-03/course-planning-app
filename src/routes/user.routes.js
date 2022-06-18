const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

router.post("/", usersController.create);

module.exports = router;
