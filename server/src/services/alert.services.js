const alertRepository = require("../repositories/alert.repository");
const { getIO } = require("../config/socket");

const processAlert = async (machine, sensorReading, alertData) => {

    const existingAlert = await alertRepository.findActiveAlert(
        machine._id,
        alertData.type
    );

    if (!existingAlert) {
        const alert = await alertRepository.create({
            machine: machine._id,
            sensorReading: sensorReading._id,
            ...alertData
        });

        const populatedAlert = await alertRepository.findById(alert._id);
        getIO().emit("alertCreated", populatedAlert);
        return populatedAlert;
    }

    return await alertRepository.updateLastSeen(
        existingAlert._id,
        alertData.value
    );
};

const getAllAlerts = async () => {
    return await alertRepository.findAll();
};

const getAlertsByMachine = async (machineId) => {
    return await alertRepository.findByMachine(machineId);
};

const acknowledgeAlert = async (id) => {
    return await alertRepository.acknowledge(id);
};

module.exports = {
    processAlert,
    getAllAlerts,
    getAlertsByMachine,
    acknowledgeAlert
};