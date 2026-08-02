const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate");
const authController = require("../controllers/auth.controller");
const { loginSchema, changePasswordSchema } = require("../validators/auth.validator");
const protect = require("../middlewares/auth.middleware");

router.post("/login", validate(loginSchema), authController.login);
router.post("/change", protect, validate(changePasswordSchema), authController.password);

module.exports = router;