const Admin = require("../models/admin.model");

const findByUsername = async (username) => {
    return await Admin.findOne({ username });
};

const create = async (adminData) => {
    return await Admin.create(adminData);
};

module.exports = {
    findByUsername,
    create
};