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

const getTemperatureTrend = async () => {

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

                temperature: "$temperature"

            }

        },

        {
            $limit: 30
        }

    ]);

};

const getAlertAnalytics = async () => {

    const severity = await Alert.aggregate([

        {
            $group: {
                _id: "$severity",
                value: {
                    $sum: 1
                }
            }
        },

        {
            $project: {
                _id: 0,
                name: "$_id",
                value: 1
            }
        }

    ]);

    const types = await Alert.aggregate([

        {
            $group: {
                _id: "$type",
                count: {
                    $sum: 1
                }
            }
        },

        {
            $project: {
                _id: 0,
                type: "$_id",
                count: 1
            }
        }

    ]);

    return {
        severity,
        types
    };

};

const getMachineUtilization = async () => {

    const machines = await Machine.find().sort({
        machineCode: 1
    });

    return machines.map((machine) => {

        const utilization = Math.min(
            (
                machine.currentMetrics.productionCount /
                machine.maxProductionPerMinute
            ) * 100,
            100
        );

        return {

            machine: machine.machineCode,

            utilization: Number(
                utilization.toFixed(1)
            )

        };

    });

};

module.exports = {
    getOverview,
    getProductionTrend,
    getTemperatureTrend,
    getAlertAnalytics,
    getMachineUtilization
};