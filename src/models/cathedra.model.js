module.exports = (sequelize, Sequelize) => {
  const Cathedra = sequelize.define("Cathedra", {
    name: {
      type: Sequelize.STRING(500),
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
          args: [1, 500],
          msg: "Имя не должно превышать 500 символов.",
        },
      },
    },
  });
  return Cathedra;
};
