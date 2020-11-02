import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

interface Props extends RouteProps {
  roles: string[]
};

const PrivateRoute: React.FC<Props> = ({ component: Component, roles, ...rest }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  if (!Component) return null;
  return (
    <Route {...rest} render={props => {

      if (!isAuthenticated) {
        return <Redirect to={{ 
          pathname: "/login", 
          state: { 
            from: props.location
          }
        }} />
      }

      if (!roles.includes(user.role)) {
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

export default PrivateRoute;
