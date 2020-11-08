import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AuthService from "../../services/AuthService";
import LogoIcon from "../Icons/LogoIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import classes from "./Navbar.module.css";

interface Props {}

const Navbar: React.FC<Props> = (props) => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(
    AuthContext
  );

  const [openMenu, setOpenMenu] = useState(false);

  const onMobileMenuClick = () => {
    setOpenMenu((state) => !state);
  };

  const onClickLogout = async () => {
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
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
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
        <button type="button" onClick={onClickLogout}>
          Logout
        </button>
      </>
    );
  };

  return (
    <nav className={classes.Navbar}>
      <Link to="/">
        <LogoIcon className={classes.LogoIcon} />
      </Link>
      <div className={classes.MenuIcon} onClick={onMobileMenuClick}>
        {openMenu ? (
          <FontAwesomeIcon icon={faTimes} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
        {/* <i className={openMenu ? "fas fa-times" : "fas fa-bars"} /> */}
      </div>
      <div className={classes.Menu}>
        <ul
          className={`${classes.MenuList} ${
            openMenu && classes.MenuListActive
          }`}
        >
          <li>
            <Link to="/apps">Apps</Link>
          </li>
          <li>
            <Link to="/games">Games</Link>
          </li>
          {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavBar()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
