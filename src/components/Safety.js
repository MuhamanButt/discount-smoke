import React from "react";
import Heading from "../reusableComponents/Heading";
import safetyImage from "./assets/health tips.png";
const Safety = () => {
  return (
    <div className="overflow-x-hidden" style={{backgroundColor:"#f0f6ff"}}>
      <div data-aos="fade-right">
        <Heading
          text={"HEALTH & SAFETY TIPS"}
          backgroundColor={"#f0f6ff"}
        ></Heading>
        <div
          className="row justify-content-center m-0"
          style={{ backgroundColor: "#f0f6ff" }}
        >
          <div className="col-10 py-2 py-sm-4">
            <img src={safetyImage} alt="" style={{ width: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safety;
