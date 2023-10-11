import React, { useEffect } from "react";
import MyNavbar from "../reusableComponents/Navbar";
import Title from "../reusableComponents/Title";
import SearchBar from "../components/SearchBar";
import Footer from "../reusableComponents/Footer";
import AdminAccordionAdd from "../components/AdminAccordionAdd";
import AdminAccordionAddExtras from "../components/AdminAccordionAddExtras";
import AdminAccordionViewInbox from "../components/AdminAccordionViewInbox";
import { useFirebase } from "../context/firebase";
import MyButton from "../reusableComponents/MyButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.admin.adminIsLoggedIn);
  const logoutHandler = async () => {
    await firebase.signoutAdmin();
  };
  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <MyNavbar status={true} />
      <Title name={"Hello Admin!"} />
      <div className="row m-0">
        <div className="col-4 col-lg-3 d-md-block d-none">
          <SearchBar />
        </div>
        <div className="col-lg-9 col-12 col-md-8">
          <div className="row m-0 justify-content-center">
            <div className="col-11 text-center">
              <AdminAccordionAdd />
              <br />
              <AdminAccordionAddExtras />
              <br />
              <AdminAccordionViewInbox />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default AdminPage;
