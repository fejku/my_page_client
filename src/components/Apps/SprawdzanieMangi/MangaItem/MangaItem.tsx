import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import moment from "moment";
import classes from "./MangaItem.module.scss";
import { IconButton, Link, MenuItem, Select, TableCell, TableRow } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import SyncIcon from "@material-ui/icons/Sync";
import IManga from "../../../../interfaces/apps/sprawdzanie-mangi/IManga";
import IOdswiezenieMangiWynikDTO from "../../../../interfaces/apps/sprawdzanie-mangi/IOdswiezenieMangiWynikDTO";
import { SnackBarContext } from "../../../../contexts/SnackBarContext";
import myAxios from "../../../Common/AxiosHelper";
import MangaItemIconHelper from "./MangaItemIconHelper";
import IChapter from "../../../../interfaces/apps/sprawdzanie-mangi/IChapter";

interface Props {
  manga: IManga;
  getMangi: () => Promise<void>;
  odswiezanaManga: string;
}

const MangaItem: React.FC<Props> = ({ manga, getMangi, odswiezanaManga }) => {
  const snackBarContext = useContext(SnackBarContext);

  const [aktualnyChapter, setAktualnyChapter] = useState(manga.aktualnyChapter);
  const [chaptery, setChaptery] = useState<IChapter[]>([]);
  const [chapteryDoSelecta, setChapteryDoSelecta] = useState<IChapter[]>([]);
  const [ostatnieOdswiezenie, setOstatnieOdswiezenie] = useState(manga.ostatnieOdswiezenie);
  const [odswiezanieWTrakcie, setOdswiezanieWTrakcie] = useState(false);

  useEffect(() => {
    if (manga._id) {
      getChaptery(manga._id);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (chaptery && chaptery.length > 0) {
      const chapteryPom = [...chaptery].reverse();
      chapteryPom.push({
        manga: "",
        url: "",
        dataDodania: "",
        numer: "-",
        kolejnosc: -1,
      });

      setChapteryDoSelecta(chapteryPom);
    }
  }, [chaptery]);

  useEffect(() => {
    if (manga && manga._id) {
      if (manga._id.localeCompare(odswiezanaManga) === 0) {
        odswiezMange();
      }
    }
  }, [odswiezanaManga]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    manga.ostatnieOdswiezenie = ostatnieOdswiezenie;
  }, [ostatnieOdswiezenie]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (manga.aktualnyChapter.localeCompare(aktualnyChapter) !== 0) {
      zmienAktualnyChapter();
    }
  }, [aktualnyChapter]); // eslint-disable-line react-hooks/exhaustive-deps

  const getChaptery = async (mangaId: string) => {
    const responseChapter = await myAxios.get(`/apps/sprawdzanie-mangi/manga/${manga._id}/chaptery`);
    const dataChaptery: IChapter[] = responseChapter.data;

    setChaptery(dataChaptery);
  };

  const czyAktualnyChapterNieUstawiony = () => {
    return aktualnyChapter.localeCompare("-") === 0;
  };

  const czyAktualnyChapterOstatni = () => {
    return aktualnyChapter.localeCompare(chaptery[chaptery.length - 1].numer) === 0;
  };

  const zmienAktualnyChapter = async () => {
    const response = await myAxios.put(`/apps/sprawdzanie-mangi/manga/${manga._id}/`, { aktualnyChapter });
    const data: IManga = response.data;
    manga.aktualnyChapter = data.aktualnyChapter;
  };

  const dajKolejnoscAktualnegoChaptera = () => {
    if (aktualnyChapter.localeCompare("-") === 0) {
      return -1;
    }

    return chaptery.find((chapter) => chapter.numer.localeCompare(aktualnyChapter) === 0)!.kolejnosc;
  };

  const odswiezMange = async () => {
    setOdswiezanieWTrakcie(true);
    const response = await myAxios.get(`/apps/sprawdzanie-mangi/manga/${manga._id}/odswiez`);
    const data: IOdswiezenieMangiWynikDTO = response.data;

    setOstatnieOdswiezenie(data.ostatnieOdswiezenie);
    setChaptery(data.chaptery);
    setOdswiezanieWTrakcie(false);
  };

  const onPrevChapterClick = () => {
    const kolejnoscAktualnegoChaptera = dajKolejnoscAktualnegoChaptera();

    if (kolejnoscAktualnegoChaptera === 0) {
      setAktualnyChapter("-");
    } else {
      const prevNumer = chaptery.find((chapter) => chapter.kolejnosc === kolejnoscAktualnegoChaptera - 1)!.numer;
      setAktualnyChapter(prevNumer);
    }
  };

  const onNextChapterClick = () => {
    const kolejnoscAktualnegoChaptera = dajKolejnoscAktualnegoChaptera();

    if (kolejnoscAktualnegoChaptera === -1) {
      const nextNumer = chaptery.find((chapter) => chapter.kolejnosc === 0)!.numer;
      setAktualnyChapter(nextNumer);
    } else {
      const nextNumer = chaptery.find((chapter) => chapter.kolejnosc === kolejnoscAktualnegoChaptera + 1)!.numer;
      setAktualnyChapter(nextNumer);
    }
  };

  const onChapterySelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAktualnyChapter(event.target.value as string);
  };

  const onOdswiezChapterClick = async () => {
    await odswiezMange();
  };

  const onCzytajChapterClick = () => {
    if (czyAktualnyChapterNieUstawiony()) {
      const urlChapter = chaptery.find((chapter) => chapter.kolejnosc === 0)!.url;
      window.open(urlChapter, "_blank");
    } else if (czyAktualnyChapterOstatni()) {
      const urlChapter = chaptery.find((chapter) => chapter.numer.localeCompare(aktualnyChapter) === 0)!.url;
      window.open(urlChapter, "_blank");
    } else {
      const kolejnosc = dajKolejnoscAktualnegoChaptera() + 1;
      const urlNastepny = chaptery.find((chapter) => chapter.kolejnosc === kolejnosc)!.url;
      window.open(urlNastepny, "_blank");
    }
  };

  const onUsunMangaClick = async () => {
    const response = await myAxios.delete(`/apps/sprawdzanie-mangi/manga/${manga._id}`);
    if (response.status === 201) {
      snackBarContext.show(`Usunięto mangę: ${manga.tytul}`);
      await getMangi();
    }
  };

  return (
    <TableRow
      key={manga._id}
      className={clsx(classes.MangaItem, {
        [classes.MangaItemNaBiezaco]: chaptery && chaptery.length > 0 && czyAktualnyChapterOstatni(),
        [classes.MangaNowa]: chaptery && chaptery.length > 0 && czyAktualnyChapterNieUstawiony(),
        [classes.OdswiezMangeRow]: odswiezanieWTrakcie,
      })}
    >
      <TableCell>
        <img className={classes.IkonaSerwisu} src={MangaItemIconHelper.dajIkone(manga.url)} alt=""></img>
      </TableCell>
      <TableCell>
        <Link className={classes.MangaItemLink} href={manga.url} target="_blank" rel="noopener noreferrer">
          {manga.tytul}
        </Link>
      </TableCell>
      <TableCell>
        {chapteryDoSelecta && chapteryDoSelecta.length > 0 ? (
          <div className={classes.ChapterSelectWrapper}>
            <IconButton color="primary" disabled={czyAktualnyChapterNieUstawiony()} onClick={onPrevChapterClick}>
              <RemoveIcon />
            </IconButton>

            <Select
              className={classes.ChapterSelect}
              variant="outlined"
              margin="dense"
              value={aktualnyChapter}
              onChange={onChapterySelectChange}
            >
              {chapteryDoSelecta.map((chapter) => (
                <MenuItem key={chapter.kolejnosc} className={classes.ChapterSelectItem} value={chapter.numer}>
                  {chapter.numer}
                </MenuItem>
              ))}
            </Select>
            <IconButton color="primary" disabled={czyAktualnyChapterOstatni()} onClick={onNextChapterClick}>
              <AddIcon />
            </IconButton>
          </div>
        ) : (
          <div>Ładowanie</div>
        )}
      </TableCell>
      <TableCell>
        {chaptery && chaptery.length > 0 ? chaptery[chaptery.length - 1].numer : <div>Ładowanie</div>}
      </TableCell>
      <TableCell>{moment.utc(ostatnieOdswiezenie).fromNow()}</TableCell>
      <TableCell>
        <div className={classes.MangaAkcje}>
          <IconButton
            className={clsx(classes.AkcjaButton, {
              [classes.OdswiezMangeRotate]: odswiezanieWTrakcie,
            })}
            color="primary"
            onClick={onOdswiezChapterClick}
          >
            <SyncIcon />
          </IconButton>
          <IconButton className={classes.AkcjaButton} color="primary" onClick={onCzytajChapterClick}>
            <ChromeReaderModeIcon />
          </IconButton>
          <IconButton className={classes.AkcjaButton} color="primary" onClick={onUsunMangaClick}>
            <DeleteIcon />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default MangaItem;
