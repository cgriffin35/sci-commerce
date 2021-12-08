import React from 'react'
import {Link} from 'react-router-dom'


const Purchased: React.FC = () => {
    return (
      <div className="p-3">
        <h1>Order purchased!</h1>
        <p>Thank you for shopping with sci-commerce.</p>
        <p><Link to="/">Click here</Link> to go back home.</p>
      </div>
    );
}

export default Purchased;