const analyticsService = require("../services/analytics.services");
const { stringify } = require("csv-stringify/sync");

const getOverview = async (req, res, next) => {

    try {

        const overview = await analyticsService.getOverview();
        console.log(req.admin);
        
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

const exportAnalytics = async (req, res, next) => {
    try {
        const data = await analyticsService.exportAnalytics();
        const csv = stringify(data, {
            header: true,
            columns: [
                { key: "machineCode", header: "Machine Code" },
                { key: "status", header: "Status" },
                { key: "temperature", header: "Temperature (°C)" },
                { key: "pressure", header: "Pressure (PSI)" },
                { key: "rpm", header: "RPM" },
                { key: "power", header: "Power (kW)" },
                { key: "productionCount", header: "Production Count" }
            ]
        });
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=factorypulse-analytics.csv");
        res.status(200).send(csv);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getOverview,
    getProductionTrend,
    getTemperatureTrend,
    getAlertAnalytics,
    getMachineUtilization,
    exportAnalytics
};