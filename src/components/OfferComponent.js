import React, { useEffect, useRef } from "react";
import { useFirebase } from "../context/firebase";
import Heading from "../reusableComponents/Heading";
import giftImage from "./assets/gift.png";
import Carousel from "react-bootstrap/Carousel";
const OfferComponent = ({ result }, ref) => {
  const firebase = useFirebase();
  const calculateRemainingTime = async (timestamp) => {
    const currentTime = new Date().getTime();
    const timeDifference = timestamp - currentTime;

    if (timeDifference <= 0) {
      firebase.deleteOffer(result.identity);
      return;
    }

    const oneMinute = 60 * 1000; // 1 minute in milliseconds
    const oneHour = 60 * oneMinute; // 1 hour in milliseconds
    const oneDay = 24 * oneHour; // 1 day in milliseconds

    const days = Math.floor(timeDifference / oneDay);
    const hours = Math.floor((timeDifference % oneDay) / oneHour);
    const minutes = Math.floor((timeDifference % oneHour) / oneMinute);

    return {
      days,
      hours,
      minutes,
    };
  };
  const componentRef = useRef(null);
  useEffect(() => {
    // Access the component's DOM element using the ref
    if (ref) {
      ref.current = componentRef.current;
    }
  }, [ref]);
  return (
    <Carousel.Item>
      <div ref={componentRef} className="row justify-content-center">
        <div className="row justify-content-center">
          <div className="col text-center">
            <Heading
              text={"LIMITED TIME DISCOUNT OFFER"}
              backgroundColor={"#D3D3D3"}
            ></Heading>
            <p className="mb-2">{result.OfferDescription}</p>
            <div className="row justify-content-center">
              <div className="col-6 col-sm-4 ">
                <img src={giftImage} alt="" className="w-100" />
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-2 col-sm-1 text-center">
                <p>{}</p>
                <p>Days</p>
              </div>
              <div className="col-2 col-sm-1 text-center">
                <p></p>
                <p>Hours</p>
              </div>
              <div className="col-2 col-sm-1 text-center">
                <p></p>
                <p>Mins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Carousel.Item>
  );
};

export default OfferComponent;
