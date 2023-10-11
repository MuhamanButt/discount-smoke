import React, { useEffect, useState } from "react";
import MyNavbar from "../reusableComponents/Navbar";
import Title from "../reusableComponents/Title";
import SearchBar from "../components/SearchBar";
import Footer from "../reusableComponents/Footer";
import SideBarAccordion from "../reusableComponents/SideBarAccordion";
import ProductCard from "../reusableComponents/ProductCard";
import { useFirebase } from "../context/firebase";
import datacoming from "./assets/underConstruction.svg";
import ProductPageSkeleton from "../skeletons/ProductPageSkeleton";
import { useSelector } from "react-redux";
const ProductPage = ({ category }) => {
  const firebase = useFirebase();
  const [ProductsData, setProductsData] = useState(null);
  const data = useSelector((state) => state.searchbarData.productInfo);
  function filterArrayByCategory(array, category) {
    return array.filter((item) =>
      item.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  useEffect(() => {
    const fetch = async () => {
      setProductsData(null);
      if (data.length > 0) {
        setProductsData(filterArrayByCategory(data, category));
      } else {
        const result = await firebase.getProductsByCategory(category);
        setProductsData(result);
      }
    };
    fetch();
  }, [category]);
  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <MyNavbar status={true}></MyNavbar>
      <Title name={category}></Title>
      <div className="row m-0">
        <div className="col-3 d-md-block d-none">
          <SearchBar></SearchBar>
        </div>
        <div className="col-12 col-md-9 p-0"  style={{minHeight:"500px"}}>
          <div className="row m-0 overflow-x-hidden px-3 px-md-0">
            {!ProductsData ? (
              <ProductPageSkeleton></ProductPageSkeleton>
            ) : (
              <>
                {ProductsData.length == 0 ? (
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
