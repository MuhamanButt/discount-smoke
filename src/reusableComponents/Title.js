import React from 'react'
import { Divider } from 'antd';

const Title = ({name}) => {
  return (
    <Divider orientation="left" orientationMargin="20" style={{fontSize:"20px"}}><strong >{name}</strong></Divider>
    
  )
}

export default Title
