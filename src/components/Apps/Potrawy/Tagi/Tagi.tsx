import React from "react";
import ITag from "../../../../interfaces/apps/potrawy/ITag";
import DodajTag from "./DodajTag/DodajTag";
import Tag from "./Tag/Tag";
import classes from "./Tagi.module.css";

interface Props {
  tagi: ITag[];
  filtrTagiState: [ITag[], React.Dispatch<React.SetStateAction<ITag[]>>];
  setTagi?: React.Dispatch<React.SetStateAction<ITag[]>>;
}

const Tagi: React.FC<Props> = ({ tagi, filtrTagiState, setTagi }) => {
  return (
    <div className={classes.Tagi}>
      {tagi.map((tag) => (
        <Tag tag={tag} filtrTagiState={filtrTagiState} />
      ))}
      {Boolean(setTagi) && <DodajTag setTagi={setTagi!} />}
    </div>
  );
};

export default Tagi;
