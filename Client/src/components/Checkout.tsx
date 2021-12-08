/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, userSelector } from "../store/users";
import { fetchCarts, cartsSelector, clearCart } from "../store/carts";
import { fetchAllProducts, productsSelector } from "../store/products";
import {newPurchase} from '../store/purchases'

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 42vh auto;
`;

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [active, setActive] = useState("0");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: {
    currentTarget: any;
    preventDefault: () => void;
    stopPropagation: () => void;
  }) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setValidated(true);
      setActive("1");
    }
  };

  const fetchedUser = useSelector(userSelector);
  const { user } = fetchedUser;
  const fetchedCart = useSelector(cartsSelector);
  const { carts } = fetchedCart;
  const fetchedProducts = useSelector(productsSelector);
  const { products } = fetchedProducts;

  const caculateTotal = () => {
    return carts.reduce((acc: any, current: any) => {
      const productIndex = products.findIndex(
        (x: { id: any }) => x.id === current.product_id
      );
      const product = products[productIndex];

      return acc + product.price * current.product_quantity;
    }, 0);
  };


  const onConfirm =()=>{
    dispatch(newPurchase({ userId: user.uid, products: carts, total: caculateTotal()}))
    dispatch(clearCart({userId: user.uid}))
    navigate('/purchased')
  }

  useEffect(() => {
    dispatch(fetchUser());
    setTimeout(() => {
      dispatch(fetchAllProducts());
      dispatch(fetchCarts({ userId: user.uid }));
    }, 200);
  }, [dispatch]);

  if (!user || user === {}) {
    navigate("/");
  }

  if (
    fetchedUser.loading ||
    fetchedCart.loading ||
    fetchedProducts.loading ||
    user === {}
  ) {
    return <ClipLoader css={override} color="rgb(0,255,0)" />;
  }

  return (
    <>
      <div>
        <h1 className="m-3 display-4">Checkout</h1>
        <Accordion activeKey={active} flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h4>Customer details</h4>
            </Accordion.Header>
            <Accordion.Body>
              <p>
                (This is a mock checkout, you do not have to enter real
                information.)
              </p>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="1">
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        defaultValue={user.first_name}
                        required
                        type="text"
                        placeholder="Enter first name"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="2">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        defaultValue={user.last_name}
                        required
                        type="text"
                        placeholder="Enter last name"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="3" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    defaultValue={user.email}
                    required
                    type="text"
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group controlId="4" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="123 Main st."
                  />
                </Form.Group>
                <Form.Group controlId="4" className="mb-3">
                  <Form.Label>Address 2</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Apartment, studio, or floor"
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter city"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter state"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Zip code</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter zip"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <hr />
                <h4>Payment</h4>
                <p className="mb-3">
                  (this is a mock checkout. DO NOT enter a real card.){" "}
                </p>
                <Form.Group as={Col} md="4" className="mb-3">
                  <Form.Label>Name on Card</Form.Label>
                  <Form.Control required type="text" placeholder="Enter name" />
                </Form.Group>
                <Form.Group as={Col} md="4" className="mb-3">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter card number"
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" className="mb-3">
                  <Form.Label>Exp. date</Form.Label>
                  <Form.Control required type="text" placeholder="MM/YYYY" />
                </Form.Group>
                <Form.Group as={Col} md="1" className="mb-3">
                  <Form.Label>Security code</Form.Label>
                  <Form.Control required type="text" placeholder="123" />
                </Form.Group>
                <Button type="submit">Continue</Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <h4>Confirm</h4>
            </Accordion.Header>
            <Accordion.Body>
              <ListGroup variant="flush">
                {carts.map((item: any) => {
                  const productIndex = products.findIndex(
                    (x: { id: any }) => x.id === item.product_id
                  );
                  const product = products[productIndex];
                  return (
                    <>
                      <ListGroup.Item>
                        <Row>
                          <Col md="2">
                            <img
                              id="cart-img"
                              src={product.pics[0]}
                              alt={`${product.name}`}
                            />
                          </Col>
                          <Col>
                            <strong className="fs-4">{product.name}</strong>
                            <p>
                              ${product.price} x {item.product_quantity} ={" "}
                              <strong>
                                ${product.price * item.product_quantity}
                              </strong>
                            </p>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    </>
                  );
                })}
              </ListGroup>
              <hr />
              <h3>
                Total: <strong>${caculateTotal()}</strong>
              </h3>
              <Button onClick={onConfirm}>Confirm</Button>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default Checkout;
