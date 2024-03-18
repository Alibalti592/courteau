import React, { useEffect, useState } from "react";
import hero from "./assets/casse-croute-courteau-logo-accueil.svg";
import facebook from "./assets/social-icons/Group-37.svg";
import instagram from "./assets/social-icons/Group-38.svg";
import hero1 from "./assets/Club-sandwich-2.png";
import hero2 from "./assets/Poutine-reg-2.png";

import hero3 from "./assets/Pizza-mac-meat-4.png";
const slides = [hero3, hero1, hero2];
function Hero() {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  useEffect(() => {
    setTimeout(() => {
      nextSlide();
    }, 3000);
  });
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  return (
    <section className="hero-container">
      <div className="div-logo-accueil">
        <img className="logo-accueil" src={hero}></img>
        <button className="button-acceuil">Télécharger L'app </button>
      </div>
      <div className="social-icons">
        <a href="https://wwww.facebook.com">
          <img src={facebook} alt="" width="42" height="42" />
        </a>
        <a href="https://wwww.instagram.com">
          <img src={instagram} width="42" height="42" />
        </a>
      </div>
      <section className="background">
        <div className="box-left"></div>
        <div className="box-right"></div>
        <div className="slider">
          {slides.map((slide, index) => {
            return (
              <div
                className={index === current ? "slide_active" : "slide"}
                key={index}
              >
                {index === current && (
                  <img src={slide} alt="" className="image" />
                )}
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
}

export default Hero;
