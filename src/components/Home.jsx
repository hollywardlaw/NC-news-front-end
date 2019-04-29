import React, { Component } from 'react';
import { getArticles } from '../api.js';
import '../App.css';
import { navigate } from '@reach/router';
import { Link } from '@reach/router';

class Home extends Component {
  state = {
    articles: [],
    sort: null
  };
  render() {
    return (
      <>
        <h1>RECENT ARTICLES</h1>
        <div className="articles">
          {this.state.articles
            .filter(article => article.created_at.slice(0, 4) > 2018)

            .map(article => {
              return (
                <article className="article-summary" key={article.article_id}>
                  <h2>{article.title}</h2>
                  <h4>by {article.author}</h4>
                  <p className="date">
                    Date posted: {article.created_at.slice(0, 10)}
                  </p>
                  <p>Topic: {article.topic}</p>
                  <p className="body-text">"{article.body}"</p>

                  <p className="votes-comments">
                    Votes {article.votes} | Comments {article.comment_count}
                  </p>
                  <Link className="view-article-link"
                    to={`/articles/${article.article_id}`}
                  >
                    View article
                </Link>
                </article>
              );
            })}
        </div>
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
export default Home;
