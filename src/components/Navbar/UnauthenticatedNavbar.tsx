import React from "react";
import { Link } from "react-router-dom";

interface Props {}

const UnauthenticatedNavbar: React.FC<Props> = (props) => {
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

export default UnauthenticatedNavbar;
