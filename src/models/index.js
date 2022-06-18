const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.teachers = require("./teacher.model")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize, Sequelize);
db.courses = require("./course.model")(sequelize, Sequelize);
db.schedules = require("./schedule.model")(sequelize, Sequelize);

db.courses.hasMany(db.schedules, { as: "schedules" });
db.schedules.belongsTo(db.courses, { foreignKey: "course_id", as: "course" });

module.exports = db;
