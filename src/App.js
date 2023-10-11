import React from 'react'
import { useEffect } from 'react';
import {  Route, Routes } from "react-router-dom";
import { HashRouter as BrowserRouter } from "react-router-dom";
import AgeConfirmation from './pages/AgeConfirmation';
import Home from './pages/Home';
import './App.css'
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import AddProduct from './pages/AddProduct';
import AddOffer from './pages/AddOffer';
import AddExtras from './pages/AddExtras';
import UpdateProduct from './pages/UpdateProduct';
import Messages from './pages/Messages';
import LoginPage from './pages/LoginPage';
import { useSelector } from 'react-redux';
import ProductViewPage from './pages/ProductViewPage';
import UpdateOffer from './pages/UpdateOffer';
import NoMatchPage from './pages/NoMatchPage';
import Notloggedin from './pages/NotLoggedInPage';
const App = () => {
  const isLoggedIn = useSelector((state) => state.admin.adminIsLoggedIn);
  useEffect(()=>{

  },[isLoggedIn])
  return (
    <div className='custom-container p-0'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AgeConfirmation/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/product/pods" element={<ProductPage category={"Pods"}/>} />
          <Route path="/product/coils" element={<ProductPage category={"Coils"}/>} />
          <Route path="/product/cigars" element={<ProductPage category={"Cigars"}/>} />
          <Route path="/product/hookah" element={<ProductPage category={"Hookah"}/>} />
          <Route path="/product/kratom" element={<ProductPage category={"Kratom"}/>} />
          <Route path="/product/vapeJuice" element={<ProductPage category={"Vape Juice"}/>} />
          <Route path="/product/cigarettes" element={<ProductPage category={"Cigarettes"}/>} />
          <Route path="/product/cbdGummies" element={<ProductPage category={"CBD Gummies"}/>} />
          <Route path="/product/rollYourOwn" element={<ProductPage category={"Roll Your Own"}/>} />
          <Route path="/product/glassCleaners" element={<ProductPage category={"Glass Cleaners"}/>} />
          <Route path="/product/hookahFlavors" element={<ProductPage category={"Hookah Flavors"}/>} />
          <Route path="/product/chewingTobacco" element={<ProductPage category={"Chewing Tobacco"}/>} />
          <Route path="/product/starterDevices" element={<ProductPage category={"Starter Devices"}/>} />
          <Route path="/product/disposableVapes" element={<ProductPage category={"Disposable Vapes"}/>} />
          <Route path="/product/candlesAndIncense" element={<ProductPage category={"Candles And Incense"}/>} />
          <Route path="/product/cigaretteMachines" element={<ProductPage category={"Cigarette Machines"}/>} />
          <Route path="/add/pods" element={isLoggedIn?(<AddProduct  category={"Pods"}/>):(<Notloggedin/>)} />
          <Route path="/add/coils" element={isLoggedIn?(<AddProduct  category={"Coils"}/>):(<Notloggedin/>)} />
          <Route path="/add/cigars" element={isLoggedIn?(<AddProduct  category={"Cigars"}/>):(<Notloggedin/>)} />
          <Route path="/add/hookah" element={isLoggedIn?(<AddProduct  category={"Hookah"}/>):(<Notloggedin/>)} />
          <Route path="/add/kratom" element={isLoggedIn?(<AddProduct  category={"Kratom"}/>):(<Notloggedin/>)} />
          <Route path="/add/vapeJuice" element={isLoggedIn?(<AddProduct  category={"Vape Juice"}/>):(<Notloggedin/>)} />
          <Route path="/add/cigarettes" element={isLoggedIn?(<AddProduct  category={"Cigarettes"}/>):(<Notloggedin/>)} />
          <Route path="/add/cbdGummies" element={isLoggedIn?(<AddProduct  category={"CBD Gummies"}/>):(<Notloggedin/>)} />
          <Route path="/add/rollYourOwn" element={isLoggedIn?(<AddProduct  category={"Roll Your Own"}/>):(<Notloggedin/>)} />
          <Route path="/add/glassCleaners" element={isLoggedIn?(<AddProduct  category={"Glass Cleaners"}/>):(<Notloggedin/>)} />
          <Route path="/add/hookahFlavors" element={isLoggedIn?(<AddProduct  category={"Hookah Flavors"}/>):(<Notloggedin/>)} />
          <Route path="/add/chewingTobacco" element={isLoggedIn?(<AddProduct  category={"Chewing Tobacco"}/>):(<Notloggedin/>)} />
          <Route path="/add/starterDevices" element={isLoggedIn?(<AddProduct  category={"Starter Devices"}/>):(<Notloggedin/>)} />
          <Route path="/add/disposableVapes" element={isLoggedIn?(<AddProduct  category={"Disposable Vapes"}/>):(<Notloggedin/>)} />
          <Route path="/add/candlesAndIncense" element={isLoggedIn?(<AddProduct  category={"Candles And Incense"}/>):(<Notloggedin/>)} />
          <Route path="/add/cigaretteMachines" element={isLoggedIn?(<AddProduct  category={"Cigarette Machines"}/>):(<Notloggedin/>)} />
          <Route path="/addExtras/flavor" element={isLoggedIn?(<AddExtras/>):(<Notloggedin/>)} />
          <Route path="/addExtras/brand"element={isLoggedIn?(<AddExtras/>):(<Notloggedin/>)} />
          <Route path="/addExtras/offer"element={isLoggedIn?(<AddOffer/>):(<Notloggedin/>)} />
          <Route path="/update/product"element={isLoggedIn?(<UpdateProduct category={"Product"}/>):(<Notloggedin/>)} />
          <Route path="/update/offer" element={isLoggedIn?(<UpdateProduct category={"Offer"}/>):(<Notloggedin/>)} />
          <Route path="/messages/new" element={isLoggedIn?(<Messages category={"New"}/>):(<Notloggedin/>)} />
          <Route path="/messages/viewed" element={isLoggedIn?(<Messages category={"Viewed"}/>):(<Notloggedin/>)} />
          <Route path="/adminPage" element={isLoggedIn?(<AdminPage />):(<Notloggedin/>)} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/product/view/:productID" element={<ProductViewPage />} />
          <Route path="/product/update/:category/:productID" element={isLoggedIn?(<UpdateProduct/>):(<Notloggedin/>)} />
          <Route path="/offer/update/:offerId" element={isLoggedIn?(<UpdateOffer/>):(<Notloggedin/>)} />
          <Route path="*" element={<NoMatchPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
