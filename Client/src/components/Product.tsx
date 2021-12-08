/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Carousel from "react-bootstrap/Carousel";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { addToCart } from "../store/carts";
import LogIn from "./LogIn";
import type { UserInputs } from "../store/users";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import {
  fetchProductById,
  productsSelector,
  fetchProductsByCategory,
} from "../store/products";

const numbers = Array.from(Array(10).keys());

interface ProductProps {
  user: UserInputs;
}

const override = css`
  display: block;
  margin: 42vh auto;
`;

//--------------Component--------------

const Product: React.FC<ProductProps> = ({ user }) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [copy, setCopy] = useState("Physical copy");
  const [system, setSystem] = useState("PS4");
  const [size, setSize] = useState("M");
  const [showToast, setShowToast] = useState(false);

  const [showLogIn, setShowLogIn] = useState(false);

  const { productId } = useParams();
  const fetchedProduct = useSelector(productsSelector);
  const { product } = fetchedProduct;
  const { products } = fetchedProduct;
  const { category } = product;

  const variants = () => {
    if (category === "Video Games") {
      return { copy, system };
    } else if (category === "Movies and TV Shows" || category === "Books") {
      return { copy };
    } else if (category === "Clothes") {
      return { size };
    } else {
      return null;
    }
  };

  const onAddToCart = () => {
    if (!user) {
      setShowLogIn(true);
    } else {
      dispatch(
        addToCart({
          userId: user.uid as number,
          productId: product.id,
          quantity,
          variants: variants(),
        })
      );
      setShowToast(!showToast)
    }
  };

  // Conditional Dropdowns for Variants --------
  const Variants: React.FC = () => {
    if (
      category === "Books" ||
      category === "Movies and TV Shows" ||
      category === "Video Games"
    ) {
      return (
        <div>
          <div className="d-flex align-item-center">
            <p className="fs-4">Copy: </p>
            <Dropdown className="mb-3" onSelect={(e: any) => setCopy(e)}>
              <Dropdown.Toggle
                className="m-0"
                variant="light"
                id="dropdown-basic"
              >
                {copy}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Physical copy">
                  Physical copy
                </Dropdown.Item>
                <Dropdown.Item eventKey="Digital copy">
                  Digital copy
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          {category === "Video Games" && (
            <div className="d-flex align-item-center">
              <p className="fs-4">System: </p>
              <Dropdown onSelect={(e: any) => setSystem(e)}>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {system}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="PS4">PS4</Dropdown.Item>
                  <Dropdown.Item eventKey="Xbox One">Xbox One</Dropdown.Item>
                  <Dropdown.Item eventKey="Nintendo Switch">
                    Nintendo Switch
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="PC">PC</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          )}
        </div>
      );
    }
    if (category === "Clothes") {
      return (
        <div className="d-flex align-item-center">
          <p className="fs-4">Size: </p>
          <Dropdown onSelect={(e: any) => setSize(e)}>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {size}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="XS">XS</Dropdown.Item>
              <Dropdown.Item eventKey="S">S</Dropdown.Item>
              <Dropdown.Item eventKey="M">M</Dropdown.Item>
              <Dropdown.Item eventKey="L">L</Dropdown.Item>
              <Dropdown.Item eventKey="XL">XL</Dropdown.Item>
              <Dropdown.Item eventKey="XXL">XXL</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
    }
    return <div />;
  };
  // END of Variants ----------------------------------------------------

  useEffect(() => {
    dispatch(fetchProductById(productId));
    dispatch(fetchProductsByCategory(product.category));
  }, [dispatch, product.category]);

  if (fetchedProduct.loading || !product.category) {
    return (
      <>
        <ClipLoader css={override} color="rgb(0,255,0)" />
      </>
    );
  }

  return (
    <>
      <LogIn open={showLogIn} onHide={() => setShowLogIn(!showLogIn)} />
      <style type="text/css">{`
      p.card-text {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .card:hover{
        border: 2px solid #0f0;
      }
      a{
        text-decoration: none;
      }
    `}</style>
      <div className="p-2">
        <ToastContainer position="top-end">
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Cart</strong>
            </Toast.Header>
            <Toast.Body>Item added to your cart.</Toast.Body>
          </Toast>
        </ToastContainer>
        <Row className="p-2">
          <Col>
            <Carousel controls={product.pics.length > 1}>
              {product.pics.map((pic: string) => (
                <Carousel.Item key={pic}>
                  <img id="img" src={pic} alt={`${product.name}`} />
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
          <Col>
            <h1>{product.name}</h1>
            <h3 id="price">${product.price}</h3>
            <p>{product.description}</p>
            <div className="d-flex align-item-center">
              <p className="fs-4">Quantity: </p>
              <Dropdown onSelect={(e: any) => setQuantity(e)}>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {quantity}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {numbers.map((num: number) => {
                    const number = num + 1;
                    return (
                      <Dropdown.Item eventKey={number} key={number + 1}>
                        {number}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Variants />
            <br />
            <Button onClick={onAddToCart} variant="dark">
              Add to cart
            </Button>
          </Col>
        </Row>
        <br />
        <h2>Similar products:</h2>
        <ScrollMenu>
          {products
            .filter((prod: any) => prod.id !== product.id)
            .map((item: any) => (
              <div key={item.id}>
                <Link
                  onClick={() => (fetchedProduct.loading = true)}
                  to={`/product/${item.id}`}
                >
                  <Card
                    className="overflow-hidden mx-3"
                    style={{ width: "18rem", height: "24rem" }}
                  >
                    <Card.Img id="img-card" variant="top" src={item.pics[0]} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text className="overflow-hidden">
                        {item.description}
                      </Card.Text>
                      <Card.Text id="price">${item.price}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
                <br />
              </div>
            ))}
        </ScrollMenu>
      </div>
    </>
  );
};

export default Product;
