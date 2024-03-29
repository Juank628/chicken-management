import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import chicken_icon from "../../img/chicken_icon.svg";

export default function NavBar() {
  return (
    <React.Fragment>
      <div className="navbar-container">
        <div className="navbar-main-btn">
          <Link to="/">
            <img src={chicken_icon} alt="logo" className="navbar-logo" />
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
