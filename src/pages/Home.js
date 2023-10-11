import React, { useState, useEffect } from "react";
import "./styles/Home.css";
import MyNavbar from "../reusableComponents/Navbar";
import HomePageMain from "../components/HomePageMain";
import Footer from "../reusableComponents/Footer";
import OurBrands from "../components/OurBrands";
import Safety from "../components/Safety";
import Offers from "../components/Offers";
import bg1 from './assets/topbackground1.png'
import bg2 from './assets/topbackground2.png'
import bg3 from './assets/topbackground3.png'
import bg4 from './assets/topbackground4.png'
import OurProducts from "../components/OurProducts";
import ContactUs from "../components/ContactUs";
const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  function getRandomNumber() {
    const random = Math.random();
    const randomNumber = Math.floor(random * 4);
    return randomNumber;
  }
  
  useEffect(() => {
    const backgroundImages = [bg1,bg2,bg3,bg4];
    let currentIndex = getRandomNumber();
    setBackgroundImage(backgroundImages[currentIndex])
    currentIndex = getRandomNumber();
    const changeBackgroundImage = () => {
      currentIndex = (currentIndex + 1) % backgroundImages.length;
      setBackgroundImage(backgroundImages[currentIndex]);
    };
    const intervalId = setInterval(changeBackgroundImage, 3500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="row m-0 ">
      <div
        className="col p-0 homepage-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <MyNavbar status={false}></MyNavbar>
        <HomePageMain />
        <Offers></Offers>
        <OurBrands></OurBrands>
        <OurProducts></OurProducts>
        <ContactUs></ContactUs>
        <Safety></Safety>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
