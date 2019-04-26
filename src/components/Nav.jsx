import React from 'react';
import '../App.css';
import { Link } from '@reach/router';

const Nav = props => {
  return (
    <nav className="nav">
      <Link className="link" to={'/'}>
        HOME
      </Link>
      <Link className="link" to={`/articles`}>
        ARTICLES
      </Link>
      <Link className="link" to={`/topics`}>
        TOPICS
      </Link>
      <Link className="link" to={`/users`}>
        USERS
      </Link>
    </nav>
  );
};

export default Nav;
