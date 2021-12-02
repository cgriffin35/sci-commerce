import React,{useEffect} from 'react';
import {productsSelector} from '../store/products';
import {useSelector, useDispatch} from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom';


import {fetchPopulars, popularProductsSelector} from '../store/populars'

const override = css`
  display: block;
  margin: 42vh auto;
`;

interface HomeProps {

}

const Home: React.FC<HomeProps> = ({}) => {
  const dispatch = useDispatch();
  const allProducts = useSelector(productsSelector);
  const {products} = allProducts;

  const populars = useSelector(popularProductsSelector)


  useEffect(()=>{
    dispatch(fetchPopulars())
    console.log(populars)
  }, [dispatch])

  if(allProducts.loading || !populars){
    return (
      <>
        <ClipLoader css={override} color="rgb(0,255,0)" />
      </>
    )
  } else {
    return (
      <>
      <style type="text/css">
        {`
        .carousel .carousel-indicators [data-bs-target] {
          background-color: #0f0; !important
      }
      .card-img-overlay{
        background: linear-gradient(0deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.8) 100%);;
      }
      .text-light {
        --bs-text-opacity: 1;
        color: rgba(var(--bs-light-rgb),var(--bs-text-opacity))!important;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
        `}
      </style>
        <div className="p-4">
          <h2>What's Hot 🔥</h2>
          <Link to='/product'>
            <Carousel >
              {populars.map((item:any) => (
                  <Carousel.Item key={item.id}>
                    <Card bg="light">
                      <Card.Img id="img" src={item.pics[0]} />
                      <Card.ImgOverlay className="p-3 align-items-end">
                        <Card.Title className="text-light">{item.name}</Card.Title>
                        <Card.Text className="text-light">{item.description}</Card.Text>
                        <Link to='/'></Link>
                      </Card.ImgOverlay>
                    </Card>
                  </Carousel.Item>
              ))}
            </Carousel>
          </Link>
        </div>
      </>
    );
  }
}

export default Home;