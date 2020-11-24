import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import DodajButton from "../../../Common/DodajButton/DodajButton";
import IPotrawa from "../../../../interfaces/apps/potrawy/IPotrawa";
import ITag from "../../../../interfaces/apps/potrawy/ITag";
import EdytujPotraweHelper from "./EdytujPotraweHelper";
import Tagi from "../Tagi/Tagi";
import classes from "./EdytujPotrawe.module.scss";

interface Props {
  setPotrawy: React.Dispatch<React.SetStateAction<IPotrawa[]>>;
  tagiState: [ITag[], React.Dispatch<React.SetStateAction<ITag[]>>];
  dodawaniePotrawy: boolean;
  setDodawaniePotrawy: React.Dispatch<React.SetStateAction<boolean>>;
  edytowanaPotrawa: IPotrawa | undefined;
}

const EdytujPotrawe: React.FC<Props> = ({
  setPotrawy,
  tagiState: [tagi, setTagi],
  dodawaniePotrawy,
  setDodawaniePotrawy,
  edytowanaPotrawa,
}) => {
  const [nazwa, setNazwa] = useState("");
  const [zdjecieSrc, setZdjecieSrc] = useState("");
  const [pokazZdjecie, setPokazZdjecie] = useState(false);
  const [uwagi, setUwagi] = useState("");
  const [wybraneTagi, setWybraneTagi] = useState<ITag[]>([]);
  const [linkDoPrzepisu, setLinkDoPrzepisu] = useState("");

  useEffect(() => {
    pobierzTagi();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pobierzTagi = async () => {
    const response = await fetch("/apps/posilki/tagi");
    const data = await response.json();
    setTagi(data);
  };

  useEffect(() => {
    if (edytowanaPotrawa) {
      setNazwa(edytowanaPotrawa.nazwa);
      setZdjecieSrc(edytowanaPotrawa.zdjecie);
      setPokazZdjecie(Boolean(edytowanaPotrawa.zdjecie));
      setUwagi(edytowanaPotrawa.uwagi);
      setWybraneTagi(edytowanaPotrawa.tagi);
      setLinkDoPrzepisu(edytowanaPotrawa.link);
    }
  }, [edytowanaPotrawa]);

  const dajTytul = () => {
    if (edytowanaPotrawa) {
      return "Edycja potrawy";
    }
    return "Dodawanie potrawy";
  };

  const akceptujDodawaniePotrawy = async () => {
    const dodawanaPotrawa: IPotrawa = {
      nazwa,
      zdjecie: zdjecieSrc,
      uwagi,
      tagi: wybraneTagi,
      link: linkDoPrzepisu,
    };
    const dodanaPotrawa = await EdytujPotraweHelper.dodajPotrawe(dodawanaPotrawa);
    if (dodanaPotrawa) {
      setPotrawy((potrawy) => [...potrawy, dodanaPotrawa]);
      setDodawaniePotrawy(false);
    }
  };

  const akceptujEdycjePotrawy = async () => {
    const potrawaDoEdycji: IPotrawa = {
      _id: edytowanaPotrawa!._id,
      nazwa,
      zdjecie: zdjecieSrc,
      uwagi,
      tagi: wybraneTagi,
      link: linkDoPrzepisu,
    };
    const zedytowanaPotrawa = await EdytujPotraweHelper.edytujPotrawe(potrawaDoEdycji);

    if (zedytowanaPotrawa) {
      setPotrawy((potrawy) => [...potrawy.filter((p) => p._id !== zedytowanaPotrawa._id), zedytowanaPotrawa]);
      setDodawaniePotrawy(false);
    }
  };

  const onDodajPotrawe = () => {
    setDodawaniePotrawy(true);
  };

  const onNazwaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNazwa(event.target.value);
  };

  const onZdjecieSrcChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZdjecieSrc(event.target.value);
  };

  const onZdjecieSrcBlur = async () => {
    const isValidImg = await EdytujPotraweHelper.isImageExists(zdjecieSrc);
    if (isValidImg) {
      setPokazZdjecie(true);
    } else {
      setPokazZdjecie(false);
    }
  };

  const onUwagiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUwagi(event.target.value);
  };

  const onLinkDoPrzepisuChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkDoPrzepisu(event.target.value);
  };

  const onAnulujClick = () => {
    setDodawaniePotrawy(false);
  };

  const onDodajClick = async () => {
    if (edytowanaPotrawa) {
      await akceptujEdycjePotrawy();
    } else {
      await akceptujDodawaniePotrawy();
    }
  };

  return (
    <div>
      <DodajButton onDodaj={onDodajPotrawe} />
      <Dialog fullWidth maxWidth={"sm"} open={dodawaniePotrawy}>
        <DialogTitle>{dajTytul()}</DialogTitle>
        <DialogContent dividers>
          <form className={classes.root}>
            <div>
              <TextField label="Nazwa potrawy" value={nazwa} onChange={onNazwaChange} fullWidth />
            </div>
            <div>
              <TextField
                label="Link do zdjęcia"
                value={zdjecieSrc}
                onChange={onZdjecieSrcChange}
                onBlur={onZdjecieSrcBlur}
                fullWidth
              />
            </div>
            <div
              className={clsx(classes.zdjecie, {
                [classes.zdjecieImg]: pokazZdjecie,
                [classes.brakZdjecia]: !pokazZdjecie,
              })}
              style={{
                backgroundImage: pokazZdjecie ? `url(${zdjecieSrc})` : "",
              }}
            >
              {!pokazZdjecie && <PhotoCameraIcon />}
            </div>
            <div>
              <TextField label="Uwagi" value={uwagi} onChange={onUwagiChange} fullWidth />
            </div>
            <Tagi tagi={tagi} filtrTagiState={[wybraneTagi, setWybraneTagi]} setTagi={setTagi} />
            <div>
              <TextField label="Link do przepisu" value={linkDoPrzepisu} onChange={onLinkDoPrzepisuChange} fullWidth />
            </div>
          </form>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={onAnulujClick}>Anuluj</Button>
          <Button onClick={onDodajClick}>Zapisz</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EdytujPotrawe;
