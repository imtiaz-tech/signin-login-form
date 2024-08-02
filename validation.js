const { body } = require ('express-validator');

 const loginValidator = [
    body('email', 'Email should not be empty').not().isEmpty(),
    body('email', 'Invalid email format').isEmail(),
    body('password', 'Password should not be empty').not().isEmpty(),
    body('confirmpassword', 'Confirm password should not be empty').not().isEmpty(),
];

module.exports = loginValidator;
