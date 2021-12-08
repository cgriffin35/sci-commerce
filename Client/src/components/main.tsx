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
import { fetchCategories } from "../store/categories";

interface MainProps {}

const Main: React.FC<MainProps> = () => {
  const dispatch = useDispatch();
  const fetchedUser = useSelector(userSelector);
  const {user} = fetchedUser;

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchCategories());
  }, [dispatch]);

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
