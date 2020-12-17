import React, { useEffect, useState } from "react";
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
import IManga from "../../../../interfaces/apps/sprawdzanie-mangi/IManga";
import classes from "./DodajMange.module.scss";
import IPobieranieChapterowWynikDTO, {
  IPobieranieChapterowChapterDTO,
} from "../../../../interfaces/apps/sprawdzanie-mangi/IPobieranieChapterowWynikDTO";
import IZapisanieMangiKryteriaDTO from "../../../../interfaces/apps/sprawdzanie-mangi/IZapisanieMangiKryteriaDTO";

interface Props {
  setMangi: React.Dispatch<React.SetStateAction<IManga[]>>;
  dodawanieState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  zapiszMange: () => Promise<void>;
}

const DodajMange: React.FC<Props> = ({
  setMangi,
  dodawanieState: [dodawanieMangi, setDodawanieMangi],
  zapiszMange,
}) => {
  const [link, setLink] = useState("");
  const [nazwa, setNazwa] = useState("");
  const [chaptery, setChaptery] = useState<IPobieranieChapterowChapterDTO[]>(
    []
  );
  const [wybranyChapter, setWybranyChapter] = useState("");

  useEffect(() => {
    if (chaptery && chaptery.length > 0) {
      setWybranyChapter(chaptery[0].kolejnosc.toString());
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

    const response = await fetch("/apps/sprawdzanie-mangi/chapter/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    return chaptery.find(
      (chapter) =>
        chapter.kolejnosc.toString().localeCompare(wybranyChapter) === 0
    )!.numer;
  };

  const onDodajClick = async () => {
    setDodawanieMangi(false);

    const zapisanieMangiKryteriaDTO: IZapisanieMangiKryteriaDTO = {
      mangaNazwa: nazwa,
      mangaUrl: link,
      mangaAktualnyChapter: dajAktualnyChapter(),
      chaptery,
    };

    const response = await fetch("/apps/sprawdzanie-mangi/manga", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(zapisanieMangiKryteriaDTO),
    });

    const data = await response.json();
    console.log("TODO: Progress podczas dodawania");
    console.log("TODO: Snackbars po dodaniu mangi");
    console.log("Dodano mangę: ", data.mangaNazwa);

    await zapiszMange();
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
              <IconButton type="submit" onClick={onPobierzChapteryClick}>
                <AddBoxIcon />
              </IconButton>
            </div>
          </div>
          <div className={classes.Wrapper}>
            <span className={classes.Label}>Nazwa</span>
            <TextField
              variant="outlined"
              margin="dense"
              disabled
              value={nazwa}
            />
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
                chaptery.map((chapter) => (
                  <MenuItem key={chapter.kolejnosc} value={chapter.kolejnosc}>
                    {chapter.numer}
                  </MenuItem>
                ))}
            </Select>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onAnulujClick}>Anuluj</Button>
          <Button onClick={onDodajClick} disabled={czyZapiszAktywne()}>
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DodajMange;
