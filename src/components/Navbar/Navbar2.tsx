import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoIcon from "../Icons/LogoIcon";
import Button from "./Button";
import Dropdown from "./Dropdown";
import "./Navbar2.css";

interface Props {}

const Navbar2 = (props: Props) => {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenu = () => {
    setClick(false);
  };

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(true);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <LogoIcon />
      </Link>
      <div className="menu-icon" onClick={handleClick}>
        {click ? (
          <FontAwesomeIcon icon={faTimes} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </div>
      <ul className={click ? "nav-menu active" : "nav-menu"}>
        <li className="nav-item">
          <Link to="/" className="nav-links" onClick={closeMobileMenu}>
            Apps
          </Link>
        </li>
        {/* <li
          className="nav-item"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          <Link to="/services" className="nav-links" onClick={closeMobileMenu}>
            Services <i className="fas fa-caret-down" />
          </Link>
          {dropdown && <Dropdown />}
        </li> */}
        <li className="nav-item">
          <Link
            to="/contact-us"
            className="nav-links"
            onClick={closeMobileMenu}
          >
            Games
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/sign-up"
            className="nav-links-mobile"
            onClick={closeMobileMenu}
          >
            Sign up
          </Link>
        </li>
      </ul>
      <Button />
    </nav>
  );
};

export default Navbar2;
