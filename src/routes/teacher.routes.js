const express = require("express");
const router = express.Router();
const teachersController = require("../controllers/teacher.controller");
const auth = require("../middlewares/auth");

router.post("/", auth("ADMIN"), teachersController.create);
router.get("/", teachersController.findAll);
router.get("/:id", teachersController.findOne);
router.put("/:id", teachersController.update);
router.delete("/:id", teachersController.delete);
router.delete("/", teachersController.deleteAll);

module.exports = router;
