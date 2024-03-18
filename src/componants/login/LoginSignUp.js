import React, { useState } from "react";
import password_icon from "./assets2/password.png";
import email_icon from "./assets2/email.png";
import user_icon from "./assets2/person.png";
import "./login.css";
function LoginSignUp() {
  const [toggle, setToggle] = useState("Sign Up");

  return (
    <div className="container">
      <div className="header">
        <div className="text">{toggle}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {toggle === "Sign In" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" />
        </div>
        <div className="forgot-password">
          forgot password?<span>Click Here!</span>
        </div>
        <div className="submit-container">
          <button
            className={toggle === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => {
              setToggle("Sign Up");
            }}
          >
            Sign Up
          </button>
          <button
            className={toggle === "Sign In" ? "submit gray" : "submit"}
            onClick={() => {
              setToggle("Sign In");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginSignUp;
