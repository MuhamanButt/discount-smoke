import React from 'react'

const TextError = (props) => {
  return (
    <div className='error my-1' style={{color:"red"}}>
      {props.children}
    </div>
  )
}

export default TextError
