import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Heading from "../reusableComponents/Heading";
import brandlogo1 from "./assets/brandLogo1.webp";
import brandlogo2 from "./assets/brandLogo2.webp";
import brandlogo3 from "./assets/brandLogo3.webp";
import brandlogo4 from "./assets/brandLogo4.webp";
import brandlogo5 from "./assets/brandLogo5.webp";
import brandlogo6 from "./assets/brandLogo6.webp";
import { useState, useEffect } from "react";
import "./styles/OurBrands.css";
import Slider from "../reusableComponents/Slider";
const OurBrands = () => {
  const [ShowSlider, setShowSlider] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 500) {
        setShowSlider(true);
      } else {
        setShowSlider(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="OurBrands overflow-x-hidden">
      <Heading text={"OUR BRANDS"} backgroundColor={"#f0f6ff"}></Heading>
      <div
        className="row justify-content-between m-0 mt-sm-3"
        style={{ backgroundColor: "#f0f6ff" }}
      >
        <div className="col-12 p-0">
          <Slider
            Components={[
              <img src={brandlogo1} alt="" className="ourbrands-image" />,
              <img src={brandlogo2} alt="" className="ourbrands-image" />,
              <img src={brandlogo3} alt="" className="ourbrands-image" />,
              <img src={brandlogo4} alt="" className="ourbrands-image" />,
              <img src={brandlogo5} alt="" className="ourbrands-image" />,
              <img src={brandlogo6} alt="" className="ourbrands-image" />,
            ]}
          ></Slider>
        </div>
      </div>
    </div>
  );
};

export default OurBrands;
