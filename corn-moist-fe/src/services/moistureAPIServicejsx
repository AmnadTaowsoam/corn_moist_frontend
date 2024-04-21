import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_GATEWAY_ENDPOINT || "http://localhost:5050/api"; // Fallback if environment variable is not set

const getPrediction = async () => {
    try {
        const response = await axios.get(`${baseURL}/get-prediction`);
        return response.data;
    } catch (error) {
        console.error('Error fetching prediction data:', error);
        throw error;
    }
};

export default { getPrediction };

