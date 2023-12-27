import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import './styles/SearchBarProductListComponent.css'
import { setProductInfo } from "../redux/ProductInfo/ProductInfoAction";
import { GREY, WHITE } from "../values/Colors";
const SearchBarProductListComponent = ({ productData, inNavbar }) => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const viewHandler = () => {
    const product=productData
    dispatch(setProductInfo({product}))
    navigate(`/product/view/${productData.identity}`)
  };
  return (
    <div
      className="col-12 p-0 py-2 ps-1 searchbar-item"
      style={{
        borderBottom: `1px solid ${GREY}`,
        height: "auto",
        fontSize: "12px",
        color: inNavbar ? WHITE : "",
      }}
      onClick={viewHandler}
    >
      {productData.ProductName}
    </div>
  );
};

export default SearchBarProductListComponent;
