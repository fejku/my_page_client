import React, { useState } from "react";
import {
  Button,
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
import classes from "./MangaItem.module.scss";

interface Props {
  manga: IManga;
}

const MangaItem: React.FC<Props> = ({ manga }) => {
  const [aktualnyChapter, setAktualnyChapter] = useState(manga.ostatniChapter);

  const dajKolejnoscAktualnegoChaptera = () => {
    return manga.chaptery.find(
      (chapter) => chapter.numer.localeCompare(aktualnyChapter) === 0
    )!.kolejnosc;
  };

  const onPrevChapterClick = () => {
    const kolejnoscAktualnegoChaptera = dajKolejnoscAktualnegoChaptera();

    const prevNumer = manga.chaptery.find(
      (chapter) => chapter.kolejnosc === kolejnoscAktualnegoChaptera - 1
    )!.numer;

    setAktualnyChapter(prevNumer);
  };

  const onNextChapterClick = () => {
    const kolejnoscAktualnegoChaptera = dajKolejnoscAktualnegoChaptera();

    const nextNumer = manga.chaptery.find(
      (chapter) => chapter.kolejnosc === kolejnoscAktualnegoChaptera + 1
    )!.numer;

    setAktualnyChapter(nextNumer);
  };

  const onChapterySelectChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setAktualnyChapter(event.target.value as string);
  };

  const onUsunMangaClick = async () => {
    const response = await fetch(`/apps/sprawdzanie-mangi/manga/${manga._id}`, {
      method: "DELETE",
    });

    // const data: IPobieranieChapterowWynikDTO = await response.json();
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
          {manga.chaptery.map((chapter) => (
            <MenuItem key={chapter._id} value={chapter.numer}>
              {chapter.numer}
            </MenuItem>
          ))}
        </Select>
        <IconButton onClick={onNextChapterClick}>
          <AddIcon />
        </IconButton>
      </TableCell>
      <TableCell>{manga.chaptery[0].numer}</TableCell>
      <TableCell>{manga.ostatnieOdswiezenie}</TableCell>
      <TableCell>
        <IconButton onClick={onPrevChapterClick}>
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
