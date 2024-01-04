import React from "react";
import MyNavbar from "../reusableComponents/Navbar";
import Footer from "../reusableComponents/Footer";
import pagenotfound from "../assets/notloggedin.svg";
import { toAbsoluteURL } from "../helper/Helper";
const Notloggedin = () => {
  return (
    <div>
      <div className="row m-0">
        <div className="col p-0 ">
          <MyNavbar status={true}></MyNavbar>
          <div className="row m-0">
            <div
              className="col text-center"
              style={{ backgroundColor: "white" }}
            >
              <img
                src={toAbsoluteURL(pagenotfound)}
                alt=""
                style={{ height: "100%", maxWidth: "100%" }}
              />
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Notloggedin;
