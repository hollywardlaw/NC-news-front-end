import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import { Router } from '@reach/router';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Home path="home" />
        </Router>
      </div>
    );
  }
}

export default App;
