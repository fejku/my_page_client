import IChapter from "./IChapter";

interface IManga {
  _id?: string;
  user: string;
  tytul: string;
  okladka: string;
  url: string;
  aktualnyChapter: string;
  ostatnieOdswiezenie: Date;
  chaptery: IChapter[];
}

export default IManga;
