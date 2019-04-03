import React, { Component } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';

class Articles extends Component {
  state = {
    articles: []
  };
  render() {
    return (
      <div>
        <h2>Articles!</h2>

        {this.state.articles.map(article => {
          return (
            <article>
              <h3>{article.title}</h3>
              <h4>by {article.author}</h4>
              <p>Topic: {article.topic}</p>
              <p>{article.body.slice(0, 50)}...</p>
              <Link to={`${article.article_id}`}>Read full article</Link>
              <p>
                Votes {article.votes} | Comments {article.comment_count}
              </p>
            </article>
          );
        })}
      </div>
    );
  }
  componentDidMount() {
    this.getAllArticlesData();
  }
  getAllArticlesData = () => {
    const url = `https://holly-nc-news.herokuapp.com/api/articles`;
    axios.get(url).then(res => {
      this.setState({ articles: res.data.articles });
    });
  };
}
export default Articles;
