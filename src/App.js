import React, { useEffect } from 'react'
import './App.css'
import { ConfigProvider } from "antd";
import ProjectRoutes from './components/ProjectRoutes';
import { useDispatch } from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import { setUserEntranceTime } from './redux/UserEntranceTime/UserEntranceTimeActions';
import { LIGHTER_BLUE, LIGHT_BLUE } from './values/Colors';
const App = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    //! generates the first entrance time of user on website
    dispatch(setUserEntranceTime(Date.now()))
  },[])
  return (
    <div className='custom-container p-0'>
      <ConfigProvider theme={{ token: { colorPrimary: LIGHT_BLUE,colorPrimaryBg: LIGHTER_BLUE, }}}>
          <ProjectRoutes></ProjectRoutes>
      </ConfigProvider>
    </div>
  )
}

export default App
