module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("Course", {
    number: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: Sequelize.DATEONLY,
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
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    annotation: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });
  return Course;
};
