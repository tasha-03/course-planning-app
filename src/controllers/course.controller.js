const db = require("../models");
const { courses } = require("../utils/searchConditions");
const Course = db.courses;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const course = req.body || {};
  if (
    !course.number ||
    !course.name ||
    !course.startDate ||
    !course.endDate ||
    !course.hours ||
    !course.capacity ||
    !course.groupNumber ||
    !course.annotation ||
    !course.SdoId ||
    !course.UtpId ||
    !course.RpId ||
    !course.FormId ||
    (course.Users && course.Users.length === 0) ||
    (course.ListenersCategories && course.ListenersCategories.length === 0)
  ) {
    res.send({
      success: false,
      message: "Ошибка при попытке создать курс 1",
    });
    return;
  }
  try {
    const data = await Course.create({
      number: course.number,
      name: course.name,
      startDate: course.startDate,
      endDate: course.endDate,
      hours: course.hours,
      capacity: course.capacity,
      groupNumber: course.groupNumber,
      annotation: course.annotation,
      SdoId: course.SdoId,
      UtpId: course.UtpId,
      RpId: course.RpId,
      FormId: course.FormId,
    });
    data.addUsers(course.Users);
    data.addListenersCategories(course.ListenersCategories);
    res.send({ success: true, data });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Ошибка при попытке создать курс",
    });
    console.log(err);
  }
};

exports.findAll = (req, res) => {
  const search = req.body;
  var condition = courses(search);
  Course.findAll(condition)
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

exports.findOne = async (req, res) => {
  return;
};
