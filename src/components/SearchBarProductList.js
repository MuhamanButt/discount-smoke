import React from "react";
import SearchBarProductListComponent from "./SearchBarProductListComponent";

const SearchBarProductList = ({ data,inNavbar }) => {
  return (
    <>
      <div className="row m-0 px-3 py-4" style={{border:"1px solid #D3D3D3",borderRadius:"10px"}}>
        
        {data.map((product, index) => (
          <SearchBarProductListComponent productData={product} key={index} inNavbar={inNavbar}/>
        ))}
      </div>
    </>
  );
};

export default SearchBarProductList;
