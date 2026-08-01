const analyticsRepository = require("../repositories/analytics.repository");

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

module.exports = {
    getOverview,
    getProductionTrend,
    getTemperatureTrend,
    getAlertAnalytics,
    getMachineUtilization
};