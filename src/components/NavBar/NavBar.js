import React, { useState } from "react";
import "./NavBar.css";
import chicken_icon from "../../img/chicken_icon.svg";
import menu_icon from "../../img/menu_icon.svg";
import { navLinksInfo } from "./NavBar.json";

export default function NavBar() {
  const [fullMenuClassName, setFullMenuClassName] = useState("display-none");

  const showFullMenu = () => {
    if (fullMenuClassName === "display-none") {
      setFullMenuClassName("full-page-menu");
    } else {
      setFullMenuClassName("display-none");
    }
  };

  return (
    <React.Fragment>
      <div className="navbar-container">
        <div className="navbar-main-btn">
          <img src={chicken_icon} alt="logo" className="navbar-logo" />
          <img
            src={menu_icon}
            alt="button"
            className="navbar-menu-btn"
            onClick={showFullMenu}
          />
        </div>
        <div className="navbar-list-container">
          <ul>
            {navLinksInfo.map((link, index) => (
              <li key={index}>
                <a href={link.ref}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={fullMenuClassName}>
        <ul>
          {navLinksInfo.map((link, index) => (
            <li key={index}>
              <a href={link.ref}>{link.text}</a>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}
