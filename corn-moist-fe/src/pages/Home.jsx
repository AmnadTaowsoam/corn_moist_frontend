import React, { useState, useEffect } from "react";
import QRCodeReader from "../components/QRCodeReader";
import DisplayMoisture from "../components/DisplayMoisture";
import MoistureGraph from "../components/MoistureGraph";
import Statistics from "../components/Statistics"; // Import the Statistics component
import InterfaceData from "../components/InterfaceData";

function Home() {
  const [moistureData, setMoistureData] = useState([]);
  const [ws, setWs] = useState(null);
  const [interfaceData, setInterfaceData] = useState({
    inslot: "",
    operationNo: "",
    batch: "",
    material: "",
    plant: ""
  });
  const [statistics, setStatistics] = useState({
    n: 0,
    min: 0,
    max: 0,
    range: 0,
    average: 0,
    median: 0,
    sd: 0,
    variance: 0,
    skewness: 0,
    kurtosis: 0,
    cv: 0
  });

  useEffect(() => {
    const webSocket = new WebSocket("ws://localhost:5050");
    setWs(webSocket);

    webSocket.onopen = () => {
      console.log("WebSocket connected");
    };

    webSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    webSocket.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      const data = JSON.parse(event.data);
      const moisturePoint = {
        time: new Date().getTime(),
        value: data.predictionResult.predicted_moisture,
      };
      console.log("Processed moisture data:", moisturePoint);
      setMoistureData((prevData) => [...prevData, moisturePoint]);
    };
    
    return () => {
      webSocket.close();
    };
  }, []);

  const handleStart = () => {
    setIsActive(true); // Activate the WebSocket connection
  };

  const handleStop = () => {
    setIsActive(false); // Deactivate the WebSocket connection
    setMoistureData([]); // Optionally clear data
  };

  const updateStatistics = (data) => {
    const values = data.map(d => d.value);
    const n = values.length;
    const min = n ? Math.min(...values) : 0;
    const max = n ? Math.max(...values) : 0;
    const range = max - min;
    const average = n ? values.reduce((sum, value) => sum + value, 0) / n : 0;
    const sortedValues = [...values].sort((a, b) => a - b);
    const median = n % 2 !== 0 ? sortedValues[Math.floor(n / 2)] : (sortedValues[Math.floor(n / 2) - 1] + sortedValues[Math.floor(n / 2)]) / 2;
    const sd = n ? Math.sqrt(values.reduce((sum, value) => sum + (value - average) ** 2, 0) / n) : 0;
    const variance = sd ** 2;
    const skewness = n ? values.reduce((acc, val) => acc + ((val - average) ** 3), 0) / (n * (sd ** 3)) : 0;
    const kurtosis = n ? values.reduce((acc, val) => acc + ((val - average) ** 4), 0) / (n * (sd ** 4)) - 3 : 0;
    const cv = average ? (sd / average) * 100 : 0;
  
    setStatistics({ n, min, max, range, average, median, sd, variance, skewness, kurtosis, cv });
  };
  
  useEffect(() => {
    updateStatistics(moistureData);
  }, [moistureData]); // Recalculate statistics whenever moistureData changes  
  
  return (
    <div className="w-full">
      <div className="flex justify-center text-4xl font-bold">
        <p className=" mb-2">CORN MOISTURE STEAMING</p>
      </div>
      <QRCodeReader setInterfaceData={setInterfaceData} />
      
      {/* <DisplayMoisture data={moistureData} /> */}
      <MoistureGraph data={moistureData} />
      <Statistics data={moistureData} />
      <InterfaceData interfaceData={interfaceData} statistics={statistics}/>
    </div>
  );
}

export default Home;