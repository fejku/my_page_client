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
import IPosilek from "../../../../interfaces/apps/posilki/IPosilek";
import classes from "./Posilek.module.css";

interface Props {
  posilek: IPosilek;
}

const Posilek: React.FC<Props> = ({ posilek }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const onMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          title={posilek.nazwa}
          disableTypography
          action={
            <IconButton onClick={onMoreClick}>
              <MoreVertIcon />
            </IconButton>
          }
          classes={{
            root: classes.PosilkiHeaderRoot,
            content: classes.PosilkiHeaderContent,
            action: classes.PosilkiHeaderAction,
          }}
        />
        <CardMedia className={classes.media} image={posilek.zdjecie} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {posilek.uwagi}
          </Typography>
          {posilek.tagi.map((tag) => (
            <Chip label={tag.nazwa} variant="outlined" />
          ))}
        </CardContent>
      </Card>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
      >
        <MenuItem>Edytuj</MenuItem>
        <MenuItem>Usuń</MenuItem>
      </Menu>
    </>
  );
};

export default Posilek;
