import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { Card, CardHeader, CardMedia } from "@material-ui/core";
import IApp from "../../../interfaces/IApp";
import classes from "./MyCard.module.css";

interface Props {
  app: IApp;
}

const MyCard: React.FC<Props> = ({ app }) => {
  const { url } = useRouteMatch();
  return (
    <Card className={classes.card}>
      <Link to={`${url}/${app.link}`} className={classes.link}>
        <CardHeader title={app.tytul} disableTypography />
        <CardMedia className={classes.media} image={app.image} />
      </Link>
    </Card>
  );
};

export default MyCard;
