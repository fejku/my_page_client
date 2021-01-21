import IMangaSite from "../../../../interfaces/apps/sprawdzanie-mangi/IMangaSite";

export enum MANGA_SITE_HOSTNAME {
  MANGA_READER = "www.mangareader.net",
  MANGA_FANFOX = "fanfox.net",
  MANGA_SEE123 = "mangasee123.com",
  MANGA_TAAD = "www.taadd.com",
  MANGA_REAPER_SCANS = "reaperscans.com",
  MANGA_ASURA_SCANS = "asurascans.com",
}

export const mangaSiteList: IMangaSite[] = [
  {
    hostname: MANGA_SITE_HOSTNAME.MANGA_READER,
    ikona: `${process.env.PUBLIC_URL}/assets/images/apps/sprawdzanie-mangi/fav_manga_reader.ico`,
    nazwa: "Manga Reader",
  },
  {
    hostname: MANGA_SITE_HOSTNAME.MANGA_FANFOX,
    ikona: `${process.env.PUBLIC_URL}/assets/images/apps/sprawdzanie-mangi/fav_fan_fox.ico`,
    nazwa: "FanFox",
  },
  {
    hostname: MANGA_SITE_HOSTNAME.MANGA_SEE123,
    ikona: `${process.env.PUBLIC_URL}/assets/images/apps/sprawdzanie-mangi/fav_manga_see_123.png`,
    nazwa: "MangaSee123",
  },
  {
    hostname: MANGA_SITE_HOSTNAME.MANGA_TAAD,
    ikona: `${process.env.PUBLIC_URL}/assets/images/apps/sprawdzanie-mangi/fav_taad.ico`,
    nazwa: "Taad",
  },
  {
    hostname: MANGA_SITE_HOSTNAME.MANGA_REAPER_SCANS,
    ikona: `${process.env.PUBLIC_URL}/assets/images/apps/sprawdzanie-mangi/fav_reaper_scans.png`,
    nazwa: "Reaper Scans",
  },
  {
    hostname: MANGA_SITE_HOSTNAME.MANGA_ASURA_SCANS,
    ikona: `${process.env.PUBLIC_URL}/assets/images/apps/sprawdzanie-mangi/fav_asura_scans.png`,
    nazwa: "Asura Scans",
  },
];
