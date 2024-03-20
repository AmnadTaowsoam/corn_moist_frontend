import axios from "axios";
import { Interface_ENDPOINT } from "../assets/Config";

const useInterfaceAPIService = () => {
    let token = localStorage.getItem("token");
    const register = async (username, password) => {
        try {
        const response = await axios.post(
            `${Interface_ENDPOINT.apiEndpoint}/register`,
            { username, password }
        );
        return response.data;
        } catch (error) {
        console.error("Registration error:", error);
        throw error;
        }
    };

    const login = async (username, password) => {
        console.log("Login function entered");
        try {
        const response = await axios.post(
            `${Interface_ENDPOINT.apiEndpoint}/login`,
            { username, password }
        );
        const receivedToken = response.data.token;
        localStorage.setItem("token", receivedToken);
        } catch (error) {
        console.error("Login error:", error);
        throw error;
        }
    };

    const sendPayload = async (payload) => {
        try {
        const currentToken = localStorage.getItem("token");
        const response = await axios.post(
            `${Interface_ENDPOINT.apiEndpoint}/receive-data-from-webapp`,
            payload,
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentToken}`,
            },
            }
        );
        return response.data;
        } catch (error) {
        console.error("Error sending payload:", error);
        throw error;
        }
    };
    return { register, login, sendPayload };
};

export default useInterfaceAPIService;
