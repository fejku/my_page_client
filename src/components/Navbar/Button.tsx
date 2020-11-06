import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

interface Props {}

const Button = (props: Props) => {
  return (
    <Link to="sign-up">
      <button className="btn">Sign up</button>
    </Link>
  );
};

export default Button;
