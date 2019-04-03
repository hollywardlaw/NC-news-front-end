import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import { Router } from '@reach/router';
import Article from './components/Article';
import Articles from './components/Articles';
import Topics from './components/Topics';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Topics />
        <Router>
          <Articles path="articles" />
          <Articles path="articles/topics/:slug" />
          <Article path="articles/:article_id" />
        </Router>
      </div>
    );
  }
}

export default App;
