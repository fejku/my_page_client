import IApp from "../../interfaces/IApp";
import Potrawy from "./Potrawy/Potrawy";

export const appList: IApp[] = [
  {
    tytul: "Posiłki",
    link: "posilki",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Potrawy,
  },
  {
    tytul: "Pomiary wagi",
    link: "waga",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Potrawy,
  },
  {
    // "Strona z planem biegania"
    tytul: "Plan biegania",
    link: "bieganie",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Potrawy,
  },
  {
    // "Strona z ćwiczeniami codzienny zapis czy zrobione"
    tytul: "Ćwieczenia",
    link: "cwiczenia",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Potrawy,
  },
  {
    // "Strona z opłatami, zbliżający się okres opłaty, pop-upy z wiadomościami o zbliżającej się opłacie"
    tytul: "Opłaty",
    link: "oplaty",
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    component: Potrawy,
  },
];
