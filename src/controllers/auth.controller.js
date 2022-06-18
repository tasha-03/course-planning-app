const db = require("../models");
const { verify } = require("../utils/argon");
const { sign } = require("../utils/jwt");
const { wrap } = require("async-middleware");
const User = db.users;

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username: username } });
    console.log(user);
    if (!verify(password, user.password)) {
      console.log("1");
      res.send({ success: false, message: "Неверные данные" });
      return;
    } else {
      res.send({
        success: true,
        accessToken: sign({
          id: user.id,
          username: user.username,
          role: user.role,
          name: user.name,
        }),
      });
    }
  } catch (err) {
    console.log("2");
    res.send({ success: false, message: "Неверные данные" });
    return;
  }
};
