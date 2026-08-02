const Joi = require("joi");
const { password } = require("../controllers/auth.controller");

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required()
})

module.exports = {
    loginSchema,
    changePasswordSchema
};