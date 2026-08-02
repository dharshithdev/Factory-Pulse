const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");

const findByUsername = async (username) => {
    return await Admin.findOne({ username });
};

const create = async (adminData) => {
    return await Admin.create(adminData);
};

const change = async (adminId, newPassword) => {
    const salt = await bcrypt.genSalt(12);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    const admin = await Admin.findById(adminId);

    admin.password = hashedNewPassword;
    return await admin.save();
};

module.exports = {
    findByUsername,
    create,
    change
};