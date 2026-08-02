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

const password = async (req, res, next) => {
    try {
        const changePassword = await authService.changePassword(req); 
        res.status(200).json({
            success: true,
            data: changePassword
        });

    } catch (error) {
        console.log("Error : ", error.message)
        next(error);
    }
}

module.exports = {
    login,
    password
};