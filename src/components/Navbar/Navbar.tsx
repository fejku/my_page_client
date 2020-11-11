import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import LogoIcon from "../Icons/LogoIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import classes from "./Navbar.module.css";
import UnauthenticatedNavbar from "./UnauthenticatedNavbar";
import AuthenticatedNavBar from "./AuthenticatedNavBar";

interface Props {}

const Navbar: React.FC<Props> = (props) => {
  const { isAuthenticated } = useContext(AuthContext);

  const [openMenu, setOpenMenu] = useState(false);

  const onMobileMenuClick = () => {
    setOpenMenu((state) => !state);
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
          {!isAuthenticated ? (
            <UnauthenticatedNavbar />
          ) : (
            <AuthenticatedNavBar />
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
