import IApp from "../../interfaces/IApp";
import Posilki from "../Apps/Posilki/Posilki";

export const gameList: IApp[] = [
  {
    tytul: "Onitama",
    link: "onitama",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Posilki,
  },
  {
    tytul: "Kółko i krzyżyk",
    link: "kik",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Posilki,
  },
  {
    tytul: "Othello/Reversi",
    link: "othello",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Posilki,
  },
  {
    tytul: "Gra ze strzelaniem - refleks (AIM maps)",
    link: "aim",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Posilki,
  },
  {
    tytul: "Memo",
    link: "memo",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Posilki,
  },
  {
    tytul: "Doodle",
    link: "doodle",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Posilki,
  },
  {
    tytul: "Powtarzanie sekwencji, podświetlanych divów",
    link: "aim",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Posilki,
  },
];
