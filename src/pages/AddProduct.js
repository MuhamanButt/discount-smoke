

import React from "react";
import MyNavbar from "../reusableComponents/Navbar";
import Title from "../reusableComponents/Title";
import SearchBar from "../components/SearchBar";
import Footer from "../reusableComponents/Footer";
import MyForm from "../components/Form";

const AddProduct = ({category}) => {
  return (
    <div style={{ backgroundColor: "#efefef" }}>
    <MyNavbar status={true}/>
    <Title name={`Add Product (${category})`}/>
    <div className="row m-0">
      <div className="col-4 col-lg-3 d-md-block d-none">
        <SearchBar/>
      </div>
      <div className="col-lg-9 col-12 col-md-8">
        <div className="row m-0 justify-content-center">
          <div className="col-11">
          <MyForm category={category}></MyForm>
          </div>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
  )
}

export default AddProduct

