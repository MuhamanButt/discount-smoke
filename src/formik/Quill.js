import React, { useEffect,useState } from "react";
import { Field, ErrorMessage } from "formik";
import styles from './styles/Input.module.css'
import TextError from "./TextError";
import ReactQuill from "react-quill";
const Quill = (props) => {

  const { label, name, interfaceDetails,totalCharacters,height, ...rest } = props;
  const {labelDesign, fieldDesign, inputDesign} = interfaceDetails
  const [textColorRed, settextColorRed] = useState(false);
  useEffect(()=>{
  },[textColorRed])
  return (
    <div className={`form-control row ${styles.inputFormComponentMain} m-0`} style={inputDesign}>
    <div className="col-12 p-0">
      <label htmlFor={name} style={labelDesign} className={`form-control row col-10 ${styles.inputFormComponentLabel}`}>
        {label}
      </label>
    </div>
    <Field id={name} name={name} {...rest} style={{...fieldDesign,height}}>
      {({ field }) => 
        <ReactQuill value={field.value} style={{height:height,padding:'0px'}}onChange={field.onChange(field.name)} placeholder={`Enter ${label}`}className={`form-control row col-10 ${styles.inputFormComponentField}`}/>
      }
      </Field>
    <ErrorMessage name={name} component={TextError} />
    <div className={`col-12 text-end ${totalCharacters?"d-block":"d-none"}`}>
    <p style={textColorRed ? { color: "red" } : {}} className={`${styles.numberOfCharacters} m-0`}>
     {
       <Field name={name}>
         {({ field }) => {
           if (field.value.length > totalCharacters) settextColorRed(true);
           else {
             settextColorRed(false);
           }
           return `${field.value.length}/${totalCharacters}`;
         }}
       </Field>
     } characters</p>
    </div>
  </div>
  )
}

export default Quill
