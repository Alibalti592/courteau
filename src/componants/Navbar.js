import React, { useEffect, useState, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "./assets/casse-croute-courteau-logo-couleur.svg";
import facebook from "./assets/social-icons/Group-37.svg";
import instagram from "./assets/social-icons/Group-38.svg";

import "./nav.css";
function Navbar() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <header className="nav-header">
        <div className="logo-container">
          <img src={logo} className="logo"></img>
        </div>
        <button
          className="nav-toggle"
          onClick={() => {
            setOpen(!isOpen);
            console.log("dgdg");
          }}
        >
          <FaBars className="hamburger"></FaBars>
        </button>

        <div className="nav-center">
          <div className="links-container">
            <li>
              <a className="commander-btn">Commander</a>
            </li>
            <li>
              <Link to="menu/">
                <a className="link-btn">MENU</a>
              </Link>
            </li>
            <div className="nav-div"></div>

            <li>
              <a>A PROPOS</a>
            </li>
            <li>
              <a>BLOGUE</a>
            </li>
            <li>
              <a>NOUS JOINDRE</a>
            </li>
          </div>
        </div>
      </header>
      {isOpen && (
        <div className="nav-wrapper">
          <div className="links-wrapper">
            <ul className="menu">
              <li>
                <a className="commander-btn">Commander</a>
              </li>
              <li>
                <Link to="menu/">
                  <a className="link-btn">MENU</a>
                </Link>
              </li>
              <div className="nav-div"></div>

              <li>
                <a>A propos</a>
              </li>
              <li>
                <a>BLOGUE</a>
              </li>
              <li>
                <a>NOUS JOINDRE</a>
              </li>
            </ul>
            <div className="social-icons">
              <a href="https://wwww.facebook.com">
                <img src={facebook} alt="" width="42" height="42" />
              </a>
              <a href="https://wwww.instagram.com">
                <img src={instagram} width="42" height="42" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Navbar;
