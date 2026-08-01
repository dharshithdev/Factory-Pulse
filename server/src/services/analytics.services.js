const analyticsRepository = require("../repositories/analytics.repository");

const getOverview = async () => {
    return await analyticsRepository.getOverview();
};

const getProductionTrend = async () => {
    return await analyticsRepository.getProductionTrend();
};

module.exports = {
    getOverview,
    getProductionTrend
};