import ITag from "./ITag";

interface IPosilek {
  nazwa: string;
  zdjecie: string;
  uwagi: string;
  link: string;
  tagi: ITag[];
}

export default IPosilek;
