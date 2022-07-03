const db = require("../models");
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const name = req.body.name;
  if (!name) {
    res
      .status(400)
      .send({ success: false, message: "Ошибка при попытке создать кафедру" });
    return;
  }
  try {
    const data = await db.cathedras.create({ name });
    res.status(200).send({ success: true, data });
  } catch (err) {
    res
      .status(500)
      .send({ success: false, message: "Ошибка при попытке создать кафедру" });
  }
};

exports.findAll = async (req, res) => {
  const name = req.body.name;
  let condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  try {
    const data = await db.cathedras.findAll({ where: condition });
  } catch (err) {
    res
      .status(500)
      .send({
        success: false,
        message:
          'Произошла ошибка при попытке получить записи из таблицы "Кафедры".',
      });
  }
};
