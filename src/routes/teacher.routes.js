const express = require("express");
const router = express.Router();
const teachersController = require("../controllers/teacher.controller");

router.post("/", teachersController.create);
router.get("/", teachersController.findAll);
router.get("/:id", teachersController.findOne);
router.put("/:id", teachersController.update);
router.delete("/:id", teachersController.delete);
router.delete("/", teachersController.deleteAll);

module.exports = router;
