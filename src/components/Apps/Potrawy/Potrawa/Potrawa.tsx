import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IPotrawa from "../../../../interfaces/apps/potrawy/IPotrawa";
import classes from "./Potrawa.module.css";

interface Props {
  potrawa: IPotrawa;
  setPotrawy: React.Dispatch<React.SetStateAction<IPotrawa[]>>;
  setDodawaniePotrawy: React.Dispatch<React.SetStateAction<boolean>>;
}

const Potrawa: React.FC<Props> = ({
  potrawa,
  setPotrawy,
  setDodawaniePotrawy,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  const onEdytujClick = async () => {
    setDodawaniePotrawy(true);
  };

  const onUsunClick = async () => {
    const response = await fetch(`/apps/posilki/potrawy/${potrawa._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      setPotrawy((potrawy) => potrawy.filter((p) => p._id !== potrawa._id));
      // return await response.json();
    }
  };

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          title={potrawa.nazwa}
          disableTypography
          action={
            <IconButton onClick={onMoreClick}>
              <MoreVertIcon />
            </IconButton>
          }
          classes={{
            root: classes.PotrawaHeaderRoot,
            content: classes.PotrawaHeaderContent,
            action: classes.PotrawaHeaderAction,
          }}
        />
        <CardMedia className={classes.media} image={potrawa.zdjecie} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {potrawa.uwagi}
          </Typography>
          {potrawa.tagi.map((tag) => (
            <Chip key={tag._id} label={tag.nazwa} variant="outlined" />
          ))}
        </CardContent>
      </Card>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
      >
        <MenuItem onClick={onEdytujClick}>Edytuj</MenuItem>
        <MenuItem onClick={onUsunClick}>Usuń</MenuItem>
      </Menu>
    </>
  );
};

export default Potrawa;
