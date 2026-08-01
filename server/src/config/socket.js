let io = null;

const initializeSocket = (server) => {

    const { Server } = require("socket.io");

    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
        }
    });
    
    io.on("connection", (socket) => {
        console.log(`Client Connected: ${socket.id}`);
        socket.on("disconnect", () => {
            console.log(`Client Disconnected: ${socket.id}`);
        });
    });
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io has not been initialized.");
    }
    return io;
};

module.exports = {
    initializeSocket,
    getIO
};