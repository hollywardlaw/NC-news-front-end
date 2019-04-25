import React from 'react';
import ncNewsImage from '../ncNewsMilo.jpg';
import '../App.css';
import { Link } from '@reach/router';

const Header = props => {
  return (
    <header className="header">
      <Link to="/">
        <img className="nc-news-image" src={ncNewsImage} alt="NC News" />
      </Link>
    </header>
  );
};

export default Header;
