import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import { Router } from '@reach/router';
import Article from './components/Article';
import Articles from './components/Articles';
import Topics from './components/Topics';
import ArticleForm from './components/ArticleForm';
import CommentForm from './components/CommentForm';

class App extends Component {
  state = {
    user: null
  };
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Header user={user} setUser={this.setUser} logOut={this.logOut} />
        <Topics />
        <ArticleForm user={user} />
        <Router className="centre">
          <Articles path="/" />
          <Articles path="articles" />
          <Articles path="articles/topics/:slug" />
          <Article path="articles/:article_id" user={user} />
          <CommentForm path="articles/:article_id" user={user} />
        </Router>
      </div>
    );
  }
  setUser = user => {
    this.setState({ user });
  };
  logOut = () => {
    this.setState({ user: null });
  };
}

export default App;
