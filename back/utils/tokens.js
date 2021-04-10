const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = {
  generateToken: async function (pseudo) {
    const token = await jwt.sign({ pseudo }, config.secret, { expiresIn: 7200000 });
    return token;
  },

  generateVerifToken: async function (pseudo, usage, time) {
    const token = await jwt.sign({pseudo, usage}, config.secretVerif, { expiresIn: time});
    return token;
  }
}