const sensorReadingService = require("../services/sensorReading.service");

const createSensorReading = async (req, res, next) => { 
    try {
        const sensorReading = await sensorReadingService.createSensorReading(req.body);

        res.status(201).json({
            success: true,
            message: "Sensor reading recorded successfully.",
            data: sensorReading 
        });

    } catch (error) {
        next(error);
    }
};

const getReadingsByMachine = async (req, res, next) => {
    try {
        const readings = await sensorReadingService.getReadingsByMachine(req.params.machineId);

        res.status(200).json({
            success: true,
            count: readings.length,
            data: readings
        });

    } catch (error) {
        next(error);
    }
};

const getLatestReading = async (req, res, next) => {
    try {
        const reading = await sensorReadingService.getLatestReading(req.params.machineId);

        if (!reading) {
            return res.status(404).json({
                success: false,
                message: "No sensor readings found."
            });
        }

        res.status(200).json({
            success: true,
            data: reading
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createSensorReading,
    getReadingsByMachine,
    getLatestReading
};