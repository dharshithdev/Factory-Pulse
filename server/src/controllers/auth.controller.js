const authService = require("../services/auth.service");

const login = async (req, res, next) => {

    try {

        const { username, password } = req.body;

        const result = await authService.login(
            username,
            password
        );

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {

        next(error);

    }

};

module.exports = {
    login
};