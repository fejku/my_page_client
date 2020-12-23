import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import { BASE_URL } from "../../../../config/config";
import classes from "./DodajMange.module.scss";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DodajButton from "../../../Common/DodajButton/DodajButton";
import IPobieranieChapterowWynikDTO, {
  IPobieranieChapterowChapterDTO,
} from "../../../../interfaces/apps/sprawdzanie-mangi/IPobieranieChapterowWynikDTO";
import IZapisanieMangiKryteriaDTO from "../../../../interfaces/apps/sprawdzanie-mangi/IZapisanieMangiKryteriaDTO";
import { SnackBarContext } from "../../../../contexts/SnackBarContext";
import AuthHeader from "../../../../services/AuthHeader";

interface Props {
  dodawanieState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  getMangi: () => Promise<void>;
}

const DodajMange: React.FC<Props> = ({ dodawanieState: [dodawanieMangi, setDodawanieMangi], getMangi }) => {
  const snackBarContext = useContext(SnackBarContext);

  const [link, setLink] = useState("");
  const [nazwa, setNazwa] = useState("");
  const [chaptery, setChaptery] = useState<IPobieranieChapterowChapterDTO[]>([]);
  const [wybranyChapter, setWybranyChapter] = useState("");

  useEffect(() => {
    if (chaptery && chaptery.length > 0) {
      setWybranyChapter(chaptery[chaptery.length - 1].kolejnosc.toString());
    }
  }, [chaptery]);

  const onDodajMange = () => {
    setDodawanieMangi(true);
  };

  const onLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const onPobierzChapteryClick = async () => {
    setWybranyChapter("");

    const response = await fetch(`${BASE_URL}/apps/sprawdzanie-mangi/chapter/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...AuthHeader.getAuthHeader(),
      },
      body: JSON.stringify({ url: link }),
    });

    const data: IPobieranieChapterowWynikDTO = await response.json();

    setNazwa(data.nazwaMangi);
    setChaptery(data.chaptery);
  };

  const onChapterChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setWybranyChapter(event.target.value as string);
  };

  const czyZapiszAktywne = () => {
    return !(chaptery && chaptery.length > 0);
  };

  const onAnulujClick = () => {
    setDodawanieMangi(false);
  };

  const dajAktualnyChapter = () => {
    return chaptery.find((chapter) => chapter.kolejnosc.toString().localeCompare(wybranyChapter) === 0)!.numer;
  };

  const wyszyscForme = () => {
    setLink("");
    setNazwa("");
    setChaptery([]);
    setWybranyChapter("");
  };

  const onDodajClick = async () => {
    setDodawanieMangi(false);
    wyszyscForme();

    snackBarContext.show(`Dodawanie mangi: ${nazwa}`, "info");

    const zapisanieMangiKryteriaDTO: IZapisanieMangiKryteriaDTO = {
      mangaNazwa: nazwa,
      mangaUrl: link,
      mangaAktualnyChapter: dajAktualnyChapter(),
      chaptery,
    };

    const response = await fetch(`${BASE_URL}/apps/sprawdzanie-mangi/manga`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...AuthHeader.getAuthHeader(),
      },
      body: JSON.stringify(zapisanieMangiKryteriaDTO),
    });

    const data = await response.json();

    console.log("TODO: Progress podczas dodawania");

    snackBarContext.show(`Dodano mangę: ${data.mangaNazwa}`);
    await getMangi();
  };

  return (
    <div>
      <DodajButton onDodaj={onDodajMange} />
      <Dialog fullWidth maxWidth={"sm"} open={dodawanieMangi}>
        <DialogTitle>Dodawanie mangi</DialogTitle>
        <DialogContent dividers>
          <div className={classes.Wrapper}>
            <span className={classes.Label}>Url</span>
            <div className={classes.Link}>
              <InputBase
                className={classes.LinkInput}
                placeholder="Link do mangi"
                value={link}
                onChange={onLinkChange}
              />
              <IconButton
                className={clsx({ [classes.LinkButton]: link })}
                type="submit"
                onClick={onPobierzChapteryClick}
              >
                <AddBoxIcon />
              </IconButton>
            </div>
          </div>
          <div className={classes.Wrapper}>
            <span className={classes.Label}>Nazwa</span>
            <TextField variant="outlined" margin="dense" disabled value={nazwa} />
          </div>
          <div className={classes.Wrapper}>
            <span className={classes.Label}>Chaptery</span>
            <Select
              className={classes.ChapterSelect}
              variant="outlined"
              margin="dense"
              value={wybranyChapter}
              onChange={onChapterChange}
            >
              {chaptery &&
                chaptery.reverse().map((chapter) => (
                  <MenuItem key={chapter.kolejnosc} value={chapter.kolejnosc}>
                    {chapter.numer}
                  </MenuItem>
                ))}
            </Select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onAnulujClick}>Anuluj</Button>
          <Button className={classes.ButtonZapisz} onClick={onDodajClick} disabled={czyZapiszAktywne()}>
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DodajMange;
