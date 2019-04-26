import React, { Component } from 'react';
import { getUser, getUserArticles } from '../api.js';
import '../App.css';
import { navigate } from '@reach/router';

class User extends Component {
  state = {
    user: [],
    articles: []
  };
  render() {
    return (
      <div>
        {this.state.user.length !== 0 && <h2>{this.state.user[0].name}</h2>}
        {this.state.articles.length !== 0 && (
          <>
            {this.state.articles.map(article => {
              return (
                <div className="article" key={article.article_id}>
                  <h2>{article.title}</h2>
                  <h4>by {article.author}</h4>
                  <p>Topic: {article.topic}</p>
                  <p>{article.body}</p>
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    getUser(this.props.username)
      .then(res => {
        this.setState({ user: res.data });
      })
      .catch(err => {
        navigate('/error', { replace: true });
      });
    getUserArticles(this.props.username).then(res => {
      this.setState({ articles: res.data.articles });
    });
  };
}

export default User;
