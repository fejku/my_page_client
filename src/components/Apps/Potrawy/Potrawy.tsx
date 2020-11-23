import React, { useEffect, useState } from "react";
import IPotrawa from "../../../interfaces/apps/potrawy/IPotrawa";
import EdytujPotrawe from "./EdytujPotrawe/EdytujPotrawe";
import Potrawa from "./Potrawa/Potrawa";
import ITag from "../../../interfaces/apps/potrawy/ITag";
import PotrawyHelper from "./PotrawyHelper";
import Filtry from "./Filtry/Filtry";
import classes from "./Potrawy.module.css";

interface Props {}

const Potrawy = (props: Props) => {
  const [dodawaniePotrawy, setDodawaniePotrawy] = useState(false);
  const [potrawy, setPotrawy] = useState<IPotrawa[]>([]);
  const [filtrNazwa, setFiltrNazwa] = useState("");
  const [filtrTagi, setFiltrTagi] = useState<ITag[]>([]);
  const [przefiltrowanePotrawy, setPrzefiltrowanePotrawy] = useState<IPotrawa[]>([]);

  useEffect(() => {
    getPotrawy();
  }, []);

  useEffect(() => {
    ustawPrzefiltrowanePotrawy();
  }, [potrawy, filtrNazwa, filtrTagi]); // eslint-disable-line react-hooks/exhaustive-deps

  const getPotrawy = async () => {
    const response = await fetch("/apps/posilki/potrawy");
    const data = await response.json();
    setPotrawy(data);
  };

  const ustawPrzefiltrowanePotrawy = () => {
    setPrzefiltrowanePotrawy(PotrawyHelper.dajPrzefiltrowanePotrawy(potrawy, filtrNazwa, filtrTagi));
  };

  return (
    <div className={classes.Potrawy}>
      <Filtry
        potrawy={potrawy}
        filtrNazwaState={[filtrNazwa, setFiltrNazwa]}
        filtrTagiState={[filtrTagi, setFiltrTagi]}
      />
      <div className={classes.ListaPotraw}>
        {przefiltrowanePotrawy.map((potrawa) => (
          <Potrawa
            key={potrawa._id}
            potrawa={potrawa}
            setPotrawy={setPotrawy}
            setDodawaniePotrawy={setDodawaniePotrawy}
          />
        ))}
      </div>
      <EdytujPotrawe
        setPotrawy={setPotrawy}
        dodawaniePotrawy={dodawaniePotrawy}
        setDodawaniePotrawy={setDodawaniePotrawy}
      />
    </div>
  );
};

export default Potrawy;
