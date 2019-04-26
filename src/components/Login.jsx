import React from 'react';
import LoginForm from '../components/LoginForm';
import '../App.css';

const Login = props => {
  return (
    <div className="login">
      {' '}
      <h1>{props.user ? `Welcome ${props.user}!` : 'Please sign in!'}</h1>
      {!props.user && <LoginForm setUser={props.setUser} />}
      {props.user && <button onClick={props.logOut}>Log out</button>}
    </div>
  );
};

export default Login;
