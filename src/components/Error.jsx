import React from 'react';
import '../App.css';

const Error = props => {
  console.log(props)
  return (

    <div className="error">
      <h1>Oops! Something went wrong :(</h1>
    </div>
  );
};

export default Error;
