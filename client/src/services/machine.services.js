import api from "../api/api";

export const getMachines = async () => {
    const response = await api.get("/machines");
    return response.data.data;
};

export const getMachineById = async (id) => {
    const response = await api.get(`/machines/${id}`);
    return response.data.data;
};

export const createMachine = async (machineData) => {
    const response = await api.post("/machines", machineData);
    console.log(response.data.data);
    return response.data.data;
};

export const updateMachine = async (id, machineData) => {
    const response = await api.put(`/machines/${id}`, machineData);
    return response.data.data;
};

export const toggleMachineStatus = async (id) => {
    const response = await api.patch(`/machines/${id}/toggle`);
    return response.data.data;
};

export const deleteMachine = async (id) => {
    console.log("Delete request")
    const response = await api.delete(`/machines/${id}`);
    console.log('--> ', response.data.data);
    return response.data.data;
};