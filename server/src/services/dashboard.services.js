const machineRepository = require("../repositories/machine.repository");
const alertRepository = require("../repositories/alert.repository");

const getDashboardData = async () => {

    const machines = await machineRepository.findAll();
    const alerts = await alertRepository.findAll();

    const dashboard = {
        machineSummary: {
            total: machines.length,
            running: machines.filter(machine => machine.currentMetrics.status === "Running").length,
            idle: machines.filter(machine => machine.currentMetrics.status === "Idle").length,
            stopped: machines.filter(machine => machine.currentMetrics.status === "Stopped").length,
            maintenance: machines.filter(machine => machine.currentMetrics.status === "Maintenance").length
        },

        alerts: {
            active: alerts.filter(alert => alert.status === "ACTIVE").length,
            warning: alerts.filter(alert =>
                alert.status === "ACTIVE" &&
                alert.severity === "WARNING"
            ).length,

            critical: alerts.filter(alert =>
                alert.status === "ACTIVE" &&
                alert.severity === "CRITICAL"
            ).length
        },

        production: {
            totalProduction: machines.reduce(
                (total, machine) =>
                    total + machine.currentMetrics.productionCount,
                0
            )
        },

        machines,

        recentAlerts: alerts.slice(0, 10)
    };

    return dashboard;
};

module.exports = {
    getDashboardData
};