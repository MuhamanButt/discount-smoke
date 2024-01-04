import React from "react";
import Heading from "../reusableComponents/Heading";
import image1 from '../assets/safetytip1.webp'
import image2 from '../assets/safetytip2.webp'
import image3 from '../assets/safetytip3.webp'
import image4 from '../assets/safetytip4.webp'
import image5 from '../assets/safetytip5.webp'
import image6 from '../assets/safetytip6.webp'
import './styles/Safety.css'
import { SUBTLE_BLUE } from "../values/Colors";
const Safety = () => {
  return (
    <div className="overflow-x-hidden" style={{backgroundColor:SUBTLE_BLUE}}>
      <div >
        <Heading
          text={"HEALTH & SAFETY TIPS"}
          backgroundColor={SUBTLE_BLUE}
        ></Heading>
        <div
          className="row justify-content-center mx-5 my-3 safety-images"
          style={{ backgroundColor: SUBTLE_BLUE }}

        >
          <div className="col-12 col-sm-6 col-lg-4" data-aos="fade-right">
              <img src={image1} alt="" />
          </div>
          <div className="col-12 col-sm-6 col-lg-4" data-aos="fade-right">
              <img src={image2} alt="" />
          </div>
          <div className="col-12 col-sm-6 col-lg-4" data-aos="fade-right">
              <img src={image3} alt="" />
          </div>
          <div className="col-12 col-sm-6 col-lg-4" data-aos="fade-right">
              <img src={image4} alt="" />
          </div>
          <div className="col-12 col-sm-6 col-lg-4" data-aos="fade-right">
              <img src={image5} alt="" />
          </div>
          <div className="col-12 col-sm-6 col-lg-4" data-aos="fade-right">
              <img src={image6} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safety;
