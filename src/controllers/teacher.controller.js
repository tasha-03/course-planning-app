const db = require("../models");
const Teacher = db.teachers;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Необходимо ввести значение.",
    });
    return;
  }

  const teacher = {
    name: req.body.name,
  };

  Teacher.create(teacher)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Произошла ошибка при попытке создать запись в таблицу "Преподаватели".',
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.body.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Teacher.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Произошла ошибка при попытке получить записи из таблицы "Преподаватели".',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Teacher.findByPk(id)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Произошла ошибка при попытке получить запись из таблицы "Преподаватели".',
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Teacher.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Запись обновлена успешно.",
        });
      } else {
        res.send({
          message: `Невозможно обновить запись с id=${id}. Возможно, запись не найдена.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Произошла ошибка при попытке обновить запись с id=${id} в таблице "Преподаватели".`,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Teacher.delete({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Запись обновлена успешно.",
        });
      } else {
        res.send({
          message: `Невозможно удалить запись с id=${id}. Возможно, запись не найдена.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `Произошла ошибка при попытке удалить запись с id=${id} в таблице "Преподаватели".`,
      });
    });
};

exports.deleteAll = (req, res) => {
  Teacher.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} записей были удалены.`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Произошла ошибка при попытке удалить все записи из таблицы "Преподаватели".',
      });
    });
};
