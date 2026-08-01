require("dotenv").config();
const http = require("http");
const logger = require("./config/logger");
const app = require("./app");
const connectDB = require("./config/database");
const startSimulator = require("./simulator/simulator");
const { initializeSocket } = require("./config/socket");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    
    try {
        await connectDB();
        const server = http.createServer(app);
        initializeSocket(server);

        server.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });

        startSimulator();

    } catch (error) {
        logger.error(error);
    }
};

startServer();