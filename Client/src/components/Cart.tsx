/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCarts,
  removeFromCart,
  cartsSelector,
  updateCart,
} from "../store/carts";
import { userSelector } from "../store/users";
import { fetchAllProducts, productsSelector } from "../store/products";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 50% auto;
  justify-content: center;
  align-content: center;
`;

interface CartProps {
  open: boolean;
  onHide: () => void;
}
const numbers = Array.from(Array(10).keys());

const Cart: React.FC<CartProps> = ({ open, onHide }) => {
  const dispatch = useDispatch();
  const allCarts = useSelector(cartsSelector);
  const { carts } = allCarts;
  const fetchUser = useSelector(userSelector);
  const { user } = fetchUser;
  const allProducts = useSelector(productsSelector);
  const { products } = allProducts;

  const caculateTotal = () => {
    if (carts) {
      return carts.reduce((acc: any, current: any) => {
        const productIndex = products.findIndex(
          (x: { id: any }) => x.id === current.product_id
        );
        const product = products[productIndex];

        return acc + product.price * current.product_quantity;
      }, 0);
    }
  };

  return (
    <>
      <div>
        <Offcanvas
          onEnter={() => {
            dispatch(fetchCarts({ userId: user.uid }));
            dispatch(fetchAllProducts());
          }}
          show={open}
          onHide={onHide}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="fs-2">Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {allCarts.loading ||
            !user ||
            allProducts.loading ||
            products < 40 ? (
              <ClipLoader css={override} color="rgb(0,255,0)" />
            ) : (
              <div>
                {carts.map((item: any) => {
                  const productIndex = products.findIndex(
                    (x: { id: any }) => x.id === item.product_id
                  );
                  const product = products[productIndex];
                  return (
                    <div>
                      <Row className="pb-2">
                        <Col md={3}>
                          <img
                            id="cart-img"
                            src={product.pics[0]}
                            alt={`${product.name}`}
                          />
                        </Col>
                        <Col>
                          <Card className="p-1">
                            <Card.Title className="fs-6">
                              {product.name}
                            </Card.Title>
                            <div className="d-flex align-item-center">
                              <Card.Text className="fs-5">#:</Card.Text>
                              <Dropdown
                                className="h-2"
                                onSelect={(value: any) =>
                                  dispatch(
                                    updateCart({
                                      cartId: item.id,
                                      quantity: value,
                                    })
                                  )
                                }
                              >
                                <Dropdown.Toggle
                                  variant="light"
                                  id="dropdown-basic"
                                >
                                  {item.product_quantity}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  {numbers.map((num: number) => {
                                    const number = num + 1;
                                    return (
                                      <Dropdown.Item
                                        eventKey={number}
                                        key={number + 1}
                                      >
                                        {number}
                                      </Dropdown.Item>
                                    );
                                  })}
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            <strong id="price">${product.price}</strong>
                            <div className="d-flex align-item-center">
                              <Link to={`/product/${item.product_id}`}>
                                <Button
                                  className="me-2"
                                  onClick={() =>
                                    setTimeout(() => {
                                      window.location.reload();
                                    }, 100)
                                  }
                                  variant="outline-dark"
                                >
                                  View
                                </Button>
                              </Link>
                              <Button
                                onClick={() =>
                                  dispatch(removeFromCart({ cartId: item.id }))
                                }
                                variant="outline-danger"
                              >
                                Remove
                              </Button>
                            </div>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </div>
            )}
            <hr />
            <h3>
              Total: <span id="price">${caculateTotal()}</span>
            </h3>
            <Link to="/checkout">
              <Button className="w-100" variant="dark">
                Check out
              </Button>
            </Link>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </>
  );
};

export default Cart;
