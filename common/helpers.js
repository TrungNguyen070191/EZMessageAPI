var bcrypt = require('bcrypt');

var helpers = {
    comparePassword: function (password, hash_password) {
        return bcrypt.compareSync(password, hash_password);
    }
};

module.exports = helpers;