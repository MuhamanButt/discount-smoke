import React from "react";
import "./styles/ProductPageSkeleton.css";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
const FormPageSkeleton = () => {
  return (
    <>
      
      <Form.Group className="mb-3">
        <Form.Control
          className=" skeleton-loading"
          style={{ height: "20px",marginBottom:"10px" }}
          type="number"
        ></Form.Control>
        <Form.Control
          className=" skeleton-loading"
          style={{ height: "40px",marginBottom:"20px" }}
          type="number"
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          className=" skeleton-loading"
          style={{ height: "20px",marginBottom:"10px" }}
          type="number"
        ></Form.Control>
        <Form.Control
          className=" skeleton-loading"
          style={{ height: "100px",marginBottom:"20px" }}
          type="number"
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          className=" skeleton-loading"
          style={{ height: "20px",marginBottom:"10px" }}
          type="number"
        ></Form.Control>
        <Form.Control
          className=" skeleton-loading"
          style={{ height: "40px",marginBottom:"20px" }}
          type="number"
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          className=" skeleton-loading"
          style={{ height: "20px",marginBottom:"10px" }}
          type="number"
        ></Form.Control>
        <Form.Control
          className=" skeleton-loading"
          style={{ height: "30px",marginBottom:"20px" }}
          type="number"
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          className=" skeleton-loading"
          style={{ height: "20px",marginBottom:"10px" }}
          type="number"
        ></Form.Control>
        <Form.Control
          className=" skeleton-loading"
          style={{ height: "40px",marginBottom:"20px" }}
          type="number"
        ></Form.Control>
      </Form.Group>

      
    </>
  );
};

export default FormPageSkeleton;
