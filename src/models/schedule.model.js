const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("schedule", {
    courseId: {
      name: "course_id",
      type: Sequelize.INTEGER,
    },
    startDate: {
      name: "start_date",
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDate: {
      name: "end_date",
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
  return Schedule;
};
