import React from 'react';
import { FaInstagram, FaYoutube, FaFacebook, FaTwitter, FaLinkedin, FaWeixin, FaSearch } from 'react-icons/fa';
// import './Footer.css'; 

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic
  };

  return (
    <footer className="container text-light mt-5">
     

      <div className="copyright text-center text-white">
        <h2>@2024 Weather Forecast| All Right Reserved</h2>
        <p className="pb-2">Developed & Maintained by Panda</p>
       </div>
    </footer>
  );
}

export default Footer;