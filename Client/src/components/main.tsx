import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer'
import {Route} from 'react-router-dom';

interface mainProps {

}

const Main: React.FC<mainProps> = ({}) => {
    return (
      <>
        <Navbar />
        <br/>
        <Footer />
      </>
    );
}

export default Main;