import React from 'react'
import HrTag from './HrTag'
import Footer from './Footer'

const Title = ({name}) => {
  return (
    <div className='row container-fluid mt-2'>
      <div className="col-auto">
        <h3 className='head' style={{color:"#030F2B",fontWeight:"700"}}>{name}</h3>
        <br />
      </div>
      <div className="col">
        <HrTag></HrTag>
      </div>

    </div>
  )
}

export default Title
