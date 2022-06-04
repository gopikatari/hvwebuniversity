import React from "react";
import { Route } from "react-router-dom";
import { HashRouter, Switch } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import NoComponent from "./components/NoComponent";
import Register from "./components/Register";
function App() {
  return (
    <HashRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="*" component={NoComponent} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
