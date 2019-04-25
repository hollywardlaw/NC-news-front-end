import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import { Router } from '@reach/router';
import Article from './components/Article';
import Articles from './components/Articles';
import Topics from './components/Topics';
// import ArticleForm from './components/ArticleForm';
import CommentForm from './components/CommentForm';
import Login from './components/Login';
import Error from './components/Error';
import Nav from './components/Nav';

class App extends Component {
  state = {
    user: null
  };
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Header />
        <Login user={user} setUser={this.setUser} logOut={this.logOut} />
        <Nav />
        <Router className="centre">
          <Topics path="/topics" />
          <Articles path="/" />
          <Articles path="articles" />
          <Articles path="articles/topics/:slug" />
          <Article path="articles/:article_id" user={user} />
          <CommentForm path="articles/:article_id" user={user} />
          <Error path="/error" default />
        </Router>
      </div>
    );
  }

  componentDidMount() {
    const recentUser = localStorage.getItem('loggedInUser');
    if (recentUser) this.setState({ user: recentUser });
  }

  setUser = user => {
    this.setState({ user });
    localStorage.setItem('loggedInUser', user);
  };
  logOut = () => {
    this.setState({ user: null });
    localStorage.removeItem('loggedInUser');
  };
}

export default App;
