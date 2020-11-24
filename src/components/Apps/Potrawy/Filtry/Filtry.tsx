import React from "react";
import { TextField } from "@material-ui/core";
import Tagi from "../Tagi/Tagi";
import classes from "./Filtry.module.css";
import ITag from "../../../../interfaces/apps/potrawy/ITag";

interface Props {
  tagi: ITag[];
  filtrNazwaState: [string, React.Dispatch<React.SetStateAction<string>>];
  filtrTagiState: [ITag[], React.Dispatch<React.SetStateAction<ITag[]>>];
}

const Filtry: React.FC<Props> = ({ tagi, filtrNazwaState: [filtrNazwa, setFiltrNazwa], filtrTagiState }) => {
  const onFiltrNazwaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiltrNazwa(event.target.value);
  };

  return (
    <div className={classes.Filtry}>
      <div className={classes.FiltrNazwa}>
        <TextField
          label="Nazwa potrawy..."
          value={filtrNazwa}
          onChange={onFiltrNazwaChange}
          variant="outlined"
          size="small"
          fullWidth
        />
      </div>
      <Tagi tagi={tagi} filtrTagiState={filtrTagiState} />
    </div>
  );
};

export default Filtry;
