module.exports = (sequelize, Sequelize) => {
  const Sdo = sequelize.define("Sdo", {
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: "Имя не должно быть пустым.",
        },
        notEmpty: {
          args: true,
          msg: "Имя не должно быть пустым.",
        },
        len: {
          args: [1, 20],
          msg: "Имя не должно превышать 20 символов.",
        },
      },
    },
  });
  return Sdo;
};
