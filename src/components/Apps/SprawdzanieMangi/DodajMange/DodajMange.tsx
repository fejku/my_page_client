import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
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
  Tooltip,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import DodajButton from "../../../Common/DodajButton/DodajButton";
import IZapisanieMangiKryteriaDTO, {
  IZapisanieMangiKryteriaDTOManga,
} from "../../../../interfaces/apps/sprawdzanie-mangi/IZapisanieMangiKryteriaDTO";
import { SnackBarContext } from "../../../../contexts/SnackBarContext";
import myAxios from "../../../Common/AxiosHelper";
import IPobieranieMangiWynikDTO, {
  IPobieranieMangiWynikDTOChapter,
} from "../../../../interfaces/apps/sprawdzanie-mangi/IPobieranieMangiWynikDTO";
import IPobieranieMangiKryteriaDTO from "../../../../interfaces/apps/sprawdzanie-mangi/IPobieranieMangiKryteriaDTO";
import { mangaSiteList } from "../Common/MangaSite";

interface Props {
  dodawanieState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  getMangi: () => Promise<void>;
}

const DodajMange: React.FC<Props> = ({ dodawanieState: [dodawanieMangi, setDodawanieMangi], getMangi }) => {
  const snackBarContext = useContext(SnackBarContext);

  const [url, setUrl] = useState("");
  const [tytul, setTytul] = useState("");
  const [okladka, setOkladka] = useState("");
  const [chaptery, setChaptery] = useState<IPobieranieMangiWynikDTOChapter[]>([]);
  const [wybranyChapter, setWybranyChapter] = useState("");

  useEffect(() => {
    if (chaptery && chaptery.length > 0) {
      setWybranyChapter(chaptery[chaptery.length - 1].kolejnosc.toString());
    }
  }, [chaptery]);

  const onDodajMange = () => {
    setDodawanieMangi(true);
  };

  const onUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const onPobierzDaneMangiClick = async () => {
    setWybranyChapter("");

    const kryteria: IPobieranieMangiKryteriaDTO = { url };
    const response = await myAxios.post(`/apps/sprawdzanie-mangi/manga/pobierz-dane`, kryteria);
    const data: IPobieranieMangiWynikDTO = response.data;

    setTytul(data.manga.tytul);
    setChaptery(data.chaptery);
    setOkladka(data.manga.okladka);
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
    if ("-1".localeCompare(wybranyChapter) === 0) {
      return "-";
    }
    return chaptery.find((chapter) => chapter.kolejnosc.toString().localeCompare(wybranyChapter) === 0)!.numer;
  };

  const wyczyscForme = () => {
    setUrl("");
    setTytul("");
    setChaptery([]);
    setWybranyChapter("");
  };

  const onDodajClick = async () => {
    const zapisanieMangiKryteriaDTOManga: IZapisanieMangiKryteriaDTOManga = {
      tytul,
      okladka,
      url,
      aktualnyChapter: dajAktualnyChapter(),
    };

    const zapisanieMangiKryteriaDTO: IZapisanieMangiKryteriaDTO = {
      manga: zapisanieMangiKryteriaDTOManga,
      chaptery,
    };

    setDodawanieMangi(false);
    wyczyscForme();

    snackBarContext.show(`Dodawanie mangi: ${tytul}`, "info");

    const response = await myAxios.post(`/apps/sprawdzanie-mangi/manga`, zapisanieMangiKryteriaDTO);
    const data = response.data;

    snackBarContext.show(`Dodano mangę: ${data.tytul}`);
    await getMangi();
  };

  const dajChapteryDoSelect = () => {
    const chapteryDoSelecta = [...chaptery].reverse();
    chapteryDoSelecta.push({
      url: "",
      dataDodania: "",
      numer: "-",
      kolejnosc: -1,
    });
    return chapteryDoSelecta;
  };

  return (
    <div>
      <DodajButton onDodaj={onDodajMange} />
      <Dialog fullWidth maxWidth={"sm"} open={dodawanieMangi}>
        <DialogTitle>Dodawanie mangi</DialogTitle>
        <DialogContent dividers>
          <div className={classes.Wrapper}>
            <span className={classes.Label}>Strony</span>
            <div className={classes.IkonySerwisow}>
              {mangaSiteList.map((mangaSite) => (
                <Tooltip title={mangaSite.nazwa}>
                  <img className={classes.IkonaSerwisu} src={mangaSite.ikona} alt={mangaSite.nazwa} />
                </Tooltip>
              ))}
            </div>
          </div>
          <div className={classes.Wrapper}>
            <span className={classes.Label}>Url</span>
            <div className={classes.Url}>
              <InputBase
                className={classes.UrlInput}
                placeholder={`URL np: "https://mangasee123.com/manga/Kill-The-Hero"`}
                value={url}
                onChange={onUrlChange}
              />
              <IconButton
                className={clsx({ [classes.UrlButton]: url })}
                type="submit"
                onClick={onPobierzDaneMangiClick}
              >
                <AddBoxIcon />
              </IconButton>
            </div>
          </div>
          <div className={classes.Wrapper}>
            <span className={classes.Label}>Nazwa</span>
            <TextField className={classes.TytulInput} variant="outlined" margin="dense" disabled value={tytul} />
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
                dajChapteryDoSelect().map((chapter) => (
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
