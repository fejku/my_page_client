import IApp from "../../interfaces/IApp";
import Posilki from "./Posilki/Posilki";

export const appList: IApp[] = [
  {
    tytul: "Posiłki",
    link: "posilki",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Posilki,
  },
  {
    tytul: "Pomiary wagi",
    link: "waga",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Posilki,
  },
  {
    // "Strona z planem biegania"
    tytul: "Plan biegania",
    link: "bieganie",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Posilki,
  },
  {
    // "Strona z ćwiczeniami codzienny zapis czy zrobione"
    tytul: "Ćwieczenia",
    link: "cwiczenia",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Posilki,
  },
  {
    // "Strona z opłatami, zbliżający się okres opłaty, pop-upy z wiadomościami o zbliżającej się opłacie"
    tytul: "Opłaty",
    link: "oplaty",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Posilki,
  },
];
