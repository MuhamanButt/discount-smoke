import React,{ useState,useEffect }from "react";
import { useSelector,useDispatch } from "react-redux";
import "./styles/SearchBar.css";
import {Form,InputGroup} from "react-bootstrap";
import { useFirebase } from "../context/firebase";
import { setSearchBarData } from "../redux/SearchBarData/SearchBarDataAction";
import SearchBarProductList from "./SearchBarProductList";
import SideBarAccordion from "../reusableComponents/SideBarAccordion";
import { Input, Space } from 'antd';
const { Search } = Input;
const SearchBar = ({ inNavbar,category }) => {
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
          <Search
            placeholder="Search for a Product"
            allowClear
            value={`${LoaderState ? "" : SearchBarText}`}
            loading={LoaderState}
            onChange={(e) => changeHandler(e)}
            style={{width: "100%",}}
            className="search-bar"
          />
        </div>
        {dataListStatus ? (
          <div
            className="row m-0"
            id="searchbar-data-list"
            style={{ minHeight: "650px" }}
          >
            <div className="col p-0">
              <SearchBarProductList data={dataToShow} inNavbar={inNavbar} />
            </div>
          </div>
        ) : inNavbar ? (
          ""
        ) : (
          <div className="row m-0">
            <div className="col p-0">
              <SideBarAccordion category={category} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
