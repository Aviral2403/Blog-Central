const jwt = require('jsonwebtoken');

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            return resolve(false);
        }
        jwt.verify(token, process.env.SECRET, (err, data) => {
            if (err) {
                return resolve(false);
            }
            return resolve(true);
        });
    });
};

module.exports = verifyToken;