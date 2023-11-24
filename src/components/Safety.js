import React from "react";
import Heading from "../reusableComponents/Heading";
import safetyImage from "./assets/health tips.png";
import image1 from './assets/safetytip1.webp'
import image2 from './assets/safetytip2.webp'
import image3 from './assets/safetytip3.webp'
import image4 from './assets/safetytip4.webp'
import image5 from './assets/safetytip5.webp'
import image6 from './assets/safetytip6.webp'
import './styles/Safety.css'
const Safety = () => {
  return (
    <div className="overflow-x-hidden" style={{backgroundColor:"#f0f6ff"}}>
      <div data-aos="fade-right">
        <Heading
          text={"HEALTH & SAFETY TIPS"}
          backgroundColor={"#f0f6ff"}
        ></Heading>
        <div
          className="row justify-content-center mx-5 my-3 safety-images"
          style={{ backgroundColor: "#f0f6ff" }}

        >
          <div className="col-12 col-sm-6 col-lg-4">
              <img src={image1} alt="" />
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
              <img src={image2} alt="" />
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
              <img src={image3} alt="" />
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
              <img src={image4} alt="" />
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
              <img src={image5} alt="" />
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
              <img src={image6} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safety;
