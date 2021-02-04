import React from "react";
import "./NavBar.css"
import chicken_icon from "../../img/chicken_icon.svg";

export default function NavBar() {
  return (
    <div className="navbar-container">
      <div>
        <img src={chicken_icon} alt="logo" className="navbar-logo" />
      </div>
      <div className="navbar-list-container">
        <ul>
          <li>
            <a href="">item</a>
          </li>
          <li>
            <a href="">item</a>
          </li>
          <li>
            <a href="">item</a>
          </li>
          <li>
            <a href="">item</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
