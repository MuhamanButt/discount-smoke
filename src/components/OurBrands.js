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
      {ShowSlider ? (
        <Carousel data-bs-theme="dark" className="my-3">
          <Carousel.Item interval={1500}>
            <div className="row justify-content-between">
              <div className="col-4 text-center">
                <img src={brandlogo1} alt="" className="ourbrands-image" />
              </div>
              <div className="col-4 text-center">
                <img src={brandlogo2} alt="" className="ourbrands-image" />
              </div>
              <div className="col-4 text-center">
                <img src={brandlogo3} alt="" className="ourbrands-image" />
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item interval={1500}>

            <div className="row justify-content-between">
              <div className="col-4 text-center">
                <img src={brandlogo4} alt="" className="ourbrands-image" />
              </div>
              <div className="col-4 text-center">
                <img src={brandlogo5} alt="" className="ourbrands-image" />
              </div>
              <div className="col-4 text-center">
                <img src={brandlogo6} alt="" className="ourbrands-image" />
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      ) : (
        <div
          className="row justify-content-center m-0 mt-sm-3 "
          style={{ backgroundColor: "#f0f6ff" }}
        >
          <div className="col-10">
            <div className="row justify-content-center " data-aos="fade-right">
              <div className="col-2 p-0 text-center align-self-center">
                <img src={brandlogo1} alt="" className="ourbrands-image" />
              </div>
              <div className="col-2 p-0 text-center align-self-center">
                <img src={brandlogo2} alt="" className="ourbrands-image" />
              </div>
              <div className="col-2 p-0 text-center align-self-center">
                <img src={brandlogo3} alt="" className="ourbrands-image" />
              </div>
              <div className="col-2 p-0 text-center align-self-center">
                <img src={brandlogo4} alt="" className="ourbrands-image" />
              </div>
              <div className="col-2 p-0 text-center align-self-center">
                <img src={brandlogo5} alt="" className="ourbrands-image" />
              </div>
              <div className="col-2 p-0 text-center align-self-center">
                <img src={brandlogo6} alt="" className="ourbrands-image" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OurBrands;
