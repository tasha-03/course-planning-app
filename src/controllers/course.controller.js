const { users } = require("../models");
const db = require("../models");
const Course = db.courses;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const course = req.body;
  if (
    !course.number ||
    !course.name ||
    !course.plannedDates ||
    !course.hours ||
    !course.capacity ||
    !course.groupNumber ||
    !course.listenersCategory ||
    !course.annotation
  ) {
    res.send({
      success: false,
      message: "Ошибка при попытке создать курс",
    });
    return;
  }
  Course.create(course)
    .then((data) => res.send({ success: true, data }))
    .catch((err) => {
      res.send({
        success: false,
        message: "Ошибка при попытке создать курс",
      });
      console.log(err);
    });
};

exports.findAll = (req, res) => {
  const search = req.body.name;
  var condition = search
    ? {
        [Op.or]: [
          { number: { [Op.iLike]: `%${search}%` } },
          { name: { [Op.iLike]: `%${search}%` } },
          { sdo: { [Op.iLike]: `%${search}%` } },
          { utp: { [Op.iLike]: `%${search}%` } },
          { rp: { [Op.iLike]: `%${search}%` } },
          { plannedDates: { [Op.iLike]: `%${search}%` } },
          { hours: { [Op.iLike]: `%${search}%` } },
          { capacity: { [Op.iLike]: `%${search}%` } },
          { groupNumber: { [Op.iLike]: `%${search}%` } },
          { form: { [Op.iLike]: `%${search}%` } },
          { listenersCategory: { [Op.iLike]: `%${search}%` } },
          { annotation: { [Op.iLike]: `%${search}%` } },
        ],
      }
    : null;
  Course.findAll({
    where: condition,
    include: users,
  })
    .then((data) => res.send({ success: true, data: data }))
    .catch((err) =>
      res.status(500).send({
        success: false,
        message:
          err.message ||
          'Произошла ошибка при попытке получить записи из таблицы "Курсы".',
      })
    );
};
