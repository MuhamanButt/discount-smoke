import React from 'react'
import './styles/Heading.css'
const Heading = ({text,backgroundColor}) => {
  return (
    <div className='row m-0 pt-3 pt-sm-5' style={{backgroundColor:backgroundColor}}>
      <div className="col Heading">
        {text}
      </div>
    </div>
  )
}

export default Heading
