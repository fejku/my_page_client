import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import PrivateRoute from "../../hocs/PrivateRoute";
import Apps from "./Apps";
import { appList } from "./AppList";
import Potrawy from "./Potrawy/Potrawy";

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
          component={Potrawy}
        />
      ))}
    </>
  );
};

export default AppsRoutes;
