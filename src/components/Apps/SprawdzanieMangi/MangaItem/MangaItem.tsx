import React, { useEffect, useState } from "react";
import {
  IconButton,
  Link,
  MenuItem,
  Select,
  TableCell,
  TableRow,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import SyncIcon from "@material-ui/icons/Sync";
import IManga from "../../../../interfaces/apps/sprawdzanie-mangi/IManga";
// import classes from "./MangaItem.module.scss";
import IOdswiezenieMangiWynikDTO from "../../../../interfaces/apps/sprawdzanie-mangi/IOdswiezenieMangiWynikDTO";

interface Props {
  manga: IManga;
  getMangi: () => Promise<void>;
}

const MangaItem: React.FC<Props> = ({ manga, getMangi }) => {
  const [aktualnyChapter, setAktualnyChapter] = useState(manga.ostatniChapter);
  const [chaptery, setChaptery] = useState(manga.chaptery);
  const [ostatnieOdswiezenie, setOstatnieOdswiezenie] = useState(
    manga.ostatnieOdswiezenie
  );

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

  const zmienAktualnyChapter = async () => {
    const response = await fetch(
      `/apps/sprawdzanie-mangi/manga/${manga._id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ostatniChapter: aktualnyChapter }),
      }
    );

    const data: IManga = await response.json();

    manga.ostatniChapter = data.ostatniChapter;
  };

  const dajKolejnoscAktualnegoChaptera = () => {
    return chaptery.find(
      (chapter) => chapter.numer.localeCompare(aktualnyChapter) === 0
    )!.kolejnosc;
  };

  const onPrevChapterClick = () => {
    const kolejnoscAktualnegoChaptera = dajKolejnoscAktualnegoChaptera();

    const prevNumer = chaptery.find(
      (chapter) => chapter.kolejnosc === kolejnoscAktualnegoChaptera - 1
    )!.numer;

    setAktualnyChapter(prevNumer);
  };

  const onNextChapterClick = () => {
    const kolejnoscAktualnegoChaptera = dajKolejnoscAktualnegoChaptera();

    const nextNumer = chaptery.find(
      (chapter) => chapter.kolejnosc === kolejnoscAktualnegoChaptera + 1
    )!.numer;

    setAktualnyChapter(nextNumer);
  };

  const onChapterySelectChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setAktualnyChapter(event.target.value as string);
  };

  const onOdswiezChapterClick = async () => {
    const response = await fetch(
      `/apps/sprawdzanie-mangi/manga/${manga._id}/odswiez`
    );
    const data: IOdswiezenieMangiWynikDTO = await response.json();
    console.log(data);

    setOstatnieOdswiezenie(data.ostatnieOdswiezenie);
    setChaptery(data.chaptery);
  };

  const onUsunMangaClick = async () => {
    const response = await fetch(`/apps/sprawdzanie-mangi/manga/${manga._id}`, {
      method: "DELETE",
    });

    if (response.status === 201) {
      console.log("TODO: Snackbars po usnięciu mangi");
      getMangi();
    }
  };

  return (
    <TableRow key={manga._id}>
      <TableCell>
        <Link href={manga.url} target="_blank" rel="noopener noreferrer">
          {manga.nazwa}
        </Link>
      </TableCell>
      <TableCell>
        <IconButton onClick={onPrevChapterClick}>
          <RemoveIcon />
        </IconButton>
        <Select value={aktualnyChapter} onChange={onChapterySelectChange}>
          {chaptery.map((chapter) => (
            <MenuItem key={chapter._id} value={chapter.numer}>
              {chapter.numer}
            </MenuItem>
          ))}
        </Select>
        <IconButton onClick={onNextChapterClick}>
          <AddIcon />
        </IconButton>
      </TableCell>
      <TableCell>{chaptery[0].numer}</TableCell>
      <TableCell>{ostatnieOdswiezenie}</TableCell>
      <TableCell>
        <IconButton onClick={onOdswiezChapterClick}>
          <SyncIcon />
        </IconButton>
        <IconButton onClick={onPrevChapterClick}>
          <ChromeReaderModeIcon />
        </IconButton>
        <IconButton onClick={onUsunMangaClick}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default MangaItem;
