const { ENUM } = require("sequelize");
const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("course", {
    number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sdo: {
      type: ENUM({ values: ["OCHNO", "MOODLE", "SEDO", "CISCO", "OTHER"] }),
      allowNull: false,
      defaultValue: "OCHNO",
    },
    utp: { type: ENUM({ values: ["2022", "2023", "2024", "2025"] }) },
    rp: { type: ENUM({ values: ["2022", "2023", "2024", "2025"] }) },
    plannedDates: {
      field: "planned_dates",
      type: Sequelize.TEXT,
      allowNull: false,
    },
    hours: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    capacity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    groupNumber: {
      field: "group_number",
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    form: {
      type: ENUM({ values: ["OCHNO", "OCHNO_DIST", "DIST"] }),
      allowNull: false,
      defaultValue: "OCHNO",
    },
    listenersCategory: {
      field: "listeners_category",
      type: Sequelize.TEXT,
      allowNull: false,
    },
    annotation: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });
  return Course;
};
