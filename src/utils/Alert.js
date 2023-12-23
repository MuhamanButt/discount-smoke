import React from "react";
import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { CSSTransition } from "react-transition-group";
import styles from "./styles/Alert.module.css";
const CustomAlert = ({ variant, text, timer }) => {
  const [show, setShow] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, timer);
  }, []);
  return (
    <CSSTransition
      in={show}
      timeout={300}
      classNames="my-toast"
      unmountOnExit
      onExited={() => setShow(false)}
    >
      <>{show && (
        <Alert key={variant} variant={variant} className={styles.custom_alert} data-aos="fade-left">
          {text}
        </Alert>
      )}</>
    </CSSTransition>
  );
};

export default CustomAlert;
