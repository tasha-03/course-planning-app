const db = require("../models");

exports.create = async (req, res) => {
  const name = req.body.name;
  if (!name) {
    res
      .status(400)
      .send({ success: false, message: "Ошибка при попытке создать форму проведения" });
    return;
  }
  try {
    const data = await db.forms.create({ name });
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
      .send({ success: false, message: "Ошибка при попытке создать форму проведения" });
  }
};
