import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../config/config";
import classes from "./SprawdzanieMangi.module.scss";
import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import IManga from "../../../interfaces/apps/sprawdzanie-mangi/IManga";
import IChapter from "../../../interfaces/apps/sprawdzanie-mangi/IChapter";
import DodajMange from "./DodajMange/DodajMange";
import MangaItem from "./MangaItem/MangaItem";
import { sleepRand } from "../../Common/CommonHelper";

interface Props {}

const SprawdzanieMangi = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [mangi, setMangi] = useState<IManga[]>([]);
  const [dodawanieMangi, setDodawanieMangi] = useState(false);
  const [odswiezanaManga, setOdswiezanaManga] = useState("");

  useEffect(() => {
    getMangi();
  }, []);

  const getMangi = async () => {
    const responseManga = await fetch(`${BASE_URL}/apps/sprawdzanie-mangi/manga`);
    const dataMangi: IManga[] = await responseManga.json();

    for (const manga of dataMangi) {
      const responseChapter = await fetch(`${BASE_URL}/apps/sprawdzanie-mangi/manga/${manga._id}/chaptery`);
      const dataChaptery: IChapter[] = await responseChapter.json();
      manga.chaptery = dataChaptery;
    }

    setLoading(false);
    setMangi(dataMangi);
  };

  const onSprawdzMangiClick = async () => {
    for (const manga of mangi) {
      setOdswiezanaManga(manga._id!);
      await sleepRand(3000, 10000);
    }
  };

  return (
    <div className={classes.SprawdzanieMangi}>
      <Button className={classes.SprawdzMangi} variant="outlined" fullWidth onClick={onSprawdzMangiClick}>
        Sprawdź mangi
      </Button>
      <TableContainer>
        <Table className={classes.MangiTable}>
          <TableHead>
            <TableRow>
              <TableCell>Nazwa</TableCell>
              <TableCell>Ostatni przeczytany</TableCell>
              <TableCell>Najnowszy chapter</TableCell>
              <TableCell>Ostatnie odświeżenie</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.Test}>
            {mangi.map((manga) => (
              <MangaItem manga={manga} getMangi={getMangi} odswiezanaManga={odswiezanaManga} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {loading && (
        <div className={classes.ProgressWrapper}>
          <CircularProgress size={68} />
        </div>
      )}

      <DodajMange dodawanieState={[dodawanieMangi, setDodawanieMangi]} getMangi={getMangi} />
    </div>
  );
};

export default SprawdzanieMangi;