const express = require("express");
const router = express.Router();
const formController = require("../controllers/form.controller");
const auth = require("../middlewares/auth");

router.post("/", auth("ADMIN"), formController.create);
// router.post("/all", courseController.findAll);
// router.get("/:id", courseController.findOne);
// router.put("/:id", auth("ADMIN"), courseController.update);
// router.delete("/:id", auth("ADMIN"), courseController.delete);
// router.delete("/", auth("ADMIN"), courseController.deleteAll);

module.exports = router;
