import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './components/context/AuthContext';
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import CameraServiceTest from "./components/pages/Test";
import Tutorial from "./components/pages/Tutorial";
import FAQ from "./components/pages/Faq";
import Login from "./components/pages/Login";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // Redirect them to the /login page if not authenticated
    return <Navigate to="/login" />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <div className="App bg-gray-100">
        <header className="App-header">
          <Navbar />
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            {/* <Route path="/test" element={<CameraServiceTest />} /> */}
            {/* <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/faq" element={<FAQ />} /> */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </header>
      </div>
    </AuthProvider>
  );
}

export default App;

