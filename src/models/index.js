const dbConfig = require("../config/db.config");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model")(sequelize, Sequelize);
db.cathedras = require("./cathedra.model")(sequelize, Sequelize);
db.sdos = require("./sdo.model")(sequelize, Sequelize);
db.years = require("./year.model")(sequelize, Sequelize);
db.forms = require("./form.model")(sequelize, Sequelize);
db.courses = require("./course.model")(sequelize, Sequelize);
db.listenersCategories = require("./listenersCategory.model")(
  sequelize,
  Sequelize
);

db.cathedras.hasMany(db.courses);
db.courses.belongsTo(db.cathedras);

db.cathedras.belongsToMany(db.users, {
  through: "CathedrasTeachers",
});
db.users.belongsToMany(db.cathedras, {
  through: "CathedrasTeachers",
});

db.courses.belongsToMany(db.users, {
  through: "CoursesTeachers",
});
db.users.belongsToMany(db.courses, {
  through: "CoursesTeachers",
});

db.courses.belongsToMany(db.listenersCategories, {
  through: "CoursesListenersCategories",
});
db.listenersCategories.belongsToMany(db.courses, {
  through: "CoursesListenersCategories",
});

db.sdos.hasMany(db.courses);
db.courses.belongsTo(db.sdos);

db.courses.belongsTo(db.years, { as: "Utp" });
db.courses.belongsTo(db.years, { as: "Rp" });

db.forms.hasMany(db.courses);
db.courses.belongsTo(db.forms);

module.exports = db;
