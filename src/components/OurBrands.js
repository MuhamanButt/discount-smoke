import React from 'react'
import Heading from '../reusableComponents/Heading'
import brandlogo1 from './assets/brandLogo1.png'
import brandlogo2 from './assets/brandLogo2.png'
import brandlogo3 from './assets/brandLogo3.png'
import brandlogo4 from './assets/brandLogo4.png'
import brandlogo5 from './assets/brandLogo5.png'
import brandlogo6 from './assets/brandLogo6.png'

import './styles/OurBrands.css'
const OurBrands = () => {
  return (
    <div className='OurBrands overflow-x-hidden'>
      <Heading text={"OUR BRANDS"} backgroundColor={"#D3D3D3"}></Heading>
      <div className="row justify-content-center m-0 mt-sm-3" style={{backgroundColor:"#D3D3D3"}}>
        <div className="col-10">
          <div className="row justify-content-center " data-aos="fade-right">
            <div className="col-2 p-0 text-center align-self-center">
              <img src={brandlogo1} alt="" className="ourbrands-image"/>
            </div>
            <div className="col-2 p-0 text-center align-self-center">
              <img src={brandlogo2} alt=""  className="ourbrands-image"/>
            </div>
            <div className="col-2 p-0 text-center align-self-center">
              <img src={brandlogo3} alt=""  className="ourbrands-image"/>
            </div>
            <div className="col-2 p-0 text-center align-self-center">
              <img src={brandlogo4} alt=""  className="ourbrands-image"/>
            </div>
            <div className="col-2 p-0 text-center align-self-center">
              <img src={brandlogo5} alt=""  className="ourbrands-image"/>
            </div>
            <div className="col-2 p-0 text-center align-self-center">
              <img src={brandlogo6} alt=""  className="ourbrands-image"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurBrands
