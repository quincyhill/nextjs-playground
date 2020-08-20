import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import SubmitButton from "./SubmitButton";
import Button from "react-bootstrap/Button";

function checkAuth(username: string, password: string) {}

function SomeForm() {
  const [authenticated, setAuthenticated] = useState(false);
  const username: string = "admin";
  const password: string = username;

  return (
    <Form onSubmit={() => console.log("submitted")}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="type admin@admin.com here" />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Pass</Form.Label>
        <Form.Control type="password" placeholder="type admin here again" />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button as={SubmitButton} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SomeForm;
