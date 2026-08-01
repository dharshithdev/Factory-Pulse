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

module.exports = {
    getOverview,
    getProductionTrend
};