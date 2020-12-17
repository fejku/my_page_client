import IChapter from "./IChapter";

interface IManga {
  _id?: string;
  nazwa: string;
  url: string;
  user: string;
  ostatniChapter: string;
  ostatnieOdswiezenie: Date;
  chaptery: IChapter[];
}

export default IManga;
