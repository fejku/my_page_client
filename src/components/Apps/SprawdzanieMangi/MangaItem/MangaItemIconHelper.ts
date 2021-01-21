import IMangaSite from "../../../../interfaces/apps/sprawdzanie-mangi/IMangaSite";
import { mangaSiteList } from "../Common/MangaSite";

class MangaItemIconHelper {
  static dajIkone(url: string): string {
    const hostname = new URL(url).hostname;
    const site = mangaSiteList.find((i) => i.hostname.localeCompare(hostname) === 0);
    if (site) {
      return site.ikona;
    }
    return "";
  }

  static dajStrone(url: string): IMangaSite {
    const hostname = new URL(url).hostname;
    const site = mangaSiteList.find((i) => i.hostname.localeCompare(hostname) === 0);
    return site!;
  }
}

export default MangaItemIconHelper;
