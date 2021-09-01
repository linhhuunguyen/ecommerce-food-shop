import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AdminLayout from "layout/AdminLayout";
import AppLayout from "./layout";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={AppLayout} />
          <Route path="/admin" component={AdminLayout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
