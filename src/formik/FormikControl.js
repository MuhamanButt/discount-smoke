import React from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Select from "./Select";
import RadioButton from "./RadioButton";
import Checkbox from "./Checkbox";
import DatePicker from "./DatePicker";
import Quill from "./Quill";
import ImageInput from "./Image";
import DropdownInput from "./Dropdown";

const FormikControl = (props) => {
  const { control,...rest } = props;
  switch (control) {
    case "input": return <Input {...rest}/>
    case "textarea":return <TextArea {...rest}/>
    case "select":return<Select {...rest}/>
    case "radio":return <RadioButton {...rest}/>
    case "checkbox":return<Checkbox {...rest}/>
    case "date":return<DatePicker {...rest}/>
    case "quill":return<Quill {...rest}/>
    case "image":return<ImageInput {...rest}/>
    case "dropdown":return<DropdownInput {...rest}/>
    default:
      return null;
  }
};

export default FormikControl;
