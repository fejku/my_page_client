import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, MenuItem } from "@material-ui/core";
import { AuthContext } from "../../contexts/AuthContext";
import AuthService from "../../services/AuthService";
import classes from "./AuthenticatedNavBar.module.css";

interface Props {}

const AuthenticatedNavBar: React.FC<Props> = (props) => {
  const { setIsAuthenticated, user, setUser } = useContext(AuthContext);

  const [
    anchorProfileEl,
    setAnchorProfileEl,
  ] = React.useState<null | HTMLElement>(null);

  const onProfileClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorProfileEl(event.currentTarget);
  };

  const onProfileClose = () => {
    setAnchorProfileEl(null);
  };

  const onClickLogout = async () => {
    setAnchorProfileEl(null);
    try {
      const data = await AuthService.logout();

      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    } catch (error) {}
  };

  return (
    <>
      {user.role === "admin" && (
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      )}
      <li>
        <div className={classes.Avatar} onClick={onProfileClick}>
          {user.username.charAt(0).toUpperCase()}
        </div>
      </li>
      <Menu
        anchorEl={anchorProfileEl}
        keepMounted
        open={Boolean(anchorProfileEl)}
        onClose={onProfileClose}
      >
        <MenuItem onClick={onProfileClose}>Profile</MenuItem>
        <MenuItem onClick={onClickLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default AuthenticatedNavBar;
