import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar2 from "./components/Navbar/Navbar2";
import Register from "./components/Register";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import "./App.css";

interface Props {}

const App: React.FC<Props> = (props) => {
  return (
    <BrowserRouter>
      <Navbar2 />
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path="/login" component={Login} />
      <UnPrivateRoute path="/register" component={Register} />
      {/*<PrivateRoute path="/todos" roles={["user", "admin"]} component={Todos} />
      <PrivateRoute path="/admin" roles={["admin"]} component={Admin} /> */}
    </BrowserRouter>
  );
};

export default App;
