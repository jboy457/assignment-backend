const router = require('express').Router();
const validate = require('../../utils/validate');
const Controller = require('./user_controller');
const { authicateUserSchema } = require('./user_validations');

router.post('/login', authicateUserSchema(), validate, Controller.login);
router.post('/register', Controller.register);

module.exports = router;
