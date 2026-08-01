const analyticsRepository = require("../repositories/analytics.repository");
const Machine = require("../models/machine.model");

const getOverview = async () => {
    return await analyticsRepository.getOverview();
};

const getProductionTrend = async () => {
    return await analyticsRepository.getProductionTrend();
};

const getTemperatureTrend = async () => {
    return await analyticsRepository.getTemperatureTrend();
};

const getAlertAnalytics = async () => {
    return await analyticsRepository.getAlertAnalytics();
};

const getMachineUtilization = async () => {
    return await analyticsRepository.getMachineUtilization();
};

const exportAnalytics = async () => {
    const machines = await Machine.find().sort({ machineCode: 1 });
    return machines.map((machine) => ({
        machineCode: machine.machineCode,
        status: machine.currentMetrics.status,
        temperature: machine.currentMetrics.temperature,
        pressure: machine.currentMetrics.pressure,
        rpm: machine.currentMetrics.rpm,
        power: machine.currentMetrics.power,
        productionCount: machine.currentMetrics.productionCount
    }));
};

module.exports = {
    getOverview,
    getProductionTrend,
    getTemperatureTrend,
    getAlertAnalytics,
    getMachineUtilization,
    exportAnalytics
};