import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AuthService from "../../services/AuthService";
import LogoIcon from "../Icons/LogoIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import classes from "./Navbar.module.css";
import { Menu, MenuItem } from "@material-ui/core";

interface Props {}

const Navbar: React.FC<Props> = (props) => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(
    AuthContext
  );

  const [openMenu, setOpenMenu] = useState(false);
  const [
    anchorProfileEl,
    setAnchorProfileEl,
  ] = React.useState<null | HTMLElement>(null);

  const onMobileMenuClick = () => {
    setOpenMenu((state) => !state);
  };

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

  const unauthenticatedNavbar = () => {
    return (
      <>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        {user.role === "admin" && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}
        <li className={classes.AvatarItem}>
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

  return (
    <nav className={classes.Navbar}>
      <Link to="/" className={classes.LogoIcon}>
        <LogoIcon />
      </Link>
      <div
        className={`${classes.MenuIcon} ${
          openMenu ? classes.MenuIconActive : ""
        }`}
        onClick={onMobileMenuClick}
      >
        {openMenu ? (
          <FontAwesomeIcon icon={faTimes} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </div>
      <div className={classes.Menu}>
        <ul
          className={`${classes.MenuList} ${
            openMenu ? classes.MenuListActive : ""
          }`}
        >
          <li>
            <Link to="/apps">Apps</Link>
          </li>

          <li>
            <Link to="/games">Games</Link>
          </li>
          <li className={classes.MenuItemSpace} />
          {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavBar()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
