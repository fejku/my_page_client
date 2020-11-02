import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface Props extends RouteProps {
};

const UnPrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { isAuthenticated} = useContext(AuthContext);

  if (!Component) return null;
  return (
    <Route {...rest} render={props => {

      if (isAuthenticated) {
        return <Redirect to={{ 
          pathname: "/", 
          state: { 
            from: props.location
          }
        }} />
      }

      return <Component {...props} />;
    }} />
  );
};

export default UnPrivateRoute;
