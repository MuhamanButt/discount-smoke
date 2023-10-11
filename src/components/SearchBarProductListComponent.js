import React, { useEffect } from "react";
import HrTag from "../reusableComponents/HrTag";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import './styles/SearchBarProductListComponent.css'
import { setProductInfo } from "../redux/ProductInfo/ProductInfoAction";
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
        borderBottom: "1px solid #D3D3D3",
        height: "auto",
        fontSize: "12px",
        color: inNavbar ? "white" : "",
      }}
      onClick={viewHandler}
    >
      {productData.ProductName}
    </div>
  );
};

export default SearchBarProductListComponent;
