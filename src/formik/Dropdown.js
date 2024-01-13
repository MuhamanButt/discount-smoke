import React, { useEffect, useState } from 'react';
import styles from './styles/Input.module.css';
import TextError from './TextError';
import { Field, ErrorMessage, FieldArray } from 'formik';
import { Select, Typography } from 'antd';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import './styles/Dropdown.css'
const DropdownInput = (props) => {
  const [options, setOptions] = useState(null);
  const { label, name, interfaceDetails, totalCharacters, arrayOfAvailableOptions, allowSingleOption, ...rest } = props;
  const { labelDesign, fieldDesign, inputDesign } = interfaceDetails;

  //in this useEffect i am mapping arrayOfAvailableOptions to new sutructure because antd component accept it in form {label:data,value:data}
  useEffect(() => {
    if (options == null && arrayOfAvailableOptions) {
      let i=0;
      let arrayOfObjects=[]
      for(let data of arrayOfAvailableOptions)
      {
         arrayOfObjects.push({label:data,value:data})
        i++
      }
      setOptions(arrayOfObjects)
    }
  }, [options]);

  const handleArrayChange = (arrayHelpers, optionsSelected) => {
    
    const { form } = arrayHelpers;
    if (allowSingleOption) form.setFieldValue(name, optionsSelected.value);
    else {
      let array=[]
      for(let data of optionsSelected)
        array.push(data.value)
      form.setFieldValue(name, array)
    };

  };

  return (
    <div className={`form-control row ${styles.inputFormComponentMain} m-0`} style={inputDesign}>
      <div className="col-12 p-0">
        <label htmlFor={name} style={labelDesign} className={`form-control row col-10 ${styles.inputFormComponentLabel}`}>
          {label}
        </label>
        <FieldArray name={name} onChange={handleArrayChange}>
          {({ push, remove, form }) => {
            return (
              <>
                <Select
                  mode={!allowSingleOption && "multiple"}
                  style={{
                    width: "100%",
                  }}
                  placeholder={label}
                  defaultValue={form.values[name]}
                  onChange={(value, option) =>
                    handleArrayChange({ push, remove, form }, option)
                  }
                  options={options}
                  className='dropdownSelect'
                  
                />
                <ErrorMessage name={name} component={TextError} />
              </>
            );
          }}
        </FieldArray>
      </div>
    </div>
  );
};

export default DropdownInput;
