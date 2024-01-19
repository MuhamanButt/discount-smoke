import React, { useEffect, useState } from "react";
import MyNavbar from "../reusableComponents/Navbar";
import { Pagination } from 'antd';
import Title from "../reusableComponents/Title";
import SearchBar from "../components/SearchBar";
import Footer from "../reusableComponents/Footer";
import ProductCard from "../reusableComponents/ProductCard";
import { useFirebase } from "../context/firebase";
import datacoming from "../assets/underConstruction.svg";
import ProductPageSkeleton from "../skeletons/ProductPageSkeleton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ProductCardPageShimmer from "../shimmers/ProductCardPageShimmer";
import { setOffers } from "../redux/Offers/OffersAction";
import { setSearchBarData } from "../redux/SearchBarData/SearchBarDataAction";
import { setUserEntranceTime } from "../redux/UserEntranceTime/UserEntranceTimeActions";

const RandomProducts = () => {
  const dispatch=useDispatch();
  const userEntranceTime=useSelector((state)=>state.userEntranceTime.time)
  const firebase = useFirebase();
  const [ProductsData, setProductsData] = useState(null);
  const [Rerenderer, setRerenderer] = useState(false);
  const [PaginatedProductData, setPaginatedProductData] = useState(null);
  const data = useSelector((state) => state.searchbarData.productInfo);
  const [totalData, settotalData] = useState(0);
  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    setPaginatedProductData(ProductsData?.slice(((page-1)*15),((page-1)*15)+15))
    setCurrent(page);
    window.scrollTo({top: 0,behavior: "smooth"});
  };

  function isTimestampMinutesOld(timestamp, minutes) {
    const oneMinuteMilliseconds = 60 * 1000;
    const currentTimestamp = new Date().getTime();
    const timeDifference = currentTimestamp - timestamp;
    const allowableTimeDifference = minutes * oneMinuteMilliseconds;
    return timeDifference <= allowableTimeDifference;
  }
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  //!USE EFFECT TO CHECK IF USER IS ON SCREEN FOR MORE THAN 1 HOUR
  useEffect(() => {
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

  },[Rerenderer,PaginatedProductData])
  useEffect(() => {
    const fetch = async () => {
      setProductsData(null);
      if (Object.keys(data).length === 0) {
        const alldata = await firebase.getAllData();
        shuffleArray(data)
        setProductsData(alldata);
        dispatch(setSearchBarData(alldata));
        setPaginatedProductData(alldata.slice(0,15))
        settotalData(alldata.length)
      } else {
        shuffleArray(data)
        setProductsData(data);
        setPaginatedProductData(data.slice(0,15))
        settotalData(data.length)
      }
      console.log(totalData)
    };
    fetch();
  }, []);
  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <MyNavbar status={true}></MyNavbar>
      <div className="row m-0">
        <div className="col-3 d-md-block d-none">
          <SearchBar></SearchBar>
        </div>
        <div className="col-12 col-md-9 p-0" style={{ minHeight: "500px" }}>
          <div className="row m-0 overflow-x-hidden px-3 px-md-0">
            {!PaginatedProductData ? (
              <ProductCardPageShimmer numberOfItems={10}/>) : (<>
                {PaginatedProductData.length == 0 ? (
                  <div className="row m-0" style={{ height: "70vh" }}>
                    <div className="col text-center align-self-center">
                      <img
                        src={datacoming}
                        alt=""
                        style={{ height: "100%", maxWidth: "70%" }}
                      />
                    </div>
                  </div>
                ) : (
                  PaginatedProductData.map((product, index) => (
                    <ProductCard product={product} key={index}></ProductCard>
                  ))
                )}
              </>
            )}
            <div className="col-12 pe-4 pb-4 text-end">
            <Pagination current={current} onChange={onChange} total={totalData} pageSize={15} itemRender={itemRender}/>
            </div>
          </div>
        </div>
      </div>
      
      <Footer></Footer>
    </div>
  );
};

export default RandomProducts;
