import api from "../api/api";

export const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data.data;
};

export const changePassword = async (credentials) => {
    const response = await api.post("/auth/change", credentials);
    return response.data.data;
} 