const Alert = require("../models/alert.model");

const create = async (alertData) => {
    return await Alert.create(alertData);
};

const findActiveAlert = async (machineId, type) => {

    return await Alert.findOne({
        machine: machineId,
        type,
        status: "ACTIVE"
    });

};

const updateLastSeen = async (id, value) => {

    return await Alert.findByIdAndUpdate(
        id,
        {
            lastSeenAt: new Date(),
            value
        },
        {
            returnDocument: "after"
        }
    );

};

const resolveAlert = async (id) => {

    return await Alert.findByIdAndUpdate(
        id,
        {
            status: "RESOLVED",
            resolvedAt: new Date()
        },
        {
            returnDocument: "after"
        }
    );

};

const findAll = async () => {

    return await Alert.find()
        .populate("machine", "machineCode")
        .sort({ createdAt: -1 });

};

const findActiveAlertsByMachine = async (machineId) => {

    return await Alert.find({
        machine: machineId,
        status: "ACTIVE"
    });

};

module.exports = {
    create,
    findAll,
    findActiveAlert,
    updateLastSeen,
    resolveAlert,
    findActiveAlertsByMachine
};