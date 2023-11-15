import React, { useEffect } from 'react'
import './App.css'
import ProjectRoutes from './components/ProjectRoutes';
import { useDispatch } from 'react-redux';
import ReactHtmlParser from "react-html-parser";
import { setUserEntranceTime } from './redux/UserEntranceTime/UserEntranceTimeActions';
const App = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    //! generates the first entrance time of user on website
    dispatch(setUserEntranceTime(Date.now()))
  },[])
  return (
    <div className='custom-container p-0'>
      <ProjectRoutes></ProjectRoutes>
    </div>
  )
}

export default App
