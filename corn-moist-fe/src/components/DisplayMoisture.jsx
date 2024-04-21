import React, { useEffect, useState } from 'react';

const DisplayMoisture = () => {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const baseURL = import.meta.env.VITE_REACT_APP_WEBSOCKET_ENDPOINT; // Use environment variable

  useEffect(() => {
    const ws = new WebSocket(baseURL);

    ws.onopen = () => {
      console.log('WebSocket Connected');
      ws.send('Hello Server!');
    };

    ws.onmessage = (event) => {
        console.log('WebSocket message received:', event.data);
        try {
            const data = JSON.parse(event.data);
            if (data.predictionResult?.predicted_moisture !== undefined) {
                setPrediction(data.predictionResult.predicted_moisture);
                setError(null);
            }
            setIsLoading(false);
        } catch (err) {
            console.error('Failed to parse prediction data:', err);
            setError('Failed to parse prediction data');
            setIsLoading(false);
        }
    };

    ws.onerror = (event) => {
        console.error('WebSocket error:', event.message);
        setError(`WebSocket connection error: ${event.message}`);
        setIsLoading(false);
    };

    ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event);
        if (!event.wasClean) {
            setError(`WebSocket closed unexpectedly: ${event.reason}`);
        }
        setIsLoading(false);
    };

    return () => ws.readyState === WebSocket.OPEN && ws.close(1000, "Component unmounting");
  }, [baseURL]);

  if (isLoading) return <div>Loading prediction data...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      <h1>Prediction Results</h1>
      <pre>{JSON.stringify(prediction, null, 2)}</pre>
    </div>
  );
};

export default DisplayMoisture;
