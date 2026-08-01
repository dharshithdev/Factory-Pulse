const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {
    console.log("Error Occured : ");

    logger.error("Error Occured : ");
    logger.error(err.message);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

module.exports = errorHandler;