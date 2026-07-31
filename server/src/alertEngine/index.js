const alertRepository = require("../repositories/alert.repository");
const alertService = require("../services/alert.services");

const processAlerts = async (machine, sensorReading, triggeredAlerts) => {

    // Get all active alerts for this machine
    const activeAlerts = await alertRepository.findActiveAlertsByMachine(
        machine._id
    );

    // Convert triggered alerts into a Set for quick lookup
    const triggeredTypes = new Set(
        triggeredAlerts.map(alert => alert.type)
    );

    // Process triggered alerts
    for (const alert of triggeredAlerts) {

        await alertService.processAlert(
            machine,
            sensorReading,
            alert
        );

    }

    // Resolve alerts that disappeared
    for (const activeAlert of activeAlerts) {

        if (!triggeredTypes.has(activeAlert.type)) {

            await alertRepository.resolveAlert(
                activeAlert._id
            );

        }

    }

};

module.exports = {
    processAlerts
};