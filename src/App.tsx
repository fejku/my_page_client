import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import moment from "moment";
import "moment/locale/pl";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar/Navbar";
import AppsRoutes from "./components/Apps/AppsRoutes";
import Games from "./components/Games";
import "./App.css";

interface Props {}

const App: React.FC<Props> = (props) => {
  moment.locale("pl");

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/apps" component={AppsRoutes} />
        <Route path="/games" component={Games} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
