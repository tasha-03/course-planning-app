module.exports = (sequelize, Sequelize) => {
  const Year = sequelize.define("Year", {
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: "Значение не должно быть нулевым.",
        },
        isYear(value) {
          if (value < 1970 || value > 2999) {
            throw new Error(
              "Значение должно быть годом в интервале от 1970 до 2999."
            );
          }
        },
      },
    },
  });
  return Year;
};
