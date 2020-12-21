import React, { useContext, useEffect, useState } from "react";
import clsx from "clsx";
import moment from "moment";
import { BASE_URL } from "../../../../config/config";
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

interface Props {
  manga: IManga;
  getMangi: () => Promise<void>;
  odswiezanaManga: string;
}

const MangaItem: React.FC<Props> = ({ manga, getMangi, odswiezanaManga }) => {
  const snackBarContext = useContext(SnackBarContext);

  const [aktualnyChapter, setAktualnyChapter] = useState(manga.ostatniChapter);
  const [chaptery, setChaptery] = useState(manga.chaptery);
  const [ostatnieOdswiezenie, setOstatnieOdswiezenie] = useState(manga.ostatnieOdswiezenie);
  const [odswiezanieWTrakcie, setOdswiezanieWTrakcie] = useState(false);

  useEffect(() => {
    if (manga && manga._id) {
      if (manga._id.localeCompare(odswiezanaManga) === 0) {
        odswiezMange();
      }
    }
  }, [odswiezanaManga]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    manga.chaptery = chaptery;
  }, [chaptery]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    manga.ostatnieOdswiezenie = ostatnieOdswiezenie;
  }, [ostatnieOdswiezenie]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (manga.ostatniChapter.localeCompare(aktualnyChapter) !== 0) {
      zmienAktualnyChapter();
    }
  }, [aktualnyChapter]); // eslint-disable-line react-hooks/exhaustive-deps

  const czyMangaNaBiezaco = () => {
    return aktualnyChapter.localeCompare(chaptery[0].numer) === 0;
  };

  const czyAktualnyChapterPierwszy = () => {
    return aktualnyChapter.localeCompare(chaptery[chaptery.length - 1].numer) === 0;
  };

  const czyAktualnyChapterOstatni = () => {
    return aktualnyChapter.localeCompare(chaptery[0].numer) === 0;
  };

  const zmienAktualnyChapter = async () => {
    const response = await fetch(`${BASE_URL}/apps/sprawdzanie-mangi/manga/${manga._id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ostatniChapter: aktualnyChapter }),
    });

    const data: IManga = await response.json();

    manga.ostatniChapter = data.ostatniChapter;
  };

  const dajKolejnoscAktualnegoChaptera = () => {
    return chaptery.find((chapter) => chapter.numer.localeCompare(aktualnyChapter) === 0)!.kolejnosc;
  };

  const odswiezMange = async () => {
    setOdswiezanieWTrakcie(true);

    const response = await fetch(`${BASE_URL}/apps/sprawdzanie-mangi/manga/${manga._id}/odswiez`);
    const data: IOdswiezenieMangiWynikDTO = await response.json();
    console.log(data);

    setOstatnieOdswiezenie(data.ostatnieOdswiezenie);
    setChaptery(data.chaptery);
    setOdswiezanieWTrakcie(false);
  };

  const onPrevChapterClick = () => {
    const kolejnoscAktualnegoChaptera = dajKolejnoscAktualnegoChaptera();

    const prevNumer = chaptery.find((chapter) => chapter.kolejnosc === kolejnoscAktualnegoChaptera - 1)!.numer;

    setAktualnyChapter(prevNumer);
  };

  const onNextChapterClick = () => {
    const kolejnoscAktualnegoChaptera = dajKolejnoscAktualnegoChaptera();

    const nextNumer = chaptery.find((chapter) => chapter.kolejnosc === kolejnoscAktualnegoChaptera + 1)!.numer;

    setAktualnyChapter(nextNumer);
  };

  const onChapterySelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAktualnyChapter(event.target.value as string);
  };

  const onOdswiezChapterClick = async () => {
    await odswiezMange();
  };

  const onCzytajChapterClick = () => {
    if (czyAktualnyChapterPierwszy() || czyAktualnyChapterOstatni()) {
      const urlChapter = chaptery.find((chapter) => chapter.numer.localeCompare(aktualnyChapter) === 0)!.url;

      window.open(urlChapter, "_blank");
    } else {
      const kolejnosc = dajKolejnoscAktualnegoChaptera() + 1;

      const urlNastepny = chaptery.find((chapter) => chapter.kolejnosc === kolejnosc)!.url;
      window.open(urlNastepny, "_blank");
    }
  };

  const onUsunMangaClick = async () => {
    const response = await fetch(`${BASE_URL}/apps/sprawdzanie-mangi/manga/${manga._id}`, {
      method: "DELETE",
    });

    if (response.status === 201) {
      snackBarContext.show(`Usunięto mangę: ${manga.nazwa}`);
      await getMangi();
    }
  };

  return (
    <TableRow
      key={manga._id}
      className={clsx(classes.MangaItem, {
        [classes.MangaItemNaBiezaco]: czyMangaNaBiezaco(),
      })}
    >
      <TableCell>
        <Link className={classes.MangaItemLink} href={manga.url} target="_blank" rel="noopener noreferrer">
          {manga.nazwa}
        </Link>
      </TableCell>
      <TableCell>
        <div className={classes.ChapterSelectWrapper}>
          <IconButton color="primary" disabled={czyAktualnyChapterPierwszy()} onClick={onPrevChapterClick}>
            <RemoveIcon />
          </IconButton>
          <Select
            className={classes.ChapterSelect}
            variant="outlined"
            margin="dense"
            value={aktualnyChapter}
            onChange={onChapterySelectChange}
          >
            {chaptery.map((chapter) => (
              <MenuItem key={chapter._id} className={classes.ChapterSelectItem} value={chapter.numer}>
                {chapter.numer}
              </MenuItem>
            ))}
          </Select>
          <IconButton color="primary" disabled={czyAktualnyChapterOstatni()} onClick={onNextChapterClick}>
            <AddIcon />
          </IconButton>
        </div>
      </TableCell>
      <TableCell>{chaptery[0].numer}</TableCell>
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
