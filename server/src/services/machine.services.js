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
    const machine =  await machineRepository.findAll();

    if (!machine) {
        throw new Error("Machine not found.");
    }

    return machine;
};

const getMachineById = async (id) => {
    const machine = await machineRepository.findById(id);

    if (!machine) {
        throw new Error("Machine not found.");
    }

    return machine;
};

const updateMachine = async (id, updateData) => {
    const machine = await machineRepository.findById(id);

    if (!machine) {
        throw new Error("Machine not found.");
    }
    if (updateData.machineCode) {
        throw new Error("Machine code cannot be updated.");
    }

    return await machineRepository.updateById(id, updateData);
};

const deleteMachine = async (id) => {
    const machine = await machineRepository.findById(id);

    if (!machine) {
        throw new Error("Machine not found.");
    }
    console.log('Del 2');
    return await machineRepository.deleteById(id);
};

const toggleMachineStatus = async (id) => {
    const machine = await machineRepository.toggleMachineStatus(id);
    if (!machine) {
        throw new Error("Machine not found.");
    }
    return machine;
};

module.exports = {
    createMachine,
    getAllMachines,
    getMachineById,
    updateMachine,
    deleteMachine,
    toggleMachineStatus
};