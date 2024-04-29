import axios from 'axios';

const authenticateAndGetToken = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_APIGATEWAY_URL}/interface/request-token`, {}, {
      headers: {
        "Content-Type": "application/json",
        "api_key": import.meta.env.API_KEY,
        "api_secret": import.meta.env.API_SECRET
      }
    });
    console.log("Authentication successful:", response.data);
    return response.data.accessToken;  // Return the access token directly
  } catch (error) {
    console.error("Authentication failed:", error);
    throw new Error("Authentication failed");
  }
};

const sendInterfaceData = async (data, authToken) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_APIGATEWAY_URL}/interface/send-inspection-data`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    });
    return response.data;  // Return the server response
  } catch (error) {
    console.error("Failed to send data:", error);
    throw new Error("Failed to send data");
  }
};

export { authenticateAndGetToken, sendInterfaceData };
