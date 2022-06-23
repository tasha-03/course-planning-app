const { courses } = require("../models");
const db = require("../models");
const { hash } = require("../utils/argon");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const user = req.body;
  if (!user.username || !user.name || !user.email || !user.password) {
    res.send({
      success: false,
      message: "Ошибка при попытке создать пользователя",
    });
    return;
  }
  try {
    const password = await hash(user.password);
    if (!password) {
      res.send({
        success: false,
        message: "Ошибка при попытке создать пользователя",
      });
      return;
    }
    user.password = password;
    const data = await User.create(user);
    res.send({ success: true, data });
  } catch (err) {
    res.send({
      success: false,
      message: "Ошибка при попытке создать пользователя",
    });
    return;
  }
};

exports.findAll = (req, res) => {
  name = req.body.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  User.findAll({
    where: condition,
    attributes: ["id", "name"],
    include: courses,
  })
    .then((data) => res.send({ success: true, data: data }))
    .catch((err) =>
      res.status(500).send({
        success: false,
        message:
          err.message ||
          'Произошла ошибка при попытке получить записи из таблицы "Пользователи".',
      })
    );
};

exports.findOne = (req, res) => {
  id = req.params.id;
  User.findOne({
    where: { id: id },
    attributes: ["id", "name"],
    include: courses,
  })
    .then((data) => res.send({ success: true, data: data }))
    .catch((err) =>
      res.status(500).send({
        success: false,
        message:
          err.message ||
          'Произошла ошибка при попытке получить запись из таблицы "Пользователи".',
      })
    );
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const { username, email, name } = req.body;
  User.update({ username, email, name }, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ success: true, message: "Запись обновлена успешно." });
      } else {
        res.send({
          success: false,
          message: `Невозможно обновить запись с id=${id}. Возможно, запись не найдена.`,
        });
      }
    })
    .catch((err) =>
      res.status(500).send({
        success: false,
        message:
          err.message ||
          `Произошла ошибка при попытке обновить запись с id=${id} в таблице "Пользователи".`,
      })
    );
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          success: true,
          message: "Запись удалена успешно.",
        });
      } else {
        res.send({
          success: false,
          message: `Невозможно удалить запись с id=${id}. Возможно, запись не найдена.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message ||
          `Произошла ошибка при попытке удалить запись с id=${id} в таблице "Пользователи".`,
      });
    });
};

exports.deleteAll = (req, res) => {
  User.destroy({ where: { role: "USER" }, truncate: false })
    .then((nums) => {
      res.send({
        success: true,
        message: `${nums} записей были удалены.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message:
          err.message ||
          'Произошла ошибка при попытке удалить все записи из таблицы "Пользователи".',
      });
    });
};
