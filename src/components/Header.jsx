import React from 'react';
import NCNEWS from '../NCNEWS.jpg';
import '../App.css';
import { Link } from '@reach/router';

const Header = props => {
  return (
    <header className="header">
      <Link to="/">
        <img className="nc-news-image" src={NCNEWS} alt="NC News" />
      </Link>
    </header>
  );
};

export default Header;
