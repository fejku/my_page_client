import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import IManga from "../../../interfaces/apps/sprawdzanie-mangi/IManga";
import IChapter from "../../../interfaces/apps/sprawdzanie-mangi/IChapter";
import DodajMange from "./DodajMange/DodajMange";
import MangaItem from "./MangaItem/MangaItem";

interface Props {}

const SprawdzanieMangi = (props: Props) => {
  const [mangi, setMangi] = useState<IManga[]>([]);
  const [dodawanieMangi, setDodawanieMangi] = useState(false);

  useEffect(() => {
    getMangi();
  }, []);

  const getMangi = async () => {
    const responseManga = await fetch("/apps/sprawdzanie-mangi/manga");
    const dataMangi: IManga[] = await responseManga.json();

    for (const manga of dataMangi) {
      const responseChapter = await fetch(
        `/apps/sprawdzanie-mangi/manga/${manga._id}/chaptery`
      );
      const dataChaptery: IChapter[] = await responseChapter.json();
      manga.chaptery = dataChaptery;
    }

    setMangi(dataMangi);
  };

  return (
    <div>
      <Button variant="outlined" fullWidth>
        Sprawdź mangi
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nazwa</TableCell>
            <TableCell>Ostatni przeczytany</TableCell>
            <TableCell>Najnowszy chapter</TableCell>
            <TableCell>Ostatnie odświeżenie</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mangi.map((manga) => (
            <MangaItem manga={manga} getMangi={getMangi} />
          ))}
        </TableBody>
      </Table>

      <DodajMange
        dodawanieState={[dodawanieMangi, setDodawanieMangi]}
        getMangi={getMangi}
      />
    </div>
  );
};

export default SprawdzanieMangi;
