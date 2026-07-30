// src/config/database.js

const mongoose = require("mongoose");
const logger = require("./logger");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);

        logger.info(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        logger.error(error);

        process.exit(1);
    }
};

module.exports = connectDB;