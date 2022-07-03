const express = require("express");
const router = express.Router();
const cathedraController = require("../controllers/cathedra.controller");
const auth = require("../middlewares/auth");

router.post("/", cathedraController.create);
// router.post("/all", courseController.findAll);
// router.get("/:id", courseController.findOne);
// router.put("/:id", auth("ADMIN"), courseController.update);
// router.delete("/:id", auth("ADMIN"), courseController.delete);
// router.delete("/", auth("ADMIN"), courseController.deleteAll);

module.exports = router;
