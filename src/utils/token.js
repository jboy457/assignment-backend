const jwt = require('jsonwebtoken');
const { auth } = require('../config').env;

module.exports = {
  signJWT: async (data, time = '1d') => {
    const secret = auth.jwt_secret;
    return jwt.sign(data, secret, { expiresIn: time });
  },

  verifyJWT: async (token) => {
    const key = auth.jwt_secret;
    const decode = jwt.verify(token, key, (err, decoded) => {
      if (err) {
        return err;
      }
      return decoded;
    });
    return decode;
  }
};
