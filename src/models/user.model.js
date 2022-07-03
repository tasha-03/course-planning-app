module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    username: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: "Логин не должен быть пустым.",
        },
        notEmpty: {
          args: true,
          msg: "Логин не должен быть пустым.",
        },
        len: {
          args: [1, 50],
          msg: "Логин не должен превышать 50 символов.",
        },
      },
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false,
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
          args: [1, 100],
          msg: "Имя не должно превышать 100 символов.",
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Данное значение не является адресом электронной почты.",
        },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM(["ADMIN", "EDITOR", "VIEWER"]),
      allowNull: false,
      defaultValue: "VIEWER",
    },
  });
  return User;
};
