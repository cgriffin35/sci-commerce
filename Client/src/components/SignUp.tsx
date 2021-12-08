import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";

import { createUser } from "../store/users";
import type { UserInputs } from "../store/users";

interface SignUpProps {
  open: boolean;
  onHide: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ open, onHide }) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    setValidated(true);
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);
    try {
      dispatch(createUser(formDataObj as unknown as UserInputs));
      onHide();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <Modal onHide={onHide} show={open} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Sign up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="firstName">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter first name..."
                    name="firstName"
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="lastName">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter last name..."
                    name="lastName"
                  />
                </Form.Group>
              </Row>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email..."
                  name="email"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter password..."
                  name="password"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm password..."
                  name="password2"
                />
              </Form.Group>
              <Modal.Footer>
                <Button variant="outline-dark" type="submit">
                  Sign up
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default SignUp;
