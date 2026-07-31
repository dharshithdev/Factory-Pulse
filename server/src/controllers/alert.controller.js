const alertService = require("../services/alert.services");

const getAllAlerts = async (req, res, next) => {
    try {
        const alerts = await alertService.getAllAlerts();

        res.status(200).json({
            success: true,
            data: alerts
        });

    } catch (error) {
        next(error);
    }
};

const getAlertsByMachine = async (req, res, next) => {
    try {
        const alerts = await alertService.getAlertsByMachine(
            req.params.machineId
        );

        res.status(200).json({
            success: true,
            data: alerts
        });

    } catch (error) {
        next(error);
    }
};

const acknowledgeAlert = async (req, res, next) => {
    try {
        const alert = await alertService.acknowledgeAlert(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Alert acknowledged successfully.",
            data: alert
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllAlerts,
    getAlertsByMachine,
    acknowledgeAlert
};