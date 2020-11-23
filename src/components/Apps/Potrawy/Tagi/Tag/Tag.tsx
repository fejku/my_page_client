import React from "react";
import { Chip } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import ITag from "../../../../../interfaces/apps/potrawy/ITag";
import classes from "./Tag.module.css";

interface Props {
  tag: ITag;
  filtrTagiState: [ITag[], React.Dispatch<React.SetStateAction<ITag[]>>];
}

const Tag: React.FC<Props> = ({ tag, filtrTagiState: [filtrTagi, setFiltrTagi] }) => {
  const czyZanaczonyTag = () => {
    return filtrTagi.some((t) => t._id === tag._id);
  };

  const onTagClick = () => {
    if (czyZanaczonyTag()) {
      setFiltrTagi((ft) => [...ft.filter((t) => t._id !== tag._id)]);
    } else {
      setFiltrTagi((ft) => [...ft, tag]);
    }
  };

  return (
    <Chip
      className={classes.Tag}
      variant={czyZanaczonyTag() ? "default" : "outlined"}
      size="small"
      icon={czyZanaczonyTag() ? <DoneIcon /> : undefined}
      label={tag.nazwa}
      clickable
      color="primary"
      onClick={onTagClick}
    />
  );
};

export default Tag;
