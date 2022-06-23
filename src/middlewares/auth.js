const db = require("../models");
const { verify } = require("../utils/jwt");
const { wrap } = require("async-middleware");

const matchRole = (role, targetRole) => {
  return (
    (role === "USER" && targetRole === "USER") ||
    (role === "ADMIN" && (targetRole === "USER" || targetRole === "ADMIN"))
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
