const bcrypt = require("bcryptjs");
const adminRepository = require("../repositories/admin.repository");
const { generateToken } = require("../utils/jwt");

const login = async (username, password) => {

    const admin = await adminRepository.findByUsername(username);

    if (!admin) {
        throw new Error("Invalid username or password.");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        admin.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid username or password.");
    }

    const token = generateToken(admin._id);

    return {
        token,
        admin: {
            id: admin._id,
            username: admin.username
        }
    };

};

module.exports = {
    login
};