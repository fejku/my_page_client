import React from "react";

interface Props {}

const Games: React.FC<Props> = (props) => {
  return (
    <div>
      <div>Kółko i krzyżyk</div>
      <div>Othello/Reversi</div>
      <div>Gra ze strzelaniem - refleks (AIM maps)</div>
      <div>Onitama</div>
      <div>Gra memo</div>
      <div>Gra doodle</div>
      <div>Gra, powtarzanie sekwencji, podświetlanych divów</div>
      <div>
        Strona z opłatami, zbliżający się okres opłaty, pop-upy z wiadomościami
        o zbliżającej się opłacie
      </div>
    </div>
  );
};

export default Games;
