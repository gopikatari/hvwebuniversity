import React, { useState } from "react";
import { Route } from "react-router-dom";
import { HashRouter, Switch } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import NoComponent from "./components/NoComponent";
import Register from "./components/Register";

import UserContext from "./UserContext";

function App() {
  const [user, setUser] = useState({
    isLoggedIn: false,
    currentUserID: null,
    currentUserName: null,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
    </UserContext.Provider>
  );
}

export default App;
