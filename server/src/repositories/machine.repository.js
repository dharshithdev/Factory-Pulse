const Machine = require("../models/machine.model");

const create = async (machineData) => {
    return await Machine.create(machineData);
};

const findAll = async () => {
    return await Machine.find().sort({ machineCode: 1 });
};

const findById = async (id) => {
    return await Machine.findById(id);
};

const findByMachineCode = async (machineCode) => {
    return await Machine.findOne({ machineCode });
};

const updateById = async (id, updateData) => {
    return await Machine.findByIdAndUpdate(
        id,
        updateData,
        {
            new: true,
            runValidators: true
        }
    );
};

const updateCurrentMetrics = async (machineId, currentMetrics) => {
    return await Machine.findByIdAndUpdate(
        machineId,
        {
            currentMetrics
        },
        {
            returnDocument: "after"
        }
    );
};

const deleteById = async (id) => {
    return await Machine.findByIdAndDelete(id);
};

module.exports = {
    create,
    findAll,
    findById,
    findByMachineCode,
    updateById,
    updateCurrentMetrics,
    deleteById
};