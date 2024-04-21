import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import useInterfaceAPIService from "../services/InterfaceAPIService";
import debounce from "lodash/debounce";

const InterfaceData = ({ interfaceData, statistics }) => {
  const { login, sendPayload } = useInterfaceAPIService();
  const [isLoading, setLoading] = useState(false);
  const [logMessage, setLogMessage] = useState("Ready to interface");

  const handleInterfaceClick = async () => {
    setLoading(true);
    const username = sessionStorage.getItem("username");
    if (!username) {
      setLogMessage("Login failed: No credentials found.");
      setLoading(false);
      return;
    }

    try {
      await login(username);
      setLogMessage("Logged in successfully. Sending data...");
      console.log("Interface Data Props:", interfaceData);
      console.log("Statistics Props:", statistics);
      console.log("Received statistics in InterfaceData:", statistics);
      const payload = {
        ...interfaceData,
        statistics: {
          average: statistics.average.toFixed(1),
          sd: statistics.sd.toFixed(1),
          cv: statistics.cv.toFixed(1),
        },
      };      
      console.log("Payload being sent:", payload);
      try {
        await sendPayload(payload);
        setLogMessage(`Data interfaced successfully.`);
      } catch (error) {
        console.error(`Error sending payload:`, error);
        setLogMessage(
          `Error: ${error.response?.data?.message || error.message}`
        );
      }
    } catch (error) {
      setLogMessage(`Failed to login or send data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const debouncedHandleInterfaceClick = useCallback(
    debounce(handleInterfaceClick, 300),
    [handleInterfaceClick]
  );

  const displayValue = (value) => {
    // Check if the value is a number and format it if so
    if (typeof value === "number") {
      return value.toFixed(1);
    } else if (typeof value === "object" && value !== null) {
      // Assuming you might have object values, stringify them
      return JSON.stringify(value);
    }
    return value.toString();
  };
  

  // Selected statistics keys
  const selectedStatsKeys = ["average", "sd", "cv"];
  const selectedStatsValues = selectedStatsKeys.map((key) => statistics[key]);

  return (
    <div className="flex flex-col items-center mt-2">
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              {Object.keys(interfaceData)
                .concat(selectedStatsKeys)
                .map((key, index) => (
                  <th
                    key={index}
                    className="text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.values(interfaceData)
                .concat(selectedStatsValues)
                .map((value, index) => (
                  <td
                    key={index}
                    className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"
                  >
                    {displayValue(value)}
                  </td>
                ))}
              <div className="flex justify-center m-2">
                <button
                  className={`btn ${
                    isLoading ? "btn-disabled" : "btn-primary"
                  } rounded-full px-4 py-2`}
                  onClick={debouncedHandleInterfaceClick}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Interface"}
                </button>
              </div>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm text-teal-500 mt-2">{logMessage}</p>
    </div>
  );
};

InterfaceData.propTypes = {
  interfaceData: PropTypes.object.isRequired,
  statistics: PropTypes.object.isRequired,
};

export default InterfaceData;
