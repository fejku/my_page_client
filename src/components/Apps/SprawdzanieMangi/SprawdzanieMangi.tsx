import React, { useEffect, useState } from "react";
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
import DodajMange from "./DodajMange/DodajMange";
import MangaItem from "./MangaItem/MangaItem";
import { sleep } from "../../Common/CommonHelper";
import myAxios from "../../Common/AxiosHelper";
import IMangaWynikDTO from "../../../interfaces/apps/sprawdzanie-mangi/IMangaWynikDTO";

interface Props {}

const SprawdzanieMangi = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [mangi, setMangi] = useState<IMangaWynikDTO[]>([]);
  const [posortowaneMangi, setPosortowaneMangi] = useState<IMangaWynikDTO[]>([]);
  const [dodawanieMangi, setDodawanieMangi] = useState(false);
  const [odswiezanaManga, setOdswiezanaManga] = useState("");

  useEffect(() => {
    getMangi();
  }, []);

  useEffect(() => {
    const mangiCzytaneNowyChapter = mangi
      .filter(
        (m) => m.aktualnyChapter.localeCompare(m.najnowszyChapter) !== 0 && m.aktualnyChapter.localeCompare("-") !== 0
      )
      .sort(sortowanieMangiTytul);
    const mangiCzytaneNaBiezaco = mangi
      .filter(
        (m) => m.aktualnyChapter.localeCompare(m.najnowszyChapter) === 0 && m.aktualnyChapter.localeCompare("-") !== 0
      )
      .sort(sortowanieMangiTytul);
    const mangiNieZaczete = mangi.filter((m) => m.aktualnyChapter.localeCompare("-") === 0).sort(sortowanieMangiTytul);

    setPosortowaneMangi([...mangiCzytaneNowyChapter, ...mangiCzytaneNaBiezaco, ...mangiNieZaczete]);
  }, [mangi]);

  const sortowanieMangiTytul = (a: IMangaWynikDTO, b: IMangaWynikDTO) => {
    return a.tytul.localeCompare(b.tytul);
  };

  const getMangi = async () => {
    const responseManga = await myAxios.get(`/apps/sprawdzanie-mangi/manga`);
    const dataMangi: IMangaWynikDTO[] = responseManga.data;

    setMangi(dataMangi);
    setLoading(false);
  };

  const onSprawdzMangiClick = async () => {
    for (const manga of posortowaneMangi) {
      setOdswiezanaManga(manga._id!);
      await sleep(1000);
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
              <TableCell className={classes.IconHeader}></TableCell>
              <TableCell>Nazwa</TableCell>
              <TableCell>Ostatni przeczytany</TableCell>
              <TableCell>Najnowszy chapter</TableCell>
              <TableCell>Ostatnie odświeżenie</TableCell>
              <TableCell>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.Test}>
            {posortowaneMangi.map((manga) => (
              <MangaItem key={manga._id} manga={manga} getMangi={getMangi} odswiezanaManga={odswiezanaManga} />
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
