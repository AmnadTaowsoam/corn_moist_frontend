import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { authenticateAndGetToken, sendInterfaceData } from "../services/InterfaceAPIService";

const InterfaceData = ({ interfaceData }) => {
  const [statisticsHistory, setStatisticsHistory] = useState([]);
  const [physValues, setPhysValues] = useState({ average: 0, sd: 0, cv: 0 });
  const [logMessage, setLogMessage] = useState("Ready to interface");
  const [authToken, setAuthToken] = useState("");

  // Load initial data from localStorage on mount
  useEffect(() => {
    const loadStatistics = () => {
      const loadedStats = localStorage.getItem("statisticsCollection");
      if (loadedStats) {
        const stats = JSON.parse(loadedStats);
        setStatisticsHistory(stats);
        updatePhysValues(stats);
      }
    };
    loadStatistics(); // Call on mount
  }, []);

  const updatePhysValues = useCallback((stats) => {
    if (stats.length > 0) {
      const averages = stats.map(stat => stat.average);
      const sds = stats.map(stat => stat.sd);
      const cvs = stats.map(stat => stat.cv);
      setPhysValues({
        average: Math.max(...averages),
        sd: Math.max(...sds),
        cv: Math.max(...cvs)
      });
    } else {
      setPhysValues({ average: 0, sd: 0, cv: 0 });
    }
  }, []);

  // Updating local storage and state simultaneously
  const modifyStatistics = useCallback((stats) => {
    localStorage.setItem("statisticsCollection", JSON.stringify(stats));
    setStatisticsHistory([...stats]);  // Create a new array to ensure re-render
  }, []);

  const updateStatsFromStorage = () => {
    const loadedStats = localStorage.getItem("statisticsCollection");
    if (loadedStats) {
      const stats = JSON.parse(loadedStats);
      setStatisticsHistory(stats); // Directly set new fetched data
      updatePhysValues(stats);
    }
  };
  
  const removeFromStatistics = useCallback((index) => {
    const updatedStatistics = statisticsHistory.filter((_, idx) => idx !== index);
    modifyStatistics(updatedStatistics);
  }, [statisticsHistory, modifyStatistics]);

  useEffect(() => {
    console.log("Statistics History Updated:", statisticsHistory);
  }, [statisticsHistory]);  // Log when statisticsHistory updates
  
  useEffect(() => {
    console.log("Physical Values Updated:", physValues);
  }, [physValues]);  // Log when physValues updates  

  const forceUpdate = useState()[1].bind(null, {});  // Create a function to force update

  useEffect(() => {
    window.forceUpdate = forceUpdate;  // Expose forceUpdate for debugging
  }, []);

  const handleInterface = async () => {
    if (!authToken) {
      try {
        const token = await authenticateAndGetToken();
        setAuthToken(token);
        setLogMessage("Authenticated successfully");
      } catch (error) {
        setLogMessage(`Authentication failed: ${error.message}`);
        return;
      }
    }

    try {
      const data = {
        "inspectionData": {
          "requestRef": interfaceData.inslot && interfaceData.operation,
          "inspecLot": interfaceData.inslot,
          "plant": interfaceData.plant,
          "pointData": [
            { "operation": interfaceData.operation, "mic": "MOISCORN", "result": physValues.average.toFixed(1)},
            { "operation": interfaceData.operation, "mic": "SDCORN01", "result": physValues.sd.toFixed(1) },
            { "operation": interfaceData.operation, "mic": "CVCORN01", "result": physValues.cv.toFixed(1) }
          ]
        }
      };
      const result = await sendInterfaceData(data, authToken);
      setLogMessage("Data sent successfully: " + JSON.stringify(result));
    } catch (error) {
      setLogMessage(error.message);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3 ml-4">
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>Inspection Lot</th>
                <th>Operation</th>
                <th>Batch</th>
                <th>Material</th>
                <th>Plant</th>
                <th>MOISCORN</th>
                <th>SDCORN01</th>
                <th>CVCORN01</th>
                <th># Sample</th>
                <th>N</th>
                <th>Min</th>
                <th>Max</th>
                <th>Range</th>
                <th>Average</th>
                <th>Median</th>
                <th>SD</th>
                <th>Variance</th>
                <th>Skewness</th>
                <th>Kurtosis</th>
                <th>CV</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                {Object.values(interfaceData).map((value, idx) => <td key={idx}>{value}</td>)}
                <td>{physValues.average.toFixed(1)}</td>
                <td>{physValues.sd.toFixed(1)}</td>
                <td>{physValues.cv.toFixed(1)}</td>
                <td colSpan={15}></td>
              </tr>
              {statisticsHistory.map((stats, index) => (
                <tr key={index}>
                  <td colSpan={8}></td>
                  <td>{index}</td>
                  <td>{stats.n.toFixed(1)}</td>
                  <td>{stats.min.toFixed(1)}</td>
                  <td>{stats.max.toFixed(1)}</td>
                  <td>{stats.range.toFixed(1)}</td>
                  <td>{stats.average.toFixed(1)}</td>
                  <td>{stats.median.toFixed(1)}</td>
                  <td>{stats.sd.toFixed(1)}</td>
                  <td>{stats.variance.toFixed(1)}</td>
                  <td>{stats.skewness.toFixed(1)}</td>
                  <td>{stats.kurtosis.toFixed(1)}</td>
                  <td>{stats.cv.toFixed(1)}</td>
                  <td>
                    <button className="text-red-500 hover:text-red-700" onClick={() => removeFromStatistics(index)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center">
        <button className="btn btn-primary mr-1" onClick={handleInterface}>Interface</button>
        <p>{logMessage}</p>
      </div>
    </div>
  );
};

InterfaceData.propTypes = {
  interfaceData: PropTypes.object.isRequired
};

export default InterfaceData;
