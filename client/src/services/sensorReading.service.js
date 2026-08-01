import api from "../api/api";

export const getMachineHistory = async (machineId) => {
    const response = await api.get(`/sensor-readings/machine/${machineId}`);
    return response.data.data;
};