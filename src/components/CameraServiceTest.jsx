import React from 'react';
import cameraAPIService from './cameraAPIService'; // Adjust the path as needed

const CameraServiceTest = () => {
    const testMachineId = 'qi'; // Replace this with a valid machineId
    const testToken = 'your_token_here'; // Temporarily use a valid token for testing captureImage

    const testLogin = async () => {
        try {
            console.log(`Testing login for machineId: ${testMachineId}`);
            const token = await cameraAPIService.login(testMachineId);
            console.log("Test Login Success, token:", token);
            // You might want to use this token for immediate captureImage testing
        } catch (error) {
            console.error("Test Login Failed:", error);
        }
    };

    const testCaptureImage = async () => {
        try {
            console.log(`Testing captureImage with token: ${testToken} and machineId: ${testMachineId}`);
            const response = await cameraAPIService.captureImage(testToken, testMachineId);
            console.log("Capture Image Success, response:", response);
        } catch (error) {
            console.error("Capture Image Failed:", error);
        }
    };

    return (
        <div>
            <h2>Camera Service Test</h2>
            <button onClick={testLogin}>Test Login</button>
            <button onClick={testCaptureImage}>Test Capture Image</button>
        </div>
    );
};

export default CameraServiceTest;
