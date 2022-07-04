const db = require("../models");
const Year = db.years;

exports.create = async (req, res) => {
  const year = req.body.year;
  if (!year) {
    res
      .status(400)
      .send({ success: false, message: "Ошибка при попытке создать год" });
    return;
  }
  try {
    const data = await Year.create({ year });
    res.status(200).send({
      success: true,
      data: {
        id: data.id,
        year: data.year,
      },
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, message: "Ошибка при попытке создать год" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const data = await Year.findAll({ attributes: ["id", "year"] });
    res.status(200).send({ success: true, data });
  } catch (e) {
    res.status(500).send({
      success: false,
      message:
        err.message ||
        'Произошла ошибка при попытке получить записи из таблицы "Года".',
    });
  }
};
