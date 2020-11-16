import ITag from "./ITag";

interface IPotrawa {
  _id?: string;
  nazwa: string;
  zdjecie: string;
  uwagi: string;
  link: string;
  tagi: ITag[];
}

export default IPotrawa;
