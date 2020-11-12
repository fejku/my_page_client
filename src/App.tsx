import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
// import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import Navbar from "./components/Navbar/Navbar";
import Apps from "./components/Apps/Apps";
import Games from "./components/Games";

import "./App.css";

interface Props {}

const App: React.FC<Props> = (props) => {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path="/apps" component={Apps} />
      <UnPrivateRoute path="/games" component={Games} />
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path="/register" component={Register} />
      {/*<PrivateRoute path="/todos" roles={["user", "admin"]} component={Todos} />
      <PrivateRoute path="/admin" roles={["admin"]} component={Admin} /> */}
    </BrowserRouter>
  );
};

export default App;
