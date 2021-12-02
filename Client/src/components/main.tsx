import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Navbar from './Navbar';
import Footer from './Footer'
import {Route, Routes} from 'react-router-dom';
import Home from './Home'
import { fetchAllProducts } from '../store/products';

interface mainProps {

}

const Main: React.FC<mainProps> = ({}) => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchAllProducts());
  }, [dispatch])


    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
          
        <Footer />
      </>
    );
}

export default Main;