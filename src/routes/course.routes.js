const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course.controller");
const auth = require("../middlewares/auth");

router.post("/", auth("ADMIN"), courseController.create);
router.post("/all", courseController.findAll);
// router.get("/:id", courseController.findOne);
// router.put("/:id", auth("ADMIN"), courseController.update);
// router.delete("/:id", auth("ADMIN"), courseController.delete);
// router.delete("/", auth("ADMIN"), courseController.deleteAll);

module.exports = router;
