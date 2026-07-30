const machineRepository = require("../repositories/machine.repository");

const createMachine = async (machineData) => {
    const existingMachine = await machineRepository.findByMachineCode(
        machineData.machineCode
    );

    if (existingMachine) {
        throw new Error("Machine code already exists.");
    }

    return await machineRepository.create(machineData);
};

const getAllMachines = async () => {
    return await machineRepository.findAll();
};

const getMachineById = async (id) => {
    return await machineRepository.findById(id);
};

const updateMachine = async (id, updateData) => {
    return await machineRepository.updateById(id, updateData);
};

const deleteMachine = async (id) => {
    return await machineRepository.deleteById(id);
};

module.exports = {
    createMachine,
    getAllMachines,
    getMachineById,
    updateMachine,
    deleteMachine
};