import React, { useEffect } from "react";
import { productsSelector } from "../store/products";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { ScrollMenu } from "react-horizontal-scrolling-menu";

import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";

import { fetchAllProducts } from "../store/products";
import { fetchPopulars, popularProductsSelector } from "../store/populars";
import { categoriesSelector } from "../store/categories";
import { userSelector } from "../store/users";

const override = css`
  display: block;
  margin: 42vh auto;
`;

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const dispatch = useDispatch();

  const userData = useSelector(userSelector);

  const allProducts = useSelector(productsSelector);
  const { products } = allProducts;

  const populars = useSelector(popularProductsSelector);

  const allCategories = useSelector(categoriesSelector);
  const { categories } = allCategories;

  useEffect(() => {
    dispatch(fetchPopulars());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (
    allProducts.loading ||
    !populars ||
    allCategories.loading ||
    userData.loading ||
    products.length < 30
  ) {
    return (
      <>
        <ClipLoader css={override} color="rgb(0,255,0)" />
      </>
    );
  }

  return (
    <>
      <style type="text/css">
        {`
          .carousel .carousel-indicators [data-bs-target] {
            background-color: #0f0;
          }
          .card-img-overlay{
            background: linear-gradient(0deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.8) 100%);;
          }
          
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
        `}
      </style>

      <div className="p-4">
        <h1>What's Hot 🔥</h1>
        <Carousel
          prevIcon={<ChevronLeft size="100" color="#00ff00" />}
          nextIcon={<ChevronRight size="100" color="#00ff00" />}
        >
          {populars.map((item: any) => (
            <Carousel.Item key={item.id}>
              <Card bg="light">
                <Card.Img id="img" src={item.pics[0]} />
                <Link
                  onClick={() => (allProducts.loading = true)}
                  to={`/product/${item.id}`}
                >
                  <Card.ImgOverlay className="p-3 align-items-end">
                    <Card.Title className="text-light">
                      {item.name} <strong id="price">${item.price}</strong>
                    </Card.Title>
                    <Card.Text className="text-light">
                      {item.description}
                    </Card.Text>
                  </Card.ImgOverlay>
                </Link>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
        <br />
        <hr />
        <br />
        {/* Categories */}
        {categories.map((category: any) => {
          const filteredProducts = products.filter(
            (product: any) => product.category === category.category
          );
          return (
            <>
              <h2 key={category.category}>{category.category}</h2>
              <ScrollMenu key={category.category}>
                {filteredProducts.map((item: any) => {
                  return (
                    <div key={item.id}>
                      <Link
                        onClick={() => (allProducts.loading = true)}
                        to={`/product/${item.id}`}
                      >
                        <Card
                          className="overflow-hidden mx-3"
                          style={{ width: "18rem", height: "24rem" }}
                        >
                          <Card.Img
                            id="img-card"
                            variant="top"
                            src={item.pics[0]}
                          />
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
                  );
                })}
              </ScrollMenu>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Home;
