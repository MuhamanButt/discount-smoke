import React,{useEffect,useState} from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./styles/Navbar.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { NavLink,useNavigate } from "react-router-dom";
import navbarlogo from "../logoWithoutBackground.png";
import { toAbsoluteURL } from "../helper/Helper";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { useFirebase } from "../context/firebase";
import { useDispatch } from "react-redux";
import SearchBar from "../components/SearchBar";
import { setNewMessagesAvailable } from "../redux/Messages/MessagesAction";
import { DARK_BLUE, GREY } from "../values/Colors";
import ConfirmationModal from "../utils/ConfirmationModal";
import { NEED_ASSISTANCE } from "../values/Strings";
import { IS_TIMESTAMP_GIVEN_MINUTES_OLD } from "../utils/genericFunctions";
const MyNavbar = ({ status }) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.admin.adminIsLoggedIn);
  const loginTime = useSelector((state) => state.loginTime.time);
  const [fixedState, setfixedState] = useState(false);
  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const numberOfMessages = useSelector((state) => state.newMessagesAvailable.numOfMessages);
  const [BackgroundColor, setBackgroundColor] = useState(window.innerWidth <= 768);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDropdownToggle = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const logoutHandler = async () => {
    handleShow();
  };
  const logoutUser = async () => {
    await firebase.signoutAdmin();
    handleClose();
    navigate("/home");
  };
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      if (!IS_TIMESTAMP_GIVEN_MINUTES_OLD(loginTime, 3600) && isLoggedIn) {
        //! change minutes to logout
        logoutUser();
      }
      if (isLoggedIn) {
        const numberOfMessages = (await firebase.getNewMessages()).length;
        dispatch(setNewMessagesAvailable(numberOfMessages));
      }
    };
    function handleScroll() {
      if (window.scrollY > 40) {
        setfixedState(true);
      } else {
        setfixedState(false);
      }
    }
    function handleResize() {
      if (window.innerWidth <= 768) {
        setBackgroundColor(true);
      } else {
        setBackgroundColor(false);
      }
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    fetch();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
useEffect(()=>{
},[showDropdown])
  return (
    <div className={`row m-0 ${fixedState ? "navbar-fade-show" : "navbar-fade"}`} style={{ height: "130px" }} >
      <div className={`col p-0 ${fixedState ? "position-fixed" : ""}`} style={{ zIndex: "100" }}>
        <div className={`row navbar-main px-2 px-sm-5 m-0`} style={ status || fixedState ? {
                  backgroundColor: DARK_BLUE,
                  transition: "background-color 0.3s ease-in-out"
        }:{}}>
          <div className="col">
            <div className={`row ${fixedState ? "d-none" : ""}`}>
              <div className="col assistance my-2" style={{color:GREY}}>
                <p style={{ color: GREY, margin: "0px" }}>
                  <i className="fa-solid fa-phone me-3"/>{NEED_ASSISTANCE}
                </p>
              </div>
              <div className="col-auto text-end position-relative">
                {isLoggedIn && (
                  <Dropdown as={ButtonGroup}>
                    <Dropdown.Toggle
                      split
                      id="dropdownMenuButton"
                      onClick={handleDropdownToggle}
                      aria-expanded={showDropdown}>
                      <i className={`fa-solid fa-user adminLoginAlert ms-2 ${numberOfMessages != 0 && "fa-shake"}`}/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu show={showDropdown}>
                      <Dropdown.Item onClick={() => navigate("/adminPage")}>
                        <i className="fa-solid fa-user me-3"/>Profile</Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate("/messages/new")}>
                        <i className={`fa-solid fa-message me-3 ${numberOfMessages != 0 ? "fa-shake" : "" }`}/>
                        Inbox
                        {numberOfMessages != 0 && (
                          <span className="position-absolute top-50 end-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: "20" }}>
                            {numberOfMessages}</span>
                        )}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={logoutHandler}>
                        <i className="fa-solid fa-right-from-bracket me-3"></i>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                    {numberOfMessages != 0 && (
                      <span className="position-absolute top-50 start-0 translate-middle badge rounded-pill bg-danger"style={{ zIndex: "20" }}>
                        {numberOfMessages}
                      </span>
                    )}
                  </Dropdown>
                )}
              </div>
            </div>
           {show && <ConfirmationModal query={"Are you sure you want to logout?"} confirmationOption={"Logout"} onConfirmHandler={logoutUser}/>}   
             
            <hr className="m-0 color-white hr" />
            <Navbar expand="md" data-bs-theme="dark" className="navbar-dark pe-md-5">
              <Navbar.Brand as={NavLink} to="/home">
                <img src={toAbsoluteURL(navbarlogo)} className="navbar-logo" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                id="basic-navbar-nav"
                style={BackgroundColor ? {
                  backgroundColor: DARK_BLUE,
                  borderRadius: "5px"
              } : null}
              >
                <Nav className="ms-auto">
                  <Nav.Link className="btn-one" as={NavLink} to={"/home"}>Home</Nav.Link>
                  <Nav.Link className="btn-one" as={NavLink} to={"/product/cigars"}>Cigars</Nav.Link>
                  <Nav.Link className="btn-one" as={NavLink} to={"/product/disposableVapes"}>Dispossable Vapes</Nav.Link>
                  {/* <Nav.Link className="btn-one"as={NavLink} to={"/product/cigarettes"}> Cigarettes </Nav.Link> */}
                  <Nav.Link className="btn-one" as={NavLink} to={"/product/starterDevices"} >Starter devices</Nav.Link>
                  <Nav.Link className="btn-one" as={NavLink} to={"/product/vapeJuice"}>Vape Juice</Nav.Link>
                  <NavDropdown title="Accessories" id="basic-nav-dropdown" className="drop-shadow z-1">
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/pods"}>Pods</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/coils"}> Coils</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/candlesAndIncense"}>Candles and Incense</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/hookah"} >Hookah </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/hookahFlavors"} >Hookah Flavors </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/cigaretteMachines"} > Cigarette Machines </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/glassCleaners"} > Glass Cleaners </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="More" id="basic-nav-dropdown" className="drop-shadow z-1 mb-2">
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/kratom"} > Kratom </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/chewingTobacco"} > Chewing Tobacco </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/rollYourOwn"} > Roll your Own </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item className="btn-one" as={NavLink} to={"/product/cbdGummies"} > CBD Gummies </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <div className="row m-0 d-md-none">
                  <div className="col p-0">
                    <SearchBar inNavbar={true}/>
                  </div>
                </div>
              </Navbar.Collapse>
            </Navbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNavbar;
