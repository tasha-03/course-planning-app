const db = require("../models");

exports.create = async (req, res) => {
  const year = req.body.year;
  if (!year) {
    res
      .status(400)
      .send({ success: false, message: "Ошибка при попытке создать год" });
    return;
  }
  try {
    const data = await db.years.create({ year });
    res.status(200).send({
      success: true,
      data: {
        id: data.id,
        year: data.year,
      },
    });
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .send({ success: false, message: "Ошибка при попытке создать год" });
  }
};
