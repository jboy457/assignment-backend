const bcrypt = require('bcrypt');

module.exports = {
  hash: async (value) => {
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(value, salt);
    return hashed;
  },

  compare: async (password, hash) => {
    const result = bcrypt.compare(password, hash);
    return result;
  }
};
