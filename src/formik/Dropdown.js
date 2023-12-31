import React, { useEffect, useState } from 'react';
import styles from './styles/Input.module.css';
import TextError from './TextError';
import { Field, ErrorMessage, FieldArray } from 'formik';
import { DropdownButton, Dropdown } from 'react-bootstrap';

const DropdownInput = (props) => {
  const [options, setOptions] = useState(null);
  const { label, name, interfaceDetails, totalCharacters, arrayOfAvailableOptions, allowSingleOption, ...rest } = props;
  const { labelDesign, fieldDesign, inputDesign } = interfaceDetails;

  useEffect(() => {
    console.log("arrayOfAvailableOptions",arrayOfAvailableOptions)
    if (options==null) 
        setOptions(arrayOfAvailableOptions);
  }, [options]);

  const handleArrayChange = (arrayHelpers, newOption) => {
    if (allowSingleOption) {
      const currentArray = arrayHelpers.form.values[name];
      if (currentArray.length > 0) {
        const lastItemIndex = currentArray.length - 1;
        arrayHelpers.remove(lastItemIndex);
      }
      arrayHelpers.push(newOption);
    } else {
      const currentArray = arrayHelpers.form.values[name];
      if (!currentArray.includes(newOption)) {
        arrayHelpers.push(newOption);
        setOptions(options.filter(option => option !== newOption));
      }
    }
  };

  return (
    <div className={`form-control row ${styles.inputFormComponentMain} m-0`} style={inputDesign}>
      <div className="col-12 p-0">
        <label htmlFor={name} style={labelDesign} className={`form-control row col-10 ${styles.inputFormComponentLabel}`}>
          {label}
        </label>
        <FieldArray name={name} onChange={handleArrayChange}>
          {({ push, remove, form }) => (
            <>
              <DropdownButton variant="outline-secondary" title={label} id="input-group-dropdown" align="end" className="form-dropdown-btn">
                {options?.map((option, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleArrayChange({ push, remove, form }, option)}
                    className="dropdown-item-btn ButtonHover">
                    {option}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <div className="mb-3">
                {Array.isArray(form.values[name]) && form.values[name]?.map((option, index) => (
                  <button key={index} onClick={() => remove(index)} className="btn btn-danger btn-sm m-1 " style={{ borderRadius: "10px" }} type='button'>
                    {option}{" "}
                    <span aria-hidden="true" className="float-end fs-16">
                      &times;
                    </span>
                  </button>
                ))}
              </div>
            </>
          )}
        </FieldArray>
      </div>
    </div>
  );
};

export default DropdownInput;
