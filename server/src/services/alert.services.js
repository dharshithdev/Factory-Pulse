const alertRepository = require("../repositories/alert.repository");

const processAlert = async (machine, sensorReading, alertData) => {

    const existingAlert =
        await alertRepository.findActiveAlert(
            machine._id,
            alertData.type
        );

    if (!existingAlert) {

        return await alertRepository.create({
            machine: machine._id,
            sensorReading: sensorReading._id,
            ...alertData
        });

    }

    return await alertRepository.updateLastSeen(
        existingAlert._id,
        alertData.value
    );

};

module.exports = { processAlert };