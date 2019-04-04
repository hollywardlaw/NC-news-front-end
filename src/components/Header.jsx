import React from 'react';
import LoginForm from '../components/LoginForm';

const Header = props => {
  return (
    <header>
      <h1>NC News</h1>
      <h2>{props.user ? `Welcome ${props.user}` : 'Please sign in!'}</h2>
      {!props.user && <LoginForm setUser={props.setUser} />}
      {props.user && <button onClick={props.logOut}>Log out</button>}
    </header>
  );
};

export default Header;
