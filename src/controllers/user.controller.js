const db = require("../models");
const { hash } = require("../utils/argon");
const { courses } = require("../utils/searchConditions");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const { username, email, name, password, role, CathedraId } = req.body;
  if (!username || !name || !email || !password || !CathedraId) {
    res.send({
      success: false,
      message: "Ошибка при попытке создать пользователя",
    });
    return;
  }
  try {
    const hpassword = await hash(password);
    if (!hpassword) {
      res.send({
        success: false,
        message: "Ошибка при попытке создать пользователя",
      });
      return;
    }
    const npassword = hpassword;
    const data = await User.create({
      username,
      email,
      name,
      password: npassword,
      role,
      CathedraId,
    });
    res.send({
      success: true,
      data: {
        id: data.id,
        username: data.username,
        email: data.email,
        name: data.name,
        role: data.role,
        CathedraId: data.CathedraId,
      },
    });
  } catch (err) {
    res.send({
      success: false,
      message: "Ошибка при попытке создать пользователя",
    });
  }
};

exports.findAll = (req, res) => {
  const { limit = 20, page = 1 } = req.query;
  const name = req.body.name;
  const cathedraName = req.body.cathedraName;
  let nameCondition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  let cathedraNameCondition = cathedraName
    ? { name: { [Op.iLike]: `%${cathedraName}%` } }
    : null;
  User.findAll({
    where: nameCondition,
    attributes: ["id", "name"],
    include: [
      {
        model: db.courses,
        attributes: [
          "id",
          "name",
          "startDate",
          "endDate",
          "hours",
          "capacity",
          "groupNumber",
          "annotation",
        ],
        include: [
          {
            model: db.sdos,
            attributes: ["id", "name"],
          },
          {
            model: db.years,
            as: "Utp",
            attributes: ["id", "year"],
          },
          {
            model: db.years,
            as: "Rp",
            attributes: ["id", "year"],
          },
          {
            model: db.forms,
            attributes: ["id", "name"],
          },
          {
            model: db.listenersCategories,
            attributes: ["id", "name"],
            through: {
              attributes: [],
            },
          },
        ],
        through: {
          attributes: [],
        },
      },
      {
        model: db.cathedras,
        attributes: ["id", "name"],
        where: cathedraNameCondition,
      },
    ],
    order: [["name", "ASC"]],
    limit: limit,
    offset: (page - 1) * limit,
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
    include: [
      {
        model: db.courses,
        attributes: [
          "id",
          "name",
          "startDate",
          "endDate",
          "hours",
          "capacity",
          "groupNumber",
          "annotation",
        ],
        include: [
          {
            model: db.sdos,
            attributes: ["id", "name"],
          },
          {
            model: db.years,
            as: "Utp",
            attributes: ["id", "year"],
          },
          {
            model: db.years,
            as: "Rp",
            attributes: ["id", "year"],
          },
          {
            model: db.forms,
            attributes: ["id", "name"],
          },
          {
            model: db.listenersCategories,
            attributes: ["id", "name"],
          },
        ],
      },
      {
        model: db.cathedras,
        attributes: ["id", "name"],
      },
    ],
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
  const { username, email, name, CathedraId } = req.body;
  User.update({ username, email, name, CathedraId }, { where: { id: id } })
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
