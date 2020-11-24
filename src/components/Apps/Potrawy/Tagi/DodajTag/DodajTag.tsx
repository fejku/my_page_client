import React, { useState } from "react";
import clsx from "clsx";
import { InputBase } from "@material-ui/core";
import classes from "./DodajTag.module.css";
import ITag from "../../../../../interfaces/apps/potrawy/ITag";

interface Props {
  setTagi: React.Dispatch<React.SetStateAction<ITag[]>>;
}

const DodajTag: React.FC<Props> = ({ setTagi }) => {
  const [czyDodawanieTaga, setCzyDodawanieTaga] = useState(false);
  const [nowyTag, setNowyTag] = useState("");

  const dajDlugoscTaga = () => {
    if (!czyDodawanieTaga) {
      return 1;
    }
    if (nowyTag.length < 4) {
      return 4;
    }
    return nowyTag.length + 1;
  };

  const onDodajTagFocus = () => {
    setCzyDodawanieTaga(true);
  };

  const onDodajTagBlur = () => {
    setNowyTag("");
    setCzyDodawanieTaga(false);
  };

  const onDodajTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNowyTag(event.target.value);
  };

  const onDodajTagKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const response = await fetch("/apps/posilki/tagi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nazwa: nowyTag }),
      });
      const dodanyTag = await response.json();
      setTagi((tagi) => [...tagi, dodanyTag]);
      setNowyTag("");
      setCzyDodawanieTaga(false);
    }
  };

  return (
    <InputBase
      className={classes.DodajTag}
      inputProps={{
        className: clsx(classes.DodajTagInput, {
          [classes.DodajTagBezFocusa]: !czyDodawanieTaga,
        }),
        style: { width: `${dajDlugoscTaga()}ch` },
      }}
      value={czyDodawanieTaga ? nowyTag : "+"}
      placeholder="tag"
      onFocus={onDodajTagFocus}
      onBlur={onDodajTagBlur}
      onChange={onDodajTagChange}
      onKeyDown={onDodajTagKeyDown}
    />
  );
};

export default DodajTag;
