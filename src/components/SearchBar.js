import React from "react";
import "./styles/SearchBar.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFirebase } from "../context/firebase";
import { setSearchBarData } from "../redux/SearchBarData/SearchBarDataAction";
import SearchBarProductList from "./SearchBarProductList";
import LoaderDark from "../reusableComponents/LoaderDark";
import SideBarAccordion from "../reusableComponents/SideBarAccordion";
const SearchBar = ({ inNavbar }) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const data = useSelector((state) => state.searchbarData.productInfo);
  const [SearchBarText, setSearchBarText] = useState("");
  const [dataList, setdataList] = useState([]);
  const [dataListStatus, setdataListStatus] = useState(false);
  const [dataToShow, setdataToShow] = useState([]);
  const [LoaderState, setLoaderState] = useState(false);
  function filterArrayBySubstring(array, substring) {
    return array.filter((item) =>
      item.ProductName.toLowerCase().includes(substring.toLowerCase())
    );
  }
  const changeHandler = (e) => {
    if (e.target.value) {
      if (dataList.length == 0) {
        setLoaderState(true);
      } else {
        setLoaderState(false);
      }
      setdataListStatus(true);
    } else {
      setdataListStatus(false);
    }
    setSearchBarText(e.target.value);
    const filteredData = filterArrayBySubstring(dataList, e.target.value);
    setdataToShow(filteredData);
  };
  useEffect(() => {
    const fetch = async () => {
      if (Object.keys(data).length === 0) {
        setLoaderState(true);
        const alldata = await firebase.getAllData();
        setLoaderState(false);
        setdataList(alldata);
        dispatch(setSearchBarData(alldata));
      } else {
        setdataList(data);
      }
    };
    fetch();
  }, []);
  return (
    <div className="row justify-content-center">
      <div className="col-11">
        <div className="searchBar">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Search for a Product"
              className="search-bar"
              onChange={(e) => changeHandler(e)}
              value={`${LoaderState ? "" : SearchBarText}`}
            />
            <InputGroup.Text className="search-bar-text">
              {LoaderState ? (
                <span className="spinner-border p-0" role="status"></span>
              ) : (
                <i className="fa-solid fa-magnifying-glass"></i>
              )}
            </InputGroup.Text>
          </InputGroup>
        </div>
        {dataListStatus ? (
          <div
            className="row m-0"
            id="searchbar-data-list"
            style={{ minHeight: "650px" }}
          >
            <div className="col p-0">
              <SearchBarProductList data={dataToShow} inNavbar={inNavbar}></SearchBarProductList>
            </div>
          </div>
        ) : inNavbar ? (
          ""
        ) : (
          <div className="row m-0">
            <div className="col p-0">
              <SideBarAccordion></SideBarAccordion>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
