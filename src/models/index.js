const dbConfig = require("../config/db.config");
const {Sequelize} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("./user.model")(sequelize, Sequelize);
db.courses = require("./course.model")(sequelize, Sequelize);
db.schedules = require("./schedule.model")(sequelize, Sequelize);

db.courses.hasMany(db.schedules, { as: "schedules" });
db.schedules.belongsTo(db.courses, { foreignKey: "course_id", as: "course" });
db.courses.belongsToMany(db.users, {through: "courses_users" });
db.users.belongsToMany(db.courses, {through: "courses_users" });

module.exports = db;
