import IPotrawa from "../../../interfaces/apps/potrawy/IPotrawa";
import ITag from "../../../interfaces/apps/potrawy/ITag";

export default class PotrawyHelper {
  // public static dajTagiDoWyszukiwania = (potrawy: Potrawa[]) => {
  //   const result: Tag[] = [];
  //   for (let i = 0; i < potrawy.length; i++) {
  //     const potrawa = potrawy[i];
  //     for (let j = 0; j < potrawa.tagi.length; j++) {
  //       const tag = potrawa.tagi[j];
  //       const czyTagNaLiscie = result.some((r) => r._id === tag._id);

  //       if (!czyTagNaLiscie) {
  //         result.push(tag);
  //       }
  //     }
  //   }
  //   return result;
  // };

  private static dajPotrawyPasujaceDoTagow = (potrawy: IPotrawa[], filtTagi: ITag[]) => {
    const result: IPotrawa[] = [];
    for (let i = 0; i < potrawy.length; i++) {
      const potrawa = potrawy[i];
      for (let j = 0; j < potrawa.tagi.length; j++) {
        const tag = potrawa.tagi[j];
        const czyPasuje = filtTagi.map((filtTag) => filtTag.nazwa).includes(tag.nazwa);

        if (czyPasuje) {
          result.push(potrawa);
          break;
        }
      }
    }
    return result;
  };

  public static dajPrzefiltrowanePotrawy = (potrawy: IPotrawa[], filtrNazwa: string, filtrTagi: ITag[]) => {
    let result = [...potrawy];

    if (filtrNazwa) {
      result = result.filter((potrawa) => potrawa.nazwa.toLowerCase().includes(filtrNazwa.toLowerCase()));
    }

    if (filtrTagi.length > 0) {
      result = PotrawyHelper.dajPotrawyPasujaceDoTagow(result, filtrTagi);
    }

    return result;
  };
}
