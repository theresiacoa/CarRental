const bcrypt = require('bcrypt');
const saltRounds = 10;

function generateHash(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds)
      .then(function (hash) {
        resolve(hash)
      })
      .catch(err => {
        reject(err)
      })
  });
}

module.exports = generateHash;

