const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    const { _id, email  } = payload;
    const secretKey = '@123#qwe12'
    const option = {
        expiresIn : '1h',
    };
    const token = jwt.sign({ _id, email },secretKey,option);
    return token;
};
module.exports = {
    generateToken,
}