import React from "react";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InputForm = (props) => (

  <Form.Group>
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>
          <FontAwesomeIcon icon={props.icon} />
        </InputGroup.Text>
      </InputGroup.Prepend>
      <Form.Control
        type={props.type}
        placeholder={props.placeholder}
        aria-describedby="inputGroupPrepend"
        onChange = {props.handler}
        value={props.value}
        required
      />
    </InputGroup>
  </Form.Group>
);

export default InputForm;
