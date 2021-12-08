import React from 'react'

interface FooterProps {

}

const Footer: React.FC<FooterProps> = () => {
    return (
      <div className="bg-dark">
        <p className="p-2 mx-2 my-auto text-light fs-5">©2021 Carl Griffin.</p>
      </div>
    );
}

export default Footer;