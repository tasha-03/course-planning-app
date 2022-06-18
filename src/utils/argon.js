const argon = require("argon2");

exports.hash = async (password) => {
  try {
    const hash = await argon.hash(password);
    return hash;
  } catch (err) {
    return false;
  }
};

exports.verify = async (password, hashedPassword) => {
  try {
    return await argon.verify(hashedPassword, password);
  } catch (err) {
    return false;
  }
};
