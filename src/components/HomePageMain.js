import React from "react";
import MyButton from "../reusableComponents/MyButton";
import { useNavigate } from "react-router-dom";
import { HOMEPAGE_TAGLINE } from "../values/Strings";
const HomePageMain = () => {
  const navigate=useNavigate();
  const onclickHandler=()=>{
    navigate('/product/all')
  }
  return (
    <div data-aos="fade-right">
      <div className="row m-0 drop-shadow my-5 homepageMain">
        <div className="col-12 col-md-7 px-5 px-md-1 ps-md-5 my-2 my-sm-5 align-self-center">
          <p className="homepage-background-heading typewriter">
            DISCOUNT SMOKE
          </p>
          <div className="row homepage-background-text-row">
            <div className="col-12 col-md-8">
              <p className="homepage-background-description ">
                {HOMEPAGE_TAGLINE}
              </p>
              <MyButton outlined={true} text={"View Products"} handler={onclickHandler}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageMain;
