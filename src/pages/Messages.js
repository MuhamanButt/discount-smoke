import React, { useEffect } from "react";
import MyNavbar from "../reusableComponents/Navbar";
import Title from "../reusableComponents/Title";
import SearchBar from "../components/SearchBar";
import Footer from "../reusableComponents/Footer";
import { useFirebase } from "../context/firebase";
import { useState } from "react";
import LoaderDark from "../reusableComponents/LoaderDark";
import MessageComponent from "../components/MessageComponent";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './styles/Messages.css'
const Messages = ({ category }) => {
  const navigate=useNavigate();
  const [showAfterLG, setshowAfterLG] = useState(window.innerWidth >= 992);
  const firebase = useFirebase();
  const [Messages, setMessages] = useState(null);
  const [LoaderState, setLoaderState] = useState(true);
  const [showAfterMD, setshowAfterMD] = useState(window.innerWidth >= 576);
  useEffect(() => {
    const fetch = async () => {
      setLoaderState(true);
      let messages=[]
      if (category == "New") {
        messages = await firebase.getNewMessages();
      } else {
         messages = await firebase.getViewedMessages();
      }
      messages.sort((a, b) => b.TimeStamp - a.TimeStamp);
      setMessages(messages);
      setLoaderState(false);
    };
    fetch();
  }, [category]);
  
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setshowAfterMD(true);
        if (window.innerWidth >= 1200) {
          setshowAfterLG(true);
        } else {
          setshowAfterLG(false);
        }
      } else {
        setshowAfterMD(false);
      }
     
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div style={{ backgroundColor: "#efefef" }}>
      <MyNavbar status={true} />
      <Title name={`${category} Messages`} />
      <div className="row m-0">
        <div className="col-12">
          <div className="row m-0 mb-2">
            <div className="col-12 text-end">
              <a className={`me-3 navbtn ${category=='New'?'navbtn-active':''}`} onClick={()=>navigate('/messages/new')}>New</a>
              <a className={`navbtn ${category=='Viewed'?'navbtn-active':''}`} onClick={()=>navigate('/messages/viewed')}>Viewed</a>
            </div>
          </div>
          <div className="row m-0 justify-content-center">
            <div className="col-12"  style={{minHeight:"500px"}}>
              {LoaderState ? (
                <LoaderDark></LoaderDark>
              ) : (
                <Table responsive="lg" hover >
                  <thead>
                    <tr className="message-table-header">
                      <th>#</th>
                      <th colSpan="2">Description</th>
                      <th className={`${!showAfterLG ? "d-none" : ""}`}>Name</th>
                      <th>Email</th>
                      <th className={`${!showAfterLG ? "d-none" : ""}`}>Contact</th>
                      <th className={`${!showAfterLG ? "d-none" : ""}`}>Date</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="contactUs-body">
                  {Messages.map((message, index) => (
                    <MessageComponent
                      data={message}
                      key={index}
                      index={index}
                    ></MessageComponent>
                  ))}
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Messages;
