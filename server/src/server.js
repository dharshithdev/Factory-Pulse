require("dotenv").config();
const logger = require("./config/logger");

const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });

    } catch (error) {
        logger.error(error);
    }
};

startServer();

logger.info("Info test");
logger.error("Error test");
logger.warn("Warn test");