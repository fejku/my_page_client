import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import PrivateRoute from "../../hocs/PrivateRoute";
import Apps from "./Apps";
import { appList } from "./AppList";

interface Props {}

const AppsRoutes = (props: Props) => {
  const { path } = useRouteMatch();
  return (
    <>
      <Route exact path={path} component={Apps} />
      {appList.map((app) => (
        <PrivateRoute
          key={app.link}
          path={`${path}/${app.link}`}
          roles={["user", "admin"]}
          component={app.component}
        />
      ))}
    </>
  );
};

export default AppsRoutes;
