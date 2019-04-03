import React, { Component } from 'react';
import axios from 'axios';

class Article extends Component {
  state = {
    article: {}
  };
  render() {
    return (
      <div>
        <h2>{this.state.article && this.state.article.title}</h2>
        <h4>by {this.state.article.author}</h4>
        <p>Topic: {this.state.article.topic}</p>
        <p>{this.state.article.body}</p>
        <p>
          Votes {this.state.article.votes} | Comments{' '}
          {this.state.article.comment_count}
        </p>
      </div>
    );
  }
  componentDidMount() {
    this.getSingleArticleData();
  }
  getSingleArticleData = () => {
    const url = `https://holly-nc-news.herokuapp.com/api/articles/${
      this.props.article_id
    }`;

    axios.get(url).then(res => {
      this.setState({ article: res.data.articles[0] });
    });
  };
}
export default Article;
