enum HOSTNAME {
  MANGA_READER = "www.mangareader.net",
  MANGA_FANFOX = "fanfox.net",
  MANGA_SEE123 = "mangasee123.com",
  MANGA_TAAD = "www.taadd.com",
}

const ikony = [
  {
    hostname: HOSTNAME.MANGA_READER,
    ikona: `${process.env.PUBLIC_URL}/assets/images/apps/sprawdzanie-mangi/fav_manga_reader.ico`,
  },
  {
    hostname: HOSTNAME.MANGA_FANFOX,
    ikona: `${process.env.PUBLIC_URL}/assets/images/apps/sprawdzanie-mangi/fav_fan_fox.ico`,
  },
  {
    hostname: HOSTNAME.MANGA_SEE123,
    ikona: `${process.env.PUBLIC_URL}/assets/images/apps/sprawdzanie-mangi/fav_manga_see_123.png`,
  },
  {
    hostname: HOSTNAME.MANGA_TAAD,
    ikona: `${process.env.PUBLIC_URL}/assets/images/apps/sprawdzanie-mangi/fav_taad.ico`,
  },
];

class MangaItemIconHelper {
  static dajIkone(url: string): string {
    const hostname = new URL(url).hostname;
    const ikona = ikony.find((i) => i.hostname.localeCompare(hostname) === 0);
    if (ikona) {
      return ikona.ikona;
    }
    return "";
  }
}

export default MangaItemIconHelper;
