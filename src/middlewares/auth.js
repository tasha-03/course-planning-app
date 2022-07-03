const db = require("../models");
const { verify } = require("../utils/jwt");
const { wrap } = require("async-middleware");

const matchRole = (role, targetRole) => {
  return (
    (role === "VIEWER" && targetRole === "VIEWER") ||
    (role === "EDITOR" &&
      (targetRole === "VIEWER" || targetRole === "EDITOR")) ||
    (role === "ADMIN" &&
      (targetRole === "VIEWER" ||
        targetRole === "EDITOR" ||
        targetRole === "ADMIN"))
  );
};

const auth = (targetRole) =>
  wrap(async (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = (authHeader.match(/^Bearer\s*(.*)$/) || [])[0].split(" ")[1];

    const user = verify(token);

    const result = await db.users.findByPk(user.id);

    if (!matchRole(result.role, targetRole)) {
      res.send({ success: false, message: "Доступ запрещен" });
      return;
    }

    req.user = result;
    next();
  });

module.exports = auth;
