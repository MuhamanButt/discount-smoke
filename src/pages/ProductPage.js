import React, { useEffect, useState } from "react";
import MyNavbar from "../reusableComponents/Navbar";
import Title from "../reusableComponents/Title";
import SearchBar from "../components/SearchBar";
import Footer from "../reusableComponents/Footer";
import ProductCard from "../reusableComponents/ProductCard";
import { useFirebase } from "../context/firebase";
import datacoming from "../assets/underConstruction.svg";
import ProductPageSkeleton from "../skeletons/ProductPageSkeleton";
import { toAbsoluteURL } from "../helper/Helper";
import { useSelector } from "react-redux";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useDispatch } from "react-redux";
import { setOffers } from "../redux/Offers/OffersAction";
import { setSearchBarData } from "../redux/SearchBarData/SearchBarDataAction";
import { setUserEntranceTime } from "../redux/UserEntranceTime/UserEntranceTimeActions";
import { setSelectedCategory } from "../redux/SelectedCategory/SelectedCategoryActions";
import ButtonShimmer from "../shimmers/ButtonShimmer";
import ProductCardShimmer from "../shimmers/ProductCardShimmer";
import ProductCardPageShimmer from "../shimmers/ProductCardPageShimmer";

const ProductPage = ({ category }) => {

  const dispatch=useDispatch();
  const userEntranceTime=useSelector((state)=>state.userEntranceTime.time)
  const [ProgressBarLoading, setProgressBarLoading] = useState(0);
  const [showProgressBar, setshowProgressBar] = useState(false);
  const firebase = useFirebase();
  const [ProductsData, setProductsData] = useState(null);
  const [Rerenderer, setRerenderer] = useState(false);
  const data = useSelector((state) => state.searchbarData.productInfo);
  function filterArrayByCategory(array, category) {
    return array.filter((item) =>
      item.category.toLowerCase().includes(category.toLowerCase())
    );
  }
  function isTimestampMinutesOld(timestamp, minutes) {
    const oneMinuteMilliseconds = 60 * 1000;
    const currentTimestamp = new Date().getTime();
    const timeDifference = currentTimestamp - timestamp;
    const allowableTimeDifference = minutes * oneMinuteMilliseconds;
    return timeDifference <= allowableTimeDifference;
  }
  //!USE EFFECT TO CHECK IF USER IS ON SCREEN FOR MORE THAN 1 HOUR
  useEffect(() => {
    dispatch(setSelectedCategory(category))
    const handleFocus = () => {
      if (!isTimestampMinutesOld(userEntranceTime, 60)) {
        dispatch(setOffers([]))
        dispatch(setSearchBarData([]))
        dispatch(setUserEntranceTime(Date.now()))
        setRerenderer(!Rerenderer)
      }
    };
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);
  useEffect(()=>{

  },[Rerenderer])
  useEffect(() => {
    const fetch = async () => {
      setshowProgressBar(true);
      setProgressBarLoading(20);
      setProductsData(null);
      if (data.length > 0) {
        setProductsData(filterArrayByCategory(data, category));
        setProgressBarLoading(40);
      } else {
        setProgressBarLoading(30);
        const result = await firebase.getProductsByCategory(category);
        setProductsData(result);
      }
      setProgressBarLoading(100);
      setshowProgressBar(false);
    };
    fetch();
  }, [category]);
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <MyNavbar status={true}></MyNavbar>
      {showProgressBar && (
        <ProgressBar
          now={ProgressBarLoading}
          animated
          className="progressBar"
        />
      )}
      <Title name={category}></Title>
      <div className="row m-0">
        <div className="col-3 d-lg-block d-none">
          <SearchBar category={category}/>
        </div>
        <div className="col-12 col-lg-9 p-0" style={{ minHeight: "500px" }}>
          <div className="row m-0 overflow-x-hidden px-3 px-md-0">
            {!ProductsData ? (
              <ProductCardPageShimmer numberOfItems={10}/>
            ) : (
              <>
                {ProductsData.length == 0 ? (
                  <div className="row m-0" style={{ height: "70vh" }}>
                    <div className="col text-center align-self-center">
                      <img
                        src={toAbsoluteURL(datacoming)}
                        alt=""
                        style={{ height: "100%", maxWidth: "70%" }}
                      />
                    </div>
                  </div>
                ) : (
                  ProductsData.map((product, index) => (
                    <ProductCard product={product} key={index}></ProductCard>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ProductPage;
