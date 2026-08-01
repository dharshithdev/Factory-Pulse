const jwt = require("jsonwebtoken");

const generateToken = (adminId) => {
    return jwt.sign(
        { id: adminId },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
};

module.exports = {
    generateToken
};