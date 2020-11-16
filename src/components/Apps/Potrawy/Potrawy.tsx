import React, { useEffect, useState } from "react";
import IPotrawa from "../../../interfaces/apps/potrawy/IPotrawa";
import EdytujPotrawe from "./EdytujPotrawe/EdytujPotrawe";
import Potrawa from "./Potrawa/Potrawa";
import classes from "./Potrawy.module.css";

interface Props {}

const Potrawy = (props: Props) => {
  const [potrawy, setPotrawy] = useState<IPotrawa[]>([]);

  useEffect(() => {
    getPotrawy();
  }, []);

  const getPotrawy = async () => {
    const response = await fetch("/apps/posilki/potrawy");
    const data = await response.json();
    setPotrawy(data);
  };

  return (
    <div className={classes.Potrawy}>
      {potrawy.map((potrawa) => (
        <Potrawa key={potrawa._id} potrawa={potrawa} />
      ))}
      <EdytujPotrawe setPotrawy={setPotrawy} />
    </div>
  );
};

export default Potrawy;
