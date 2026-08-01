import api from "../api/api";

export const getAlerts = async () => {
    const response = await api.get("/alerts");
    return response.data.data;
};

export const acknowledgeAlert = async (id) => {
    const response = await api.patch(`/alerts/${id}/acknowledge`);
    return response.data.data;
};