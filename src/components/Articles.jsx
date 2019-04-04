import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getArticles } from '../api.js';

class Articles extends Component {
  state = {
    articles: [],
    sort: null
  };
  render() {
    return (
      <div>
        <h2>Articles!</h2>
        <select onChange={this.handleChange} name="sort">
          <option value="created_at">Date</option>
          <option value="comment_count">Comments</option>
          <option value="votes">Votes</option>
        </select>
        {this.state.articles.map(article => {
          return (
            <article key={article.article_id}>
              <h3>{article.title}</h3>
              <h4>by {article.author}</h4>
              <p>Date posted: {article.created_at.slice(0, 10)}</p>
              <p>Topic: {article.topic}</p>
              <p>{article.body.slice(0, 50)}...</p>
              <Link to={`/articles/${article.article_id}`}>
                Read full article
              </Link>
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
    this.getArticlesData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.slug !== prevProps.slug ||
      this.state.sort !== prevState.sort
    ) {
      this.getArticlesData();
    }
  }
  getArticlesData = () => {
    getArticles(this.props.slug, this.state.sort).then(res => {
      this.setState({ articles: res.data.articles });
    });
  };
  handleChange = event => {
    this.setState({ sort: event.target.value });
  };
}
export default Articles;
