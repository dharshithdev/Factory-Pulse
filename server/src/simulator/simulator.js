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

            console.log(`${machine.machineCode} -> Temperature : ${sensorData.temperature}°C`);
            console.log(`${machine.machineCode} -> Pressure    : ${sensorData.pressure} PSI`);
            console.log(`${machine.machineCode} -> RPM         : ${sensorData.rpm}`);
            console.log(`${machine.machineCode} -> Power       : ${sensorData.power} Watt`);
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