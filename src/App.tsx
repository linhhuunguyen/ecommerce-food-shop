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
          <Route path="/admin" component={AdminLayout} />
          <Route path="/" component={AppLayout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
