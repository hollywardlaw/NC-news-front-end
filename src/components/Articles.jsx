import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getArticles } from '../api.js';
import '../App.css';
import { navigate } from '@reach/router';
import ArticleForm from '../components/ArticleForm';

class Articles extends Component {
  state = {
    articles: [],
    sort: null
  };
  render() {
    return (
      <>
        <label>Filter:</label>
        <select onChange={this.handleChange} name="sort">
          <option value="created_at">Most recent</option>
          <option value="comment_count">Most comments</option>
          <option value="votes">Most votes</option>
        </select>
        <div className="articles">
          {this.state.articles.map(article => {
            return (
              <article className="article-summary" key={article.article_id}>
                <h2>{article.title}</h2>
                <h4>by {article.author}</h4>
                <p className="date">
                  Date posted: {article.created_at.slice(0, 10)}
                </p>
                <p>Topic: {article.topic}</p>
                <p className="body-text">"{article.body.slice(0, 50)}..."</p>
                <Link
                  className="article-link"
                  to={`/articles/${article.article_id}`}
                >
                  Read full article
                </Link>
                <p>
                  Votes {article.votes} | Comments {article.comment_count}
                </p>
              </article>
            );
          })}
        </div>
        <ArticleForm user={this.props.user} />
      </>
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
    getArticles(this.props.slug, this.state.sort)
      .then(res => {
        this.setState({ articles: res.data.articles });
      })
      .catch(err => {
        navigate('/error', { replace: true });
      });
  };
  handleChange = event => {
    this.setState({ sort: event.target.value });
  };
}
export default Articles;
