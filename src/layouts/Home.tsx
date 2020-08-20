import React from "react";
import BasicNavbar from "../components/BasicNavbar";
import CustomButton from "../components/CustomButton";
import ExampleWithManyStates from "../components/ExampleWithManyStates";
import SomeForm from "../components/SomeForm";
import Form from "react-bootstrap/Form";
import Board from "../components/Board";
import Counter from "../components/Counter";

function Home() {
  return (
    <React.Fragment>
      <header>
        <BasicNavbar />
      </header>
      <body>
        <SomeForm />
        <React.Fragment>
          <Form>
            <Form.Group controlId="formBasicRange">
              <Form.Label>Range</Form.Label>
              <Form.Control type="range" />
            </Form.Group>
          </Form>
        </React.Fragment>
        <React.Fragment>
          <Counter />
        </React.Fragment>
      </body>
    </React.Fragment>
  );
}

export default Home;
