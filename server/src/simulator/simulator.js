const axios = require("axios");
const Machine = require("../models/machine.model");
const generateSensorData = require("./dataGenerator");
const config = require("./simulator.config");

const runSimulator = async () => {
    try {

        const machines = await Machine.find({isActive: true});

        for (const machine of machines) {

            const sensorData = generateSensorData(machine);

            await axios.post(config.API_URL, sensorData);

            console.log(`${machine.machineCode} -> Temp: ${sensorData.temperature}°C`);
        }

    } catch (error) {

        console.error("Simulator Error:", error.message);

    }
};

const startSimulator = () => {

    console.log("FactoryPulse Sensor Simulator Started");

    runSimulator();

    setInterval(runSimulator, config.INTERVAL);
};

module.exports = startSimulator;