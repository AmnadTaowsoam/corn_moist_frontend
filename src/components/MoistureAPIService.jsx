import axios from "axios";
import { Machines_ENDPOINTS } from "../assets/Config";

const cameraAPIService = {
    login: async (machineId) => {
        const machineConfig = Machines_ENDPOINTS[machineId];
        if (!machineConfig) {
            throw new Error(`No config found for machineId: ${machineId}`);
        }

        const getTokenUrl = `${machineConfig.apiEndpoint}/login`;
        const loginData = {
            username: machineConfig.username,
            password: machineConfig.password,
        };

        try {
            const response = await axios.post(getTokenUrl, loginData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200 && response.data.access_token) {
                console.log("Camera and weighting Login Successful");
                return response.data.access_token;
            } else {
                throw new Error("Camera Failed to get token");
            }
        } catch (error) {
            console.error("Camera Error in login:", error);
            throw error;
        }
    },

    moisture: async (token, machineId) => {
        const machineConfig = Machines_ENDPOINTS[machineId];
        if (!machineConfig) {
            throw new Error(`No config found for machineId: ${machineId}`);
        }

        try {
            if (!token) {
                throw new Error("No Camera token obtained");
            }

            const captureUrl = `${machineConfig.apiEndpoint}/capture`;
            const response = await axios.post(
                captureUrl,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    responseType: "json",
                }
            );

            if (response.status === 200 && response.data) {
                console.log("Image and weight data received successfully");
                return response.data;
            } else {
                throw new Error("Failed to capture image and weight data");
            }
        } catch (error) {
            console.error("Error in captureImage:", error);
            throw error;
        }
    },
};

export default cameraAPIService;
