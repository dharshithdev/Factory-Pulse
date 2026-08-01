const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate");
const authController = require("../controllers/auth.controller");
const { loginSchema } = require("../validators/auth.validator");

router.post(
    "/login",
    validate(loginSchema),
    authController.login
);

module.exports = router;