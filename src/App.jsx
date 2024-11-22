import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Callback from "./components/Callback";
import Dashboard from "./components/Dashboard";

const App = () => {
  console.log("App loaded");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="*"
          element={<div>Route not found. Are you sure this path exists?</div>}
        />

      </Routes>
    </Router>
  );
};

export default App;
