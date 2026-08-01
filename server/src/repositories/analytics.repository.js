const Machine = require("../models/machine.model");
const Alert = require("../models/alert.model");
const SensorReading = require("../models/sensorReading.model");

const getOverview = async () => {

    const totalMachines = await Machine.countDocuments();

    const activeMachines = await Machine.countDocuments({
        isActive: true
    });

    const warningAlerts = await Alert.countDocuments({
        status: "ACTIVE",
        severity: "WARNING"
    });

    const criticalAlerts = await Alert.countDocuments({
        status: "ACTIVE",
        severity: "CRITICAL"
    });

    const machines = await Machine.find();

    const totalProduction = machines.reduce(
        (sum, machine) => sum + machine.currentMetrics.productionCount,
        0
    );

    return {
        totalMachines,
        activeMachines,
        totalProduction,
        activeAlerts: warningAlerts + criticalAlerts,
        warningAlerts,
        criticalAlerts
    };

};

const getProductionTrend = async () => {

    return await SensorReading.aggregate([

        {
            $sort: {
                createdAt: 1
            }
        },

        {
            $project: {

                _id: 0,

                time: {
                    $dateToString: {
                        format: "%H:%M",
                        date: "$createdAt"
                    }
                },

                production: "$productionCount"

            }

        },

        {
            $limit: 30
        }

    ]);

};

module.exports = {
    getOverview,
    getProductionTrend
};