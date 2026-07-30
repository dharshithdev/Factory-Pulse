

module.exports = {
    INTERVAL: 30000,

    API_URL: "http://localhost:5000/api/v1/sensor-readings",

    STATUS: {
        RUNNING: "Running",
        IDLE: "Idle",
        STOPPED: "Stopped",
        MAINTENANCE: "Maintenance"
    },

    STATUS_PROBABILITY: {
        RUNNING: 90,
        IDLE: 5,
        STOPPED: 3,
        MAINTENANCE: 2
    },

    VARIATION: {
        TEMPERATURE: 2,
        PRESSURE: 1,
        RPM: 50,
        POWER: 0.3,
        PRODUCTION: 5
    }
};