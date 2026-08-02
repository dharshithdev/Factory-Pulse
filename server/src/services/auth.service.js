const bcrypt = require("bcryptjs");
const adminRepository = require("../repositories/admin.repository");
const { generateToken } = require("../utils/jwt");
const Admin = require('../models/admin.model');

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

const changePassword = async (req, res, next) => {
    try{
        const adminId = req.admin.id; 
        const {newPassword} = req.body;
        console.log(adminId);
        const {currentPassword} = req.body;
        const admin = await Admin.findById(adminId);

        if (!admin) {
          return res.status(404).json({ message: "Admin protocol failure: Not found" });
        }
    
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch) {
            throw new Error("Invalid current password");
        } else {
          return await adminRepository.change(adminId, newPassword);
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    login,
    changePassword
};