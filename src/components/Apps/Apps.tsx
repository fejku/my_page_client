import React from "react";
import { appList } from "./AppList";
import MyCard from "./MyCard/MyCard";
import classes from "./Apps.module.css";

interface Props {}

const Apps: React.FC<Props> = (props) => {
  return (
    <div className={classes.Apps}>
      {appList.map((app) => (
        <MyCard key={app.link} app={app} />
      ))}
    </div>
  );
};

export default Apps;
