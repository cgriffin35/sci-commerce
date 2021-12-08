import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchPopulars, popularsSelector, popularProductsSelector} from "../store/populars"
import {productsSelector, fetchAllProducts} from "../store/products"
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";

const override = css`
  display: block;
  margin: 42vh auto;
`;

interface PopularsProps {}

const Populars: React.FC<PopularsProps> = () => {
  const dispatch = useDispatch();
  const products = useSelector(popularProductsSelector);
  const populars = useSelector(popularsSelector);
  const allProducts = useSelector(productsSelector);

  useEffect(()=>{
    dispatch(fetchAllProducts());
    dispatch(fetchPopulars());
  },[dispatch])

  if (populars.loading ||allProducts.loading || (allProducts.products.length < populars.populars.length)) {
    return (
      <div>
        <ClipLoader css={override} color="rgb(0,255,0)" />
      </div>
    );
  }

  return (
    <>
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
      <div className="p-5">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search products..."
            aria-label="Search products"
            aria-describedby="basic-addon2"
          />
          <Button variant="outline-success" id="button-addon2">
            Search
          </Button>
        </InputGroup>
        <Row lg={4}>
          {products.map((item: any) => (
            <Col className="py-3">
              <Link
                onClick={() => (allProducts.loading = true)}
                to={`/product/${item.id}`}
              >
                <Card
                  className="overflow-hidden"
                  style={{ width: "18rem", height: "24rem" }}
                >
                  <Card.Img id="img-card" src={item.pics[0]} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text id="price">${item.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Populars;
