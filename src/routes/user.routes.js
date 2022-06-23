const express = require("express");
const router = express.Router();
const usersController = require("../controllers/user.controller");
const auth = require("../middlewares/auth");

router.post("/", auth("ADMIN"), usersController.create);
router.post("/all", usersController.findAll);
router.get("/:id", usersController.findOne);
router.put("/:id", auth("ADMIN"), usersController.update);
router.delete("/:id", auth("ADMIN"), usersController.delete);
router.delete("/", auth("ADMIN"), usersController.deleteAll);

module.exports = router;
