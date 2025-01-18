import React from 'react';

const Footer = () => {

  return (
    <footer className="container text-light mt-5">
      <div className="copyright text-center text-white">
        <h2>@{new Date().getFullYear()} Weather Forecast | All Right Reserved</h2>
        <p className="pb-2">Developed & Maintained by Panda</p>
       </div>
    </footer>
  );
}

export default Footer;