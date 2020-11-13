import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import PrivateRoute from "../../hocs/PrivateRoute";
import Apps from "./Apps";
import { appList } from "./AppList";
import Posilki from "./Posilki/Posilki";

interface Props {}

const AppsRoutes = (props: Props) => {
  const { path } = useRouteMatch();
  return (
    <>
      <Route exact path={path} component={Apps} />
      {appList.map((app) => (
        <PrivateRoute
          path={`${path}/${app.link}`}
          roles={["user", "admin"]}
          component={Posilki}
        />
      ))}
      <PrivateRoute
        path={`${path}/posilki`}
        roles={["user", "admin"]}
        component={Posilki}
      />
    </>
  );
};

export default AppsRoutes;
