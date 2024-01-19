import React, { useState, useEffect } from "react";
import "./styles/Home.css";
import MyNavbar from "../reusableComponents/Navbar";
import HomePageMain from "../components/HomePageMain";
import Footer from "../reusableComponents/Footer";
import OurBrands from "../components/OurBrands";
import Safety from "../components/Safety";
import Offers from "../components/Offers";
import bg1 from "../assets/topbackground1.webp";
import bg2 from "../assets/topbackground2.webp";
import bg3 from "../assets/topbackground3.webp";
import bg4 from "../assets/topbackground4.webp";
import OurProducts from "../components/OurProducts";
import Modal from "react-bootstrap/Modal";
import ContactUs from "../components/ContactUs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setOffers } from "../redux/Offers/OffersAction";
import { CommentOutlined, MessageOutlined,WhatsAppOutlined } from '@ant-design/icons';
import { FloatButton, Switch } from 'antd';
import { setSearchBarData } from "../redux/SearchBarData/SearchBarDataAction";
import { setUserEntranceTime } from "../redux/UserEntranceTime/UserEntranceTimeActions";
const Home = () => {
  const dispatch = useDispatch();
  const userEntranceTime = useSelector((state) => state.userEntranceTime.time);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [MessageModal, setMessageModal] = useState(false);
  const [Rerenderer, setRerenderer] = useState(false); 
  const [open, setOpen] = useState(false);
  const onChange = () => {
    setOpen(!open);
  };
  function getRandomNumber() {
    const random = Math.random();
    const randomNumber = Math.floor(random * 4);
    return randomNumber;
  }
  function isTimestampMinutesOld(timestamp, minutes) {
    const oneMinuteMilliseconds = 60 * 1000;
    const currentTimestamp = new Date().getTime();
    const timeDifference = currentTimestamp - timestamp;
    const allowableTimeDifference = minutes * oneMinuteMilliseconds;
    return timeDifference <= allowableTimeDifference;
  }
  //!USE EFFECT TO CHECK IF USER IS ON SCREEN FOR MORE THAN 1 HOUR
  useEffect(() => {
    const handleFocus = () => {
      if (!isTimestampMinutesOld(userEntranceTime, 60)) {
        dispatch(setOffers([]));
        dispatch(setSearchBarData([]));
        dispatch(setUserEntranceTime(Date.now()));
        setRerenderer(!Rerenderer);
      }
    };
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  const closeModal = () => {
    setMessageModal(false);
  };
  useEffect(() => {}, [Rerenderer]);
  const showMessageModal = () => {
    setMessageModal(true);
  };
  useEffect(() => {
    const backgroundImages = [bg1, bg2, bg3, bg4];
    let currentIndex = getRandomNumber();
    setBackgroundImage(backgroundImages[currentIndex]);
    currentIndex = getRandomNumber();
    const changeBackgroundImage = () => {
      currentIndex = (currentIndex + 1) % backgroundImages.length;
      setBackgroundImage(backgroundImages[currentIndex]);
    };
    const intervalId = setInterval(changeBackgroundImage, 3500);
    return () => clearInterval(intervalId);
  }, []);
  const navigateToWhatsApp = () => {
    window.open("https://api.whatsapp.com/send?phone=923224922848", "_blank");
  };
  return (
    <>
      <div className="row m-0 ">
        <div className="col p-0 homepage-background" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <MyNavbar status={false}/>
          <HomePageMain />
          <Offers/>
          <OurBrands/>
          <OurProducts/>
          <Safety/>
          <Footer />
        </div>
      </div>
      <Modal show={MessageModal} onHide={() => setMessageModal(false)} size="xl" centered backdrop={true}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ContactUs closeHandler={closeModal} />
        </Modal.Body>
      </Modal>
      <FloatButton.Group open={open} onClick={onChange} trigger="click" style={{ right: 12,bottom:24}} icon={<CommentOutlined style={{color:"white"}}/>}>
        <FloatButton icon={<MessageOutlined style={{color:"white"}}/>} onClick={showMessageModal}/>
        <FloatButton icon={<WhatsAppOutlined style={{color:"white"}}/>} onClick={navigateToWhatsApp} />
      </FloatButton.Group>
    </>
  );
};

export default Home;
