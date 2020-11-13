import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import classes from "./Posilki.module.css";

interface Props {}

const Posilki = (props: Props) => {
  return (
    <div className={classes.Posilki}>
      <Card className={classes.card}>
        <CardHeader
          title="Schabowy"
          disableTypography
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
        />
        <CardMedia
          className={classes.media}
          image="https://material-ui.com/static/images/cards/paella.jpg"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Qwerty za qwerty qwerty a qwerty qwerty a qwerty qwerty aa qwerty
            qwerty qwerty g
          </Typography>
          <Chip label="Obiad" variant="outlined"></Chip>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardHeader title="Schabowy2" />
        <CardMedia
          className={classes.media}
          image="https://material-ui.com/static/images/cards/paella.jpg"
        />
      </Card>
      <Card className={classes.card}>
        <CardHeader title="Schabowy2" />
        <CardMedia
          className={classes.media}
          image="https://material-ui.com/static/images/cards/paella.jpg"
        />
      </Card>
      <Card className={classes.card}>
        <CardHeader title="Schabowy2" />
        <CardMedia
          className={classes.media}
          image="https://material-ui.com/static/images/cards/paella.jpg"
        />
      </Card>
      <Card className={classes.card}>
        <CardHeader title="Schabowy2" />
        <CardMedia
          className={classes.media}
          image="https://material-ui.com/static/images/cards/paella.jpg"
        />
      </Card>
      <Card className={classes.card}>
        <CardHeader title="Schabowy2" />
        <CardMedia
          className={classes.media}
          image="https://material-ui.com/static/images/cards/paella.jpg"
        />
      </Card>
    </div>
  );
};

export default Posilki;
