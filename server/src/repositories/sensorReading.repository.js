const SensorReading = require("../models/sensorReading.model");

const create = async (readingData) => {
    return await SensorReading.create(readingData);
};

const findLatestByMachine = async (machineId) => {
    return await SensorReading
        .findOne({ machine: machineId })
        .sort({ createdAt: -1 });
};

const findByMachine = async (machineId) => {
    return await SensorReading
        .find({ machine: machineId })
        .sort({ createdAt: -1 });
};

const findByDateRange = async (machineId, startDate, endDate) => {
    return await SensorReading.find({
        machine: machineId,
        createdAt: {
            $gte: startDate,
            $lte: endDate
        }
    }).sort({ createdAt: -1 });
};

module.exports = {
    create,
    findLatestByMachine,
    findByMachine,
    findByDateRange
};