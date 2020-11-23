import React, { useEffect, useState } from "react";
import ITag from "../../../../interfaces/apps/potrawy/ITag";
import Tag from "./Tag/Tag";
import classes from "./Tagi.module.css";

interface Props {
  filtrTagiState: [ITag[], React.Dispatch<React.SetStateAction<ITag[]>>];
}

const Tagi: React.FC<Props> = ({ filtrTagiState }) => {
  const [tagi, setTagi] = useState<ITag[]>([]);

  useEffect(() => {
    getTagi();
  }, []);

  const getTagi = async () => {
    const response = await fetch("/apps/posilki/tagi");
    const data = await response.json();
    setTagi(data);
  };

  return (
    <div className={classes.Tagi}>
      {tagi.map((tag) => (
        <Tag tag={tag} filtrTagiState={filtrTagiState} />
      ))}
    </div>
  );
};

export default Tagi;
