import api from "../api/axiosConfig";
import { AUTH, REGISTER } from "../api/endpoints";

export const loginRequest = async (username, password) => {
    const response = await api.post(AUTH.LOGIN, {
        username,
        password
    });
    return response.data;
}

export const registerRequest = async (username, password, email) => {
    const response = await api.post(REGISTER.POST, {
        username,
        email,
        password
    });
    return response.data;
}