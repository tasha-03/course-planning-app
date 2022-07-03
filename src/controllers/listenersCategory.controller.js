const db = require("../models");

exports.create = async (req, res) => {
  const name = req.body.name;
  if (!name) {
    res
      .status(400)
      .send({ success: false, message: "Ошибка при попытке создать категорию слушателей" });
    return;
  }
  try {
    const data = await db.listenersCategories.create({ name });
    res.status(200).send({
      success: true,
      data: {
        id: data.id,
        name: data.name,
      },
    });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Ошибка при попытке создать категорию слушателей" });
  }
};
