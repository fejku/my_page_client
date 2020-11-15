import React, { useEffect, useState } from "react";
import IPosilek from "../../../interfaces/apps/posilki/IPosilek";
import Posilek from "./Posilek/Posilek";
import classes from "./Posilki.module.css";

interface Props {}

const Posilki = (props: Props) => {
  const [posilki, setPosilki] = useState<IPosilek[]>([]);

  useEffect(() => {
    getPosilki();
  }, []);

  const getPosilki = async () => {
    const response = await fetch("/apps/posilki");
    const data = await response.json();
    setPosilki(data);
  };

  return (
    <div className={classes.Posilki}>
      {posilki.map((posilek) => (
        <Posilek posilek={posilek} />
      ))}
    </div>
  );
};

export default Posilki;
