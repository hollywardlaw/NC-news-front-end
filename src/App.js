import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import { Router } from '@reach/router';
import Article from './components/Article';
import Articles from './components/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <Articles path="articles" />
          <Article path="articles/:article_id" />
        </Router>
      </div>
    );
  }
}

export default App;
