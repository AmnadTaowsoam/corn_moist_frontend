import React, { useState, useEffect } from "react";
import QRCodeReader from "../components/QRCodeReader";
import DisplayMoisture from "../components/DisplayMoisture";
import MoistureGraph from "../components/MoistureGraph";
import Statistics from "../components/Statistics";
import InterfaceData from "../components/InterfaceData";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Home() {
  const [moistureData, setMoistureData] = useState([]);
  const [ws, setWs] = useState(null);
  const [activeRange, setActiveRange] = useState({ start: 0, end: 0 });
  const [interfaceData, setInterfaceData] = useState({
    inslot: "",
    operationNo: "",
    batch: "",
    material: "",
    plant: "",
  });

  const [statistics, setStatistics] = useState({
    n: 0,
    min: 0.0,
    max: 0.0,
    range: 0.0,
    average: 0.0,
    median: 0.0,
    sd: 0.0,
    variance: 0.0,
    skewness: 0.0,
    kurtosis: 0.0,
    cv: 0.0,
  });

  useEffect(() => {
    const webSocketURL = import.meta.env.VITE_REACT_APP_WEBSOCKET_ENDPOINT;
    const webSocket = new WebSocket(webSocketURL);
    setWs(webSocket);

    webSocket.onopen = () => console.log("WebSocket connected");
    webSocket.onerror = (error) => console.error("WebSocket error:", error);
    webSocket.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      const data = JSON.parse(event.data);
      const moisturePoint = {
        time: new Date().getTime(),
        value: data.predictionResult.predicted_moisture,
      };
      setMoistureData((prevData) => [...prevData, moisturePoint]);
    };

    return () => webSocket.close();
  }, []);

  const updateStatistics = (data) => {
    const values = data
      .map((d) => parseFloat(d.value))
      .filter((v) => !isNaN(v));
    const n = values.length;
    const min = n ? Math.min(...values) : 0;
    const max = n ? Math.max(...values) : 0;
    const range = max - min;
    const average = n ? values.reduce((sum, value) => sum + value, 0) / n : 0;
    // Calculate median
    const sortedValues = values.slice().sort((a, b) => a - b);
    const mid = Math.floor(sortedValues.length / 2);
    const median =
      sortedValues.length % 2 !== 0
        ? sortedValues[mid]
        : sortedValues.length
        ? (sortedValues[mid - 1] + sortedValues[mid]) / 2
        : 0;
    // Standard deviation calculation with checking for n to avoid division by zero
    const sd = n
      ? Math.sqrt(
          values.reduce((sum, value) => sum + (value - average) ** 2, 0) / n
        )
      : 0;
    const variance = sd ** 2;
    const skewness = n
      ? values.reduce((acc, val) => acc + (val - average) ** 3, 0) /
        (n * Math.pow(sd, 3))
      : 0;
    const kurtosis = n
      ? values.reduce((acc, val) => acc + (val - average) ** 4, 0) /
          (n * Math.pow(sd, 4)) -
        3
      : 0;
    const cv = average ? (sd / average) * 100 : 0;
    setStatistics({
      n,
      min,
      max,
      range,
      average,
      median,
      sd,
      variance,
      skewness,
      kurtosis,
      cv,
    });
  };

  useEffect(() => {
    if (moistureData.length > 0) {
      // ตรวจหาช่วงที่มีข้อมูล
      const validIndices = moistureData
        .map((data, index) =>
          data.value !== null && !isNaN(data.value) ? index : -1
        )
        .filter((index) => index !== -1);

      if (validIndices.length > 0) {
        setActiveRange({
          start: validIndices[0],
          end: validIndices[validIndices.length - 1],
        });
      }
    }
  }, [moistureData]);

  const calculateStats = () => {
    const filteredData = moistureData.slice(
      activeRange.start,
      activeRange.end + 1
    );
    updateStatistics(filteredData);
  };
  // คำนวณสถิติเมื่อ activeRange มีการเปลี่ยนแปลง
  useEffect(() => {
    if (activeRange.end > activeRange.start) {
      calculateStats();
    }
  }, [activeRange]);

  // Function to save statistics to localStorage and reset
  const saveStatsAndReset = () => {
    // Retrieve the existing statistics collection from localStorage
    const statsCollection =
      JSON.parse(localStorage.getItem("statisticsCollection")) || [];
    statsCollection.push(statistics);
    localStorage.setItem("statisticsCollection",JSON.stringify(statsCollection));
    // Reset statistics and moisture data
    setStatistics({
      n: 0,
      min: 0.0,
      max: 0.0,
      range: 0.0,
      average: 0.0,
      median: 0.0,
      sd: 0.0,
      variance: 0.0,
      skewness: 0.0,
      kurtosis: 0.0,
      cv: 0.0,
    });
    setMoistureData([]);
    // Refresh the page
     window.location.reload();
  };

  return (
    <div className="w-full">
      <div className="flex justify-center text-4xl font-bold">
        <p className="mt-2 mb-2">CORN MOISTURE</p>
      </div>
      <QRCodeReader setInterfaceData={setInterfaceData} />
      <div className="flex justify-end w-full mb-2">
        <button
          onClick={saveStatsAndReset}
          className="mt-4 p-2 bg-blue-500 text-white rounded mr-4"
        >
          Save and Reset
        </button>
      </div>
      <div>
        <MoistureGraph data={moistureData} />
        <Statistics stats={statistics} />
      </div>
      <div>
        <InterfaceData interfaceData={interfaceData} statistics={statistics} />
      </div>
    </div>
  );
}

export default Home;
