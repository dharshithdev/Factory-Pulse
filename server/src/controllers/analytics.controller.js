const analyticsService = require("../services/analytics.services");

const getOverview = async (req, res, next) => {

    try {

        const overview = await analyticsService.getOverview();

        res.status(200).json({
            success: true,
            data: overview
        });

    } catch (error) {

        next(error);

    }

};

const getProductionTrend = async (req, res, next) => {

    try {

        const production = await analyticsService.getProductionTrend();

        res.status(200).json({
            success: true,
            data: production
        });

    } catch (error) {

        next(error);

    }

};

const getTemperatureTrend = async (req, res, next) => {

    try {

        const temperature = await analyticsService.getTemperatureTrend();

        res.status(200).json({
            success: true,
            data: temperature
        });

    } catch (error) {

        next(error);

    }

};

const getAlertAnalytics = async (req, res, next) => {

    try {

        const analytics = await analyticsService.getAlertAnalytics();

        res.status(200).json({
            success: true,
            data: analytics
        });

    } catch (error) {

        next(error);

    }

};

const getMachineUtilization = async (req, res, next) => {

    try {

        const utilization = await analyticsService.getMachineUtilization();

        res.status(200).json({
            success: true,
            data: utilization
        });

    } catch (error) {

        next(error);

    }

};

module.exports = {
    getOverview,
    getProductionTrend,
    getTemperatureTrend,
    getAlertAnalytics,
    getMachineUtilization
};