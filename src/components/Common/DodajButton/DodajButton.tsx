import React from "react";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import classes from "./DodajButton.module.css";

interface Props {
  onDodaj: () => void;
}

const DodajButton: React.FC<Props> = ({ onDodaj }) => {
  return (
    <Fab className={classes.Fab} color="secondary" onClick={onDodaj}>
      <AddIcon />
    </Fab>
  );
};

export default DodajButton;
