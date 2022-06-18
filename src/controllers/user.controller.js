const db = require("../models");
const { hash } = require("../utils/argon");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  const user = req.body;
  const password = await hash(user.password);
  if (!password) {
    res.send({
      success: false,
      message: "Ошибка при попытке создать пользователя",
    });
    return;
  }
  user.password = password;
  User.create(user);
  res.send({ success: true });
};
