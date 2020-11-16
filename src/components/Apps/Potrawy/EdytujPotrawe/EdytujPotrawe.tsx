import React, { useState } from "react";
import clsx from "clsx";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import DodajButton from "../../../Common/DodajButton/DodajButton";
import IPotrawa from "../../../../interfaces/apps/potrawy/IPotrawa";
import ITag from "../../../../interfaces/apps/potrawy/ITag";
import EdytujPotraweHelper from "./EdytujPotraweHelper";
import classes from "./EdytujPotrawe.module.css";

interface Props {
  setPotrawy: React.Dispatch<React.SetStateAction<IPotrawa[]>>;
}

const EdytujPotrawe: React.FC<Props> = ({ setPotrawy }) => {
  const [dodawaniePotrawy, setDodawaniePotrawy] = useState(false);
  const [nazwa, setNazwa] = useState("");
  const [zdjecieSrc, setZdjecieSrc] = useState("");
  const [pokazZdjecie, setPokazZdjecie] = useState(false);
  const [uwagi, setUwagi] = useState("");
  const [tagi, setTagi] = useState<ITag[]>([]);
  const [wybraneTagi, setWybraneTagi] = useState<ITag[]>([]);
  const [linkDoPrzepisu, setLinkDoPrzepisu] = useState("");

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

  const onTagiChange = (event: any, values: ITag[]) => {
    setWybraneTagi(values);
  };

  const onTagiInputKeyDown = async (event: any) => {
    const value = event.target.value;
    if (event.key === "Enter" && value) {
      const wyszukanyTag = tagi.find((tag) => tag.nazwa === value);

      if (wyszukanyTag) {
        const wyszukanyWybranyTag = wybraneTagi.find(
          (tag) => tag.nazwa === value
        );
        if (!wyszukanyWybranyTag) {
          setWybraneTagi([...wybraneTagi, wyszukanyTag]);
        }
      } else {
        const noweTagi = await EdytujPotraweHelper.dodajNowyTag(value);

        const dodanyTag = noweTagi.find((tag) => tag.nazwa === value);
        if (dodanyTag) {
          console.log(wybraneTagi);
          setWybraneTagi((prevTagi) => [...prevTagi, dodanyTag]);
        }
        setTagi(noweTagi);
      }
    }
  };

  const onLinkDoPrzepisuChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLinkDoPrzepisu(event.target.value);
  };

  const onAnulujClick = () => {
    setDodawaniePotrawy(false);
  };

  const onDodajClick = () => {
    // const dodawanaPotrawa: Potrawa = {
    //   nazwa,
    //   zdjecie: zdjecieSrc,
    //   uwagi,
    //   tagi: wybraneTagi,
    //   link: linkDoPrzepisu,
    // };
    // const nowePotrawy = await EditDishHelper.dodajPotrawe(dodawanaPotrawa);
    // setPotrawy(nowePotrawy);
    // setDodawanieWagi(false);
  };

  return (
    <div>
      <DodajButton onDodaj={onDodajPotrawe} />
      <Dialog fullWidth maxWidth={"sm"} open={dodawaniePotrawy}>
        <DialogTitle>Dodaj potrawę</DialogTitle>
        <DialogContent dividers>
          <form className={classes.root}>
            <div>
              <TextField
                label="Nazwa potrawy"
                value={nazwa}
                onChange={onNazwaChange}
                fullWidth
              />
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
            >
              {!pokazZdjecie && <PhotoCameraIcon />}
            </div>
            <div>
              <TextField
                label="Uwagi"
                value={uwagi}
                onChange={onUwagiChange}
                fullWidth
              />
            </div>
            {/* <Autocomplete
              multiple
              limitTags={2}
              options={EdytujPotraweHelper.dajNieWybraneTagi(tagi, wybraneTagi)}
              getOptionLabel={(tag) => tag.nazwa}
              value={wybraneTagi}
              onChange={onTagiChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tagi"
                  placeholder="Obiad"
                  onKeyDown={onTagiInputKeyDown}
                />
              )}
            /> */}
            <div>
              <TextField
                label="Link do przepisu"
                value={linkDoPrzepisu}
                onChange={onLinkDoPrzepisuChange}
                fullWidth
              />
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
