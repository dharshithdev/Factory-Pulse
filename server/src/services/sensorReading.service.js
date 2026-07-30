const sensorReadingRepository = require("../repositories/sensorReading.repository");
const machineRepository = require("../repositories/machine.repository");

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