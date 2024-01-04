import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import LoaderDark from "../reusableComponents/LoaderDark";
import MyNavbar from "../reusableComponents/Navbar";
import Title from "../reusableComponents/Title";
import SearchBar from "../components/SearchBar";
import Footer from "../reusableComponents/Footer";
import { useFirebase } from "../context/firebase";
import "./styles/ProductViewPage.css";
import FlavorButton from "../reusableComponents/FlavorButton";
import HrTag from "../reusableComponents/HrTag";
import ReactHtmlParser from "react-html-parser";
import { toAbsoluteURL } from "../helper/Helper";
const ProductViewPage = () => {
  const firebase = useFirebase();
  const [Product, setProduct] = useState({});
  const [ImageURL, setImageURL] = useState(null);
  const [LoaderState, setLoaderState] = useState(true);
  const productInfo = useSelector((state) => state.productInfo.productInfo);
  const [FlavorIsAvailable, setFlavorIsAvailable] = useState(false);

  useEffect(() => {
    setProduct(productInfo.product);
    const fetch = async () => {
      try {
        if (Product.identity) {
          (async () => {
            const image = await firebase.getImageURL(Product.identity);
            setImageURL(image);
          })();
        }
        setTimeout(() => setLoaderState(false), 200);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    fetch();
  }, [Product, productInfo]);

  return (
    <>
      <div style={{ backgroundColor: "white" }}>
        <MyNavbar status={true}></MyNavbar>
        <Title name={Product.ProductName}></Title>
        <div className="row m-0">
          <div className="col-4 col-lg-3 d-md-block d-none">
            <SearchBar category={Product.category}></SearchBar>
          </div>
          <div className="col-12 col-md-8 col-lg-9 p-0 overflow-x-hidden align-content-center">
            <div
              className="row mx-auto"
              data-aos="fade-right"
              style={{ maxWidth: "800px" }}
            >
              <div className="col">
                <div className="row justify-content-center mb-4">
                  <div
                    className="col-10 col-sm-4 d-flex align-items-center justify-content-center text-center mb-sm-0"
                    style={{ height: "250px" }}
                  >
                    <img src={ImageURL} alt="" className="pc-img" />
                  </div>
                  <div className="col-10 col-sm-6 align-self-center px-3 mb-3">
                    <h3 className="pc-productName mt-5 mt-sm-0">{Product.ProductName}</h3>
                    <p className="pc-brandName">
                      <strong>Brand : </strong>
                      {Product.selectedBrand}
                    </p>
                    <p className="pc-text">{Product.Description}</p>
                  </div>
                </div>
                <HrTag></HrTag>
                <div className="row justify-content-center mt-4">
                  <div className="col-10">
                    <div className="pc-flavors">
                      {Product.selectedFlavors &&
                      Product.selectedFlavors.length > 0 ? (
                        <>
                          <h3 className="pc-subHeading">Available Flavors:</h3>
                          {Product.selectedFlavors.map((flavor, index) => (
                            <div
                              className="flavorButtons col pc-text"
                              key={index}
                            >
                              {flavor}
                            </div>
                          ))}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                <div className="row justify-content-center mb-4 mt-4">
                  <div className="col-10">
                    <h3 className="pc-subHeading">
                     Description :
                    </h3>
                    <div className="pc-text">
                      <div className="row m-0">
                        <div className="col p-0 pc-features">
                          {ReactHtmlParser(Product.Features)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default ProductViewPage;
