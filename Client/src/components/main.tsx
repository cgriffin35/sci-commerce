import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import Browse from "./Browse";
import Product from "./Product";
import Populars from "./Populars";

import { fetchUser, userSelector } from "../store/users";
import { fetchCategories, categoriesSelector } from "../store/categories";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 42vh auto;
`;

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const dispatch = useDispatch();
  const fetchedUser = useSelector(userSelector);
  const {user} = fetchedUser;
  const fetchedCategories = useSelector(categoriesSelector)

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (fetchedUser.loading || fetchedCategories.loading){
    return <ClipLoader css={override} color="rgb(0,255,0)" />
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/browse/populars" element={<Populars />} />
        <Route path="/browse/:category" element={<Browse />} />
        <Route path="/product/:productId" element={<Product user={user} />} />
      </Routes>
      <Footer />
    </>
  );
};

export default Main;
