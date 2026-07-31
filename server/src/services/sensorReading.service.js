const sensorReadingRepository = require("../repositories/sensorReading.repository");
const machineRepository = require("../repositories/machine.repository");
const evaluateRules = require("../rule-engine/index");
const alertService = require("./alert.services");
const alertEngine = require("../alertEngine");

const createSensorReading = async (readingData) => {

    const machine = await machineRepository.findById(readingData.machine);

    if (!machine) {
        throw new Error("Machine not found.");
    }

    const sensorReading = await sensorReadingRepository.create(readingData);

    await machineRepository.updateCurrentMetrics(
        readingData.machine,
        {
            temperature: readingData.temperature,
            pressure: readingData.pressure,
            rpm: readingData.rpm,
            power: readingData.power,
            productionCount: readingData.productionCount,
            status: readingData.status,
            lastUpdated: new Date()
        }
    );

    const alerts = evaluateRules(machine, readingData);

    if (alerts.length > 0) {
        console.log("----------------------------------------");
        console.log("Alerts Generated");
    }
        await alertEngine.processAlerts(
        machine,
        sensorReading,
        alerts
      );

    return sensorReading;
};

const getReadingsByMachine = async (machineId) => {
    return await sensorReadingRepository.findByMachine(machineId);
};

const getLatestReading = async (machineId) => {
    return await sensorReadingRepository.findLatestByMachine(machineId);
};

module.exports = {
    createSensorReading,
    getReadingsByMachine,
    getLatestReading
};