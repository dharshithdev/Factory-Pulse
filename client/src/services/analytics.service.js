import api from "../api/api";

export const getOverview = async () => {
    const response = await api.get("/analytics/overview");
    return response.data.data;
};

export const getProduction = async () => {
    const response = await api.get("/analytics/production");
    return response.data.data;
};

export const getTemperature = async () => {
    const response = await api.get("/analytics/temperature");
    return response.data.data;
};

export const getAlerts = async () => {
    const response = await api.get("/analytics/alerts");
    return response.data.data;
};

export const getUtilization = async () => {
    const response = await api.get("/analytics/utilization");
    return response.data.data;
};

export const exportAnalytics = async () => {
    const response = await api.get("/analytics/export", {
        responseType: "blob"
    });
    return response.data;
};