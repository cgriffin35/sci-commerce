import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { logUserIn } from "../store/users";
import type { UserInputs } from "../store/users";
import { useDispatch } from "react-redux";

interface LogInProps {
  open: boolean;
  onHide: () => void;
}

const LogIn: React.FC<LogInProps> = ({ open, onHide }) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    setValidated(true);
    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());
    try {
      dispatch(logUserIn(formDataObj as unknown as UserInputs));
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
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email..."
                  name="email"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password..."
                  name="password"
                />
              </Form.Group>
              <Modal.Footer>
                <Button variant="outline-dark" type="submit">
                  Log in
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default LogIn;
