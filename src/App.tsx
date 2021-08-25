import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppLayout from "./layout";

function App() {
  return (
    <div className="App">
      <Router>
        <AppLayout />
      </Router>
    </div>
  );
}

export default App;
